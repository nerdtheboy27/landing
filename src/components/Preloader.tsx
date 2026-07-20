import item1Svg from '../assets/item1.svg';
import item2Svg from '../assets/item2.svg';
import item3Svg from '../assets/item3.svg';
import item4Svg from '../assets/item4.svg';
import { AcadFlowLogo } from '../AcadFlowLogo';

export function Preloader() {
  return (
    <div className="preloader fixed w-full h-[100svh] text-base-500 overflow-hidden z-[99]">
      <div className="preloader-bg absolute w-full h-[100svh] origin-center bg-base-100"></div>
      {/* Optimized Reveal Circles using scale instead of clip-path */}
      <div className="preloader-revealer absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full origin-center bg-base-200 scale-0 will-change-transform"></div>
      <div className="preloader-revealer absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full origin-center bg-base-300 scale-0 will-change-transform"></div>
      <div className="preloader-revealer absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full origin-center bg-base-400 scale-0 will-change-transform"></div>
      <div className="preloader-revealer absolute top-1/2 left-1/2 w-[150vmax] h-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full origin-center bg-base-100 scale-0 will-change-transform"></div>

      <div className="items absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="item absolute top-1/2 left-1/2 w-[45vw] sm:w-[40vw] md:w-[32vw] lg:w-[22vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"><img src={item1Svg} alt="" className="w-full h-full object-cover will-change-transform" /></div>
        <div className="item absolute top-1/2 left-1/2 w-[45vw] sm:w-[40vw] md:w-[32vw] lg:w-[22vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"><img src={item2Svg} alt="" className="w-full h-full object-cover will-change-transform" /></div>
        <div className="item absolute top-1/2 left-1/2 w-[45vw] sm:w-[40vw] md:w-[32vw] lg:w-[22vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"><img src={item3Svg} alt="" className="w-full h-full object-cover will-change-transform" /></div>
        <div className="item absolute top-1/2 left-1/2 w-[45vw] sm:w-[40vw] md:w-[32vw] lg:w-[22vw] -translate-x-1/2 -translate-y-1/2 will-change-transform"><img src={item4Svg} alt="" className="w-full h-full object-cover will-change-transform" /></div>
      </div>

      <div className="preloader-logo absolute top-1/2 left-1/2 w-[25vw] md:w-[15vw] lg:w-[15vw] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 will-change-transform">
        <AcadFlowLogo className="w-full h-auto" />
      </div>
    </div>
  );
}
