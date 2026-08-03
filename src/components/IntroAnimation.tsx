"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { RevealContext } from "@/lib/reveal-context";

const MONOLOGUE =
  "Loading Abhishek Devkar's portfolio — a UI/UX Designer with 3+ years crafting enterprise SaaS platforms, government digital services, HRMS systems, fintech products, and AI-powered experiences.";

const LOADING_MESSAGES = [
  "Initializing Components...",
  "Loading Design System...",
  "Rendering Case Studies...",
  "Preparing Interactions...",
  "Optimizing Experience...",
];

const PROGRESS_STOPS = [15, 32, 54, 78, 100];

const CHECKLIST_ITEMS = [
  "Loading Projects",
  "Loading Case Studies",
  "Preparing Design System",
  "Rendering Interactions",
  "Connecting Experience",
  "Portfolio Ready",
  "Sequence Complete",
];

const CHECKLIST_STEP = 0.3;
const CHECKLIST_ITEM_FADE = 0.3;

const TYPING_START_MS = 1700;
const CHAR_DELAY_MIN = 38;
const CHAR_DELAY_RANGE = 10; // 38-48ms per character
const COMMA_PAUSE = 140;
const SENTENCE_PAUSE = 280;

// Estimate total typing time so the rest of the sequence waits for the
// monologue to actually finish instead of cutting it off on a fixed clock.
function estimateTypingMs(text: string) {
  const avgCharDelay = CHAR_DELAY_MIN + CHAR_DELAY_RANGE / 2;
  let extra = 0;
  for (const ch of text) {
    if (ch === ",") extra += COMMA_PAUSE;
    else if (ch === "." || ch === "!" || ch === "?") extra += SENTENCE_PAUSE;
  }
  return text.length * avgCharDelay + extra;
}

const SESSION_KEY = "introPlayed";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk)",
  fontSize: "12px",
  fontWeight: 500,
  letterSpacing: "0.30em",
  textTransform: "uppercase",
  color: "#9CA3AF",
  textAlign: "center",
};

const emphasisStyle: React.CSSProperties = {
  ...labelStyle,
  fontWeight: 600,
};

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<HTMLDivElement>(null);
  const monologueLabelRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const textNodeRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const checklistRef = useRef<HTMLDivElement>(null);
  const checklistItemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const progressScreenRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressPercentRef = useRef<HTMLSpanElement>(null);
  const progressMessageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "true";

    if (reducedMotion || alreadyPlayed) {
      setShowIntro(false);
      setRevealed(true);
      return;
    }

    setShowIntro(true);
    sessionStorage.setItem(SESSION_KEY, "true");
  }, []);

  useEffect(() => {
    if (showIntro !== true) return;

    const timers: number[] = [];
    const setT = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // Wait for the actual typed monologue to finish before moving on,
    // instead of cutting it off on a fixed clock.
    const typingDurationSec = estimateTypingMs(MONOLOGUE) / 1000;
    const readyAt = TYPING_START_MS / 1000 + typingDurationSec + 0.6;
    const monologueFadeAt = readyAt + 0.5;
    const CHECKLIST_START = monologueFadeAt + 0.3;
    const CHECKLIST_END =
      CHECKLIST_START + (CHECKLIST_ITEMS.length - 1) * CHECKLIST_STEP + CHECKLIST_ITEM_FADE;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // homeRef is animated exclusively by GSAP from here on; keep React's
      // rendered style out of the way so re-renders can't stomp mid-tween values
      tl.set(homeRef.current, { opacity: 0, filter: "blur(16px)", y: 20, scale: 0.98 }, 0);

      // 0.0s black screen -> 0.6s AI terminal boot header fades in
      tl.set(initRef.current, { opacity: 0 });
      tl.to(initRef.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.6);

      // 1.6s init header fades out, monologue fades in
      tl.to(initRef.current, { opacity: 0, duration: 0.25, ease: "power1.in" }, 1.6);
      tl.set(monologueLabelRef.current, { opacity: 0 }, 1.65);
      tl.to(
        monologueLabelRef.current,
        { opacity: 1, duration: 0.3, ease: "power1.out" },
        1.65
      );

      // cursor becomes visible as typing begins
      tl.set(cursorRef.current, { opacity: 1 }, 1.7);

      // Portfolio Ready confirmation under the paragraph, once typing is done
      tl.set(readyRef.current, { opacity: 0, y: 4 }, readyAt);
      tl.to(readyRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" }, readyAt);
      tl.to(cursorRef.current, { opacity: 0, duration: 0.15 }, readyAt);

      // fade out the AI monologue entirely
      tl.to(monologueLabelRef.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, monologueFadeAt);

      // AI checklist sequence: items fade in one after another
      tl.set(checklistRef.current, { opacity: 1 }, CHECKLIST_START);
      checklistItemRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: CHECKLIST_ITEM_FADE, ease: "power1.out" },
          CHECKLIST_START + i * CHECKLIST_STEP
        );
      });

      // brief pause, then fade out the checklist
      const checklistFadeOut = CHECKLIST_END + 0.5;
      tl.to(
        checklistRef.current,
        { opacity: 0, duration: 0.3, ease: "power1.in" },
        checklistFadeOut
      );

      // premium portfolio loading screen: progress bar + cycling messages
      const progressStart = checklistFadeOut + 0.3;
      tl.set(progressScreenRef.current, { opacity: 0, y: 8 }, progressStart);
      tl.to(
        progressScreenRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: "power1.out" },
        progressStart
      );

      const progressState = { value: 0 };
      let stopIndex = 0;
      const progressTweenStart = progressStart + 0.35;
      tl.to(
        progressState,
        {
          value: 100,
          duration: 1.75,
          ease: "power1.inOut",
          onUpdate: () => {
            const pct = Math.round(progressState.value);
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${pct}%`;
            }
            if (progressPercentRef.current) {
              progressPercentRef.current.textContent = `${pct}%`;
            }
            if (
              stopIndex < PROGRESS_STOPS.length - 1 &&
              progressState.value >= PROGRESS_STOPS[stopIndex] &&
              progressMessageRef.current
            ) {
              const msg = LOADING_MESSAGES[stopIndex] ?? LOADING_MESSAGES[LOADING_MESSAGES.length - 1];
              gsap.to(progressMessageRef.current, {
                opacity: 0,
                duration: 0.12,
                onComplete: () => {
                  if (progressMessageRef.current) {
                    progressMessageRef.current.textContent = msg;
                  }
                  gsap.to(progressMessageRef.current, { opacity: 1, duration: 0.15 });
                },
              });
              stopIndex += 1;
            }
          },
        },
        progressTweenStart
      );

      // progress complete, swap to green ready confirmation
      const progressDone = progressTweenStart + 1.75;
      tl.call(
        () => {
          if (progressMessageRef.current) {
            progressMessageRef.current.textContent = "✓ Portfolio Ready";
            progressMessageRef.current.style.color = "#4ADE80";
            progressMessageRef.current.style.fontWeight = "600";
          }
        },
        undefined,
        progressDone
      );

      // pause ~0.5s, then begin the cinematic reveal
      const revealAt = progressDone + 0.5;
      tl.call(() => setRevealed(true), undefined, revealAt);

      tl.to(rootRef.current, { opacity: 0, duration: 1, ease: "power2.inOut" }, revealAt);
      tl.to(
        homeRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        revealAt
      );

      tl.call(() => setShowIntro(false), undefined, revealAt + 1);
    }, rootRef);

    // Human-like character typing, starts at 1.7s
    setT(() => {
      if (!textNodeRef.current) return;
      let i = 0;

      const typeNext = () => {
        if (!textNodeRef.current) return;
        i += 1;
        textNodeRef.current.textContent = MONOLOGUE.slice(0, i);

        if (i >= MONOLOGUE.length) return;

        const lastChar = MONOLOGUE[i - 1];
        let delay = CHAR_DELAY_MIN + Math.random() * CHAR_DELAY_RANGE;
        if (lastChar === ",") delay += COMMA_PAUSE;
        else if (lastChar === "." || lastChar === "!" || lastChar === "?") delay += SENTENCE_PAUSE;

        setT(typeNext, delay);
      };

      typeNext();
    }, TYPING_START_MS);

    return () => {
      timers.forEach((id) => clearTimeout(id));
      ctx.revert();
    };
  }, [showIntro]);

  if (showIntro === null) {
    return <div className="min-h-full" style={{ background: "#050505" }} />;
  }

  return (
    <RevealContext.Provider value={revealed}>
      {showIntro && (
        <div
          ref={rootRef}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "#050505" }}
        >
          <div className="w-full flex justify-center">
            <div ref={initRef} className="opacity-0 absolute flex items-center gap-3">
              <span className="init-square" aria-hidden="true" />
              <span style={labelStyle}>INITIALIZING AI PORTFOLIO ENGINE...</span>
            </div>

            <div
              ref={monologueLabelRef}
              className="opacity-0 intro-content flex flex-col items-center"
            >
              <div style={{ ...labelStyle, marginBottom: "22px" }}>
                INTERNAL MONOLOGUE
              </div>

              <p
                ref={paragraphRef}
                className="intro-paragraph"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 400,
                  color: "#F5F5F5",
                }}
              >
                <span ref={textNodeRef} />
                <span ref={cursorRef} style={{ opacity: 0 }} aria-hidden="true">
                  <span className="intro-cursor" />
                </span>
              </p>

              <div ref={readyRef} className="opacity-0" style={{ ...emphasisStyle, marginTop: "26px" }}>
                ✓ Portfolio Ready
              </div>
            </div>

            <div
              ref={checklistRef}
              className="opacity-0 absolute flex flex-col items-center gap-3"
            >
              {CHECKLIST_ITEMS.map((item, i) => {
                const isEmphasis =
                  item === "Portfolio Ready" || item === "Sequence Complete";
                return (
                  <div
                    key={item}
                    ref={(el) => {
                      checklistItemRefs.current[i] = el;
                    }}
                    className="opacity-0 flex items-center gap-2.5"
                    style={isEmphasis ? emphasisStyle : labelStyle}
                  >
                    <span style={{ color: "#4ADE80" }}>✓</span>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>

            <div
              ref={progressScreenRef}
              className="opacity-0 absolute flex flex-col items-center"
              style={{ width: "min(360px, 80vw)" }}
            >
              <span style={{ ...labelStyle, marginBottom: "22px" }}>
                LOADING PORTFOLIO
              </span>

              <div
                className="w-full overflow-hidden rounded-full"
                style={{ height: "3px", background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  ref={progressFillRef}
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background: "linear-gradient(90deg, #6EA8FE, #A7C9FF)",
                  }}
                />
              </div>

              <div className="mt-3 flex w-full items-center justify-center gap-3">
                <span
                  ref={progressMessageRef}
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#9CA3AF",
                  }}
                >
                  Initializing Components...
                </span>
                <span
                  ref={progressPercentRef}
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#6EA8FE",
                  }}
                >
                  0%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={homeRef} style={showIntro === true ? undefined : { opacity: 1 }}>
        {children}
      </div>
    </RevealContext.Provider>
  );
}
