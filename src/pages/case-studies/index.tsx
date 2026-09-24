import { NextPage } from "next";
import Image from "next/image";
import { Card, CtaBand, PageHero, Pill, Reveal, Section } from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const studies = [
  {
    href: "/case-studies/the-blue-sock",
    image: "/case-studies/bluesock-hero.webp",
    name: "The Blue Sock",
    summary:
      "Boutique dog sitting for Irvine & Orange County — evolved from Ruh Roh Retreat into a curated marketplace of Badge-Rated sitters.",
    pills: ["Marketplace", "Brand", "Web App"],
  },
  {
    href: "/case-studies/qrganiz",
    image: "/case-studies/qrganiz-hero.webp",
    name: "QRganiz",
    summary: "A smart QR code-based item tracker that helps users organize their personal belongings.",
    pills: ["Mobile App", "Website", "Digital Launch"],
  },
];

const CaseStudies: NextPage = () => {
  return (
    <MainLayout
      title="Case Studies | The Joy Digi"
      description="Explore our successful projects and see how we've helped businesses grow with digital solutions."
    >
      <PageHero
        kicker="Selected work"
        title="Real projects."
        accent="Real results."
        lead="A look at the brands and products we've helped launch and grow — from boutique marketplaces to mobile apps."
      />

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2">
          {studies.map((s, i) => (
            <Reveal key={s.href} delay={i * 0.08}>
              <Card href={s.href} className="!p-0 overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.name} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 600px, 92vw"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <h2 className="font-display !py-0 text-2xl font-[460] text-[#003B49]">{s.name}</h2>
                  <p className="mt-3 text-[#003B49]/75">{s.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.pills.map((p) => (
                      <Pill key={p}>{p}</Pill>
                    ))}
                  </div>
                  <p className="mt-6 font-semibold text-[#003B49] transition-transform duration-300 group-hover:translate-x-1">
                    View case study →
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </MainLayout>
  );
};

export default CaseStudies;
