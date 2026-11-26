"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "./icons";
import { SoundToggle } from "./sound-toggle";
import { ThemeToggle } from "./theme-toggle";
import { navItems, site } from "@/lib/site";

const mobileIcons: Record<string, IconName> = {
  Home: "home",
  About: "user",
  Projects: "folder",
  Blog: "book-open",
  Guestbook: "message-square",
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(site.discord);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="flex h-14 w-full max-w-3xl items-center justify-end border-b border-border bg-background/80 px-3 backdrop-blur-md">
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-sfx="soft"
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-center rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-border" />

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-sfx="tap"
            data-sfx-hover="tick"
            title="GitHub"
            aria-label="GitHub"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name="github" />
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-sfx="tap"
            data-sfx-hover="tick"
            title="Instagram"
            aria-label="Instagram"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name="instagram" />
          </a>
          <button
            type="button"
            onClick={copyDiscord}
            data-sfx="tap"
            data-sfx-hover="tick"
            title={copied ? "Copied!" : `Copy Discord username (${site.discord})`}
            aria-label={`Copy Discord username ${site.discord}`}
            className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name={copied ? "check" : "discord"} />
          </button>

          <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-border" />
          <SoundToggle />
          <ThemeToggle />
        </nav>

        <nav
          className="mr-auto flex items-center gap-0.5 sm:hidden"
          aria-label="Main"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                data-sfx="soft"
                aria-current={active ? "page" : undefined}
                className={`relative flex size-8 items-center justify-center rounded-md transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground active:text-foreground"
                }`}
              >
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-muted"
                  />
                ) : null}
                <Icon name={mobileIcons[item.label]} className="relative size-4" />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
