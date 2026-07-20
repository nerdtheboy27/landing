import { useRef, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';

gsap.registerPlugin(SplitText, ScrollTrigger);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimationComplete, setIsMenuAnimationComplete] = useState(false);
  const preloaderFinished = useRef(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    if (lenis && !preloaderFinished.current) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  const toggleTheme = (e: React.MouseEvent) => {
    if (!document.startViewTransition) {
      setIsDark(!isDark);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(!isDark);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const isMenuOpenRef = useRef(isMenuOpen);
  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    let mm = gsap.matchMedia(container);

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isTablet: "(min-width: 768px) and (max-width: 1023px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isMobile, isTablet, isDesktop } = context.conditions as { isMobile: boolean, isTablet: boolean, isDesktop: boolean };

      const heading = new SplitText(".hero-header h1", {
        type: "lines, words, chars",
        charsClass: "inline-block will-change-transform",
        wordsClass: "inline-block will-change-transform",
      });

      const footerText = new SplitText(".hero-footer p", {
        type: "lines",
        linesClass: "inline-block will-change-transform",
      });

      gsap.set(".nav-logo", { scale: 0, transformOrigin: "top left" });
      // GSAP Initial Setup
      gsap.set(".nav-word-wrapper", { opacity: 0 });
      if (isDesktop) {
        gsap.set(".mobile-hamburger, .floating-nav-buttons", { autoAlpha: 0, y: -20, pointerEvents: "none" });
      } else {
        gsap.set(".mobile-hamburger, .floating-nav-buttons", { autoAlpha: 0, y: 0, pointerEvents: "auto" });
      }
      gsap.set(heading.chars, { y: 50, opacity: 0, scale: 0.5 });
      gsap.set(footerText.lines, { yPercent: 100 });
      gsap.set(".bottle-img", { xPercent: -53, yPercent: 50, rotation: 2, scale: 0.5, opacity: 0 });
      gsap.set(".left-element", { yPercent: 50, scale: 0.5, opacity: 0 });
      gsap.set(".right-element", { yPercent: 50, scale: 0.5, opacity: 0 });

      gsap.set(".item", { xPercent: -50, yPercent: -50, scale: 0 });
      gsap.set(".hero-img-bg", { scale: 0 });
      gsap.set(".lottie-sticker", { autoAlpha: 0 });

      const itemTargets = isMobile ? [
        { x: "-20vw", y: "-35vh", rotation: -20 },
        { x: "20vw", y: "-25vh", rotation: 15 },
        { x: "-20vw", y: "30vh", rotation: 12 },
        { x: "20vw", y: "25vh", rotation: -15 },
      ] : isTablet ? [
        { x: "-25vw", y: "-30vh", rotation: -20 },
        { x: "25vw", y: "-25vh", rotation: 15 },
        { x: "-25vw", y: "30vh", rotation: 12 },
        { x: "25vw", y: "25vh", rotation: -15 },
      ] : [
        { x: "-20vw", y: "-30vh", rotation: -20 },
        { x: "25vw", y: "-20vh", rotation: 15 },
        { x: "-32vw", y: "30vh", rotation: 12 },
        { x: "15vw", y: "25vh", rotation: -15 },
      ];

      const EXIT_DISTANCE = isMobile ? 4.5 : isTablet ? 4.0 : 3.5;
      const END_SCALE = isMobile ? 2.5 : isTablet ? 2.0 : 2.3;

      const itemExits = itemTargets.map((target) => ({
        x: parseFloat(target.x) * EXIT_DISTANCE + "vw",
        y: parseFloat(target.y) * EXIT_DISTANCE + "vh",
        rotation: target.rotation * 3.5,
      }));

      const items = gsap.utils.toArray(".item");
      const floatingTweens: gsap.core.Tween[] = [];

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(".preloader-revealer", {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        stagger: 0.25,
        ease: "power2.inOut",
      });

      tl.set(".preloader-revealer", { display: "none" });

      items.forEach((item: any, i) => {
        const target = itemTargets[i];
        const image = item.querySelector("img");

        // Set initial rotation so there is only a small amount of rotation during the load
        gsap.set(item, { rotation: target.rotation - Math.sign(target.rotation) * 100 });

        tl.to(
          item,
          {
            x: target.x,
            y: target.y,
            scale: 1,
            rotation: target.rotation,
            duration: 1,
            ease: "power3.out",
            onStart: () => {
              floatingTweens[i] = gsap.to(image, {
                y: gsap.utils.random(-15, -25),
                duration: gsap.utils.random(1.5, 2.5),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: gsap.utils.random(0, 0.5),
              });
            },
          },
          i === 0 ? "-=0.55" : "<0.075",
        );
      });

      tl.to(
        ".preloader-logo",
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        "<",
      );

      tl.set(".preloader-bg", { display: "none" });

      tl.to({}, { duration: 1 }); // Pause

      // --- ENDING ANIMATION ---
      tl.to(".preloader-logo", {
        y: "-200vh",
        scale: END_SCALE,
        duration: 1,
        ease: "power3.inOut"
      });

      items.forEach((item: any, i) => {
        const exit = itemExits[i];
        tl.to(
          item,
          {
            x: exit.x,
            y: exit.y,
            rotation: exit.rotation,
            scale: END_SCALE,
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        );
      });

      // Keep preloader state hidden, but wait to unlock scroll
      tl.set(".preloader", { display: "none" });

      tl.to(".nav-logo", { scale: 1, duration: 1, ease: "power3.out" }, "<");
      tl.to(".nav-word-wrapper", { opacity: 1, duration: 0.2, ease: "power2.out" }, "<");

      if (!isDesktop) {
        tl.to(".mobile-hamburger", { autoAlpha: 1, zIndex: 110, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, "<");
        tl.to(".floating-nav-buttons", { autoAlpha: 1, zIndex: 105, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, "<");
      }

      // Activate ScrollTrigger as soon as navbar is visible
      tl.call(() => {
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "+=100",
          onLeave: () => {
            if (!isMenuOpenRef.current) {
              gsap.to(".nav-logo", { opacity: 0, y: -20, pointerEvents: "none", duration: 0.15, ease: "power2.in" });
              if (isDesktop) {
                gsap.to(".nav-items", { opacity: 0, y: -20, pointerEvents: "none", duration: 0.15, ease: "power2.in" });
                gsap.to(".mobile-hamburger", { autoAlpha: 1, y: 0, zIndex: 110, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
                gsap.to(".floating-nav-buttons", { autoAlpha: 1, y: 0, zIndex: 105, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
              }
            }
          },
          onEnterBack: () => {
            if (!isMenuOpenRef.current) {
              gsap.to(".nav-logo", { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
              if (isDesktop) {
                gsap.to(".mobile-hamburger, .floating-nav-buttons", { autoAlpha: 0, y: -20, zIndex: 1, pointerEvents: "none", duration: 0.15, ease: "power2.in" });
                gsap.to(".nav-items", { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
              }
            }
          }
        });
      });

      tl.to(
        ".hero-img-bg",
        {
          scale: 1.15,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(".hero-img-bg", {
              scale: 1.2,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        },
        "<"
      );

      tl.to(
        ".bottle-img",
        {
          xPercent: -53,
          yPercent: -60,
          rotation: 2,
          opacity: 1,
          scale: 0.85,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(".bottle-img", {
              y: "-=20",
              duration: 2.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        },
        "<0.2"
      );

      tl.to(
        ".left-element",
        {
          yPercent: -20,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(".left-element", {
              y: "-=15",
              duration: 3.2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        },
        "<0.2"
      );

      tl.to(
        ".right-element",
        {
          yPercent: -20,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(".right-element", {
              y: "-=10",
              duration: 2.7,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        },
        "<0.1"
      );

      tl.to(heading.chars, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.015, ease: "power3.out" }, "<0.1");
      tl.to(footerText.lines, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "<");
      tl.fromTo(".lottie-sticker", { scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", immediateRender: false }, ">-0.2");

      // Finalize preloader sequence
      tl.call(() => {
        preloaderFinished.current = true;

        // Setup About Us Animation ONLY after Hero is completely done
        gsap.set(".animated-text", { opacity: 1 }); // Reveal the hidden wrapper
        const aboutSplit = new SplitText(".animated-text", { type: "words", wordsClass: "inline-block will-change-transform" });

        gsap.fromTo(aboutSplit.words, {
          y: () => gsap.utils.random(100, 250),
          x: () => gsap.utils.random(-40, 40),
          rotation: () => gsap.utils.random(-60, 60),
          opacity: 0,
        }, {
          scrollTrigger: {
            trigger: ".scroll-text-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          x: 0,
          rotation: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "power2.out",
          duration: 0.5
        });
      });


      // Magnetic effect for floating elements
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        document.querySelectorAll('.magnetic').forEach((el) => {
          const rect = el.getBoundingClientRect();
          const elCenterX = rect.left + rect.width / 2;
          const elCenterY = rect.top + rect.height / 2;

          const distanceX = clientX - elCenterX;
          const distanceY = clientY - elCenterY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          const magneticRadius = 250;

          if (distance < magneticRadius) {
            const pullStrength = 0.15;
            gsap.to(el, {
              x: distanceX * pullStrength,
              y: distanceY * pullStrength,
              duration: 0.6,
              ease: "power2.out"
            });
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.3)"
            });
          }
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // Cleanup function for matchMedia context
      return () => {
        floatingTweens.forEach(t => t.kill());
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    };
  }, { scope: container, dependencies: [] });

  // Mobile menu animation
  useGSAP(() => {
    const isDesktopMenu = window.innerWidth >= 1024;

    if (isMenuOpen) {
      setIsMenuAnimationComplete(false);

      if (isDesktopMenu) {
        // Desktop: side panel on the right with padding matching hamburger
        gsap.to(".mobile-menu", {
          top: 16,
          right: 16,
          width: window.innerWidth * 0.5,
          height: window.innerHeight - 32,
          borderRadius: 24,
          duration: 0.5,
          ease: "power4.inOut",
        });
      } else {
        // Mobile/Tablet: fullscreen
        gsap.to(".mobile-menu", {
          top: 8,
          right: 8,
          width: window.innerWidth - 16,
          height: window.innerHeight - 16,
          borderRadius: 24,
          duration: 0.6,
          ease: "power4.inOut",
        });
      }

      // Staggered entry for links
      gsap.fromTo(".mobile-menu-link",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.2,
          ease: "power3.out",
          onComplete: () => setIsMenuAnimationComplete(true)
        }
      );

      // Social icons entry
      gsap.fromTo(".mobile-social",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.4, ease: "power3.out" }
      );
    } else {
      setIsMenuAnimationComplete(false);
      gsap.to(".mobile-menu", {
        top: 16,
        right: 16,
        width: 72,
        height: 48,
        borderRadius: 16,
        duration: 0.4,
        ease: "power3.inOut"
      });
      // Snappy exit for links and socials
      gsap.to(".mobile-menu-link", { opacity: 0, y: 15, duration: 0.2, ease: "power2.in" });
      gsap.to(".mobile-social", { opacity: 0, y: 15, duration: 0.2, ease: "power2.in" });
    }
  }, { scope: container, dependencies: [isMenuOpen] });



  return (
    <div ref={container} className="relative w-full min-h-screen overflow-x-hidden bg-base-100 text-base-500">
      <Preloader />
      <Header isDark={isDark} toggleTheme={toggleTheme} isMenuOpen={isMenuOpen} />
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isMenuAnimationComplete={isMenuAnimationComplete} />
      <Hero />
      <AboutUs />
    </div>
  );
}

export default App;
