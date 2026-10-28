import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SoftwareSuiteListBoxProps {
  onNavigate: (path: string) => void;
  onLaunchDemo?: () => void;
}

export const SoftwareSuiteListBox: React.FC<SoftwareSuiteListBoxProps> = ({
  onNavigate,
  onLaunchDemo,
}) => {
  const [selectedSoftware, setSelectedSoftware] = useState<'erp' | '8pm' | 'inventory' | 'gym'>('8pm');

  const products = [
    {
      id: 'erp' as const,
      name: 'Signatures Light Bill ERP',
      shortName: 'Full Business ERP',
      tagline: 'Comprehensive Offline-First Billing & Inventory ERP',
      icon: '🧾',
      status: 'Live Production',
      statusColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      description:
        'Engineered for wholesale traders, retail shops, and manufacturers. Features statutory E-Way bill generation, BNVE formula visual nodes, live GSTIN API auto-fill with pincode mapping, and air-gapped SQLite vault.',
      highlights: [
        '0ms Query Speed (Relational SQLite)',
        'Live GSTIN Auto-fill with Pincode',
        'BOS E-Way Bill & Dispatch Engine',
        'Windows Desktop + Android Companion',
      ],
      primaryActionLabel: 'Explore ERP Product',
      primaryAction: () => onNavigate('/product'),
      secondaryActionLabel: 'Launch Demo',
      secondaryAction: () => (onLaunchDemo ? onLaunchDemo() : onNavigate('/demo')),
    },
    {
      id: '8pm' as const,
      name: '8 PM Pool & Snooker Club Management',
      shortName: '8PM Pool Software',
      tagline: 'Precision Table Timers, LP Tournament & Club Member Ledger',
      icon: '🎱',
      status: 'v2.3 Pro New Release',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      description:
        'Tailor-made for billiards, pool, and snooker clubs. Eliminates table disputes with live per-minute or hourly clocks, 1v1 to 3v3 loser-pays tournament matching, member dues ledger, and instant WhatsApp receipts.',
      highlights: [
        'Dual Billing Engine (Hourly & Per-Minute)',
        '1v1 to 3v3 Loser-Pays Settlement',
        'Digital Member Ledger & WhatsApp Dues',
        'Offline DEV-TOOL Support Recovery',
      ],
      primaryActionLabel: 'Open 8 PM Club Page ➜',
      primaryAction: () => onNavigate('/8pm'),
      secondaryActionLabel: 'View Pricing (₹399/mo)',
      secondaryAction: () => onNavigate('/8pm'),
    },
    {
      id: 'inventory' as const,
      name: 'STOMS Inventory Pro Engine',
      shortName: 'Inventory Pro',
      tagline: 'Multi-Warehouse Barcode Stock & Serial Tracking',
      icon: '📦',
      status: 'Coming Soon',
      statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      description:
        'High-speed batch and expiry tracking, intelligent minimum-stock alerts, multi-warehouse transfers, and wireless handheld barcode scanner integration.',
      highlights: [
        'Multi-Warehouse Stock Rebalancing',
        'Batch & Expiry Date Management',
        'Barcode Label Generator & Printing',
        'Low-Stock Automated Alerts',
      ],
      primaryActionLabel: 'In Development',
      primaryAction: () => {},
    },
    {
      id: 'gym' as const,
      name: 'STOMS Gym & Fitness Club Manager',
      shortName: 'Gym App',
      tagline: 'Biometric Access, Member Subscriptions & Trainer Allocation',
      icon: '🏋️',
      status: 'Coming Soon',
      statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description:
        'Complete fitness center management: RFID turnstile integration, monthly recurring membership plans, diet chart planner, and member attendance logs.',
      highlights: [
        'Biometric & RFID Turnstile Control',
        'Automated Monthly Renewal Reminders',
        'Personal Trainer Slot Scheduling',
        'WhatsApp Payment Links & Receipts',
      ],
      primaryActionLabel: 'In Development',
      primaryAction: () => {},
    },
  ];

  const current = products.find((p) => p.id === selectedSoftware) || products[1];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Container Frame with Golden Ornaments */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#14120D]/95 via-[#0C0B08]/98 to-[#060504] border border-amber-500/30 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-amber-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STOMS Commercial Software Suite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Select Your Industry Software
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Click on any software below to switch workspaces and view specialized product capabilities.
          </p>
        </div>

        {/* The 4 Software Tabs / List Box Header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {products.map((item) => {
            const isSelected = selectedSoftware === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedSoftware(item.id)}
                className={`relative flex items-center gap-3 p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer select-none ${
                  isSelected
                    ? item.id === '8pm'
                      ? 'bg-emerald-950/40 border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.25)] scale-[1.02]'
                      : 'bg-amber-950/40 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.02]'
                    : 'bg-[#100F0C] border-white/10 hover:border-white/20 hover:bg-[#161410]'
                }`}
              >
                <div className="text-2xl sm:text-3xl shrink-0 p-1.5 rounded-xl bg-black/40 border border-white/5">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                      {item.shortName}
                    </span>
                  </div>
                  <span
                    className={`inline-block text-[9.5px] font-bold px-1.5 py-0.2 rounded mt-0.5 border ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                {isSelected && (
                  <div
                    className={`w-2 h-2 rounded-full absolute top-3 right-3 animate-ping ${
                      item.id === '8pm' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Product Interactive Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 rounded-2xl bg-[#090806] border border-white/10">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl">{current.icon}</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {current.name}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${current.statusColor}`}>
                {current.status}
              </span>
            </div>

            <p className="text-sm font-medium text-amber-300/90 italic">
              "{current.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {current.description}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-200">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      current.id === '8pm' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {current.id === '8pm' ? (
                <>
                  <button
                    onClick={() => onNavigate('/8pm')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Open 8 PM Club Website ➜</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('/8pm')}
                    className="px-5 py-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Special Price: ₹399/mo
                  </button>
                </>
              ) : current.id === 'erp' ? (
                <>
                  <button
                    onClick={current.primaryAction}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{current.primaryActionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {current.secondaryAction && (
                    <button
                      onClick={current.secondaryAction}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {current.secondaryActionLabel}
                    </button>
                  )}
                </>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  🚀 Currently under active development by STOMS Engineering
                </div>
              )}
            </div>
          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5 flex justify-center">
            {current.id === '8pm' ? (
              <div
                onClick={() => onNavigate('/8pm')}
                className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] cursor-pointer group"
              >
                <img
                  src="/assets/8pm_hero_bg.png"
                  alt="8 PM Pool & Snooker Club"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <img src="/assets/eight_ball.png" alt="8-ball" className="w-6 h-6 object-contain" />
                    <span className="font-black text-lg text-white">8 PM Club Edition</span>
                  </div>
                  <p className="text-[11px] text-emerald-300 mt-1">
                    Click here to enter the dedicated 3D VIP club portal ➜
                  </p>
                </div>
              </div>
            ) : current.id === 'erp' ? (
              <div
                onClick={() => onNavigate('/product')}
                className="relative w-full rounded-2xl overflow-hidden border border-amber-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] cursor-pointer group"
              >
                <img
                  src="/assets/desktop-sales-invoice.png"
                  alt="Signatures Light Bill ERP"
                  className="w-full h-56 sm:h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5">
                  <span className="font-black text-lg text-white">Signatures Light Bill ERP</span>
                  <p className="text-[11px] text-amber-300 mt-1">
                    Explore Enterprise Billing &amp; E-Way Dispatch ➜
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-56 sm:h-64 rounded-2xl bg-[#14120D] border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl mb-2">{current.icon}</span>
                <span className="text-sm font-bold text-white">{current.name}</span>
                <span className="text-xs text-amber-400 mt-1">Coming Soon in Phase 5</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
