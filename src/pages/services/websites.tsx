import { NextPage } from "next";
import {
  FaChartLine,
  FaMobile,
  FaPalette,
  FaRocket,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { Button, Card, CtaBand, IconBadge, PageHero, Reveal, Section, Steps } from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const features = [
  { icon: <FaPalette />, color: "#4ABEFF", title: "Custom Design", description: "Unique, brand-aligned designs that stand out and engage visitors." },
  { icon: <FaMobile />, color: "#7EE0C3", title: "Responsive Development", description: "Flawless performance across all devices and screen sizes." },
  { icon: <FaSearch />, color: "#FFC94A", title: "SEO Optimization", description: "Built-in SEO best practices to improve search visibility." },
  { icon: <FaShoppingCart />, color: "#FF6B6B", title: "E-commerce Integration", description: "Seamless online store setup with secure payment processing." },
  { icon: <FaRocket />, color: "#4ABEFF", title: "Performance Focused", description: "Fast loading times and optimized user experience." },
];

const process = [
  { title: "Discovery", description: "We start by understanding your business goals, target audience, and unique requirements." },
  { title: "Design", description: "Create wireframes and design mockups that align with your brand and goals." },
  { title: "Development", description: "Build your website using modern technologies and best practices." },
  { title: "Testing", description: "Thorough testing across devices and browsers to ensure quality." },
  { title: "Launch", description: "Deploy your website and provide training for content management." },
];

const audiences = [
  { icon: <FaRocket />, color: "#4ABEFF", title: "New Businesses", description: "Needing their first website to establish online presence." },
  { icon: <FaChartLine />, color: "#7EE0C3", title: "Growing Companies", description: "Wanting to upgrade their online presence and reach." },
  { icon: <FaPalette />, color: "#FFC94A", title: "Creatives & Solopreneurs", description: "Needing a portfolio site to showcase their work." },
  { icon: <FaShoppingCart />, color: "#FF6B6B", title: "E-commerce Businesses", description: "Looking to sell products or services online." },
];

const Websites: NextPage = () => {
  return (
    <MainLayout
      title="Website Design & Development | The Joy Digi"
      description="Custom, clean, and SEO-optimized websites that reflect your brand and help convert visitors into customers. Built with modern tools and mobile-friendly design."
    >
      <PageHero
        breadcrumb={{ href: "/services", label: "All services" }}
        kicker="Websites"
        title="Websites that"
        accent="work as hard as you do."
        lead="Custom, clean, and SEO-optimized websites that reflect your brand and help convert visitors into customers."
      >
        <Button href="/#booking">Start building your website</Button>
      </PageHero>

      <Section tone="white" kicker="What we offer" title="Everything your site" accent="needs to convert.">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={f.color}>{f.icon}</IconBadge>
                <h3 className="font-display !py-0 mb-2 text-xl font-[460]">{f.title}</h3>
                <p className="text-[#003B49]/75">{f.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="cream" kicker="Our process" title="From idea to" accent="launch.">
        <Steps steps={process} />
      </Section>

      <Section tone="white" kicker="Perfect for" title="Built for businesses" accent="like yours.">
        <div className="grid gap-6 md:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <Card className="flex items-start gap-5">
                <IconBadge color={a.color}>{a.icon}</IconBadge>
                <div>
                  <h3 className="font-display !py-0 mb-1 text-lg font-[460]">{a.title}</h3>
                  <p className="text-[#003B49]/75">{a.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand title="Ready to build a website that" accent="works as hard as you do?" />
    </MainLayout>
  );
};

export default Websites;
