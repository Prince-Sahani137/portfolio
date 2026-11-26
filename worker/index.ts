// Cloudflare Worker: serves the static site (./out) and the guestbook API (/api/guestbook).
// Static files are served directly by the assets layer; only /api/* runs this code.
// Storage: Cloudflare D1 (binding: DB). See schema.sql.

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const MAX_NAME = 40;
const MAX_MESSAGE = 280;
const MAX_ENTRIES = 200;
const RATE_LIMIT = 5; // posts per IP per hour

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

async function getEntries(env: Env) {
  const { results } = await env.DB.prepare(
    "SELECT id, name, message, created_at AS createdAt FROM guestbook ORDER BY created_at DESC LIMIT ?",
  )
    .bind(MAX_ENTRIES)
    .all();
  return json({ entries: results, count: results.length });
}

async function postEntry(request: Request, env: Env) {
  let body: Record<string, unknown>;
  try {
    body = ((await request.json()) ?? {}) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real people never fill this field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ error: "Invalid request." }, 400);
  }

  const name =
    typeof body.name === "string" ? body.name.replace(/\s+/g, " ").trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 1 || name.length > MAX_NAME) {
    return json({ error: `Name must be between 1 and ${MAX_NAME} characters.` }, 400);
  }
  if (message.length < 1 || message.length > MAX_MESSAGE) {
    return json({ error: `Note must be between 1 and ${MAX_MESSAGE} characters.` }, 400);
  }

  // Per-IP rate limit (only a short hash of the IP is stored).
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  const ipHash = [...new Uint8Array(digest)]
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM guestbook WHERE ip_hash = ? AND created_at > ?",
  )
    .bind(ipHash, since)
    .first<{ n: number }>();

  if ((recent?.n ?? 0) >= RATE_LIMIT) {
    return json({ error: "Too many notes. Try again in a bit." }, 429);
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  await env.DB.prepare(
    "INSERT INTO guestbook (id, name, message, created_at, ip_hash) VALUES (?, ?, ?, ?, ?)",
  )
    .bind(entry.id, entry.name, entry.message, entry.createdAt, ipHash)
    .run();

  return json({ entry }, 201);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/guestbook") {
      if (request.method === "GET") return getEntries(env);
      if (request.method === "POST") return postEntry(request, env);
      return json({ error: "Method not allowed." }, 405);
    }

    if (url.pathname.startsWith("/api/")) return json({ error: "Not found." }, 404);

    // Anything else: serve static files.
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
