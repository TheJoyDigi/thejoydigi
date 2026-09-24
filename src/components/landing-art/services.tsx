import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import s from "./art.module.css";
import { AppArt, ConsultingArt, WebsiteArt } from "./illustrations";
import { CORAL, RevealWords, Scene, SectionKicker, SKY, SUN } from "./primitives";

type Service = {
  title: string;
  description: string;
  href: string;
  accent: string;
  Art: React.FC;
  targetAudience: string[];
};

const services: Service[] = [
  {
    title: "Website Design & Development",
    description:
      "Custom, clean, and SEO-optimized websites that reflect your brand and help convert visitors into customers. Built with modern tools and mobile-friendly design.",
    href: "/services/websites",
    accent: SKY,
    Art: WebsiteArt,
    targetAudience: [
      "New businesses needing websites",
      "Small businesses wanting to grow",
      "Solopreneurs and creatives",
    ],
  },
  {
    title: "Web & Mobile Applications",
    description:
      "Full-stack development for web and mobile apps tailored to your business goals. From MVPs to internal tools — scalable, secure, and user-friendly.",
    href: "/services/apps",
    accent: CORAL,
    Art: AppArt,
    targetAudience: [
      "Startups with app ideas",
      "Businesses needing internal tools",
      "Founders seeking tech partners",
    ],
  },
  {
    title: "Digital Consulting",
    description:
      "Expert guidance to clarify your digital roadmap. Whether you're choosing the right tools, boosting visibility on search engines, or improving your funnel — we help you move smarter.",
    href: "/services/consulting",
    accent: SUN,
    Art: ConsultingArt,
    targetAudience: [
      "Non-technical founders",
      "Businesses planning digital transformation",
      "Teams needing tech guidance",
    ],
  },
];

export function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <Scene id="services" className="bg-[#FDF6EC] py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-12 items-end mb-14 md:mb-20">
          <div>
            <SectionKicker>What we do</SectionKicker>
            <h2 className="font-display !py-0 mt-4 text-5xl md:text-7xl font-[460] leading-[0.95] tracking-tight text-[#003B49]">
              <RevealWords text="Services," />{" "}
              <RevealWords text="crafted" delay={0.1} wordClassName="italic text-[#4ABEFF]" />{" "}
              <RevealWords text="with joy" delay={0.2} />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#003B49]/80 max-w-md md:justify-self-end"
          >
            Helping businesses grow with joyful experiences, purposeful design,
            custom tech, and clear strategy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7 lg:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="h-full"
            >
              <HoverCard className="h-full rounded-[2rem] border-2 border-[#003B49] bg-white shadow-[6px_6px_0_0_#003B49] hover:shadow-[10px_10px_0_0_#003B49]">
                <div className="flex h-full flex-col p-6 md:p-7">
                  <div
                    className="relative -mx-2 -mt-2 mb-6 aspect-[4/3] overflow-hidden rounded-[1.4rem]"
                    style={{ background: `${service.accent}1f` }}
                  >
                    <div className={`h-full w-full ${s.hoverPlay}`}>
                      <service.Art />
                    </div>
                    <span className="absolute bottom-2 right-4 font-display text-4xl font-semibold text-[#003B49]/15">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display !py-0 text-2xl md:text-[1.7rem] leading-tight font-semibold text-[#003B49] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#003B49]/80 mb-6">{service.description}</p>
                  <h4 className="!py-0 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/60 mb-3">
                    Perfect for
                  </h4>
                  <ul className="space-y-2 mb-8">
                    {service.targetAudience.map((audience) => (
                      <li key={audience} className="flex items-center gap-3 text-[#003B49]">
                        <svg viewBox="-6 -6 12 12" className="h-3 w-3 shrink-0" aria-hidden>
                          <path d="M0,-6 Q0,0 6,0 Q0,0 0,6 Q0,0 -6,0 Q0,0 0,-6Z" fill={service.accent} stroke="#003B49" strokeWidth={0.8} />
                        </svg>
                        {audience}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="group/link mt-auto inline-flex items-center justify-between rounded-full border-2 border-[#003B49] px-6 py-3 font-semibold text-[#003B49] transition-colors duration-300 hover:bg-[#003B49] hover:text-white no-underline hover:no-underline"
                  >
                    Learn More
                    <span className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover/link:rotate-[-45deg]" style={{ background: service.accent }}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#003B49" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}
