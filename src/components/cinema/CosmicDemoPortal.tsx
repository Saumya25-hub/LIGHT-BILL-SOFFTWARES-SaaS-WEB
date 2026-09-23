import React from 'react';
import {
  Zap,
  ArrowRight,
  FileText,
  Users,
  Search,
  Package,
  ShieldCheck,
  Layers,
  Printer
} from 'lucide-react';
import { RollingText } from '../ui/RollingText';

interface CosmicDemoPortalProps {
  onLaunchDemo: () => void;
  onNavigate: (path: string) => void;
}

export const CosmicDemoPortal: React.FC<CosmicDemoPortalProps> = ({
  onLaunchDemo,
  onNavigate,
}) => {
  return (
    <section
      id="demo-portal"
      className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden bg-transparent select-none"
    >
      {/* Background Radial Ambient Golden Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 50%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Main Glassmorphic Container with Componine Golden Corner Brackets */}
      <div className="frame-corner-card relative z-10 max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        {/* 4 Golden Corner Ornaments */}
        <div className="frame-corner-ornament frame-corner-top-left" />
        <div className="frame-corner-ornament frame-corner-top-right" />
        <div className="frame-corner-ornament frame-corner-bottom-left" />
        <div className="frame-corner-ornament frame-corner-bottom-right" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-amber-500/20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 font-mono text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>ENTERPRISE SANDBOX // 0MS OFFLINE-FIRST KERNEL</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE SIMULATOR ACTIVE
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-200/80">VERIFIED DESKTOP V1</span>
          </div>
        </div>

        {/* Center Headline & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-grotesk font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05]">
            Step Inside The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 glow-gold">
              0ms Live Engine
            </span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Experience the official desktop billing software right inside your browser. No installation or registration needed. Test real offline GST billing, barcode scanning, party rates, factory EMS payroll, and instant thermal printing.
          </p>
        </div>

        {/* 4 Interactive Feature Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Feature 1 */}
          <div className="p-5 rounded-2xl border border-amber-500/15 bg-white/[0.02] hover:border-amber-400/40 hover:bg-amber-500/[0.05] transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk font-bold text-sm text-white mb-1.5 uppercase tracking-wide">
              GST Billing & Tax Engine
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Auto CGST/SGST/IGST breakdown, inclusive/exclusive GST toggle, line discounts, and instant thermal receipt preview.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-5 rounded-2xl border border-amber-500/15 bg-white/[0.02] hover:border-amber-400/40 hover:bg-amber-500/[0.05] transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk font-bold text-sm text-white mb-1.5 uppercase tracking-wide">
              Factory EMS & Payroll
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Monthly/Daily wage cycles, automatic cash advance deductions, and user-editable absent penalty adjustments.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-5 rounded-2xl border border-amber-500/15 bg-white/[0.02] hover:border-amber-400/40 hover:bg-amber-500/[0.05] transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk font-bold text-sm text-white mb-1.5 uppercase tracking-wide">
              Ctrl+K & Hindu Panchang
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Lightning command palette with verified 2026–2040 Indian festivals & Surat Textile Market trading holidays.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-5 rounded-2xl border border-amber-500/15 bg-white/[0.02] hover:border-amber-400/40 hover:bg-amber-500/[0.05] transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-grotesk font-bold text-sm text-white mb-1.5 uppercase tracking-wide">
              Stock & Party Ledgers
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Low-stock alerts, multi-unit KG/PCS pricing, opening balances, credit terms, and GSTIN verification lookup.
            </p>
          </div>
        </div>

        {/* Giant Call-to-Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Main Launch Button triggering Componine Shutter Splash */}
          <button
            onClick={onLaunchDemo}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-grotesk font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:shadow-[0_0_65px_rgba(245,158,11,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-amber-200 cursor-pointer overflow-hidden"
          >
            {/* Halftone texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px] animate-halftone" />
            
            <Zap className="w-5 h-5 text-black fill-black animate-pulse" />
            <RollingText text="LAUNCH LIVE ERP SIMULATOR (SANDBOX)" charClassName="font-black text-black" />
            <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Product Architecture link */}
          <button
            onClick={() => onNavigate('/product')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 sm:py-5 rounded-full border border-white/15 hover:border-amber-400/40 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-grotesk font-semibold text-sm transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <RollingText text="Explore Product Architecture" charClassName="font-semibold" />
          </button>
        </div>

        {/* Micro Credibility Notes */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-neutral-400 pt-8 mt-6 border-t border-amber-500/15 text-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Sandbox • No Sign-up Required</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Zero-Latency SQLite 3.45 Speed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Full A4 & Thermal 80mm Print Blit</span>
          </span>
        </div>

      </div>
    </section>
  );
};
