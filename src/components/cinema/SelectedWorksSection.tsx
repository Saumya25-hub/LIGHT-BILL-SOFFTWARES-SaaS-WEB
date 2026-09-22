import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  description: string;
  tech: string[];
  stats: { label: string; value: string }[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'signatures-desktop',
    title: 'SIGNATURES BILL ERP',
    subtitle: 'Commercial Offline-First GST Invoicing Suite',
    category: 'Enterprise Windows Software',
    year: '2026',
    image: '/assets/desktop-sales-invoice.png',
    description: 'A mission-critical commercial billing and ledger engine engineered for Indian retail merchants and distributors. Built with an immutable transaction log, sub-millisecond local SQLite execution, and automated GST calculations.',
    tech: ['C# .NET 8.0', 'WPF Hardware Acceleration', 'SQLite Database', 'PBKDF2 Security'],
    stats: [
      { label: 'Latency', value: '< 1ms Local' },
      { label: 'Reliability', value: '100% Offline' },
      { label: 'Encryption', value: 'PBKDF2 100k' }
    ],
    featured: true,
  },
  {
    id: 'signatures-mobile',
    title: 'SIGNATURES COMPANION',
    subtitle: 'Google Drive Synchronized Mobile Visibility',
    category: 'Native Android Kotlin',
    year: '2026',
    image: '/assets/mobile-spec-design.png',
    description: 'The certified Android companion viewer deployed on Google Play Store. Empowers business owners to audit daily sales, inspect running party ledgers, and check stock movements on the go via private Google Drive snapshots.',
    tech: ['Kotlin 2.0', 'Jetpack Compose', 'Google Drive OAuth', 'Android Keystore'],
    stats: [
      { label: 'Target SDK', value: 'API 36' },
      { label: 'Sync Mechanism', value: 'Private Drive' },
      { label: 'Security', value: 'Biometric' }
    ],
    featured: false,
  },
  {
    id: 'catalog-studio',
    title: 'CATALOG STUDIO 3D',
    subtitle: 'Dynamic Digital Showroom & Export Engine',
    category: 'Creative Design & Publishing',
    year: '2026',
    image: '/assets/desktop-catalog-builder.png',
    description: 'An automated catalog generation pipeline that converts tabular inventory records into visual, publication-ready commercial PDF lookbooks and product catalogs with automated layout composition.',
    tech: ['Vector Graphics', 'PDF Engine', 'Spatial Layout', 'Multi-Theme UI'],
    stats: [
      { label: 'Export Speed', value: '250 Pages/min' },
      { label: 'Format', value: 'Vector PDF & PNG' },
      { label: 'Themes', value: '12 Curated' }
    ],
    featured: false,
  },
  {
    id: 'dev-tool-suite',
    title: 'DEV-TOOL & PACKAGING',
    subtitle: 'Security Infrastructure & Release Pipeline',
    category: 'Security & Automation Engine',
    year: '2026',
    image: '/assets/desktop-reports-hub.png',
    description: 'Custom internal security tooling providing RSA-signed licensing, forensic stress-testing frameworks, and tamper-evident update distribution for mission-critical enterprise deployments.',
    tech: ['RSA Cryptography', 'Inno Setup Engine', 'Forensic Auditing', 'CI/CD Pipelines'],
    stats: [
      { label: 'Key Strength', value: 'RSA 4096-bit' },
      { label: 'Integrity', value: 'SHA-256 Verified' },
      { label: 'Coverage', value: '100% Critical Paths' }
    ],
    featured: true,
  }
];

export const SelectedWorksSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="relative w-full py-28 px-6 sm:px-10 lg:px-14 bg-black text-white overflow-hidden">
      {/* Subtle backdrop illumination */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-purple-950/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-indigo-950/20 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono text-purple-400 tracking-[0.25em] uppercase">
              03. SELECTED WORKS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
              Things I've <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 glow-lavender">Brought to Life</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            A curated portfolio of commercial systems, native companion applications, and creative software architectures crafted at S TOM’S.
          </p>
        </div>

        {/* Asymmetrical Editorial Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {projects.map((proj) => {
            const isLarge = proj.featured;
            const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={proj.id}
                className={`${colSpan} group relative rounded-3xl border border-white/10 bg-[#080718] overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] flex flex-col justify-between cursor-pointer`}
                onClick={() => setSelectedProject(proj)}
              >
                {/* Visual Image Preview */}
                <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-black/60">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080718] via-transparent to-black/30" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-slate-300">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-950/80 backdrop-blur-md border border-purple-500/40 text-purple-300 font-bold">
                      {proj.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-purple-200 transition-colors flex items-center justify-between">
                      <span>{proj.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-purple-400 font-mono tracking-wider">
                      {proj.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>

                  {/* Tech Pill List */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tech.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                    {proj.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-[10px] text-slate-500 uppercase">{s.label}</div>
                        <div className="text-slate-200 font-semibold">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl rounded-3xl border border-purple-500/30 bg-[#09071c] p-6 sm:p-10 text-white shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">{selectedProject.category} • {selectedProject.year}</span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">{selectedProject.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Preview Image */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
            </div>

            {/* Detailed Description */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-purple-300 uppercase tracking-wider">Project Architecture & Scope:</h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {selectedProject.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-4 text-xs font-mono text-slate-400">
                {selectedProject.stats.map(s => (
                  <span key={s.label}><strong>{s.label}:</strong> {s.value}</span>
                ))}
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs tracking-wider transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
