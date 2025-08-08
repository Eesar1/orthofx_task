'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Update ScrollTrigger when Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}