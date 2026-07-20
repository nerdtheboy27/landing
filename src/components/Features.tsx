import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wheat, Droplet, FlaskConical, WheatOff } from 'lucide-react';
import item1Svg from '../assets/item1.svg';
import item2Svg from '../assets/item2.svg';
import item3Svg from '../assets/item3.svg';
import item4Svg from '../assets/item4.svg';
import item5Svg from '../assets/item5.svg';
import item6Svg from '../assets/item6.svg';
import { usePreloader } from '../context/PreloaderContext';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "NO CORN SYRUP",
    icon: WheatOff,
    description: "Sweet is fine. Sugar-lab sweet is not. So we left the high fructose corn syrup on the bottom shelf where it belongs."
  },
  {
    title: "NO SEED OILS",
    icon: Droplet,
    description: "We skip the ultra-processed seed oils and use ingredients that actually belong in food. If it reads like a chemistry project, it's not in this bottle."
  },
  {
    title: "NO ADDITIVES",
    icon: FlaskConical,
    description: "No preservatives. No artificial nonsense. No \"what is that?\" ingredients hiding behind words you can't pronounce."
  },
  {
    title: "GLUTEN FREE",
    icon: Wheat,
    description: "No gluten. No thickening tricks. No drama. Just sauce that plays nice with your diet and acts up on the grill."
  }
];

export function Features() {
  const { isPreloaderComplete } = usePreloader();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 639px)",
      isTablet: "(min-width: 640px) and (max-width: 767px)",
      isDesktop: "(min-width: 768px) and (max-width: 1023px)",
      isLargeDesktop: "(min-width: 1024px)"
    }, (context) => {
      let { isMobile, isTablet, isDesktop, isLargeDesktop } = context.conditions as { isMobile: boolean, isTablet: boolean, isDesktop: boolean, isLargeDesktop: boolean };

      let containerHeight = isLargeDesktop ? 600 : isDesktop ? 550 : isTablet ? 450 : 420;
      let headerHeight = isDesktop || isLargeDesktop ? 72 : isTablet ? 64 : 56;
      // 1. ALWAYS set initial positions off-screen (so cards don't stack incorrectly during preloader)
      cardsRef.current.forEach((card, i) => {
        if (i === 0) return;
        const isRight = i % 2 === 0; // i=1 is left, i=2 is right, i=3 is left
        gsap.set(card, {
          y: () => {
            const edgeY = (window.innerHeight + containerHeight) / 2;
            if (i === 1) return edgeY - 150;
            return edgeY + 100;
          },
          x: isRight ? (isMobile ? 80 : 120) : (isMobile ? -80 : -120),
          rotationZ: isRight ? -10 : 10,
        });
      });

      // 2. Delay ScrollTrigger initialization until preloader is completely finished
      if (!isPreloaderComplete) return;

      // Pinning the whole section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        id: "features-pin"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
        }
      });

      cardsRef.current.forEach((card, i) => {
        if (i === 0) return; // First card is already in position

        const stopY = i * headerHeight;
        const startTime = (i - 1) * 0.6;

        tl.to(card, {
          y: stopY,
          x: 0,
          rotationZ: 0,
          ease: "none",
          duration: 1,
        }, startTime);
      });

      // Handle morphing independently to ensure exact final-stage timing
      const totalCards = cardsRef.current.length;
      cardsRef.current.forEach((_, i) => {
        if (i === 0) return;

        // When Card i finishes placing:
        const currentCardEnd = (i - 1) * 0.6 + 1.0;
        // When Card i started its unique fade window (which is when Card i-1 finished placing)
        const prevCardEnd = i === 1 ? 0 : (i - 2) * 0.6 + 1.0;

        const duration = currentCardEnd - prevCardEnd;

        // Only animate the card IMMEDIATELY BEFORE this one (j = i - 1)
        // It morphs directly to its final target opacity during this exact step
        const targetJ = i - 1;
        const targetCard = cardsRef.current[targetJ];
        if (!targetCard) return;
        
        const targetOverlay = targetCard.querySelector('.header-overlay');
        
        if (targetOverlay) {
          const finalOpacity = (totalCards - 1 - targetJ) * 0.15;

          tl.to(targetOverlay, {
            opacity: finalOpacity,
            ease: "none",
            duration: duration,
          }, prevCardEnd);
        }
      });

      // Floating random animation for background assets (Independent X/Y for organic paths)
      const floatingTweens: gsap.core.Tween[] = [];
      
      gsap.utils.toArray('.bg-asset').forEach((el: any) => {
        // X-axis drift
        floatingTweens.push(gsap.to(el, {
          x: () => gsap.utils.random(-30, 30),
          duration: () => gsap.utils.random(3, 5),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: () => gsap.utils.random(0, 1),
        }));
        
        // Y-axis drift (Different duration = chaotic organic paths!)
        floatingTweens.push(gsap.to(el, {
          y: () => gsap.utils.random(-30, 30),
          duration: () => gsap.utils.random(2.5, 4.5),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: () => gsap.utils.random(0, 1),
        }));

        // Gentle rotation
        floatingTweens.push(gsap.to(el, {
          rotation: () => gsap.utils.random(-8, 8),
          duration: () => gsap.utils.random(4, 6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }));
      });
      
      // Cleanup floating tweens on unmount
      return () => {
        floatingTweens.forEach((t: any) => t.kill());
      };
    });
  }, { scope: containerRef, dependencies: [isPreloaderComplete] });

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-[100svh] overflow-hidden bg-base-100 flex items-center justify-center py-20 transition-opacity duration-700 ${!isPreloaderComplete ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Background Static Assets (Wrapped for Magnetic separation) */}
      <div className="magnetic absolute top-[8%] left-[2%] w-48 md:w-72 lg:w-80 opacity-90 pointer-events-auto cursor-pointer z-0"><img src={item1Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>
      <div className="magnetic absolute top-[25%] right-[5%] w-40 md:w-56 lg:w-72 blur-[2px] opacity-70 pointer-events-auto cursor-pointer z-0"><img src={item2Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>
      <div className="magnetic absolute bottom-[15%] left-[8%] w-56 md:w-80 lg:w-[400px] blur-[6px] opacity-80 pointer-events-auto cursor-pointer z-0"><img src={item3Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>
      <div className="magnetic absolute top-[60%] right-[3%] w-64 md:w-80 lg:w-[450px] opacity-90 pointer-events-auto cursor-pointer z-0"><img src={item4Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>
      <div className="magnetic absolute -bottom-[5%] left-[45%] w-32 md:w-48 lg:w-64 opacity-90 pointer-events-auto cursor-pointer z-0"><img src={item5Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>
      <div className="magnetic absolute top-[12%] left-[65%] w-36 md:w-52 lg:w-72 opacity-95 pointer-events-auto cursor-pointer z-0"><img src={item6Svg} className="bg-asset w-full h-full pointer-events-none" alt="" /></div>

      {/* Cards Container */}
      <div className="relative w-full max-w-[90%] md:max-w-xl lg:max-w-2xl h-[420px] sm:h-[450px] md:h-[550px] lg:h-[600px] z-10">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="absolute top-0 left-0 w-full h-[420px] sm:h-[450px] md:h-[550px] lg:h-[600px] flex flex-col will-change-transform"
            style={{ zIndex: i }}
          >
            {/* Header Box (Separated to create perfect pill shape and notches) */}
            <div className="card-header relative h-[56px] sm:h-[64px] md:h-[72px] w-full flex items-center justify-between px-5 sm:px-6 md:px-8 bg-base-500 rounded-[20px] shrink-0 overflow-hidden z-10">
              {/* Dynamic Overlay for Scroll Morphing (behind text) */}
              <div className="header-overlay absolute inset-0 bg-base-100 opacity-0 pointer-events-none z-0"></div>

              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-base-100 relative z-10 shrink-0"></div>
              <h3 className="font-barlow font-normal text-2xl sm:text-3xl md:text-4xl tracking-wide text-base-100 m-0 uppercase relative z-10 px-2 sm:px-4 text-center line-clamp-1">{card.title}</h3>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-base-100 relative z-10 shrink-0"></div>
            </div>

            {/* Body Box */}
            <div className="flex-1 w-full bg-base-100 rounded-[20px] border-2 border-base-500 flex flex-col items-center justify-start pt-8 sm:pt-10 md:pt-12 lg:pt-16 p-6 sm:p-8 text-center z-0 overflow-hidden">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[1.5px] border-base-500 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shrink-0">
                <card.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-base-500 stroke-[1]" />
              </div>
              <p className="font-instrument text-base sm:text-lg md:text-xl lg:text-2xl text-base-500 leading-relaxed max-w-md m-0">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
