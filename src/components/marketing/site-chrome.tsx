import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CREAM } from "../landing-art/primitives";
import { NightAurora } from "../landing-art/shaders";
import { fontVars } from "./fonts";

export const EMAIL = "hello@thejoydigi.com";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#lab", label: "Lab" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/books", label: "Books" },
  { href: "/#about", label: "About" },
];

/** P7 horizontal lockup; its baked #0B0B0C ground melts into the dark header and footer. */
const LOGO = { src: "/brand/logo-horizontal-dark.svg", width: 2400, height: 879 };

function Logo() {
  return (
    <Link href="/" className="-ml-2 inline-flex shrink-0 no-underline hover:no-underline" aria-label="The Joy Digi home">
      <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="" priority unoptimized className="h-[62px] w-auto" />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const isActive = (href: string) =>
    href === "/#work" ? pathname.startsWith("/case-studies") : !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0C]">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[15px] font-medium no-underline hover:no-underline transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#FFC94A] after:transition-all after:duration-300 hover:text-[#FDF6EC] ${
                isActive(item.href) ? "text-[#FDF6EC] after:w-full" : "text-[#FDF6EC]/75 after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="btn-joy rounded-full bg-[#FFC94A] px-5 py-2.5 text-sm font-semibold text-[#0B0B0C] hover:bg-[#FFD86B] no-underline hover:no-underline"
          >
            Say hi 👋
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#FDF6EC]/20 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={CREAM} strokeWidth={2} strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#FDF6EC]/10 md:hidden"
            aria-label="Mobile"
          >
            <div className="container mx-auto flex flex-col px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-[#FDF6EC]/10 py-3 font-bungee text-2xl no-underline hover:no-underline ${
                    isActive(item.href) ? "text-[#FFC94A]" : "text-[#FDF6EC]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setOpen(false)}
                className="mt-4 mb-2 rounded-full bg-[#FFC94A] py-3.5 text-center font-semibold text-[#0B0B0C] no-underline hover:no-underline"
              >
                Say hi 👋
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-[3px] origin-left bg-spectrum"
      />
    </header>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Work",
    links: [
      { href: "/case-studies/the-blue-sock", label: "The Blue Sock" },
      { href: "/case-studies/qrganiz", label: "QRganiz" },
      { href: "/case-studies", label: "All projects" },
    ],
  },
  {
    title: "Listen",
    links: [
      { href: "/podcasts/money-mastered", label: "Money, Mastered" },
      { href: "/podcasts/oc-pack", label: "The OC Pack" },
      { href: "/podcasts", label: "All podcasts" },
      { href: "/books", label: "Books" },
    ],
  },
  {
    title: "Say hi",
    links: [
      { href: `mailto:${EMAIL}`, label: EMAIL },
      { href: "/#lab", label: "The Lab" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0B0B0C] text-[#FDF6EC]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80">
        <NightAurora intensity={0.8} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.2),rgba(11,11,12,0.85)_70%)]" />
      </div>
      <div className="container relative mx-auto px-4 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="-ml-3 mb-8 inline-flex no-underline hover:no-underline" aria-label="The Joy Digi home">
              <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt="" unoptimized className="h-[96px] w-auto mix-blend-lighten md:h-[112px]" />
            </Link>
            <p className="font-bungee text-3xl leading-[1.08] md:text-[2.6rem]">
              Let&apos;s make something <span className="joy-accent-night">joyful.</span>
            </p>
            <p className="mt-5 max-w-sm text-[#FDF6EC]/70">
              The Joy Digi is where Long La builds joyful things with code and super intelligence (SI) — products, podcasts, and experiments.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="btn-joy mt-8 inline-flex items-center gap-3 rounded-full bg-[#FFC94A] px-6 py-3.5 font-semibold text-[#0B0B0C] hover:bg-[#FFD86B] no-underline hover:no-underline"
            >
              Say hello <span aria-hidden>→</span>
            </a>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="!py-0 mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FDF6EC]/50">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-[#FDF6EC]/85 transition-colors hover:text-[#FFC94A] no-underline hover:no-underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-[#FDF6EC]/15 pt-6 text-sm text-[#FDF6EC]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Joy Digi. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[#FFC94A] no-underline hover:no-underline">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-[#FFC94A] no-underline hover:no-underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Applies brand fonts and page chrome; shared by MainLayout and BlogLayout. */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} min-h-screen bg-[#FDF6EC] text-[#1B140D] [font-family:var(--font-body),system-ui,sans-serif]`}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
