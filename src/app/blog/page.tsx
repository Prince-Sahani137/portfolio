import Link from "next/link";
import { BlogMascot } from "@/components/blog-mascot";
import { Icon } from "@/components/icons";

export const metadata = {
  title: "Blog",
  description:
    "Blogs coming soon. Prince Sahani writes about agentic AI, Linux, home labs and building small things.",
};

export default function BlogPage() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <section id="blog" className="flex flex-1 items-center">
        <figure className="mx-auto flex max-w-md cursor-default flex-col items-center gap-8 py-16 text-center sm:py-24">
          <figcaption className="flex flex-col items-center gap-3">
            <h1 className="sr-only">Blogs coming soon.</h1>
            <p
              aria-hidden="true"
              className="font-sans text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-balance sm:text-[1.75rem]"
            >
              Blogs coming soon.
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              I write when a project teaches me something worth sharing. Until
              then, the projects page is basically the blog.
            </p>
          </figcaption>

          <BlogMascot className="h-auto w-full select-none" />

          <Link
            href="/projects"
            data-sfx="soft"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted/40"
          >
            See the projects
            <Icon name="arrow-right" className="size-3.5" />
          </Link>
        </figure>
      </section>
    </main>
  );
}
