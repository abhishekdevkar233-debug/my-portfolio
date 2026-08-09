"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveProjectsModal from "./LiveProjectsModal";

interface QuickAccessItem {
  id: string;
  label: string;
  bg: string;
  logo: string;
  onClick: () => void;
}

function QuickAccessCard({ item }: { item: QuickAccessItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium"
            style={{ background: "rgba(20,20,22,0.95)", color: "#F5F5F5" }}
          >
            {item.label}
            <span
              className="absolute left-1/2 top-full -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "4px solid rgba(20,20,22,0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={item.onClick}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex h-11 w-11 items-center justify-center rounded-xl p-2.5"
        style={{
          background: item.bg,
          boxShadow: hovered
            ? "0 8px 20px rgba(0,0,0,0.35)"
            : "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.logo}
          alt={item.label}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </motion.button>

      <span
        className="max-w-[64px] text-center text-[11px] leading-tight"
        style={{ color: "#C7C7CC" }}
      >
        {item.label}
      </span>
    </div>
  );
}

export default function SafariWindow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [liveProjectsOpen, setLiveProjectsOpen] = useState(false);

  if (!open) return null;

  const QUICK_ACCESS: QuickAccessItem[] = [
    {
      id: "linkedin",
      label: "LinkedIn",
      bg: "#fff",
      logo: "/logos/linkedin.svg",
      onClick: () =>
        window.open(
          "https://www.linkedin.com/in/abhishek-devkar-557501231?utm_source=share_via&utm_content=profile&utm_medium=member_android",
          "_blank",
        ),
    },
    {
      id: "behance",
      label: "Behance",
      bg: "#0057ff",
      logo: "/logos/behance.svg",
      onClick: () =>
        window.open("https://www.behance.net/abhishekdevkar1", "_blank"),
    },
    {
      id: "resume",
      label: "Download Resume",
      bg: "#fff",
      logo: "/logos/pdf.svg",
      onClick: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Abhishek_Devkar_Resume.pdf";
        a.click();
      },
    },
    {
      id: "mail",
      label: "Mail",
      bg: "#fff",
      logo: "/logos/gmail.svg",
      onClick: () => {
        window.location.href =
          "mailto:abhishekdevkar8032@gmail.com?subject=Let's%20connect";
      },
    },
    {
      id: "github",
      label: "GitHub",
      bg: "#111",
      logo: "/logos/github.svg",
      onClick: () => window.open("#", "_blank"),
    },
    {
      id: "live-projects",
      label: "Live Projects",
      bg: "#111",
      logo: "/logos/vercel.svg",
      onClick: () => setLiveProjectsOpen(true),
    },
  ];

  return (
    <>
      <div className="absolute inset-x-0 bottom-28 top-12 z-40 flex items-center justify-center px-10 sm:px-16">
        <div
          className="flex max-h-[78%] w-full max-w-[420px] flex-col overflow-hidden rounded-xl border sm:max-w-[480px]"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            background: "#1c1c1e",
            boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
          }}
        >
          {/* title bar */}
          <div
            className="flex shrink-0 items-center gap-3 px-3 py-2"
            style={{
              background: "rgba(40,40,42,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="group flex items-center gap-1.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-3 w-3 items-center justify-center rounded-full text-[7px] font-bold leading-none text-[#4d0000]"
                style={{ background: "#FF5F57" }}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  ✕
                </span>
              </button>
              <button
                type="button"
                aria-label="Minimize"
                className="flex h-3 w-3 items-center justify-center rounded-full text-[7px] font-bold leading-none text-[#5c4600]"
                style={{ background: "#FEBC2E" }}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  −
                </span>
              </button>
              <button
                type="button"
                aria-label="Zoom"
                className="flex h-3 w-3 items-center justify-center rounded-full"
                style={{ background: "#28C840" }}
              >
                <svg
                  viewBox="0 0 10 10"
                  className="h-[7px] w-[7px] opacity-0 transition-opacity group-hover:opacity-100"
                  fill="#003b00"
                >
                  <path d="M1 5.5 5.5 1H2a1 1 0 0 0-1 1v3.5Z" />
                  <path d="M9 4.5 4.5 9H8a1 1 0 0 0 1-1V4.5Z" />
                </svg>
              </button>
            </div>

            <div
              className="mx-auto flex w-full max-w-sm items-center justify-center gap-2 rounded-md px-3 py-1 text-[12px]"
              style={{ background: "rgba(255,255,255,0.08)", color: "#8E8E93" }}
            >
              Search or enter website name
            </div>

            <div className="w-10" />
          </div>

          {/* start page content */}
          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-5 sm:px-12">
            <div className="mx-auto max-w-lg">
              <h3
                className="text-[10px] font-semibold uppercase tracking-wide"
                style={{ color: "#8E8E93" }}
              >
                Quick Access
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-5">
                {QUICK_ACCESS.map((item) => (
                  <QuickAccessCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveProjectsModal
        open={liveProjectsOpen}
        onClose={() => setLiveProjectsOpen(false)}
      />
    </>
  );
}
