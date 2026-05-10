"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
  type Variants
} from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   Motion Design Tokens
   Calm · Fluid · Premium · Breathable
   ───────────────────────────────────────────── */

/** A slow, luxurious cubic-bezier that decelerates very gently. */
const luxuriousEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Default reveal transition — slow enough to feel premium. */
const revealTransition: Transition = {
  duration: 1.1,
  ease: luxuriousEase
};

/** Shared viewport trigger — generous threshold for early, calm entry. */
const viewportSettings = {
  once: true,
  amount: 0.18 as const
};

/* ─── Variant factories ─── */

function createRevealVariants(
  reduceMotion: boolean,
  delay = 0
): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 32,
      filter: reduceMotion ? "none" : "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        ...revealTransition,
        delay
      }
    }
  };
}

function createStaggerContainerVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.12,
            delayChildren: 0.06
          }
    }
  };
}

function createStaggerItemVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 28,
      filter: reduceMotion ? "none" : "blur(3px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: revealTransition
    }
  };
}

/* ─── Animated primitives ─── */

type AnimatedProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInUp({
  children,
  className,
  delay = 0
}: AnimatedProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={createRevealVariants(Boolean(reduceMotion), delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function LoadIn({
  children,
  className,
  delay = 0
}: AnimatedProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={createRevealVariants(Boolean(reduceMotion), delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  initialOnLoad?: boolean;
};

export function StaggerGroup({
  children,
  className,
  initialOnLoad = false
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      {...(initialOnLoad
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportSettings })}
      variants={createStaggerContainerVariants(Boolean(reduceMotion))}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: Omit<AnimatedProps, "delay">) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={createStaggerItemVariants(Boolean(reduceMotion))}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax layer (subtle depth) ─── */

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** How many px the element travels. Positive = moves up as you scroll. */
  offset?: number;
};

export function Parallax({
  children,
  className,
  offset = 40
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? {} : { y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
