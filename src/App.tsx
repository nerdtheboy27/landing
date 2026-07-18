import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import item1Svg from './assets/item1.svg';
import item2Svg from './assets/item2.svg';
import item3Svg from './assets/item3.svg';
import item4Svg from './assets/item4.svg';
import item6Svg from './assets/item6.svg';
import item7Svg from './assets/item7.svg';
import heroSvg from './assets/hero2.svg';

gsap.registerPlugin(SplitText, ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimationComplete, setIsMenuAnimationComplete] = useState(false);

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
    // Make sure SplitText and fonts are ready
    document.fonts.ready.then(() => {
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

        gsap.set(".nav-logo img", { scale: 0 });
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

        const itemTargets = isMobile ? [
          { x: "-35vw", y: "-35vh", rotation: -20 },
          { x: "35vw", y: "-25vh", rotation: 15 },
          { x: "-35vw", y: "30vh", rotation: 12 },
          { x: "35vw", y: "25vh", rotation: -15 },
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

        tl.set(".preloader", { display: "none" });

        tl.to(".nav-logo img", { scale: 1, duration: 1, ease: "power3.out" }, "<");
        tl.to(".nav-word-wrapper", { opacity: 1, duration: 0.2, ease: "power2.out" }, "<");
        if (!isDesktop) {
          tl.to(".mobile-hamburger", { autoAlpha: 1, zIndex: 110, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, "<");
          tl.to(".floating-nav-buttons", { autoAlpha: 1, zIndex: 105, pointerEvents: "auto", duration: 0.2, ease: "power2.out" }, "<");
        } else {
          // Activate ScrollTrigger as soon as navbar is visible
          tl.call(() => {
            ScrollTrigger.create({
              trigger: ".hero",
              start: "top top",
              end: "+=100",
              onLeave: () => {
                if (!isMenuOpenRef.current) {
                  gsap.to(".nav-items", { opacity: 0, y: -20, pointerEvents: "none", duration: 0.15, ease: "power2.in" });
                  gsap.to(".mobile-hamburger", { autoAlpha: 1, y: 0, zIndex: 110, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
                  gsap.to(".floating-nav-buttons", { autoAlpha: 1, y: 0, zIndex: 105, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
                }
              },
              onEnterBack: () => {
                if (!isMenuOpenRef.current) {
                  gsap.to(".mobile-hamburger, .floating-nav-buttons", { autoAlpha: 0, y: -20, zIndex: 1, pointerEvents: "none", duration: 0.15, ease: "power2.in" });
                  gsap.to(".nav-items", { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.15, delay: 0.1, ease: "power2.out" });
                }
              }
            });
          });
        }

        tl.to(
          ".hero-img-bg",
          {
            scale: 1.15,
            duration: 1,
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
            duration: 1,
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
            duration: 1,
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
            duration: 1,
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

        tl.to(heading.chars, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<0.2");
        tl.to(footerText.lines, { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "<");


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
    });
  }, { scope: container });

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
      {/* Preloader */}
      <div className="preloader fixed w-full h-[100svh] text-base-500 overflow-hidden z-[2]">
        <div className="preloader-bg absolute w-full h-[100svh] origin-center bg-base-100"></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-200" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-300" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-400" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-100" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>

        <div className="items absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="item absolute top-1/2 left-1/2 w-[45vw] md:w-[28vw] lg:w-[20vw] -translate-x-1/2 -translate-y-1/2"><img src={item1Svg} alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[45vw] md:w-[28vw] lg:w-[20vw] -translate-x-1/2 -translate-y-1/2"><img src={item2Svg} alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[45vw] md:w-[28vw] lg:w-[20vw] -translate-x-1/2 -translate-y-1/2"><img src={item3Svg} alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[45vw] md:w-[28vw] lg:w-[20vw] -translate-x-1/2 -translate-y-1/2"><img src={item4Svg} alt="" className="w-full h-full object-cover" /></div>
        </div>

        <div className="preloader-logo absolute top-1/2 left-1/2 w-[25vw] md:w-[15vw] lg:w-[15vw] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 will-change-transform">
          <img src="/logo.svg" alt="" className="w-full h-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 lg:p-3 flex justify-between items-start z-[100]">
        <div className="nav-logo relative z-[100]">
          <img src="/logo.svg" alt="" className="w-20 lg:w-28 min-[2000px]:w-48 origin-top-left" />
        </div>

        {/* Desktop Links */}
        <div className="nav-items hidden lg:flex gap-10 min-[2000px]:gap-24 items-center">
          {['SHOP', 'WHOLESALE', 'ABOUT', 'CONTACT', 'FAQ', 'CART(0)'].map((text) => (
            <a key={text} href="#" className="font-barlow font-semibold text-[2.5rem] min-[2000px]:text-[4.5rem] uppercase no-underline group overflow-hidden flex h-[1.2em] text-base-500">
              <div className="nav-word-wrapper flex">
                {text.split('').map((char, i) => (
                  <div
                    key={i}
                    className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2 flex flex-col h-[2.4em]"
                    style={{ transitionDelay: `${i * 25}ms` }}
                  >
                    <span className="h-[1.2em] leading-[1.2] flex items-center">{char === ' ' ? '\u00A0' : char}</span>
                    <span className="h-[1.2em] leading-[1.2] flex items-center text-transparent [-webkit-text-stroke:1px_theme('colors.base.500')]">{char === ' ' ? '\u00A0' : char}</span>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>

      </nav>

      {/* Floating Buttons */}
      <div className={`floating-nav-buttons fixed z-[1] top-[16px] right-[96px] min-[2000px]:right-[140px] flex items-center gap-2 min-[2000px]:gap-4 invisible opacity-0 pointer-events-none lg:-translate-y-5 ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <a href="#" className="floating-btn get-sauce relative overflow-hidden group pointer-events-auto bg-base-500 border-2 border-base-500 text-base-100 rounded-[16px] px-4 md:px-6 min-[2000px]:px-10 h-[48px] min-[2000px]:h-[72px] flex items-center justify-center font-barlow font-bold text-lg md:text-xl min-[2000px]:text-3xl transition-colors duration-300 hover:bg-transparent hover:text-base-500">
          <span className="relative z-10">GET SAUCE</span>
        </a>
      </div>

      {/* Mobile Menu / Hamburger Morph */}
      <div
        className={`mobile-menu mobile-hamburger fixed z-[1] overflow-hidden transition-colors duration-700 border-2 will-change-transform invisible opacity-0 pointer-events-none ${isMenuOpen ? 'bg-base-500 border-base-500 cursor-default !visible !opacity-100 !pointer-events-auto !translate-y-0' : 'bg-base-100 border-base-500 cursor-pointer group'}`}
        style={{
          top: '16px', right: '16px',
          width: '72px', height: '48px',
          borderRadius: '16px',
        }}
        onClick={() => !isMenuOpen && setIsMenuOpen(true)}
      >
        {/* Hamburger Lines (visible when closed) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'opacity-0 scale-50 rotate-90 pointer-events-none' : 'opacity-100 scale-100 rotate-0 group-hover:scale-110'}`}>
          <div className={`w-8 h-0.5 bg-base-500 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></div>
          <div className={`h-0.5 bg-base-500 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] self-end ${isMenuOpen ? '-translate-y-2 -rotate-45 w-8' : 'w-8 group-hover:w-4'}`}></div>
        </div>

        {/* Close Button (visible when open) */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
          className={`absolute top-3 right-3 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-2 border-base-100 rounded-xl flex justify-center items-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-base-100 active:scale-95 group ${isMenuOpen ? 'opacity-100 rotate-0 scale-100 delay-100' : 'opacity-0 -rotate-90 scale-50 pointer-events-none'}`}
        >
          {/* Existing X mark */}
          <div className="absolute flex justify-center items-center w-full h-full transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-full group-hover:scale-50 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:opacity-0">
            <div className="w-6 md:w-8 h-0.5 bg-base-100 group-hover:bg-base-500 rounded-full rotate-45 absolute transition-colors duration-200"></div>
            <div className="w-6 md:w-8 h-0.5 bg-base-100 group-hover:bg-base-500 rounded-full -rotate-45 absolute transition-colors duration-200"></div>
          </div>

          {/* New X mark */}
          <div className="absolute flex justify-center items-center w-full h-full -translate-x-full scale-50 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:scale-100 motion-reduce:-translate-x-0 motion-reduce:scale-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100">
            <div className="w-6 md:w-8 h-0.5 bg-base-100 group-hover:bg-base-500 rounded-full rotate-45 absolute transition-colors duration-200"></div>
            <div className="w-6 md:w-8 h-0.5 bg-base-100 group-hover:bg-base-500 rounded-full -rotate-45 absolute transition-colors duration-200"></div>
          </div>
        </button>

        {/* Inner Content Container */}
        <div className="flex flex-col w-full h-full pt-20 md:pt-24 px-6 pb-6 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center min-h-[min-content]">
            {['SHOP', 'WHOLESALE', 'ABOUT', 'CONTACT', 'FAQ'].map((text) => (
              <a
                key={text}
                href="#"
                className="mobile-menu-link opacity-0 border-b border-dashed border-base-400 block group relative"
              >
                {/* Dummy Hover Image (fixed, z-0) */}
                <div className={`absolute left-0 w-16 h-16 top-1/2 -translate-y-1/2 z-0 pointer-events-none transition-opacity duration-200 ${isMenuAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={`https://picsum.photos/seed/${text}/200/200`} alt={text} className="w-full h-full object-cover rounded-lg" />
                </div>

                {/* Text Container (Solid bg masking the image, shifts right to reveal) */}
                <div className={`relative z-10 py-3 md:py-4 transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4.5rem] ${isMenuAnimationComplete ? 'bg-base-500' : 'bg-transparent'}`}>
                  <div className="font-barlow font-bold text-[min(14vw,9vh)] md:text-[min(10vw,8vh)] uppercase text-base-100 overflow-hidden flex h-[1.2em]">
                    <div className="flex w-full">
                      {text.split('').map((char, charIndex) => (
                        <div
                          key={charIndex}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2 flex flex-col h-[2.4em]"
                          style={{ transitionDelay: `${charIndex * 20}ms` }}
                        >
                          <span className="h-[1.2em] leading-[1.2] flex items-center">{char === ' ' ? '\u00A0' : char}</span>
                          <span className="h-[1.2em] leading-[1.2] flex items-center text-transparent [-webkit-text-stroke:2px_theme('colors.base.100')]">{char === ' ' ? '\u00A0' : char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <a href="#" className="mobile-social opacity-0 flex-1 py-4 px-6 md:py-6 md:px-8 border-2 border-base-100 rounded-xl flex items-center justify-between font-barlow font-bold text-xl md:text-3xl text-base-100 hover:text-base-500 hover:-translate-y-1 active:scale-[0.97] active:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-base-100 translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 z-0"></div>
              <span className="relative z-10">INSTAGRAM</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-6">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="mobile-social opacity-0 flex-1 py-4 px-6 md:py-6 md:px-8 border-2 border-base-100 rounded-xl flex items-center justify-between font-barlow font-bold text-xl md:text-3xl text-base-100 hover:text-base-500 hover:-translate-y-1 active:scale-[0.97] active:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-base-100 translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 z-0"></div>
              <span className="relative z-10">FACEBOOK</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-6">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="hero relative w-full h-[100svh] bg-base-100 z-0">
        <div className="hero-header absolute top-[25%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[90%] lg:w-[55%] min-[2000px]:w-[50%] text-center">
          <h1 className="font-barlow font-semibold text-[clamp(2.8rem,10vw,9rem)] md:text-[clamp(3rem,6vw,9rem)] lg:text-[clamp(3.5rem,5.5vw,9rem)] leading-[0.85] uppercase m-0 text-base-500">
            <span className="text-transparent [-webkit-text-stroke:2px_theme('colors.base.500')]">THE ACADEMIC HUB</span> YOU<br />WILL RELY ON FOR<br />FLAWLESS SUBMISSIONS
          </h1>
        </div>

        <div className="hero-img absolute left-1/2 bottom-[-5%] md:bottom-[-5%] lg:bottom-[-15%] -translate-x-1/2 w-[55%] md:w-[45%] lg:w-[30%] min-[2000px]:w-[25%] min-w-[200px] md:min-w-[250px] aspect-square flex justify-center items-center">
          <div className="hero-img-bg absolute top-0 left-0 w-full h-full rounded-full bg-base-300 origin-center"></div>

          <div className="floating-element left-element absolute top-[15%] -left-[30%] w-[55%] md:w-[45%] max-w-none origin-center z-10 pointer-events-none">
            <img src={item6Svg} alt="" className="magnetic w-full h-full object-cover drop-shadow-xl pointer-events-auto" />
          </div>
          <div className="floating-element right-element absolute bottom-[15%] -right-[20%] w-[45%] md:w-[40%] max-w-none origin-center z-10 pointer-events-none">
            <img src={item7Svg} alt="" className="magnetic w-full h-full object-cover drop-shadow-xl pointer-events-auto" />
          </div>

          <img src={heroSvg} alt="" className="bottle-img absolute top-1/2 left-1/2 h-[140%] w-auto max-w-none origin-center drop-shadow-[0_45px_35px_rgba(0,0,0,0.25)]" />
        </div>

        <div className="hero-footer absolute top-[45%] md:top-[55%] lg:top-auto lg:bottom-8 left-0 w-full px-6 md:px-12 lg:px-16 flex justify-between items-center z-20 pointer-events-none">
          <p className="font-instrument font-medium uppercase m-0 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] text-base-500 text-sm md:text-base min-[2000px]:text-3xl">Welcome to</p>
          <p className="font-instrument font-medium uppercase m-0 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] text-base-500 text-sm md:text-base min-[2000px]:text-3xl">The Acadflow</p>
        </div>
      </section>

      {/* Spacer to enable scrolling for ScrollTrigger */}
      <div className="h-[30vh] bg-base-100"></div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-20 right-6 z-[100] px-4 py-2 bg-base-500 text-base-100 rounded-full font-instrument shadow-lg border border-base-400 hover:scale-105 transition-transform cursor-pointer"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default App;
