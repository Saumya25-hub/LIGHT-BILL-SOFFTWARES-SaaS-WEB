import React, { useState } from 'react';
import { 
  Building2, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  ArrowRight, 
  SlidersHorizontal, 
  Lock, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Boxes, 
  Users, 
  FileSpreadsheet, 
  Receipt 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface MultiCompanySyncSectionProps {
  onLaunchDemo?: () => void;
  onNavigate?: (path: string) => void;
}

export const MultiCompanySyncSection: React.FC<MultiCompanySyncSectionProps> = ({
  onLaunchDemo,
  onNavigate,
}) => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'realtime' | 'catchup' | 'isolation'>('realtime');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const sharedAttributes = [
    { name: 'Product Name & Description', icon: <Boxes className="w-4 h-4 text-emerald-600" /> },
    { name: 'HSN / SAC Codes', icon: <Receipt className="w-4 h-4 text-emerald-600" /> },
    { name: 'GST Tax Rates (0%, 5%, 12%, 18%, 28%)', icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
    { name: 'Units of Measure (PCS, MTR, KGS, BUNDLE)', icon: <Layers className="w-4 h-4 text-emerald-600" /> },
    { name: 'Standard Sale & Purchase Rates', icon: <Zap className="w-4 h-4 text-emerald-600" /> },
    { name: 'Customer & Supplier Profiles', icon: <Users className="w-4 h-4 text-emerald-600" /> },
    { name: 'Party GSTIN & Contact Details', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    { name: 'Registered Billing & Shipping Addresses', icon: <Building2 className="w-4 h-4 text-emerald-600" /> },
  ];

  const isolatedAttributes = [
    { name: 'Opening Stock & Current In-Stock Qty', icon: <Lock className="w-4 h-4 text-amber-600" /> },
    { name: 'Low-Stock Reorder Thresholds', icon: <Lock className="w-4 h-4 text-amber-600" /> },
    { name: 'GST Sales Invoices & Credit Notes', icon: <FileSpreadsheet className="w-4 h-4 text-amber-600" /> },
    { name: 'Purchase Invoices & Input Tax Credit (ITC)', icon: <Receipt className="w-4 h-4 text-amber-600" /> },
    { name: 'Customer & Supplier Ledgers & Balances', icon: <Lock className="w-4 h-4 text-amber-600" /> },
    { name: 'Bank Accounts, IFSC & UPI QR Codes', icon: <Lock className="w-4 h-4 text-amber-600" /> },
    { name: '15-Digit GSTIN & Legal Business Name', icon: <Building2 className="w-4 h-4 text-amber-600" /> },
    { name: 'Invoice Prefix Series (e.g. SR/26/ vs AW/26/)', icon: <Lock className="w-4 h-4 text-amber-600" /> },
  ];

  const faqs = [
    {
      q: "If I add a product in Company A, will Company B's stock balance get affected?",
      a: "No! Absolutely never. Universal Master Sync copies the product catalog definition (name, HSN code, tax rate, unit, standard sale rate) to sister companies, but physical stock quantities remain 100% strictly separate. In the other companies, the item is created with 0 opening stock so your inventory counts and physical audits remain perfectly accurate."
    },
    {
      q: "Can I turn Universal Master Sync OFF if my companies sell completely different items?",
      a: "Yes, completely! Master Sync is designed for maximum business flexibility. In Settings ➔ Company, you have independent toggle switches for 'Auto-Sync Products' and 'Auto-Sync Parties'. You can keep one or both turned OFF at any time."
    },
    {
      q: "I already have an existing company with 1,500 products. Do I have to re-enter them in my new company?",
      a: "Not at all! Signatures Bill includes a dedicated 1-Click Catch-Up button: '⚡ Sync Existing Masters Across All Companies'. Simply go to Settings ➔ Company and click this button. It automatically scans all your existing products and parties and synchronizes them across all company databases in seconds without touching invoices or stock."
    },
    {
      q: "Can each company have its own separate GST number and thermal invoice format?",
      a: "Yes! Every single company profile has its own dedicated, air-gapped SQLite database. Each firm maintains its own 15-digit GSTIN, legal trade name, bank account, UPI QR code, print logo, and custom invoice numbering sequence (such as 'RETAIL/26-27/001' vs 'WHOLESALE/26-27/001')."
    },
    {
      q: "How fast is switching between companies during busy billing hours?",
      a: "Instant 0 milliseconds! From the top-header company switcher dropdown, you can switch active companies on-the-fly. The software updates its database context immediately without requiring an app restart or re-login."
    }
  ];

  return (
    <section id="multicompany" className="relative scroll-mt-24 space-y-12">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>ENTERPRISE ARCHITECTURE // UNIVERSAL MASTER SYNC</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Multi-Company Architecture. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-300 to-amber-200">
              One Entry. Synced Everywhere. 100% Isolated Stock.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Stop wasting hours manually re-typing the same saree designs, fabrics, groceries, or party GSTINs into multiple sister branches. 
            With <strong className="text-white font-semibold">Universal Master Sync</strong>, create or update a catalog item once, and it automatically replicates across all your companies in real time—while keeping financial ledgers, bills, and stock balances completely air-gapped.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Re-Typing Overhead</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Air-Gapped Stock & Ledgers</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-sky-300 bg-sky-950/60 border border-sky-500/30 px-3.5 py-1.5 rounded-xl">
              <Zap className="w-4 h-4" />
              <span>0-Millisecond Active Firm Switcher</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Comparison Matrix: "Shared Masters" vs "Isolated Ledgers" */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="gold" size="sm">Airtight Safety Guarantee</Badge>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            The Master Sync vs. Private Ledger Matrix
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered with strict zero-bleed data boundaries so business owners enjoy effortless convenience without risking accounting confusion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Shared Across All Companies */}
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-50/60 via-white to-white p-6 sm:p-8 space-y-6 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                  <RefreshCw className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Shared Master Catalog</h4>
                  <span className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider">
                    ⚡ Auto-Synced In Real-Time
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Zero Re-Typing
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When Master Sync is active, saving or editing any item or party in one company automatically synchronizes these master definitions across all sister company databases:
            </p>

            <div className="space-y-3">
              {sharedAttributes.map((attr, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-emerald-100/80 shadow-subtle hover:border-emerald-300 transition-colors"
                >
                  <div className="p-1 rounded-lg bg-emerald-50 shrink-0">
                    {attr.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-800">{attr.name}</span>
                  <Check className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>1-Click Catch-Up:</strong> Have existing companies created previously? Hit <em>"Sync Existing Masters Across All Companies"</em> in Settings to instantly replicate all products and parties in 1 tap.
              </span>
            </div>
          </div>

          {/* Right Column: Strictly Isolated Per Company */}
          <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-50/60 via-white to-white p-6 sm:p-8 space-y-6 shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-amber-200/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Private Company Ledgers</h4>
                  <span className="text-xs font-mono text-amber-800 font-semibold uppercase tracking-wider">
                    🛡️ 100% Air-Gapped & Isolated
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                Zero Cross-Bleed
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              To guarantee bulletproof accounting integrity and prevent physical inventory errors, these mission-critical operational entities are NEVER shared or overwritten:
            </p>

            <div className="space-y-3">
              {isolatedAttributes.map((attr, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-amber-100/80 shadow-subtle hover:border-amber-300 transition-colors"
                >
                  <div className="p-1 rounded-lg bg-amber-50 shrink-0">
                    {attr.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-800">{attr.name}</span>
                  <Lock className="w-3.5 h-3.5 text-amber-600 ml-auto shrink-0" />
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Airtight Database Isolation:</strong> Each company has its own independent SQLite database file (`Company_X.db`). A sale in Firm 1 will never alter stock or ledger balances in Firm 2.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. 4 Core Innovations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-card hover:shadow-elevated transition-all">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Real-Time Sync Engine</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Runs silently in background threads with zero UI latency. Detects saves in Product & Party repositories and updates sister company SQLite files in milliseconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-card hover:shadow-elevated transition-all">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">1-Click Bulk Catch-Up</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Single-click <em>"⚡ Sync Existing Masters"</em> button in Settings. Safely copies entire historical catalogs to newly created firms without touching existing stock.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-card hover:shadow-elevated transition-all">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">0ms Company Switcher</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Header dropdown allows cashiers and accountants to toggle active firms on-the-fly during busy billing counters without app restarts or logging out.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-card hover:shadow-elevated transition-all">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 w-fit">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">Dual Settings Toggles</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Complete business owner control. Toggle <em>Auto-Sync Products</em> and <em>Auto-Sync Parties</em> independently in Settings based on your operational workflow.
          </p>
        </div>

      </div>

      {/* 4. Interactive Workflow Tabs & Visual Diagram */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
              ARCHITECTURAL WORKFLOW // SYSTEM TOPOLOGY
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              How Universal Master Sync Coordinates Your Branches
            </h3>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveWorkflowTab('realtime')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeWorkflowTab === 'realtime'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Real-Time Add
            </button>
            <button
              onClick={() => setActiveWorkflowTab('catchup')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeWorkflowTab === 'catchup'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Click Catch-Up
            </button>
            <button
              onClick={() => setActiveWorkflowTab('isolation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeWorkflowTab === 'isolation'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Isolation Boundary
            </button>
          </div>
        </div>

        {/* Tab Content 1: Real-Time */}
        {activeWorkflowTab === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AUTOMATED REPLICATION CYCLE
              </div>
              <h4 className="text-lg font-bold text-white">Real-Time Sync on Add / Update</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you create a new saree, fabric grade, or customer in Company 1 (e.g. <em>"Shree Fashion Showroom"</em>):
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0 mt-0.5">1</span>
                  <span><strong>Instant Local Save:</strong> Record is written to Company 1 SQLite database with full ACID transaction safety.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0 mt-0.5">2</span>
                  <span><strong>Microsecond Sync Bus:</strong> `UniversalMasterSyncService` enumerates sister companies in the background without locking the UI.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-[10px] font-mono text-indigo-300 shrink-0 mt-0.5">3</span>
                  <span><strong>Matching by Code/Name:</strong> If the item already exists in Branch 2, rates and HSN are updated. If new, it is inserted cleanly with 0 opening stock.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>SIMULATED REPLICATION LOG</span>
                <span className="text-emerald-400">STATUS: SYNCED (0ms)</span>
              </div>
              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="text-slate-400">[16:40:12] User adds Product: <span className="text-amber-300">"Kanjivaram Silk Gold Zari Saree"</span> (HSN: 5407, GST: 5%)</div>
                <div className="text-emerald-400">✔ Saved to active DB: Company_1_Showroom.db (ID: 1042)</div>
                <div className="text-sky-300">⚡ MasterSyncBus active: Syncing to 2 sister companies...</div>
                <div className="text-indigo-300">  ↳ Replicated to Company_2_Wholesale.db (Stock set to 0.0)</div>
                <div className="text-indigo-300">  ↳ Replicated to Company_3_Godown.db (Stock set to 0.0)</div>
                <div className="text-emerald-400 font-bold">✔ Sync completed across 3 companies in 4.2ms. Zero UI locks.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Catch-Up */}
        {activeWorkflowTab === 'catchup' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-lg">
                <RefreshCw className="w-3.5 h-3.5" />
                RETROACTIVE BULK MIGRATION
              </div>
              <h4 className="text-lg font-bold text-white">1-Click "Sync Existing Masters" Button</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Created a new branch firm today while you already have 2,000 products and 800 parties in your primary company? No problem:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Open <strong>Settings ➔ Company Tab</strong> in Signatures Bill.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Click <strong>"⚡ Sync Existing Masters Across All Companies"</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>The system reads all distinct products and parties across all databases and merges them seamlessly, skipping duplicates automatically.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-600 text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Sync Existing Masters Across All Companies</h5>
                    <p className="text-[11px] text-slate-400">Copies existing product catalogs and party directories across all registered firms.</p>
                  </div>
                </div>
                <button 
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => alert("This button is live in the Signatures Bill desktop app under Settings > Company!")}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>⚡ Sync Existing Masters Across All Companies</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                ✔ Stock quantities & invoice registers are strictly preserved.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Isolation */}
        {activeWorkflowTab === 'isolation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg">
                <Lock className="w-3.5 h-3.5" />
                DATABASE-PER-COMPANY AIR-GAP
              </div>
              <h4 className="text-lg font-bold text-white">Zero Bleed Guarantee: Why Your Ledgers Are 100% Safe</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Unlike poorly architected web ERPs that mix all tenants into a single multi-tenant database table with a company ID column, Signatures Bill allocates a <strong className="text-white">dedicated physical SQLite database file</strong> for each company:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Physical Isolation:</strong> Invoice #101 in Company A cannot accidentally query or affect Invoice #101 in Company B.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Separate Stock Reserves:</strong> Opening and current stock count exist only in the local company database.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Distinct Financial Ledgers:</strong> Outstanding party receivables and supplier payables remain completely confidential per firm.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1.5">
                  <div className="text-[10px] font-mono text-indigo-400">COMPANY 1 (RETAIL)</div>
                  <div className="font-bold text-white">Shree Sarees Retail</div>
                  <div className="text-[11px] text-emerald-400">Stock: 140 Pcs</div>
                  <div className="text-[11px] text-slate-400">Ledger Bal: ₹45,000 Cr</div>
                  <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">GSTIN: 24AAACS1234A1Z1</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1.5">
                  <div className="text-[10px] font-mono text-amber-400">COMPANY 2 (WHOLESALE)</div>
                  <div className="font-bold text-white">Shree Textiles Whsl</div>
                  <div className="text-[11px] text-amber-400">Stock: 1,250 Pcs</div>
                  <div className="text-[11px] text-slate-400">Ledger Bal: ₹3,80,000 Cr</div>
                  <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">GSTIN: 24BBBCS5678B2Z2</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] text-center font-mono">
                ✔ Master Catalog Synced • Stock & Financial Ledgers 100% Air-Gapped
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Frequently Asked Questions (Accordion) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="brand" size="sm">Multi-Company Knowledgebase</Badge>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Frequently Asked Questions on Multi-Company & Sync
          </h3>
          <p className="text-xs text-slate-600">
            Everything you need to know about setting up and running multiple firms on Signatures Bill.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="rounded-xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 text-center">
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => (onLaunchDemo ? onLaunchDemo() : onNavigate ? onNavigate('/demo') : undefined)}
          >
            🚀 Try Live Multi-Company In Simulator
          </Button>
        </div>
      </div>

    </section>
  );
};
