"use client";

import { motion } from "framer-motion";

const PARAGRAPHS = [
  "Hi, I'm Abhishek Devkar — a UI/UX designer who also edits video and writes frontend code, because I've never liked staying in one lane. I care about interfaces that feel obvious the first time you use them, not ones that just impress in a portfolio.",
  "I've shaped everything from enterprise SaaS dashboards to government portals to AI copilot interfaces, using tools like Claude and Cursor to think faster, not skip thinking. This page is my journey, my tools, and my expertise, in one place.",
  "Every project I take on starts with the same question: what does the user actually need here? The answer shapes everything that follows — the flow, the visuals, and the details most people never notice but always feel.",
];

export default function AboutIntro() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[160px]">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[12px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            About Me
          </motion.p>

          <div className="mt-6 flex flex-col gap-5">
            {PARAGRAPHS.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="text-[16px] leading-relaxed sm:text-[17px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-[420px] lg:sticky lg:top-24"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.svg"
            alt="Abhishek Devkar"
            className="relative mx-auto block w-full select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
