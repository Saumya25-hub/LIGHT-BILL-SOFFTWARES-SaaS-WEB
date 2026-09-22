import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onNavigate?: (path: string) => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onExploreClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle normalized mouse coordinates for gentle parallax
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <section className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden bg-black select-none">
      {/* Background Image: High-res Cosmic David with Black Hole Accretion Disk */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out scale-[1.02]"
        style={{
          backgroundImage: `url('/assets/hero_cosmic_david.png')`,
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
      />

      {/* Atmospheric Soft Feathered Gradient on the Left Side
          Large, feathered, subtle shadow fading toward center for maximum legibility */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 85% at 15% 50%, rgba(2, 2, 8, 0.88) 0%, rgba(3, 3, 12, 0.65) 45%, rgba(5, 5, 20, 0.25) 75%, transparent 100%)'
        }}
      />

      {/* Extra Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between py-8 sm:py-10">
        
        {/* Top Navigation Bar */}
        <header className="w-full flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate && onNavigate('/')}
            className="cursor-pointer group flex items-center gap-3"
          >
            <span className="font-display font-black tracking-widest text-lg sm:text-2xl text-white group-hover:text-purple-300 transition-colors uppercase">
              S TOM’S
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 font-mono">
              STUDIO
            </span>
          </div>

          {/* Nav Links */}
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

        {/* Center / Left Main Headline Content */}
        <div className="my-auto max-w-xl sm:max-w-2xl py-6 space-y-6 sm:space-y-8">
          
          {/* Subtitle Eyebrow with Vertical Line */}
          <div className="flex items-center gap-3">
            <div className="w-[2px] h-5 bg-gradient-to-b from-purple-400 to-indigo-600 rounded-full" />
            <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] text-slate-300 uppercase">
              DIGITAL ARTIST / CREATIVE TECHNOLOGIST
            </p>
          </div>

          {/* Master Heading */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white drop-shadow-2xl">
            Where Creativity <br />
            Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 glow-lavender">
              Technology
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-slate-300/90 text-sm sm:text-base font-light leading-relaxed max-w-lg">
            Where creativity meets technology and elevate experienced formats — architecting next-generation commercial suites, immersive visual tools, and high-performance software.
          </p>

          {/* Circular-Arrow CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => scrollToSection('works')}
              className="group inline-flex items-center gap-4 text-white hover:text-purple-200 transition-all cursor-pointer"
            >
              {/* Circular Icon with Arrow */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-purple-600/30 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md group-hover:blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Button Text */}
              <span className="font-display text-sm sm:text-base font-semibold tracking-wide">
                View My Work
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator on Left, Rotated Category Label on Right */}
        <div className="w-full flex items-end justify-between text-slate-400 text-xs font-mono">
          
          {/* Bottom Left: SCROLL TO EXPLORE */}
          <button 
            onClick={() => scrollToSection('process')}
            className="group flex flex-col items-start gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-medium text-slate-300">
              SCROLL TO EXPLORE
            </span>
            <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Bottom / Side Right: Vertical Rotated Label */}
          <div className="hidden md:flex items-center gap-3 select-none">
            <div className="w-12 h-[1px] bg-slate-700" />
            <span className="text-[11px] tracking-[0.3em] font-mono text-slate-400 uppercase">
              AI / 3D / MOTION / WEB
            </span>
          </div>
        </div>

      </div>

      {/* Floating Vertical Label on Far Right matching reference */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="rotate-90 origin-right text-[11px] tracking-[0.35em] font-mono text-slate-400/80 uppercase">
          AI / 3D / MOTION / WEB
        </div>
      </div>
    </section>
  );
};
