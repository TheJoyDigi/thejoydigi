import { NextPage } from "next";
import Image from "next/image";
import {
  FaAward,
  FaCreditCard,
  FaMapMarkedAlt,
  FaPaintBrush,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import {
  BrowserFrame,
  Button,
  Card,
  CtaBand,
  IconBadge,
  PageHero,
  Pill,
  Reveal,
  Section,
  Steps,
} from "@/components/marketing/kit";
import MainLayout from "../_layouts";

const built = [
  {
    icon: <FaPaintBrush />,
    color: "#1F6FE5",
    title: "Brand identity",
    text: "A playful, boutique brand for The Blue Sock, built for a whole community of sitters and the families who trust them.",
  },
  {
    icon: <FaUsers />,
    color: "#FF3D8B",
    title: "Sitter marketplace",
    text: "Sitter profiles with photos, home details, care styles, reviews, and pricing so pet parents can compare and choose with confidence.",
  },
  {
    icon: <FaAward />,
    color: "#FFC94A",
    title: "Blue Sock Badges",
    text: "A badge system that highlights each sitter's strengths, plus bookable premium experiences that go beyond a standard stay.",
  },
  {
    icon: <FaUserFriends />,
    color: "#7EE0C3",
    title: "Pet Parent & Sitter portals",
    text: "Dedicated logins for both sides: track stays, message your sitter, manage pets, and handle requests in one place.",
  },
  {
    icon: <FaCreditCard />,
    color: "#4ABEFF",
    title: "Booking & payments",
    text: "Request-based booking with Stripe-backed checkout and booking protection built into every request.",
  },
  {
    icon: <FaMapMarkedAlt />,
    color: "#FFC94A",
    title: "Local SEO content",
    text: "City boarding guides and a blog that answer what Orange County pet parents search for first.",
  },
];

const glance = [
  { big: "100+", small: "Orange County families (per thebluesock.com)" },
  { big: "2", small: "portals — pet parents & sitters" },
  { big: "Irvine & OC", small: "service area" },
];

const TheBlueSock: NextPage = () => {
  return (
    <MainLayout
      title="The Blue Sock Case Study | The Joy Digi"
      description="How The Joy Digi built The Blue Sock — a boutique dog-sitting marketplace for Irvine & Orange County with sitter profiles, badges, portals, and payments."
      image="/og/site/case-study-the-blue-sock.png"
    >
      <PageHero
        breadcrumb={{ href: "/case-studies", label: "All work" }}
        kicker="Case study"
        title="The Blue Sock —"
        accent="boutique dog sitting,"
        after="reimagined."
        lead={
          <>
            <p>
              A curated marketplace where Orange County pet parents compare Badge-Rated sitters, request stays, and manage
              everything from their own portal.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill color="#FF3D8B">Marketplace + Brand + Web App</Pill>
              <Pill color="#FFC94A">Pet Services</Pill>
              <Pill color="#7EE0C3">Irvine &amp; Orange County</Pill>
            </div>
          </>
        }
        aside={
          <BrowserFrame
            src="/case-studies/bluesock-hero.webp"
            alt="The Blue Sock homepage"
            label="thebluesock.com"
            width={1440}
            height={810}
            priority
            className="-rotate-[1deg]"
          />
        }
      >
        <Button href="https://www.thebluesock.com/">Visit thebluesock.com</Button>
        <Button href="/#work" variant="ghost">
          More projects
        </Button>
      </PageHero>



      <Section tone="cream" kicker="What we built" title="Everything a boutique" accent="marketplace needs.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {built.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={b.color}>{b.icon}</IconBadge>
                <h3 className="font-ui !py-0 font-bold tracking-[-0.02em] mb-2 text-xl">{b.title}</h3>
                <p className="text-[#1B140D]/75">{b.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" kicker="The pet parent journey" title="Booking made" accent="simple.">
        <Steps
          steps={[
            { title: "Browse sitters", description: "Compare profiles with photos, reviews, home details, and Blue Sock Badges." },
            { title: "Submit a request", description: "Choose a sitter, pick dates, and share details about your pup." },
            { title: "Manage it in the portal", description: "Track the stay, message the sitter, manage pets, and pay securely." },
          ]}
        />
      </Section>

      <Section tone="ink" kicker="At a glance" title="Live and" accent="growing.">
        <dl className="grid gap-8 border-t border-[#FDF6EC]/15 pt-10 md:grid-cols-3">
          {glance.map((g) => (
            <Reveal key={g.big}>
              <dt className="joy-accent-night font-bungee text-4xl md:text-5xl">{g.big}</dt>
              <dd className="mt-2 text-[#FDF6EC]/70">{g.small}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </MainLayout>
  );
};

export default TheBlueSock;
