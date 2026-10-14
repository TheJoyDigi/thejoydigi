import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OpArtField } from "../landing-art/op-art";
import { GOLD_DEEP, INK, RevealWords, SectionKicker, SUN } from "../landing-art/primitives";

export { SectionKicker as Kicker };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Headline with an optional italic accent phrase, e.g. title="Websites that" accent="convert". */
export function DisplayTitle({
  as: Tag = "h2",
  title,
  accent,
  accentColor = GOLD_DEEP,
  after,
  className = "",
}: {
  as?: "h1" | "h2";
  title: string;
  accent?: string;
  accentColor?: string;
  after?: string;
  className?: string;
}) {
  return (
    <Tag className={`font-bungee !py-0 !font-normal tracking-[-0.005em] text-[#1B140D] ${className}`}>
      <RevealWords text={title} />
      {accent && (
        <>
          {" "}
          <span className={accentColor === GOLD_DEEP ? "joy-accent" : "joy-accent-night"}>
            <RevealWords text={accent} delay={0.12} />
          </span>
        </>
      )}
      {after && (
        <>
          {" "}
          <RevealWords text={after} delay={0.2} />
        </>
      )}
    </Tag>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  const styles = {
    primary:
      "btn-joy bg-[#FFC94A] text-[#0B0B0C] shadow-[0_14px_30px_-14px_rgba(27,20,13,0.55)] hover:bg-[#FFD86B]",
    ghost: "border border-[#1B140D]/25 text-[#1B140D] hover:border-[#1B140D] hover:bg-white",
    light: "bg-[#FDF6EC] text-[#1B140D] hover:bg-white",
  }[variant];
  const external = /^https?:/.test(href);
  const cls = `group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-semibold transition-colors duration-300 no-underline hover:no-underline ${styles} ${className}`;
  const inner = (
    <>
      {children}
      {variant !== "ghost" && (
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          {external ? "↗" : "→"}
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

function HeroGrid() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]">
      <defs>
        <pattern id="page-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0 H0 V64" fill="none" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#page-grid)" />
    </svg>
  );
}

/** Top-of-page hero used by every marketing page; `aside` renders a visual on the right at lg+. */
export function PageHero({
  kicker,
  title,
  accent,
  after,
  lead,
  children,
  aside,
  breadcrumb,
}: {
  kicker?: string;
  title: string;
  accent?: string;
  after?: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  breadcrumb?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-[#FDF6EC]">
      <HeroGrid />
      {!aside && (
        <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 hidden h-[34rem] w-[34rem] opacity-60 md:block lg:-right-32">
          <OpArtField rings={13} speed={0.25} />
        </div>
      )}
      <div
        className={`container relative mx-auto grid items-center gap-12 px-4 pt-14 pb-16 md:pt-20 md:pb-24 ${
          aside ? "lg:grid-cols-[1.05fr_1fr] lg:gap-16" : ""
        }`}
      >
        <div className={aside ? "" : "max-w-4xl"}>
          {breadcrumb && (
            <Reveal>
              <Link href={breadcrumb.href} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B5D4F] hover:text-[#1B140D] no-underline hover:no-underline">
                <span aria-hidden>←</span> {breadcrumb.label}
              </Link>
            </Reveal>
          )}
          {kicker && <SectionKicker>{kicker}</SectionKicker>}
          <DisplayTitle
            as="h1"
            title={title}
            accent={accent}
            after={after}
            className="mt-4 text-[2.3rem] leading-[1.06] sm:text-5xl lg:text-[3.6rem]"
          />
          {lead && (
            <Reveal delay={0.2}>
              <div className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-[#1B140D]/75">{lead}</div>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">{children}</div>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </section>
  );
}

const TONES = {
  cream: "bg-[#FDF6EC]",
  white: "bg-white",
  ink: "bg-[#0B0B0C] text-[#FDF6EC]",
};

export function Section({
  id,
  tone = "cream",
  kicker,
  title,
  accent,
  lead,
  center = false,
  children,
  className = "",
}: {
  id?: string;
  tone?: keyof typeof TONES;
  kicker?: string;
  title?: string;
  accent?: string;
  lead?: React.ReactNode;
  center?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const ink = tone === "ink";
  return (
    <section id={id} className={`relative py-20 md:py-24 ${TONES[tone]} ${className}`}>
      <div className="container mx-auto px-4">
        {(kicker || title) && (
          <div className={`mb-12 md:mb-16 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
            {kicker && <SectionKicker color={ink ? SUN : GOLD_DEEP}>{kicker}</SectionKicker>}
            {title && (
              <DisplayTitle
                title={title}
                accent={accent}
                accentColor={ink ? SUN : GOLD_DEEP}
                className={`mt-4 text-[2rem] md:text-5xl leading-[1.06] ${ink ? "!text-[#FDF6EC]" : ""}`}
              />
            )}
            {lead && (
              <Reveal delay={0.15}>
                <div className={`mt-5 text-lg ${ink ? "text-[#FDF6EC]/75" : "text-[#1B140D]/75"}`}>{lead}</div>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const cls = `group relative block h-full rounded-[2rem] border-2 border-[#1B140D] bg-white p-7 md:p-8 text-[#1B140D] shadow-[6px_6px_0_0_#1B140D] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#1B140D] ${className}`;
  return href ? (
    <Link href={href} className={`${cls} no-underline hover:no-underline`}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function IconBadge({ children, color = SUN }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl border-2 border-[#1B140D] text-[#1B140D] [&_svg]:h-5 [&_svg]:w-5"
      style={{ background: `${color}40` }}
    >
      {children}
    </span>
  );
}

export function StarList({ items, color = SUN, className = "" }: { items: string[]; color?: string; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <svg viewBox="-6 -6 12 12" className="mt-1.5 h-3 w-3 shrink-0" aria-hidden>
            <circle r="5" fill={color} stroke={INK} strokeWidth={1} />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pill({ children, color = SUN }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex rounded-full border-2 border-[#1B140D] px-3.5 py-1 text-sm font-bold text-[#1B140D]" style={{ background: color }}>
      {children}
    </span>
  );
}

/** Numbered process steps with a static connecting rule. */
export function Steps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.06}>
          <li className="relative h-full rounded-[2rem] border-2 border-[#1B140D]/10 bg-white p-7 transition-colors duration-300 hover:border-[#1B140D]">
            <span
              className="font-display block text-6xl font-semibold leading-none"
              style={{ color: SUN, WebkitTextStroke: `1.5px ${INK}` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display !py-0 mt-5 mb-2 text-2xl font-[460] text-[#1B140D]">{step.title}</h3>
            <p className="text-[#1B140D]/75">{step.description}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

export function CtaBand({
  title = "Let's build something",
  accent = "joyful.",
  lead = "Got an idea, a question, or something delightful you're working on? I'd love to hear about it.",
}: {
  title?: string;
  accent?: string;
  lead?: string;
}) {
  return (
    <section className="bg-[#FDF6EC] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0B0B0C] px-7 py-14 md:px-16 md:py-20 text-[#FDF6EC]">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(255,201,74,0.3),transparent)]" />
            <div className="relative grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="font-display text-4xl md:text-6xl leading-[1] tracking-[-0.03em]">
                  {title} <em className="text-[#FFC94A]">{accent}</em>
                </p>
                <p className="mt-5 max-w-xl text-lg text-[#FDF6EC]/75">{lead}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href="mailto:hello@thejoydigi.com"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#FFC94A] px-7 py-4 font-semibold text-[#0B0B0C] transition-colors hover:bg-[#FFD86B] no-underline hover:no-underline"
                >
                  Say hello <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <Link
                  href="/#work"
                  className="inline-flex items-center justify-center rounded-full border border-[#FDF6EC]/30 px-7 py-4 font-semibold text-[#FDF6EC] transition-colors hover:border-[#FDF6EC] no-underline hover:no-underline"
                >
                  See more work
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Screenshot presented in a light browser window. */
export function BrowserFrame({
  src,
  alt,
  label,
  width,
  height,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-[#1B140D]/10 bg-white shadow-[0_40px_80px_-30px_rgba(27,20,13,0.45)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-[#1B140D]/10 bg-[#F6F1E8] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF2E88]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFC94A]/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#14A03A]/80" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-[#6B5D4F]">{label}</span>
      </div>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="(min-width: 1024px) 600px, 92vw" className="block h-auto w-full" />
    </div>
  );
}
