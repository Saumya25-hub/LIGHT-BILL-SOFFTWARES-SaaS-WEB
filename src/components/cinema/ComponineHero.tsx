import React from 'react';
import { ArrowRight, Zap, CheckCircle2, Monitor, Sparkles } from 'lucide-react';
import { RollingText } from '../ui/RollingText';
import { ClientLogoMarquee } from './ClientLogoMarquee';

interface ComponineHeroProps {
  onNavigate?: (path: string) => void;
  onLaunchDemo?: () => void;
  onExploreClick?: () => void;
}

export const ComponineHero: React.FC<ComponineHeroProps> = ({
  onNavigate,
  onLaunchDemo,
  onExploreClick: _onExploreClick,
}) => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-transparent text-white select-none pt-24 sm:pt-28"
    >
      {/* 0. Cinematic Diwali Celebration Video Background (Hardware H.264 QuickSync Decoded, 0ms Lag) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/diwali_sbv1.jpg"
          className="w-full h-full object-cover opacity-50 mix-blend-screen scale-105"
        >
          <source src="/assets/diwali_sbv1.mp4" type="video/mp4" />
        </video>
        {/* Deep cinematic gradient overlay ensuring high text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070605]/85 via-[#070605]/55 to-[#070605]" />
      </div>

      {/* 1. Main Hero Content Stage */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center py-10 sm:py-16">
        
        {/* Top Status Capsule Pill Badges (Diwali Celebration + 2-Counter Sync) */}
        <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16130e]/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-grotesk font-semibold text-xs tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Happy Diwali Special Edition</span>
            </span>
            <span className="text-amber-500/50">•</span>
            <span className="font-mono text-[10px] text-amber-200/80 tracking-widest uppercase">
              Signatures Bill V1
            </span>
          </div>

          <div
            onClick={() => onNavigate && onNavigate('/multi-counter')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/70 border border-sky-400/40 text-sky-300 text-xs font-semibold hover:bg-sky-900/80 transition-all cursor-pointer shadow-[0_0_15px_rgba(14,165,233,0.25)]"
          >
            <Monitor className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>New: 2-Counter Store LAN Sync</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </div>
        </div>

        {/* Hero Split Layout: Left Headline & Content + Right Desktop Engine Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Massive Typography + Clean Editorial + Benchmark Chips + Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 max-w-2xl bg-black/45 backdrop-blur-md p-6 sm:p-9 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-[0.96] tracking-tight uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
              We Architect. <br />
              We Code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold">
                We Launch Your
              </span> <br />
              Enterprise ERP
            </h1>

            {/* Editorial Description & Benchmark Chips */}
            <div className="space-y-3.5 pt-1">
              <p className="font-grotesk text-sm sm:text-base font-normal text-neutral-200 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <strong className="text-white font-semibold">Trusted by 500+ manufacturers, retail counters, and trading firms.</strong> Air-gapped desktop ERP with autonomous dual-counter LAN synchronization. Fast, offline-first, zero monthly cloud fees.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-neutral-200 pt-1">
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white font-semibold">0ms Query</strong> Local SQLite</span>
                </div>
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span><strong className="text-white font-semibold">2 Counters</strong> 1 Shop Sync</span>
                </div>
                <div className="flex items-center gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong className="text-white font-semibold">Panchang</strong> 2026–2040</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Primary Action Button: Launch Live Simulator */}
              <button
                onClick={() => {
                  if (onLaunchDemo) onLaunchDemo();
                  else if (onNavigate) onNavigate('/demo');
                }}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-grotesk font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-200"
              >
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] animate-halftone" />
                <Zap className="w-4 h-4 text-black fill-black animate-pulse" />
                <RollingText text="Launch Live Demo" charClassName="font-extrabold text-black" />
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
              </button>

              {/* Secondary Action Button: 2-Counter Multi-PC Tour */}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('/multi-counter');
                }}
                className="group inline-flex items-center gap-3 px-5 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-sky-400/50 text-neutral-200 hover:text-white transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-black transition-all">
                  <Monitor className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </div>
                <RollingText text="2-Counter LAN Sync" charClassName="font-semibold text-xs tracking-wider" />
              </button>
            </div>

          </div>

          {/* Right Column: Premium Desktop Engine Interactive Preview */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center">
            <div className="frame-corner-card relative rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-amber-500/30 backdrop-blur-xl bg-gradient-to-b from-[#16120d]/90 to-[#0a0806]/95">
              {/* 4 Golden Corner Ornaments */}
              <div className="frame-corner-ornament frame-corner-top-left" />
              <div className="frame-corner-ornament frame-corner-top-right" />
              <div className="frame-corner-ornament frame-corner-bottom-left" />
              <div className="frame-corner-ornament frame-corner-bottom-right" />

              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[10px] text-amber-300 tracking-wider">
                    SIGNATURES_BILL_V1.EXE
                  </span>
                </div>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
                  ● 0MS READY
                </span>
              </div>

              {/* Software Metrics Grid */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">Database Engine</span>
                  <span className="text-amber-300 font-semibold">SQLite 3.45 (Local Disk)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">Dual-Counter LAN Sync</span>
                  <span className="text-sky-300 font-semibold">INV-A & INV-B (0 Collision)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">Thermal Print Engine</span>
                  <span className="text-emerald-400 font-semibold">80mm ESC/POS (0ms Blit)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">System Footprint</span>
                  <span className="text-cyan-400 font-semibold">Runs Smooth on Core i3</span>
                </div>
              </div>

              {/* Launch Action */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-400 font-mono">No Install Needed</span>
                  <span className="text-xs font-semibold text-white">Full In-Browser Simulator</span>
                </div>
                <button
                  onClick={() => {
                    if (onLaunchDemo) onLaunchDemo();
                    else if (onNavigate) onNavigate('/demo');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-grotesk font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer"
                >
                  Test Demo →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Bottom Infinite Client & Technology Partner Marquee */}
      <ClientLogoMarquee />

    </section>
  );
};
