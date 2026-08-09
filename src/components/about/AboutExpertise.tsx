"use client";

import { Compass, LayoutGrid, Bot, Users, Code2 } from "lucide-react";
import { DarkGrid, type DarkGridItem } from "@/components/ui/dark-grid";

const EXPERTISE: DarkGridItem[] = [
  {
    title: "UX Strategy & User Experience",
    icon: Compass,
    desc: "I translate user needs, business objectives, and product requirements into clear and intuitive experiences — defining user flows and information architecture, and simplifying complex requirements into experiences that are easy to navigate.",
  },
  {
    title: "UI Design & Design Systems",
    icon: LayoutGrid,
    desc: "Thoughtful, visually consistent interfaces with a strong focus on hierarchy, usability, accessibility, and responsive design — plus the reusable patterns and components that keep products scalable.",
  },
  {
    title: "AI & Emerging Product Experiences",
    icon: Bot,
    badge: "New",
    desc: "Interfaces for AI-powered products that make complex technology feel simple and understandable — conversational interactions and AI-assisted workflows that never compromise usability or user control.",
  },
  {
    title: "User Research & Usability",
    icon: Users,
    desc: "I use user feedback, stakeholder insights, and usability principles to identify pain points and uncover opportunities — then turn those insights into flows with less friction.",
  },
  {
    title: "Design-to-Development Collaboration",
    icon: Code2,
    desc: "I understand how designs translate into real products. I work closely with developers to create implementation-ready designs and keep the shipped result aligned with the intended experience.",
  },
];

export default function AboutExpertise() {
  return (
    <DarkGrid
      items={EXPERTISE}
      eyebrow="[ WHAT I DO ]"
      heading="My Expertise"
      className="bg-black text-zinc-50"
    />
  );
}
