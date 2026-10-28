import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Badge } from '../ui/Badge';

export interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [softwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSoftwareDropdownOpen(false);
      }
    };
    if (softwareDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [softwareDropdownOpen]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Product', path: '/product' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Demo', path: '/demo' },
    { label: 'Download', path: '/download' },
    { label: 'About', path: '/about' },
    { label: 'Support', path: '/support' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setSoftwareDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-2xl backdrop-saturate-180 border border-white/85 shadow-[0_16px_36px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] py-2 sm:py-2.5 px-3.5 sm:px-6 ring-1 ring-slate-900/[0.05]'
            : 'bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)] py-2.5 sm:py-3 px-4 sm:px-6 ring-1 ring-slate-900/[0.03]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white/90 border border-slate-200/80 p-1.5 shadow-xs group-hover:border-sky-400/80 group-hover:scale-105 transition-all">
              <img
                src="/assets/cube_s_master.png"
                alt="SIGNATURES Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-sky-600 transition-colors">
                  {siteConfig.brand.productName}
                </span>
                <span className="hidden xl:inline-block">
                  <Badge variant="brand" size="sm">ERP</Badge>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10.5px] sm:text-[11px] text-slate-500 font-medium">
                <span>By {siteConfig.company.masterName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sky-600 font-semibold">Desktop + Android</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Apple Frosted Pill Items) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-semibold transition-all duration-200 select-none cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-900/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Software Suite List Box */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Software Types List Box (Placed right between Support & Try Demo as marked by user) */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setSoftwareDropdownOpen(!softwareDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0F1420] text-white hover:bg-[#182032] border border-slate-700/80 shadow-sm transition-all cursor-pointer select-none whitespace-nowrap shrink-0 group"
                aria-label="Software Suite Selector"
              >
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-300 font-medium">Software:</span>
                <span className="text-amber-400 font-extrabold flex items-center gap-1">
                  <span>{currentPath === '/8pm' ? '🎱' : '🧾'}</span>
                  <span>{currentPath === '/8pm' ? '8PM Pool' : 'Full ERP'}</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${softwareDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {softwareDropdownOpen && (
                <>
                  {/* Subtle backdrop scrim to dismiss on outside click */}
                  <div 
                    className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[0.5px]" 
                    onClick={() => setSoftwareDropdownOpen(false)} 
                  />

                  <div 
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0C101A] border border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-3 z-50 animate-fade-in divide-y divide-slate-800"
                  >
                    <div className="px-2 pb-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                          STOMS Software Suite
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          2 Active Apps
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2.5">
                      {/* 1. Full ERP */}
                      <div
                        onClick={() => handleLinkClick('/')}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                          currentPath !== '/8pm'
                            ? 'bg-sky-500/15 border border-sky-400/50 shadow-sm'
                            : 'hover:bg-slate-800/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-base shrink-0">
                            🧾
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>1. Full ERP</span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 border border-sky-400/40">Active</span>
                            </div>
                            <div className="text-[10.5px] text-slate-400 font-medium">Signatures Light Bill ERP</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
                      </div>

                      {/* 2. 8PM Pool Software */}
                      <div
                        onClick={() => handleLinkClick('/8pm')}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                          currentPath === '/8pm'
                            ? 'bg-emerald-500/20 border border-emerald-400/60 shadow-sm'
                            : 'hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-base shrink-0">
                            🎱
                          </div>
                          <div>
                            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                              <span>2. 8PM Pool Software</span>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-500/40">v2.3 Pro</span>
                            </div>
                            <div className="text-[10.5px] text-slate-400 font-medium">Pool &amp; Snooker Club Suite</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/40 shrink-0">
                          Open ➜
                        </span>
                      </div>

                      {/* 3. Inventory */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl opacity-50 cursor-not-allowed bg-slate-900/60 border border-dashed border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center text-base shrink-0">
                            📦
                          </div>
                          <div>
                            <div className="text-xs font-medium text-slate-300">3. Inventory Pro</div>
                            <div className="text-[10.5px] text-slate-500">Warehouse Stock &amp; Barcode</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                          Coming Soon
                        </span>
                      </div>

                      {/* 4. Gym App */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl opacity-50 cursor-not-allowed bg-slate-900/60 border border-dashed border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800/60 flex items-center justify-center text-base shrink-0">
                            🏋️
                          </div>
                          <div>
                            <div className="text-xs font-medium text-slate-300">4. Gym App</div>
                            <div className="text-[10.5px] text-slate-500">Fitness Members &amp; Turnstile</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('/demo')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-900/[0.05] transition-all cursor-pointer select-none"
            >
              Try Demo
            </button>
            <button
              onClick={() => handleLinkClick('/pricing')}
              className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.5)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer select-none shrink-0"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={() => handleLinkClick('/pricing')}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs cursor-pointer"
            >
              Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-900/[0.05] focus:outline-none transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Apple Frosted Glass Dropdown) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto sm:hidden max-w-7xl mx-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-4 space-y-3 ring-1 ring-slate-900/[0.05] animate-fade-in">
          {/* Software Ecosystem Mobile Selector */}
          <div className="p-2.5 rounded-2xl bg-slate-900 text-white space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Select Software Product
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLinkClick('/')}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-left cursor-pointer transition-colors"
              >
                <span className="text-base">🧾</span>
                <div>
                  <div className="text-xs font-bold text-white">1. Full ERP</div>
                  <div className="text-[9px] text-sky-300">Light Bill ERP</div>
                </div>
              </button>

              <button
                onClick={() => handleLinkClick('/8pm')}
                className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-left cursor-pointer transition-colors"
              >
                <span className="text-base">🎱</span>
                <div>
                  <div className="text-xs font-bold text-emerald-300">2. 8PM Pool</div>
                  <div className="text-[9px] text-emerald-200">v2.3 Pro Suite</div>
                </div>
              </button>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 opacity-40 text-left">
                <span className="text-base">📦</span>
                <div>
                  <div className="text-xs font-medium text-slate-300">3. Inventory</div>
                  <div className="text-[8.5px] text-slate-400">Coming Soon</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 opacity-40 text-left">
                <span className="text-base">🏋️</span>
                <div>
                  <div className="text-xs font-medium text-slate-300">4. Gym App</div>
                  <div className="text-[8.5px] text-slate-400">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200/80 space-y-2">
            <div className="px-2 py-1 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 35-Day Full Trial
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> ₹1,999/yr Offer
              </span>
            </div>
            <button
              onClick={() => handleLinkClick('/pricing')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-md cursor-pointer"
            >
              Start Free Trial ➜
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
