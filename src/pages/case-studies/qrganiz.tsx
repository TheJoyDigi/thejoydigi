import { NextPage } from "next";
import Image from "next/image";
import { Button, Card, CtaBand, PageHero, Pill, Reveal, Section, StarList } from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const glance = [
  { big: "10k+", small: "Active Users" },
  { big: "4.8", small: "App Store Rating" },
  { big: "95%", small: "User Retention" },
];

const QRganizCaseStudy: NextPage = () => {
  return (
    <MainLayout
      title="QRganiz Case Study | The Joy Digi"
      description="How we built a smart QR code-based item tracker to help users organize their personal belongings."
      image="/case-studies/qrganiz-hero.webp"
    >
      <PageHero
        breadcrumb={{ href: "/case-studies", label: "All work" }}
        kicker="Case study"
        title="QRganiz —"
        accent="a smart tracker"
        after="for everyday belongings."
        lead={
          <>
            <p>
              A QR code-based item tracker that helps users organize their personal belongings — easy to use,
              cost-effective, and accessible across devices.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill color="#7EE0C3">Mobile App</Pill>
              <Pill color="#FFC94A">Website</Pill>
              <Pill color="#4ABEFF">Digital Launch</Pill>
            </div>
          </>
        }
        aside={
          <div className="mx-auto max-w-[380px] rotate-[1.5deg] rounded-2xl border border-[#003B49]/10 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(0,59,73,0.45)]">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/case-studies/qrganiz-hero.webp" alt="QRganiz app interface" fill sizes="380px" className="object-cover" priority />
            </div>
          </div>
        }
      >
        <Button href="https://www.qrganiz.com/">Visit qrganiz.com</Button>
        <Button href="/#work" variant="ghost">
          More projects
        </Button>
      </PageHero>


      <Section tone="white" kicker="The challenge" title="Belongings people" accent="keep losing track of.">
        <Reveal>
          <Card className="max-w-3xl">
            <p className="text-[#003B49]/75">
              The client needed a solution to help users keep track of their personal belongings, especially
              valuable items that are frequently misplaced or loaned out. The challenge was to create a system that
              was:
            </p>
            <StarList
              className="mt-5"
              items={[
                "Easy to use for non-technical users",
                "Cost-effective to implement",
                "Scalable for different types of items",
                "Secure and private",
                "Accessible across multiple devices",
              ]}
            />
          </Card>
        </Reveal>
      </Section>

      <Section tone="cream" kicker="What we did" title="Mobile app," accent="built end to end.">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card>
              <h3 className="font-display !py-0 mb-4 text-2xl font-[460]">Mobile App Development</h3>
              <StarList
                color="#4ABEFF"
                items={[
                  "Built a cross-platform mobile app using React Native",
                  "Implemented QR code generation and scanning",
                  "Created a user-friendly interface for item management",
                  "Added offline functionality for basic features",
                ]}
              />
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <h3 className="font-display !py-0 mb-4 text-2xl font-[460]">Backend Infrastructure</h3>
              <StarList
                color="#FF6B6B"
                items={[
                  "Developed a scalable backend using Node.js and MongoDB",
                  "Implemented secure user authentication",
                  "Created APIs for item tracking and management",
                  "Set up cloud storage for QR code images",
                ]}
              />
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="ink" kicker="Results" title="Live and" accent="growing.">
        <dl className="grid gap-8 border-t border-[#FDF6EC]/15 pt-10 md:grid-cols-3">
          {glance.map((g) => (
            <Reveal key={g.big}>
              <dt className="font-display text-5xl md:text-6xl text-[#FFC94A]">{g.big}</dt>
              <dd className="mt-2 text-[#FDF6EC]/70">{g.small}</dd>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={0.15}>
          <blockquote className="mt-14 max-w-3xl border-t border-[#FDF6EC]/15 pt-10 text-xl italic leading-relaxed text-[#FDF6EC]/90">
            "The Joy Digi team transformed our vision into a reality. The QRganiz app has exceeded our expectations
            in terms of user adoption and satisfaction. Their attention to detail and commitment to quality made all
            the difference."
          </blockquote>
          <p className="mt-4 text-[#FDF6EC]/70">
            <span className="font-semibold text-[#FDF6EC]">John Smith</span> — Founder, QRganiz
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </MainLayout>
  );
};

export default QRganizCaseStudy;
