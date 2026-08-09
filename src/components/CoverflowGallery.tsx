"use client";

import { motion } from "framer-motion";
import {
  CoverflowCarousel,
  type CoverflowSlide,
} from "@/components/ui/coverflow-carousel";

// Placeholder imagery (Unsplash). Swap these for real project shots when
// they're ready — the carousel only needs { src, alt, title, subtitle }.
const DUMMY_SLIDES: CoverflowSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — abstract circuitry pattern",
    title: "Placeholder 01",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — mobile app on a desk",
    title: "Placeholder 02",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — analytics dashboard on a laptop",
    title: "Placeholder 03",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — code editor on a laptop screen",
    title: "Placeholder 04",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — soft gradient workspace",
    title: "Placeholder 05",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — data charts on a monitor",
    title: "Placeholder 06",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — source code close-up",
    title: "Placeholder 07",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — developer desk setup",
    title: "Placeholder 08",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — colourful code on a display",
    title: "Placeholder 09",
    subtitle: "Sample slide",
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
    alt: "Placeholder — minimal laptop on a gradient background",
    title: "Placeholder 10",
    subtitle: "Sample slide",
  },
];

export default function CoverflowGallery() {
  return (
    <section
      id="gallery"
      className="px-6 py-24 sm:px-10 lg:px-16"
      style={{ background: "var(--background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 text-center"
      >
        <p
          className="text-[12px] font-medium uppercase tracking-[0.2em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Gallery
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <CoverflowCarousel
          slides={DUMMY_SLIDES}
          label="Gallery"
          cardWidth="clamp(180px, 26vw, 320px)"
          showCaption
          showPagination
          showNavigation
        />
      </motion.div>
    </section>
  );
}
