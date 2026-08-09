"use client";

import { motion } from "framer-motion";

const EXPERTISE = [
  {
    emoji: "🔍",
    title: "UX Strategy & User Experience",
    description:
      "I translate user needs, business objectives, and product requirements into clear and intuitive experiences. My approach involves understanding the problem, defining user flows and information architecture, and simplifying complex requirements into experiences that are easy to understand and navigate.",
    from: "#DCFCE7",
    to: "#BBF7D0",
    rotate: -3,
  },
  {
    emoji: "🖥️",
    title: "UI Design & Design Systems",
    description:
      "I create thoughtful, visually consistent interfaces with a strong focus on hierarchy, usability, accessibility, and responsive design. I also build and maintain reusable design patterns and components that help teams deliver consistent experiences while keeping products scalable.",
    from: "#FFEDD5",
    to: "#FED7AA",
    rotate: 2,
  },

  {
    emoji: "🤖",
    title: "AI & Emerging Product Experiences",
    description:
      "I design interfaces for AI-powered products with a focus on making complex technology feel simple, useful, and understandable. I explore how conversational interactions, AI-assisted workflows, and emerging patterns can be integrated into products without compromising usability or user control.",
    from: "#DBEAFE",
    to: "#BFDBFE",
    rotate: -1.5,
  },

  {
    emoji: "👥",
    title: "User Research & Usability",
    description:
      "I use user feedback, stakeholder insights, and usability principles to identify pain points and uncover opportunities for improvement. I focus on understanding how users interact with a product and use those insights to refine flows, reduce friction, and create more effective experiences.",
    from: "#DBEAFE",
    to: "#BFDBFE",
    rotate: -1.5,
  },

  {
    emoji: "🤝",
    title: "Design-to-Development Collaboration",
    description:
      "I understand how designs translate into real products. I work closely with developers and stakeholders to create practical, implementation-ready designs, communicate interactions clearly, and ensure the final product stays aligned with the intended experience.",
    from: "#DBEAFE",
    to: "#BFDBFE",
    rotate: -1.5,
  },
];

export default function AboutExpertise() {
  return (
    <section className="px-6 py-22 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[28px] sm:text-[34px]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 400,
          color: "var(--foreground)",
        }}
      >
        My Expertise
      </motion.h2>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
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
              textAlign: "justify",
            }}
          >
            <span className="text-[28px] leading-none">{item.emoji}</span>
            <div>
              <h3
                className="text-[18px] font-bold"
                style={{ color: "#1F2937" }}
              >
                {item.title}
              </h3>
              <p
                className="mt-1.5 text-[14px] leading-relaxed"
                style={{ color: "#374151" }}
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
