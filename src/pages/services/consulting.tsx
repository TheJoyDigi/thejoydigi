import { NextPage } from "next";
import {
  FaChartLine,
  FaRocket,
  FaSearch,
  FaTools,
  FaUserCog,
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
  Steps,
} from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const services = [
  {
    icon: <FaSearch />,
    color: "#4ABEFF",
    title: "SEO Strategy",
    description: "Comprehensive SEO audits and strategies to improve your search visibility and organic traffic.",
  },
  {
    icon: <FaChartLine />,
    color: "#FFC94A",
    title: "Digital Growth",
    description: "Data-driven strategies to grow your online presence and customer base.",
  },
  {
    icon: <FaTools />,
    color: "#7EE0C3",
    title: "Tech Stack Selection",
    description: "Expert guidance in choosing the right technologies for your business needs.",
  },
  {
    icon: <FaRocket />,
    color: "#FF6B6B",
    title: "Performance Optimization",
    description: "Improve your website's speed, user experience, and conversion rates.",
  },
  {
    icon: <FaUsers />,
    color: "#4ABEFF",
    title: "Team Training",
    description: "Workshops and training sessions to upskill your team in digital best practices.",
  },
];

const perfectFor = [
  {
    icon: <FaUserCog />,
    color: "#4ABEFF",
    title: "Non-technical Founders",
    description: "Needing digital guidance and strategy",
  },
  {
    icon: <FaChartLine />,
    color: "#FFC94A",
    title: "Growing Businesses",
    description: "Planning digital transformation",
  },
  {
    icon: <FaTools />,
    color: "#7EE0C3",
    title: "Tech Teams",
    description: "Needing stack recommendations",
  },
  {
    icon: <FaSearch />,
    color: "#FF6B6B",
    title: "Online Businesses",
    description: "Wanting to improve their presence",
  },
];

const process = [
  { title: "Assessment", description: "Analyze your current digital presence and identify opportunities." },
  { title: "Strategy", description: "Develop a customized digital roadmap aligned with your goals." },
  { title: "Implementation", description: "Guide your team through executing the recommended changes." },
  { title: "Monitoring", description: "Track progress and adjust strategies based on performance data." },
  { title: "Optimization", description: "Continuously refine and improve your digital presence." },
];

const Consulting: NextPage = () => {
  return (
    <MainLayout
      title="Digital Consulting | The Joy Digi"
      description="Expert guidance to clarify your digital roadmap. Whether you're choosing the right tools, boosting visibility on search engines, or improving your funnel — we help you move smarter."
    >
      <PageHero
        kicker="Service"
        title="Digital consulting that"
        accent="moves you smarter."
        lead="Expert guidance to clarify your digital roadmap. Whether you're choosing the right tools, boosting visibility on search engines, or improving your funnel — we help you move smarter."
      >
        <Button href="/#booking">Book a free consultation</Button>
        <Button href="/case-studies" variant="ghost">
          See our work
        </Button>
      </PageHero>

      <Section tone="white" kicker="Our services" title="A roadmap for" accent="every stage.">
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

      <Section tone="cream" kicker="Our approach" title="Clarity, then" accent="momentum.">
        <Steps steps={process} />
      </Section>

      <Section tone="white" kicker="Perfect for" title="Built for teams" accent="ready to grow.">
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

      <CtaBand title="Ready to move your" accent="business smarter?" />
    </MainLayout>
  );
};

export default Consulting;
