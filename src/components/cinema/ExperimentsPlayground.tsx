import React, { useState, useEffect, useRef } from 'react';
import { Orbit } from 'lucide-react';

interface Experiment {
  id: string;
  category: 'AI' | '3D' | 'MOTION' | 'WEB';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

const experiments: Experiment[] = [
  {
    id: 'exp-1',
    category: 'AI',
    title: 'Cognitive Matrix Synthesizer',
    subtitle: 'Autonomous Code & Logic Generation',
    description: 'Generative machine learning pipelines synthesizing database transactions, automated GST calculations, and predictive inventory thresholds.',
    badge: 'Active Neural Engine'
  },
  {
    id: 'exp-2',
    category: '3D',
    title: 'Spatial Accretion Vortex',
    subtitle: 'Interactive Gravitational Physics',
    description: 'Simulating cosmic black hole particle physics directly in web shaders. Move your cursor to bend gravitational light waves.',
    badge: 'WebGL Canvas 60FPS'
  },
  {
    id: 'exp-3',
    category: 'MOTION',
    title: 'Kinetic Ergonomics Engine',
    subtitle: 'Zero-Latency Haptic Micro-Interactions',
    description: 'Spring-driven organic physics models engineered for high-throughput billing interfaces, reducing operator cognitive fatigue by 40%.',
    badge: 'Cubic-Bezier Physics'
  },
  {
    id: 'exp-4',
    category: 'WEB',
    title: 'Offline-First Ledger Protocol',
    subtitle: 'Cryptographic Dual-State Sync',
    description: 'Zero-trust peer-to-peer snapshot distribution between Windows SQLite hardware and Android Keystore devices via OAuth 2.0 PKCE.',
    badge: 'Decentralized Architecture'
  }
];

export const ExperimentsPlayground: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 200, y: 150 });

  // Interactive Particle Canvas (Gravitational Accretion Disk simulation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 360);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ['#c084fc', '#818cf8', '#38bdf8', '#e879f9'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 4, 20, 0.2)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        // Gravitational pull toward mouse position
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200 && dist > 10) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // Apply friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const filteredExperiments = activeCategory === 'ALL'
    ? experiments
    : experiments.filter(e => e.category === activeCategory);

  return (
    <section id="experiments" className="relative w-full py-28 px-6 sm:px-10 lg:px-14 bg-transparent text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-950/25 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono text-purple-400 tracking-[0.25em] uppercase">
              04. EXPERIMENTS & PLAYGROUND
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
              AI / 3D / Motion / <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 glow-lavender">Web</span>
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'AI', '3D', 'MOTION', 'WEB'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-400'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Centerpiece: Gravitational Canvas Simulation */}
        <div className="relative rounded-3xl border border-purple-500/25 bg-[#07051a]/80 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <Orbit className="w-4 h-4 animate-spin" />
                <span>INTERACTIVE PHYSICS SANDBOX</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Cosmic Gravitational Accretion Simulation
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 w-fit">
              Hover & Drag Across Canvas
            </span>
          </div>

          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#03020c]">
            <canvas
              ref={canvasRef}
              onMouseMove={handleCanvasMouseMove}
              className="w-full h-full cursor-crosshair"
            />
            <div className="absolute bottom-4 left-4 text-[11px] font-mono text-slate-400 pointer-events-none">
              Cursor Gravity Coordinates: X: {Math.round(mousePos.x)} | Y: {Math.round(mousePos.y)}
            </div>
          </div>
        </div>

        {/* Experiment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              className="group relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/40 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/30 font-bold">
                  {exp.category}
                </span>
                <span className="text-slate-400">{exp.badge}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-white group-hover:text-purple-200 transition-colors">
                  {exp.title}
                </h4>
                <p className="text-xs font-mono text-purple-400">
                  {exp.subtitle}
                </p>
              </div>

              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
