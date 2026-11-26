import Link from "next/link";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ContactCta } from "@/components/sections";
import { projects, site } from "@/lib/site";

export const metadata = {
  title: "Projects",
  description:
    "Things Prince Sahani has built and shipped: TailDeck, a self-hosted Linux control deck, and StickChat, a pocket AI chatbot on the M5StickC Plus2.",
};

export default function ProjectsPage() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-8">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">Projects</span>
      </nav>

      <section className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h1 className="font-space text-3xl font-bold tracking-tight">
            Projects<span className="text-brand">.</span>
          </h1>
          <p className="max-w-lg text-sm leading-snug text-muted-foreground">
            Small tools, self-hosted systems and embedded experiments — things I
            built to scratch an itch or learn something new.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-sfx="tap"
            data-sfx-hover="tick"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            <Icon name="github" className="size-4" />
            More on GitHub
            <Icon
              name="arrow-up-right"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
