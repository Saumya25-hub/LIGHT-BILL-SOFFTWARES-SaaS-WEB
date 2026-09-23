import React from 'react';
import { Database, Cpu, ShieldCheck, Printer, Calendar, Smartphone, FileCheck2, Building2 } from 'lucide-react';

interface MarqueeItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

export const ClientLogoMarquee: React.FC = () => {
  const partners: MarqueeItem[] = [
    { name: 'SURAT TEXTILE HUB', category: 'Enterprise Weaving & Trading', icon: Building2 },
    { name: 'SQLITE 3.45 ENGINE', category: '0ms Offline Storage', icon: Database },
    { name: 'DIRECTX 12 GPU BLIT', category: '120 FPS High Speed Grids', icon: Cpu },
    { name: 'GSTN E-INVOICE V2', category: 'Govt Direct Tax API', icon: FileCheck2 },
    { name: 'THERMAL POS 80MM', category: 'ESC/POS High Speed', icon: Printer },
    { name: 'KOTLIN MULTIPLATFORM', category: 'Android Mobile Studio', icon: Smartphone },
    { name: 'HINDU PANCHANG 2040', category: 'Tithi & Festival Almanac', icon: Calendar },
    { name: 'AES-256 SOVEREIGN', category: '100% On-Premise Air-Gapped', icon: ShieldCheck },
  ];

  // Duplicate for seamless infinite loop
  const displayList = [...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-6 border-y border-amber-500/20 bg-[#080706]/95 select-none">
      
      {/* Left/Right Edge Feather Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#070605] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#070605] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8 sm:gap-12">
        {displayList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-400/30 hover:bg-amber-500/[0.05] transition-all duration-300 group cursor-default shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-grotesk font-bold tracking-wider text-xs sm:text-sm text-neutral-200 group-hover:text-amber-200 transition-colors uppercase">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
