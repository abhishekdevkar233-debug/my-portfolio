"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ContactPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <Navbar />

      <main />

      <Footer />
    </div>
  );
}
