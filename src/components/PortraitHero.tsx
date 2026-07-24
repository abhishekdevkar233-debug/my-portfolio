"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useReveal } from "@/lib/reveal-context";
import KineticGrid from "@/components/ui/kinetic-grid";

const ROLES = [
  "UI/UX Designer",
  "Graphics Designer",
  "Video Editor",
  "Frontend Developer",
];

const PARTICLES = [
  { top: "12%", left: "8%", size: 3, delay: 0 },
  { top: "22%", left: "88%", size: 2, delay: 1.2 },
  { top: "68%", left: "14%", size: 2, delay: 2.4 },
  { top: "78%", left: "80%", size: 3, delay: 0.8 },
  { top: "40%", left: "92%", size: 2, delay: 3.1 },
  { top: "55%", left: "5%", size: 2, delay: 1.8 },
];

export default function PortraitHero() {
  const revealed = useReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing"
  );

  const typedText = ROLES[roleIndex].slice(0, charCount);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setCharCount(ROLES[0].length);
      return;
    }

    const current = ROLES[roleIndex];
    let timeoutId: number;

    if (phase === "typing") {
      if (charCount < current.length) {
        timeoutId = window.setTimeout(() => {
          setCharCount((c) => c + 1);
        }, 65);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeoutId = window.setTimeout(() => {
        setPhase("deleting");
      }, 1400);
    } else {
      if (charCount > 0) {
        timeoutId = window.setTimeout(() => {
          setCharCount((c) => c - 1);
        }, 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [phase, charCount, roleIndex]);

  useEffect(() => {
    if (!revealed || hasAnimated.current) return;
    hasAnimated.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      gsap.set(entranceRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(100%)",
      });
      gsap.set(spotlightRef.current, { opacity: 1 });
      gsap.set(rimRef.current, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      entranceRef.current,
      { opacity: 0, scale: 0.94, filter: "blur(12px) brightness(60%)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(100%)",
        duration: 1.2,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      0
    );

    tl.fromTo(
      spotlightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power1.out" },
      0.15
    );

    tl.fromTo(
      rimRef.current,
      { opacity: 0.4 },
      { opacity: 1, duration: 0.6, ease: "power1.out" },
      0.5
    );

    if (floatRef.current) {
      tl.call(() => floatRef.current?.classList.add("portrait-float"), undefined, 1.2);
    }
  }, [revealed]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.1 + i * 0.12,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative flex flex-col items-center overflow-hidden px-6 pb-0 pt-10 text-center sm:px-10"
      style={{ background: "var(--background)" }}
    >
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(110,168,254,0.05), transparent 55%)",
          }}
        />
        <div className="hero-grain" />
        <div className="absolute inset-0">
          <KineticGrid className="h-full" globalColor="monochrome" />
        </div>
        <div className="hero-vignette" />
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(var(--hairline-rgb), 0.35)",
              filter: "blur(1px)",
            }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <motion.h1
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        className="mt-6 text-[34px] leading-[1.1] tracking-tight sm:text-[44px] lg:text-[52px]"
        style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)", fontWeight: 400 }}
      >
        Hi, I&apos;m{" "}
        <span style={{ fontWeight: 600 }}>Abhishek Devkar</span>
      </motion.h1>

      <motion.p
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        className="mt-2 flex items-center justify-center text-[26px] leading-[1.1] sm:text-[34px] lg:text-[40px]"
        style={{ color: "var(--foreground)", height: "1.2em" }}
      >
        <span style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 500 }}>
          {typedText}
        </span>
        <span className="role-cursor" aria-hidden="true" />
      </motion.p>

      {/* portrait */}
      <div
        className="relative mx-auto -mt-2 mb-0 w-full max-w-[520px] flex-1 self-stretch sm:max-w-[620px] lg:max-w-[720px]"
        style={{ perspective: 1200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      >
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute left-1/2 top-[30%] -z-10 opacity-0"
          style={{
            width: "560px",
            height: "560px",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "rgba(var(--hairline-rgb), 0.18)",
            filter: "blur(120px)",
          }}
        />

        <div ref={floatRef} style={{ willChange: "transform", width: "100%" }}>
          <div style={{ transformStyle: "preserve-3d" }}>
            <div
              ref={entranceRef}
              style={{
                opacity: 0,
                transform: "scale(0.94)",
                filter: "blur(12px) brightness(60%)",
                willChange: "opacity, transform, filter",
              }}
            >
              <div ref={rimRef} className="relative opacity-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/portrait.svg"
                  alt="Abhishek Devkar"
                  className="relative mx-auto block w-full select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
