"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import ContactHero from "./contact/ContactHero";
import AvailabilityCard from "./contact/AvailabilityCard";
import ContactCards from "./contact/ContactCards";
import CollaborationCards from "./contact/CollaborationCards";
import ContactForm from "./contact/ContactForm";
import ProcessTimeline from "./contact/ProcessTimeline";
import FinalCta from "./contact/FinalCta";

export default function ContactPage() {
  const [projectType, setProjectType] = useState("");

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main className="flex flex-col gap-4">
        <ContactHero />
        <AvailabilityCard />
        <ContactCards />
        <CollaborationCards selected={projectType} onSelect={setProjectType} />
        <ContactForm projectType={projectType} onProjectTypeChange={setProjectType} />
        <ProcessTimeline />
        <FinalCta />
      </main>

      <footer
        className="px-6 py-10 text-center text-[12px] uppercase tracking-[0.25em] sm:px-10 lg:px-16"
        style={{ color: "var(--footer-foreground)" }}
      >
        © {new Date().getFullYear()} Abhishek Devkar — Crafted with care
      </footer>
    </div>
  );
}
