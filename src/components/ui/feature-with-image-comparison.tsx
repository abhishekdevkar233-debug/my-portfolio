"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

export interface FeatureProps {
  badge?: string;
  title?: string;
  description?: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  /** Labels shown in the corners so it's clear which side is which. */
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

function Feature({
  badge = "Platform",
  title = "Something new!",
  description = "Managing a small business today is already tough.",
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeLabel,
  afterLabel,
  className,
}: FeatureProps) {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    // Clamp: dragging past either edge otherwise yields <0 / >100, which
    // pushes the handle outside the frame and inverts the clip.
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  // Drag-only would leave this unusable by keyboard, so mirror it on arrows.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setInset((v) => Math.max(0, v - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setInset((v) => Math.min(100, v + 5));
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-4">
        <div>
          <Badge>{badge}</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2
            className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h2>
          <p
            className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight"
            style={{ color: "var(--muted-foreground)" }}
          >
            {description}
          </p>
        </div>
        <div className="pt-12 w-full">
          <div
            className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
            onMouseMove={onMouseMove}
            onMouseUp={() => setOnMouseDown(false)}
            onMouseLeave={() => setOnMouseDown(false)}
            onTouchMove={onMouseMove}
            onTouchEnd={() => setOnMouseDown(false)}
          >
            <div
              className="bg-muted h-full w-1 absolute z-20 top-0 -ml-1 select-none"
              style={{ left: inset + "%", background: "var(--foreground)" }}
            >
              <button
                type="button"
                role="slider"
                aria-label="Compare before and after"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(inset)}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                }}
                onTouchStart={(e) => {
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onMouseDown={(e) => {
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onTouchEnd={() => setOnMouseDown(false)}
                onMouseUp={() => setOnMouseDown(false)}
              >
                <GripVertical className="h-4 w-4 select-none" />
              </button>
            </div>

            <Image
              src={beforeSrc}
              alt={beforeAlt}
              width={1920}
              height={1080}
              priority
              unoptimized
              className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border object-cover"
              style={{
                clipPath: "inset(0 0 0 " + inset + "%)",
                borderColor: "var(--border)",
              }}
            />
            <Image
              src={afterSrc}
              alt={afterAlt}
              width={1920}
              height={1080}
              priority
              unoptimized
              className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border object-cover"
              style={{ borderColor: "var(--border)" }}
            />

            {afterLabel && (
              <span
                className="pointer-events-none absolute left-4 top-4 z-[25] rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                }}
              >
                {afterLabel}
              </span>
            )}
            {beforeLabel && (
              <span
                className="pointer-events-none absolute right-4 top-4 z-[25] rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                }}
              >
                {beforeLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
export default Feature;
