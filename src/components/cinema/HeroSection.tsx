import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CurvedCodeWaves } from './CurvedCodeWaves';

interface HeroSectionProps {
  onNavigate?: (path: string) => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onExploreClick }) => {
  // Cursor position for spotlight reveal and 3D parallax
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      targetX = -1000;
      targetY = -1000;
    };

    // Smooth lerp loop for spotlight cursor
    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setCursor({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onExploreClick) {
      onExploreClick();
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden bg-transparent select-none"
    >
      {/* 2. Base Atmospheric Backdrop Artwork (Pristine David, Black Hole & Clean Starry Space) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90 mix-blend-screen pointer-events-none transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('/assets/hero_cosmic_david.png')`,
        }}
      />

      {/* 2b. DYNAMIC 3D FLOWING CURVED CODE WAVES
          Replaces the static stuck code with living, undulating cyber streams flowing through space */}
      <CurvedCodeWaves className="z-10" />

      {/* 3. Cursor-Following Character Reveal Spotlight Layer (260px radius feathered mask) */}
      {isHovering && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-15 transition-opacity duration-300"
          style={{
            backgroundImage: `url('/assets/hero_cosmic_david.png')`,
            WebkitMaskImage: `radial-gradient(circle 260px at ${cursor.x}px ${cursor.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)`,
            maskImage: `radial-gradient(circle 260px at ${cursor.x}px ${cursor.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)`,
            filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.4)) contrast(1.15)',
          }}
        />
      )}

      {/* 4. Atmospheric Soft Feathered Gradient on the Left Side
          Keeps original background visible while ensuring typography is razor-sharp */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse 70% 85% at 15% 50%, rgba(3, 2, 12, 0.88) 0%, rgba(4, 3, 16, 0.65) 45%, rgba(6, 5, 24, 0.25) 75%, transparent 100%)'
        }}
      />

      {/* 5. Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to top, rgba(3,2,12,0.95) 0%, transparent 25%, transparent 75%, rgba(3,2,12,0.7) 100%)'
        }}
      />

      {/* 6. Main Interactive UI Layer */}
      <div className="relative z-30 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between py-8 sm:py-10">
        
        {/* Top Navigation Bar */}
        <header className="w-full flex items-center justify-between">
          <div 
            onClick={() => onNavigate && onNavigate('/')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <span className="font-display font-black tracking-widest text-lg sm:text-2xl text-white group-hover:text-purple-300 transition-colors uppercase">
              S TOM’S
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 font-mono">
              3D STUDIO
            </span>
          </div>

          <nav className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium tracking-wider">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-white hover:text-purple-300 transition-colors border-b-2 border-purple-400 pb-0.5"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('process')} 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('works')} 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('experiments')} 
              className="text-slate-300 hover:text-white transition-colors hidden sm:inline-block"
            >
              Playground
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>
        </header>

        {/* Center / Left Headline Content */}
        <div className="my-auto max-w-xl sm:max-w-2xl py-6 space-y-6 sm:space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-[2px] h-5 bg-gradient-to-b from-purple-400 to-indigo-600 rounded-full" />
            <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] text-slate-300 uppercase">
              DIGITAL ARTIST / CREATIVE TECHNOLOGIST
            </p>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white drop-shadow-2xl">
            Where Creativity <br />
            Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 glow-lavender">
              Technology
            </span>
          </h1>

          <p className="text-slate-300/90 text-sm sm:text-base font-light leading-relaxed max-w-lg">
            Where creativity meets technology and elevate experienced formats — architecting next-generation commercial suites, 3D WebGL spatial interfaces, and high-performance software.
          </p>

          <div className="pt-2">
            <button
              onClick={() => scrollToSection('works')}
              className="group inline-flex items-center gap-4 text-white hover:text-purple-200 transition-all cursor-pointer"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-purple-600/30 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <span className="font-display text-sm sm:text-base font-semibold tracking-wide">
                View My Work
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator on Left, Rotated Category Label on Right */}
        <div className="w-full flex items-end justify-between text-slate-400 text-xs font-mono">
          <button 
            onClick={() => scrollToSection('process')}
            className="group flex flex-col items-start gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-medium text-slate-300">
              SCROLL TO EXPLORE
            </span>
            <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="hidden md:flex items-center gap-3 select-none">
            <div className="w-12 h-[1px] bg-slate-700" />
            <span className="text-[11px] tracking-[0.3em] font-mono text-slate-400 uppercase">
              AI / 3D / MOTION / WEB
            </span>
          </div>
        </div>

      </div>

      {/* Floating Vertical Label on Far Right */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <div className="rotate-90 origin-right text-[11px] tracking-[0.35em] font-mono text-slate-400/80 uppercase">
          AI / 3D / MOTION / WEB
        </div>
      </div>
    </section>
  );
};
