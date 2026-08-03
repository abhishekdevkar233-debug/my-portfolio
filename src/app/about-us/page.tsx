import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — Abhishek Devkar",
  description:
    "UI/UX designer specializing in enterprise SaaS, government platforms, AI products, and design systems.",
};

export default function AboutUs() {
  return <AboutPage />;
}
