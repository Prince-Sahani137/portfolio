import Image from "next/image";
import Link from "next/link";
import { Icon, StackIcon } from "./icons";
import type { Project } from "@/lib/site";

export function ProjectCard({ project }: { project: Project }) {
  const icon = project.slug === "taildeck" ? "terminal" : "message-square";

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-sfx="tap"
      data-sfx-hover="hover"
      data-reveal
      className="group flex min-w-0 flex-col gap-3 rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="tilt spotlight relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-canvas transition-[border-color,box-shadow] duration-300 group-hover:border-brand/40 group-hover:shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--brand)_45%,transparent)]">
        <div
          aria-hidden="true"
          className="stripe-band absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black_95%)]"
        />

        <div
          aria-hidden="true"
          style={{ backgroundImage: project.backdrop }}
          className="absolute inset-0 scale-110 opacity-0 blur-[3px] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />

        {project.imageOnDark ? (
          <div className="absolute inset-0 flex items-center justify-center p-7">
            <div className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-[#0b1220] p-5 shadow-xl">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={2172}
                height={724}
                sizes="(min-width: 768px) 340px, 80vw"
                loading="eager"
                className="h-auto w-full"
              />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1514}
              height={924}
              sizes="(min-width: 768px) 340px, 90vw"
              loading="eager"
              className="corner-peek h-auto w-[92%] rounded-lg border border-black/10 shadow-xl ring-[5px] ring-white/30 dark:border-white/10 dark:ring-white/10"
              style={
                project.peek
                  ? ({
                      "--peek-x": project.peek.x,
                      "--peek-y": project.peek.y,
                      "--peek-scale": project.peek.scale,
                    } as React.CSSProperties)
                  : undefined
              }
            />
          </div>
        )}

        <span className="absolute bottom-3 right-3 flex h-6 items-center gap-1.5 rounded-md border border-border bg-background/90 px-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          {project.icons.map((slug) => (
            <StackIcon key={slug} slug={slug} name={slug} className="size-3.5" />
          ))}
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-1 px-0.5">
        <span className="flex items-center gap-2">
          <span className="flex size-5 flex-none items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
            <Icon name={icon} className="size-3" />
          </span>
          <span className="font-space text-base font-medium leading-snug tracking-tight transition-colors group-hover:text-brand group-focus-visible:text-brand">
            {project.title}
          </span>
        </span>
        <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground/80">
          <span className="min-w-0 truncate">{project.tagline}</span>
          <Icon name="arrow-up-right" className="size-3 flex-none" />
        </span>
      </div>
    </Link>
  );
}
