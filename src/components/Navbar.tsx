"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/lib/reveal-context";

const LINKS = [
  { label: "Work", href: "/#case-studies" },
  { label: "About", href: "/about-me" },
  { label: "Let's talk", href: "/contact" },
];

export default function Navbar() {
  const revealed = useReveal();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
      className="sticky top-6 z-40 mx-auto flex w-fit max-w-[92vw] items-center gap-6 rounded-full border px-3 py-2"
      style={{
        borderColor: "rgba(255,255,255,0.16)",
        background:
          "linear-gradient(180deg, rgba(35,35,35,0.48), rgba(15,15,15,0.38))",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      <Link
        href="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-[var(--font-instrument-serif)] text-base"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          color: "#F5F5F5",
        }}
      >
        AD
      </Link>

      <span
        className="hidden h-5 w-px sm:block"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      <nav className="flex items-center gap-4 sm:gap-6">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="whitespace-nowrap text-[12px] font-medium tracking-wide text-[#A8A8A8] transition-colors hover:text-[#F5F5F5] sm:text-[13px]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
