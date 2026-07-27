export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  kind: "copy" | "link";
  actionLabel: string;
  monogram: string;
  tint: string;
}

// NOTE: LinkedIn/Behance/Dribbble/GitHub hrefs are placeholders ("#") since
// the real profile URLs weren't provided. Swap them for your actual links.
export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "email",
    label: "Email",
    value: "abhishekdevkar8032@gmail.com",
    href: "mailto:abhishekdevkar8032@gmail.com",
    kind: "copy",
    actionLabel: "Copy",
    monogram: "@",
    tint: "#7C8AFF",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Connect professionally",
    href: "#",
    kind: "link",
    actionLabel: "Connect",
    monogram: "in",
    tint: "#2DD4BF",
  },
  {
    id: "behance",
    label: "Behance",
    value: "View case studies & visuals",
    href: "#",
    kind: "link",
    actionLabel: "Open",
    monogram: "Be",
    tint: "#5EEAD4",
  },
  {
    id: "dribbble",
    label: "Dribbble",
    value: "Browse design shots",
    href: "#",
    kind: "link",
    actionLabel: "Open",
    monogram: "Dr",
    tint: "#F472B6",
  },
  {
    id: "github",
    label: "GitHub",
    value: "Explore code & experiments",
    href: "#",
    kind: "link",
    actionLabel: "Open",
    monogram: "Gh",
    tint: "#FBBF24",
  },
  {
    id: "location",
    label: "Location",
    value: "India · Remote-friendly",
    href: "",
    kind: "copy",
    actionLabel: "Copy",
    monogram: "📍",
    tint: "#A78BFA",
  },
];

export interface CollaborationType {
  id: string;
  title: string;
  description: string;
  projectType: string;
}

export const COLLABORATION_TYPES: CollaborationType[] = [
  {
    id: "product",
    title: "Build a Product",
    description: "End-to-end UI/UX for a new digital product or platform.",
    projectType: "Product Design",
  },
  {
    id: "brand",
    title: "Brand Identity",
    description: "Logo, visual system, and identity design for your brand.",
    projectType: "Brand Identity",
  },
  {
    id: "freelance",
    title: "Freelance Project",
    description: "A focused, short-term design engagement or one-off piece.",
    projectType: "Freelance Project",
  },
  {
    id: "fulltime",
    title: "Full-Time Opportunity",
    description: "A full-time or long-term in-house design role.",
    projectType: "Full-Time Opportunity",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Discover", description: "Understand the goals, users, and constraints." },
  { step: "02", title: "Research", description: "Study the market, competitors, and behavior patterns." },
  { step: "03", title: "Design", description: "Explore concepts and refine the visual language." },
  { step: "04", title: "Prototype", description: "Build interactive flows to validate the experience." },
  { step: "05", title: "Deliver", description: "Ship polished, production-ready design." },
];

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
];
