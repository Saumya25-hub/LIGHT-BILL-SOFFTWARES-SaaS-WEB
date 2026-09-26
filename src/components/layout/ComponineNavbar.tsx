import React, { useState, useEffect } from 'react';
import { Home, Layers, Box, Zap, CreditCard, MessageSquare, MoreVertical } from 'lucide-react';
import { RollingText } from '../ui/RollingText';

interface ComponineNavbarProps {
  onNavigate: (path: string) => void;
  onLaunchDemo?: () => void;
  currentPath?: string;
}

export const ComponineNavbar: React.FC<ComponineNavbarProps> = ({
  onNavigate,
  onLaunchDemo,
  currentPath = '/',
}) => {
  const [activeSection, setActiveSection] = useState<'index' | 'works' | 'modules' | 'demo' | 'pricing' | 'contact'>('index');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'index', label: 'Index', icon: Home, action: () => { setActiveSection('index'); onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'works', label: 'Works', icon: Layers, action: () => { 
      setActiveSection('works'); 
      const el = document.getElementById('works') || document.getElementById('featured-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } },
    { id: 'modules', label: 'Modules', icon: Box, action: () => { setActiveSection('modules'); onNavigate('/product'); } },
    { id: 'demo', label: 'Live Demo', icon: Zap, isSpecial: true, action: () => { 
      if (onLaunchDemo) onLaunchDemo();
      else onNavigate('/demo'); 
    } },
    { id: 'pricing', label: 'Pricing', icon: CreditCard, action: () => { setActiveSection('pricing'); onNavigate('/pricing'); } },
    { id: 'contact', label: 'Contact', icon: MessageSquare, action: () => { 
      const el = document.getElementById('contact') || document.getElementById('footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } },
  ];

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 w-max max-w-[96vw] select-none">
      
      {/* 1. Left Circular Brand Emblem Button */}
      <button 
        onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0e0d0b]/90 backdrop-blur-2xl border border-amber-500/30 flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.8)] hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Home"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* Outer glowing ring */}
          <div className="absolute inset-0 rounded-full border border-amber-400/30 border-dashed animate-spin-slow group-hover:border-amber-300" />
          <span className="font-grotesk font-black text-xs sm:text-sm text-amber-300 group-hover:text-white transition-colors">
            SB
          </span>
        </div>
      </button>

      {/* 2. Center Frosted Capsule Pill Menu with Rolling Text */}
      <div className={`flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full bg-[#0d0c0a]/85 backdrop-blur-2xl border transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.85)] ${
        scrolled ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-white/10'
      }`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id && currentPath === '/';

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`group relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-grotesk font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                  : item.isSpecial
                  ? 'bg-amber-400/10 text-amber-300 hover:text-white hover:bg-amber-500/25 border border-amber-400/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${
                item.isSpecial ? 'text-amber-400 animate-pulse' : 'text-neutral-400 group-hover:text-amber-300'
              }`} />
              
              <span className="hidden sm:inline-block">
                <RollingText text={item.label} charClassName="font-medium" />
              </span>

              {/* Special Live indicator dot for Live Demo */}
              {item.isSpecial && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden md:inline-block" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Right Halftone Masked Capsule CTA Button */}
      <button
        onClick={() => {
          if (onLaunchDemo) onLaunchDemo();
          else onNavigate('/demo');
        }}
        className="group relative overflow-hidden flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-black font-grotesk font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40 shrink-0"
      >
        {/* Halftone Mask Layer */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] animate-halftone" />
        
        <Zap className="w-3.5 h-3.5 text-black fill-black animate-pulse" />
        <span className="relative z-10 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
          <span className="hidden sm:inline">
            <RollingText text="Launch Simulator" charClassName="font-extrabold text-black" />
          </span>
          <span className="sm:hidden font-extrabold text-black">
            Demo
          </span>
        </span>
      </button>

      {/* 4. Far Right 3-Dots Circular Action Toggle */}
      <button
        onClick={() => onNavigate('/download')}
        title="Download Desktop Software"
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0c0a]/90 backdrop-blur-2xl border border-white/15 flex items-center justify-center text-neutral-400 hover:text-white hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-pointer group"
      >
        <MoreVertical className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>

    </nav>
  );
};
