"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

function MagneticCtaButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <motion.a
      ref={ref}
      href="#contact-form"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-[16px] font-medium transition-transform duration-200 ease-out"
      style={{ background: "var(--foreground)", color: "var(--background)" }}
    >
      Start a Conversation
      <span>→</span>
    </motion.a>
  );
}

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center sm:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,138,255,0.08), transparent 60%)",
        }}
      />

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-[26px] italic leading-snug sm:text-[34px]"
        style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--foreground)" }}
      >
        &ldquo;Great products begin with great conversations.&rdquo;
      </motion.blockquote>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="mt-12 flex justify-center"
      >
        <MagneticCtaButton />
      </motion.div>
    </section>
  );
}
