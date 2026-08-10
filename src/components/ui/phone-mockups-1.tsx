import React from "react";
import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

// Placeholder screens — swap these for real payroll app screenshots.
const exampleImages: ImageItem[] = [
  { src: "/insights/img1.jpg", alt: "Payroll run overview screen" },
  { src: "/insights/img2.jpg", alt: "Compliance checks screen" },
  { src: "/insights/img3.jpg", alt: "Salary breakdown screen" },
  { src: "/insights/img4.jpg", alt: "Employee records screen" },
];

export default function PhoneMockupBasic({
  images = exampleImages,
}: {
  images?: ImageItem[];
}) {
  return <PhoneCarousel images={images} />;
}
