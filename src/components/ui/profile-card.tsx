"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A social link rendered as a circular icon button.
 *
 * NOTE: this uses the real brand SVGs in /public/logos rather than
 * lucide-react brand icons — this version of lucide-react (1.26.x) no longer
 * ships brand marks (Github/Linkedin/Twitter/Youtube are all undefined).
 */
export interface ProfileSocial {
  /** Accessible label, e.g. "LinkedIn". */
  label: string;
  /** Destination URL. */
  url: string;
  /** Path to the brand SVG, e.g. "/logos/linkedin.svg". */
  iconSrc: string;
}

export interface ProfileCardProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  /** Social links to render. Omit or pass [] to hide the row entirely. */
  socials?: ProfileSocial[];
  className?: string;
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    name = "Abhishek Devkar",
    title = "UI/UX Designer",
    description = "",
    imageUrl = "/portrait.svg",
    socials = [],
    className,
  } = props;

  const socialRow = socials.length > 0 && (
    <div className="flex space-x-4">
      {socials.map(({ label, url, iconSrc }) => (
        <Link
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
          style={{
            background: "rgba(var(--hairline-rgb), 0.06)",
            border: "1px solid var(--border-strong)",
          }}
          aria-label={label}
        >
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
            className="h-5 w-5"
            unoptimized
          />
        </Link>
      ))}
    </div>
  );

  return (
    <div className={cn("mx-auto w-full max-w-5xl px-4", className)}>
      {/* Desktop */}
      <div className="relative hidden items-center md:flex">
        {/* Square Image */}
        <div
          className="flex h-[470px] w-[470px] flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl"
          style={{ background: "var(--surface-2)" }}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={470}
            height={470}
            className="h-full w-full object-cover"
            draggable={false}
            priority
            unoptimized
          />
        </div>

        {/* Overlapping Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="z-10 ml-[-80px] max-w-xl flex-1 rounded-3xl p-8 shadow-2xl"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div className="mb-6">
            <h2
              className="mb-2 text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {name}
            </h2>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              {title}
            </p>
          </div>

          {description && (
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {description}
            </p>
          )}

          {socialRow}
        </motion.div>
      </div>

      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-sm bg-transparent text-center md:hidden"
      >
        {/* Square Mobile Image */}
        <div
          className="mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl"
          style={{ background: "var(--surface-2)" }}
        >
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover"
            draggable={false}
            priority
            unoptimized
          />
        </div>

        <div className="px-4">
          <h2
            className="mb-2 text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {name}
          </h2>
          <p
            className="mb-4 text-sm font-medium"
            style={{ color: "var(--muted-foreground)" }}
          >
            {title}
          </p>

          {description && (
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {description}
            </p>
          )}

          <div className="flex justify-center">{socialRow}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileCard;
