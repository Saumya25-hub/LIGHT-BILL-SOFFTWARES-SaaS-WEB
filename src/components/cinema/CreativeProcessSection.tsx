import React, { useState } from 'react';
import { Compass, Cpu, Code2, Zap, Rocket, Check } from 'lucide-react';

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
    <section id="process" className="relative w-full py-28 px-6 sm:px-10 lg:px-14 bg-[#050414] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-indigo-900/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            METHODOLOGY & WORKFLOW
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 glow-lavender">Process</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            The 5-step journey transforming abstract concepts into high-performance commercial software and immersive experiences.
          </p>
        </div>

        {/* 5-Step Vertical Journey with Glowing Central Spine */}
        <div className="relative">
          
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500/80 via-indigo-500/40 to-purple-500/10" />

          <div className="space-y-12 md:space-y-20">
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
                  {/* Step Card Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div 
                      className={`group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                        isSelected 
                          ? 'bg-purple-950/30 border-purple-500/50 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] scale-[1.02]' 
                          : 'bg-white/[0.02] border-white/10 hover:border-purple-500/30 hover:bg-white/[0.04]'
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

                  {/* Center Node Icon on Spine */}
                  <div className="relative z-20 flex items-center justify-center">
                    <div 
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.7)] scale-110'
                          : 'bg-[#0a0820] border-purple-500/40 text-slate-400 hover:border-purple-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Symmetry */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
