import { NextPage } from "next";
import {
  FaChartBar,
  FaCode,
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import {
  Button,
  Card,
  CtaBand,
  IconBadge,
  PageHero,
  Reveal,
  Section,
  StarList,
  Steps,
} from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const services = [
  {
    icon: <FaCode />,
    color: "#4ABEFF",
    title: "Technical Leadership",
    description: "Guide your technical team and make strategic decisions about technology stack and architecture.",
  },
  {
    icon: <FaUsers />,
    color: "#FFC94A",
    title: "Team Building",
    description: "Help recruit, train, and manage technical talent to build a strong development team.",
  },
  {
    icon: <FaChartBar />,
    color: "#7EE0C3",
    title: "Product Strategy",
    description: "Define and execute product roadmaps aligned with business goals and market needs.",
  },
  {
    icon: <FaShieldAlt />,
    color: "#FF6B6B",
    title: "Security & Compliance",
    description: "Ensure your technology meets security standards and regulatory requirements.",
  },
  {
    icon: <FaLightbulb />,
    color: "#4ABEFF",
    title: "Innovation Advisory",
    description: "Identify and implement emerging technologies to keep your business competitive.",
  },
];

const process = [
  { title: "Discovery", description: "Understand your business goals, current tech stack, and team structure." },
  { title: "Assessment", description: "Evaluate technical capabilities, identify gaps, and opportunities." },
  { title: "Planning", description: "Develop a comprehensive technical strategy and roadmap." },
  { title: "Implementation", description: "Execute the strategy while building and mentoring your team." },
  { title: "Growth", description: "Scale your technical operations and continuously optimize processes." },
];

const perfectFor = [
  "Startups needing technical leadership",
  "Growing companies scaling their tech team",
  "Businesses undergoing digital transformation",
  "Founders needing a technical co-founder",
];

const CTO: NextPage = () => {
  return (
    <MainLayout
      title="Freelance CTO / Tech Partner | The Joy Digi"
      description="Get the technical leadership you need without the full-time commitment. We help you build, scale, and optimize your technology operations while mentoring your team."
    >
      <PageHero
        kicker="Service"
        title="Technical leadership,"
        accent="without the full-time hire."
        lead="Get the technical leadership you need without the full-time commitment. We help you build, scale, and optimize your technology operations while mentoring your team."
      >
        <Button href="/#booking">Book a free consultation</Button>
        <Button href="/case-studies" variant="ghost">
          See our work
        </Button>
      </PageHero>

      <Section tone="white" kicker="Our services" title="A tech partner for" accent="every stage.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={s.color}>{s.icon}</IconBadge>
                <h3 className="font-display !py-0 mb-2 text-2xl font-[460]">{s.title}</h3>
                <p className="text-[#003B49]/75">{s.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" kicker="Our approach" title="From discovery to" accent="growth.">
        <Steps steps={process} />
      </Section>

      <Section tone="white" kicker="Perfect for" title="Built for teams" accent="ready to scale.">
        <Reveal>
          <Card className="max-w-2xl">
            <StarList items={perfectFor} />
          </Card>
        </Reveal>
      </Section>

      <CtaBand title="Ready for a tech partner" accent="who cares?" />
    </MainLayout>
  );
};

export default CTO;
