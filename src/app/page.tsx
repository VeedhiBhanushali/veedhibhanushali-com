import Image from "next/image";
import type { CSSProperties } from "react";
import { CardPager } from "./components/CardPager";
import { DecisionTrailCard } from "./components/DecisionTrailCard";
import { ExpandableAboutBody } from "./components/ExpandableAboutBody";
import { ResumePopupButton } from "./components/ResumePopupButton";
import { HeaderSectionNav, SidebarSectionNav } from "./components/SectionNav";
import {
  DraggableScroll,
  HeroLeadTypewriter,
  PageReveal,
  SkillMarquee,
} from "./components/HomeAnimations";

const A = "/assets/figma-32-55";

type BrandLogo = {
  name: string;
} & (
  | { src: string; width: number; height: number }
  | { initials: string }
);

type TimelineLogo = {
  alt: string;
} & (
  | { src: string; width: number; height: number }
  | { initials: string }
);

type WorkExperience = {
  company: string;
  title: string;
  dates: string;
  body: string;
  logo: TimelineLogo;
  founder?: boolean;
};

type Project = {
  title: string;
  tags: string[];
  description: string;
  href: string;
  accent: "amber" | "blue" | "green" | "purple";
  imageSrc?: string;
};

const NAV_ITEMS = [
  { label: "Home", href: "#home", top: 44 },
  { label: "About", href: "#about", top: 92 },
  { label: "Projects", href: "#projects", top: 140 },
  { label: "Work", href: "#work", top: 187 },
];

const APPLIED_ENGINEERING_URL =
  "https://applied-engineering-sjsu.vercel.app";

const RESUME_PDF_URL = "/assets/veedhi-bhanushali-resume.pdf";

/** Matches `.pf-type-hero-lead` — link stays visually plain in the rotating headline. */
const HERO_AE_LINK_CLASS =
  "font-normal text-inherit no-underline decoration-transparent underline-offset-2 hover:underline hover:decoration-black/20";

const AE_ABOUT_LINK_CLASS =
  "font-semibold text-[#569AD9] hover:text-[#4a85c4] underline-offset-2 hover:underline";

const HERO_LINE_1 =
  "I build systems for decisions that are too expensive to get wrong.";
const HERO_LINE_2_BEFORE = "Founder of Bridge. President of ";
const HERO_LINE_2_LINK = "Applied Engineering @ SJSU";
const HERO_LINE_2_AFTER = ".";
const HERO_LINE_3 =
  "AI engineer. Researcher. International student who got tired of missing things.";

const SKILLS = [
  "FashionCLIP",
  "FAISS",
  "LangChain",
  "FastAPI",
  "TypeScript",
  "React Native",
  "Next.js 15",
  "Supabase",
  "Framer Motion",
  "MCP",
  "RAG",
  "Anthropic API",
  "LangGraph",
  "Docker",
  "RAGAS",
  "Vector DBs",
];

function HomeAboutBlurb() {
  return (
    <>
      I build full-stack AI products end to end. FastAPI backends, vector
      retrieval pipelines, React Native apps, and Next.js interfaces. I founded
      Bridge, run{" "}
      <a
        href={APPLIED_ENGINEERING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={AE_ABOUT_LINK_CLASS}
      >
        Applied Engineering @ SJSU
      </a>
      , and research decision-making because understanding how people fail is
      the only serious way to design systems that prevent it.
    </>
  );
}

const CURRENT_STATUS =
  "Bloom Energy AI Infrastructure Planner · Bridge Early Access · Wardrobe IQ in active development";

const ABOUT_WHY_BODY = `Products I've built start from a specific failure I lived through.

- Built Bridge after moving countries for university. Missed deadlines I did not know existed. I was the user and knew exactly what it cost to get it wrong.
- Built Wardrobe IQ after mapping my own return frequency with fashion apps: taste ignored, purchase intent missed, low wearability on everything I bought.
- what does it actually cost someone when this fails?`;

const ABOUT_THINK_BODY = `I push myself to think in tradeoffs, not features.

- For Wardrobe IQ: the question was not which signals to include. It was which signal wins when they conflict. Compatibility had to dominate. A trending item that clashes with what you own should always lose.
- For Bridge: social features tested well. I cut all of them. They answered the wrong question. I chose precision over coverage.
- Across the stack: agentic pipelines, retrieval systems with eval scores, full-stack AI end to end. I treat AI as an architectural decision with tradeoffs, instead of a layer you add.
- Building toward: technical enough to know when simpler is right, clear enough on the problem to know what simple means.`;

const ABOUT_LEAD_BODY = `I have thoughtfully led at opportunities I have received.

- 16: R&D department head across 70 schools. 17: House President, 360 students.
- Year 1 at SJSU: Program Management Director, Responsible Computing Club. Lead Mozilla Ambassador on campus. Built the responsible computing program from zero. Tech4Good: 350 students.
- Year 2: Elected to the Associated Students board as Student-at-Large of Operations. Democratic mandate across 40,000 students. Allocated real university funds. Learned how institutions make decisions when stakes are real.
- Year 3: Founded Applied Engineering: first two years at SJSU showed me exactly what institutions lack, and what matters to industry. 100 members. Production AI systems for real clients.`;

const WORK_LOGOS: BrandLogo[] = [
  {
    name: "UL Solutions",
    src: `${A}/ul-logo.png`,
    width: 45,
    height: 45,
  },
  {
    name: "Applied Engineering",
    src: `${A}/logo-applied-engineering.png`,
    width: 72,
    height: 68,
  },
  {
    name: "Bridge",
    src: `${A}/logo-headstarter-v2.png`,
    width: 96,
    height: 96,
  },
  {
    name: "Headstarter AI",
    src: `${A}/logo-bridge-v2.png`,
    width: 96,
    height: 96,
  },
  {
    name: "GlitzFashions",
    initials: "GF",
  },
  {
    name: "SJSU",
    src: `${A}/sjsu-logo.png`,
    width: 76,
    height: 31,
  },
];

const DECISION_TRAIL = [
  {
    title: "Killed the social features",
    body: "Bridge had events, free food, social discovery. Tested well. Cut all of it. The real problem was wrong information at the wrong time, not information overload.",
    accent: "#f59e0b",
  },
  {
    title: "200+ interviews before a code",
    body: "Talked to students, collaborated with SJSU's ISSS office, ran structured surveys. The product changed completely from the first version.",
    accent: "#3b82f6",
  },
  {
    title: "Rejected wardrobe-first for Wardrobe IQ",
    body: "The obvious approach was to build from what a user owns. We rejected it, it created friction, didn't feel impressive. Started from taste instead.",
    accent: "#8b5cf6",
  },
  {
    title: "Took the unglamorous client problems",
    body: "Applied Engineering finds problems companies have sidelined because of deadlines. Those are the real problems. That's how we ended up with Bloom Energy.",
    accent: "#10b981",
  },
  {
    title: "Built the regret model to inform the product",
    body: "21,800 Reddit posts. Three domains. Quantitative modelling. Not research : a design tool for Bridge's risk intelligence layer.",
    accent: "#ec4899",
  },
];

const PROJECTS: Project[] = [
  {
    title: "Wardrobe IQ — AI Personalisation System",
    tags: ["FashionCLIP", "FAISS", "FastAPI", "Next.js 15", "Anthropic API", "SSE", "Framer Motion"],
    description:
      "Three-signal purchase intelligence system built for Phia. Solves cold-start personalisation, session intent inference, and return-rate prediction in fashion.\n\nTaste extraction via FashionCLIP (ViT-B/32, fine-tuned on 800K Farfetch items) from Pinterest boards at zero purchase history. Session intent inference from browsing coherence. Wardrobe-integrated purchase confidence scoring.\n\nResults: +102% taste relevance vs. random baseline · +52% vs. popularity ranking at zero saves · 69.5% purchase confidence accuracy vs. 50% random.\n\nAgentic stylist: multi-turn Claude Sonnet 4 with 4 live tools, SSE streaming mixed content, FAISS IndexFlatIP over 2,364-item catalog, MMR reranking (λ=0.7).",
    href: "https://excellent-base-91b.notion.site/Phia-Wardrobe-Intelligence-Project-344716a5357d807f89bcc7761d1e7f34",
    accent: "amber",
    imageSrc: "/assets/projects/wardrobe-iq-v2.png",
  },
  {
    title: "Bridge — Student Decision Intelligence Platform",
    tags: ["Next.js", "React Native", "AWS", "Stage Engine", "AI", "User Research"],
    description:
      "Founded to help students navigate high-stakes decision windows before they close.\n\nIdentified the problem from personal experience. Ran structured research with 200+ students and SJSU's ISSS office. Built a stage-aware engine that surfaces the next critical action per user journey. Killed the social features when they diluted the core.\n\nThe insight: one missed step — a CPT deadline, an OPT window — can change your entire trajectory. Bridge's risk intelligence layer flags these before they close, not after.\n\nShipped 25+ features across web and mobile. Early access waitlist live.",
    href: "https://bridged.vercel.app",
    accent: "blue",
    imageSrc: "/assets/projects/bridge-v2.png",
  },
  {
    title: "Customer Service RAG Agent",
    tags: ["LangChain", "ChromaDB", "GPT-4", "RAGAS", "Docker", "LangSmith", "GitHub Actions"],
    description:
      "Led 3-engineer team to design and ship a production RAG customer service agent for SGConsulting.\n\nRAGAS evals: faithfulness 0.83 · answer relevancy 0.81 · context recall 0.89. LangSmith tracing: 5.25s average latency · $0.0065/query.\n\nDockerized with GitHub Actions CI/CD, pytest suite, and zero-downtime releases. Technical runbooks adopted by client engineering team.",
    href: "https://scientific-sock-142.notion.site/AI-customer-service-agent-RAG-2fbc943a2c4b80ce80aef1d4ec8eb77c",
    accent: "green",
    imageSrc: "/assets/projects/customer-service-rag-v2.png",
  },
  {
    title: "Regret Analysis — Decision Research",
    tags: ["Python", "NLP", "Reddit API", "Data Science", "Behavioural Research"],
    description:
      "Analysed 21,800 Reddit posts across career, relationships, and education to model when and why people reverse high-stakes decisions.\n\nKey findings: regret peaks differ by domain — career regret surfaces fastest, relationship regret surfaces latest. Inaction regret outweighs action regret 2:1 in long-horizon decisions.\n\nThese findings directly inform Bridge's risk intelligence design, the system is built around the actual timing of when decision windows close in real student journeys, not assumed timelines.",
    href: "https://regret-analysis.vercel.app",
    accent: "purple",
    imageSrc: "/assets/projects/regret-analysis-v2.png",
  },
];

const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "Applied Engineering @ SJSU",
    title: "President Ext. Affairs",
    dates: "Sep 2025 – Present · San Jose, CA",
    body: "Co-founded and run SJSU's first student-run software agency: 100+ members, live production work for industry clients. Act as PM and tech lead across engagements: interview companies to find underserved problems, scope projects, recruit and manage cross-functional teams, own delivery end-to-end. Current clients: SGConsulting, Bloom Energy.",
    logo: {
      src: `${A}/logo-applied-engineering.png`,
      alt: "Applied Engineering logo",
      width: 72,
      height: 68,
    },
  },
  {
    company: "Bridge",
    title: "Founder",
    dates: "Aug 2025 – Present",
    body: "Identified the problem from personal experience. 200+ interviews. Killed the social features when they diluted the core. Built stage-aware engine + mobile app. Currently in early access.",
    logo: {
      src: `${A}/logo-headstarter-v2.png`,
      alt: "Bridge logo",
      width: 96,
      height: 96,
    },
    founder: true,
  },
  {
    company: "UL Solutions",
    title: "Software Engineering Intern",
    dates: "May 2025 – Aug 2025 · San Jose, CA",
    body: "Built Python data pipelines covering 20+ RF device categories with 100% dataset accuracy. Refactored legacy validation modules cutting test setup time 33% and throughput +25%. Designed structured validation schemas reducing review cycles from 3 to 1; changes adopted across the full RF test suite in production. Cut engineer onboarding time ~40%.",
    logo: { src: `${A}/ul-logo.png`, alt: "UL Solutions logo", width: 45, height: 45 },
  },
  {
    company: "Headstarter AI",
    title: "Software Engineering Fellow",
    dates: "Jul 2024 – Sep 2024 · Remote",
    body: "Built AI-powered applications across a structured 7-week fellowship. Shipped a smart pantry management app using Next.js, Firebase, and TensorFlow.js with image recognition and recipe generation, improving inventory tracking efficiency 50%. Built RecMyProf: an AI professor recommendation system using Next.js, OpenAI API, Pinecone, and FastAPI, rating and matching 300+ professors with semantic search.",
    logo: {
      src: `${A}/logo-bridge-v2.png`,
      alt: "Headstarter AI logo",
      width: 96,
      height: 96,
    },
  },
  {
    company: "GlitzFashions",
    title: "Software Engineering Intern",
    dates: "May 2024 – Aug 2024 · Chennai, India",
    body: "Launched full B2C e-commerce website from design to deployment — 50+ hours of design, development, testing, and deployment using HTML, CSS, JavaScript; improved SEO by 90%. Built an inventory management system in React + Firebase and a billing application in Django that increased operational efficiency 60% and reduced database query latency 30% via indexing.",
    logo: { initials: "GF", alt: "GlitzFashions logo" },
  },
];

export default function Home() {
  return (
    <main className="pf-page">
      {/* Desktop: 1920×1080 Figma canvas, scaled to fit with safe margins. */}
      <div className="pf-stage pf-desktop">
        <div className="pf-canvas">
          <HomeCanvas />
        </div>
      </div>
      {/* Responsive: stacked sections that flow naturally on narrower viewports. */}
      <div className="pf-responsive relative z-10 min-h-dvh w-full max-w-[1080px] flex-col gap-10 self-center px-4 py-8 sm:px-6 sm:py-10 mx-auto">
        <ResponsiveHome />
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Home canvas — exact Figma pixel positions in 1920 × 1080 coordinate space */
/* ─────────────────────────────────────────────────────────────────────────── */

function HomeCanvas() {
  return (
    <>
      {/* Faint rotated card behind the main card */}
      <div
        className="absolute"
        style={{
          top: "50.28px",
          left: "267.88px",
          width: "1629.232px",
          height: "980.435px",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[931px] w-[1601px] rounded-[34px]"
          style={{
            background: "var(--pf-card-rotated)",
            transform: "translate(-50%, -50%) rotate(1.79deg)",
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar />

      <CardPager>
        <HomeCard />
        <AboutCard />
        <ProjectsCard />
        <WorkCard />
      </CardPager>

      {/* Down chevron */}
      <div
        className="absolute"
        style={{ top: "1044px", left: "1083px", width: "15px", height: "8px" }}
      >
        <Image src={`${A}/down.svg`} alt="" width={15} height={8} />
      </div>
    </>
  );
}

function CardShell({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="pointer-events-auto absolute rounded-[34px] bg-white"
      style={{
        top: "77px",
        left: "267px",
        width: "1601px",
        height: "931px",
        boxShadow:
          "0 30px 80px -20px rgba(255,120,140,0.18), 0 8px 24px -8px rgba(0,0,0,0.06)",
      }}
    >
      <PageReveal>{children}</PageReveal>
    </div>
  );
}

function HomeCard() {
  return (
    <CardShell>
      {/* Headline */}
      <h1
        className="pf-type-hero absolute leading-none"
        style={{
          top: "48px",
          left: "68px",
          width: "1056px",
        }}
      >
        Hey! I’m <span style={{ fontWeight: 500 }}>Vee</span>
      </h1>
      <p
        className="pf-type-hero-lead absolute"
        style={{
          top: "140px",
          left: "72px",
          width: "820px",
        }}
      >
        <HeroLeadTypewriter
          line1={HERO_LINE_1}
          line2Before={HERO_LINE_2_BEFORE}
          line2Link={HERO_LINE_2_LINK}
          line2After={HERO_LINE_2_AFTER}
          line3={HERO_LINE_3}
          href={APPLIED_ENGINEERING_URL}
          linkClassName={HERO_AE_LINK_CLASS}
        />
      </p>

      {/* About card */}
      <div
        className="pf-glass absolute rounded-[24px]"
        style={{
          top: "208px",
          left: "68px",
          width: "760px",
          height: "242px",
          borderColor: "rgba(0,0,0,0.1)",
        }}
      />
      <p
        className="pf-type-subtitle absolute"
        style={{
          top: "233px",
          left: "102px",
        }}
      >
        About Me
      </p>
      <p
        className="pf-type-body absolute"
        style={{
          top: "273px",
          left: "102px",
          width: "656px",
        }}
      >
        <HomeAboutBlurb />
      </p>
      <a
        href="#about"
        aria-label="Read more about me"
        className="absolute transition-transform hover:scale-105"
        style={{ top: "227px", left: "740px", width: "61px", height: "61px" }}
      >
        <Image
          src={`${A}/arrow-button.svg`}
          alt=""
          width={61}
          height={61}
          className="h-full w-full"
        />
      </a>

      <div
        className="absolute flex items-center gap-3 rounded-full border border-emerald-500/15 bg-emerald-50/80 px-4"
        style={{
          top: "466px",
          left: "68px",
          height: "42px",
          color: "#166534",
          fontFamily: "Satoshi, var(--font-sans)",
          fontSize: "16px",
          letterSpacing: "-0.32px",
        }}
      >
        <span className="pf-status-dot relative flex h-3 w-3 before:absolute before:inline-flex before:h-full before:w-full before:rounded-full before:bg-emerald-400 before:content-['']">
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        {CURRENT_STATUS}
      </div>

      {/* Data Science @ SJSU pill */}
      <div
        className="absolute flex items-center gap-3 rounded-[24px] border px-5"
        style={{
          top: "532px",
          left: "68px",
          width: "312px",
          height: "48px",
          backgroundColor: "var(--pf-pill-bg)",
          borderColor: "var(--pf-pill-border)",
        }}
      >
        <Image src={`${A}/cap.svg`} alt="" width={27} height={22} />
        <span
          className="whitespace-nowrap text-black"
          style={{ fontSize: "24px", letterSpacing: "-0.72px" }}
        >
          Data Science @ SJSU
        </span>
      </div>

      {/* View Resume button */}
      <ResumePopupButton
        resumeUrl={RESUME_PDF_URL}
        buttonClassName="group absolute flex items-center justify-center rounded-[32px] transition-transform hover:scale-[1.02] active:scale-[0.99]"
        buttonStyle={{
          top: "532px",
          left: "406px",
          width: "225px",
          height: "48px",
          backgroundColor: "#E2F7FF",
          border: "none",
          outline: "none",
        }}
      >
        <span
          className="text-black"
          style={{ fontSize: "24px", letterSpacing: "-0.72px", textDecoration: "none" }}
        >
          View Resume{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </ResumePopupButton>

      {/* Skills marquee */}
      <div
        className="absolute rounded-[24px] border border-black/[0.07] bg-[#f7f7f7]/80 px-2 py-3"
        style={{
          top: "648px",
          left: "68px",
          width: "760px",
        }}
      >
        <SkillMarquee skills={SKILLS} />
      </div>

      <div
        className="absolute flex flex-wrap items-center gap-x-6 gap-y-4"
        style={{
          top: "752px",
          left: "68px",
          width: "760px",
        }}
      >
        <p
          className="shrink-0 text-black"
          style={{
            fontFamily: "Satoshi, var(--font-sans)",
            fontSize: "22px",
            letterSpacing: "-0.72px",
          }}
        >
          Where I’ve worked
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {WORK_LOGOS.map((logo, i) => (
            <CompanyLogoPill key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>


      {/* Right-side photos */}
      <div className="absolute left-[1280px] top-[68px] h-[261px] w-[261px]">
        <Image
          src={`${A}/photo-speaking.png`}
          alt="Veeya speaking"
          width={261}
          height={261}
          priority
          className="h-full w-full rounded-[34px] object-cover"
        />
        <FeaturedOnInstagramCredit />
      </div>
      <div className="absolute left-[1280px] top-[350px] h-[262px] w-[262px] overflow-hidden rounded-[34px]">
        <Image
          src={`${A}/photo-food.png`}
          alt="Veeya eating"
          width={478}
          height={262}
          priority
          className="absolute left-[-41.21%] top-[0.01%] h-full w-[182.45%] max-w-none object-cover"
        />
      </div>
    </CardShell>
  );
}

function CompanyLogoPill({ logo }: { logo: (typeof WORK_LOGOS)[number] }) {
  return (
    <div className="flex h-[48px] min-w-[88px] items-center justify-center rounded-full border border-black/[0.07] bg-white px-4">
      {"src" in logo ? (
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.width}
          height={logo.height}
          className="max-h-[28px] w-auto object-contain opacity-70"
        />
      ) : (
        <span
          className="text-black/60"
          style={{
            fontFamily: "Satoshi, var(--font-sans)",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "-0.3px",
          }}
        >
          {logo.initials}
        </span>
      )}
    </div>
  );
}

function AboutSectionPill({
  children,
  tone,
  compact,
}: {
  children: React.ReactNode;
  tone: "onWhite" | "onGrey";
  /** Slightly smaller pill for denser About layout. */
  compact?: boolean;
}) {
  const pad = compact ? "px-4 py-2" : "px-[18px] py-[10px]";
  const shell =
    tone === "onGrey"
      ? `inline-flex max-w-full w-fit self-start rounded-[999px] border border-black/[0.07] bg-white ${pad} text-left shadow-[0_1px_3px_rgba(0,0,0,0.05)]`
      : `inline-flex max-w-full w-fit self-start rounded-[999px] border border-black/[0.08] bg-[#f0f0f0] ${pad} text-left`;
  return (
    <span
      className={`${shell} min-w-0 break-words`}
      style={{
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: compact ? "20px" : "24px",
        fontWeight: 500,
        letterSpacing: compact ? "-0.6px" : "-0.72px",
        lineHeight: 1.2,
        color: "#242424",
      }}
    >
      {children}
    </span>
  );
}

function AboutCard() {
  const satoshi = { fontFamily: "Satoshi, var(--font-sans)" };
  const bodyStyle: CSSProperties = {
    ...satoshi,
    marginTop: "14px",
    fontSize: "var(--pf-fs-body)",
    letterSpacing: "-0.03em",
    lineHeight: 1.3,
    color: "rgba(0,0,0,0.72)",
  };
  const greyCard =
    "flex min-h-0 flex-col rounded-[18px] border border-black/[0.07] bg-[#e8e8e8] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]";
  const whiteCard =
    "flex flex-col rounded-[18px] border border-black/[0.09] bg-white px-5 py-3 shadow-[0_2px_28px_-12px_rgba(0,0,0,0.12)]";

  return (
    <CardShell>
      <div
        className="pf-thin-scroll absolute overflow-x-hidden overflow-y-auto"
        style={{
          top: "48px",
          left: "68px",
          right: "56px",
          bottom: "28px",
          paddingRight: "8px",
        }}
      >
        <h1 className="pf-type-section-h1 leading-none">
          About Me
        </h1>

        <div className="mt-7 grid min-h-0 grid-cols-2 gap-6 items-stretch">
          <div className="flex min-h-0 min-w-0 flex-col gap-5 self-start">
            <article className={`${whiteCard} min-h-0`}>
              <AboutSectionPill tone="onWhite">Why I Build</AboutSectionPill>
              <ExpandableAboutBody
                label="Why I Build"
                text={ABOUT_WHY_BODY}
                paragraphStyle={bodyStyle}
                lineClamp={5}
              />
            </article>

            <article className={`${greyCard} min-h-0`}>
              <AboutSectionPill tone="onGrey">How I lead</AboutSectionPill>
              <ExpandableAboutBody
                label="How I lead"
                text={ABOUT_LEAD_BODY}
                paragraphStyle={bodyStyle}
                lineClamp={5}
              />
            </article>
          </div>

          <article className={`${greyCard} min-h-0 min-w-0 h-full`}>
            <AboutSectionPill tone="onGrey">How I think</AboutSectionPill>
            <ExpandableAboutBody
              label="How I think"
              text={ABOUT_THINK_BODY}
              paragraphStyle={bodyStyle}
              lineClamp={16}
            />
            <div className="pointer-events-none min-h-0 flex-1 shrink-0" aria-hidden />
          </article>
        </div>

        <div className="mt-7 pb-1">
          <p className="pf-eyebrow mb-3 w-full text-center font-bold">
            Key decisions
          </p>
          <DraggableScroll className="pf-horizontal-scroll overflow-x-auto pb-1 pt-1">
            <div className="flex w-max overflow-hidden bg-transparent">
              {DECISION_TRAIL.map((decision, i) => (
                <div key={decision.title} className={i === 0 ? "" : "border-l border-black/[0.08]"}>
                  <DecisionTrailCard decision={decision} dense />
                </div>
              ))}
            </div>
          </DraggableScroll>
        </div>
      </div>
    </CardShell>
  );
}

function ProjectsCard() {
  return (
    <CardShell>
      {/* ── Header row ─────────────────────────────────────────── */}
      <div
        className="absolute flex items-end justify-between"
        style={{ top: "52px", left: "68px", width: "1465px" }}
      >
        <div>
          <p
            className="pf-type-section-eyebrow mb-2"
          >
            Projects
          </p>
          <h2 className="pf-type-section-display">
            Selected work
          </h2>
        </div>
        <p
          className="pf-type-section-eyebrow max-w-[420px] text-right leading-[1.3] text-black/45"
        >
          Featured builds, case studies, and experiments.
        </p>
      </div>

      {/* ── 2-column card grid ──────────────────────────────────── */}
      <div
        className="absolute grid grid-cols-2"
        style={{
          top: "200px",
          left: "68px",
          width: "1465px",
          gap: "28px",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectTile key={project.title} project={project} />
        ))}
      </div>
    </CardShell>
  );
}

function ProjectTile({
  project,
}: {
  project: Project;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group flex overflow-hidden rounded-[24px] border border-black/[0.08] bg-[#f8f8f8] text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-[0_28px_72px_-36px_rgba(0,0,0,0.45)]"
      style={{ height: "310px" }}
    >
      <div className="relative w-1/2 shrink-0 overflow-hidden border-r border-black/[0.07] bg-white">
        <div
          className="pf-project-gradient absolute inset-0"
          style={{ background: projectGradient(project.accent) }}
        />
        <div className="absolute inset-[18px] rounded-[20px] border border-white/50 bg-white/18 shadow-inner" />
        {project.imageSrc ? (
          <div className="absolute inset-0">
            <Image
              src={project.imageSrc}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 900px) 360px, 50vw"
              className="object-cover opacity-95"
              style={{ objectPosition: "70% center" }}
              priority={project.title.startsWith("Bridge")}
            />
            <div className="absolute inset-0 bg-white/20" aria-hidden />
          </div>
        ) : null}
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-[26px] py-[24px]">
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-[#070707]"
            style={{
              fontSize: "24px",
              lineHeight: "1.08",
              letterSpacing: "-0.03em",
              fontFamily: "Satoshi, var(--font-sans)",
              fontWeight: 500,
            }}
          >
            {project.title}
          </h3>
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#4b4b4b] text-[17px] text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-[6px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d2d2d2] bg-white px-[10px] py-[4px] text-black/55"
              style={{
                fontSize: "11px",
                letterSpacing: "-0.22px",
                fontFamily: "Satoshi, var(--font-sans)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="pf-thin-scroll pf-type-card-body mt-4 min-h-0 flex-1 overflow-y-auto whitespace-pre-line pr-2">
          {project.description}
        </p>
      </div>
    </a>
  );
}

function projectGradient(accent: Project["accent"]) {
  const gradients = {
    amber:
      "radial-gradient(circle at 20% 20%, rgba(253,230,138,0.9), transparent 34%), radial-gradient(circle at 80% 18%, rgba(251,191,36,0.52), transparent 38%), linear-gradient(145deg, #fff7ed, #fde68a 52%, #fef3c7)",
    blue:
      "radial-gradient(circle at 18% 20%, rgba(186,230,253,0.94), transparent 36%), radial-gradient(circle at 84% 16%, rgba(96,165,250,0.46), transparent 38%), linear-gradient(145deg, #eff6ff, #bfdbfe 52%, #e0f2fe)",
    green:
      "radial-gradient(circle at 18% 20%, rgba(187,247,208,0.92), transparent 36%), radial-gradient(circle at 84% 16%, rgba(52,211,153,0.42), transparent 38%), linear-gradient(145deg, #f0fdf4, #bbf7d0 52%, #dcfce7)",
    purple:
      "radial-gradient(circle at 18% 20%, rgba(221,214,254,0.94), transparent 36%), radial-gradient(circle at 84% 16%, rgba(192,132,252,0.42), transparent 38%), linear-gradient(145deg, #faf5ff, #ddd6fe 52%, #f5f3ff)",
  };

  return gradients[accent];
}

function WorkCard() {
  return (
    <CardShell>
      <div
        className="absolute flex items-end justify-between"
        style={{ top: "52px", left: "68px", width: "1465px" }}
      >
        <div>
          <p className="pf-type-section-eyebrow mb-2">
            Work
          </p>
          <h2 className="pf-type-section-display">
            Experience
          </h2>
        </div>
        <p className="pf-type-section-eyebrow max-w-[460px] text-right leading-[1.3] text-black/45">
          A timeline of roles, internships, and collaborations.
        </p>
      </div>

      <div
        className="absolute"
        style={{ top: "172px", left: "68px", width: "1465px", height: "692px" }}
      >
        <div className="absolute left-[52px] top-[34px] h-[610px] w-px bg-black/10" />
        {WORK_EXPERIENCE.map((work, index) => (
          <WorkTimelineEntry key={`${work.title}-${index}`} work={work} index={index} />
        ))}
      </div>
    </CardShell>
  );
}

function WorkTimelineEntry({
  work,
  index,
}: {
  work: (typeof WORK_EXPERIENCE)[number];
  index: number;
}) {
  return (
    <article
      className="absolute"
      style={{ top: `${index * 132}px`, left: 0, width: "1465px", height: "116px" }}
    >
      <div className="absolute left-[22px] top-[26px] grid h-[61px] w-[61px] place-items-center rounded-full border border-black/[0.08] bg-white shadow-[0_18px_45px_-28px_rgba(0,0,0,0.35)]">
        <WorkLogoMark logo={work.logo} />
      </div>

      <div
        className={`absolute rounded-[26px] border border-black/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-[0_24px_64px_-34px_rgba(0,0,0,0.42)] ${
          work.founder ? "pf-glass bg-white/72" : "bg-[#f8f8f8]"
        }`}
        style={{ left: "126px", top: 0, width: "1339px", height: "116px" }}
      >
        <div className="absolute left-[30px] top-[22px]">
          <h3
            className="text-[#070707]"
            style={{
              fontFamily: "Satoshi, var(--font-sans)",
              fontSize: "24px",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: "1.08",
            }}
          >
            {work.title} ·{" "}
            <span className={work.company === "Applied Engineering @ SJSU" ? "block" : "inline"}>
              {work.company}
            </span>
          </h3>
          <p
            className="mt-2 text-[15px] tracking-[-0.03em] text-black/45"
            style={{
              fontFamily: "Satoshi, var(--font-sans)",
            }}
          >
            {work.dates}
          </p>
        </div>
        <p
          className="pf-thin-scroll pf-type-card-body absolute overflow-y-auto pr-2"
          style={{
            top: "18px",
            left: "524px",
            width: "736px",
            height: "80px",
          }}
        >
          {work.body}
        </p>
      </div>
    </article>
  );
}

function WorkLogoMark({
  logo,
}: {
  logo: (typeof WORK_EXPERIENCE)[number]["logo"];
}) {
  return "src" in logo ? (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className="max-h-[34px] max-w-[40px] object-contain opacity-70"
    />
  ) : (
    <span
      className="text-black/60"
      style={{
        fontFamily: "Satoshi, var(--font-sans)",
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "-0.32px",
      }}
    >
      {logo.initials}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Sidebar                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function Sidebar() {
  return (
    <aside
      className="pf-glass absolute z-20 rounded-[34px]"
      style={{
        top: "77px",
        left: "35px",
        width: "207px",
        height: "931px",
      }}
    >
      <SidebarSectionNav items={NAV_ITEMS} />

      <a
        href="#contact"
        className="absolute font-normal text-black underline decoration-solid underline-offset-2"
        style={{ top: "828px", left: "51px", fontSize: "16px" }}
      >
        Let&apos;s Connect
      </a>

      <a
        href="https://linkedin.com/in/veedhibhanushali"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="absolute transition-opacity hover:opacity-70"
        style={{ top: "879px", left: "68px", width: "25px", height: "25px" }}
      >
        <LinkedInIcon />
      </a>

      <a
        href="https://github.com/VeedhiBhanushali"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="absolute transition-opacity hover:opacity-70"
        style={{ top: "879px", left: "107px", width: "26px", height: "25px" }}
      >
        <GitHubIcon />
      </a>
    </aside>
  );
}

const FEATURED_INSTAGRAM_URL =
  "https://www.instagram.com/p/DIkgR96zpVG/?img_index=1";

function FeaturedOnInstagramCredit() {
  return (
    <a
      href={FEATURED_INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="As featured on Instagram — opens in new tab"
      className="group absolute bottom-3 right-3 max-w-[min(100%-16px,11rem)] text-right text-[11px] font-medium leading-snug text-white transition-opacity hover:opacity-95 sm:bottom-3.5 sm:right-3.5 sm:text-[12px]"
      style={{
        fontFamily: "Satoshi, var(--font-sans)",
        letterSpacing: "-0.02em",
      }}
    >
      As featured on{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Responsive home layout                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */

function ResponsiveHome() {
  return (
    <>
      <header className="pf-glass rounded-[24px] px-5 py-5 sm:px-7 sm:py-6">
        <nav className="flex flex-wrap items-center justify-between gap-5">
          <HeaderSectionNav items={NAV_ITEMS} />
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com/in/veedhibhanushali" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="block h-5 w-5 opacity-80">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/VeedhiBhanushali" target="_blank" rel="noreferrer" aria-label="GitHub" className="block h-5 w-5 opacity-80">
              <GitHubIcon />
            </a>
          </div>
        </nav>
      </header>

      <article className="relative grid gap-10 rounded-[28px] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(255,120,140,0.18),0_8px_24px_-8px_rgba(0,0,0,0.06)] sm:rounded-[34px] sm:p-9 md:p-11 lg:grid-cols-[minmax(0,1fr)_clamp(180px,24vw,262px)] lg:gap-10">
        <section className="flex min-w-0 flex-col gap-8">
          <h1 className="pf-type-hero leading-none">
            Hey! I&apos;m <span style={{ fontWeight: 500 }}>Veeya Bhanushali</span>
          </h1>
          <p className="pf-type-hero-lead">
            <HeroLeadTypewriter
          line1={HERO_LINE_1}
          line2Before={HERO_LINE_2_BEFORE}
          line2Link={HERO_LINE_2_LINK}
          line2After={HERO_LINE_2_AFTER}
          line3={HERO_LINE_3}
          href={APPLIED_ENGINEERING_URL}
          linkClassName={HERO_AE_LINK_CLASS}
        />
          </p>

          <section className="pf-glass relative max-w-[760px] rounded-[24px] px-5 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-5">
            <h2 className="pf-type-subtitle">About Me</h2>
            <p className="pf-type-body mt-5 max-w-[656px]">
              <HomeAboutBlurb />
            </p>
            <a
              href="#about"
              aria-label="Read more about me"
              className="absolute right-3 top-3 grid h-[46px] w-[46px] place-items-center rounded-full transition-transform hover:scale-105 sm:right-5 sm:top-5 sm:h-[61px] sm:w-[61px]"
              style={{ backgroundColor: "var(--pf-arrow-bg)" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 17L17 3M3 3H17V17" stroke="white" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </a>
          </section>

          <div className="flex max-w-[760px] items-center gap-3 rounded-full border border-emerald-500/15 bg-emerald-50/80 px-4 py-3.5 text-[15px] leading-[1.35] tracking-[-0.03em] text-emerald-800 sm:px-5 sm:py-4 sm:text-[16px]">
            <span className="pf-status-dot relative flex h-3 w-3 shrink-0 before:absolute before:inline-flex before:h-full before:w-full before:rounded-full before:bg-emerald-400 before:content-['']">
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span>{CURRENT_STATUS}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div
              className="inline-flex h-12 items-center gap-3 rounded-[24px] border px-5"
              style={{
                backgroundColor: "var(--pf-pill-bg)",
                borderColor: "var(--pf-pill-border)",
              }}
            >
              <Image src={`${A}/cap.svg`} alt="" width={27} height={22} />
              <span className="whitespace-nowrap text-black sm:text-[20px]">
                Data Science @ SJSU
              </span>
            </div>
            <ResumePopupButton
              resumeUrl={RESUME_PDF_URL}
              buttonClassName="group flex h-12 items-center justify-center rounded-[32px] px-6 transition-transform hover:scale-[1.02] active:scale-[0.99]"
              buttonStyle={{
                backgroundColor: "#E2F7FF",
                border: "none",
                outline: "none",
                textDecoration: "none",
              }}
            >
              <span className="text-black sm:text-[20px]">
                View Resume{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </ResumePopupButton>
          </div>

          <div className="max-w-[760px] rounded-[24px] border border-black/[0.07] bg-[#f7f7f7]/80 px-2 py-3 sm:py-3.5">
            <SkillMarquee skills={SKILLS} />
          </div>

          <section className="w-full max-w-[760px] text-left">
            <h2 className="pf-type-subtitle text-left text-black">
              Where I&apos;ve worked
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              {WORK_LOGOS.map((logo, i) => (
                <CompanyLogoPill key={`${logo.name}-${i}`} logo={logo} />
              ))}
            </div>
          </section>
        </section>

        <aside className="grid grid-cols-2 gap-5 justify-self-center sm:gap-6 lg:grid-cols-1 lg:justify-self-end">
          <div className="relative aspect-square w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[262px]">
            <Image
              src={`${A}/photo-speaking.png`}
              alt="Veeya speaking"
              width={261}
              height={261}
              priority
              className="aspect-square h-full w-full rounded-[28px] object-cover"
            />
            <FeaturedOnInstagramCredit />
          </div>
          <div className="relative aspect-square w-full max-w-[180px] overflow-hidden rounded-[28px] sm:max-w-[220px] lg:max-w-[262px]">
            <Image
              src={`${A}/photo-food.png`}
              alt="Veeya eating"
              fill
              priority
              sizes="(max-width: 899px) 220px, 262px"
              className="object-cover"
              style={{ objectPosition: "42% center" }}
            />
          </div>
        </aside>
      </article>

      <ResponsiveAbout />
      <ResponsiveProjects />
      <ResponsiveWork />
    </>
  );
}

function ResponsiveAbout() {
  const satoshi = { fontFamily: "Satoshi, var(--font-sans)" };
  const bodyStyle: CSSProperties = {
    ...satoshi,
    marginTop: "14px",
    fontSize: "var(--pf-fs-body)",
    letterSpacing: "-0.03em",
    lineHeight: 1.3,
    color: "rgba(0,0,0,0.72)",
  };
  const whiteCard =
    "flex flex-col rounded-[18px] border border-black/[0.09] bg-white p-4 shadow-[0_2px_28px_-12px_rgba(0,0,0,0.1)] sm:px-5 sm:py-3";
  const greyCard =
    "flex flex-col rounded-[18px] border border-black/[0.07] bg-[#e8e8e8] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:px-5 sm:py-3";

  return (
    <section id="about" className="pf-surface-section">
      <h1 className="pf-type-section-h1 leading-none">
        About Me
      </h1>

      <div className="mt-8 grid min-h-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:items-stretch">
        <div className="flex min-h-0 min-w-0 flex-col gap-5 lg:self-start">
          <article className={`${whiteCard} min-h-0`}>
            <AboutSectionPill tone="onWhite">Why I Build</AboutSectionPill>
            <ExpandableAboutBody
              label="Why I Build"
              text={ABOUT_WHY_BODY}
              paragraphStyle={bodyStyle}
              lineClamp={6}
            />
          </article>

          <article className={`${greyCard} min-h-0`}>
            <AboutSectionPill tone="onGrey">How I lead</AboutSectionPill>
            <ExpandableAboutBody
              label="How I lead"
              text={ABOUT_LEAD_BODY}
              paragraphStyle={bodyStyle}
              lineClamp={6}
            />
          </article>
        </div>

        <article className={`${greyCard} min-h-0 min-w-0 lg:h-full`}>
          <AboutSectionPill tone="onGrey">How I think</AboutSectionPill>
          <ExpandableAboutBody
            label="How I think"
            text={ABOUT_THINK_BODY}
            paragraphStyle={bodyStyle}
            lineClamp={18}
          />
          <div className="pointer-events-none min-h-0 flex-1 shrink-0" aria-hidden />
        </article>
      </div>

      <div className="mt-8 pb-1">
        <p className="pf-eyebrow mb-3 w-full text-center font-bold">
          Key decisions
        </p>
        <DraggableScroll className="pf-horizontal-scroll -mx-1 overflow-x-auto px-1 pb-1 pt-1">
          <div className="flex w-max overflow-hidden bg-transparent">
            {DECISION_TRAIL.map((decision, i) => (
              <div key={decision.title} className={i === 0 ? "" : "border-l border-black/[0.08]"}>
                <DecisionTrailCard decision={decision} dense />
              </div>
            ))}
          </div>
        </DraggableScroll>
      </div>
    </section>
  );
}

function ResponsiveProjects() {
  return (
    <section id="projects" className="pf-surface-section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="pf-type-section-eyebrow mb-2">
            Projects
          </p>
          <h2 className="pf-type-section-display">
            Selected work
          </h2>
        </div>
        <p className="max-w-[420px] text-black/45 sm:text-right">
          Featured builds, case studies, and experiments.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {PROJECTS.map((project) => (
          <ResponsiveProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ResponsiveProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group grid overflow-hidden rounded-[26px] border border-black/[0.08] bg-[#f8f8f8] text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-[0_24px_64px_-34px_rgba(0,0,0,0.42)] sm:grid-cols-[minmax(170px,0.78fr)_1fr]"
    >
      <div className="relative min-h-[190px] overflow-hidden border-b border-black/[0.07] bg-white sm:border-b-0 sm:border-r">
        <div
          className="pf-project-gradient absolute inset-0"
          style={{ background: projectGradient(project.accent) }}
        />
        <div className="absolute inset-[18px] rounded-[20px] border border-white/50 bg-white/18 shadow-inner" />
        {project.imageSrc ? (
          <div className="absolute inset-0">
            <Image
              src={project.imageSrc}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 700px) 340px, 90vw"
              className="object-cover opacity-95"
              style={{ objectPosition: "70% center" }}
            />
            <div className="absolute inset-0 bg-white/20" aria-hidden />
          </div>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[24px] font-medium leading-tight tracking-[-0.03em] text-[#070707]">
            {project.title}
          </h3>
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#4b4b4b] text-[17px] text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d2d2d2] bg-white px-3 py-1 text-[12px] text-black/55"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="pf-type-card-body mt-4 whitespace-pre-line">
          {project.description}
        </p>
      </div>
    </a>
  );
}

function ResponsiveWork() {
  return (
    <section id="work" className="pf-surface-section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="pf-type-section-eyebrow mb-2">
            Work
          </p>
          <h2 className="pf-type-section-display">
            Experience
          </h2>
        </div>
        <p className="max-w-[420px] text-black/45 sm:text-right">
          A timeline of roles, internships, and collaborations.
        </p>
      </div>

      <div className="relative mt-8 space-y-5">
        <div className="absolute left-[29px] top-8 hidden h-[calc(100%-64px)] w-px bg-black/10 sm:block" />
        {WORK_EXPERIENCE.map((work, index) => (
          <ResponsiveWorkTimelineEntry
            key={`${work.title}-${index}`}
            work={work}
          />
        ))}
      </div>
    </section>
  );
}

function ResponsiveWorkTimelineEntry({
  work,
}: {
  work: (typeof WORK_EXPERIENCE)[number];
}) {
  return (
    <article className="relative grid gap-4 sm:grid-cols-[61px_minmax(0,1fr)] sm:gap-5">
      <div className="z-10 grid h-[61px] w-[61px] place-items-center rounded-full border border-black/[0.08] bg-white shadow-[0_18px_45px_-28px_rgba(0,0,0,0.35)]">
        <WorkLogoMark logo={work.logo} />
      </div>

      <div className="rounded-[26px] border border-black/[0.08] bg-[#f8f8f8] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3
              className="text-[#070707]"
              style={{
                fontFamily: "Satoshi, var(--font-sans)",
                fontSize: "clamp(20px, 4.2vw, 24px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
              }}
            >
              {work.title} ·{" "}
              <span
                className={
                  work.company === "Applied Engineering @ SJSU" ? "block" : "inline"
                }
              >
                {work.company}
              </span>
            </h3>
            <p
              className="mt-2 text-[15px] tracking-[-0.03em] text-black/45"
              style={{ fontFamily: "Satoshi, var(--font-sans)" }}
            >
              {work.dates}
            </p>
          </div>
          <p className="pf-type-card-body max-w-[620px] lg:max-w-[680px]">
            {work.body}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Inline SVG icons                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

function LinkedInIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" aria-hidden="true">
      <path d="M22.2222 0C22.9589 0 23.6655 0.292658 24.1864 0.813592C24.7073 1.33453 25 2.04107 25 2.77778V22.2222C25 22.9589 24.7073 23.6655 24.1864 24.1864C23.6655 24.7073 22.9589 25 22.2222 25H2.77778C2.04107 25 1.33453 24.7073 0.813592 24.1864C0.292658 23.6655 0 22.9589 0 22.2222V2.77778C0 2.04107 0.292658 1.33453 0.813592 0.813592C1.33453 0.292658 2.04107 0 2.77778 0H22.2222ZM21.5278 21.5278V14.1667C21.5278 12.9658 21.0507 11.8142 20.2016 10.965C19.3525 10.1159 18.2008 9.63889 17 9.63889C15.8194 9.63889 14.4444 10.3611 13.7778 11.4444V9.90278H9.90278V21.5278H13.7778V14.6806C13.7778 13.6111 14.6389 12.7361 15.7083 12.7361C16.224 12.7361 16.7186 12.941 17.0833 13.3056C17.4479 13.6703 17.6528 14.1649 17.6528 14.6806V21.5278H21.5278ZM5.38889 7.72222C6.00773 7.72222 6.60122 7.47639 7.0388 7.0388C7.47639 6.60122 7.72222 6.00773 7.72222 5.38889C7.72222 4.09722 6.68056 3.04167 5.38889 3.04167C4.76637 3.04167 4.16934 3.28896 3.72915 3.72915C3.28896 4.16934 3.04167 4.76637 3.04167 5.38889C3.04167 6.68056 4.09722 7.72222 5.38889 7.72222ZM7.31944 21.5278V9.90278H3.47222V21.5278H7.31944Z" fill="black" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" aria-hidden="true">
      <path d="M13 0C11.2928 0 9.60235 0.331349 8.02511 0.975129C6.44788 1.61891 5.01477 2.56251 3.80761 3.75206C1.36964 6.15447 0 9.41282 0 12.8103C0 18.4725 3.731 23.2764 8.892 24.9802C9.542 25.0826 9.75 24.6855 9.75 24.3396V22.1747C6.149 22.9433 5.382 20.4581 5.382 20.4581C4.784 18.9721 3.939 18.575 3.939 18.575C2.756 17.7807 4.03 17.8064 4.03 17.8064C5.33 17.896 6.019 19.1258 6.019 19.1258C7.15 21.073 9.061 20.4965 9.802 20.1891C9.919 19.3564 10.257 18.7928 10.621 18.4725C7.735 18.1522 4.706 17.0506 4.706 12.1698C4.706 10.7479 5.2 9.60775 6.045 8.69822C5.915 8.37796 5.46 7.04569 6.175 5.31629C6.175 5.31629 7.267 4.97041 9.75 6.62294C10.777 6.34112 11.895 6.2002 13 6.2002C14.105 6.2002 15.223 6.34112 16.25 6.62294C18.733 4.97041 19.825 5.31629 19.825 5.31629C20.54 7.04569 20.085 8.37796 19.955 8.69822C20.8 9.60775 21.294 10.7479 21.294 12.1698C21.294 17.0634 18.252 18.1394 15.353 18.4597C15.821 18.8568 16.25 19.6382 16.25 20.8296V24.3396C16.25 24.6855 16.458 25.0955 17.121 24.9802C22.282 23.2636 26 18.4725 26 12.8103C26 11.1281 25.6637 9.46225 25.0104 7.90803C24.3571 6.35381 23.3995 4.94161 22.1924 3.75206C20.9852 2.56251 19.5521 1.61891 17.9749 0.975129C16.3977 0.331349 14.7072 0 13 0Z" fill="black" />
    </svg>
  );
}
