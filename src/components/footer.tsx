import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import { avatars, navItems, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-10 mb-4">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="px-1 pt-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <div className="flex items-center gap-3">
              <span className="relative flex size-11 flex-none overflow-hidden rounded-lg border border-border/60 shadow-sm">
                <Image
                  src={avatars[0].src}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-space text-sm font-medium text-foreground">
                  {site.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {site.role}
                </span>
              </div>
            </div>
            <p className="max-w-[220px] text-xs leading-relaxed text-muted-foreground">
              Student, developer and chronic tinkerer. If you made it this far,
              say hi in the guestbook.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              Explore
            </p>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-sfx="soft"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#work"
                  data-sfx="soft"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
              Connect
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-sfx="tap"
                  data-sfx-hover="tick"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-sfx="tap"
                  data-sfx-hover="tick"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-sfx="tap"
                  data-sfx-hover="tick"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Email
                </a>
              </li>
              <li>
                <Link
                  href="/guestbook"
                  data-sfx="soft"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Guestbook
                  <Icon name="arrow-up-right" className="size-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-border/40 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © 2026 {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
            {site.githubHandle.toLowerCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
