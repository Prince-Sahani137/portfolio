import Link from "next/link";
import { Guestbook } from "@/components/guestbook";

export const metadata = {
  title: "Guestbook",
  description:
    "Say hi, leave a trace, or drop a tiny note from your corner of the internet.",
};

export default function GuestbookPage() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-8">
      <section className="flex min-h-0 flex-col gap-y-8">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">Guestbook</span>
        </nav>

        <div className="flex flex-col gap-y-1.5">
          <h1 className="font-space text-3xl font-bold tracking-tight">
            Guestbook<span className="text-brand">.</span>
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">
            Say hi, leave a trace, or drop a tiny note from your corner of the
            internet.
          </p>
        </div>

        <Guestbook />
      </section>
    </main>
  );
}
