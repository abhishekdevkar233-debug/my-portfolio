"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const FACTS = [
  "I move fluidly between UI/UX, motion, and video editing — most designers pick one lane, I like owning the whole craft.",
  "I lean on AI tools like Claude and Cursor daily, not to replace design thinking, but to move from idea to prototype faster.",
  "I've designed for very different worlds in the same year — enterprise SaaS, government platforms, and AI copilots.",
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-[-10%] h-[480px] w-[480px] rounded-full bg-[#6EA8FE]/10 blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.2em]"
            style={{ borderColor: "var(--border-strong)", color: "var(--muted-foreground)" }}
          >
            About
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-2xl text-[38px] leading-[1.15] tracking-tight sm:text-[50px] lg:text-[56px]"
            style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--foreground)" }}
          >
            Collaboration is <em style={{ color: "#6EA8FE", fontStyle: "italic" }}>the key</em> that
            unlocks great design.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-7 max-w-lg text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Since anyone can build now, AI has raised the bar for strong
            collaboration — but it hasn&apos;t changed the need to keep
            experiences rooted in human-centered design.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-5 max-w-lg text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            This is where I believe designers still carry responsibility —
            to advocate for users, and make sure every solution is built
            around their real problems and needs.
          </motion.p>
        </div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-[20px] border p-6 sm:p-7"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <p
            className="text-[12px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--muted-foreground)" }}
          >
            Interesting Facts
          </p>

          <ul className="mt-5 flex flex-col gap-4">
            {FACTS.map((fact) => (
              <li key={fact} className="flex gap-3 text-[14px] leading-relaxed" style={{ color: "var(--foreground)" }}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#6EA8FE" }} />
                <span>{fact}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <p
              className="text-[14px] italic"
              style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--muted-foreground)" }}
            >
              &ldquo;If it doesn&apos;t solve a real problem, it&apos;s just decoration.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
