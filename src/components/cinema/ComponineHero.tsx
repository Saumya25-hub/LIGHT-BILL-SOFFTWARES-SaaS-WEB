import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, CheckCircle2, Monitor, Sparkles, Download } from 'lucide-react';
import { RollingText } from '../ui/RollingText';
import { ClientLogoMarquee } from './ClientLogoMarquee';

interface ComponineHeroProps {
  onNavigate?: (path: string) => void;
  onLaunchDemo?: () => void;
  onExploreClick?: () => void;
}

// Ultra-Realistic Skyshot Fireworks Canvas Particle Engine
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
      isWillow: boolean;
      trail: { x: number; y: number; a: number }[];
    }

    interface Rocket {
      x: number;
      y: number;
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      color: string;
      palette: string[];
      trail: { x: number; y: number }[];
    }

    interface Flash {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const flashes: Flash[] = [];

    const PALETTES = [
      ['#FFD700', '#FFA500', '#FFE4B5', '#FFF8DC', '#F59E0B'], // Pure Gold & Champagne
      ['#FF8C00', '#FF4500', '#FFD700', '#FFFFFF', '#FCD34D'], // Festive Saffron & Gold
      ['#00FFFF', '#20B2AA', '#E0FFFF', '#FFD700', '#67E8F9'], // Cyan Electric & Gold
      ['#FF1493', '#DA70D6', '#FFD700', '#FFFFFF', '#F472B6'], // Royal Ruby & Champagne
      ['#00FF7F', '#7FFFD4', '#FFD700', '#FFFFFF', '#34D399'], // Emerald & Gold Brocade
      ['#C084FC', '#A855F7', '#FFD700', '#FFFFFF', '#E9D5FF'], // Imperial Violet
    ];

    const spawnSkyshot = (targetX?: number, targetY?: number) => {
      // Skyshots burst in the upper open night sky (6% to 26% height)
      const tx = targetX ?? (width * 0.10 + Math.random() * width * 0.80);
      const ty = targetY ?? (height * 0.06 + Math.random() * height * 0.20);
      
      // Launch from behind the city skyline & horizon (46% to 54% height)
      const sx = tx + (Math.random() - 0.5) * 80;
      const sy = height * 0.50 + Math.random() * 35;

      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const color = palette[0];

      rockets.push({
        x: sx,
        y: sy,
        startX: sx,
        startY: sy,
        targetX: tx,
        targetY: ty,
        progress: 0,
        speed: 0.045 + Math.random() * 0.015,
        color,
        palette,
        trail: []
      });
    };

    const explodeSkyshot = (x: number, y: number, palette: string[]) => {
      // 1. Sky illumination flash
      flashes.push({
        x,
        y,
        radius: 10,
        maxRadius: 100 + Math.random() * 60,
        alpha: 0.5,
        color: palette[0]
      });

      // 2. Burst particles (chrysanthemum / weeping willow)
      const isWillow = Math.random() > 0.4;
      const count = isWillow ? 130 + Math.floor(Math.random() * 40) : 90 + Math.floor(Math.random() * 30);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isWillow ? (1.5 + Math.random() * 7.0) : (1.2 + Math.random() * 5.5);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: isWillow ? (0.010 + Math.random() * 0.014) : (0.014 + Math.random() * 0.018),
          color: palette[Math.floor(Math.random() * palette.length)],
          radius: 1.4 + Math.random() * 1.8,
          gravity: isWillow ? 0.055 : 0.04,
          flicker: Math.random() * 10,
          isWillow,
          trail: []
        });
      }
    };

    // User click anywhere launches a custom skyshot
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      spawnSkyshot(clickX, Math.min(clickY, height * 0.40));
    };
    window.addEventListener('click', handleCanvasClick);

    // Initial festive burst
    setTimeout(() => spawnSkyshot(width * 0.25, height * 0.20), 100);
    setTimeout(() => spawnSkyshot(width * 0.75, height * 0.18), 350);

    let lastLaunchTime = 0;
    const cadence = 850; // Launch a rocket every ~850ms

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Auto-launch periodic skyshots
      if (time - lastLaunchTime > cadence) {
        spawnSkyshot();
        if (Math.random() > 0.65) {
          setTimeout(() => spawnSkyshot(), 220);
        }
        lastLaunchTime = time;
      }

      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw Sky Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.radius += (f.maxRadius - f.radius) * 0.3;
        f.alpha -= 0.06;

        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, 'rgba(255, 255, 255, ' + f.alpha * 0.8 + ')');
        grad.addColorStop(0.3, f.color + Math.floor(f.alpha * 180).toString(16).padStart(2, '0'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update & Draw Ascending Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.progress += r.speed;

        // Current position
        const p = Math.min(1, r.progress);
        const curX = r.startX + (r.targetX - r.startX) * p;
        // Subtle natural arc
        const curY = r.startY + (r.targetY - r.startY) * p;

        r.x = curX;
        r.y = curY;

        r.trail.push({ x: curX, y: curY });
        if (r.trail.length > 10) r.trail.shift();

        // Draw golden spark head
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Draw rocket tail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          const trAlpha = (t / r.trail.length) * 0.7;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = trAlpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (r.progress >= 1) {
          explodeSkyshot(r.targetX, r.targetY, r.palette);
          rockets.splice(i, 1);
        }
      }

      // 3. Update & Draw Fireworks Sparks
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y, a: p.alpha });
        if (p.trail.length > (p.isWillow ? 7 : 4)) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.982;
        p.vy *= 0.982;
        p.alpha -= p.decay;
        p.flicker += 0.25;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = Math.max(0, p.alpha * (0.8 + 0.2 * Math.sin(p.flicker)));

        // Spark tail
        for (let t = 0; t < p.trail.length; t++) {
          const tr = p.trail[t];
          const trA = (t / p.trail.length) * currentAlpha * 0.45;
          ctx.beginPath();
          ctx.arc(tr.x, tr.y, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = trA;
          ctx.fill();
        }

        // Particle head
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
      window.removeEventListener('click', handleCanvasClick);
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
      
      {/* 0. Authentic Wide Surat Highway Light Trails & Night Sky Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/diwali_sbv1.jpg"
          className="w-full h-full object-cover object-top opacity-90 scale-100 transition-opacity duration-1000"
        >
          <source src="/assets/diwali_sbv1.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette Overlay: Preserves the entire upper sky, Indian Flag, and moon while highlighting light trails */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070605]/40 via-transparent to-[#070605]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#070605_95%)] pointer-events-none" />
      </div>

      {/* 1. Real-Time Skyshot Fireworks Layer (Sky Shoots & Bursting Crackers Over Surat) */}
      <FireworksCanvas />

      {/* 2. Main Hero Content Stage (Open, Breathable, Ultra-Luxury Presentation) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center items-center text-center py-6 sm:py-9 space-y-6">
        
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
