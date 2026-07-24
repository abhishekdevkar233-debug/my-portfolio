"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Pixel-based (not yPercent) so the drift is a fixed, clearly visible
// distance regardless of how tall a given card's layer happens to be.
const LAYERS = [
  { layer: "back", y: 90 },
  { layer: "front", y: -50 },
];

/**
 * Attaches a scroll-scrubbed parallax to [data-parallax-layer] children of
 * containerRef, so each layer drifts a different fixed distance (and
 * direction) as the card passes through the viewport. Also scrubs a subtle
 * scale/tilt-in on
 * tiltRef as it enters, tied directly to scroll position (not a one-time
 * entrance) so it reverses cleanly if the user scrolls back up.
 *
 * tiltRef must be a plain (non-Framer-Motion-animated) element: GSAP writes
 * `transform` directly, and sharing that element with Framer Motion's own
 * transform writes (e.g. whileHover) causes the two to stomp each other.
 */
export function useCardParallax<
  C extends HTMLElement,
  I extends HTMLElement,
>(tilt: number = 0) {
  const containerRef = useRef<C>(null);
  const tiltRef = useRef<I>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tiltEl = tiltRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!container || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const tweens = LAYERS.map(({ layer, y }) =>
      gsap.to(container.querySelectorAll(`[data-parallax-layer="${layer}"]`), {
        y,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
    );

    const entranceTween = tiltEl
      ? gsap.fromTo(
          tiltEl,
          { scale: 0.94, rotateZ: tilt },
          {
            scale: 1,
            rotateZ: 0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              end: "top 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        )
      : null;

    // Measurements taken at mount can be stale (fonts/images still settling
    // layout), which freezes the scrubbed offset at whatever it computed
    // initially instead of tracking real scroll position. Re-measure once
    // the page has fully loaded, and again on resize.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    const refreshTimeout = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      window.clearTimeout(refreshTimeout);
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      entranceTween?.scrollTrigger?.kill();
      entranceTween?.kill();
    };
  }, [tilt]);

  return { containerRef, tiltRef };
}
