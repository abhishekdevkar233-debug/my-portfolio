"use client";

import KineticGrid from "@/components/ui/kinetic-grid";

export default function KineticGridBanner() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <KineticGrid className="h-full" globalColor="default">
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <span
            className="mb-5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide"
            style={{ borderColor: "var(--border-strong)", color: "var(--muted-foreground)" }}
          >
            Interactive Background
          </span>
          <h2
            className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl"
            style={{ color: "var(--foreground)" }}
          >
            Move your cursor. Click anywhere.
          </h2>
          <p
            className="mt-4 max-w-md text-base"
            style={{ color: "var(--muted-foreground)" }}
          >
            A kinetic grid that warps toward the pointer and ripples on every
            click.
          </p>
        </div>
      </KineticGrid>
    </section>
  );
}
