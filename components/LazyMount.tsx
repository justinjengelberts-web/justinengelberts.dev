"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** How far outside the viewport mounting starts. */
  rootMargin?: string;
  className?: string;
}

/** Mounts children only once the wrapper scrolls near the viewport. */
export function LazyMount({
  children,
  rootMargin = "200px",
  className = "h-full w-full",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
