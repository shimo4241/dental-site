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

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

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

  // Gentle sweep animation on first view — calm, not flashy
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
          setHasAnimated(true);
          // Slow, elegant sweep: center → left → right → center
          const steps = [
            { pos: 35, delay: 500 },
            { pos: 65, delay: 900 },
            { pos: 50, delay: 700 },
          ];
          let totalDelay = 400;
          steps.forEach(({ pos, delay }) => {
            totalDelay += delay;
            setTimeout(() => setSliderPos(pos), totalDelay);
          });
        }
      },
      { threshold: 0.35 }
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
      {/* After image — full background with soft hover zoom */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered && !reduceMotion ? 1.03 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
      </motion.div>

      {/* Before image — clipped with matching hover zoom */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered && !reduceMotion ? 1.03 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </motion.div>
      </div>

      {/* Slider line — fluid positioning via CSS transition */}
      <div
        className="absolute inset-y-0 z-10"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          transition: isDragging ? "none" : "left 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="h-full w-[2px] bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.3)]" />

        {/* Handle */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-950/60 shadow-xl shadow-black/20 backdrop-blur-xl"
          animate={{
            scale: isDragging ? 1.12 : isHovered ? 1.04 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
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

      {/* Labels — calm fade-in */}
      <motion.div
        className="absolute bottom-4 left-4 z-20 rounded-full bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {beforeLabel}
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-4 z-20 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-950 backdrop-blur-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {afterLabel}
      </motion.div>

      {/* Subtle gradient overlay for label contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-t from-black/25 to-transparent" />
    </div>
  );
}
