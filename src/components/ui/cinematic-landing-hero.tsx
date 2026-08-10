// src/components/ui/cinematic-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */

  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: radial-gradient(
          600px circle at var(--mx, 50%) var(--my, 0%),
          rgba(255, 255, 255, 0.10),
          transparent 60%
      );
      transition: opacity 0.4s ease;
  }

  @media (prefers-reduced-motion: reduce) {
      .gsap-reveal { visibility: visible !important; }
      .film-grain { display: none; }
  }
`;

export interface CinematicHeroProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  cardTitle?: string;
  cardBody?: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export function CinematicHero({
  eyebrow = "Case Study",
  title = "Designed for",
  highlight = "everyone",
  description,
  cardTitle,
  cardBody,
  stats = [],
  className,
}: CinematicHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(root.querySelectorAll(".gsap-reveal"), {
        visibility: "visible",
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);

    // Fail-safe: `.gsap-reveal` starts at visibility:hidden, so if ScrollTrigger
    // never fires (script error, throttled rAF, trigger already scrolled past)
    // the copy would stay permanently invisible. Force anything still hidden
    // into view rather than silently losing the content.
    const failSafe = window.setTimeout(() => {
      root.querySelectorAll<HTMLElement>(".gsap-reveal").forEach((el) => {
        if (getComputedStyle(el).visibility === "hidden") {
          gsap.set(el, { visibility: "visible", opacity: 1, y: 0 });
        }
      });
    }, 1500);

    return () => {
      window.clearTimeout(failSafe);
      ctx.revert();
    };
  }, []);

  // Drive the sheen from the pointer, in CSS custom properties so the paint
  // stays on the compositor instead of re-rendering React each move.
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="bg-grid-theme pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:py-28">
        <p
          className="gsap-reveal text-[12px] font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          {eyebrow}
        </p>

        <h2 className="gsap-reveal mt-5 text-4xl leading-[1.05] sm:text-6xl">
          <span className="text-3d-matte">{title} </span>
          <span className="text-silver-matte">{highlight}</span>
        </h2>

        {description && (
          <p
            className="gsap-reveal mt-6 max-w-2xl text-[16px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {description}
          </p>
        )}

        {(cardTitle || cardBody || stats.length > 0) && (
          <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            className="premium-depth-card gsap-reveal mt-14 rounded-[28px] p-10 sm:p-14"
          >
            <div className="card-sheen" aria-hidden="true" />

            <div className="relative z-10">
              {cardTitle && (
                <h3 className="text-card-silver-matte text-3xl sm:text-4xl">
                  {cardTitle}
                </h3>
              )}
              {cardBody && (
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-300/80">
                  {cardBody}
                </p>
              )}

              {stats.length > 0 && (
                <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400/80">
                        {stat.label}
                      </dt>
                      <dd className="text-card-silver-matte mt-2 text-3xl font-semibold">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CinematicHero;
