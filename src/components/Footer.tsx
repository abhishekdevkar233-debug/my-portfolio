"use client";

import { motion } from "framer-motion";
import { CONTACT_METHODS } from "@/lib/contact-data";

const EMAIL_METHOD = CONTACT_METHODS.find((m) => m.id === "email")!;

const CONTACT_ROWS = [
  { label: "Email", value: EMAIL_METHOD.value, href: EMAIL_METHOD.href },
  { label: "LinkedIn", value: "linkedin.com/in/abhishek-devkar", href: "#" },
  { label: "Previous Work", value: "behance.net/abhishekdevkar", href: "#" },
];

function ConnectIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      <rect x="10" y="20" width="38" height="26" rx="4" stroke="var(--foreground)" strokeWidth="2" />
      <path d="M10 24l19 14 19-14" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M48 40c6 0 9 4 9 9s-4 8-8 8"
        stroke="var(--foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="57" r="2" fill="var(--foreground)" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="px-6 py-24 sm:px-10 lg:px-16" style={{ color: "var(--foreground)" }}>
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ConnectIcon />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-6 text-[36px] sm:text-[44px]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400 }}
        >
          Let&apos;s get in touch!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-2 text-[14px] font-medium"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#6EA8FE" }}
        >
          I&apos;d love to connect with you!
        </motion.p>

        <div className="mt-10 flex w-full flex-col gap-3">
          {CONTACT_ROWS.map((row, i) => (
            <motion.a
              key={row.label}
              href={row.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + i * 0.08 }}
              className="flex items-center justify-between rounded-2xl px-6 py-4 text-left transition-colors hover:opacity-80"
              style={{ background: "var(--surface)" }}
            >
              <span className="text-[14px]" style={{ color: "var(--muted-foreground)" }}>
                {row.label}
              </span>
              <span className="text-[14px]" style={{ color: "var(--foreground)" }}>
                {row.value}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t pt-6" style={{ borderColor: "var(--border)" }}>
        <p
          className="text-center text-[12px] uppercase tracking-[0.25em]"
          style={{ color: "var(--footer-foreground)" }}
        >
          © {new Date().getFullYear()} Abhishek Devkar — Crafted with care
        </p>
      </div>
    </footer>
  );
}
