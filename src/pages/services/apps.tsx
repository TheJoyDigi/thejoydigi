import { NextPage } from "next";
import {
  FaChartLine,
  FaCode,
  FaMobile,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaUserCog,
} from "react-icons/fa";
import {
  Button,
  Card,
  CtaBand,
  IconBadge,
  PageHero,
  Reveal,
  Section,
  Steps,
} from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const features = [
  {
    icon: <FaMobile />,
    color: "#4ABEFF",
    title: "Cross-Platform Development",
    description: "Build once, deploy everywhere with React Native and modern web technologies.",
  },
  {
    icon: <FaCode />,
    color: "#FFC94A",
    title: "Custom Development",
    description: "Tailored solutions that perfectly match your business requirements.",
  },
  {
    icon: <FaServer />,
    color: "#7EE0C3",
    title: "Backend Services",
    description: "Robust backend infrastructure with scalable APIs and databases.",
  },
  {
    icon: <FaShieldAlt />,
    color: "#FF6B6B",
    title: "Security First",
    description: "Enterprise-grade security and data protection built into every app.",
  },
  {
    icon: <FaRocket />,
    color: "#4ABEFF",
    title: "Performance Optimized",
    description: "Lightning-fast apps with smooth user experiences.",
  },
];

const perfectFor = [
  {
    icon: <FaRocket />,
    color: "#4ABEFF",
    title: "Startups",
    description: "With innovative app ideas ready to bring to market",
  },
  {
    icon: <FaChartLine />,
    color: "#FFC94A",
    title: "Growing Companies",
    description: "Needing internal tools and dashboards",
  },
  {
    icon: <FaCode />,
    color: "#7EE0C3",
    title: "Digital Transformation",
    description: "Looking to digitize their services",
  },
  {
    icon: <FaUserCog />,
    color: "#FF6B6B",
    title: "Founders",
    description: "Seeking a tech partner for their vision",
  },
];

const process = [
  { title: "Planning", description: "Define requirements, user stories, and technical architecture." },
  { title: "Design", description: "Create user flows, wireframes, and UI/UX designs." },
  { title: "Development", description: "Agile development with regular updates and feedback." },
  { title: "Testing", description: "Comprehensive testing including unit, integration, and user testing." },
  { title: "Deployment", description: "App store submission and production deployment." },
];

const Apps: NextPage = () => {
  return (
    <MainLayout
      title="Web & Mobile Apps | The Joy Digi"
      description="Full-stack development for web and mobile apps tailored to your business goals. From MVPs to internal tools — scalable, secure, and user-friendly."
    >
      <PageHero
        kicker="Service"
        title="Web & mobile apps built to"
        accent="scale with you."
        lead="Full-stack development for web and mobile apps tailored to your business goals. From MVPs to internal tools — scalable, secure, and user-friendly."
      >
        <Button href="/#booking">Book a free consultation</Button>
        <Button href="/case-studies" variant="ghost">
          See our work
        </Button>
      </PageHero>

      <Section tone="white" kicker="What we offer" title="Everything your app" accent="needs to ship.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={f.color}>{f.icon}</IconBadge>
                <h3 className="font-display !py-0 mb-2 text-2xl font-[460]">{f.title}</h3>
                <p className="text-[#003B49]/75">{f.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" kicker="Our process" title="From idea to" accent="app store.">
        <Steps steps={process} />
      </Section>

      <Section tone="white" kicker="Perfect for" title="Built for teams" accent="ready to build.">
        <div className="grid gap-6 md:grid-cols-2">
          {perfectFor.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={p.color}>{p.icon}</IconBadge>
                <h3 className="font-display !py-0 mb-2 text-2xl font-[460]">{p.title}</h3>
                <p className="text-[#003B49]/75">{p.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Ready to build your" accent="next app?" />
    </MainLayout>
  );
};

export default Apps;
