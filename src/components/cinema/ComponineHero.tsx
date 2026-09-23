import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { RollingText } from '../ui/RollingText';
import { ComponineSacredGeometry } from './ComponineSacredGeometry';
import { ClientLogoMarquee } from './ClientLogoMarquee';

interface ComponineHeroProps {
  onNavigate?: (path: string) => void;
  onLaunchDemo?: () => void;
  onExploreClick?: () => void;
}

export const ComponineHero: React.FC<ComponineHeroProps> = ({
  onNavigate,
  onLaunchDemo,
  onExploreClick,
}) => {
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

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-transparent text-white select-none pt-24 sm:pt-28"
    >
      {/* 1. Sacred Geometry Concentric Rings & Gears Vector Layer */}
      <ComponineSacredGeometry className="absolute inset-0 w-full h-full z-5 pointer-events-none opacity-40 mix-blend-screen" />

      {/* 3. Interactive Spotlight Feather Glow on Hover */}
      {isHovering && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-6 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${cursor.x}px ${cursor.y}px, rgba(245, 158, 11, 0.12) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* 4. Main Hero Content Stage (Left-Aligned, Completely Clear of David on the Right) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center py-10 sm:py-16">
        
        {/* Top Status Capsule Pill Badge */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16130e]/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-grotesk font-semibold text-xs tracking-wider text-amber-300 uppercase">
              Book For Q3 2026
            </span>
            <span className="text-amber-500/50">•</span>
            <span className="font-mono text-[10px] text-amber-200/80 tracking-widest uppercase">
              Signatures Bill V1
            </span>
          </div>
        </div>

        {/* Hero Split Layout: Left Headline & Content + Right Open Space for David */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Massive Typography + Clean Editorial + Benchmark Chips + Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-9 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-[0.96] tracking-tight uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
              We Architect. <br />
              We Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold">
                We Launch Your
              </span> <br />
              Enterprise ERP
            </h1>

            {/* Editorial Description & Benchmark Chips (Shifted to Left Side!) */}
            <div className="space-y-3.5 pt-1">
              <p className="font-grotesk text-sm sm:text-base font-normal text-neutral-200 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <strong className="text-white font-semibold">Trusted by 500+ manufacturers, textile giants, and trading firms.</strong> All-in-one desktop ERP powered by offline SQLite 3.45 engine. Fast, end-to-end, zero drama.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-neutral-200 pt-1">
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white font-semibold">0ms Query</strong> Local Engine</span>
                </div>
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white font-semibold">DirectX 12</strong> 120 FPS Blit</span>
                </div>
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white font-semibold">Panchang</strong> 2026–2040</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary Action Button: Launch Live Simulator with Rolling Text */}
              <button
                onClick={() => {
                  if (onLaunchDemo) onLaunchDemo();
                  else if (onNavigate) onNavigate('/demo');
                }}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-grotesk font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-200"
              >
                {/* Halftone background texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] animate-halftone" />
                
                <Zap className="w-4 h-4 text-black fill-black animate-pulse" />
                <RollingText text="Launch Live Demo" charClassName="font-extrabold text-black" />
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary Action Button: Explore Works */}
              <button
                onClick={() => {
                  if (onExploreClick) onExploreClick();
                  else {
                    const el = document.getElementById('works') || document.getElementById('featured-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group inline-flex items-center gap-3 px-5 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 text-neutral-200 hover:text-white transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <RollingText text="Explore Featured Works" charClassName="font-semibold text-xs tracking-wider" />
              </button>
            </div>

          </div>

          {/* Right Column: 100% Open Space so David on the right has completely unobstructed view! */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 pointer-events-none" />

        </div>

      </div>

      {/* 5. Bottom Infinite Client & Technology Partner Marquee */}
      <ClientLogoMarquee />

    </section>
  );
};
