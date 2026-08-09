"use client";

import { motion } from "framer-motion";
import {
  CoverflowCarousel,
  type CoverflowSlide,
} from "@/components/ui/coverflow-carousel";

// Local gallery imagery from the public folder.
const DUMMY_SLIDES: CoverflowSlide[] = [
  {
    src: "/insights/img1.jpg",
  },
  {
    src: "/insights/img2.jpg",
  },
  {
    src: "/insights/img3.jpg",
  },
  {
    src: "/insights/img4.jpg",
  },
  {
    src: "/insights/img5.jpg",
  },
  {
    src: "/insights/img6.jpg",
  },
  {
    src: "/insights/img7.jpg.jpg",
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
