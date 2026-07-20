import { AcadFlowLogo } from '../AcadFlowLogo';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: (e: React.MouseEvent) => void;
  isMenuOpen: boolean;
}

export function Header({ isDark, toggleTheme, isMenuOpen }: HeaderProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 lg:p-3 flex justify-between items-start z-[100]">
        <div className="nav-logo relative z-[100] flex items-center gap-1.5 md:gap-2 lg:gap-3 origin-top-left">
          <AcadFlowLogo className="w-8 sm:w-10 md:w-12 lg:w-16 min-[2000px]:w-24" />
          <div className="flex flex-col -space-y-1 lg:-space-y-2 mt-1">
            <span className="font-barlow font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl min-[2000px]:text-5xl tracking-tight text-base-300">
              ACAD<span className="text-base-500">FLOW</span>
            </span>
            <span className="font-barlow font-medium text-[0.45rem] sm:text-[0.55rem] md:text-[0.65rem] lg:text-[0.75rem] min-[2000px]:text-base tracking-[0.15em] text-gray-500 uppercase">
              Submissions made easy
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-items hidden lg:flex gap-10 min-[2000px]:gap-24 items-center">
          {['SHOP', 'WHOLESALE', 'ABOUT', 'CONTACT', 'FAQ'].map((text) => (
            <a key={text} href="#" onClick={(e) => e.preventDefault()} className="font-barlow font-normal text-[2.5rem] min-[2000px]:text-[4.5rem] uppercase no-underline group overflow-hidden flex h-[1.2em] text-base-500 active:scale-[0.97] transition-transform duration-150 ease-out">
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

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="nav-word-wrapper relative flex items-center justify-center h-[48px] w-[48px] min-[2000px]:h-[72px] min-[2000px]:w-[72px] rounded-full hover:bg-base-200/50 transition-all duration-150 ease-out active:scale-[0.90] text-base-500 cursor-pointer pointer-events-auto"
            aria-label="Toggle Theme"
          >
            <Sun className={`w-7 h-7 min-[2000px]:w-10 min-[2000px]:h-10 transition-transform duration-500 ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
            <Moon className={`absolute w-7 h-7 min-[2000px]:w-10 min-[2000px]:h-10 transition-transform duration-500 ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
          </button>

          {/* Main Portal Button */}
          <a href="#" onClick={(e) => e.preventDefault()} className="nav-word-wrapper relative overflow-hidden group pointer-events-auto bg-base-500 border-2 border-base-500 text-base-100 rounded-[16px] px-6 h-[48px] min-[2000px]:h-[72px] flex items-center justify-center font-barlow font-normal text-[1.5rem] min-[2000px]:text-[3rem] transition-all duration-300 ease-out hover:bg-transparent active:scale-[0.97] active:duration-150">
            <div className="flex h-[1.2em] overflow-hidden">
              {"MAIN PORTAL".split('').map((char, i) => (
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
        </div>
      </nav>

      {/* Floating Buttons */}
      <div className={`floating-nav-buttons fixed z-[1] top-[16px] right-[84px] sm:right-[92px] md:right-[96px] min-[2000px]:right-[140px] flex items-center gap-1 sm:gap-2 min-[2000px]:gap-4 invisible opacity-0 pointer-events-none lg:-translate-y-5 ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        {/* Theme Toggle Button (Floating/Mobile) */}
        <button 
          onClick={toggleTheme}
          className="relative flex items-center justify-center h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] md:h-[48px] md:w-[48px] min-[2000px]:h-[72px] min-[2000px]:w-[72px] transition-all duration-150 ease-out text-base-500 hover:text-base-400 active:scale-[0.90] cursor-pointer pointer-events-auto"
          aria-label="Toggle Theme"
        >
          <Sun className={`w-4 h-4 sm:w-5 sm:h-5 min-[2000px]:w-8 min-[2000px]:h-8 transition-transform duration-500 ${isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
          <Moon className={`absolute w-4 h-4 sm:w-5 sm:h-5 min-[2000px]:w-8 min-[2000px]:h-8 transition-transform duration-500 ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
        </button>

        <a href="#" onClick={(e) => e.preventDefault()} className="floating-btn get-sauce relative overflow-hidden group pointer-events-auto bg-base-500 border-2 border-base-500 text-base-100 rounded-[12px] md:rounded-[16px] px-2 sm:px-4 md:px-6 min-[2000px]:px-10 h-[36px] sm:h-[40px] md:h-[48px] min-[2000px]:h-[72px] flex items-center justify-center font-barlow font-normal text-sm sm:text-base md:text-xl min-[2000px]:text-3xl transition-all duration-300 ease-out hover:bg-transparent hover:text-base-500 active:scale-[0.95] active:duration-150">
          <span className="relative z-10">GET SAUCE</span>
        </a>
      </div>
    </>
  );
}
