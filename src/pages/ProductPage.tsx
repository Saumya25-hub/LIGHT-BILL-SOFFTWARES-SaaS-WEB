import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  SearchCheck,
  RefreshCw,
  Building2,
  UtensilsCrossed,
  Wifi,
  Calendar,
  Database,
  Sparkles,
  Table,
  Keyboard,
  Truck,
  Cpu
} from 'lucide-react';

import { MultiCompanySyncSection } from '../components/product/MultiCompanySyncSection';

export const ProductPage: React.FC<PageProps> = ({ onNavigate, onLaunchDemo }) => {
  const verifiedDesktopModules = [
    {
      title: "🚚 BOS E-Way Bill & Dispatch Engine",
      desc: "Full statutory Rule 138 automation: 1-click official NIC JSON payload generation, embedded WebView2 portal automation with captcha assistance, cryptographic SHA-256 PDF vault verification, multi-field financial reconciliation, and multi-invoice batch dispatch directly from Sales register.",
      icon: <Truck className="w-5 h-5 text-sky-600" />,
      tag: "⚡ NEW v2.1.0",
    },
    {
      title: "🧠 Visual Node Engine (BNVE)",
      desc: "Drag-and-drop node graph formula system for complex multi-tier manufacturing calculations, textile weight-to-meters conversions, dynamic chemical batch equations, and PIN-protected enterprise business rules.",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      tag: "⚡ NEW v2.1.0",
    },
    {
      title: "📊 Universal Excel Bulk Import & Verification Engine",
      desc: "Migrate thousands of parties and products in seconds with standardized Excel (.xlsx) templates. Includes strict schema validation, unique code verification (SIGNATURES-BILL-TEMPLATE-V1), real-time deduplication against existing GST numbers and product names, and modern 2-step verification preview modal.",
      icon: <Table className="w-5 h-5 text-emerald-600" />,
      tag: "⚡ NEW Phase 4",
    },
    {
      title: "⌨️ Rapid Billing & Keyboard Shortcut Engine",
      desc: "Designed for high-speed counter billing. Quick party picker via Ctrl+P in Sales & Purchase, instant Party creation via Ctrl+N, rapid edit via Ctrl+E in directories, and full shortcut key rebinding in System Settings.",
      icon: <Keyboard className="w-5 h-5 text-amber-600" />,
      tag: "⚡ NEW Shortcuts",
    },
    {
      title: "⚡ AI Purchase Bill Import & Scanner",
      desc: "Zero-data-entry vendor purchases: Upload or scan any vendor bill (PDF or photo). High-speed OCR extracts line items, validates GSTIN checksums, resolves party & products, tests 5 Indian GST math recipes, and provides a side-by-side human review screen before posting to stock and ledger.",
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      tag: "⚡ NEW AI Import",
    },
    {
      title: "Multi-Company & Universal Master Sync",
      desc: "Run unlimited business firms and sister branches with 100% database-per-company isolation. Real-time Universal Master Sync replicates products and parties across all firms, keeping stock and accounting ledgers completely air-gapped.",
      icon: <Building2 className="w-5 h-5 text-indigo-600" />,
      tag: "NEW Universal Sync",
    },
    {
      title: "Restaurant POS & Live Table Management",
      desc: "Fast dine-in and counter billing with interactive table status tiles (🟢 Available, 🔴 Occupied, 🟡 Cleaning), multi-round KOTs, dish sync, and 3-way split payments (Cash+UPI+Card).",
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-600" />,
      tag: "NEW Restaurant",
    },
    {
      title: "Zero-Trust LAN KDS (Kitchen Display System)",
      desc: "Sync cashier registers with kitchen displays across local Wi-Fi without internet. Powered by high-speed ASP.NET Core Kestrel with OTP terminal pairing and HMAC message security.",
      icon: <Wifi className="w-5 h-5 text-emerald-600" />,
      tag: "NEW LAN Mesh",
    },
    {
      title: "GST Sales & 80mm Thermal Engine",
      desc: "Instant GST invoices with automatic CGST, SGST, IGST calculations, HSN codes, discounts, 80mm thermal receipt printing, and A4/A5 PDF invoices.",
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      tag: "Core ERP",
    },
    {
      title: "SEZ & Zero-Rated Export Compliance",
      desc: "Full legal compliance for Special Economic Zone (SEZ) supplies under GST Law with automated LUT / IGST payment routes, custom invoice series, and tax exemptions.",
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      tag: "GST Law",
    },
    {
      title: "Global Financial Year Context Switcher",
      desc: "Seamlessly switch between FY 2024-25, FY 2025-26, and FY 2026-27 without restarting the software. Automatically isolates accounting periods, bill counters, and ledgers.",
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      tag: "Accounting",
    },
    {
      title: "Automated AES Encrypted Backup Engine",
      desc: "Automated local and Google Drive cloud backups with AES encryption, database-per-company snapshots, and write-gate pause protection preventing corrupted exports.",
      icon: <Database className="w-5 h-5 text-rose-600" />,
      tag: "Data Safety",
    },
    {
      title: "Challan Designer & Stage 3 Studio",
      desc: "Drag-and-drop visual layout customizer for delivery challans. Switch templates, manage header/company blocks, barcode integration, and print directly without mixing sales preview.",
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      tag: "NEW Studio",
    },
    {
      title: "GSTIN Direct API Auto-Fill",
      desc: "1-Click party creation: Enter any 15-digit GSTIN to auto-fetch Trade Name, Legal Name, Complete Address, and active filing status directly from Government servers.",
      icon: <SearchCheck className="w-5 h-5 text-purple-600" />,
      tag: "API Integration",
    },
    {
      title: "Smart 1-Click In-Place Updater",
      desc: "Auto-detects existing installations on user PCs. Performs seamless binary upgrades while keeping customer databases, invoices, and settings 100% untouched.",
      icon: <RefreshCw className="w-5 h-5 text-emerald-600" />,
      tag: "Auto-Updater",
    },
    {
      title: "Purchase Bills & ITC Tracking",
      desc: "Record supplier purchases, track payables, maintain supplier bill numbers, and compute input tax credit data automatically.",
      icon: <ShoppingCart className="w-5 h-5 text-emerald-600" />,
      tag: "Purchasing",
    },
    {
      title: "Products & Stock Tracking",
      desc: "Item catalog with unit prices, sale/purchase rates, MRP, minimum stock thresholds, barcode scanners, and real-time low-stock visual alerts.",
      icon: <Package className="w-5 h-5 text-amber-600" />,
      tag: "Inventory",
    },
    {
      title: "Parties & Double-Entry Ledgers",
      desc: "Unified customer & supplier directory with GSTIN, credit limits, payment terms, and running debit/credit ledger balance statements.",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      tag: "Ledger",
    },
    {
      title: "Business Reports & Excel Export",
      desc: "6 core financial reports (Sales, Purchase, Stock, Outstanding, Product Sales, Payment) with high-speed formatted Excel export via ClosedXML.",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      tag: "Analytics",
    },
    {
      title: "PDF Catalog Studio",
      desc: "Build luxury wholesale lookbooks directly from inventory using 4 grid layouts and 10 branded themes with live preview and 1-tap WhatsApp sharing.",
      icon: <BookOpen className="w-5 h-5 text-rose-600" />,
      tag: "Lookbooks",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="brand" size="md">Product Architecture & New Features</Badge>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
          {siteConfig.brand.productName}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Comprehensive offline-first business billing and inventory ERP on Windows Desktop. Built for maximum speed, 100% data safety, and zero downtime.
        </p>
      </div>

      {/* STOMS Multi-Industry Software Banner: 8PM Pool Software Spotlight */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-[#0B1516] to-slate-950 border border-emerald-500/40 p-4 sm:p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner shrink-0">
            🎱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">8 PM Pool &amp; Snooker Club Management</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/50">NEW v2.3 PRO</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Need cue sports &amp; club table billing? Dual hourly &amp; per-minute timers, 1v1 to 3v3 loser-pays tournament matching &amp; WhatsApp dues.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('/8pm')}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
        >
          <span>Open 8 PM Club Web ➜</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedDesktopModules.map((module) => (
          <Card key={module.title} variant="hoverable" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                {module.icon}
              </div>
              <Badge variant={module.tag.includes('NEW') ? 'gold' : 'neutral'} size="sm">
                {module.tag}
              </Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{module.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{module.desc}</p>
          </Card>
        ))}
      </div>

      {/* Deep-Dive Spotlight: Multi-Company Architecture & Universal Master Sync */}
      <MultiCompanySyncSection onLaunchDemo={onLaunchDemo} onNavigate={onNavigate} />

      <div className="bg-white border border-slate-200 shadow-card rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => onNavigate('/pricing')}
          >
            View Plans & Pricing
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => (onLaunchDemo ? onLaunchDemo() : onNavigate('/demo'))}
          >
            🚀 Try Live Simulator (Sandbox)
          </Button>
        </div>
      </div>
    </div>
  );
};
