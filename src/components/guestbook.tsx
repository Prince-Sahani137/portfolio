"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./icons";
import { playFx } from "@/lib/fx-bus";
import type { GuestbookEntry } from "@/lib/guestbook";

const MAX_MESSAGE = 280;

function hueFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
}

function initialsFor(name: string) {
  const cleaned = name.trim();
  if (!cleaned) return "?";
  return cleaned.slice(0, 1).toUpperCase();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function HueAvatar({
  name,
  className = "size-9",
}: {
  name: string;
  className?: string;
}) {
  const hue = hueFor(name);
  return (
    <div
      style={{ "--hue": hue } as React.CSSProperties}
      className={`${className} flex items-center justify-center rounded-full bg-[hsl(var(--hue)_70%_93%)] text-[hsl(var(--hue)_45%_35%)] dark:bg-[hsl(var(--hue)_30%_20%)] dark:text-[hsl(var(--hue)_60%_75%)]`}
    >
      <span className="text-xs font-semibold">{initialsFor(name)}</span>
    </div>
  );
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/guestbook", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("bad response");
        return response.json() as Promise<{ entries: GuestbookEntry[] }>;
      })
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const remaining = MAX_MESSAGE - message.length;
  const canSign = name.trim().length > 0 && message.trim().length > 0;

  const previewName = useMemo(
    () => (name.trim() ? name : "?"),
    [name],
  );

  async function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault();
    if (!canSign || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });

      const data = (await response.json()) as {
        entry?: GuestbookEntry;
        error?: string;
      };

      if (!response.ok || !data.entry) {
        throw new Error(data.error ?? "Could not sign the guestbook.");
      }

      setEntries((current) => [data.entry as GuestbookEntry, ...current]);
      setName("");
      setMessage("");
      setSigned(true);
      playFx("confetti", window.innerWidth / 2, window.innerHeight * 0.72);
      window.setTimeout(() => setSigned(false), 5000);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not sign the guestbook.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="group relative flex gap-3 rounded-2xl border border-border/60 bg-card/40 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] focus-within:border-foreground/15 focus-within:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)] sm:p-4"
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          name="website"
        />

        <HueAvatar name={previewName} className="size-9 shrink-0" />

        <div className="min-w-0 flex-1">
          <input
            type="text"
            required
            maxLength={40}
            placeholder="Your name"
            aria-label="Your name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-5 w-full bg-transparent text-sm font-semibold leading-tight outline-none placeholder:font-medium placeholder:text-muted-foreground/50"
            name="name"
          />
          <textarea
            name="message"
            maxLength={MAX_MESSAGE}
            required
            rows={2}
            placeholder="Write something kind, curious, or wildly specific..."
            aria-label="Your note"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                void handleSubmit();
              }
            }}
            className="mt-1 block max-h-64 min-h-11 w-full resize-none bg-transparent text-sm leading-relaxed text-foreground/80 outline-none placeholder:text-muted-foreground/45"
          />

          <div className="mt-2 flex min-h-8 items-center justify-between gap-3">
            <div className="min-w-0 text-xs">
              {signed ? (
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-brand">
                  <Icon name="check" className="size-3" />
                  Signed. Thanks for stopping by!
                </span>
              ) : (
                <span className="hidden items-center gap-1 font-mono text-[11px] text-muted-foreground/60 sm:inline-flex">
                  <kbd className="font-mono">⌘</kbd>
                  <Icon name="arrow-right" className="size-3" />
                  to sign
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`font-mono text-[11px] tabular-nums transition-opacity ${
                  message.length > 0
                    ? "text-muted-foreground/60 opacity-100"
                    : "text-muted-foreground/60 opacity-0"
                }`}
              >
                {remaining}
              </span>
              <button
                type="submit"
                data-sfx="tap"
                disabled={!canSign || submitting}
                className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background transition-all hover:bg-foreground/85 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
              >
                {submitting ? "Signing…" : "Sign"}
              </button>
            </div>
          </div>

          {error ? (
            <p className="mt-1 text-xs text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-space text-2xl font-bold tracking-tighter">
            Notes<span className="text-brand">.</span>
          </h2>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {entries.length} signed
          </span>
        </div>

        <div className="flex flex-col pt-2">
          {loading ? (
            <p className="py-4 text-sm text-muted-foreground">Loading notes…</p>
          ) : entries.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">
              No notes yet. Be the first to sign it.
            </p>
          ) : (
            entries.map((entry, index) => (
              <article
                key={entry.id}
                className={`flex gap-3 py-4 ${
                  index === 0 ? "pt-0" : ""
                } ${index < entries.length - 1 ? "border-b border-border/80" : ""}`}
              >
                <div className="w-9 shrink-0">
                  <HueAvatar name={entry.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-sm font-semibold leading-tight">
                      {entry.name}
                    </h3>
                    <time
                      dateTime={entry.createdAt}
                      className="font-mono text-[11px] leading-none text-muted-foreground"
                    >
                      {formatDate(entry.createdAt)}
                    </time>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/70">
                    {entry.message}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
