"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BUDGET_RANGES } from "@/lib/contact-data";

const CONTACT_EMAIL = "abhishekdevkar8032@gmail.com";

function FloatingField({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const shared =
    "peer w-full resize-none border-b bg-transparent pb-2 pt-6 text-[15px] outline-none transition-colors duration-300";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          rows={4}
          className={shared}
          style={{ borderColor: "var(--border-strong)", color: "var(--foreground)" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          className={shared}
          style={{ borderColor: "var(--border-strong)", color: "var(--foreground)" }}
        />
      )}
      <label
        className="pointer-events-none absolute left-0 top-6 text-[15px] transition-all duration-200 peer-focus:top-0 peer-focus:text-[12px] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[12px]"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </label>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 peer-focus:w-full"
        style={{ background: "var(--foreground)" }}
      />
    </div>
  );
}

export default function ContactForm({
  projectType,
  onProjectTypeChange,
}: {
  projectType: string;
  onProjectTypeChange: (v: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New project inquiry${projectType ? `: ${projectType}` : ""}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType || "—"}`,
      `Budget: ${budget || "—"}`,
      "",
      message,
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    setSent(true);
    window.location.href = mailto;
  };

  return (
    <section id="contact-form" className="px-6 py-20 sm:px-10 lg:px-16 xl:px-[160px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl"
      >
        <h2
          className="text-[28px] sm:text-[34px]"
          style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 400, color: "var(--foreground)" }}
        >
          Tell me about your project
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Fill this in and it'll open your email client with everything
          pre-filled, ready to send.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-9">
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <FloatingField label="Name" value={name} onChange={setName} />
            <FloatingField label="Email" type="email" value={email} onChange={setEmail} />
          </div>

          <FloatingField
            label="Project type"
            value={projectType}
            onChange={onProjectTypeChange}
          />

          <div>
            <span
              className="mb-3 block text-[12px] font-medium uppercase tracking-[0.15em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Budget
            </span>
            <div className="flex flex-wrap gap-2">
              {BUDGET_RANGES.map((range) => {
                const active = budget === range;
                return (
                  <button
                    key={range}
                    type="button"
                    data-cursor-hover
                    onClick={() => setBudget(range)}
                    className="rounded-full border px-4 py-2 text-[13px] font-medium transition-colors"
                    style={{
                      borderColor: active ? "var(--foreground)" : "var(--border)",
                      background: active ? "var(--foreground)" : "transparent",
                      color: active ? "var(--background)" : "var(--muted-foreground)",
                    }}
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>

          <FloatingField label="Message" value={message} onChange={setMessage} textarea />

          <motion.button
            type="submit"
            data-cursor-hover
            whileTap={{ scale: 0.97 }}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full px-8 py-4 text-[14px] font-medium"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Send message
            <span>→</span>
          </motion.button>

          {sent ? (
            <p className="text-[13px]" style={{ color: "var(--muted-foreground)" }}>
              Opening your email client — if nothing happened, email me
              directly at {CONTACT_EMAIL}.
            </p>
          ) : null}
        </form>
      </motion.div>
    </section>
  );
}
