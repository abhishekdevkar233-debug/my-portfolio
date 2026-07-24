"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from "./drag-tag-cloud.module.css";

const TAGS = [
  { label: "Figma", top: "12%", left: "6%" },
  { label: "UX Research", top: "18%", left: "56%" },
  { label: "Design Systems", top: "40%", left: "16%" },
  { label: "Prototyping", top: "58%", left: "66%" },
  { label: "Product Design", top: "72%", left: "34%" },
  { label: "Interaction Design", top: "14%", left: "80%" },
  { label: "Accessibility", top: "82%", left: "10%" },
  { label: "AI Copilots", top: "34%", left: "44%" },
  { label: "Wireframing", top: "64%", left: "4%" },
  { label: "Usability Testing", top: "24%", left: "28%" },
  { label: "Motion Design", top: "78%", left: "58%" },
  { label: "Visual Design", top: "4%", left: "38%" },
];

export interface DragNodeHandle {
  reset: () => void;
}

const DragNode = forwardRef<
  DragNodeHandle,
  { label: string; top: string; left: string; stageRef: RefObject<HTMLDivElement | null> }
>(({ label, top, left, stageRef }, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 26 });
    },
  }));

  return (
    <motion.div
      className={cn(
        styles.node,
        dragging && styles.dragging,
        hovered && styles.hovered
      )}
      style={{ top, left, x, y }}
      drag
      dragConstraints={stageRef}
      dragElastic={0.12}
      dragMomentum
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {label}
    </motion.div>
  );
});
DragNode.displayName = "DragNode";

export default function DragTagCloud() {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(DragNodeHandle | null)[]>([]);
  const [spinning, setSpinning] = useState(false);

  const handleReset = () => {
    nodeRefs.current.forEach((n) => n?.reset());
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), 650);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <h1>What I work with</h1>
        <p>Drag the tags around — or hit reset.</p>
      </div>

      <button
        type="button"
        className={cn(styles.resetBtn, spinning && styles.spin)}
        onClick={handleReset}
        style={{ alignSelf: "flex-end" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12a9 9 0 1 1-3-6.7" strokeLinecap="round" />
          <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Reset
      </button>

      <div className={styles.stage} ref={stageRef}>
        {TAGS.map((t, i) => (
          <DragNode
            key={t.label}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            label={t.label}
            top={t.top}
            left={t.left}
            stageRef={stageRef}
          />
        ))}
      </div>
    </div>
  );
}
