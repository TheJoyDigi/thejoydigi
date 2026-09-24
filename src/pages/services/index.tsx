import { NextPage } from "next";
import { FaMobile, FaPalette, FaRocket, FaUserCog } from "react-icons/fa";
import { Button, Card, CtaBand, IconBadge, PageHero, Reveal, Section, StarList } from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Custom, clean, and SEO-optimized websites that reflect your brand and help convert visitors into customers. Built with modern tools and mobile-friendly design.",
    icon: <FaPalette />,
    color: "#4ABEFF",
    link: "/services/websites",
    targetAudience: ["New businesses needing websites", "Small businesses wanting to grow", "Solopreneurs and creatives"],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "Full-stack development for web and mobile apps tailored to your business goals. From MVPs to internal tools — scalable, secure, and user-friendly.",
    icon: <FaMobile />,
    color: "#7EE0C3",
    link: "/services/apps",
    targetAudience: ["Startups with app ideas", "Businesses needing internal tools", "Founders seeking tech partners"],
  },
  {
    title: "Digital Consulting",
    description:
      "Expert guidance to clarify your digital roadmap. Whether you're choosing the right tools, boosting visibility on search engines, or improving your funnel — we help you move smarter.",
    icon: <FaRocket />,
    color: "#FFC94A",
    link: "/services/consulting",
    targetAudience: ["Non-technical founders", "Businesses planning digital transformation", "Teams needing tech guidance"],
  },
  {
    title: "Freelance CTO / Tech Partner",
    description:
      "Strategic technology leadership for non-technical founders. We help you make informed decisions, build the right team, and scale your tech infrastructure.",
    icon: <FaUserCog />,
    color: "#FF6B6B",
    link: "/services/cto",
    targetAudience: ["Non-technical founders", "Startups needing tech leadership", "Businesses scaling their tech"],
  },
];

const Services: NextPage = () => {
  return (
    <MainLayout
      title="Services | The Joy Digi"
      description="Websites, web and mobile apps, digital consulting, and freelance CTO partnership — joyful experiences, purposeful design, custom tech, and clear strategy."
    >
      <PageHero
        kicker="Services"
        title="Joyful experiences,"
        accent="built with clear strategy."
        lead="We help businesses grow with purposeful design, custom tech, and a roadmap that actually makes sense."
      >
        <Button href="/#booking">Book a free consultation</Button>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <Card href={service.link} className="flex h-full flex-col">
                <IconBadge color={service.color}>{service.icon}</IconBadge>
                <h2 className="font-display !py-0 mb-3 text-2xl font-[460]">{service.title}</h2>
                <p className="mb-6 text-[#003B49]/75">{service.description}</p>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/55">Perfect for</p>
                <StarList items={service.targetAudience} color={service.color} className="mb-6" />
                <span className="mt-auto font-semibold text-[#003B49] group-hover:text-[#FF6B6B]">Learn more →</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </MainLayout>
  );
};

export default Services;
