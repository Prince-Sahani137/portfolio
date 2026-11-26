"use client";

import { Icon } from "./icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be blocked */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-sfx="toggle"
      title="Toggle theme"
      aria-label="Toggle theme"
      className={`flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4 ${className}`}
    >
      <Icon name="sun" className="hidden dark:block" />
      <Icon name="moon" className="dark:hidden" />
    </button>
  );
}
