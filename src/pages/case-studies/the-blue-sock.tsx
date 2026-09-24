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
    title: "Brand evolution",
    text: "Grew the Ruh Roh Retreat identity into The Blue Sock — a playful, boutique brand built for a community of sitters, not a single business.",
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
    color: "#FF6B6B",
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
      description="How The Joy Digi evolved Ruh Roh Retreat into The Blue Sock — a boutique dog-sitting marketplace for Irvine & Orange County with sitter profiles, badges, portals, and payments."
      image="/case-studies/bluesock-hero.webp"
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
              What started as Ruh Roh Retreat, a single premium boarding business, grew into a curated marketplace where
              Orange County pet parents compare Badge-Rated sitters, request stays, and manage everything from their own
              portal.
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
        <Button href="/#booking" variant="ghost">
          Start your project
        </Button>
      </PageHero>


      <Section
        tone="white"
        kicker="The evolution"
        title="From one retreat to a"
        accent="community of sitters."
        lead="Ruh Roh Retreat proved the demand. The Blue Sock turns that same boutique care into a platform, so more families can find the right match for their dog."
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <Card>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/55">Then — Ruh Roh Retreat</p>
              <div className="overflow-hidden rounded-xl border border-[#003B49]/10">
                <Image src="/case-studies/ruh-roh-hero.webp" alt="The original Ruh Roh Retreat website" width={1416} height={792} className="h-auto w-full" />
              </div>
              <p className="mt-5 text-[#003B49]/75">A single premium boarding business: brand, website, and a booking intake flow.</p>
            </Card>
          </Reveal>
          <div aria-hidden className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-[#003B49] bg-[#FFC94A] text-2xl font-bold rotate-90 lg:rotate-0">
            →
          </div>
          <Reveal delay={0.1}>
            <Card>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#003B49]/55">Now — The Blue Sock</p>
              <div className="overflow-hidden rounded-xl border border-[#003B49]/10">
                <Image src="/case-studies/bluesock-hero.webp" alt="The Blue Sock marketplace homepage" width={1440} height={810} className="h-auto w-full" />
              </div>
              <p className="mt-5 text-[#003B49]/75">A curated marketplace: sitter profiles, badges, premium experiences, portals, and payments.</p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="cream" kicker="What we built" title="Everything a boutique" accent="marketplace needs.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {built.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <Card>
                <IconBadge color={b.color}>{b.icon}</IconBadge>
                <h3 className="font-display !py-0 mb-2 text-2xl font-[460]">{b.title}</h3>
                <p className="text-[#003B49]/75">{b.text}</p>
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
              <dt className="font-display text-5xl md:text-6xl text-[#FFC94A]">{g.big}</dt>
              <dd className="mt-2 text-[#FDF6EC]/70">{g.small}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CtaBand title="Have an idea that could" accent="grow like this?" />
    </MainLayout>
  );
};

export default TheBlueSock;
