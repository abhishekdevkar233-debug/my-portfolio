"use client";

import KineticGrid from "@/components/ui/kinetic-grid";
import DragTagCloud from "@/components/ui/drag-tag-cloud";

export default function KineticGridBanner() {
  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <KineticGrid className="h-full" globalColor="default">
        <div className="flex h-full items-center justify-center px-6 py-10">
          <div className="w-full max-w-[1180px]">
            <DragTagCloud />
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}
