"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export function ParallaxHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector(
      "[data-parallax-layers]"
    );

    let lenis: Lenis | undefined;
    const tickerFn = (time: number) => lenis?.raf(time * 1000);

    if (triggerElement && !reducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 40 },
        { layer: "2", yPercent: 25 },
        { layer: "3", yPercent: 10 },
        { layer: "4", yPercent: -10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });

      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, []);

  return (
    <section id="work" className="parallax" ref={parallaxRef}>
      <div className="parallax__header">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            <div data-parallax-layer="1" className="parallax__glow parallax__glow--a" />
            <div data-parallax-layer="1" className="parallax__glow parallax__glow--b" />

            <div data-parallax-layer="2" className="parallax__portrait-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.svg"
                alt="Abhishek Devkar"
                className="parallax__portrait"
                draggable={false}
              />
            </div>

            <div data-parallax-layer="3" className="parallax__layer-title">
              <h1 className="parallax__title">
                Abhishek <span className="parallax__title-accent">Devkar</span>
              </h1>
            </div>

            <div data-parallax-layer="4" className="parallax__layer-tag">
              <span className="parallax__tag">UI/UX Designer</span>
            </div>
          </div>
          <div className="parallax__fade" />
        </div>
      </div>
    </section>
  );
}
