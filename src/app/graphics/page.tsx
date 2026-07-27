import type { Metadata } from "next";
import GraphicsGallery from "@/components/GraphicsGallery";

export const metadata: Metadata = {
  title: "Graphic Design Collection — Abhishek Devkar",
  description:
    "A curated gallery of branding, campaign, and identity design work by Abhishek Devkar.",
};

export default function GraphicsPage() {
  return <GraphicsGallery />;
}
