import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import s from "./art.module.css";
import {
  BarsIcon,
  CareIcon,
  ClockIcon,
  GrowthIcon,
  QrArt,
  QuoteIcon,
  BlueSockArt,
  TailoredIcon,
} from "./illustrations";
import {
  blobPath,
  CORAL,
  INK,
  MINT,
  RevealWords,
  Scene,
  SectionKicker,
  SKY,
  SUN,
} from "./primitives";
import { HoverCard } from "./services";

const PORTRAIT = blobPath(4, { r: 0.46, cx: 0.5, cy: 0.5, points: 8, variance: 0.1 });
const PORTRAIT_BACK = blobPath(9, { r: 0.48, cx: 0.5, cy: 0.5, points: 8, variance: 0.1 });

const stickers = [
  { label: "10+ Years Experience", bg: SKY, rot: -4, pos: "top-[6%] -left-[4%]" },
  { label: "Big Tech Background", bg: SUN, rot: 3, pos: "top-[40%] -right-[6%]" },
  { label: "Startup Expertise", bg: CORAL, rot: -2, pos: "bottom-[16%] -left-[2%]" },
  { label: "Consulting Experience", bg: MINT, rot: 4, pos: "bottom-[2%] right-[8%]" },
];

export function About() {
  return (
    <Scene id="about" className="relative bg-white py-20 md:py-28 overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 md:gap-20 items-center">
        <div className="relative mx-auto w-full max-w-[440px] aspect-square">
          <svg viewBox="0 0 1 1" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
            <path d={PORTRAIT_BACK} fill={SKY} opacity={0.35} transform="translate(0.035 0.04)" />
          </svg>
          <svg viewBox="0 0 1 1" className="absolute inset-0 w-full h-full" role="img" aria-label="Long La - Founder of The Joy Digi">
            <defs>
              <clipPath id="portrait-clip" clipPathUnits="userSpaceOnUse">
                <path d={PORTRAIT} />
              </clipPath>
            </defs>
            <image href="/about-image.webp" x={0} y={0} width={1} height={1} preserveAspectRatio="xMidYMid slice" clipPath="url(#portrait-clip)" />
          </svg>
          {stickers.map((st, i) => (
            <motion.span
              key={st.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.08 }}
              className={`absolute ${st.pos} z-10 rounded-full border-2 border-[#003B49] px-4 py-2 text-sm font-bold text-[#003B49] shadow-[3px_3px_0_0_#003B49]`}
              style={{ background: st.bg, rotate: st.rot }}
            >
              {st.label}
            </motion.span>
          ))}
        </div>

        <div>
          <SectionKicker>Meet your digital partner</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl md:text-6xl font-[460] leading-[0.98] tracking-tight text-[#003B49] mb-8">
            <RevealWords text="Hi, I'm" /> <RevealWords text="Long." delay={0.12} wordClassName="italic text-[#4ABEFF]" />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-lg text-[#003B49]/85"
          >
            <p>
              Founder and developer of The Joy Digi. I&apos;ve spent over 10 years
              as a software engineer working with big tech companies, startups,
              and consulting firms. Throughout that journey, I&apos;ve built
              everything from polished user-facing apps to robust internal
              systems, learning what really creates value for a business.
            </p>
            <p>
              The Joy Digi is my way of combining that experience with a personal
              mission: helping others bring meaningful ideas to life. I believe in
              a value-first approach — where every project is designed not just to
              look good, but to make a real impact. Whether it&apos;s a
              handcrafted website, a custom app, or a strategy session, it&apos;s
              all about creating tools that truly serve your goals.
            </p>
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

const cases = [
  {
    name: "QRganiz",
    tag: "Mobile App + Website",
    href: "/case-studies/qrganiz",
    industry: "Productivity / Tech",
    Art: QrArt,
    accent: SKY,
    blurb:
      "A smart QR code-based item tracker that helps users organize their personal belongings. The project included both product development and go-to-market strategy.",
    did: [
      "Product Design & Branding",
      "Mobile App Development (React Native)",
      "Website Design & Development",
      "Amazon Product Launch Support",
      "SEO Strategy & Content",
    ],
  },
  {
    name: "The Blue Sock",
    tag: "Marketplace + Brand + Web App",
    href: "/case-studies/the-blue-sock",
    industry: "Pet Services / Marketplace",
    Art: BlueSockArt,
    accent: CORAL,
    blurb:
      "Boutique dog sitting for Irvine & Orange County. What started as Ruh Roh Retreat grew into a curated marketplace where pet parents compare Badge-Rated sitters, request stays, and manage everything from their own portal.",
    did: [
      "Brand Evolution (Ruh Roh Retreat → The Blue Sock)",
      "Sitter Marketplace & Profiles",
      "Pet Parent & Sitter Portals",
      "Booking Requests & Stripe Payments",
      "Local SEO & City Guides",
    ],
  },
];

export function Portfolio() {
  return (
    <Scene id="portfolio" className="bg-[#003B49] py-20 md:py-28 text-[#FDF6EC] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 items-end mb-14 md:mb-20">
          <div>
            <SectionKicker color={SUN}>Selected work</SectionKicker>
            <h2 className="font-display !py-0 mt-4 text-5xl md:text-7xl font-[460] leading-[0.95] tracking-tight text-[#FDF6EC]">
              <RevealWords text="Real Projects." /> <RevealWords text="Real Results." delay={0.15} wordClassName="italic text-[#FFC94A]" />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#FDF6EC]/75 max-w-md md:justify-self-end"
          >
            See how we&apos;ve helped businesses grow with purposeful design and
            modern technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {cases.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              <HoverCard className="h-full rounded-[2rem] bg-[#FDF6EC] text-[#003B49] overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]">
                <div className="aspect-[10/7] overflow-hidden border-b-2 border-[#003B49]">
                  <div className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${s.hoverPlay}`}>
                    <c.Art />
                  </div>
                </div>
                <div className="p-7 md:p-9">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <h3 className="font-display !py-0 text-3xl md:text-4xl font-semibold">{c.name}</h3>
                    <span className="rounded-full border-2 border-[#003B49] px-4 py-1.5 text-sm font-bold" style={{ background: c.accent }}>
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-[#003B49]/80 mb-6">{c.blurb}</p>
                  <h4 className="!py-0 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/60 mb-3">What we did</h4>
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {c.did.map((item) => (
                      <li key={item} className="rounded-full bg-white border border-[#003B49]/15 px-3 py-1 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <Link
                      href={c.href}
                      className="group/link inline-flex items-center gap-2 font-bold text-[#003B49] no-underline hover:no-underline"
                    >
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_2px]">
                        View Case Study
                      </span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <span className="text-sm text-[#003B49]/55">{c.industry}</span>
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

const values = [
  {
    title: "Growth-focused",
    text: "Solutions built to support clients' next stage of growth, ensuring your digital presence scales with your business.",
    Icon: GrowthIcon,
  },
  {
    title: "Tailored Approach",
    text: "Every project is shaped by your unique goals and needs, not cookie-cutter solutions.",
    Icon: TailoredIcon,
  },
  {
    title: "Built with Care",
    text: "Clean design, solid tech, and long-term value at the core of everything we create.",
    Icon: CareIcon,
  },
];

const pricing = [
  { title: "Hourly Rate", text: "Based on project needs and complexity", Icon: ClockIcon, bg: SUN },
  { title: "Time Tracking", text: "Transparent tracking of all project hours", Icon: BarsIcon, bg: SKY },
  { title: "Custom Quotes", text: "Tailored pricing for every client's needs", Icon: QuoteIcon, bg: MINT },
];

export function Values() {
  return (
    <Scene className="relative bg-[#FDF6EC] py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <SectionKicker>Why us</SectionKicker>
          <h2 className="font-display !py-0 mt-4 text-5xl md:text-6xl font-[460] leading-[0.98] tracking-tight text-[#003B49] mb-6">
            <RevealWords text="What Sets The Joy Digi" /> <RevealWords text="Apart" delay={0.25} wordClassName="italic text-[#FF6B6B]" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#003B49]/80"
          >
            We help bring ideas to life through thoughtful design and modern
            technology. Our services include websites, web apps, and digital tools
            that are clean, functional, and tailored to your unique goals. We focus
            on creating real value that supports business growth, making your
            digital journey joyful and stress-free — handling the technical side so
            you can focus on running your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="group rounded-[2rem] bg-white p-8 border-2 border-[#003B49]/10 hover:border-[#003B49] transition-colors duration-300"
            >
              <div className={s.hoverPlay}>
                <v.Icon />
              </div>
              <h3 className="font-display !py-0 mt-5 text-2xl font-semibold text-[#003B49] mb-3">{v.title}</h3>
              <p className="text-[#003B49]/80">{v.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display !py-0 text-4xl md:text-5xl font-[460] tracking-tight text-[#003B49] mb-4">
              <RevealWords text="Transparent" /> <RevealWords text="Pricing" delay={0.1} wordClassName="italic text-[#4ABEFF]" />
            </h2>
            <p className="text-lg text-[#003B49]/80">Fair and straightforward pricing that works for your business</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 rounded-[2rem] border-2 border-[#003B49] bg-white shadow-[10px_10px_0_0_#003B49] overflow-hidden"
          >
            {pricing.map((p, i) => (
              <div
                key={p.title}
                className={`group relative p-8 md:p-10 ${i ? "border-t-2 md:border-t-0 md:border-l-2 border-dashed border-[#003B49]" : ""}`}
              >
                <div className="mb-5 inline-grid place-items-center rounded-2xl p-2" style={{ background: `${p.bg}55` }}>
                  <div className={s.hoverPlay}>
                    <p.Icon />
                  </div>
                </div>
                <h3 className="font-display !py-0 text-2xl font-semibold text-[#003B49] mb-2">{p.title}</h3>
                <p className="text-[#003B49]/80">{p.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

export function Booking() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 0.6], [140, -40]);
  return (
    <Scene as="div" className="bg-[#FDF6EC]">
      <section ref={ref} id="booking" className="relative py-20 md:py-28 overflow-hidden scroll-mt-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <motion.svg style={{ y: sunY }} viewBox="0 0 800 800" className="absolute left-1/2 top-24 -translate-x-1/2 w-[900px] max-w-none">
            <defs>
              <radialGradient id="sun-grad">
                <stop offset="0%" stopColor={SUN} stopOpacity={0.5} />
                <stop offset="60%" stopColor={SUN} stopOpacity={0.18} />
                <stop offset="100%" stopColor={SUN} stopOpacity={0} />
              </radialGradient>
            </defs>
            <circle cx={400} cy={400} r={400} fill="url(#sun-grad)" />
          </motion.svg>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <SectionKicker color={INK}>30 minutes, zero pressure</SectionKicker>
            <h2 className="font-display !py-0 mt-4 text-5xl md:text-7xl font-[460] leading-[0.95] tracking-tight text-[#003B49]">
              <RevealWords text="Schedule Your" /> <RevealWords text="Free Consultation" delay={0.15} wordClassName="italic text-[#FF6B6B]" />
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[860px] mx-auto rounded-[2rem] border-2 border-[#003B49] bg-white shadow-[10px_10px_0_0_#003B49] overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b-2 border-[#003B49] bg-[#FDF6EC] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF6B6B]" />
              <span className="h-3 w-3 rounded-full bg-[#FFC94A]" />
              <span className="h-3 w-3 rounded-full bg-[#7EE0C3]" />
              <span className="ml-3 text-sm font-semibold text-[#003B49]/60">calendly.com — free consulting session</span>
            </div>
            <div className="w-full h-[640px]">
              <iframe
                src="https://calendly.com/baolonguit/free-consulting-session"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                title="Schedule a consultation"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </Scene>
  );
}

