"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Avant",
  afterLabel = "Après",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
      setSliderPos(pct);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Animate the slider intro once in view
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (reduceMotion) {
      setHasAnimated(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Sweep animation: 50 -> 25 -> 65 -> 50
          setHasAnimated(true);
          const steps = [
            { pos: 30, delay: 200 },
            { pos: 70, delay: 600 },
            { pos: 50, delay: 400 },
          ];
          let totalDelay = 300;
          steps.forEach(({ pos, delay }) => {
            totalDelay += delay;
            setTimeout(() => setSliderPos(pos), totalDelay);
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[3/2] w-full cursor-ew-resize select-none overflow-hidden rounded-[1.4rem] bg-slate-900"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Comparaison avant/après"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(2, p - 2));
        if (e.key === "ArrowRight") setSliderPos((p) => Math.min(98, p + 2));
      }}
    >
      {/* After image — full background */}
      <Image
        src={afterImage}
        alt={afterLabel}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />

      {/* Before image — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-[2px] bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />

        {/* Handle */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-950/70 shadow-lg shadow-black/30 backdrop-blur-md"
          animate={{
            scale: isDragging ? 1.15 : isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white"
          >
            <path
              d="M6 10L3 10M3 10L5 8M3 10L5 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 10L17 10M17 10L15 8M17 10L15 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Labels */}
      <motion.div
        className="absolute bottom-4 left-4 z-20 rounded-full bg-slate-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {beforeLabel}
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-4 z-20 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-950 backdrop-blur-md"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {afterLabel}
      </motion.div>

      {/* Subtle gradient overlays for label contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
