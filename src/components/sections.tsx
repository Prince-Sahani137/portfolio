import { Icon } from "./icons";
import { site } from "@/lib/site";

export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="stripe-band -mx-6 h-5 border-y border-border bg-canvas"
    />
  );
}

export function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="flex flex-col gap-y-1">
        <h2 className="font-space text-xl font-medium tracking-tight">
          {title}
          <span className="text-brand">.</span>
        </h2>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {href ? (
        <a
          href={href}
          data-sfx="tap"
          data-sfx-hover="tick"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {linkLabel ?? "view"}
          <Icon name="arrow-up-right" className="size-3" />
        </a>
      ) : null}
    </div>
  );
}

export function ContactCta() {
  return (
    <section id="contact">
      <div className="spotlight spotlight-light relative isolate overflow-hidden rounded-2xl border border-border bg-neutral-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(130%_140%_at_15%_0%,#0f766e_0%,#0b1220_52%,#05070d_100%)]"
        />
        <div
          aria-hidden="true"
          className="stripe-band absolute inset-0 -z-10 opacity-[0.07]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-16 -top-24 -z-10 size-72 rounded-full bg-emerald-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        />

        <div className="flex flex-col gap-6 px-7 py-10 sm:py-12">
          <div className="flex flex-col gap-2">
            <h2 className="font-space text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
              Building something cool?
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              I&apos;m always up for a good idea. Tell me what you&apos;re
              working on and let&apos;s build something great together.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`mailto:${site.email}?subject=Let%27s%20build%20something`}
              data-sfx="tap"
              data-sfx-hover="tick"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
            >
              <Icon name="mail" className="size-4" />
              Send an email
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Icon name="github" className="size-4" />
              See my GitHub
            </a>
          </div>
          <p className="font-mono text-[11px] tracking-wide text-white/50">
            {site.email}
          </p>
        </div>
      </div>
    </section>
  );
}
