import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Abhishek Devkar",
  description:
    "Get in touch with Abhishek Devkar for product design, brand identity, freelance, or full-time opportunities.",
};

export default function Contact() {
  return <ContactPage />;
}
