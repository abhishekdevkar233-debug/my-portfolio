import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Define the icon type.
type IconType =
  | React.ElementType
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// --- 📦 API (Props) Definition ---
export interface FeatureItem {
  /** A unique identifier for the feature. */
  id: string;
  /** The icon associated with the feature. */
  icon: IconType;
  /** The concise title of the feature. */
  title: string;
  /** The detailed description of the feature's benefit. */
  description: string;
}

export interface FeatureGridProps {
  /** Array of feature items to display. */
  features: FeatureItem[];
  /** Optional title for the entire grid section. */
  sectionTitle?: React.ReactNode;
  /** Optional subtitle for the entire grid section. */
  sectionSubtitle?: React.ReactNode;
  /** Optional class name to apply to the main container. */
  className?: string;
}

/**
 * A professional, responsive grid component for showcasing key product features.
 * Uses Cards for a clean, contained, monochrome, and theme-aware design.
 */
export const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  sectionTitle,
  sectionSubtitle,
  className,
}) => {
  if (!features || features.length === 0) {
    return null; // Or render an EmptyState component
  }

  return (
    <section
      className={cn("py-16 sm:py-24 bg-background text-foreground", className)}
      role="region"
      aria-label={
        typeof sectionTitle === "string"
          ? `Features: ${sectionTitle}`
          : "Product Features"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {sectionTitle && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="mt-4 text-lg text-muted-foreground">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="flex flex-col h-full p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              role="listitem"
            >
              <CardHeader className="p-0 pb-3">
                <div className="mb-3 p-2 w-fit rounded-lg bg-primary/10 text-primary border border-primary/20 transition-colors duration-200">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <CardDescription className="text-sm text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
