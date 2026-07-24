import Navbar from "./Navbar";
import PortraitHero from "./PortraitHero";
import CaseStudies from "./CaseStudies";
import KineticGridBanner from "./KineticGridBanner";
import WorkStack from "./WorkStack";
import Marquee from "./Marquee";

export default function Homepage() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />
      <main>
        <PortraitHero />
        <CaseStudies />
        <KineticGridBanner />
        <WorkStack />
        {/* ScrubHero ("Crafting Experiences") temporarily hidden */}
        <Marquee />
      </main>
      <footer
        id="contact"
        className="px-6 py-10 text-center text-[12px] uppercase tracking-[0.25em] sm:px-10 lg:px-16"
        style={{ color: "var(--footer-foreground)" }}
      >
        © {new Date().getFullYear()} Abhishek Devkar — Crafted with care
      </footer>
    </div>
  );
}
