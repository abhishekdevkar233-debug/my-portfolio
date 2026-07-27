import type { Metadata } from "next";
import CaseStudiesIndex from "@/components/CaseStudiesIndex";

export const metadata: Metadata = {
  title: "All Case Studies — Abhishek Devkar",
  description:
    "Every selected work from Abhishek Devkar — enterprise platforms, government services, fintech, and AI products.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}
