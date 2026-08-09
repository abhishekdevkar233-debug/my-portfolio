import Navbar from "./Navbar";
import PortraitHero from "./PortraitHero";
import CaseStudies from "./CaseStudies";
import WorkStack from "./WorkStack";
import DesignerOS from "./designer-os/DesignerOS";
import Certifications from "./Certifications";
import CoverflowGallery from "./CoverflowGallery";
import Footer from "./Footer";

export default function Homepage() {
  return (
    <div className="relative min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />
      <main>
        <PortraitHero />
        <CaseStudies />
        <WorkStack />
        <DesignerOS />
        <Certifications />
        <CoverflowGallery />
        {/* KineticGridBanner ("What I work with"), ScrubHero ("Crafting Experiences"), and Marquee temporarily hidden */}
      </main>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
