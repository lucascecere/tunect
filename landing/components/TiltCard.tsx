"use client";

import { useRef, CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
}

export function TiltCard({ children, className = "", style = {}, intensity = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = ref.current;
    if (!card || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.02)`;
    card.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(255,45,120,0.12), 0 8px 32px rgba(0,0,0,0.4)`;
  }

  function handleMouseLeave() {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "";
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
