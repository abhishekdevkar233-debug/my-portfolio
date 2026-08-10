"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutIntro from "./about/AboutIntro";
import AboutJourney from "./about/AboutJourney";
import AboutTools from "./about/AboutTools";
import AboutExpertise from "./about/AboutExpertise";
import Certifications from "./Certifications";
import CoverflowGallery from "./CoverflowGallery";

export default function AboutPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main>
        <AboutIntro />
        <AboutJourney />
        <AboutTools />
        <AboutExpertise />
        <Certifications />
        <CoverflowGallery />
      </main>

      <Footer />
    </div>
  );
}
