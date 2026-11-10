import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';

interface OnyxGymSplashProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel?: () => void;
}

export const OnyxGymSplash: React.FC<OnyxGymSplashProps> = ({
  isOpen,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 600); // Smooth luxury fade out transition
      }
    }, 35); // ~1.8 - 2.0s duration

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070A] select-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background with blurred Gym Hero Photo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/onyx_gym/hero_bg.jpg"
          alt="ONYX Gym"
          className="w-full h-full object-cover filter brightness-[0.35] blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-black/70 to-[#05070A]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Atmospheric Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Main Fullscreen Minimal & Luxury Content (NO CARD BOX) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        
        {/* Floating Realistic 3D Dumbbells Visual */}
        <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
          
          {/* Subtle Floor Shadow */}
          <div className="absolute bottom-2 w-32 h-5 bg-black/90 blur-lg rounded-full" />

          {/* Floating Dumbbell Container with Smooth Bobbing Animation */}
          <div className="relative animate-bounce duration-[3000ms] flex items-center justify-center">
            
            {/* Spinning Dumbbell Graphic */}
            <div className="w-36 h-36 flex items-center justify-center animate-[spin_8s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_10px_25px_rgba(245,158,11,0.4)]">
                <defs>
                  <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="35%" stopColor="#1E293B" />
                    <stop offset="70%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="45%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                  <linearGradient id="steelGrip" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                </defs>

                {/* Knurled Solid Steel Bar */}
                <rect x="32" y="47" width="36" height="6" rx="2" fill="url(#steelGrip)" stroke="#334155" strokeWidth="0.8" />
                <line x1="42" y1="47" x2="42" y2="53" stroke="#1E293B" strokeWidth="0.8" />
                <line x1="46" y1="47" x2="46" y2="53" stroke="#1E293B" strokeWidth="0.8" />
                <line x1="50" y1="47" x2="50" y2="53" stroke="#1E293B" strokeWidth="0.8" />
                <line x1="54" y1="47" x2="54" y2="53" stroke="#1E293B" strokeWidth="0.8" />
                <line x1="58" y1="47" x2="58" y2="53" stroke="#1E293B" strokeWidth="0.8" />

                {/* Left Weight Plates (Olympic Cast Iron & Gold) */}
                <rect x="18" y="28" width="8" height="44" rx="2.5" fill="url(#ironGrad)" stroke="#475569" strokeWidth="0.8" />
                <rect x="26" y="33" width="6" height="34" rx="2" fill="url(#goldPlate)" stroke="#92400E" strokeWidth="0.8" />
                <circle cx="16" cy="50" r="3.5" fill="#F59E0B" />

                {/* Right Weight Plates (Olympic Cast Iron & Gold) */}
                <rect x="68" y="33" width="6" height="34" rx="2" fill="url(#goldPlate)" stroke="#92400E" strokeWidth="0.8" />
                <rect x="74" y="28" width="8" height="44" rx="2.5" fill="url(#ironGrad)" stroke="#475569" strokeWidth="0.8" />
                <circle cx="84" cy="50" r="3.5" fill="#F59E0B" />
              </svg>
            </div>

            {/* Dumbbell Icon Center Badge */}
            <div className="absolute w-12 h-12 rounded-full bg-black/90 border border-amber-500/50 flex items-center justify-center shadow-xl">
              <Dumbbell className="w-6 h-6 text-amber-400" />
            </div>

          </div>

        </div>

        {/* Clean Luxury Title (Standard Gym Aesthetic, No Sci-Fi) */}
        <div className="space-y-1 mb-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            ONYX <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">GYM</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-slate-400 uppercase">
            Elite Fitness &amp; Athletic Club Operating System
          </p>
        </div>

        {/* Exact Core Motivation Quote (Seamless, Clean, Editorial) */}
        <div className="my-4 max-w-xl">
          <blockquote className="text-lg sm:text-2xl font-black italic tracking-tight text-amber-200 leading-snug drop-shadow-md">
            “Motivation doesn't mean results, it means your answer.”
          </blockquote>
          <p className="mt-2 text-xs font-extrabold tracking-widest text-amber-500/80 uppercase">
            — DISCIPLINE TODAY, A STRONGER TOMORROW —
          </p>
        </div>

        {/* Hairline Minimal Progress Bar */}
        <div className="w-64 sm:w-80 mt-6">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 mb-2">
            <span className="tracking-widest uppercase text-slate-400">Loading OS</span>
            <span className="text-amber-400">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-out rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
