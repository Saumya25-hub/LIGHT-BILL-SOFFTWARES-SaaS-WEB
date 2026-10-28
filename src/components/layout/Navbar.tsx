import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Button';
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 p-1.5 shadow-sm group-hover:border-sky-400/80 transition-colors">
              <img
                src="/assets/cube_s_master.png"
                alt="SIGNATURES Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-slate-900 text-base tracking-tight group-hover:text-sky-600 transition-colors">
                  {siteConfig.brand.productName}
                </span>
                <span className="hidden xl:inline-block">
                  <Badge variant="brand" size="sm">ERP</Badge>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span>By {siteConfig.company.masterName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sky-600 font-semibold">Desktop + Android</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 font-semibold border border-sky-100 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
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

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLinkClick('/demo')}
              className="text-slate-700 hover:text-slate-900"
            >
              Try Demo
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => handleLinkClick('/pricing')}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleLinkClick('/pricing')}
              className="px-2.5 py-1.5 text-xs"
            >
              Free Trial
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* Software Ecosystem Mobile Selector */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-1">
              Select Software Product
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleLinkClick('/')}
                className="flex items-center gap-1.5 p-2 rounded-lg bg-sky-50 border border-sky-200 text-left cursor-pointer"
              >
                <span className="text-base">🧾</span>
                <div>
                  <div className="text-xs font-bold text-sky-900">1. Full ERP</div>
                  <div className="text-[9px] text-sky-600">Light Bill ERP</div>
                </div>
              </button>

              <button
                onClick={() => handleLinkClick('/8pm')}
                className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-left cursor-pointer"
              >
                <span className="text-base">🎱</span>
                <div>
                  <div className="text-xs font-bold text-amber-900">2. 8PM Pool</div>
                  <div className="text-[9px] text-amber-600">v2.3 Pro Suite</div>
                </div>
              </button>

              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-100/60 border border-slate-200 opacity-60 text-left">
                <span className="text-base">📦</span>
                <div>
                  <div className="text-xs font-medium text-slate-700">3. Inventory</div>
                  <div className="text-[8.5px] text-slate-400">Coming Soon</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-100/60 border border-slate-200 opacity-60 text-left">
                <span className="text-base">🏋️</span>
                <div>
                  <div className="text-xs font-medium text-slate-700">4. Gym App</div>
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
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-100'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <div className="px-2 py-1 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 35-Day Full Trial
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> ₹1,999/yr Offer
              </span>
            </div>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => handleLinkClick('/pricing')}
            >
              Start Free Trial (35 Days)
            </Button>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => handleLinkClick('/demo')}
            >
              Explore Interactive Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
