"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: "up" | "fade" | "left" | "right";
  threshold?: number;
}

export function AnimateIn({
  children,
  className = "",
  style = {},
  delay = 0,
  direction = "up",
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const initial: CSSProperties = {
    opacity: 0,
    transform:
      direction === "up" ? "translateY(28px)" :
      direction === "left" ? "translateX(-28px)" :
      direction === "right" ? "translateX(28px)" :
      "none",
  };

  const final: CSSProperties = {
    opacity: 1,
    transform: "translate(0)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible ? final : initial),
        transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
