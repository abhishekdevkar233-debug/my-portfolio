"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LAYERS = [
  { layer: "back", yPercent: 16 },
  { layer: "front", yPercent: -8 },
];

/**
 * Attaches a scroll-scrubbed parallax to [data-parallax-layer] children of
 * containerRef, so each layer drifts at a different speed as the card
 * passes through the viewport. Also scrubs a subtle scale/tilt-in on
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

    const tweens = LAYERS.map(({ layer, yPercent }) =>
      gsap.to(container.querySelectorAll(`[data-parallax-layer="${layer}"]`), {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
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
            },
          }
        )
      : null;

    return () => {
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
