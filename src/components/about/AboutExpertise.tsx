"use client";

import { motion } from "framer-motion";

const EXPERTISE = [
  {
    emoji: "🔍",
    title: "Strategy & Research",
    description: "Expertise in understanding goals and analyzing audiences before design begins.",
    from: "#DCFCE7",
    to: "#BBF7D0",
    rotate: -3,
  },
  {
    emoji: "🖥️",
    title: "Design & Prototype",
    description: "Crafting refined visuals and interactive prototypes that translate user needs into engaging designs.",
    from: "#FFEDD5",
    to: "#FED7AA",
    rotate: 2,
  },
  {
    emoji: "🚀",
    title: "Product Testing & Analytics",
    description: "Conducting usability tests and analyzing research data to refine designs based on real feedback.",
    from: "#DBEAFE",
    to: "#BFDBFE",
    rotate: -1.5,
  },
];

export default function AboutExpertise() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[220px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[28px] sm:text-[34px]"
        style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
      >
        Expertise
      </motion.h2>

      <div className="mx-auto mt-16 flex max-w-xl flex-col gap-10 sm:gap-8">
        {EXPERTISE.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
            className="flex items-start gap-4 rounded-2xl p-6 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <span className="text-[28px] leading-none">{item.emoji}</span>
            <div>
              <h3 className="text-[18px] font-bold" style={{ color: "#1F2937" }}>
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "#374151" }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
