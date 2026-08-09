"use client";

import { Compass, LayoutGrid, Bot, Users, Code2 } from "lucide-react";
import { FeatureGrid, type FeatureItem } from "@/components/ui/feature-grid-enterprise-grade";

const EXPERTISE: FeatureItem[] = [
  {
    id: "ux-strategy",
    icon: Compass,
    title: "UX Strategy & User Experience",
    description:
      "I translate user needs, business objectives, and product requirements into clear and intuitive experiences. My approach involves understanding the problem, defining user flows and information architecture, and simplifying complex requirements into experiences that are easy to understand and navigate.",
  },
  {
    id: "ui-design",
    icon: LayoutGrid,
    title: "UI Design & Design Systems",
    description:
      "I create thoughtful, visually consistent interfaces with a strong focus on hierarchy, usability, accessibility, and responsive design. I also build and maintain reusable design patterns and components that help teams deliver consistent experiences while keeping products scalable.",
  },
  {
    id: "ai-products",
    icon: Bot,
    title: "AI & Emerging Product Experiences",
    description:
      "I design interfaces for AI-powered products with a focus on making complex technology feel simple, useful, and understandable. I explore how conversational interactions, AI-assisted workflows, and emerging patterns can be integrated into products without compromising usability or user control.",
  },
  {
    id: "user-research",
    icon: Users,
    title: "User Research & Usability",
    description:
      "I use user feedback, stakeholder insights, and usability principles to identify pain points and uncover opportunities for improvement. I focus on understanding how users interact with a product and use those insights to refine flows, reduce friction, and create more effective experiences.",
  },
  {
    id: "design-to-dev",
    icon: Code2,
    title: "Design-to-Development Collaboration",
    description:
      "I understand how designs translate into real products. I work closely with developers and stakeholders to create practical, implementation-ready designs, communicate interactions clearly, and ensure the final product stays aligned with the intended experience.",
  },
];

export default function AboutExpertise() {
  return (
    <FeatureGrid
      features={EXPERTISE}
      sectionTitle="My Expertise"
      sectionSubtitle="The areas I work across, from early strategy through to shipped product."
    />
  );
}
