import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { Check, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC<PageProps> = ({ onNavigate }) => {
  const verifiedFeatures = [
    "Complete GST Sales Invoicing",
    "Purchase Bills & Supplier Tracking",
    "Inventory & Low-Stock Alerts",
    "Customer & Supplier Directory",
    "Double-Entry Party Ledgers",
    "6 Core Reports & Excel Exports",
    "Branded Luxury PDF Catalog Studio",
    "Google Drive Cloud Sync & Backup",
    "Companion Android App (Read-Only)",
    "Day & Night Visual Themes",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Transparent Pricing
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          Simple, Honest Pricing.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          No hidden fees or unexpected surcharges. Choose monthly flexibility or maximize savings with our annual offer.
        </p>
      </div>

      {/* 35-Day Trial Banner */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between flex-wrap gap-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold text-sm">35-Day Full-Featured Free Trial</h4>
            <p className="text-xs text-slate-600">Experience the entire software on Desktop and Android before choosing a plan.</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/download')}
        >
          Download Trial
        </Button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Plan */}
        <Card variant="hoverable" padding="lg" className="flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">Monthly Flexible</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-slate-900">
                  ₹{siteConfig.pricing.monthly.price}
                </span>
                <span className="text-slate-500 text-xs">{siteConfig.pricing.monthly.periodLabel}</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Pay month-to-month with standard flexibility.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Included:</span>
              <ul className="space-y-2 text-xs text-slate-600">
                {verifiedFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-sky-600 shrink-0" />
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
              Get Started Monthly
            </Button>
          </div>
        </Card>

        {/* Annual Offer Plan */}
        <Card padding="lg" className="flex flex-col justify-between border-2 border-amber-400 shadow-elevated relative bg-white">
          <div className="absolute top-4 right-4">
            <Badge variant="gold" size="sm">
              Save ₹{siteConfig.pricing.annual.savings}/yr
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                {siteConfig.pricing.annual.badgeText}
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-display font-bold text-slate-900">
                  ₹{siteConfig.pricing.annual.offerPrice}
                </span>
                <span className="text-slate-500 text-xs">{siteConfig.pricing.annual.periodLabel}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="text-slate-400 line-through">Regular ₹{siteConfig.pricing.annual.regularPrice}/year</span>
                <span className="text-amber-700 font-bold font-mono">Save ₹{siteConfig.pricing.annual.savings}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Included:</span>
              <ul className="space-y-2 text-xs text-slate-600">
                {verifiedFeatures.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <Button
              variant="gold"
              size="md"
              fullWidth
              onClick={() => onNavigate('/support')}
            >
              Claim ₹1,999 Annual Offer
            </Button>
          </div>
        </Card>
      </div>

      {/* Tax Note */}
      <div className="max-w-2xl mx-auto text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>{siteConfig.pricing.taxNote}</span>
      </div>
    </div>
  );
};
