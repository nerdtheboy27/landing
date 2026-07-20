import item6Svg from '../assets/item6.svg';
import item7Svg from '../assets/item7.svg';
import heroSvg from '../assets/hero2.svg';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import grinningLottie from '../assets/lotties/grinning.lottie';

export function Hero() {
  return (
    <>
      <section className="hero relative w-full h-[100svh] bg-base-100 z-10">
        <div className="hero-header absolute top-[25%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-8 lg:px-12 text-center flex flex-col items-center">
          <div className="relative inline-block">
            <h1 className="font-barlow font-normal text-[clamp(2.5rem,9vw,9rem)] md:text-[clamp(3rem,6vw,9rem)] lg:text-[clamp(3.5rem,5.5vw,9rem)] leading-[0.85] uppercase m-0 text-base-500">
              <span className="text-transparent [-webkit-text-stroke:2px_theme('colors.base.500')]">THE ACADEMIC HUB</span> YOU<br />WILL RELY ON FOR<br />FLAWLESS SUBMISSIONS
            </h1>

            {/* Grinning Lottie Sticker */}
            <div className="absolute -top-10 -right-4 md:-top-16 md:-right-16 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rotate-[15deg] z-20 pointer-events-none drop-shadow-xl">
              <div className="lottie-sticker w-full h-full">
                <DotLottieReact src={grinningLottie} loop autoplay />
              </div>
            </div>
          </div>
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
    </>
  );
}
