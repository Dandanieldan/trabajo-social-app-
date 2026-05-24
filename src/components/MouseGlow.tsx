"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (glowRef.current) {
        // Actualiza la posición directamente en el DOM para rendimiento máximo de 60fps
        // sin causar re-renders pesados en React.
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] rounded-full z-[-1] transition-opacity duration-700"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 35%, rgba(0,0,0,0) 70%)",
        opacity: isVisible ? 1 : 0,
        transform: "translate(-50%, -50%)", // Empieza oculto en la esquina si no hay mouse
        willChange: "transform",
      }}
    />
  );
}
