"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  DESKTOP_TOOLS,
  DESKTOP_FOLDERS,
  PLAYLIST,
  getCaseStudyForFolder,
  type DesktopFolder,
} from "@/lib/designer-os-data";
import DesktopToolIcon from "./DesktopTool";
import DesktopFolderIcon from "./DesktopFolder";
import MacMenuBar from "./MacMenuBar";
import ControlCenter from "./ControlCenter";
import SafariWindow from "./SafariWindow";
import ProjectModal from "./ProjectModal";
import type { CaseStudy } from "@/lib/case-studies";
import { useRouter } from "next/navigation";

const PARTICLES = [
  { top: "14%", left: "10%", size: 3, delay: 0 },
  { top: "24%", left: "82%", size: 2, delay: 1.1 },
  { top: "62%", left: "18%", size: 2, delay: 2.2 },
  { top: "76%", left: "70%", size: 3, delay: 0.6 },
  { top: "40%", left: "94%", size: 2, delay: 2.8 },
  { top: "50%", left: "4%", size: 2, delay: 1.6 },
  { top: "86%", left: "40%", size: 2, delay: 3.4 },
];

export default function DesignerOS() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(
    null,
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 60, damping: 20 });
  const glowY = useSpring(my, { stiffness: 60, damping: 20 });
  const parallaxX = useSpring(
    useTransform(mx, (v) => v * 0.02),
    { stiffness: 40, damping: 20 },
  );
  const parallaxY = useSpring(
    useTransform(my, (v) => v * 0.02),
    { stiffness: 40, damping: 20 },
  );

  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [safariOpen, setSafariOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(65);
  const [songIndex, setSongIndex] = useState(0);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.volume = musicVolume / 100;
      audio.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const handleVolumeChange = (value: number) => {
    setMusicVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const playSongAt = (index: number) => {
    const nextIndex = (index + PLAYLIST.length) % PLAYLIST.length;
    setSongIndex(nextIndex);
  };

  const handleNextSong = () => playSongAt(songIndex + 1);
  const handlePrevSong = () => playSongAt(songIndex - 1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = musicVolume / 100;
    if (musicPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const handleOpenFolder = (folder: DesktopFolder) => {
    const caseStudy = getCaseStudyForFolder(folder);
    if (caseStudy) {
      setActiveCaseStudy(caseStudy);
    } else if (folder.href) {
      router.push(folder.href);
    }
  };

  return (
    <section
      className="px-6 py-24 sm:px-10 lg:px-16 xl:px-[300px]"
      style={{ color: "var(--foreground)" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="isolate relative mx-auto aspect-[16/13] w-full max-w-[880px] overflow-hidden rounded-[24px] border sm:aspect-[16/10]"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* wallpaper */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/wallpapers/dark-mode-wallpaper.svg')",
          }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 900px 500px at 30% 20%, rgba(110,168,254,0.12), transparent 60%), radial-gradient(ellipse 700px 500px at 80% 80%, rgba(167,139,250,0.1), transparent 60%), linear-gradient(160deg, rgba(12,12,14,0.35), rgba(5,5,6,0.55))",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="absolute left-[10%] top-[15%] h-[280px] w-[280px] rounded-full bg-[#6EA8FE]/10 blur-[100px]" />
          <div className="absolute right-[8%] bottom-[15%] h-[240px] w-[240px] rounded-full bg-[#A78BFA]/10 blur-[100px]" />
        </motion.div>

        {/* cursor glow */}
        <motion.div
          className="pointer-events-none absolute -z-10 h-[260px] w-[260px] rounded-full"
          style={{
            left: glowX,
            top: glowY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
          }}
        />

        {/* floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(255,255,255,0.4)",
              filter: "blur(1px)",
            }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        <audio
          ref={audioRef}
          src={PLAYLIST[songIndex].src}
          preload="none"
          onLoadedMetadata={(e) => {
            e.currentTarget.volume = musicVolume / 100;
          }}
          onEnded={() => setMusicPlaying(false)}
        />

        <MacMenuBar
          onToggleControlCenter={() => setControlCenterOpen((v) => !v)}
        />
        {controlCenterOpen && (
          <ControlCenter
            onClose={() => setControlCenterOpen(false)}
            song={PLAYLIST[songIndex]}
            onNextSong={handleNextSong}
            onPrevSong={handlePrevSong}
            playing={musicPlaying}
            onTogglePlay={toggleMusic}
            volume={musicVolume}
            onVolumeChange={handleVolumeChange}
          />
        )}
        <SafariWindow open={safariOpen} onClose={() => setSafariOpen(false)} />

        {/* desktop icons */}
        <div className="absolute left-3 top-12 flex flex-col gap-1 sm:left-6 sm:top-14">
          {DESKTOP_FOLDERS.map((folder) => (
            <DesktopFolderIcon
              key={folder.id}
              folder={folder}
              onOpen={handleOpenFolder}
            />
          ))}
        </div>

        {/* dock */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center px-3 sm:bottom-6">
          <div
            className="taskbar-scroll flex items-end gap-2 rounded-[20px] border px-3 py-2 sm:gap-2.5 sm:px-4"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(30,30,32,0.5)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              maxWidth: "100%",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {DESKTOP_TOOLS.map((tool, i) => (
              <DesktopToolIcon
                key={tool.id}
                tool={tool}
                index={i}
                hoveredIndex={hoveredDockIndex}
                onHover={setHoveredDockIndex}
                onOpen={
                  tool.id === "safari" ? () => setSafariOpen(true) : undefined
                }
              />
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectModal
        caseStudy={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}
