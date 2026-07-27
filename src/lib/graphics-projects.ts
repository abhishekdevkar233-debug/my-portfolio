export interface GraphicsProject {
  slug: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  tint: string;
  tools: string[];
  highlights: string[];
}

export const CATEGORIES = [
  "All",
  "Branding",
  "Logo Design",
  "Social Media",
  "Marketing Creatives",
  "Product Advertising",
  "Print Design",
  "Thumbnails",
] as const;

export const GRAPHICS_PROJECTS: GraphicsProject[] = [
  {
    slug: "corporate-branding",
    title: "Corporate Branding",
    category: "Branding",
    description:
      "Designing professional brand assets that communicate trust, clarity, and a consistent identity across every touchpoint.",
    imageSrc: "/highlights/corporate-branding.jpg",
    tint: "#7C8AFF",
    tools: ["Photoshop", "Illustrator", "Figma"],
    highlights: [
      "Built a cohesive visual system usable across print and digital",
      "Balanced a modern feel with the trust cues a corporate audience expects",
      "Delivered a flexible asset kit the client's team could extend on their own",
    ],
  },
  {
    slug: "product-campaign",
    title: "Product Campaign",
    category: "Marketing Creatives",
    description:
      "Creating visually compelling campaigns that capture attention and drive engagement across product launches.",
    imageSrc: "/highlights/product-campaign.jpg",
    tint: "#2DD4BF",
    tools: ["Photoshop", "Illustrator"],
    highlights: [
      "Designed a campaign key visual built to adapt across ad sizes",
      "Used color and contrast to keep the product the clear focal point",
      "Optimized layouts for both paid social and on-site placements",
    ],
  },
  {
    slug: "visual-advertising",
    title: "Visual Advertising",
    category: "Product Advertising",
    description:
      "Showcasing products through clean, impactful, and conversion-focused visual design.",
    imageSrc: "/highlights/visual-advertising.jpg",
    tint: "#FBBF24",
    tools: ["Photoshop", "Lightroom"],
    highlights: [
      "Prioritized product clarity over decorative noise",
      "Designed a clear visual hierarchy pointing straight to the offer",
      "Tuned color grading to make the product pop against its background",
    ],
  },
  {
    slug: "linkedin-thumbnail",
    title: "LinkedIn Thumbnail",
    category: "Thumbnails",
    description:
      "Scroll-stopping social media thumbnails and visual assets optimized to maximize reach.",
    imageSrc: "/highlights/linkedin-thumbnail.jpg",
    tint: "#F472B6",
    tools: ["Photoshop", "Canva"],
    highlights: [
      "Designed for legibility at small feed sizes, not just full-screen",
      "Used bold type and a clear focal face to stop the scroll",
      "Kept a consistent thumbnail template for series consistency",
    ],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    category: "Logo Design",
    description:
      "Minimal, scalable, and distinctive logo marks tailored for modern businesses and digital-first brands.",
    imageSrc: "/highlights/logo-design.jpg",
    tint: "#5EEAD4",
    tools: ["Illustrator", "Figma"],
    highlights: [
      "Reduced each mark to its simplest recognizable form",
      "Verified legibility at favicon size and on large signage alike",
      "Delivered full lockup variations (horizontal, stacked, monogram)",
    ],
  },
];

export function getGraphicsProject(slug: string) {
  return GRAPHICS_PROJECTS.find((p) => p.slug === slug);
}
