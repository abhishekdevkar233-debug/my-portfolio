import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GRAPHICS_PROJECTS, getGraphicsProject } from "@/lib/graphics-projects";
import GraphicsProjectDetail from "@/components/GraphicsProjectDetail";

export function generateStaticParams() {
  return GRAPHICS_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getGraphicsProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Abhishek Devkar`,
    description: project.description,
  };
}

export default async function GraphicsProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getGraphicsProject(slug);

  if (!project) notFound();

  return <GraphicsProjectDetail project={project} />;
}
