import React, { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { RollingText } from '../ui/RollingText';

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  image: string;
  metrics: { label: string; value: string }[];
  actionLabel: string;
}

interface ComponineProjectShowcaseProps {
  onLaunchDemo?: () => void;
  onNavigate?: (path: string) => void;
}

export const ComponineProjectShowcase: React.FC<ComponineProjectShowcaseProps> = ({
  onLaunchDemo,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'billing' | 'ems' | 'panchang'>('all');

  const projects: ProjectItem[] = [
    {
      id: 'billing',
      category: 'ENTERPRISE ERP CORE',
      title: 'Smart GST Invoicing & 80mm Thermal Engine',
      tagline: 'Instant 0ms calculation with inclusive/exclusive tax blit & e-way bill readiness',
      description: 'Engineered specifically for Indian textile markets and wholesale traders. Supports lightning-fast keyboard shortcuts (Ctrl+K, F2 Party, F3 Product), dual barcode scanning, and instant dual-print thermal receipts.',
      badge: '0ms LATENCY',
      image: '/assets/desktop-sales-invoice.png',
      metrics: [
        { label: 'Calculation Latency', value: '< 1ms' },
        { label: 'Thermal Print Blit', value: '80mm / 3 inch' },
        { label: 'Compliance', value: 'GSTN 2026 Ready' },
      ],
      actionLabel: 'Launch In Simulator',
    },
    {
      id: 'ems',
      category: 'FACTORY & WORKFORCE',
      title: 'Employee Management & Karigar Payroll Cycle',
      tagline: 'Complete piece-rate job slip tracking and automated salary settlements',
      description: 'Built for Surat & Ahmedabad textile processing units. Seamlessly logs daily production, job cards, advance loans, and monthly deductions with instant PDF pay-slips.',
      badge: 'PAYROLL READY',
      image: '/assets/desktop-reports-hub.png',
      metrics: [
        { label: 'Workforce Scale', value: 'Up to 5,000' },
        { label: 'Settlement Engine', value: 'Instant One-Click' },
        { label: 'Offline Sync', value: '100% Air-Gapped' },
      ],
      actionLabel: 'Test EMS In Demo',
    },
    {
      id: 'panchang',
      category: 'TRADING ALMANAC',
      title: 'Hindu Panchang & Festival Calendar (2026–2040)',
      tagline: '15-Year astronomical Tithi, Muhurat, and bank holiday engine',
      description: 'Integrates local Indian business cycles directly into your billing workflow. Know upcoming market closure holidays, Diwali Muhurat billings, and auspicious Vikram Samvat schedules.',
      badge: '2026-2040 EMBEDDED',
      image: '/assets/desktop-dashboard-dark.png',
      metrics: [
        { label: 'Coverage Span', value: '15 Full Years' },
        { label: 'Festivals Tracked', value: '250+ Holidays' },
        { label: 'Integration', value: 'Invoice Due Dates' },
      ],
      actionLabel: 'Inspect Calendar Engine',
    },
    {
      id: 'catalog',
      category: 'CREATIVE STUDIO',
      title: 'Catalog Studio — Wholesale Digital Lookbooks',
      tagline: 'Bespoke wholesale PDF brochures with automated product grids & QR codes',
      description: 'Design luxury seasonal product catalogs directly from your stock inventory. Auto-generate WhatsApp-ready PDF lookbooks with high-res product photos and wholesale pricing tables.',
      badge: 'STUDIO V1',
      image: '/assets/desktop-catalog-builder.png',
      metrics: [
        { label: 'PDF Export', value: '300 DPI Print' },
        { label: 'Share Format', value: '1-Tap WhatsApp' },
        { label: 'Branding', value: 'Custom Watermark' },
      ],
      actionLabel: 'Open Catalog Preview',
    },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.id === activeTab);

  return (
    <section id="works" className="relative w-full py-20 sm:py-28 bg-transparent text-white select-none">
      
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 border-b border-amber-500/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-amber-400 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              FEATURED WORKS // PRODUCTION SUITE
            </div>
            <h2 className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
              Engineered For Power. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold">
                Built For Real Business.
              </span>
            </h2>
          </div>

          {/* Module Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#121110] border border-amber-500/25">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'billing', label: 'GST Billing' },
              { id: 'ems', label: 'Factory EMS' },
              { id: 'panchang', label: 'Panchang 2040' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group px-3.5 py-1.5 rounded-full text-xs font-grotesk tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                <RollingText text={tab.label} charClassName={activeTab === tab.id ? 'font-bold text-black' : 'font-medium'} />
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid with Componine Ornate Corner Brackets */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="frame-corner-card rounded-2xl p-6 sm:p-10 lg:p-12 overflow-hidden group"
            >
              {/* 4 Componine Golden Corner Ornaments */}
              <div className="frame-corner-ornament frame-corner-top-left" />
              <div className="frame-corner-ornament frame-corner-top-right" />
              <div className="frame-corner-ornament frame-corner-bottom-left" />
              <div className="frame-corner-ornament frame-corner-bottom-right" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Visual Preview Container */}
                <div className="lg:col-span-7 relative rounded-xl overflow-hidden bg-black/60 border border-white/10 group-hover:border-amber-400/40 transition-colors shadow-2xl">
                  {/* Subtle golden corner highlights */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300 font-semibold tracking-wider uppercase z-10">
                    {project.badge}
                  </div>

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Hover ambient flare */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Details Panel */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Category Chip */}
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 tracking-[0.2em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {project.category}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-grotesk font-black text-2xl sm:text-3xl text-white group-hover:text-amber-200 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-editorial italic text-amber-200/80 text-sm sm:text-base mt-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metric Chips */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-0.5">
                        <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
                          {metric.label}
                        </div>
                        <div className="font-grotesk font-bold text-xs sm:text-sm text-white">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary Action with Rolling Text */}
                  <button
                    onClick={() => {
                      if (onLaunchDemo) onLaunchDemo();
                      else if (onNavigate) onNavigate('/demo');
                    }}
                    className="group/btn relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-black font-grotesk font-bold text-xs tracking-wider uppercase border border-amber-400/40 hover:border-amber-300 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                    <RollingText text={project.actionLabel} charClassName="font-bold" />
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
