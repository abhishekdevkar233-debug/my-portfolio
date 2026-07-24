export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  tint: string;
  bg: string;
  accent: string;
  role: string;
  timeline: string;
  tools: string[];
  screen: {
    heading: string;
    sub: string;
  };
  overview: string;
  sections: {
    heading: string;
    body: string;
  }[];
  outcome: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "enterprise-workspace",
    tag: "SaaS Platform",
    title: "Reimagining an enterprise workspace",
    desc: "Designing a unified SaaS workspace that brings scattered enterprise tools into one coherent, fast interface.",
    tint: "#2DD4BF",
    bg: "linear-gradient(160deg, rgba(45,212,191,0.10), var(--surface) 60%)",
    accent: "rgba(148,163,161,0.16)",
    role: "Product Designer",
    timeline: "8 weeks",
    tools: ["Figma", "FigJam", "Framer"],
    screen: {
      heading: "Workspace Overview",
      sub: "Track projects, teams, and deliverables in one unified view.",
    },
    overview:
      "Teams were juggling five disconnected tools to plan, track, and ship work. The goal was to unify these workflows into a single workspace without flattening the depth power users relied on.",
    sections: [
      {
        heading: "The problem",
        body: "Context switching between tools cost teams hours every week. Notifications were scattered, ownership was unclear, and reporting required manual exports stitched together in spreadsheets.",
      },
      {
        heading: "The approach",
        body: "I ran workflow-mapping sessions with three customer teams to find the shared shape underneath their different processes, then designed a modular workspace shell where views (board, table, timeline) plug into the same underlying data model.",
      },
      {
        heading: "Key decisions",
        body: "We kept a single persistent navigation rail and made every view filterable by the same saved-view system, so switching between a kanban board and a timeline never meant losing your place.",
      },
    ],
    outcome:
      "Beta teams reported a 35% drop in time spent searching for status updates, and reporting exports were eliminated entirely in favor of live saved views.",
  },
  {
    slug: "payroll-management",
    tag: "HRMS",
    title: "Payroll Management",
    desc: "Simplifying complex payroll workflows into an intuitive, scalable enterprise system.",
    tint: "#6EA8FE",
    bg: "linear-gradient(160deg, rgba(110,168,254,0.10), var(--surface) 60%)",
    accent: "rgba(110,168,254,0.16)",
    role: "UI/UX Designer",
    timeline: "10 weeks",
    tools: ["Figma", "Notion", "Maze"],
    screen: {
      heading: "Payroll Summary",
      sub: "Automated salary runs with real-time compliance checks.",
    },
    overview:
      "HR admins were running payroll through a dense, error-prone spreadsheet-like tool with no visibility into compliance issues until after a run failed.",
    sections: [
      {
        heading: "The problem",
        body: "A single payroll run touched tax rules, benefits deductions, and compliance checks across states, but admins only discovered errors after submitting — forcing manual rollbacks.",
      },
      {
        heading: "The approach",
        body: "I designed a step-by-step run flow with inline validation surfaced before submission, and a compliance panel that flags at-risk line items with plain-language explanations instead of error codes.",
      },
      {
        heading: "Key decisions",
        body: "Every number on screen is traceable — clicking any total opens a breakdown of exactly which employees and rules contributed to it, building trust in a domain where accuracy is non-negotiable.",
      },
    ],
    outcome:
      "Pre-submission error catches rose sharply, cutting post-run corrections and the support tickets that came with them.",
  },
  {
    slug: "government-portal",
    tag: "Government",
    title: "Government Portal",
    desc: "Accessible, human-centered digital services for citizens at scale.",
    tint: "#5EEAD4",
    bg: "linear-gradient(160deg, rgba(94,234,212,0.10), var(--surface) 60%)",
    accent: "rgba(94,234,212,0.16)",
    role: "Product Designer",
    timeline: "12 weeks",
    tools: ["Figma", "Axe", "UserTesting"],
    screen: {
      heading: "Citizen Services",
      sub: "Apply, track, and receive government services digitally.",
    },
    overview:
      "Citizens applying for public services faced long paper-based queues and forms written in legal language. The brief was to design a portal usable by people across every age and literacy level.",
    sections: [
      {
        heading: "The problem",
        body: "Existing digital forms mirrored paper forms exactly, dense with jargon, no save-and-resume, and no way to check application status without visiting an office in person.",
      },
      {
        heading: "The approach",
        body: "I rewrote application flows into short, plain-language steps validated with citizens directly, added save-and-resume by default, and built a status tracker so a visit to the counter was no longer the only way to get an update.",
      },
      {
        heading: "Key decisions",
        body: "Every screen was built and tested to WCAG AA, with large touch targets and a reading level suitable for a broad public audience, not just digitally fluent users.",
      },
    ],
    outcome:
      "Application completion rates improved significantly, and in-person status inquiries dropped as citizens shifted to self-serve tracking.",
  },
  {
    slug: "fintech-platform",
    tag: "Fintech",
    title: "Fintech Platform",
    desc: "Trust-driven interfaces for financial products used by thousands daily.",
    tint: "#FBBF24",
    bg: "linear-gradient(160deg, rgba(251,191,36,0.10), var(--surface) 60%)",
    accent: "rgba(251,191,36,0.16)",
    role: "Product Designer",
    timeline: "6 weeks",
    tools: ["Figma", "Framer", "Amplitude"],
    screen: {
      heading: "Account Overview",
      sub: "Clear balances, transfers, and spend insights at a glance.",
    },
    overview:
      "A fintech app's core account screen was overloaded with promotional content, burying the balance and transaction data users opened the app to check.",
    sections: [
      {
        heading: "The problem",
        body: "Analytics showed users scrolling past three promo banners just to find their balance, and support was fielding repeated questions about where a specific transfer had gone.",
      },
      {
        heading: "The approach",
        body: "I restructured the home screen around a strict content hierarchy — balance and recent activity first, insights second, promotions last and collapsible — and redesigned the transfer flow with clear status states.",
      },
      {
        heading: "Key decisions",
        body: "Every state that touches money (pending, processing, failed) got its own distinct, unambiguous visual treatment so users never had to guess whether a transfer had gone through.",
      },
    ],
    outcome:
      "Time-to-balance dropped to under two seconds on average, and transfer-status support tickets fell after launch.",
  },
  {
    slug: "ai-copilot",
    tag: "AI Product",
    title: "Designing an AI copilot",
    desc: "Crafting an approachable interface for an AI copilot that assists users through complex workflows.",
    tint: "#F472B6",
    bg: "linear-gradient(160deg, rgba(244,114,182,0.10), var(--surface) 60%)",
    accent: "rgba(244,114,182,0.16)",
    role: "Product Designer",
    timeline: "9 weeks",
    tools: ["Figma", "Framer", "Linear"],
    screen: {
      heading: "AI Copilot",
      sub: "Ask questions, get suggestions, and act in one flow.",
    },
    overview:
      "The product team wanted an AI assistant embedded in the app, but early prototypes felt like a chatbot bolted onto the side — disconnected from the work users were actually doing.",
    sections: [
      {
        heading: "The problem",
        body: "Users had to describe what they wanted in a separate chat panel, then manually copy the AI's suggestion back into the workflow — an extra translation step that broke trust and flow.",
      },
      {
        heading: "The approach",
        body: "I designed inline suggestion surfaces that appear directly where the user is working, with one-click apply/reject actions, plus a lightweight chat for open-ended requests when inline suggestions weren't enough.",
      },
      {
        heading: "Key decisions",
        body: "Every AI suggestion is scoped, reversible, and clearly labeled as AI-generated, so users stayed in control and could build calibrated trust in the assistant over time.",
      },
    ],
    outcome:
      "Suggestion acceptance rate outperformed the standalone-chat prototype, and qualitative feedback shifted from 'it feels like a tool' to 'it feels like a teammate'.",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
