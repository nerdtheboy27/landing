interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuAnimationComplete: boolean;
}

export function MobileMenu({ isMenuOpen, setIsMenuOpen, isMenuAnimationComplete }: MobileMenuProps) {
  return (
    <div
      className={`mobile-menu mobile-hamburger fixed z-[1] overflow-hidden transition-colors duration-700 border-2 will-change-transform invisible opacity-0 pointer-events-none w-[64px] sm:w-[72px] h-[36px] sm:h-[40px] md:h-[48px] rounded-[12px] md:rounded-[16px] ${isMenuOpen ? 'bg-base-500 border-base-500 cursor-default !visible !opacity-100 !pointer-events-auto !translate-y-0' : 'bg-base-100 border-base-500 cursor-pointer group'}`}
      style={{
        top: '16px', right: '16px',
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
              onClick={(e) => e.preventDefault()}
              className="mobile-menu-link opacity-0 border-b border-dashed border-base-400 block group relative"
            >
              {/* Dummy Hover Image (fixed, z-0) */}
              <div className={`absolute left-0 w-16 h-16 top-1/2 -translate-y-1/2 z-0 pointer-events-none transition-opacity duration-200 ${isMenuAnimationComplete ? 'opacity-100' : 'opacity-0'}`}>
                <img src={`https://picsum.photos/seed/${text}/200/200`} alt={text} className="w-full h-full object-cover rounded-lg" />
              </div>

              {/* Text Container (Solid bg masking the image, shifts right to reveal) */}
              <div className={`relative z-10 py-3 md:py-4 transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4.5rem] ${isMenuAnimationComplete ? 'bg-base-500' : 'bg-transparent'}`}>
                <div className="font-barlow font-normal text-[min(14vw,9vh)] md:text-[min(10vw,8vh)] uppercase text-base-100 overflow-hidden flex h-[1.2em]">
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
          <a href="#" onClick={(e) => e.preventDefault()} className="mobile-social opacity-0 flex-1 py-4 px-6 md:py-6 md:px-8 border-2 border-base-100 rounded-xl flex items-center justify-between font-barlow font-normal text-xl md:text-3xl text-base-100 hover:text-base-500 hover:-translate-y-1 active:scale-[0.97] active:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-base-100 translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 z-0"></div>
            <span className="relative z-10">INSTAGRAM</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-6">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className="mobile-social opacity-0 flex-1 py-4 px-6 md:py-6 md:px-8 border-2 border-base-100 rounded-xl flex items-center justify-between font-barlow font-normal text-xl md:text-3xl text-base-100 hover:text-base-500 hover:-translate-y-1 active:scale-[0.97] active:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-base-100 translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 z-0"></div>
            <span className="relative z-10">FACEBOOK</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-8 md:h-8 relative z-10 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:rotate-6">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
