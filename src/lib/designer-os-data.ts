import { CASE_STUDIES } from "./case-studies";

export interface Song {
  title: string;
  src: string;
}

export const PLAYLIST: Song[] = [
  {
    title: "The Best Songs of 2020",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Late Night Focus",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Golden Hour",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export interface DesktopTool {
  id: string;
  name: string;
  logo: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
  tint: string;
}

export const DESKTOP_TOOLS: DesktopTool[] = [
  {
    id: "safari",
    name: "Safari",
    logo: "/logos/safari.svg",
    level: "Expert",
    description: "Browsing • Testing • Everyday Web",
    tint: "#5AC8FA",
  },
  {
    id: "figma",
    name: "Figma",
    logo: "/logos/figma.svg",
    level: "Expert",
    description: "Design Systems • Auto Layout • Prototyping • UI/UX",
    tint: "#A78BFA",
  },
  {
    id: "claude",
    name: "Claude AI",
    logo: "/logos/claude.svg",
    level: "Expert",
    description: "AI Workflows • Prompt Engineering • UI Generation",
    tint: "#D97757",
  },
  {
    id: "cursor",
    name: "Cursor",
    logo: "/logos/cursor.svg",
    level: "Advanced",
    description: "Frontend Development • React • AI Coding",
    tint: "#6EA8FE",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "/logos/openai.svg",
    level: "Advanced",
    description: "Ideation • Content • Research Assistance",
    tint: "#10B981",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    logo: "/logos/photoshop.svg",
    level: "Expert",
    description: "Compositing • Retouching • Visual Design",
    tint: "#31A8FF",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    logo: "/logos/illustrator.svg",
    level: "Advanced",
    description: "Vector Art • Logo Design • Iconography",
    tint: "#FF9A00",
  },
  {
    id: "after-effects",
    name: "After Effects",
    logo: "/logos/after-effects.svg",
    level: "Advanced",
    description: "Motion Design • Micro-interactions • VFX",
    tint: "#9999FF",
  },
  {
    id: "premiere",
    name: "Premiere Pro",
    logo: "/logos/premiere.svg",
    level: "Advanced",
    description: "Video Editing • Color Grading • Storytelling",
    tint: "#9AA0FF",
  },
  {
    id: "vscode",
    name: "VS Code",
    logo: "/logos/vscode.svg",
    level: "Advanced",
    description: "Frontend Development • React • TypeScript",
    tint: "#007ACC",
  },
  {
    id: "github",
    name: "GitHub",
    logo: "/logos/github.svg",
    level: "Advanced",
    description: "Version Control • Collaboration • Open Source",
    tint: "#A8A8A8",
  },
];

export interface DesktopFolder {
  id: string;
  name: string;
  caseStudySlug?: string;
  href?: string;
}

export const DESKTOP_FOLDERS: DesktopFolder[] = [];

export function getCaseStudyForFolder(folder: DesktopFolder) {
  if (!folder.caseStudySlug) return undefined;
  return CASE_STUDIES.find((c) => c.slug === folder.caseStudySlug);
}
