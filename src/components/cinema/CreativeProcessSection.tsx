import React, { useState } from 'react';
import { 
  Compass, 
  Cpu, 
  Code2, 
  Zap, 
  Rocket, 
  Check, 
  Smartphone, 
  Monitor, 
  Database, 
  Cloud, 
  Printer, 
  Sparkles, 
  Terminal,
  Orbit
} from 'lucide-react';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  deliverable: string;
}

const steps: ProcessStep[] = [
  {
    id: 'discover',
    stepNumber: '01',
    title: 'Discover',
    subtitle: 'Ideas & Inspiration',
    description: 'We deconstruct complex business operations, market pain points, and architectural challenges to reveal unmapped creative opportunities.',
    tags: ['Problem Discovery', 'User Psychology', 'System Modeling'],
    icon: Compass,
    deliverable: 'Strategic Vision & Blueprint'
  },
  {
    id: 'explore',
    stepNumber: '02',
    title: 'Explore',
    subtitle: 'AI & Concepts',
    description: 'Rapid exploration blending generative intelligence, algorithmic pipelines, and visual storyboards to sculpt unconventional paradigms.',
    tags: ['Generative Synthesis', 'Rapid Prototyping', 'Spatial Concepts'],
    icon: Cpu,
    deliverable: 'Interactive Architecture Specs'
  },
  {
    id: 'build',
    stepNumber: '03',
    title: 'Build',
    subtitle: '3D & Creative Code',
    description: 'Engineered with precision across C#, Kotlin, and modern Web stacks. Offline-first zero-latency storage meets hardware-accelerated shaders.',
    tags: ['C# .NET 8.0', 'Kotlin Jetpack', 'React 19 & Shaders'],
    icon: Code2,
    deliverable: 'Core Engine & Native Binaries'
  },
  {
    id: 'animate',
    stepNumber: '04',
    title: 'Animate',
    subtitle: 'Motion & Interaction',
    description: 'Injecting kinetic life into every interaction. Micro-gestures, fluid physics, and tactile feedback make the software feel organic.',
    tags: ['60FPS Physics', 'Micro-Interactions', 'Spatial UI'],
    icon: Zap,
    deliverable: 'Polished Interactive Runtime'
  },
  {
    id: 'create',
    stepNumber: '05',
    title: 'Create',
    subtitle: 'Final Experience',
    description: 'Deployment into reality. Tested, certified, and packaged for thousands of businesses across Windows desktop, Android mobile, and cloud sync.',
    tags: ['Production Deployment', 'Google Play Certified', 'Zero-Downtime Sync'],
    icon: Rocket,
    deliverable: 'Commercial Production Release'
  }
];

export const CreativeProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative w-full py-28 px-6 sm:px-10 lg:px-14 bg-transparent text-white overflow-hidden">
      {/* Ambient background glows blending with rotating 3D cosmos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-indigo-900/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            METHODOLOGY & 3D ARTIFACTS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 glow-lavender">Process</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            The 5-step journey transforming abstract concepts into high-performance commercial software and immersive experiences.
          </p>
        </div>

        {/* 5-Step Vertical Journey with Central Glowing Spine */}
        <div className="relative">
          
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500/80 via-indigo-500/50 to-purple-500/10" />

          <div className="space-y-16 md:space-y-28">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div 
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-16`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* 1. Step Card Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div 
                      className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                        isSelected 
                          ? 'bg-purple-950/40 border-purple-500/60 shadow-[0_0_50px_-10px_rgba(168,85,247,0.35)] scale-[1.02]' 
                          : 'bg-black/40 backdrop-blur-md border-white/10 hover:border-purple-500/30 hover:bg-black/60'
                      }`}
                    >
                      {/* Step Header */}
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        <span className="font-mono text-xs font-bold tracking-widest text-purple-400 px-2.5 py-1 rounded bg-purple-900/40 border border-purple-500/30">
                          {step.stepNumber}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-purple-200 transition-colors">
                          {step.title} <span className="text-slate-400 font-light text-base">— {step.subtitle}</span>
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300/80 text-sm leading-relaxed mb-6 font-light">
                        {step.description}
                      </p>

                      {/* Tags & Deliverable */}
                      <div className={`flex flex-wrap gap-2 mb-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        {step.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 text-xs font-mono text-purple-300/90 pt-3 border-t border-white/10 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Deliverable: <strong className="text-white">{step.deliverable}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Center Node Icon on Spine */}
                  <div className="relative z-20 flex items-center justify-center">
                    <div 
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-300 shadow-[0_0_35px_rgba(168,85,247,0.8)] scale-110'
                          : 'bg-[#0a0820] border-purple-500/40 text-slate-400 hover:border-purple-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* 3. Opposite Column: HEAVY 3D FLOATING HOLOGRAPHIC ARTIFACT */}
                  <div className="w-full md:w-1/2">
                    {idx === 0 && <HologramIdeationVoid />}
                    {idx === 1 && <HologramAndroidPhone />}
                    {idx === 2 && <HologramWindowsDesktopDB />}
                    {idx === 3 && <HologramKineticGyroscope />}
                    {idx === 4 && <HologramCreationWorld />}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

/* =========================================================================
   01. STEP 01 HOLOGRAPHIC ARTIFACT: "IMAGINE: EMPTY VOID ➔ CREATION WORLD"
   "JO SOCHO WO BANEGA — FROM EMPTY CANVAS TO DIGITAL UNIVERSE"
   ========================================================================= */
const HologramIdeationVoid: React.FC = () => {
  return (
    <div className="relative group perspective-1000">
      <div className="card-3d-left relative p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl border border-purple-500/30 hologram-purple animate-float-slow">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-purple-300 uppercase font-semibold">
              IDEATION VOID // S TOM’S NEURAL CORE
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/50 border border-purple-500/30 text-purple-200">
            PROMPT ENGINE
          </span>
        </div>

        {/* Central 3D Concentric Orbiting Void Rings */}
        <div className="relative h-44 flex items-center justify-center my-2 overflow-hidden rounded-xl bg-purple-950/20 border border-purple-500/20">
          {/* Outer rotating ring */}
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-purple-400/40 animate-spin-slow" />
          {/* Middle counter-rotating ring */}
          <div className="absolute w-28 h-28 rounded-full border border-purple-300/30 animate-spin-reverse" />
          {/* Inner glowing core */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.8)] mb-2 animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-extrabold text-xs tracking-widest text-white uppercase glow-lavender">
              JO SOCHO WO BANEGA
            </span>
            <span className="text-[10px] font-mono text-purple-300/80">
              Empty Void ➔ Infinite Reality
            </span>
          </div>

          {/* Floating cosmic particles */}
          <span className="absolute top-4 left-6 text-purple-400 text-xs animate-ping">✦</span>
          <span className="absolute bottom-5 right-8 text-indigo-300 text-xs animate-ping" style={{ animationDelay: '1s' }}>✦</span>
        </div>

        {/* Real-time Code Stream Simulation */}
        <div className="space-y-1.5 font-mono text-[11px] bg-black/50 p-3 rounded-lg border border-white/5 text-slate-300">
          <div className="flex items-center gap-2 text-purple-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt; PROMPT: "Architect commercial billing &amp; mobile ecosystem"</span>
          </div>
          <div className="text-slate-400 pl-5">
            &gt; STATUS: Synthesizing C# .NET 8.0 core &amp; Android 16 APK...
          </div>
          <div className="text-emerald-400 pl-5 font-semibold">
            &gt; READY: 100% Concept to Binary Compilation
          </div>
        </div>

        {/* Floating Badges */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-purple-500/20 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            ⚡ Zero Creative Friction
          </span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            🌌 Multi-Dimensional Model
          </span>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   02. STEP 02 HOLOGRAPHIC ARTIFACT: 3D FLOATING ANDROID SMARTPHONE
   "SIGNATURES BILL MOBILE" with Android 16 • API 36 • Google Drive Auto-Sync
   ========================================================================= */
const HologramAndroidPhone: React.FC = () => {
  return (
    <div className="relative group perspective-1000">
      <div className="card-3d-right relative p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl border border-emerald-500/30 hologram-emerald animate-float-reverse">
        
        {/* Device Header Status */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs tracking-wider text-emerald-300 uppercase font-semibold">
              3D ANDROID COMPANION // API 36
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
            PLAY STORE CERTIFIED
          </span>
        </div>

        {/* Floating 3D Phone Chassis Representation */}
        <div className="relative mx-auto max-w-[280px] rounded-3xl bg-slate-900 border-2 border-slate-700/80 p-3 shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
          {/* Phone Punch-Hole Camera */}
          <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto mb-2 border border-slate-700 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900" />
          </div>

          {/* Screen Content: Signatures Bill Mobile Live UI */}
          <div className="rounded-2xl bg-[#090b14] border border-slate-800 p-3 space-y-3 font-sans">
            {/* Mobile App Header */}
            <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/5">
              <span className="font-bold text-white tracking-wide">SIGNATURES BILL</span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                SYNCED
              </span>
            </div>

            {/* Live Invoice Card */}
            <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-purple-300">
                <span>INV #2026-8924</span>
                <span className="text-white font-bold">₹48,650.00</span>
              </div>
              <p className="text-[10px] text-slate-300 truncate">Gujarat Textile Mills Ltd.</p>
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 pt-1">
                <Printer className="w-3 h-3 text-emerald-400" />
                <span>BT Thermal Print: 58mm / 80mm</span>
              </div>
            </div>

            {/* Google Drive Cloud Sync Ring */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
              <Cloud className="w-4 h-4 text-indigo-400 animate-pulse" />
              <div className="flex-1 truncate">
                <div className="text-white font-semibold">Google Drive Sync</div>
                <div className="text-[8px] text-slate-400">Zero-Knowledge Private Snapshot</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting Tech Chips */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-emerald-500/20 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Android 16 • Target SDK 36
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            Kotlin 2.0 • Jetpack Compose
          </span>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
            60 FPS Touch Physics
          </span>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   03. STEP 03 HOLOGRAPHIC ARTIFACT: 3D WINDOWS DESKTOP ERP & SQLITE DB CYLINDERS
   "WINDOWS APPS KA DB KA HEAVY MST FLAT SPACE" with < 0.8ms SQLite Latency
   ========================================================================= */
const HologramWindowsDesktopDB: React.FC = () => {
  return (
    <div className="relative group perspective-1000">
      <div className="card-3d-left relative p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl border border-sky-500/30 hologram-cyan animate-float-slow">
        
        {/* Windows Window Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs tracking-wider text-sky-300 uppercase font-semibold">
              WINDOWS ERP // C# .NET 8.0
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" />
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500/80" />
          </div>
        </div>

        {/* Windows ERP UI Split with Stacked Glowing SQLite Database Cylinders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/80 border border-sky-500/20">
          
          {/* Left: Live GST Billing Records */}
          <div className="space-y-2 font-mono text-[10px]">
            <div className="text-sky-300 font-bold flex items-center justify-between pb-1 border-b border-slate-800">
              <span>GST BILLING ENGINE</span>
              <span className="text-[9px] text-emerald-400">&lt; 150ms PRINT</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between bg-white/5 p-1 rounded">
                <span>01. Cotton Yarn 40s</span>
                <span className="text-white">₹18,500</span>
              </div>
              <div className="flex justify-between bg-white/5 p-1 rounded">
                <span>02. Spun Poly Blend</span>
                <span className="text-white">₹12,300</span>
              </div>
              <div className="flex justify-between text-sky-300 font-bold pt-1 border-t border-white/5">
                <span>GST (18%) + NET:</span>
                <span className="text-white font-mono">₹36,344.00</span>
              </div>
            </div>
          </div>

          {/* Right: Heavy 3D Glowing SQLite DB Cylinders */}
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-sky-950/30 border border-sky-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-sky-300 font-bold">
              <Database className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>SQLITE 3.45 WAL</span>
            </div>

            {/* 3D Stacked Disk 1 */}
            <div className="w-full py-1 px-2 rounded-md bg-gradient-to-r from-sky-900/60 via-cyan-700/40 to-sky-900/60 border border-sky-400/40 flex items-center justify-between text-[9px] font-mono text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span>● ACID STORAGE</span>
              <span className="text-emerald-300 font-bold">&lt; 0.8ms</span>
            </div>

            {/* 3D Stacked Disk 2 */}
            <div className="w-full py-1 px-2 rounded-md bg-gradient-to-r from-sky-900/60 via-cyan-700/40 to-sky-900/60 border border-sky-400/40 flex items-center justify-between text-[9px] font-mono text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span>● IMMUTABLE LEDGER</span>
              <span className="text-sky-300">WAL-Mode</span>
            </div>

            {/* 3D Stacked Disk 3 */}
            <div className="w-full py-1 px-2 rounded-md bg-gradient-to-r from-sky-900/60 via-cyan-700/40 to-sky-900/60 border border-sky-400/40 flex items-center justify-between text-[9px] font-mono text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span>● PBKDF2 100k</span>
              <span className="text-purple-300">SHA-256</span>
            </div>
          </div>

        </div>

        {/* Orbiting Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-sky-500/20 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
            🖥️ Windows 11/10 Native x64
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            ⚡ 100% Offline-First DB
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            🔒 Hardware PBKDF2 Vault
          </span>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   04. STEP 04 HOLOGRAPHIC ARTIFACT: 3D KINETIC GYROSCOPE & 60 FPS ACCELERATOR
   "S TOM'S ANIMATION — KINETIC MOTION & FLUID SHADERS"
   ========================================================================= */
const HologramKineticGyroscope: React.FC = () => {
  return (
    <div className="relative group perspective-1000">
      <div className="card-3d-right relative p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl border border-indigo-500/30 hologram-purple animate-float-reverse">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-indigo-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Orbit className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs tracking-wider text-indigo-300 uppercase font-semibold">
              KINETIC PHYSICS // 60 FPS RUNTIME
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 font-bold">
            ZERO DROP FRAMES
          </span>
        </div>

        {/* 3D Concentric Gyroscope Visualization */}
        <div className="relative h-44 flex items-center justify-center rounded-xl bg-indigo-950/20 border border-indigo-500/20 overflow-hidden">
          {/* Ring 1 - Pitch */}
          <div className="absolute w-36 h-36 rounded-full border-2 border-purple-500/40 animate-spin-slow" />
          {/* Ring 2 - Roll */}
          <div className="absolute w-28 h-28 rounded-full border-2 border-sky-400/40 animate-spin-reverse" />
          {/* Ring 3 - Yaw */}
          <div className="absolute w-20 h-20 rounded-full border-2 border-indigo-300/40 animate-spin-slow" />
          
          {/* Central Singularity Core */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.9)] animate-pulse">
            <Zap className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Telemetry Diagnostics HUD */}
        <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[10px]">
          <div className="p-2 rounded bg-black/50 border border-white/5 space-y-0.5">
            <div className="text-slate-400">FRAME BUDGET:</div>
            <div className="text-emerald-400 font-bold text-xs">16.6ms / 60 FPS</div>
          </div>
          <div className="p-2 rounded bg-black/50 border border-white/5 space-y-0.5">
            <div className="text-slate-400">GPU PIPELINE:</div>
            <div className="text-purple-300 font-bold text-xs">VULKAN / D3D12</div>
          </div>
        </div>

        {/* Floating Badges */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-indigo-500/20 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            🌀 Cubic-Bezier Curves
          </span>
          <span className="px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300">
            ✨ Tactile Micro-Gestures
          </span>
        </div>

      </div>
    </div>
  );
};

/* =========================================================================
   05. STEP 05 HOLOGRAPHIC ARTIFACT: S TOM'S MASTER CREATION WORLD MONUMENT
   "IMAGINE CREATION WORLD — MULTI-PLATFORM ECOSYSTEM LAUNCH"
   ========================================================================= */
const HologramCreationWorld: React.FC = () => {
  return (
    <div className="relative group perspective-1000">
      <div className="card-3d-left relative p-6 sm:p-7 rounded-2xl bg-black/60 backdrop-blur-xl border border-purple-400/40 hologram-purple animate-float-slow">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="font-mono text-xs tracking-wider text-purple-300 uppercase font-semibold">
              CREATION WORLD // S TOM’S LAUNCHPAD
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 border border-purple-400/40 text-white font-bold animate-pulse">
            PRODUCTION READY
          </span>
        </div>

        {/* Central Tri-Platform Ecosystem Monument */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-purple-950/40 via-indigo-950/30 to-black/60 border border-purple-500/30 space-y-4 text-center">
          
          {/* S TOM'S Master Core Cube */}
          <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.9)] animate-pulse">
            <span className="font-display font-black text-white text-lg tracking-wider">
              S·T
            </span>
          </div>

          <div>
            <h4 className="font-display font-black text-lg text-white tracking-wide glow-lavender">
              S TOM’S CREATION WORLD
            </h4>
            <p className="font-mono text-xs text-purple-300">
              "JO SOCHO WO BANEGA" — REAL COMMERCIAL SOFTWARE
            </p>
          </div>

          {/* Tri-Platform Linked Nodes */}
          <div className="grid grid-cols-3 gap-2 font-mono text-[9px] pt-2 border-t border-white/10">
            <div className="p-2 rounded bg-black/60 border border-emerald-500/40 text-emerald-300">
              <Smartphone className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-400" />
              <span>Android App</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-indigo-500/40 text-indigo-300">
              <Cloud className="w-3.5 h-3.5 mx-auto mb-1 text-indigo-400" />
              <span>Drive Sync</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-sky-500/40 text-sky-300">
              <Monitor className="w-3.5 h-3.5 mx-auto mb-1 text-sky-400" />
              <span>Windows ERP</span>
            </div>
          </div>
        </div>

        {/* Production Release Badges */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-purple-500/20 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            🏆 Google Play Console: Under Review
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            ⚡ 100% Offline-First Zero Downtime
          </span>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
            🌐 Multi-Platform Suite
          </span>
        </div>

      </div>
    </div>
  );
};
