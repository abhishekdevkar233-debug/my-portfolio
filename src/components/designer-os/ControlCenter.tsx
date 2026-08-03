"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Song } from "@/lib/designer-os-data";

function Chevron() {
  return (
    <svg viewBox="0 0 8 9" className="h-2 w-2 shrink-0" fill="none">
      <path
        d="M5.99 4.35c0-.17-.06-.32-.2-.45L2.14.4C2.03.28 1.9.22 1.74.22a.58.58 0 0 0-.58.58c0 .16.06.3.18.42l3.42 3.15-3.42 3.15a.61.61 0 0 0-.18.42c0 .33.25.58.58.58.16 0 .3-.06.4-.17L5.8 4.79c.14-.13.2-.28.2-.44Z"
        fill="#8E8E93"
      />
    </svg>
  );
}

function Row({
  icon,
  label,
  sublabel,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full flex-1 items-center gap-2 px-2.5 text-left transition-colors"
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{ background: active ? "#0A84FF" : "rgba(255,255,255,0.12)", color: active ? "#fff" : "#F5F5F5" }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[10.5px] font-medium leading-tight" style={{ color: "#F5F5F5" }}>
          {label}
        </span>
        <span className="block truncate text-[8.5px] leading-tight" style={{ color: "#8E8E93" }}>
          {sublabel}
        </span>
      </span>
      <Chevron />
    </button>
  );
}

function SquareTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex h-[42px] flex-1 flex-col items-center justify-center gap-1 rounded-xl"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center" style={{ color: "#F5F5F5" }}>
        {icon}
      </span>
      <span className="text-center text-[8px] leading-none" style={{ color: "#F5F5F5" }}>
        {label}
      </span>
    </div>
  );
}

export default function ControlCenter({
  onClose,
  song,
  playing,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  volume,
  onVolumeChange,
}: {
  onClose: () => void;
  song: Song;
  playing: boolean;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [display, setDisplay] = useState(80);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute right-3 top-10 z-50 w-[200px] rounded-2xl border p-[10px] sm:right-5"
        style={{
          borderColor: "rgba(255,255,255,0.16)",
          background: "rgba(60,60,62,0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex h-[90px] gap-1.5">
          <div className="flex flex-1 flex-col divide-y divide-white/10 overflow-hidden rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }}>
            <Row
              label="Wi-Fi"
              sublabel={wifi ? "My iPhone" : "Off"}
              active={wifi}
              onToggle={() => setWifi((v) => !v)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                  <path d="M2 8.82a15 15 0 0 1 20 0" />
                  <path d="M5 12.86a10 10 0 0 1 14 0" />
                  <path d="M8.5 16.4a5 5 0 0 1 7 0" />
                  <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                </svg>
              }
            />
            <Row
              label="Bluetooth"
              sublabel={bluetooth ? "On" : "Off"}
              active={bluetooth}
              onToggle={() => setBluetooth((v) => !v)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                  <path d="M6.5 6.5 17.5 17.5 12 23V1l5.5 5.5L6.5 17.5" />
                </svg>
              }
            />
            <Row
              label="AirDrop"
              sublabel={airdrop ? "Contacts Only" : "Off"}
              active={airdrop}
              onToggle={() => setAirdrop((v) => !v)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                  <path d="M12 3a9 9 0 0 0-6.3 15.4" />
                  <path d="M12 3a9 9 0 0 1 6.3 15.4" />
                  <circle cx="12" cy="14" r="3" />
                </svg>
              }
            />
          </div>

          <button
            type="button"
            onClick={() => setDnd((v) => !v)}
            className="flex w-[71px] flex-col items-start justify-between rounded-xl p-2"
            style={{ background: dnd ? "#5E5CE6" : "rgba(255,255,255,0.08)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={dnd ? "#fff" : "none"}
              stroke={dnd ? "#fff" : "currentColor"}
              strokeWidth="2"
              className="h-3.5 w-3.5"
              style={{ color: dnd ? "#fff" : "#F5F5F5" }}
            >
              <circle cx="12" cy="12" r="9" fill={dnd ? "#fff" : "none"} />
              <path d="M8 12h8" stroke={dnd ? "#5E5CE6" : "currentColor"} />
            </svg>
            <span className="text-left text-[8px] font-medium leading-tight" style={{ color: dnd ? "#fff" : "#F5F5F5" }}>
              Do Not Disturb
            </span>
          </button>
        </div>

        <div className="mt-1.5 flex gap-1.5">
          <SquareTile
            label="Keyboard Brightness"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
              </svg>
            }
          />
          <SquareTile
            label="Screen Mirroring"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            }
          />
        </div>

        <div className="mt-1.5 flex h-[42px] flex-col justify-center rounded-xl px-2.5" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: "#F5F5F5" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Display
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={display}
            onChange={(e) => setDisplay(Number(e.target.value))}
            className="mt-1 h-1 w-full accent-white"
          />
        </div>

        <div className="mt-1.5 flex h-[42px] items-center gap-2 rounded-xl px-2" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md"
            style={{ background: "linear-gradient(160deg, #A78BFA, #6EA8FE)" }}
          >
            <svg viewBox="0 0 24 24" fill="#fff" className="h-3 w-3">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 truncate text-[9px] font-semibold" style={{ color: "#F5F5F5" }}>
            {song.title}
          </div>
          <div className="flex shrink-0 items-center gap-2" style={{ color: "#F5F5F5" }}>
            <button type="button" onClick={onPrevSong} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                <path d="M19 5v14L8 12z" />
                <rect x="5" y="5" width="2" height="14" />
              </svg>
            </button>
            <button type="button" onClick={onTogglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                  <rect x="6" y="5" width="4" height="14" />
                  <rect x="14" y="5" width="4" height="14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                  <path d="M8 5v14l11-7Z" />
                </svg>
              )}
            </button>
            <button type="button" onClick={onNextSong} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                <path d="M5 5v14l11-7z" />
                <rect x="17" y="5" width="2" height="14" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-1.5 flex h-[42px] items-center gap-2 rounded-xl px-2.5" style={{ background: "rgba(255,255,255,0.08)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" className="h-3 w-3 shrink-0">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          </svg>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1 flex-1 accent-white"
          />
          <span
            className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" className="h-2.5 w-2.5">
              <path d="M5 17a7 7 0 0 1 14 0" />
              <path d="M8 20a4 4 0 0 1 8 0" />
              <circle cx="12" cy="20" r="1" fill="#F5F5F5" stroke="none" />
            </svg>
          </span>
        </div>
      </motion.div>
    </>
  );
}
