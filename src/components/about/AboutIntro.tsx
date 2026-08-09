"use client";

import { motion } from "framer-motion";
import { ProfileCard, type ProfileSocial } from "@/components/ui/profile-card";

// Only real, verified profiles — same URLs the site footer already links to.
const SOCIALS: ProfileSocial[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/abhishek-devkar-557501231?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    iconSrc: "/logos/linkedin.svg",
  },
  {
    label: "Behance",
    url: "https://www.behance.net/abhishekdevkar1",
    iconSrc: "/logos/behance.svg",
  },
  {
    label: "Email",
    url: "mailto:abhishekdevkar8032@gmail.com",
    iconSrc: "/logos/gmail.svg",
  },
];

const DESCRIPTION =
  "A UI/UX designer who also edits video and writes frontend code, because I've never liked staying in one lane. I've shaped everything from enterprise SaaS dashboards to government portals to AI copilot interfaces. Every project starts with the same question: what does the user actually need here? The answer shapes everything that follows — the flow, the visuals, and the details most people never notice but always feel.";

export default function AboutIntro() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16">
      <ProfileCard
        name="Abhishek Devkar"
        title="UI/UX Designer · Video Editor · Frontend Developer"
        description={DESCRIPTION}
        imageUrl="/portrait.svg"
        socials={SOCIALS}
      />
    </section>
  );
}
