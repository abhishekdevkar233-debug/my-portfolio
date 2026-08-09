"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type IconType =
  | React.ElementType
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface DarkGridItem {
  title: string;
  icon: IconType;
  desc: string;
  badge?: string;
}

export interface DarkGridProps {
  items: DarkGridItem[];
  /** Small uppercase label above the heading, e.g. "[ WHAT WE BUILD ]". */
  eyebrow?: string;
  heading?: string;
  className?: string;
}

/**
 * Dark bordered card grid with hover gradient wash and white corner squares.
 */
export function DarkGrid({ items, eyebrow, heading, className }: DarkGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4 py-16">
        {eyebrow && (
          <p className="text-xs tracking-widest text-zinc-500">{eyebrow}</p>
        )}
        {heading && (
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            {heading}
          </h2>
        )}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, icon: Icon, desc, badge }) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow that appears on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 transition-colors group-hover:from-white/[0.03] group-hover:to-white/[0.06]" />

              {/* white corner squares on hover - outside the card and square shaped */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -left-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -right-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium text-zinc-100">
                      {title}
                    </CardTitle>
                    {badge && (
                      <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-300">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 pt-0">
                <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DarkGrid;
