import { motion } from "framer-motion";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import MainLayout from "./_layouts";

// Custom component for Color Palette
const ColorPalette = () => {
  const colors = [
    {
      name: "Deep Teal Blue",
      hex: "#003B49",
      role: "Primary – depth, trust, clarity",
    },
    {
      name: "Soft Sand",
      hex: "#FDF6EC",
      role: "Secondary – warmth, space, approachability",
    },
    {
      name: "Coral",
      hex: "#FF6B6B",
      role: "Accent – energy, contrast, emotional warmth",
    },
    {
      name: "Sky Blue",
      hex: "#4ABEFF",
      role: "Accent – freshness, modern edge (optional use)",
    },
  ];

  return (
    <div className="my-8">
      <h4 className="text-xl md:text-2xl font-bold text-[#003B49] mb-4">
        Color Palette:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colors.map((color) => (
          <div
            key={color.hex}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="h-24" style={{ backgroundColor: color.hex }} />
            <div className="p-4">
              <h5 className="font-bold text-[#003B49]">{color.name}</h5>
              <p className="text-sm text-gray-600 mt-1">{color.hex}</p>
              <p className="text-[#003B49] mt-2">{color.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom component for Color Usage Guidelines
const ColorUsageGuidelines = () => {
  const guidelines = [
    {
      element: "Header / Logo",
      color: "Deep Teal Blue",
      hex: "#003B49",
      swatch: true,
    },
    {
      element: "CTA Buttons",
      color: "Sky Blue",
      hex: "#4ABEFF",
      swatch: true,
    },
    {
      element: "Backgrounds",
      color: "Soft Sand",
      hex: "#FDF6EC",
      swatch: true,
    },
    {
      element: "Text / Body",
      color: "Deep Teal Blue or Charcoal",
      hex: "#003B49",
      swatch: true,
    },
    {
      element: "Headings",
      color: "Deep Teal Blue",
      hex: "#003B49",
      swatch: true,
    },
    {
      element: "Inline Links",
      color: "Coral",
      hex: "#FF6B6B",
      swatch: true,
    },
    {
      element: "Hover States",
      color: "Darker Coral",
      hex: "#e55a5a",
      swatch: true,
    },
    {
      element: "Icons / Highlights",
      color: "Sky Blue",
      hex: "#4ABEFF",
      swatch: true,
    },
    {
      element: "Footer Background",
      color: "Muted Deep Teal or Soft Sand",
      hex: "#003B49",
      opacity: 0.9,
      swatch: true,
    },
  ];

  return (
    <div className="my-8">
      <h3 className="text-2xl md:text-3xl font-bold text-[#003B49] mb-6">
        🧭 Color Usage Guidelines
      </h3>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="w-1/3 font-medium text-[#003B49]">
              <strong>{item.element}</strong>
            </div>
            <div className="w-1/3 text-[#003B49] flex items-center">
              {item.swatch && (
                <div
                  className="w-6 h-6 mr-3 rounded border border-gray-200"
                  style={{
                    backgroundColor: item.hex,
                    opacity: item.opacity || 1,
                  }}
                />
              )}
              {item.color}
            </div>
            <div className="w-1/3 text-gray-500 text-sm">
              {item.hex}
              {item.opacity ? ` (${item.opacity * 100}% opacity)` : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Split the markdown content into sections to properly position the custom components
const partOne = `### The Joy Digi — Brand Deck (Updated)

---

#### 🌞 Brand Name:

**The Joy Digi**

#### 🏷️ Tagline:

_A digital studio for visionary brands_

#### ✨ Mission Statement:

Helping businesses grow with joyful experiences, purposeful design, custom tech, and clear strategy.

#### 🎯 Positioning Statement:

The Joy Digi helps bring ideas to life through thoughtful design and modern technology. Services include websites, web apps, and digital tools that are clean, functional, and tailored to clients' goals. Focused on creating real value that supports business growth. We make your digital journey joyful and stress-free — handling the technical side so you can focus on running your business.

#### 🌊 What Sets The Joy Digi Apart:

- Growth-focused solutions – built to support clients' next stage
- Tailored, not cookie-cutter – shaped by each client's unique goals
- Built with clarity and care – clean design, solid tech, and long-term value

#### 🧠 Brand Personality:

- Friendly, clear, and professional
- Calm and confident (coastal vibe, minimalist mindset)
- A curious problem solver who cares deeply about value and clarity

#### 🎯 Target Audience:

- New businesses needing websites and digital presence
- Existing small businesses wanting to grow with digital transformation
- Solopreneurs and creatives seeking unique, storytelling-based websites
- Non-technical founders needing a freelance CTO or tech partner

#### 🛠️ Core Services:

- **Website Design & Development**  
  Custom, clean, and SEO-optimized websites that reflect your brand and help convert visitors into customers. Built with modern tools and mobile-friendly design.

- **Web & Mobile Applications**  
  Full-stack development for web and mobile apps tailored to your business goals. From MVPs to internal tools — scalable, secure, and user-friendly.

- **Digital Consulting (tech stack, SEO, strategy)**  
  Expert guidance to clarify your digital roadmap. Whether you're choosing the right tools, boosting visibility on search engines, or improving your funnel — we help you move smarter.

#### 🔁 Process (How We Work):

At The Joy Digi, we aim to make your digital transformation feel easy, fun, and empowering — not overwhelming.

1. **Free Consultation** – Understand your goals, challenges, and ideas.
2. **Custom Proposal** – You'll receive a tailored plan with scope, time estimate, and cost.
3. **Design & Build** – We turn your vision into a clean, functional digital product.
4. **Launch & Support** – We help launch your site/app and provide ongoing support if needed.

#### 💬 Pricing Model:

- Hourly rate based on project needs
- Transparent time tracking
- Custom quote for every client

#### 👨‍💻 Founder Story (Long):

Hi, I'm Long — founder and developer of The Joy Digi.

I've spent over 10 years as a software engineer working with big tech companies, startups, and consulting firms. Throughout that journey, I've built everything from polished user-facing apps to robust internal systems, learning what really creates value for a business.

The Joy Digi is my way of combining that experience with a personal mission: helping others bring meaningful ideas to life. I believe in a **value-first approach** — where every project is designed not just to look good, but to make a real impact. Whether it's a handcrafted website, a custom app, or a strategy session, it's all about creating tools that truly serve your goals.

#### 🎨 Visual Identity

**Logo:**  
Bold typography with a stylized sun in the "O" of **JOY** and a wave flowing through **DIGI** — symbolizing warmth, clarity, and creative motion.`;

const partTwo = `**Typography:**

- **Headings:** Quicksand – rounded, modern, and friendly
- **Body Text:** Inter – clean, legible, and professional

---`;

const partThree = `### 📁 Case Studies

#### **QRganiz**

**Website:** [qrganiz.com](https://www.qrganiz.com)

**Project Type:** Mobile App (iOS & Android) + Website + Digital Launch  
**Industry:** Productivity / Tech / Personal Inventory

**Challenge:**  
Client had a vision for a smart QR code-based item tracker. They needed both a product and go-to-market strategy.

**What We Did:**

- Product Design & Branding (color-coded QR labels, brand identity)
- Mobile App Development (React Native, SI photo tagging)
- Website design & development
- Amazon product listing support
- SEO strategy & content
- Social media ad campaigns

**Result:**
QRganiz launched as a simple but powerful solution for organizing personal items. The app and website combo created a seamless user experience, supported by multi-channel marketing for growth.`;


const BrandDeckPage: React.FC = () => {
  // Check if we're on the client-side (to avoid SSR issues)
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>The Joy Digi | Brand Deck</title>
        <meta name="robots" content="noindex" />
      </Head>
      <MainLayout>
        <div className="py-16 bg-[#FDF6EC]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12"
            >
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#003B49] mb-6">
                    The Joy Digi
                  </h1>
                  <p className="text-xl text-[#003B49] mb-8">
                    A digital studio for visionary brands
                  </p>
                </div>
                <ReactMarkdown
                  components={{
                    // Customize headings
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-2xl md:text-3xl font-bold text-[#003B49] mb-4"
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className="text-xl md:text-2xl font-bold text-[#003B49] mb-3 mt-8"
                        {...props}
                      />
                    ),
                    // Style paragraphs
                    p: ({ node, ...props }) => (
                      <p className="text-[#003B49] mb-4" {...props} />
                    ),
                    // Style lists
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-6 mb-6 text-[#003B49]"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal pl-6 mb-6 text-[#003B49]"
                        {...props}
                      />
                    ),
                    // Style links
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#FF6B6B] hover:text-[#4ABEFF] underline"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#003B49]" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-[#003B49]" {...props} />
                    ),
                  }}
                >
                  {partOne}
                </ReactMarkdown>

                {/* Insert Color Palette custom component */}
                {isMounted && <ColorPalette />}

                {/* Part Two - Content between Color Palette and Color Usage Guidelines */}
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="text-[#003B49] mb-4" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-6 mb-6 text-[#003B49]"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#003B49]" {...props} />
                    ),
                    hr: ({ node, ...props }) => (
                      <hr
                        className="my-8 border-t-2 border-[#FDF6EC]"
                        {...props}
                      />
                    ),
                  }}
                >
                  {partTwo}
                </ReactMarkdown>

                {/* Insert Color Usage Guidelines custom component */}
                {isMounted && <ColorUsageGuidelines />}

                {/* Part Three - Content after Color Usage Guidelines */}
                <ReactMarkdown
                  components={{
                    // Customize headings
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-2xl md:text-3xl font-bold text-[#003B49] mb-4"
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className="text-xl md:text-2xl font-bold text-[#003B49] mb-3 mt-8"
                        {...props}
                      />
                    ),
                    // Style paragraphs
                    p: ({ node, ...props }) => (
                      <p className="text-[#003B49] mb-4" {...props} />
                    ),
                    // Style lists
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-6 mb-6 text-[#003B49]"
                        {...props}
                      />
                    ),
                    // Style links
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#FF6B6B] hover:text-[#4ABEFF] underline"
                        {...props}
                      />
                    ),
                    // Style horizontal rules
                    hr: ({ node, ...props }) => (
                      <hr
                        className="my-8 border-t-2 border-[#FDF6EC]"
                        {...props}
                      />
                    ),
                    // Style strong and emphasis
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#003B49]" {...props} />
                    ),
                  }}
                >
                  {partThree}
                </ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default BrandDeckPage;
