import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  Wifi,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Database,
  Sparkles,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export interface MultiCounterPageProps {
  onNavigate: (path: string) => void;
  onLaunchDemo?: () => void;
}

export const MultiCounterPage: React.FC<MultiCounterPageProps> = ({
  onNavigate,
  onLaunchDemo,
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<number>(0);

  const workflows = [
    {
      title: 'Collision-Free Invoicing',
      tag: 'Independent Prefixes',
      desc: 'Counter A creates INV-A001, INV-A002 while Counter B simultaneously creates INV-B001, INV-B002. Neither cashier ever waits for the other, preventing long checkout lines during peak store hours.',
      badge: 'Zero Lock Contention',
      icon: Zap,
    },
    {
      title: 'Instant Master Catalog Sync',
      tag: 'No Re-entry Needed',
      desc: 'Add a new product, barcode, price change, or customer account on the Main Counter PC. Within 1 second, the secondary laptop receives the entire update automatically across your local LAN.',
      badge: '< 1 ms Local Latency',
      icon: RefreshCw,
    },
    {
      title: 'Unified Store Revenue Audit',
      tag: 'Real-Time Consolidation',
      desc: 'The store owner sitting at Counter A sees real-time combined revenue: Counter A Sales + Counter B Sales = Total Daily Business. Monitor total cash, UPI collections, and stock changes from one screen.',
      badge: 'Live Dashboard',
      icon: Database,
    },
    {
      title: 'Zero-Loss Offline Protection',
      tag: 'Unbreakable Continuity',
      desc: 'If the Wi-Fi router loses power or disconnects, Counter B never freezes. It saves every sale securely into its local SQLite database, and automatically forwards all pending receipts the moment connection is restored.',
      badge: 'Local Queue Outbox',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-900 pb-24 font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold tracking-wide uppercase mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Multi-Counter Local Network Engine • Dual-PC Sync</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          1 Retail Store. 2 Billing Counters. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
            100% Real-Time Synchronized.
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
          Power your retail shop with two checkout counters running simultaneously on your local Wi-Fi or LAN cable.
          Zero cloud latency, zero monthly subscription fees, and 100% offline billing that never stops.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={() => onNavigate('/download')}
            className="flex items-center gap-2 shadow-lg shadow-sky-500/25"
          >
            <span>Download Free 35-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {onLaunchDemo && (
            <Button
              size="lg"
              variant="outline"
              onClick={onLaunchDemo}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Launch Interactive Demo</span>
            </Button>
          )}
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Independent Series (INV-A & INV-B)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Zero Internet Required (Pure Local LAN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Runs Smoothly on Basic Core i3 PCs</span>
          </div>
        </div>
      </section>

      {/* 2. Visual Architecture Diagram (2 PCs in 1 Shop) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 lg:p-14 text-white shadow-2xl border border-slate-800 overflow-hidden">
          {/* Subtle Ambient Grid Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              NETWORK TOPOLOGY & DATA FLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
              How Dual Counters Work in Your Shop
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Both computers communicate directly inside your store without sending sensitive sales data to external cloud servers.
            </p>
          </div>

          {/* Interactive Dual-Node Architecture Display */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-7 gap-6 items-center">
            
            {/* NODE 1: Counter A (Main PC / Shop A Hub) */}
            <div className="lg:col-span-3 rounded-2xl bg-slate-800/80 border border-sky-500/30 p-6 sm:p-8 backdrop-blur-md shadow-xl hover:border-sky-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Counter A (Shop A)</h3>
                    <p className="text-xs font-mono text-sky-300">Main Coordinator Hub</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Host Online
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Invoice Series:</span>
                  <span className="font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                    INV-A001, INV-A002...
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Database Role:</span>
                  <span className="font-semibold text-sky-300">Master SQLite Engine</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Functions:</span>
                  <span className="text-right text-slate-200">Catalog Entry, Reports, Total Audit</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Hardware:</span>
                  <span className="text-right text-slate-200">Main Desktop PC at Cash Desk</span>
                </div>
              </div>
            </div>

            {/* CENTER BRIDGE: Local LAN / Wi-Fi Router */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-4">
              <div className="relative w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_25px_rgba(14,165,233,0.3)] animate-pulse">
                <Wifi className="w-8 h-8" />
              </div>
              <div className="text-center mt-3">
                <span className="text-xs font-mono font-bold text-sky-400 block">LOCAL LAN</span>
                <span className="text-[11px] text-slate-400 block">&lt; 1 ms Speed</span>
                <span className="text-[10px] text-emerald-400 font-medium">No Internet Needed</span>
              </div>
            </div>

            {/* NODE 2: Counter B (Secondary Terminal / Shop B Laptop) */}
            <div className="lg:col-span-3 rounded-2xl bg-slate-800/80 border border-indigo-500/30 p-6 sm:p-8 backdrop-blur-md shadow-xl hover:border-indigo-400/60 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Counter B (Shop B)</h3>
                    <p className="text-xs font-mono text-indigo-300">Fast POS Terminal</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  ✓ Synced
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Invoice Series:</span>
                  <span className="font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                    INV-B001, INV-B002...
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Sync Engine:</span>
                  <span className="font-semibold text-indigo-300">RetailLanSyncEngine</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Functions:</span>
                  <span className="text-right text-slate-200">Rapid POS Billing, Barcode Scan, Thermal Print</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-700/50">
                  <span className="text-slate-400">Hardware:</span>
                  <span className="text-right text-slate-200">Laptop / Counter 2 Terminal</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Live Summary Bar */}
          <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Security: Windows DPAPI Vault + AES Session Keys</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Discovery: Automatic UDP Beaconing + Manual Port 18590 Fallback</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Offline Tolerance: Infinite Queued Sales with Automatic Push</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive Workflow Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand">AUTONOMOUS ARCHITECTURE</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Built for Real-World Retail Checkout Speed
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Designed specifically for busy Indian retail shops where high customer footfall demands simultaneous, zero-delay billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflows.map((wf, idx) => {
            const Icon = wf.icon;
            return (
              <Card
                key={idx}
                variant="hoverable"
                padding="lg"
                className={`transition-all ${
                  activeWorkflowTab === idx
                    ? 'border-sky-400 ring-2 ring-sky-400/20 shadow-lg'
                    : ''
                }`}
                onClick={() => setActiveWorkflowTab(idx)}
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 border border-sky-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                  {wf.tag}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{wf.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{wf.desc}</p>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                  {wf.badge}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. Simple 3-Minute Pairing Walkthrough */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-600 uppercase">
              ZERO IT KNOWLEDGE REQUIRED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Setup 2 Counters in Under 3 Minutes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              No complicated IP addressing or network setup. The software discovers your computers automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center mb-4 text-base shadow-md">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Open Counter A (Main PC)</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Launch Signatures Bill on your Main PC. Open <strong>POS Counter</strong>. It assigns prefix <code>INV-A</code> automatically.
              </p>
              <div className="mt-auto px-3 py-1.5 rounded-lg bg-sky-100/60 text-sky-800 text-xs font-mono font-semibold">
                Badge: Counter A (Shop A)
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center mb-4 text-base shadow-md">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Connect Counter B (Laptop)</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                On your second laptop, click <strong>&quot;Join Existing Business via LAN&quot;</strong>. Select Cashier and enter the 6-digit pairing code shown on Main PC.
              </p>
              <div className="mt-auto px-3 py-1.5 rounded-lg bg-sky-100/60 text-sky-800 text-xs font-mono font-semibold">
                OTP: 6-Digit Secure Code
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-4 text-base shadow-md">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">Start Billing in Parallel</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The sync pill turns <strong>🔄 Synced</strong>. All your products, stock, and customers appear immediately on Counter B.
              </p>
              <div className="mt-auto px-3 py-1.5 rounded-lg bg-emerald-100/80 text-emerald-800 text-xs font-mono font-semibold">
                Next Bill: INV-B001
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Traditional Cloud POS vs Signatures Bill LAN Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="brand">HEAD-TO-HEAD COMPARISON</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Local LAN Sync Beats Cloud POS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Why pay monthly fees for cloud software that stops working whenever your internet is down?
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6">Feature</th>
                <th className="py-4 px-6 text-rose-600">Traditional Cloud POS</th>
                <th className="py-4 px-6 text-emerald-700 bg-emerald-50/70">Signatures Bill Dual Counter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Internet Dependency</td>
                <td className="py-4 px-6 text-slate-600">Requires continuous fast broadband. If internet is slow, billing lags.</td>
                <td className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/40">Zero internet required. Runs 100% locally on your Wi-Fi or LAN switch.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Monthly Subscriptions</td>
                <td className="py-4 px-6 text-slate-600">₹1,500 – ₹4,000 every single month per terminal.</td>
                <td className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/40">₹0 recurring monthly fees. One-time license, lifetime local ownership.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Invoice Generation Speed</td>
                <td className="py-4 px-6 text-slate-600">500 ms – 3 seconds waiting for cloud API servers to acknowledge.</td>
                <td className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/40">&lt; 10 ms instantaneous SQLite transaction. Instant printing.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Number Collision Protection</td>
                <td className="py-4 px-6 text-slate-600">Frequent duplicate invoice errors during offline reconnects.</td>
                <td className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/40">Guaranteed collision-free INV-A and INV-B series prefixes.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Customer Data Privacy</td>
                <td className="py-4 px-6 text-slate-600">Stored on 3rd-party cloud databases exposed to data breaches.</td>
                <td className="py-4 px-6 font-bold text-emerald-800 bg-emerald-50/40">100% local on your PC disk. Protected by Windows DPAPI encryption.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Bottom Conversion CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 p-8 sm:p-14 text-white text-center shadow-xl shadow-sky-600/20">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Double Your Store Checkout Speed Today
          </h2>
          <p className="max-w-2xl mx-auto text-sky-100 text-base sm:text-lg mb-8 leading-relaxed">
            Eliminate customer checkout queues. Download Signatures Bill V1 and test dual-counter billing on your PCs with our fully functional 35-day trial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('/download')}
              className="bg-white text-sky-900 hover:bg-slate-100 font-bold px-8 shadow-md"
            >
              <span>Download for Windows (.exe)</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('/support')}
              className="border-white/40 text-white hover:bg-white/10"
            >
              <span>Speak with Technical Support</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default MultiCounterPage;
