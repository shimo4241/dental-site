"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants
} from "framer-motion";

type AnimatedProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const luxuriousEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const revealTransition: Transition = {
  duration: 0.9,
  ease: luxuriousEase
};

const viewportSettings = {
  once: true,
  amount: 0.22
};

function createRevealVariants(
  reduceMotion: boolean,
  delay = 0
): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 28
    },
    visible: {
      opacity: 1,
      y: 0,
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
            staggerChildren: 0.14,
            delayChildren: 0.08
          }
    }
  };
}

function createStaggerItemVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: revealTransition
    }
  };
}

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
