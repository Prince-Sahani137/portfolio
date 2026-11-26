export const site = {
  name: "Prince Sahani",
  shortName: "Prince",
  role: "Student & Developer",
  tagline: "19y/o student · developer · tech enthusiast",
  age: 19,
  location: "Mau, Uttar Pradesh, India",
  email: "contact@princesahani.site",
  github: "https://github.com/Prince-Sahani137",
  githubHandle: "Prince-Sahani137",
  instagram: "https://www.instagram.com/prince_sahani137",
  instagramHandle: "@prince_sahani137",
  discord: "sub4ru13",
  url: "https://princesahani.site",
  description:
    "Prince Sahani is a 19-year-old student and self-taught developer from Mau, Uttar Pradesh. He builds agentic AI tools, home-lab projects and embedded devices.",
};

export const avatars = [
  { src: "/avatars/pfp-1.webp", alt: "Prince Sahani" },
  { src: "/avatars/pfp-2.webp", alt: "Prince Sahani, illustrated avatar" },
  { src: "/avatars/pfp-3.webp", alt: "Prince Sahani wearing sunglasses" },
  { src: "/avatars/pfp-4.webp", alt: "Prince Sahani, anime-style avatar" },
];

export const socials = [
  {
    label: "GitHub",
    handle: site.githubHandle,
    href: site.github,
    icon: "github" as const,
  },
  {
    label: "Instagram",
    handle: site.instagramHandle,
    href: site.instagram,
    icon: "instagram" as const,
  },
  {
    label: "Discord",
    handle: site.discord,
    href: undefined,
    icon: "discord" as const,
  },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    icon: "mail" as const,
  },
];

export type Experience = {
  org: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  tags: string[];
  href?: string;
  logo: string;
  logoTone: string;
  logoImage?: string;
};

export const experience: Experience[] = [
  {
    org: "Independent",
    role: "Agentic AI Developer",
    start: "Ongoing",
    end: "",
    summary: "Building agentic workflows and local AI tooling.",
    highlights: [
      "Building tool-using AI agents and automation pipelines around local models",
      "Shipping agentic experiments end to end, from prompt design to the interface that drives them",
      "Running models locally with Ollama and wiring them into embedded and web projects",
    ],
    tags: ["Agentic AI", "Ollama", "Python", "Automation"],
    href: site.github,
    logo: "AI",
    logoTone: "from-emerald-500 to-teal-600",
    logoImage: "/logos/agentic-ai.webp",
  },
  {
    org: "Home Lab",
    role: "Self-hosted infrastructure",
    start: "Ongoing",
    end: "",
    summary: "Linux boxes, containers and a tailnet-only network.",
    highlights: [
      "Running Ubuntu and Kali machines, Docker containers and a Tailscale-only network",
      "Self-hosting dashboards, file transfer and remote access for my own hardware",
      "Learning Linux, networking and Cloudflare the practical way: break it, then fix it",
    ],
    tags: ["Linux", "Docker", "Tailscale", "Cloudflare"],
    href: "/projects/taildeck",
    logo: "HL",
    logoTone: "from-sky-500 to-indigo-600",
    logoImage: "/logos/home-lab.webp",
  },
];

export type Education = {
  school: string;
  program: string;
  period: string;
  note: string;
  logo: string;
  logoTone: string;
  logoImage?: string;
};

export const education: Education[] = [
  {
    school: "Amrit Public School",
    program: "Class 12 · Science",
    period: "Pursuing",
    note: "Currently in 12th standard, Mau, Uttar Pradesh",
    logo: "AP",
    logoTone: "from-amber-500 to-orange-600",
    logoImage: "/logos/amrit-public-school.webp",
  },
  {
    school: "Dawn Washco School",
    program: "Schooling",
    period: "Completed",
    note: "Mau, Uttar Pradesh",
    logo: "DW",
    logoTone: "from-violet-500 to-fuchsia-600",
    logoImage: "/logos/dawn-washco-school.webp",
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  icons: string[];
  href: string;
  image: string;
  imageAlt: string;
  imageOnDark?: boolean;
  peek?: { x: string; y: string; scale: string };
  /** CSS background painted behind the card on hover. */
  backdrop: string;
};

export const projects: Project[] = [
  {
    slug: "taildeck",
    title: "TailDeck",
    subtitle: "Self-hosted Linux control deck",
    tagline:
      "A lightweight, self-hosted control panel for your own Linux machine, reachable only over Tailscale.",
    description:
      "TailDeck puts your Hyprland desktop, a persistent XFCE desktop, a full terminal, live hardware charts, file transfer and service logs behind one password-protected web page on your tailnet. It is plain Python (standard library + psutil) with a dependency-free vanilla JS UI — no build step, no framework, no external requests.",
    highlights: [
      "Browser access to Hyprland and XFCE desktops, a full terminal, file transfer, service logs and live CPU / RAM / GPU / temperature charts.",
      "Reachable only over a Tailscale tailnet — nothing exposed to the LAN or the public internet.",
      "Pure Python standard library plus psutil, with a vanilla JS front end. Clone it, run it, open it in a browser.",
    ],
    tags: ["Python", "Vanilla JS", "Linux", "Tailscale", "noVNC"],
    icons: ["python", "javascript", "linux", "tailscale", "docker"],
    href: "https://github.com/Prince-Sahani137/taildeck",
    image: "/projects/taildeck-dashboard.webp",
    imageAlt: "TailDeck dashboard with live CPU, memory and GPU charts",
    peek: { x: "6%", y: "8%", scale: "1.08" },
    backdrop:
      "radial-gradient(120% 110% at 15% 10%, #14b8a6 0%, #0f766e 32%, #0b1220 78%, #05070d 100%)",
  },
  {
    slug: "m5stickchat",
    title: "StickChat",
    subtitle: "M5StickChat",
    tagline:
      "A pocket-sized AI chatbot for the M5StickC Plus2, powered by Ollama.",
    description:
      "StickChat turns the M5StickC Plus2 into a tiny interface for chatting with an Ollama model running on your laptop or with a model available through Ollama Cloud. It uses the device's 240 × 135 display and three-button controls with a compact, menu-driven interface.",
    highlights: [
      "Chat with local Ollama models or Ollama Cloud from a 240 × 135 screen using a three-button on-screen keyboard.",
      "Streaming replies, a model browser, prompt history and automatic local / cloud fallback.",
      "Also works as a clock, timer, stopwatch and alarm with NTP time sync and RTC persistence.",
    ],
    tags: ["C++", "ESP32", "PlatformIO", "Ollama", "Wi-Fi"],
    icons: ["cplusplus", "arduino", "ollama", "espressif"],
    href: "https://github.com/Prince-Sahani137/M5StickChat",
    image: "/projects/m5stickchat-logo.webp",
    imageAlt: "StickChat logo",
    imageOnDark: true,
    peek: { x: "0%", y: "0%", scale: "1" },
    backdrop:
      "radial-gradient(120% 110% at 20% 0%, #22d3ee 0%, #0891b2 30%, #064e3b 72%, #04121a 100%)",
  },
];

export type StackItem = {
  name: string;
  icon?: string;
  invertOnDark?: boolean;
};

export const stackRows: StackItem[][] = [
  [
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css" },
    { name: "C++", icon: "cplusplus" },
    { name: "Bash", icon: "gnubash" },
    { name: "Linux", icon: "linux" },
    { name: "Ubuntu", icon: "ubuntu" },
  ],
  [
    { name: "Docker", icon: "docker" },
    { name: "Cloudflare", icon: "cloudflare" },
    { name: "Vercel", icon: "vercel", invertOnDark: true },
    { name: "Tailscale", icon: "tailscale", invertOnDark: true },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github", invertOnDark: true },
    { name: "Ollama", icon: "ollama", invertOnDark: true },
    { name: "PlatformIO", icon: "platformio" },
  ],
  [
    { name: "Agentic AI" },
    { name: "ESP32", icon: "espressif" },
    { name: "Arduino", icon: "arduino" },
    { name: "Home Lab" },
    { name: "Self-hosting" },
    { name: "Networking" },
    { name: "VNC" },
    { name: "Markdown", icon: "markdown", invertOnDark: true },
  ],
];

export const nowItems = [
  "Finishing 12th standard at Amrit Public School, Mau",
  "Building agentic AI tools and local-model workflows with Ollama",
  "Growing my home lab: Ubuntu, Docker, Tailscale and Cloudflare",
  "Shipping small projects to learn faster — like TailDeck and StickChat",
];

export const tinkering = [
  {
    title: "Home lab",
    description:
      "An Ubuntu and Kali setup with Docker services, a Tailscale-only network and dashboards I actually use.",
    icon: "server" as const,
  },
  {
    title: "Agentic AI",
    description:
      "Tool-calling agents, prompt pipelines and local models. If it can be automated, I will probably try.",
    icon: "sparkles" as const,
  },
  {
    title: "Embedded things",
    description:
      "ESP32 boards, tiny screens and three-button UIs. StickChat started as a 'can this run on a watch?' experiment.",
    icon: "cpu" as const,
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Guestbook", href: "/guestbook" },
];
