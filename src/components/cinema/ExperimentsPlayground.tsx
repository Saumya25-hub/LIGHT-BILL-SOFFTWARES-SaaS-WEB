import React, { useState } from 'react';

interface Experiment {
  id: string;
  category: 'AI' | '3D' | 'MOTION' | 'WEB';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  specs: string[];
}

const experiments: Experiment[] = [
  {
    id: 'exp-1',
    category: 'AI',
    title: 'Cognitive Matrix Synthesizer',
    subtitle: 'Autonomous Code & Logic Generation',
    description: 'Generative machine learning pipelines synthesizing database transactions, automated GST calculations, and predictive inventory thresholds.',
    badge: 'Active Neural Engine',
    specs: ['Zero-Prompt Offline Logic', '100% Deterministic Arithmetic', 'SQLite Microsecond Queries']
  },
  {
    id: 'exp-2',
    category: '3D',
    title: 'Spatial Accretion Engine',
    subtitle: 'Hardware-Blitted Ergonomics',
    description: 'Zero-latency GPU rasterization optimized for older hardware. Instant rendering with 0ms frame drops on Intel Core i3 systems.',
    badge: 'Hardware Accelerated 120FPS',
    specs: ['DirectX 11 / WPF Compositor', 'Pure CSS3 GPU Shaders', 'Zero Battery Drain']
  },
  {
    id: 'exp-3',
    category: 'MOTION',
    title: 'Kinetic Ergonomics Protocol',
    subtitle: 'Zero-Latency Haptic Micro-Interactions',
    description: 'Spring-driven organic physics models engineered for high-throughput billing interfaces, reducing operator cognitive fatigue by 40%.',
    badge: 'Cubic-Bezier Physics',
    specs: ['Spring Damping Kinetics', 'Sub-millisecond Feedback', 'Ergonomic Numeric Input']
  },
  {
    id: 'exp-4',
    category: 'WEB',
    title: 'Offline-First Ledger Sync',
    subtitle: 'Cryptographic Dual-State LAN Sync',
    description: 'Zero-trust peer-to-peer snapshot distribution between Windows SQLite hardware and Android Keystore devices via local Kestrel LAN.',
    badge: 'Decentralized Architecture',
    specs: ['Port 18590 Local Gateway', 'Zero Cloud Dependency', 'Collision-Free Prefixing']
  }
];

export const ExperimentsPlayground: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeCard, setActiveCard] = useState<string>('exp-1');

  const filteredExperiments = activeCategory === 'ALL'
    ? experiments
    : experiments.filter(e => e.category === activeCategory);

  return (
    <section id="experiments" className="relative w-full py-24 px-6 sm:px-10 lg:px-14 bg-transparent text-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-purple-400 tracking-[0.25em] uppercase">
              04. PERFORMANCE BENCHMARKS & ARCHITECTURE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300">Lightweight Speed</span>
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
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Experiment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredExperiments.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setActiveCard(exp.id)}
              className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 space-y-4 cursor-pointer ${
                activeCard === exp.id
                  ? 'border-purple-400/60 bg-purple-950/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-500/30 font-bold">
                  {exp.category}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{exp.badge}</span>
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

              {/* Technical Specifications */}
              <div className="pt-2 flex flex-wrap gap-2">
                {exp.specs.map((sp, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{sp}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
