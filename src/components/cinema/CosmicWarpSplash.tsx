import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CosmicWarpSplashProps {
  isOpen: boolean;
  onComplete: () => void;
  targetPath?: string;
  onCancel?: () => void;
}

export const CosmicWarpSplash: React.FC<CosmicWarpSplashProps> = ({
  isOpen,
  onComplete,
  onCancel,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'entering' | 'loading' | 'exiting'>('idle');

  // Componine luxury architectural typography cycling sequence
  const brandWords = [
    'OFFLINE-FIRST ARCHITECTURE',
    '0ms SQLITE 3.45 ENGINE',
    'GST BILLING & THERMAL POS',
    'FACTORY EMS & PAYROLL',
    'SIGNATURES BILL — ERP',
  ];

  const totalSlices = 14;

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setProgress(0);
      setActiveWordIndex(0);
      return;
    }

    setPhase('entering');
    setProgress(0);

    // After slices enter, start smooth rapid progress
    const enterTimer = setTimeout(() => {
      setPhase('loading');
    }, 150);

    // Word cycling timer
    const wordInterval = setInterval(() => {
      setActiveWordIndex((prev) => (prev < brandWords.length - 1 ? prev + 1 : prev));
    }, 280);

    // Progress counter: rapid, silky non-linear count to 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const delta = prev < 40 ? 6 : prev < 75 ? 8 : prev < 95 ? 5 : 2;
        return Math.min(100, prev + delta);
      });
    }, 38);

    return () => {
      clearTimeout(enterTimer);
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  // When progress reaches 100%, trigger luxury exit wipe
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      const exitTimer = setTimeout(() => {
        setPhase('exiting');
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 550);
        return () => clearTimeout(completeTimer);
      }, 200);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, phase, onComplete]);

  if (!isOpen && phase === 'idle') return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] pointer-events-auto overflow-hidden select-none"
      style={{
        backgroundColor: phase === 'exiting' ? 'transparent' : 'rgba(7, 6, 5, 0.98)',
      }}
    >
      {/* 1. Componine Vertical Shutter Slices Curtain Container */}
      <div className="absolute inset-0 w-full h-full flex pointer-events-none z-10">
        {Array.from({ length: totalSlices }).map((_, idx) => {
          // Staggered slice transitions
          const delayMs = phase === 'entering' 
            ? idx * 18 
            : phase === 'exiting' 
            ? idx * 24 
            : 0;

          // Transform logic
          const translateY = phase === 'entering' || phase === 'loading'
            ? 'translateY(0%)'
            : phase === 'exiting'
            ? 'translateY(-105%)'
            : 'translateY(105%)';

          return (
            <div
              key={idx}
              className="flex-1 h-full relative"
              style={{
                background: 'linear-gradient(180deg, #0e0b08 0%, #1a140d 45%, #15100a 80%, #0a0806 100%)',
                borderRight: '1px solid rgba(245, 158, 11, 0.08)',
                transform: translateY,
                transition: `transform 550ms cubic-bezier(0.77, 0, 0.175, 1) ${delayMs}ms`,
                willChange: 'transform',
              }}
            >
              {/* Subtle vertical hairline golden sheen */}
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* 2. Top & Right Minimalist Architectural Grid Lines */}
      <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 ${
        phase === 'loading' ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Horizontal Hairline at bottom-third */}
        <div className="absolute bottom-24 sm:bottom-28 left-0 right-0 h-[1px] bg-white/[0.08]" />
        
        {/* Vertical Hairline at right-third */}
        <div className="absolute top-0 bottom-0 right-16 sm:right-28 w-[1px] bg-white/[0.08]" />
      </div>

      {/* 3. Luxury Center Kinetic Typography Showcase */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none w-full max-w-4xl px-6 transition-all duration-400 ${
        phase === 'loading' 
          ? 'opacity-100 scale-100' 
          : phase === 'exiting'
          ? 'opacity-0 -translate-y-12'
          : 'opacity-0 scale-95'
      }`}>
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          ENTERPRISE DESKTOP SANDBOX
        </div>

        {/* Dynamic Rolling Headline */}
        <div className="h-14 sm:h-20 overflow-hidden relative flex items-center justify-center">
          <h2 className="font-grotesk font-black text-2xl sm:text-4xl md:text-5xl text-[#f0efea] tracking-tight uppercase drop-shadow-2xl transition-all duration-300">
            {brandWords[activeWordIndex]}
          </h2>
        </div>

        {/* Technical Architecture Specs Pill */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-neutral-400">
          <span className="text-amber-200/90 font-medium">SQLite 3.45 WAL</span>
          <span>•</span>
          <span className="text-amber-200/90 font-medium">DirectX 12 Hardware Accel</span>
          <span>•</span>
          <span className="text-amber-200/90 font-medium">Surat Textile Schema</span>
        </div>
      </div>

      {/* 4. Componine Bottom-Right Minimalist Luxury Percentage Counter */}
      <div className={`absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-30 flex flex-col items-end pointer-events-none transition-all duration-300 ${
        phase === 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-baseline gap-1">
          <span className="font-grotesk font-extralight text-5xl sm:text-7xl text-[#f0efea] tracking-tighter tabular-nums drop-shadow-lg">
            {progress}
          </span>
          <span className="font-grotesk font-light text-2xl sm:text-3xl text-amber-400/80">
            %
          </span>
        </div>
        <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mt-1">
          Synchronizing Workspace
        </div>
      </div>

      {/* 5. Bottom-Left Trademark & System Verification */}
      <div className={`absolute bottom-8 sm:bottom-12 left-6 sm:left-12 z-30 pointer-events-none transition-all duration-300 ${
        phase === 'loading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center gap-2 text-xs font-grotesk font-semibold text-white tracking-wider uppercase">
          <span>SIGNATURES BILL V1</span>
          <span className="text-amber-400 font-normal">/ Q3 2026</span>
        </div>
        <div className="text-[10px] font-mono text-neutral-400 tracking-widest mt-0.5">
          100% DATA SOVEREIGNTY • AIR-GAPPED
        </div>
      </div>

      {/* 6. Top-Right Minimal Luxury Skip Button */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-neutral-400 hover:text-white font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>ESC // SKIP</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}

    </div>
  );
};
