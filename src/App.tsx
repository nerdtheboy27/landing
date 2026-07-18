import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);
function App() {
  const [isDark, setIsDark] = useState(false);

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
      gsap.set(".nav-word-wrapper", { yPercent: 100 });
      gsap.set(heading.chars, { y: 50, opacity: 0, scale: 0.5 });
      gsap.set(footerText.lines, { yPercent: 100 });
      gsap.set(".bottle-img", { xPercent: -50, yPercent: 50, rotation: 15, scale: 0.5, opacity: 0 });

      // Items initial scale (since Tailwind scale-0 does it via standard transform, let GSAP handle it for consistency)
      gsap.set(".item", { xPercent: -50, yPercent: -50, scale: 0 });

      // Hero image bg initial scale
      gsap.set(".hero-img-bg", { scale: 0 });

      const itemTargets = [
        { x: "-20vw", y: "-30vh", rotation: -20 },
        { x: "25vw", y: "-20vh", rotation: 15 },
        { x: "-32vw", y: "30vh", rotation: 12 },
        { x: "15vw", y: "25vh", rotation: -15 },
      ];

      const EXIT_DISTANCE = 3.5;
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
        y: "-200vh", // large negative value to ensure it goes completely off screen
        scale: 2.3,
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
            scale: 2.3,
            duration: 1,
            ease: "power3.inOut",
          },
          "<"
        );
      });

      tl.set(".preloader", { display: "none" });

      tl.to(
        ".nav-logo img",
        { scale: 1, duration: 1, ease: "power3.out" },
        "<"
      );

      tl.to(
        ".nav-word-wrapper",
        { yPercent: 0, duration: 1, stagger: 0.05, ease: "power3.out" },
        "<0.2"
      );

      tl.to(
        ".hero-img-bg",
        {
          scale: 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.to(".hero-img-bg", {
              scale: 1.05,
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
          yPercent: -50,
          rotation: 8,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(".bottle-img", {
              y: "-=20",
              rotation: "-=3",
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
        heading.chars,
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" },
        "<0.2"
      );

      tl.to(
        footerText.lines,
        { yPercent: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "<"
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full min-h-screen overflow-hidden bg-base-100 text-base-500">
      {/* Preloader */}
      <div className="preloader fixed w-full h-[100svh] text-base-100 overflow-hidden z-[2]">
        <div className="preloader-bg absolute w-full h-[100svh] origin-center bg-base-500"></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-200" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-300" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-400" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>
        <div className="preloader-revealer absolute w-full h-[100svh] origin-center bg-base-500" style={{ clipPath: 'circle(0% at 50% 50%)' }}></div>

        <div className="items absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="item absolute top-1/2 left-1/2 w-[15vw] -translate-x-1/2 -translate-y-1/2"><img src="/item1.png" alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[15vw] -translate-x-1/2 -translate-y-1/2"><img src="/item2.png" alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[15vw] -translate-x-1/2 -translate-y-1/2"><img src="/item3.png" alt="" className="w-full h-full object-cover" /></div>
          <div className="item absolute top-1/2 left-1/2 w-[15vw] -translate-x-1/2 -translate-y-1/2"><img src="/item4.png" alt="" className="w-full h-full object-cover" /></div>
        </div>

        <div className="preloader-logo absolute top-1/2 left-1/2 w-[10vw] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 will-change-transform">
          <img src="/logo.svg" alt="" className="w-full h-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-3 flex justify-between items-start z-[1]">
        <div className="nav-logo">
          <img src="/logo.svg" alt="" className="w-28 origin-top-left" />
        </div>
        <div className="nav-items flex gap-10 items-center">
          {['SHOP', 'WHOLESALE', 'ABOUT', 'CONTACT', 'FAQ', 'CART(0)'].map((text) => (
            <a key={text} href="#" className="font-barlow font-semibold text-[2.5rem] uppercase no-underline group overflow-hidden flex h-[1em] text-base-100">
              <div className="nav-word-wrapper flex">
                {text.split('').map((char, i) => (
                  <div
                    key={i}
                    className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2 flex flex-col h-[2em]"
                    style={{ transitionDelay: `${i * 25}ms` }}
                  >
                    <span className="h-[1em] leading-[1] flex items-center">{char === ' ' ? '\u00A0' : char}</span>
                    <span className="h-[1em] leading-[1] flex items-center text-transparent [-webkit-text-stroke:1px_theme('colors.base.100')]">{char === ' ' ? '\u00A0' : char}</span>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero relative w-full h-[100svh] bg-base-500 overflow-hidden z-0">
        <div className="hero-header absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] text-center">
          <h1 className="font-barlow font-semibold text-[clamp(3rem,6vw,9rem)] leading-[0.85] uppercase m-0 text-base-100">
            <span className="text-transparent [-webkit-text-stroke:2px_theme('colors.base.100')]">The table you </span>
            will keep coming back to every week
          </h1>
        </div>

        <div className="hero-img absolute left-1/2 bottom-[-15%] -translate-x-1/2 w-[30%] min-w-[250px] aspect-square flex justify-center items-center">
          <div className="hero-img-bg absolute top-0 left-0 w-full h-full rounded-full bg-base-300 origin-center"></div>
          <img src="/bottle.png" alt="" className="bottle-img absolute top-1/2 left-1/2 h-[140%] w-auto max-w-none origin-center" />
        </div>

        <div className="hero-footer absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-0">
          <p className="font-instrument font-medium uppercase m-0 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] text-base-100">Locally Sourced</p>
          <p className="font-instrument font-medium uppercase m-0 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] text-base-100">Always Welcome</p>
        </div>
      </section>

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
