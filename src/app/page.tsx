import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { ExperienceList } from "@/components/experience";
import { Heatmap } from "@/components/heatmap";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { StackMarquee } from "@/components/stack";
import {
  ContactCta,
  SectionDivider,
  SectionHeading,
} from "@/components/sections";
import { education, experience, projects, site } from "@/lib/site";

export const metadata = {
  description: site.description,
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-8">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex flex-row items-center gap-6">
            <Avatar />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="font-space text-xl font-medium tracking-tighter sm:text-3xl">
                  {site.name}
                </span>
                <Icon
                  name="sparkles"
                  className="size-4 text-brand"
                  aria-label="Builder"
                />
              </div>
              <div className="flex">
                <span className="text-sm tracking-tight text-muted-foreground sm:text-base">
                  {site.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-3">
          <div className="relative z-10">
            <div className="text-xs leading-snug text-muted-foreground sm:text-sm">
              <span className="scribble">Student</span> and self-taught{" "}
              <span className="scribble">developer</span> from Mau, Uttar
              Pradesh. I love <span className="scribble">home-labbing</span>,
              building things and poking at agentic AI. Currently in 12th
              standard, learning by shipping — most recently{" "}
              <Link
                href="/projects/taildeck"
                className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-brand"
              >
                TailDeck
              </Link>{" "}
              and{" "}
              <Link
                href="/projects/m5stickchat"
                className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-brand"
              >
                StickChat
              </Link>
              .
            </div>
          </div>

          <div className="flex flex-col gap-y-4 sm:flex-row sm:items-end sm:justify-between sm:gap-x-6">
            <div>
              <div className="flex flex-col gap-y-1.5 font-mono text-[12px] text-muted-foreground md:text-[13px]">
                <div className="flex items-center gap-2">
                  <Icon name="briefcase" className="size-3.5" />
                  <span>Student &amp; Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="map-pin" className="size-3.5" />
                  <span>{site.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="mail" className="size-3.5" />
                  <a
                    href={`mailto:${site.email}`}
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    {site.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="github" className="size-3.5" />
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    {site.githubHandle}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="instagram" className="size-3.5" />
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    {site.instagramHandle}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="graduation-cap" className="size-3.5" />
                  <span className="flex items-center gap-1.5">
                    12th standard @
                    <span className="font-medium text-foreground">
                      Amrit Public School
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/about"
                data-sfx="soft"
                className="group inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background pl-3 pr-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/50"
              >
                More about me
                <Icon
                  name="arrow-right"
                  className="size-3 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading title="Experience" />
          <ExperienceList items={experience} />
        </div>
      </section>

      <SectionDivider />

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading title="Education" />
          <div className="flex flex-col gap-8">
            {education.map((item) => (
              <div key={item.school} className="relative block w-fit">
                <div className="flex w-fit items-start gap-x-2.5">
                  <span
                    className={`relative mt-0.5 flex size-7 flex-none items-center justify-center overflow-hidden rounded-full border border-border bg-gradient-to-br ${item.logoTone} text-[10px] font-semibold text-white shadow ring-2 ring-border md:size-9`}
                  >
                    {item.logoImage ? (
                      <Image
                        src={item.logoImage}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      item.logo
                    )}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-sm font-semibold leading-snug">
                      {item.school}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-sans text-xs text-muted-foreground">
                        {item.program}
                      </span>
                      <span className="text-[11px] tabular-nums text-muted-foreground/50">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground/70">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="projects">
        <div className="flex min-h-0 w-full flex-col gap-y-6">
          <SectionHeading
            title="Projects"
            href="/projects"
            linkLabel="view all projects"
          />
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="flex justify-center pt-2">
            <Link
              href="/projects"
              data-sfx="soft"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              View all projects
              <Icon
                name="arrow-right"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading
            title="Stack"
            subtitle="The tools I reach for, from the terminal to the tiny screen."
          />
          <StackMarquee />
        </div>
      </section>

      <SectionDivider />

      <section id="github">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading
            title="A year in commits"
            subtitle="Proof I ship. The grey squares are me touching grass."
            href={site.github}
            linkLabel="open GitHub"
          />
          <Heatmap />
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
