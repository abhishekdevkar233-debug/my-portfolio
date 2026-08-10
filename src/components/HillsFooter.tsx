"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GLSLHills } from "@/components/ui/glsl-hills";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhishek-devkar-557501231?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    external: true,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/abhishekdevkar1",
    external: true,
  },
  { label: "Email", href: "mailto:abhishekdevkar8032@gmail.com", external: true },
  { label: "Resume", href: "/resume.pdf", external: true },
];

export default function HillsFooter() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Animated terrain sits behind the content and is purely decorative. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <GLSLHills height="100%" width="100%" cameraZ={125} speed={0.5} />
      </div>

      {/* Fade the terrain into the page so it doesn't cut off hard at the top. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, var(--background), transparent)",
        }}
      />

      <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl text-[38px] leading-[1.1] sm:text-[56px]"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "var(--foreground)",
          }}
        >
          Designs that speak{" "}
          <span style={{ fontStyle: "italic" }}>louder than words</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-5 max-w-md text-[15px] leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Have a product to design or an idea worth exploring? I&apos;d love to
          hear about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border px-8 py-4 text-[14px] font-medium transition-all duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.18)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              color: "var(--foreground)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.16)",
            }}
          >
            Let&apos;s talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="text-[13px] font-medium tracking-wide transition-colors hover:opacity-100"
              style={{ color: "var(--muted-foreground)" }}
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        <p
          className="mt-14 text-[12px] uppercase tracking-[0.25em]"
          style={{ color: "var(--footer-foreground)" }}
        >
          © {new Date().getFullYear()} Abhishek Devkar
        </p>
      </div>
    </footer>
  );
}
