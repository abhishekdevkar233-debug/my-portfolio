"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImageItem {
  src: string;
  alt: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  /** Width of the centre phone in px. Everything scales from it. */
  phoneWidth?: number;
  className?: string;
  label?: string;
}

/**
 * A carousel of screenshots presented inside iPhone-style device frames.
 * Neighbours sit behind the active phone, scaled down and offset.
 *
 * Motion is CSS-transition based (not a rAF loop) so it stays smooth and
 * keeps working even where animation frames are throttled.
 */
export function PhoneCarousel({
  images,
  phoneWidth = 260,
  className,
  label = "Screenshots",
}: PhoneCarouselProps) {
  const count = images.length;
  const [active, setActive] = React.useState(0);

  const go = React.useCallback(
    (delta: number) => setActive((a) => ((a + delta) % count + count) % count),
    [count],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  if (count === 0) return null;

  const phoneHeight = Math.round(phoneWidth * 2.03); // iPhone ~19.5:9

  return (
    <div className={cn("w-full", className)}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative flex w-full items-center justify-center overflow-hidden outline-none"
        style={{ height: phoneHeight + 80 }}
      >
        {images.map((image, index) => {
          // Shortest signed distance round the ring.
          let offset = index - active;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const distance = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <div
              key={image.src + index}
              aria-hidden={!isActive}
              className="absolute transition-all duration-500 ease-out"
              style={{
                width: phoneWidth,
                height: phoneHeight,
                transform: `translateX(${offset * phoneWidth * 0.62}px) scale(${
                  isActive ? 1 : 0.82 - (distance - 1) * 0.06
                })`,
                opacity: distance > 2 ? 0 : isActive ? 1 : 0.55,
                zIndex: count - distance,
                pointerEvents: isActive ? "auto" : "none",
                filter: isActive ? "none" : "blur(1px)",
              }}
            >
              {/* Device frame */}
              <div
                className="relative h-full w-full overflow-hidden rounded-[2.2rem] border-[6px]"
                style={{
                  borderColor: "#1c1c1e",
                  background: "#000",
                  boxShadow: isActive
                    ? "0 30px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : "0 16px 40px rgba(0,0,0,0.4)",
                }}
              >
                {/* Dynamic-island style notch */}
                <div
                  className="absolute left-1/2 top-2 z-20 h-[18px] w-[86px] -translate-x-1/2 rounded-full"
                  style={{ background: "#1c1c1e" }}
                  aria-hidden="true"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </div>
            </div>
          );
        })}

        {count > 1 && (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous screenshot"
              onClick={() => go(-1)}
              className="absolute left-2 z-[999] rounded-full sm:left-8"
              style={{
                borderColor: "var(--border-strong)",
                background: "rgba(var(--hairline-rgb), 0.06)",
                color: "var(--foreground)",
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next screenshot"
              onClick={() => go(1)}
              className="absolute right-2 z-[999] rounded-full sm:right-8"
              style={{
                borderColor: "var(--border-strong)",
                background: "rgba(var(--hairline-rgb), 0.06)",
                color: "var(--foreground)",
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`dot-${image.src}-${index}`}
              type="button"
              aria-label={`Go to screenshot ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className="h-2 w-2 rounded-full transition-opacity"
              style={{
                background: "var(--foreground)",
                opacity: index === active ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhoneCarousel;
