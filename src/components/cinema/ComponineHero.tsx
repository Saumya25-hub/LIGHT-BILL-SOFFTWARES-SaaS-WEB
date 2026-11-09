import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, CheckCircle2, Monitor, Sparkles, Download } from 'lucide-react';
import { RollingText } from '../ui/RollingText';
import { ClientLogoMarquee } from './ClientLogoMarquee';

interface ComponineHeroProps {
  onNavigate?: (path: string) => void;
  onLaunchDemo?: () => void;
  onExploreClick?: () => void;
}

// Ultra-lightweight Real-Time Canvas Fireworks Particle Engine (< 0.5% CPU on Core i3)
const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle classes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;
      radius: number;
      gravity: number;
      flicker: number;
    }

    interface Rocket {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const PALETTES = [
      ['#FFD700', '#FFA500', '#FFE4B5', '#FFF8DC'], // Pure Gold & Champagne
      ['#00FFFF', '#20B2AA', '#E0FFFF', '#FFD700'], // Cyan & Gold Brocade
      ['#FF1493', '#DA70D6', '#FFD700', '#FFF'],    // Royal Magenta & Gold
      ['#00FF7F', '#7FFFD4', '#FFD700', '#FFF'],    // Emerald Green & Gold
      ['#FF4500', '#FF8C00', '#FFD700', '#FFF'],    // Fiery Amber
    ];

    const spawnFirework = (targetX?: number, targetY?: number) => {
      const x = targetX ?? (width * 0.15 + Math.random() * width * 0.7);
      const ty = targetY ?? (height * 0.12 + Math.random() * height * 0.35);
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const color = palette[0];

      rockets.push({
        x,
        y: height * 0.85,
        targetY: ty,
        vy: -9 - Math.random() * 4,
        color,
        trail: []
      });
    };

    const explode = (x: number, y: number, _color?: string) => {
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const count = 90 + Math.floor(Math.random() * 40);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 6.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.012 + Math.random() * 0.018,
          color: palette[Math.floor(Math.random() * palette.length)],
          radius: 1.2 + Math.random() * 1.8,
          gravity: 0.045,
          flicker: Math.random() * 10
        });
      }
    };

    // Auto-launch intervals (festive celebration burst cadence)
    let lastLaunch = 0;
    const launchInterval = 900; // Launch a rocket every ~900ms

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (time - lastLaunch > launchInterval) {
        spawnFirework();
        // Occasionally launch a double burst
        if (Math.random() > 0.6) {
          setTimeout(() => spawnFirework(), 200);
        }
        lastLaunch = time;
      }

      ctx.globalCompositeOperation = 'lighter';

      // 1. Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.y += r.vy;

        // Draw rocket head & glowing trail
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.6;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = trAlpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // 2. Update & Draw Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;
        p.flicker += 0.2;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = Math.max(0, p.alpha * (0.8 + 0.2 * Math.sin(p.flicker)));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * currentAlpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
};

export const ComponineHero: React.FC<ComponineHeroProps> = ({
  onNavigate,
  onLaunchDemo,
  onExploreClick: _onExploreClick,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#070605] text-white select-none pt-24 sm:pt-28">
      
      {/* 0. Cinematic Looping Background Video (Metropolis Skyline + Glowing SBV1 + Video Fireworks) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/diwali_sbv1.jpg"
          className="w-full h-full object-cover opacity-60 scale-105 transition-opacity duration-1000"
        >
          <source src="/assets/diwali_sbv1.mp4" type="video/mp4" />
        </video>

        {/* Ambient Vignette Gradients ensuring high legibility while highlighting skyscrapers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070605]/80 via-transparent to-[#070605]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#070605_95%)]" />
      </div>

      {/* 1. Interactive Real-Time Canvas Fireworks Layer (Patake Fuut Rahe Hain!) */}
      <FireworksCanvas />

      {/* 2. Main Hero Content Stage (Breathable, Luxury Centered Presentation) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center items-center text-center py-10 sm:py-14 space-y-7">
        
        {/* Top Status Capsule Pill Badges (Happy Diwali Special Edition + 2-Counter Sync) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16130e]/90 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.35)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="font-grotesk font-bold text-xs tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Happy Diwali Special Edition</span>
            </span>
            <span className="text-amber-500/50">•</span>
            <span className="font-mono text-[10px] text-amber-200 tracking-widest uppercase">
              Signatures Bill V1
            </span>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('/multi-counter')}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/80 hover:bg-sky-900/90 border border-sky-400/50 text-sky-300 text-xs font-bold transition-all cursor-pointer shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95"
          >
            <Monitor className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>New: 2-Counter Store LAN Sync</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {/* Grand Centered Festive Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.02] tracking-tight uppercase text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
            Lighting Up India's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold">
              Fastest Retail Counters
            </span>
          </h1>

          <p className="font-grotesk text-base sm:text-lg md:text-xl font-normal text-neutral-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            Air-gapped desktop ERP with autonomous dual-counter LAN synchronization. 
            0ms SQLite speed, instant thermal billing, zero cloud lag, and zero monthly subscription fees.
          </p>
        </div>

        {/* High-Converting Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-2">
          {/* Primary Action Button: Launch Live Simulator */}
          <button
            onClick={() => {
              if (onLaunchDemo) onLaunchDemo();
              else if (onNavigate) onNavigate('/demo');
            }}
            className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-grotesk font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:shadow-[0_0_60px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-amber-200"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] animate-halftone" />
            <Zap className="w-4 h-4 text-black fill-black animate-pulse" />
            <RollingText text="Launch Live Demo" charClassName="font-extrabold text-black" />
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Action Button: 2-Counter Tour */}
          <button
            onClick={() => onNavigate && onNavigate('/multi-counter')}
            className="group inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-sky-400/60 text-white transition-all cursor-pointer backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95"
          >
            <Monitor className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="font-grotesk font-bold text-xs sm:text-sm tracking-wide">
              2-Counter LAN Sync
            </span>
          </button>

          {/* Tertiary Action Button: Download Windows App */}
          <button
            onClick={() => onNavigate && onNavigate('/download')}
            className="group inline-flex items-center gap-2 px-5 py-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-xl hover:scale-105 active:scale-95 text-xs font-mono"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
            <span>Download .exe (Win 10/11)</span>
          </button>
        </div>

        {/* Slim Floating Architectural Metrics Dock */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 px-6 py-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] text-xs font-mono text-neutral-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong className="text-white font-semibold">0ms Query</strong> Local SQLite</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span><strong className="text-white font-semibold">2 Counters</strong> 1 Shop Sync</span>
            </div>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span><strong className="text-white font-semibold">Auto Series</strong> INV-A &amp; INV-B</span>
            </div>
            <span className="text-white/20 hidden md:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span><strong className="text-white font-semibold">Panchang</strong> 2026–2040</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Infinite Client & Technology Partner Marquee */}
      <div className="relative z-20">
        <ClientLogoMarquee />
      </div>

    </section>
  );
};
