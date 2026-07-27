"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

function useCardSize() {
  const [size, setSize] = useState({ width: 420, height: 280 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) setSize({ width: Math.min(260, vw - 96), height: 200 });
      else if (vw < 768) setSize({ width: 320, height: 220 });
      else setSize({ width: 420, height: 280 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

const ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Corporate Branding",
    description:
      "Designing professional brand assets that communicate trust, clarity.",
    imageSrc: "/highlights/corporate-branding.jpg",
    href: "/graphics/corporate-branding",
    tag: "Branding",
  },
  {
    id: 2,
    title: "Product Campaign",
    description:
      "Creating visually compelling campaigns that capture attention and drive engagement.",
    imageSrc: "/highlights/product-campaign.jpg",
    href: "/graphics/product-campaign",
    tag: "Marketing Creatives",
  },
  {
    id: 3,
    title: "Visual Advertising",
    description:
      "Showcasing products through clean, impactful, and conversion-focused visual design.",
    imageSrc: "/highlights/visual-advertising.jpg",
    href: "/graphics/visual-advertising",
    tag: "Product Advertising",
  },
  {
    id: 4,
    title: "LinkedIn Thumbnail",
    description:
      "Scroll-stopping social media thumbnails and visual assets optimized to maximize reach.",
    imageSrc: "/highlights/linkedin-thumbnail.jpg",
    href: "/graphics/linkedin-thumbnail",
    tag: "Thumbnails",
  },
  {
    id: 5,
    title: "Logo Design",
    description:
      "Minimal, scalable, and distinctive logo marks tailored for modern businesses and digital-first brands.",
    imageSrc: "/highlights/logo-design.jpg",
    href: "/graphics/logo-design",
    tag: "Logo Design",
  },
];

export default function WorkStack() {
  const { width: cardWidth, height: cardHeight } = useCardSize();

  return (
    <section className="overflow-hidden px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]">
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
        cardWidth={cardWidth}
        cardHeight={cardHeight}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="mt-14 flex justify-center"
      >
        <Link
          href="/graphics"
          className="group inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-[14px] font-medium transition-all duration-300"
          style={{
            borderColor: "rgba(255,255,255,0.16)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            color: "var(--foreground)",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          Explore All
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
