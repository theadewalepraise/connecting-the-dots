"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Optional delay in milliseconds
}

export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      {
        threshold: 0.1, // Triggers when 10% of the card is visible
        rootMargin: "0px 0px -50px 0px", // Triggers slightly before it enters the viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 md:translate-y-12" // Smaller slide on mobile, deeper slide on desktop
      } ${className}`}
    >
      {children}
    </div>
  );
}