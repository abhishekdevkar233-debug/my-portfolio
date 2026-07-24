"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useReveal } from "@/lib/reveal-context";

export default function Hero() {
  const revealed = useReveal();
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const NAV_OFFSET = 0.3;
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: NAV_OFFSET + 0.1 + i * 0.1,
      },
    }),
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-[-10%] h-[480px] w-[480px] rounded-full bg-[#6EA8FE]/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#6EA8FE]/[0.06] blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
            className="mb-6 text-[12px] font-medium uppercase tracking-[0.3em]"
            style={{ color: "#A8A8A8" }}
          >
            Hi, I&apos;m Abhishek Devkar
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
            className="max-w-2xl font-[var(--font-instrument-serif)] text-[42px] leading-[1.12] tracking-tight sm:text-[56px] lg:text-[64px]"
            style={{ color: "#F5F5F5" }}
          >
            Designing Digital Experiences That Feel Effortless.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
            className="mt-7 max-w-lg text-[16px] leading-relaxed"
            style={{ color: "#A8A8A8" }}
          >
            A UI/UX Designer specializing in Enterprise SaaS, Government
            Platforms, AI Products, and Design Systems.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work">View Projects</MagneticButton>
            <MagneticButton href="#resume" variant="secondary">
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: NAV_OFFSET + 0.25 }}
          className="relative mx-auto w-full max-w-md"
          style={{ perspective: 1000 }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <motion.div
            ref={cardRef}
            style={{
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(20,20,20,0.5)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            className="relative aspect-[9/16] w-full rounded-[2.2rem] border shadow-2xl shadow-black/50"
          >
            <div
              className="absolute inset-4 rounded-[1.6rem]"
              style={{
                background: "linear-gradient(160deg, #141414, #0E0E0E)",
              }}
            />

            <motion.div
              style={{
                transform: "translateZ(40px)",
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(20,20,20,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              className="absolute left-6 top-8 w-[70%] rounded-2xl border p-4 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-2 h-2 w-10 rounded-full bg-[#6EA8FE]/70" />
              <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="mt-1.5 h-1.5 w-3/4 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
            </motion.div>

            <motion.div
              style={{
                transform: "translateZ(60px)",
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(20,20,20,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              className="absolute bottom-10 right-6 w-[60%] rounded-2xl border p-4 shadow-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="mb-2 h-2 w-8 rounded-full bg-[#6EA8FE]/50" />
              <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
