import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { DiscordRow } from "@/components/copy-discord";
import { Icon, type IconName } from "@/components/icons";
import { StackMarquee } from "@/components/stack";
import { ContactCta, SectionHeading } from "@/components/sections";
import { education, nowItems, site, socials, tinkering } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "About Prince Sahani — a 19-year-old student and self-taught developer from Mau, Uttar Pradesh who builds agentic AI tools, home-lab projects and embedded devices.",
};

const socialIcons: Record<string, IconName> = {
  GitHub: "github",
  Instagram: "instagram",
  Discord: "discord",
  Email: "mail",
};

export default function AboutPage() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex flex-row items-center gap-6">
            <Avatar />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="font-space text-xl font-medium tracking-tighter sm:text-3xl">
                  {site.name}
                </span>
                <Icon name="sparkles" className="size-4 text-brand" />
              </div>
              <div className="flex">
                <span className="text-sm tracking-tight text-muted-foreground sm:text-base">
                  {site.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <p>
            I&apos;m Prince, a 19-year-old student and{" "}
            <span className="scribble">self-taught</span> developer from Mau,
            Uttar Pradesh. I got into tech by breaking my own Linux installs and
            stayed because there is nothing quite like watching something you
            built actually work.
          </p>
          <p>
            Most of what I know comes from projects: a pocket AI chatbot running
            on an ESP32, a self-hosted control deck for my laptop, and a home
            lab that keeps teaching me networking the hard way. I&apos;m in 12th
            standard right now, so most of my building happens after school and
            on weekends.
          </p>
          <p>
            I like <span className="scribble">agentic AI</span>, Linux,
            self-hosting and small devices with tiny screens. Long term I want
            to keep building tools that make computers feel a little more
            personal.
          </p>
        </div>

        <div>
          <ul className="stripe-band -mx-6 grid grid-cols-1 border-y border-border bg-canvas sm:grid-cols-2 sm:gap-x-5">
            {socials.map((social) => (
              <li
                key={social.label}
                className="border-b border-border bg-background sm:odd:border-r sm:even:border-l"
              >
                {social.href ? (
                  <a
                    href={social.href}
                    data-sfx="tap"
                    data-sfx-hover="tick"
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none"
                  >
                    <span className="flex size-8 flex-none items-center justify-center rounded-md border border-border bg-background text-foreground">
                      <Icon name={socialIcons[social.label]} className="size-4" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span className="text-sm font-medium text-foreground">
                        {social.label}
                      </span>
                      <span className="truncate font-mono text-[11px] text-muted-foreground">
                        {social.handle}
                      </span>
                    </span>
                    <Icon
                      name="arrow-up-right"
                      className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <DiscordRow value={social.handle} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading
            title="Skills"
            subtitle="What I use, and what I am still learning."
          />
          <StackMarquee />
        </div>
      </section>

      <section id="now">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading title="Right now" />
          <ul className="flex flex-col gap-2.5">
            {nowItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] size-1.5 flex-none rounded-full bg-brand"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tinkering">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading
            title="Tinkering"
            subtitle="Random stuff I try when I should probably be studying."
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {tinkering.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="spotlight lift flex flex-col gap-2 rounded-xl border border-border bg-card/40 p-4"
              >
                <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-brand">
                  <Icon name={item.icon} className="size-4" />
                </span>
                <h3 className="font-space text-sm font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <SectionHeading title="Education" />
          <div className="flex flex-col gap-6">
            {education.map((item) => (
              <div key={item.school} className="flex items-start gap-2.5">
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
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold leading-snug">
                      {item.school}
                    </span>
                    <span className="text-[11px] tabular-nums text-muted-foreground/50">
                      {item.period}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.program} · {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guestbook-cta">
        <div className="spotlight flex flex-col items-start gap-3 rounded-xl border border-border bg-card/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-space text-base font-medium tracking-tight">
              Made it this far?
            </h2>
            <p className="text-xs text-muted-foreground">
              Leave a note in the guestbook — no sign-up needed.
            </p>
          </div>
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted/40"
          >
            Sign the guestbook
            <Icon name="arrow-right" className="size-3.5" />
          </Link>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
