const WORDS = [
  "FIGMA",
  "UX",
  "DESIGN SYSTEM",
  "AI",
  "PROTOTYPING",
  "PRODUCT DESIGN",
  "RESEARCH",
  "INTERACTION DESIGN",
];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];

  return (
    <section
      className="overflow-hidden border-y py-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-[var(--font-instrument-serif)] text-3xl sm:text-4xl"
            style={{ color: "rgba(var(--hairline-rgb), 0.18)" }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
