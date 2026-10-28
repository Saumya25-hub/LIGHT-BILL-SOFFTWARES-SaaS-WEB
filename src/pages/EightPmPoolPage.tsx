import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Trophy, 
  BookOpen, 
  Receipt, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  Sparkles, 
  ChevronDown,
  Flame,
  Check
} from 'lucide-react';
import { EightPmFloatingBalls } from '../components/cinema/EightPmFloatingBalls';
import { EightPmSplash } from '../components/cinema/EightPmSplash';

interface EightPmPoolPageProps {
  onNavigate: (path: string) => void;
}

export const EightPmPoolPage: React.FC<EightPmPoolPageProps> = ({ onNavigate }) => {
  const [showSplash, setShowSplash] = useState(false);
  const [softwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);
  const [selectedBillingTab, setSelectedBillingTab] = useState<'monthly' | 'annual'>('annual');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 relative selection:bg-emerald-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* 8-Ball Loading Splash Screen */}
      <EightPmSplash
        isOpen={showSplash}
        onComplete={() => setShowSplash(false)}
        onCancel={() => setShowSplash(false)}
      />

      {/* ========================================================= */}
      {/* GLOBAL FIXED CINEMATIC LUXURY VIP CLUB BACKGROUND         */}
      {/* ========================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#07090E]">
        {/* Photorealistic AI-Rendered 4K VIP Club Interior with Smooth Camera Drift */}
        <div className="absolute -inset-8 animate-club-drift will-change-transform">
          <img
            src="/assets/luxury_vip_pool_club_bg.jpg"
            alt="Luxury VIP Pool & Snooker Club Interior"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.18]"
          />
        </div>
        
        {/* Deep Ambient Dark Radial Vignettes for Maximum Contrast & Readability */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07090E]/65 to-[#07090E]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0E14]/85 via-transparent to-[#07090E]/95" />
      </div>

      {/* Global Scroll-Driven 3D Billiard Balls Physics Canvas */}
      <EightPmFloatingBalls />

      {/* ========================================================= */}
      {/* 1. TOP VIP CLUB STICKY NAVIGATION BAR                     */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0C0E14]/90 backdrop-blur-xl border-b border-[#1F2536] py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-slate-900 border border-amber-500/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <img src="/assets/eight_ball.png" alt="8 PM Pool Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  8 PM
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  v2.3 PRO
                </span>
              </div>
              <span className="text-[10.5px] font-medium text-slate-400 tracking-wide">
                POOL &amp; SNOOKER CLUB SUITE
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              Club Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('pricing')} className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              Pricing Plans
            </button>
            <button onClick={() => scrollToSection('download')} className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
              Download .exe
            </button>
            <button onClick={() => setShowSplash(true)} className="px-3 py-1.5 rounded-lg text-amber-400 hover:bg-amber-400/10 border border-amber-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold">
              <span>🎱 Replay Splash</span>
            </button>
          </nav>

          {/* Right Action: Software Ecosystem Dropdown + Back to ERP Button */}
          <div className="flex items-center gap-2.5">
            {/* Software Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSoftwareDropdownOpen(!softwareDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1C212E] border border-[#242C3F] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                <span>⚡ STOMS Apps</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {softwareDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0F121A] border border-[#232A3B] shadow-[0_15px_40px_rgba(0,0,0,0.9)] p-2 z-50 animate-fade-in">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    STOMS Software Ecosystem
                  </div>
                  
                  {/* 1. Full ERP */}
                  <div
                    onClick={() => { setSoftwareDropdownOpen(false); onNavigate('/'); }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/70 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🧾</span>
                      <div>
                        <div className="text-xs font-bold text-white">Full ERP Suite</div>
                        <div className="text-[10px] text-slate-400">Signatures Light Bill ERP</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-sky-400 font-bold">Go ➜</span>
                  </div>

                  {/* 2. 8PM (Current) */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎱</span>
                      <div>
                        <div className="text-xs font-bold text-emerald-400">8PM Pool Software</div>
                        <div className="text-[10px] text-emerald-200/80">Pool &amp; Snooker Club</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300">Active</span>
                  </div>

                  {/* 3. Inventory */}
                  <div className="flex items-center justify-between p-2 rounded-lg opacity-70 cursor-not-allowed">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📦</span>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Inventory Pro</div>
                        <div className="text-[10px] text-slate-500">Warehouse &amp; Stock</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Soon</span>
                  </div>

                  {/* 4. Gym App */}
                  <div className="flex items-center justify-between p-2 rounded-lg opacity-70 cursor-not-allowed">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🏋️</span>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Gym Manager</div>
                        <div className="text-[10px] text-slate-500">Fitness &amp; Memberships</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Soon</span>
                  </div>
                </div>
              )}
            </div>

            {/* Back to ERP Direct Button */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
            >
              <span>Back to ERP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. CINEMATIC HERO SECTION                                 */}
      {/* ========================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden z-10">
        
        {/* Hero Content Container */}
        <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141824]/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              8 PM Pool &amp; Snooker Club Management • v2.3 Pro
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 drop-shadow-2xl">
            Smart Club Table Billing{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Built for Champions.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl text-base sm:text-lg text-slate-300 leading-relaxed mb-8 drop-shadow">
            Eliminate customer disputes, paper registers, and cloud server lag. Experience live per-minute or hourly table timers, 1v1 to 3v3 loser-pays tournament matching, member dues recovery, and instant WhatsApp billing — all powered by an offline relational SQLite engine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('download')}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Windows App (.exe)</span>
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141824]/90 hover:bg-[#1E2536] border border-amber-500/40 text-amber-300 font-bold text-sm hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Special Offer: ₹399/mo</span>
            </button>

            <button
              onClick={() => scrollToSection('features')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700/60 transition-all cursor-pointer"
            >
              <span>Explore Features ➜</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-6 border-t border-slate-800/80 text-left">
            <div className="bg-[#0C0E14]/85 border border-[#1F2536] rounded-xl p-3.5 backdrop-blur-md">
              <div className="text-xl font-black text-amber-400">0s Cloud Lag</div>
              <div className="text-xs text-slate-400 mt-0.5">100% Offline SQLite Vault</div>
            </div>
            <div className="bg-[#0C0E14]/85 border border-[#1F2536] rounded-xl p-3.5 backdrop-blur-md">
              <div className="text-xl font-black text-emerald-400">Dual Pricing</div>
              <div className="text-xs text-slate-400 mt-0.5">Hourly + Per-Minute Engine</div>
            </div>
            <div className="bg-[#0C0E14]/85 border border-[#1F2536] rounded-xl p-3.5 backdrop-blur-md">
              <div className="text-xl font-black text-sky-400">1v1 to 3v3</div>
              <div className="text-xs text-slate-400 mt-0.5">LP Tournament Settlement</div>
            </div>
            <div className="bg-[#0C0E14]/85 border border-[#1F2536] rounded-xl p-3.5 backdrop-blur-md">
              <div className="text-xl font-black text-purple-400">Offline Recovery</div>
              <div className="text-xs text-slate-400 mt-0.5">DEV-TOOL Authority Keys</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. DEEP DIVE FEATURE BREAKDOWN (EXPLAINED FOR CLUB OWNERS) */}
      {/* ========================================================= */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Engineered For Billiards, Pool &amp; Snooker Clubs
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Everything You Need to Run a Profitable Club
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Standard retail POS software fails in pool clubs because billiard clubs run on live table minutes, walk-ins, loser-pays matches, and player credit ledgers. 8 PM is tailor-made for this exact workflow.
          </p>
        </div>

        {/* 6 Core Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Dual Billing Engine */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Dual Billing Engine (Per-Minute &amp; Hourly)</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Charge tables strictly by elapsed minutes (e.g. 35 mins @ ₹4/min = ₹140) or standard hourly slots (e.g. 2 hrs @ ₹200/hr = ₹400). Switch pricing methods per table with one click.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                💰 Owner Benefit: Zero disputes on 20-30 min overtime matches.
              </span>
            </div>
          </div>

          {/* 2. LP Tournament & Loser Settlement */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. LP (Loser-Pays) Match Engine</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Full support for 1v1, 1v1v1, 1v1v1v1, 2v2, and 3v3 formats. When the match ends, select the single loser or losing team — the entire session bill automatically transfers to their ledger.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                🏆 Owner Benefit: Fast table turnover with automatic match billing.
              </span>
            </div>
          </div>

          {/* 3. Live Active Table Floor Grid */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Real-Time Table Floor Grid</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Second-by-second live duration clocks, visual color status (Available, In Use, Booked), table categories (Pool, Mini Snooker, English Snooker), and custom VIP subtypes.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                👀 Owner Benefit: Glance at the screen and monitor all 12 tables instantly.
              </span>
            </div>
          </div>

          {/* 4. Member Ledger & Dues Tracking */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Digital Member Ledger (Dues &amp; Advances)</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Maintain player credit accounts with credit limits, advance balance, outstanding dues, and payment logs. Send WhatsApp balance reminders in one click.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                📈 Owner Benefit: Recover ₹25,000+ in previously lost player credit.
              </span>
            </div>
          </div>

          {/* 5. WhatsApp & Thermal PDF Invoices */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5. WhatsApp Bills &amp; Thermal Receipts</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Send itemized session breakdown directly to player's WhatsApp phone number. Instant print support for standard 80mm thermal receipt printers without paper waste.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                📱 Owner Benefit: VIP club branding that builds trust and loyalty.
              </span>
            </div>
          </div>

          {/* 6. DEV-TOOL Offline Recovery Authority */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-6 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">6. Offline DEV-TOOL Recovery Authority</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Forgot password? 8 PM generates a deterministic Crockford Base32 recovery key (`SB-XXXX-XXXX-XXXX`). STOMS Support issues a cryptographic Reset Key to unlock offline. Zero internet needed.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                🛡️ Owner Benefit: Zero downtime and zero cloud security risks.
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. PRICING SECTION (MONTHLY ₹399 & ANNUAL ₹3999)         */}
      {/* ========================================================= */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-20">
        
        {/* Pricing Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Transparent Pricing • No Hidden Setup Fees
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Invest in Software That Pays for Itself on Day 1
          </h2>
          <p className="text-slate-400 text-sm">
            Save thousands in uncollected table time, duplicate registers, and billing mistakes. Choose the plan that fits your club.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 rounded-xl bg-[#0C0E14] border border-[#1F2536] mt-6">
            <button
              onClick={() => setSelectedBillingTab('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBillingTab === 'monthly'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly License
            </button>
            <button
              onClick={() => setSelectedBillingTab('annual')}
              className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedBillingTab === 'annual'
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Pro License</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-slate-900 font-extrabold uppercase">Save ₹700</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Monthly Club License */}
          <div className="rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Club Pass</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">Flexible</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-slate-500 line-through">₹599</span>
                <span className="text-4xl font-black text-white">₹399</span>
                <span className="text-xs font-medium text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-amber-400 font-semibold mb-6">
                🔥 Special 33% Inaugural Discount
              </p>

              {/* Inclusions */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited tables (Pool, Snooker, Mini)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dual billing engine (Hourly + Per-Minute)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1v1 to 3v3 Loser-Pays tournament engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Member ledger &amp; credit recovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant WhatsApp receipts &amp; thermal printing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Encrypted local SQLite database</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => scrollToSection('download')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Get Started with 30-Day Free Trial
            </button>
          </div>

          {/* Card 2: Annual Pro Club License (Highlighted) */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#141C2B] to-[#0C0E14] border-2 border-emerald-500/60 p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            
            {/* Top Best Value Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
              ⭐ Most Popular &amp; Best Club Value
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Annual Pro License</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  2 Months Free
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold text-slate-500 line-through">₹4,699</span>
                <span className="text-4xl font-black text-emerald-400">₹3,999</span>
                <span className="text-xs font-medium text-slate-400">/ 12 months</span>
              </div>
              <p className="text-xs text-amber-300 font-semibold mb-6">
                ⚡ Save ₹700 + Includes Permanent DEV-TOOL Key
              </p>

              {/* Inclusions */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Everything in Monthly Pass included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Permanent offline ECDSA P-256 license key</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Graceful view-only lock (software never crashes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>STOMS Support VIP Priority assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free software updates for 1 whole year</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full database backup &amp; snapshot utility</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => scrollToSection('download')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
            >
              Activate Annual Pro License
            </button>
          </div>

        </div>

        {/* Guarantee Note */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>30-Day Free Trial starts automatically on first launch. No credit card required.</span>
          </p>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 5. WINDOWS DOWNLOAD SECTION                               */}
      {/* ========================================================= */}
      <section id="download" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#10141F] via-[#0C0E14] to-[#07090E] border border-[#232A3B] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Windows Desktop Application</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Download 8 PM for Windows
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Standalone native WPF application compiled on .NET 8.0. Lightning-fast performance with zero lag, instant thermal printer spooling, and offline database vault.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="bg-[#141824] p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">OS SUPPORT</span>
                <span className="font-semibold text-white">Windows 10 / 11 (64-bit)</span>
              </div>
              <div className="bg-[#141824] p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">VERSION</span>
                <span className="font-semibold text-emerald-400">v2.3 Pro (Stable)</span>
              </div>
              <div className="bg-[#141824] p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">STORAGE</span>
                <span className="font-semibold text-white">~35 MB (Lightweight)</span>
              </div>
            </div>
          </div>

          {/* Download Action Box */}
          <div className="w-full md:w-auto flex flex-col items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("8 PM v2.3 Pro installer download started. You can also run the precompiled binary directly from the local workspace: STOM-S\\STOM'S\\bin\\Debug\\net8.0-windows7.0\\STOM_S.exe");
              }}
              className="w-full sm:w-64 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm text-center shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Download 8PM Setup (.exe)</span>
            </a>
            <span className="text-[11px] text-slate-500 font-medium">
              SHA-256 Verified • No Internet Mandate
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ABOUT STOMS & ARCHITECTURE NOTE                       */}
      {/* ========================================================= */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-20 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">System Architecture</span>
          <h3 className="text-2xl font-bold text-white mt-1">Engineered by STOMS Ecosystem</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Founded by <strong>Saumya Chaudhari</strong> (Founder &amp; Chairman / Vision Architect). Built on a lean, high-performance architecture that values complete owner data sovereignty and zero reliance on fragile cloud servers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0C0E14] border border-[#1F2536]">
            <div className="text-amber-400 font-bold text-sm mb-1">Air-Gapped Reliability</div>
            <div className="text-slate-400 text-xs">Never stops running if the internet goes down.</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0C0E14] border border-[#1F2536]">
            <div className="text-emerald-400 font-bold text-sm mb-1">Hardware-Bound Vault</div>
            <div className="text-slate-400 text-xs">Device fingerprinting prevents unauthorized cloning.</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0C0E14] border border-[#1F2536]">
            <div className="text-sky-400 font-bold text-sm mb-1">Quantum Tar-Pit Shield</div>
            <div className="text-slate-400 text-xs">20+ Year cryptographic puzzle trap stops reverse-engineers.</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FOOTER                                                 */}
      {/* ========================================================= */}
      <footer className="py-10 px-4 border-t border-slate-900 bg-[#05070B] text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">8 PM</span>
            <span>• Pool &amp; Snooker Club Management</span>
            <span>(c) 2026 STOMS Ecosystem. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors">
              Signatures Light Bill ERP
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('download')} className="hover:text-white transition-colors">
              Download
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
