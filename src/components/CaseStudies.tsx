import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  return (
    <Link
      href={`/case-studies/${c.slug}`}
      className="group relative block overflow-hidden rounded-[28px] border shadow-sm"
      style={{
        borderColor: "var(--border)",
        background: c.bg,
      }}
    >
      <div className="grid grid-cols-1 items-center gap-8 px-10 py-8 sm:px-12 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
      <div>
        <span
          className="text-[11px] font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {String(i + 1).padStart(2, "0")} &bull; {c.tag}
        </span>
        <h3
          className="mt-4 font-[var(--font-instrument-serif)] text-[28px] leading-[1.15] sm:text-[34px]"
          style={{ color: "var(--foreground)" }}
        >
          {c.title}
        </h3>
        <p
          className="mt-4 max-w-md text-[15px] leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          {c.desc}
        </p>
        <span
          className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[13px] font-medium"
          style={{
            borderColor: "var(--border-strong)",
            background: "rgba(var(--hairline-rgb), 0.04)",
            color: "var(--foreground)",
          }}
        >
          View Case Study
          <span>→</span>
        </span>
      </div>

      {/* phone mockup */}
      <div className="relative flex justify-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/iphone-16-pro-mockup.png"
          alt={`${c.title} shown on an iPhone 16 Pro`}
          className="-mb-10 w-full max-w-[320px] select-none transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 sm:max-w-[400px] lg:max-w-[460px]"
          draggable={false}
        />
      </div>
      </div>
    </Link>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]"
    >
      <div className="mb-14">
        <h2
          className="text-[32px] sm:text-[40px]"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 400,
          }}
        >
          Selected work
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Stories which encapsulate my thought process &amp; display my
          prowess in interactive design.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {CASE_STUDIES.map((c, i) => (
          <CaseCard key={c.title} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}
