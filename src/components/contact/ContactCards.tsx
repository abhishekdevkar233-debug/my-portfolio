"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, Copy as CopyIcon } from "lucide-react";
import { CONTACT_METHODS } from "@/lib/contact-data";

function ContactCard({ method, index }: { method: (typeof CONTACT_METHODS)[number]; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleAction = async () => {
    if (method.kind === "copy") {
      try {
        await navigator.clipboard.writeText(method.value.includes("@") ? method.value : method.value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        // clipboard unavailable — no-op
      }
      return;
    }
    if (method.href && method.href !== "#") {
      window.open(method.href, "_blank", "noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 6) * 0.06 }}
      whileHover={{ y: -4 }}
      data-cursor-hover
      className="group relative overflow-hidden rounded-[22px] border p-6"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-35"
        style={{ background: method.tint }}
        aria-hidden="true"
      />

      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border text-[13px] font-semibold"
        style={{
          borderColor: "rgba(var(--hairline-rgb), 0.18)",
          color: method.tint,
          background: "rgba(var(--hairline-rgb), 0.04)",
        }}
      >
        {method.monogram}
      </div>

      <h3
        className="text-[15px] font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        {method.label}
      </h3>
      <p
        className="mt-1 truncate text-[13px]"
        style={{ color: "var(--muted-foreground)" }}
      >
        {method.value}
      </p>

      {method.href ? (
        <button
          type="button"
          onClick={handleAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-medium transition-colors"
          style={{
            borderColor: "var(--border-strong)",
            color: "var(--foreground)",
          }}
        >
          {method.kind === "copy" ? (
            copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <CopyIcon className="h-3.5 w-3.5" /> {method.actionLabel}
              </>
            )
          ) : (
            <>
              {method.actionLabel} <ExternalLink className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[12px] font-medium"
          style={{ borderColor: "var(--border-strong)", color: "var(--foreground)" }}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" /> {method.actionLabel}
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

export default function ContactCards() {
  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <h2
          className="text-[28px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
        >
          Get in touch
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Pick whatever's easiest — I check all of these regularly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACT_METHODS.map((method, i) => (
          <ContactCard key={method.id} method={method} index={i} />
        ))}
      </div>
    </section>
  );
}
