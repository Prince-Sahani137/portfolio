import Link from "next/link";
import { Icon } from "./icons";
import { site } from "@/lib/site";

export function SideRails() {
  return (
    <>
      <nav
        aria-label="Social links"
        className="fixed bottom-0 z-20 hidden flex-col items-center gap-5 xl:flex"
        style={{ left: "calc((50vw - 27.5rem) / 2)", translate: "-50%" }}
      >
        <ul className="flex flex-col items-center gap-1.5">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground/70 transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
            >
              <Icon name="github" className="size-4" />
            </a>
          </li>
          <li>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground/70 transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
            >
              <Icon name="instagram" className="size-4" />
            </a>
          </li>
          <li>
            <Link
              href="/guestbook"
              aria-label="Guestbook"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground/70 transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
            >
              <Icon name="message-square" className="size-4" />
            </Link>
          </li>
          <li aria-hidden="true" className="my-1.5 h-px w-4 bg-border" />
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="flex size-8 items-center justify-center rounded-md border border-border bg-background text-foreground/80 shadow-xs transition-[color,translate] duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
            >
              <Icon name="mail" className="size-4" />
            </a>
          </li>
        </ul>
        <span aria-hidden="true" className="h-20 w-px bg-border" />
      </nav>

      <div
        className="fixed bottom-0 z-20 hidden flex-col items-center gap-5 xl:flex"
        style={{ right: "calc((50vw - 27.5rem) / 2)", translate: "50%" }}
      >
        <a
          href={`mailto:${site.email}`}
          data-sfx="tap"
          data-sfx-hover="tick"
          className="rounded-sm font-mono text-[11px] lowercase tracking-[0.18em] text-muted-foreground/70 transition-[color,translate] duration-200 [writing-mode:vertical-rl] hover:-translate-y-0.5 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
        >
          {site.email}
        </a>
        <span aria-hidden="true" className="h-20 w-px bg-border" />
      </div>
    </>
  );
}
