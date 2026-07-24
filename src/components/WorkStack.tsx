"use client";

import { motion } from "framer-motion";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Enterprise Workspace",
    description: "A unified SaaS workspace for distributed teams.",
    imageSrc:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop",
    href: "#case-studies",
  },
  {
    id: 2,
    title: "Payroll Management",
    description: "Simplifying complex payroll workflows for HRMS teams.",
    imageSrc:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
    href: "#case-studies",
  },
  {
    id: 3,
    title: "Government Portal",
    description: "Accessible digital services for citizens at scale.",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    href: "#case-studies",
  },
  {
    id: 4,
    title: "Fintech Platform",
    description: "Trust-driven interfaces for everyday financial products.",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    href: "#case-studies",
  },
  {
    id: 5,
    title: "AI Copilot",
    description: "An approachable interface for an AI-assisted workflow.",
    imageSrc:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    href: "#case-studies",
  },
];

export default function WorkStack() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14"
      >
        <h2
          className="text-[32px] sm:text-[40px]"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 400,
          }}
        >
          More highlights
        </h2>
        <p
          className="mt-3 max-w-xl text-[15px] leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Drag, click, or use the arrow keys to browse through a few more
          projects.
        </p>
      </motion.div>

      <CardStack
        items={ITEMS}
        initialIndex={0}
        autoAdvance
        intervalMs={3200}
        pauseOnHover
        showDots
        cardWidth={420}
        cardHeight={280}
      />
    </section>
  );
}
