"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  href?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Degrees the first neighbour tilts. */
  rotate?: number;
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number;
  /** Viewer distance as a multiple of card width — smaller is a wider lens. */
  perspective?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string;
  /** Space between cards, as a fraction of card width. */
  gap?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  autoAdvance = false,
  intervalMs = 1800,
  pauseOnHover = true,
  showPagination = false,
  showNavigation = false,
  label = "Cover carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;
  // Folding to "the shorter way round" is ambiguous with two cards (both
  // directions are one step), which stacks them instead of splitting them.
  const canLoop = loop && count > 2;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(0);
  /** Where the current settle is headed. Stepping off `pos` instead would
      swallow a keypress that lands mid-flight, before the round-off moves. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Paint straight to the DOM. Sixty state updates a second would re-render
  // every card for numbers React never needs to see.
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Fold the distance into the shorter way round the ring. This is the
      // whole looping mechanism — no cloned nodes, no shuffling the DOM.
      let offset = index - pos;
      if (canLoop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // Both the tilt and the recession ease off as cards travel out —
      // doubling the distance adds only about half again as much of each.
      // A linear ramp folds the second card straight into the first.
      const eased = Math.pow(distance, falloff);
      const direction = offset === 0 ? 0 : offset > 0 ? 1 : -1;

      const x = offset * pitch;
      const z = -eased * depth * width;
      const rotateY = -direction * eased * rotate;

      card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`;
      card.style.opacity = String(Math.max(0, 1 - distance * fade));
      // Nearer cards must paint over farther ones; z-index can't be fractional.
      card.style.zIndex = String(count - Math.round(distance));
      card.style.pointerEvents = distance < 0.5 ? "auto" : "none";
    });
  }, [canLoop, count, depth, fade, falloff, gap, rotate]);

  /** Ease `pos` toward `target`, painting each frame. */
  const settle = React.useCallback(() => {
    if (rafRef.current !== null) return;

    const step = () => {
      const delta = targetRef.current - posRef.current;

      if (Math.abs(delta) < 0.0005) {
        posRef.current = targetRef.current;
        paint();
        rafRef.current = null;
        setSelected(indexAt(posRef.current));
        return;
      }

      posRef.current += delta * 0.16;
      paint();
      setSelected(indexAt(posRef.current));
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, [indexAt, paint]);

  /** Move by whole cards, relative to where we're already headed. */
  const step = React.useCallback(
    (delta: number) => {
      const next = Math.round(targetRef.current) + delta;
      targetRef.current = canLoop
        ? next
        : Math.max(0, Math.min(count - 1, next));
      settle();
    },
    [canLoop, count, settle],
  );

  const goTo = React.useCallback(
    (index: number) => {
      if (canLoop) {
        // Travel the short way round rather than unwinding the whole ring.
        const current = Math.round(targetRef.current);
        let diff = (((index - indexAt(current)) % count) + count) % count;
        if (diff > count / 2) diff -= count;
        targetRef.current = current + diff;
      } else {
        targetRef.current = Math.max(0, Math.min(count - 1, index));
      }
      settle();
    },
    [canLoop, count, indexAt, settle],
  );

  // Measure a card, then paint. Re-measure whenever the frame resizes so the
  // rake stays proportional to whatever `cardWidth` resolves to.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    const first = cardRefs.current[0];
    if (!frame || !first) return;

    const measure = () => {
      widthRef.current = first.offsetWidth;
      paint();
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(first);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(() => {
    if (!autoAdvance || count <= 1 || (pauseOnHover && hovering)) return;

    const id = window.setInterval(
      () => {
        step(1);
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [autoAdvance, count, hovering, intervalMs, pauseOnHover, step]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Let real clicks through on links; only start a drag from the surface.
    if (event.button !== 0) return;
    const frame = frameRef.current;
    if (!frame) return;

    frame.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const width = widthRef.current;
    if (!drag || drag.id !== event.pointerId || !width) return;

    const pitch = width * (1 + gap);
    const dx = event.clientX - drag.x;
    const next = drag.pos - dx / pitch;

    const now = performance.now();
    const dt = now - drag.t;
    if (dt > 0) drag.v = (next - posRef.current) / dt;
    drag.t = now;

    posRef.current = canLoop ? next : Math.max(0, Math.min(count - 1, next));
    paint();
    setSelected(indexAt(posRef.current));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;

    // Carry the throw a little past where the finger left off.
    const projected = posRef.current + drag.v * 90;
    const landed = Math.round(projected);
    targetRef.current = canLoop
      ? landed
      : Math.max(0, Math.min(count - 1, landed));
    settle();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  if (count === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={frameRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        // overflow-hidden is required, not cosmetic: neighbours are translated
        // well past the centre by design, so without clipping they push the
        // page into horizontal scroll on narrow viewports.
        className="relative mx-auto flex touch-pan-y select-none items-center justify-center overflow-hidden outline-none"
        style={{
          height: `calc(${cardWidth} * 0.78)`,
          perspective: `calc(${cardWidth} * ${perspective})`,
        }}
      >
        {slides.map((slide, index) => {
          const card = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt="gallary carousal"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </>
          );

          return (
            <div
              key={`${slide.src}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="absolute will-change-transform"
              style={{
                width: cardWidth,
                height: `calc(${cardWidth} * 0.7)`,
                transformStyle: "preserve-3d",
              }}
            >
              {slide.href ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noreferrer"
                  // Don't let a drag that ends on the card fire a navigation.
                  onClick={(e) => {
                    if (dragRef.current) e.preventDefault();
                  }}
                  className={cn(
                    "relative block h-full w-full overflow-hidden rounded-xl border shadow-2xl",
                    cardClassName,
                  )}
                  style={{
                    borderColor: "var(--border-strong)",
                    background: "var(--surface)",
                  }}
                >
                  {card}
                </a>
              ) : (
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-xl border shadow-2xl",
                    cardClassName,
                  )}
                  style={{
                    borderColor: "var(--border-strong)",
                    background: "var(--surface)",
                  }}
                >
                  {card}
                </div>
              )}
            </div>
          );
        })}

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => step(-1)}
              className="absolute left-2 z-[999] flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-colors"
              style={{
                borderColor: "var(--border-strong)",
                background: "rgba(var(--hairline-rgb), 0.06)",
                color: "var(--foreground)",
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => step(1)}
              className="absolute right-2 z-[999] flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-colors"
              style={{
                borderColor: "var(--border-strong)",
                background: "rgba(var(--hairline-rgb), 0.06)",
                color: "var(--foreground)",
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {showPagination && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={`dot-${slide.src}-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className="h-2 w-2 rounded-full transition-opacity"
              style={{
                background: "var(--foreground)",
                opacity: index === selected ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CoverflowCarousel;
