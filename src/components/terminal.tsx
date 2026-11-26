"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fxEnabled, playFx, setFxEnabled } from "@/lib/fx-bus";
import { FX, FX_NAMES, type FxName } from "@/lib/fx-registry";
import { education, experience, navItems, projects, site, stackRows } from "@/lib/site";

type Tone = "cmd" | "dim" | "ok" | "err" | "brand";
type Line = { text: string; tone?: Tone; href?: string };

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

const COMMANDS = [
  "help", "about", "whoami", "ls", "cd", "goto", "projects", "skills", "experience",
  "contact", "neofetch", "theme", "fx", "date", "echo", "history", "clear", "exit",
  "sudo", "pwd",
];

const PAGES: Record<string, string> = Object.fromEntries(
  navItems.map((item) => [item.label.toLowerCase(), item.href]),
);
for (const p of projects) PAGES[p.slug] = `/projects/${p.slug}`;

const out = (text: string, tone?: Tone, href?: string): Line => ({ text, tone, href });

const BANNER: Line[] = [
  out("┌──────────────────────────────────────────┐", "dim"),
  out(`│  ${site.name}'s terminal`.padEnd(43) + "│", "brand"),
  out("└──────────────────────────────────────────┘", "dim"),
  out("Type 'help' to see what I can do. Esc to close.", "dim"),
];

function centre() {
  return {
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 140,
    y: window.innerHeight * 0.42,
  };
}

export function Terminal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const push = useCallback(
    (...next: Line[]) => setLines((current) => [...current, ...next].slice(-400)),
    [],
  );

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  const openIt = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  // open: ` key, the footer button, or the Konami code
  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      const typing =
        el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || el?.isContentEditable;

      if (event.key === "Escape" && open) {
        close();
        return;
      }
      if (typing) return;
      if (event.key === "`" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        if (open) close();
        else openIt();
        return;
      }
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        openIt();
        const { x, y } = centre();
        playFx("confetti", x, y + 120);
        push(out("↑↑↓↓←→←→BA  — cheat code accepted. +30 lives.", "ok"));
      }
    };
    const onOpen = () => openIt();
    window.addEventListener("keydown", onKey);
    window.addEventListener("terminal:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("terminal:open", onOpen);
    };
  }, [open, close, openIt, push]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim();
      push(out(`visitor@${site.shortName.toLowerCase()}:~$ ${raw}`, "cmd"));
      if (!text) return;
      history.current.push(text);
      cursor.current = history.current.length;

      const [cmdRaw, ...args] = text.split(/\s+/);
      const cmd = cmdRaw.toLowerCase();

      switch (cmd) {
        case "help":
          push(
            out("Available commands:", "brand"),
            out("  about        who I am"),
            out("  projects     things I've built"),
            out("  skills       what's in the toolbox"),
            out("  experience   work and school"),
            out("  contact      how to reach me"),
            out("  neofetch     system info, portfolio edition"),
            out("  ls / goto    list pages / jump to one (goto projects)"),
            out("  theme        theme dark | light"),
            out("  fx           summon a pixel effect (fx list)"),
            out("  clear, exit  you know these"),
            out("There are a few hidden ones. Try your luck.", "dim"),
          );
          break;
        case "about":
        case "whoami":
          push(
            out(`${site.name} — ${site.tagline}`, "brand"),
            out(site.description),
            out(`Based in ${site.location}.`, "dim"),
          );
          break;
        case "pwd":
          push(out("/home/visitor/portfolio"));
          break;
        case "ls":
          push(out(Object.keys(PAGES).filter((k) => !k.includes("/")).join("   ")));
          break;
        case "cd":
        case "goto":
        case "open": {
          const target = (args[0] ?? "").replace(/^\/+|\/+$/g, "").toLowerCase();
          const href = target === "" || target === "~" ? "/" : PAGES[target];
          if (!href) {
            push(out(`${cmd}: no such page: ${args[0] ?? ""}`, "err"), out("Try 'ls'.", "dim"));
          } else {
            push(out(`→ ${href}`, "ok"));
            router.push(href);
            window.setTimeout(close, 250);
          }
          break;
        }
        case "projects":
          for (const p of projects) {
            push(out(`▸ ${p.title}  —  ${p.tagline}`, "brand", `/projects/${p.slug}`));
          }
          push(out("Click a project or run 'goto <name>'.", "dim"));
          break;
        case "skills":
          push(
            out(
              stackRows
                .flat()
                .map((s) => s.name)
                .join(" · "),
            ),
          );
          break;
        case "experience":
          for (const e of experience) push(out(`▸ ${e.org} — ${e.role} (${e.start} – ${e.end})`));
          for (const e of education) push(out(`▸ ${e.school} — ${e.program} (${e.period})`, "dim"));
          break;
        case "contact":
          push(
            out(`email      ${site.email}`, undefined, `mailto:${site.email}`),
            out(`github     ${site.githubHandle}`, undefined, site.github),
            out(`instagram  ${site.instagramHandle}`, undefined, site.instagram),
            out(`discord    ${site.discord}`),
          );
          break;
        case "neofetch": {
          const dark = document.documentElement.classList.contains("dark");
          const art = [
            "   ██████╗   ",
            "   ██╔══██╗  ",
            "   ██████╔╝  ",
            "   ██╔═══╝   ",
            "   ██║       ",
            "   ╚═╝       ",
          ];
          const info = [
            `visitor@${site.shortName.toLowerCase()}`,
            "──────────────────",
            `Host:    ${site.name}`,
            `Role:    ${site.role}`,
            `From:    ${site.location}`,
            `OS:      Next.js 16 on Cloudflare`,
            `Theme:   ${dark ? "dark" : "light"}`,
            `Uptime:  ${Math.round(performance.now() / 1000)}s`,
          ];
          for (let i = 0; i < info.length; i++) {
            push(out(`${art[i] ?? "             "}${info[i]}`, i === 0 ? "brand" : undefined));
          }
          break;
        }
        case "theme": {
          const want = (args[0] ?? "").toLowerCase();
          const root = document.documentElement;
          const now = root.classList.contains("dark") ? "dark" : "light";
          const next = want === "dark" || want === "light" ? want : now === "dark" ? "light" : "dark";
          root.classList.toggle("dark", next === "dark");
          root.style.colorScheme = next;
          try {
            localStorage.setItem("theme", next);
          } catch {
            /* storage can be blocked */
          }
          push(out(`theme → ${next}`, "ok"));
          break;
        }
        case "fx": {
          const name = (args[0] ?? "").toLowerCase();
          if (name === "off" || name === "on") {
            setFxEnabled(name === "on");
            push(out(`pixel effects ${name}`, "ok"));
          } else if (name === "" || name === "list") {
            push(
              out("Usage: fx <name>   (fx all, fx on, fx off)", "brand"),
              out(FX_NAMES.map((n) => `${n} (${FX[n].blurb})`).join(", ")),
              out("Effects by pixelfx — github.com/patch-gg/pixelfx", "dim"),
            );
          } else if (!fxEnabled()) {
            push(out("Effects are off (or your system prefers reduced motion). Try 'fx on'.", "err"));
          } else if (name === "all") {
            FX_NAMES.filter((n) => n !== "lightning").forEach((n, i) =>
              window.setTimeout(() => {
                const { x, y } = centre();
                playFx(n, x, y + 80);
              }, i * 260),
            );
            push(out("Everything, everywhere, all at once.", "ok"));
          } else if ((FX_NAMES as string[]).includes(name)) {
            const { x, y } = centre();
            playFx(name as FxName, x, y + 90);
            push(out(`✦ ${FX[name as FxName].blurb}`, "ok"));
          } else {
            push(out(`fx: unknown effect '${name}'. Try 'fx list'.`, "err"));
          }
          break;
        }
        case "date":
          push(out(new Date().toString()));
          break;
        case "echo":
          push(out(args.join(" ")));
          break;
        case "history":
          history.current.forEach((h, i) => push(out(`${String(i + 1).padStart(3)}  ${h}`, "dim")));
          break;
        case "clear":
          setLines([]);
          break;
        case "exit":
        case "quit":
          close();
          break;
        case "sudo":
          if (args.join(" ").toLowerCase() === "hire-me" || args.join(" ").toLowerCase() === "hire me") {
            const { x, y } = centre();
            playFx("confetti", x, y + 120);
            playFx("firework", x, y);
            push(
              out("[sudo] password accepted. Great choice.", "ok"),
              out(`Send the offer to ${site.email}`, "brand", `mailto:${site.email}`),
            );
          } else {
            push(out("visitor is not in the sudoers file. This incident will be reported.", "err"));
          }
          break;
        case "rm":
          if (text.includes("-rf")) {
            const { x, y } = centre();
            playFx("lightning", x, y + 120);
            push(out("Nice try. The server is on Cloudflare, not on your side of the screen.", "err"));
          } else {
            push(out("rm: missing operand", "err"));
          }
          break;
        case "hello":
        case "hi":
        case "hey": {
          const { x, y } = centre();
          playFx("burst", x, y + 60);
          push(out(`Hey! Thanks for stopping by. Sign the guestbook on your way out.`, "ok"));
          break;
        }
        case "vim":
        case "vi":
        case "nano":
        case "emacs":
          push(out(`${cmd}: you can check in, but you can never leave. (Try 'exit'.)`, "dim"));
          break;
        case "ping":
          push(out("PONG — 0% packet loss, 100% vibes.", "ok"));
          break;
        default:
          push(out(`${cmd}: command not found. Type 'help'.`, "err"));
      }
    },
    [push, router, close],
  );

  const complete = (value: string) => {
    const parts = value.split(/\s+/);
    if (parts.length === 1) {
      const hits = COMMANDS.filter((c) => c.startsWith(parts[0].toLowerCase()));
      if (hits.length === 1) return `${hits[0]} `;
      if (hits.length > 1) push(out(hits.join("   "), "dim"));
      return value;
    }
    const pool = parts[0] === "fx" ? [...FX_NAMES, "all", "list", "on", "off"] : Object.keys(PAGES);
    const hits = pool.filter((c) => c.startsWith(parts[1].toLowerCase()));
    if (hits.length === 1) return `${parts[0]} ${hits[0]}`;
    if (hits.length > 1) push(out(hits.join("   "), "dim"));
    return value;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.current.length === 0) return;
      cursor.current = Math.max(0, cursor.current - 1);
      setInput(history.current[cursor.current] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      cursor.current = Math.min(history.current.length, cursor.current + 1);
      setInput(history.current[cursor.current] ?? "");
    } else if (event.key === "Tab") {
      event.preventDefault();
      setInput((v) => complete(v));
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    } else if (event.key === "c" && event.ctrlKey) {
      event.preventDefault();
      push(out(`visitor@${site.shortName.toLowerCase()}:~$ ${input}^C`, "cmd"));
      setInput("");
    }
  };

  const toneClass: Record<Tone, string> = useMemo(
    () => ({
      cmd: "text-white",
      dim: "text-white/45",
      ok: "text-emerald-300",
      err: "text-red-400",
      brand: "text-[#00d294]",
    }),
    [],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
      data-no-fx
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
    >
      <div
        className="term-backdrop absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onMouseDown={close}
      />
      <div className="term-window relative flex h-[min(72dvh,540px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0e0c] font-mono text-[12.5px] leading-relaxed text-emerald-50/90 shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2">
          <button
            type="button"
            onClick={close}
            aria-label="Close terminal"
            className="size-3 cursor-pointer rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
          />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate text-[11px] text-white/40">
            visitor@{site.shortName.toLowerCase()}: ~
          </span>
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="min-h-0 flex-1 overflow-y-auto px-3 py-3"
        >
          {lines.map((line, i) => {
            const cls = `block whitespace-pre-wrap break-words ${line.tone ? toneClass[line.tone] : "text-emerald-50/85"}`;
            if (line.href?.startsWith("/")) {
              return (
                <Link
                  key={i}
                  href={line.href}
                  onClick={close}
                  className={`${cls} underline decoration-white/20 underline-offset-2 hover:decoration-current`}
                >
                  {line.text}
                </Link>
              );
            }
            if (line.href) {
              return (
                <a
                  key={i}
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`${cls} underline decoration-white/20 underline-offset-2 hover:decoration-current`}
                >
                  {line.text}
                </a>
              );
            }
            return (
              <span key={i} className={cls}>
                {line.text || "\u00a0"}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3 pt-2 sm:hidden">
          {["help", "about", "projects", "neofetch", "fx all"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-white/70 active:bg-white/10"
            >
              {c}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 px-3 py-2.5 sm:border-t sm:border-white/10">
          <span className="shrink-0 text-[#00d294]">
            visitor@{site.shortName.toLowerCase()}:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-white caret-[#00d294] outline-none"
          />
        </label>
      </div>
    </div>
  );
}
