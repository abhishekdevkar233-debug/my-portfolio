"use client";

import { motion } from "framer-motion";

const PARAGRAPHS = [
  "My design philosophy is simple: clarity beats decoration. Every screen I ship starts from the user's problem, not the visual trend of the week — the polish comes after the logic makes sense.",
  "Over the years I've worked across enterprise SaaS, government platforms, fintech, and AI products, which taught me to design for very different kinds of users without losing a consistent voice.",
  "Outside of client work, I spend my time exploring motion design, building small design-system experiments, and sharpening the craft that ends up in every project I take on.",
];

export default function AboutBio() {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-24 lg:px-16 xl:px-[300px]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {PARAGRAPHS.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            className="text-[17px] leading-relaxed sm:text-[19px]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
