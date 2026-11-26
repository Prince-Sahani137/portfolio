import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, StackIcon } from "@/components/icons";
import { ContactCta, SectionHeading } from "@/components/sections";
import { projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const iconLabels: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  linux: "Linux",
  tailscale: "Tailscale",
  docker: "Docker",
  cplusplus: "C++",
  arduino: "Arduino",
  ollama: "Ollama",
  espressif: "ESP32",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const other = projects.find((item) => item.slug !== project.slug);

  return (
    <main className="relative flex min-h-dvh flex-col gap-8">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/projects"
          className="transition-colors hover:text-foreground"
        >
          Projects
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground">{project.title}</span>
      </nav>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="font-space text-3xl font-bold tracking-tight">
                {project.title}
                <span className="text-brand">.</span>
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                {project.subtitle}
              </p>
            </div>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-sfx="tap"
              data-sfx-hover="tick"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-muted/50"
            >
              <Icon name="github" className="size-3.5" />
              View source
              <Icon name="arrow-up-right" className="size-3" />
            </a>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="flex h-6 items-center rounded-md border border-border bg-background px-2 text-[11px] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-canvas">
          <div
            aria-hidden="true"
            className="stripe-band absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_95%)]"
          />
          {project.imageOnDark ? (
            <div className="relative flex items-center justify-center p-6 sm:p-10">
              <div className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-[#0b1220] p-6 shadow-xl sm:p-10">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={2172}
                  height={724}
                  sizes="(min-width: 768px) 700px, 100vw"
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-center p-4 sm:p-8">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1514}
                height={924}
                sizes="(min-width: 768px) 700px, 100vw"
                className="h-auto w-full rounded-lg border border-black/10 shadow-xl ring-[5px] ring-white/30 dark:border-white/10 dark:ring-white/10"
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>

      <section id="details">
        <div className="flex flex-col gap-y-6">
          <SectionHeading title="What it does" />
          <ul className="grid gap-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] size-1.5 flex-none rounded-full bg-brand"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="stack">
        <div className="flex flex-col gap-y-6">
          <SectionHeading title="Stack" />
          <ul className="flex flex-wrap gap-2">
            {project.icons.map((icon) => (
              <li
                key={icon}
                className="flex h-8 items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-[11px] text-muted-foreground"
              >
                <StackIcon slug={icon} name={icon} className="size-3.5" />
                {iconLabels[icon] ?? icon}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="arrow-left" className="size-3.5" />
          All projects
        </Link>
        {other ? (
          <Link
            href={`/projects/${other.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Next: {other.title}
            <Icon name="arrow-right" className="size-3.5" />
          </Link>
        ) : null}
      </div>

      <ContactCta />
    </main>
  );
}
