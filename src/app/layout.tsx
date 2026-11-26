import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SideRails } from "@/components/side-rails";
import { SfxProvider } from "@/components/sfx-provider";
import { FxLayer } from "@/components/fx-layer";
import { PointerFx } from "@/components/pointer-fx";
import { Terminal } from "@/components/terminal";
import { site } from "@/lib/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Prince Sahani",
    "portfolio",
    "developer",
    "student developer",
    "home lab",
    "agentic AI",
    "Linux",
    "Python",
    "Mau",
    "Uttar Pradesh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f3" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0e" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('rv');setTimeout(function(){if(!r.dataset.rvReady)r.classList.remove('rv');},4000);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-canvas font-sans antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-screen bg-canvas text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>

        <Header />
        <SideRails />
        <SfxProvider />
        <PointerFx />
        <FxLayer />
        <Terminal />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-3xl bg-background px-6 pb-4 pt-24 sm:pb-6 sm:pt-28">
          <div
            aria-hidden="true"
            className="stripe-rail pointer-events-none absolute inset-y-0 right-full hidden w-14 border-x border-border/70 lg:block"
          />
          <div
            aria-hidden="true"
            className="stripe-rail pointer-events-none absolute inset-y-0 left-full hidden w-14 border-x border-border/70 lg:block"
          />
          <div id="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
