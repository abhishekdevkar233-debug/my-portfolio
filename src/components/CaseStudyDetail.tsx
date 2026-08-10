"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Feature } from "@/components/ui/feature-with-image-comparison";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import type { CaseStudy } from "@/lib/case-studies";
import { CASE_STUDIES } from "@/lib/case-studies";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

export default function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
  const next = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main className="px-6 pb-24 pt-16 sm:px-10 lg:px-16 xl:px-[220px]">
        {/* back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-medium tracking-wide transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to case studies
          </Link>
        </motion.div>

        {/* hero */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: study.tint }}
          >
            {study.tag}
          </span>
          <h1
            className="mt-4 max-w-3xl font-[var(--font-instrument-serif)] text-[40px] leading-[1.1] sm:text-[56px]"
            style={{ color: "var(--foreground)" }}
          >
            {study.title}
          </h1>
          <p
            className="mt-5 max-w-xl text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {study.desc}
          </p>
        </motion.div>

        {/* meta row */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 grid grid-cols-2 gap-6 rounded-[24px] border p-8 sm:grid-cols-3"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div>
            <div
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Role
            </div>
            <div className="mt-2 text-[15px]" style={{ color: "var(--foreground)" }}>
              {study.role}
            </div>
          </div>
          <div>
            <div
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Timeline
            </div>
            <div className="mt-2 text-[15px]" style={{ color: "var(--foreground)" }}>
              {study.timeline}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div
              className="text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--subtle-foreground)" }}
            >
              Tools
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border px-3 py-1 text-[12px]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* preview panel */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative mt-10 overflow-hidden rounded-[28px] border"
          style={{
            borderColor: "var(--border)",
            background: study.bg,
          }}
        >
          <div className="h-3 w-full" style={{ background: study.accent }} />
          <div className="p-10 sm:p-14">
            <div
              className="text-[13px] font-medium"
              style={{ color: study.tint }}
            >
              {study.screen.heading}
            </div>
            <div
              className="mt-2 max-w-md text-[14px] leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {study.screen.sub}
            </div>
          </div>
        </motion.div>

        {/* overview */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-16 max-w-2xl"
        >
          <h2
            className="text-[22px]"
            style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 500 }}
          >
            Overview
          </h2>
          <p
            className="mt-4 text-[15px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {study.overview}
          </p>
        </motion.div>

        {/* Before/after comparison — only this case study has paired shots. */}
        {study.slug === "enterprise-workspace" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-20"
          >
            <Feature
              badge="Before / After"
              title="From scattered tools to one workspace"
              description="Drag the handle to compare the workspace before the redesign with the unified interface that replaced it."
              beforeSrc="/case-studies/enterprise-before.jpg"
              beforeAlt="The enterprise workspace before the redesign"
              afterSrc="/case-studies/enterprise-after.jpg"
              afterAlt="The unified enterprise workspace after the redesign"
              beforeLabel="Before"
              afterLabel="After"
            />
          </motion.div>
        )}

        {/* Phone mockups — second case study (payroll) is a mobile-first flow. */}
        {study.slug === "payroll-management" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-20"
          >
            <h2
              className="mb-10 text-[22px]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              On mobile
            </h2>
            <PhoneMockupBasic />
          </motion.div>
        )}

        {/* Cinematic accessibility statement — third case study (government). */}
        {study.slug === "government-portal" && (
          <div className="mt-20">
            <CinematicHero
              eyebrow="Built for everyone"
              title="Public services, designed for"
              highlight="every citizen"
              description="A government portal can't assume a digitally fluent user. Every screen was built and tested to WCAG AA, with plain language, large touch targets, and save-and-resume by default."
              cardTitle="Accessibility was the brief, not a checklist"
              cardBody="Forms were rewritten from legal language into short, plain-language steps and validated with citizens directly — so the portal works for people across every age and literacy level, not just those already comfortable online."
              stats={[
                { label: "Conformance", value: "WCAG AA" },
                { label: "Reading level", value: "Plain" },
                { label: "Save & resume", value: "Default" },
              ]}
            />
          </div>
        )}

        {/* sections */}
        <div className="mt-16 flex flex-col gap-14">
          {study.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              custom={i + 4}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="max-w-2xl"
            >
              <h3
                className="text-[13px] font-medium uppercase tracking-[0.2em]"
                style={{ color: study.tint }}
              >
                {String(i + 1).padStart(2, "0")}
              </h3>
              <h2
                className="mt-3 text-[22px]"
                style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 500 }}
              >
                {section.heading}
              </h2>
              <p
                className="mt-4 text-[15px] leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* outcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 max-w-2xl rounded-[24px] border p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <h2
            className="text-[13px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--subtle-foreground)" }}
          >
            Outcome
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--foreground)" }}>
            {study.outcome}
          </p>
        </motion.div>

        {/* next case study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 border-t pt-10"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: "var(--subtle-foreground)" }}
          >
            Next case study
          </div>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group mt-4 inline-flex items-center gap-3 font-[var(--font-instrument-serif)] text-[28px] transition-colors sm:text-[34px]"
            style={{ color: "var(--foreground)" }}
          >
            {next.title}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
