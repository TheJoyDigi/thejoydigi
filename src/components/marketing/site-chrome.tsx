import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CORAL, INK } from "../landing-art/primitives";
import { fontVars } from "./fonts";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 no-underline hover:no-underline" aria-label="The Joy Digi home">
      <svg viewBox="-10 -10 20 20" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" aria-hidden>
        <path d="M0,-10 Q0,0 10,0 Q0,0 0,10 Q0,0 -10,0 Q0,0 0,-10Z" fill={CORAL} />
      </svg>
      <span className="font-display text-[1.45rem] font-[520] tracking-[-0.02em] text-[#003B49]">
        The Joy Digi
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[#003B49]/10 bg-[#FDF6EC]/85 backdrop-blur-md">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[15px] font-medium no-underline hover:no-underline transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#FF6B6B] after:transition-all after:duration-300 hover:text-[#003B49] ${
                isActive(item.href) ? "text-[#003B49] after:w-full" : "text-[#003B49]/70 after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#booking"
            className="rounded-full bg-[#003B49] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5566] no-underline hover:no-underline"
          >
            Book a call
          </Link>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#003B49]/15 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" aria-hidden>
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
            className="overflow-hidden border-t border-[#003B49]/10 md:hidden"
            aria-label="Mobile"
          >
            <div className="container mx-auto flex flex-col px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[#003B49]/5 py-3 font-display text-2xl text-[#003B49] no-underline hover:no-underline"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#booking"
                onClick={() => setOpen(false)}
                className="mt-4 mb-2 rounded-full bg-[#003B49] py-3.5 text-center font-semibold text-white no-underline hover:no-underline"
              >
                Book a call
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { href: "/services/websites", label: "Website Design & Development" },
      { href: "/services/apps", label: "Web & Mobile Applications" },
      { href: "/services/consulting", label: "Digital Consulting" },
      { href: "/services/cto", label: "Freelance CTO" },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/case-studies/the-blue-sock", label: "The Blue Sock" },
      { href: "/case-studies/qrganiz", label: "QRganiz" },
      { href: "/case-studies", label: "All case studies" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:hello@thejoydigi.com", label: "hello@thejoydigi.com" },
      { href: "tel:+17147942861", label: "(714) 794-2861" },
      { href: "/#booking", label: "Book a free consultation" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#003B49] text-[#FDF6EC]">
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.02em]">
              Let&apos;s make something <em className="text-[#FFC94A]">joyful.</em>
            </p>
            <p className="mt-5 max-w-sm text-[#FDF6EC]/70">
              A digital studio for visionary brands — purposeful design, custom
              tech, and clear strategy.
            </p>
            <Link
              href="/#booking"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#FDF6EC] px-6 py-3.5 font-semibold text-[#003B49] transition-colors hover:bg-white no-underline hover:no-underline"
            >
              Schedule a free consultation <span aria-hidden>→</span>
            </Link>
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
            <Link href="/privacy-policy" className="hover:text-[#FDF6EC] no-underline hover:no-underline">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-[#FDF6EC] no-underline hover:no-underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Applies brand fonts and page chrome; shared by MainLayout and BlogLayout. */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} min-h-screen bg-[#FDF6EC] text-[#003B49] [font-family:var(--font-body),system-ui,sans-serif]`}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
