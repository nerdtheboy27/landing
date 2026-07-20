import { useRef } from 'react';

export function AboutUs() {
  const scrollTextSectionRef = useRef<HTMLDivElement>(null);

  // Text animation is handled by the master timeline in App.tsx to ensure perfect sequencing.

  return (
    <section ref={scrollTextSectionRef} className="scroll-text-section relative w-full min-h-screen bg-base-100 text-base-500 flex items-center justify-center pt-[35vh] pb-32 px-6 md:px-12 lg:px-24 overflow-hidden z-0">
      <div className="max-w-[1400px] mx-auto text-center">
        <p className="animated-text opacity-0 font-barlow font-normal text-[clamp(2rem,6vw,6.5rem)] leading-[1.1] m-0 tracking-tight">
          Our BBQ sauces use real, natural stuff like it's the 1800s. <span className="text-red-500 inline-block drop-shadow-lg scale-125 mx-2">💥</span> Slap it on anything you grill and act surprised when people think you can <span className="inline-block drop-shadow-lg scale-125 mx-2">👨‍🍳</span> cook.
        </p>
      </div>
    </section>
  );
}
