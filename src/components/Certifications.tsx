"use client";

import { motion } from "framer-motion";

// href is "#" for now, as requested. The real verification links are printed
// on the certificates themselves if you want to swap them in later:
//   Google UX Design → coursera.org/verify/professional-cert/QRRMHYAV6GRB
//   Figma UI UX Advanced → ude.my/UC-22443744-93c1-4820-a62f-701afdff6b8d
export interface Certificate {
  src: string;
  alt: string;
  title: string;
  issuer: string;
  meta: string;
  href: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    src: "/certificates/google-ux-design.png",
    alt: "Google UX Design Professional Certificate, issued via Coursera",
    title: "Google UX Design",
    issuer: "Google · Coursera",
    meta: "8 courses · Sep 2025",
    href: "https://coursera.org/share/97f466172bae3ce137a95e9a27f238e7",
  },
  {
    src: "/certificates/figma-ui-ux-advanced.jpg",
    alt: "Figma UI UX Design Advanced certificate of completion, issued via Udemy",
    title: "Figma UI UX Design Advanced",
    issuer: "Udemy · Daniel Walter Scott",
    meta: "16 hours · Jul 2025",
    href: "https://www.udemy.com/certificate/UC-22443744-93c1-4820-a62f-701afdff6b8d/",
  },
];

function CertificateCard({
  cert,
  index,
}: {
  cert: Certificate;
  index: number;
}) {
  return (
    <motion.a
      href={cert.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative block overflow-hidden rounded-[24px] border"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.32)",
      }}
    >
      {/* Certificate preview — deliberately cropped so only the top portion
          of the certificate peeks out, with a fade into the card body. */}
      <div className="relative h-[210px] overflow-hidden sm:h-[240px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.src}
          alt={cert.alt}
          draggable={false}
          className="w-full select-none object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ height: "100%" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(to top, var(--surface), transparent)",
          }}
        />
      </div>

      <div className="relative flex items-end justify-between gap-4 p-6 pt-2">
        <div className="min-w-0">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--subtle-foreground)" }}
          >
            {cert.issuer}
          </p>
          <h3
            className="mt-2 truncate text-[19px] font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {cert.title}
          </h3>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {cert.meta}
          </p>
        </div>

        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-1"
          style={{
            borderColor: "var(--border-strong)",
            color: "var(--foreground)",
            background: "rgba(var(--hairline-rgb), 0.04)",
          }}
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]"
      style={{ background: "var(--background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <h2
          className="mt-3 text-[32px] sm:text-[40px]"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 400,
            color: "var(--foreground)",
          }}
        >
          Credentials &amp; continued learning
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CERTIFICATES.map((cert, i) => (
          <CertificateCard key={cert.src} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
