"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface ImageCompareSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  dragHint?: string;
}

export function ImageCompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeAlt = "Before image",
  afterAlt = "After image",
  dragHint = "Drag to compare",
}: ImageCompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 cursor-ew-resize select-none bg-zinc-900"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* After Image (Background - full width, sets container height) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="w-full h-auto block"
        draggable={false}
      />

      {/* Before Image (Clipped, absolutely positioned) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1.5 -ml-[3px] cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Glowing Line with dark border for contrast */}
        <div className="absolute inset-0 w-1.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.5)] outline outline-2 outline-black/30" />

        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.8)] ring-2 ring-black/20 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 text-zinc-800 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <svg
              className="w-3 h-3 text-zinc-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-4 left-4 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider transition-opacity duration-300"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider transition-opacity duration-300"
        style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      {/* Hint Text - z-0 to stay behind slider */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white/60 text-xs pointer-events-none z-0">
        {dragHint}
      </div>
    </motion.div>
  );
}
