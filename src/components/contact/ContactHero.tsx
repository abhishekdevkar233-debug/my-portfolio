"use client";

import { motion } from "framer-motion";
import KineticGrid from "@/components/ui/kinetic-grid";

const PARTICLES = [
  { top: "18%", left: "10%", size: 3, delay: 0 },
  { top: "28%", left: "85%", size: 2, delay: 1.4 },
  { top: "62%", left: "18%", size: 2, delay: 2.6 },
  { top: "72%", left: "78%", size: 3, delay: 0.9 },
  { top: "45%", left: "92%", size: 2, delay: 3.3 },
  { top: "50%", left: "4%", size: 2, delay: 1.9 },
];

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center sm:px-10">
      <div className="absolute inset-0 -z-10">
        <KineticGrid className="h-full" globalColor="default" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 900px 600px at 50% 40%, transparent 0%, var(--background) 75%)",
          }}
        />
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(var(--hairline-rgb), 0.4)",
              filter: "blur(1px)",
            }}
            animate={{ y: [0, -16, 0], opacity: [0.15, 0.55, 0.15] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="max-w-4xl text-[42px] leading-[1.08] tracking-tight sm:text-[64px] lg:text-[76px]"
        style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--foreground)" }}
      >
        Let&apos;s Create Something{" "}
        <span style={{ fontStyle: "italic" }}>Exceptional</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="mt-6 max-w-xl text-[17px] leading-relaxed"
        style={{ color: "var(--muted-foreground)" }}
      >
        Have a product to design, a brand to shape, or an idea worth
        exploring? I&apos;d love to hear about it — let&apos;s make it real,
        together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--subtle-foreground)" }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px"
          style={{ background: "var(--border-strong)" }}
        />
      </motion.div>
    </section>
  );
}
