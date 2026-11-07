import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { 
  Building2, 
  Cpu, 
  Users, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileSpreadsheet, 
  Layers, 
  HeartHandshake, 
  CheckCircle2 
} from 'lucide-react';

export const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="brand" size="md">Corporate Entity &amp; Startup Story</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          About {siteConfig.company.masterName}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          The technology engineering division behind <strong className="text-slate-900">{siteConfig.brand.productName}</strong>. 
          Bootstrapped, customer-first, anti-VC, and engineered to eliminate administrative stress for Indian business owners.
        </p>
      </div>

      {/* Corporate Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg" className="space-y-3 bg-gradient-to-br from-slate-50 to-white border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Parent Umbrella</div>
          <h3 className="text-lg font-bold text-slate-900">{siteConfig.company.masterName}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-sector Indian enterprise group operating across diverse traditional commerce, textiles, manufacturing, and technology ventures.
          </p>
        </Card>

        <Card padding="lg" className="space-y-3 bg-gradient-to-br from-sky-50 to-white border border-sky-200">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">Technology Division</div>
          <h3 className="text-lg font-bold text-slate-900">{siteConfig.company.divisionName}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dedicated commercial startup arm specializing in high-speed desktop ERP architecture, native C# .NET 8 engines, and local data isolation.
          </p>
        </Card>

        <Card padding="lg" className="space-y-3 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Engineering Scale</div>
          <h3 className="text-lg font-bold text-slate-900">{siteConfig.company.teamScale}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Collaborating remotely and recruited via LinkedIn under strict software quality, security, and same-day delivery governance rules.
          </p>
        </Card>
      </div>

      {/* Brand Hierarchy Tree */}
      <Card padding="lg" variant="hoverable" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">The Authoritative Entity Hierarchy</h3>
        </div>
        <div className="space-y-2.5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="font-bold text-slate-900">{siteConfig.company.masterName}</span>
            </div>
            <span className="text-slate-500 font-mono">Master Umbrella Conglomerate (Commerce &amp; Industry)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pl-4 sm:pl-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span className="font-bold text-slate-900">{siteConfig.company.divisionName}</span>
            </div>
            <span className="text-slate-500 font-mono">Commercial Software Division &amp; 16-Member Engineering Force</span>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pl-6 sm:pl-14">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-sky-950">{siteConfig.brand.productName} (SBV1)</span>
            </div>
            <span className="text-sky-800 font-mono font-semibold">Flagship Commercial Desktop ERP (v2.2.7-stable)</span>
          </div>
        </div>
      </Card>

      {/* Customer-First Manifesto */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Our Anti-VC, Customer-First Startup Manifesto</h2>
            <p className="text-xs text-slate-500">Real software for real businessmen — not for venture capital pitch decks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="md" className="space-y-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>5-Hour Work in 30 Minutes</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We do not treat AI as a buzzword or marketing illusion. We engineer high-speed automation engines into daily operations: 
              taka roll cutters, loom production tally, multi-company master catalog sync, and 1-click E-Way Bill JSON generation.
            </p>
          </Card>

          <Card padding="md" className="space-y-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Same-Day Issue Resolution Guarantee</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a factory floor loom stops or a counter cashier hits an issue, you cannot afford to wait weeks for support. 
              Our 16-member engineering team guarantees direct issue investigation and same-day hotfix releases.
            </p>
          </Card>

          <Card padding="md" className="space-y-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Zero Vendor Lock-In &amp; 35-Day Trial</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every customer gets a full 35-day unrestricted trial with zero payment details required. If you decide not to continue, 
              100% of your business data (items, invoices, customers, ledgers) is exportable to open Excel (.xlsx) files anytime.
            </p>
          </Card>

          <Card padding="md" className="space-y-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Commercial Proprietary Software License</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              SIGNATURES LIGHT BILL ERP is a commercial, production-grade proprietary software product protected under Indian copyright law. 
              All intellectual property, database schema, and native .NET binaries are maintained under strict commercial governance.
            </p>
          </Card>
        </div>
      </div>

      {/* Quote / Bottom Banner */}
      <Card padding="lg" className="bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-3">
        <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          The Founder's Promise
        </div>
        <blockquote className="text-base sm:text-lg font-medium italic text-slate-100">
          "Humne software isliye banaya hai taaki vyapari sukoon se apna business kare — software ke mehenge bills aur server downtimes ka tension hamesha ke liye khatam ho jaye."
        </blockquote>
        <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-700/80">
          <span>Signatures IT Groups • Surat, Gujarat, India</span>
          <span className="font-mono text-slate-300">Direct Desk: {siteConfig.contact.phone}</span>
        </div>
      </Card>
    </div>
  );
};
