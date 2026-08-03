"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReveal } from "@/lib/reveal-context";

const LINKS = ["About", "Work", "Contact"];

const LINK_HREFS: Record<string, string> = {
  About: "/about-us",
  Work: "/#work",
  Contact: "/contact",
};

export default function Navbar() {
  const revealed = useReveal();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
      className="sticky top-6 z-40 mx-auto flex w-fit max-w-[92vw] items-center gap-6 rounded-full border px-3 py-2"
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      <Link
        href="/"
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

      <nav className="hidden items-center gap-6 sm:flex">
        {LINKS.map((link) => (
          <Link
            key={link}
            href={LINK_HREFS[link]}
            className="whitespace-nowrap text-[13px] font-medium tracking-wide text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
          >
            {link}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
