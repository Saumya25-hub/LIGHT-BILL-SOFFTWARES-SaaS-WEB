import React, { useState } from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { Check, Sparkles, ShieldCheck, HelpCircle, Zap, Star, SearchCheck } from 'lucide-react';

export const PricingPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const coreBillingFeatures = [
    "Complete GST Sales Invoicing (CGST, SGST, IGST)",
    "Multi-Company Architecture & Setup Wizard (Isolated DBs)",
    "Restaurant POS Counter with Live Interactive Table Layout",
    "Zero-Trust LAN KDS (Kitchen Display System) Mesh",
    "SEZ & Zero-Rated Export Compliance (LUT / IGST)",
    "Delivery Challan Designer (Stage 3 Multi-Templates)",
    "80mm Thermal Receipt + Full A4/A5 PDF Invoice Print",
    "Inventory Management & Real-Time Low Stock Alerts",
    "Customer & Supplier Directory with Debit/Credit Ledgers",
    "6 Comprehensive Financial Reports with Excel (.xlsx) Export",
    "Branded Luxury PDF Catalog Studio & WhatsApp Lookbooks",
    "Automated AES Encrypted Database Backup Engine",
    "Instant Global Financial Year Switcher (FY 2026-27)",
    "Smart 1-Click Update Engine (Safe In-Place Updates)",
    "Day & Night Visual Luxury UI Themes",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Transparent Business Pricing
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          Affordable, Honest & High Performance.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Choose month-to-month flexibility or save more with annual billing. Add official Government GST API autofill for effortless error-free party creation.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-4 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual Plan</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-mono">
              Save Extra
            </span>
          </button>
        </div>
      </div>

      {/* 35-Day Trial Banner */}
      <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between flex-wrap gap-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold text-sm">35-Day Full-Featured Free Trial</h4>
            <p className="text-xs text-slate-600">Experience the entire software on Desktop and Android before choosing a subscription.</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/download')}
        >
          Download Trial Setup
        </Button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Plan 1: Core Billing ERP */}
        <Card variant="hoverable" padding="lg" className="flex flex-col justify-between border border-slate-200 bg-white">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">Standard Core</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Billing ERP Suite</h3>
              
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-slate-900">
                  ₹{billingCycle === 'monthly' ? siteConfig.pricing.monthly.price : siteConfig.pricing.annual.offerPrice}
                </span>
                <span className="text-slate-500 text-xs">
                  {billingCycle === 'monthly' ? '/month' : '/year (₹3.2k only)'}
                </span>
              </div>

              {billingCycle === 'annual' && (
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="text-slate-400 line-through">Regular ₹3,588/yr</span>
                  <span className="text-emerald-700 font-bold font-mono">Save ₹388</span>
                </div>
              )}

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Complete offline-first GST billing, inventory, ledgers, and Challan Designer for individual shops & wholesalers.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Features Included:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {coreBillingFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => onNavigate('/support')}
            >
              {billingCycle === 'monthly' ? 'Get Started (₹299/mo)' : 'Get Annual Plan (₹3,200)'}
            </Button>
          </div>
        </Card>

        {/* Plan 2: All-in-One PRO Bundle (FEATURED / USER REQUESTED BUNDLE) */}
        <Card padding="lg" className="flex flex-col justify-between border-2 border-amber-400 shadow-elevated relative bg-amber-50/20 md:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-950" /> {siteConfig.pricing.proCombo.badgeText}
            </span>
          </div>

          <div className="space-y-6 pt-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold">All-In-One Suite</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">PRO Billing + GST API Bundle</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-slate-900">
                  ₹{billingCycle === 'monthly' ? siteConfig.pricing.proCombo.monthlyPrice : siteConfig.pricing.proCombo.annualPrice}
                </span>
                <span className="text-slate-500 text-xs">
                  {billingCycle === 'monthly' ? '/month' : '/year'}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="text-slate-400 line-through">
                  Separate ₹{billingCycle === 'monthly' ? '399/mo' : '4,788/yr'}
                </span>
                <span className="text-amber-800 font-bold font-mono">
                  Save ₹{billingCycle === 'monthly' ? '50/mo' : '1,188/yr'}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                The ultimate combo: All ERP features plus 30 live Government GSTIN autofills every single month.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-200/60 space-y-3">
              <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-900 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-700" />
                  30 GST API Auto-Fills Included / Mo
                </div>
                <p className="text-[11px] text-amber-800 leading-tight">
                  Auto-fetches party Trade Name, Legal Entity, Registered Address & Filing Status with zero typing!
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Everything in Core, Plus:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900">30 GSTIN Gov Portal Lookups / Month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>1-Click Auto-Fill Party Address & Name</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Fraud Protection (Verifies Active/Cancelled GST)</span>
                </li>
                {coreBillingFeatures.slice(0, 7).map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-amber-200/60">
            <Button
              variant="gold"
              size="md"
              fullWidth
              onClick={() => onNavigate('/support')}
            >
              {billingCycle === 'monthly' ? 'Get PRO Combo (₹349/mo)' : 'Get PRO Annual (₹3,600/yr)'}
            </Button>
          </div>
        </Card>

        {/* Plan 3: GST API Add-on (Standalone) */}
        <Card variant="hoverable" padding="lg" className="flex flex-col justify-between border border-slate-200 bg-white">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-semibold">Live Integration</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">GST API Auto-Fill Add-On</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-slate-900">
                  ₹{siteConfig.pricing.gstAddon.price}
                </span>
                <span className="text-slate-500 text-xs">/month</span>
              </div>

              <div className="mt-1 text-xs text-purple-700 font-mono font-semibold">
                30 GSTIN Lookups Every Month
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Add-on pack for businesses that already have custom setups and need fast 1-click GSTIN verification.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Add-on Capabilities:</span>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <SearchCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Direct Government Portal GSTIN Verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Auto-Fills Trade Name, Legal Name & Jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Full Registered Address with Pincode auto-fill</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Checks Active/Suspended GST Status</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>Rolls over with your monthly subscription</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => onNavigate('/support')}
            >
              Add GST Pack (₹100/mo)
            </Button>
          </div>
        </Card>
      </div>

      {/* Value Comparison Banner */}
      <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h4 className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Why Choose the ₹349 PRO Combo?
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Buying Core Billing (₹299) + GST API Add-on (₹100) separately costs ₹399/mo. The PRO Combo gives you everything bundled for just <strong>₹349/month</strong> (save ₹50/mo or ₹1,188/year on annual).
          </p>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={() => onNavigate('/support')}
        >
          Claim PRO Bundle
        </Button>
      </div>

      {/* Tax Note */}
      <div className="max-w-2xl mx-auto text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>{siteConfig.pricing.taxNote}</span>
      </div>
    </div>
  );
};
