import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { Layers, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="brand" size="md">Company Profile</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          About {siteConfig.company.masterName}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Building practical, honest, and high-performance business software.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <Card padding="lg" variant="glow" className="border-sky-500/20 space-y-4">
          <h2 className="text-xl font-bold text-white">Who We Are</h2>
          <p>
            <strong className="text-white">{siteConfig.company.masterName}</strong> is an independent software development company dedicated to creating dependable software solutions for everyday business operations.
          </p>
          <p>
            We focus on software that solves real merchant and trader challenges: lightning-fast everyday billing, disciplined inventory control, transparent customer ledgers, and reliable data synchronization without requiring costly or fragile server infrastructure.
          </p>
        </Card>

        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The SIGNATURES Brand Hierarchy</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="p-3 rounded-xl bg-navy-950/60 border border-white/5 flex items-center justify-between">
              <span className="font-semibold text-slate-200">{siteConfig.company.masterName}</span>
              <span className="text-slate-500 font-mono">Software Company / Master Brand</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/60 border border-white/5 flex items-center justify-between">
              <span className="font-semibold text-slate-200">{siteConfig.brand.productFamily}</span>
              <span className="text-slate-500 font-mono">Product Brand & Ecosystem</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/60 border border-white/5 flex items-center justify-between">
              <span className="font-semibold text-sky-300">{siteConfig.brand.productName}</span>
              <span className="text-sky-400 font-mono">Flagship Commercial Product</span>
            </div>
          </div>
        </Card>

        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Our Product Philosophy</h3>
          </div>
          <blockquote className="border-l-2 border-sky-500 pl-4 py-1 text-slate-200 italic font-medium">
            "{siteConfig.brand.productPhilosophy}"
          </blockquote>
          <p className="text-xs text-slate-400 leading-relaxed">
            We believe that small businesses should not struggle with overly complex ERP systems designed for massive conglomerates. Business software should be intuitive, responsive, and respectful of business owners' time and privacy.
          </p>
        </Card>
      </div>
    </div>
  );
};
