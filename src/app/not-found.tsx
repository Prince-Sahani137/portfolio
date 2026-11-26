import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="font-space text-3xl font-bold tracking-tight">
        Page not found<span className="text-brand">.</span>
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This one is not wired up yet. The home page is a safer place to be.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted/40"
      >
        <Icon name="arrow-left" className="size-3.5" />
        Back home
      </Link>
    </main>
  );
}
