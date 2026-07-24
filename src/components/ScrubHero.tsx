"use client";

import { HeroScrub } from "@/components/ui/hero-scrub";

const FRAME_IMAGES = [
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
];

export default function ScrubHero() {
  return (
    <HeroScrub
      frameCount={FRAME_IMAGES.length}
      frameUrl={(i) => FRAME_IMAGES[i % FRAME_IMAGES.length]}
      titleTop="Crafting"
      titleBottom="Experiences"
      accentHex="#101a2c"
    />
  );
}
