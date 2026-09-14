import React from 'react';
import { ArrowRight, Laptop, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export interface PageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Foundation Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Special Offer: ₹{siteConfig.pricing.annual.offerPrice}/yr (Save ₹{siteConfig.pricing.annual.savings})
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
            <span className="text-slate-400 block text-lg sm:text-2xl font-semibold mb-2">
              {siteConfig.company.masterName}
            </span>
            {siteConfig.brand.productName}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            {siteConfig.brand.productTagline} Powerful offline-first desktop billing with companion Android visibility and secure Google Drive cloud sync.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => onNavigate('/pricing')}
            >
              Start 35-Day Free Trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('/demo')}
            >
              Explore Interactive Demo
            </Button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 35-Day Unrestricted Free Trial
            </span>
            <span className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-sky-400" /> Windows 10 & 11 Desktop
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-cyan-400" /> Companion Android App
            </span>
          </div>
        </div>

        {/* Real Software Showcase Preview */}
        <div className="max-w-6xl mx-auto mt-12 px-2 sm:px-4">
          <div className="relative rounded-2xl p-1.5 sm:p-2 bg-gradient-to-b from-sky-500/20 via-white/5 to-transparent border border-white/15 shadow-2xl overflow-hidden group">
            <div className="rounded-xl overflow-hidden bg-navy-950">
              <img
                src="/assets/desktop-dashboard-light.png"
                alt="SIGNATURES LIGHT BILL ERP Desktop Dashboard"
                className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                loading="eager"
              />
            </div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-xl bg-navy-950/90 backdrop-blur-md border border-white/15 text-xs text-white shadow-lg flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real Software Screenshot: Desktop Dashboard & Live Business Metrics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Ecosystem Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="brand" size="md">One Business Software</Badge>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2">
            Desktop + Android, Seamlessly Connected
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-1">
            Built from the ground up for speed, reliability, and complete data ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="hoverable" padding="lg">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Desktop Source of Truth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              .NET 8 WPF application with local SQLite database. Full GST billing, purchase orders, inventory tracking, party ledgers, reports, and luxury PDF catalog builder.
            </p>
          </Card>

          <Card variant="hoverable" padding="lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Companion Android App</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native Kotlin Jetpack Compose companion app. View live daily sales, purchase bills, receivables, and party balances anywhere with PIN & biometric lock.
            </p>
          </Card>

          <Card variant="hoverable" padding="lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Private Google Drive Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synchronize state securely to your own private Google Drive using OAuth 2.0 PKCE. No external multi-tenant servers, ensuring full data privacy.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
