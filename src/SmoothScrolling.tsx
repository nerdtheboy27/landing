import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollingProps {
  children: ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Synchronize Lenis scrolling with GSAP ticker
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Refresh ScrollTrigger to update positions with the smooth scroll container
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.5,
        syncTouch: true,
        autoRaf: false, // Drive RAF loop via GSAP ticker instead
      }}
    >
      {children}
    </ReactLenis>
  );
}
