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
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          About {siteConfig.company.masterName}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Building practical, honest, and high-performance business software.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Who We Are</h2>
          <p>
            <strong className="text-slate-900">{siteConfig.company.masterName}</strong> is an independent software development company dedicated to creating dependable software solutions for everyday business operations.
          </p>
          <p>
            We focus on software that solves real merchant and trader challenges: lightning-fast everyday billing, disciplined inventory control, transparent customer ledgers, and reliable data synchronization without requiring costly or fragile server infrastructure.
          </p>
        </Card>

        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">The SIGNATURES Brand Hierarchy</h3>
          </div>
          <div className="space-y-2 text-xs text-slate-500">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">{siteConfig.company.masterName}</span>
              <span className="text-slate-500 font-mono">Software Company / Master Brand</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">{siteConfig.brand.productFamily}</span>
              <span className="text-slate-500 font-mono">Product Brand & Ecosystem</span>
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200 flex items-center justify-between">
              <span className="font-semibold text-sky-900">{siteConfig.brand.productName}</span>
              <span className="text-sky-700 font-mono font-medium">Flagship Commercial Product</span>
            </div>
          </div>
        </Card>

        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Product Philosophy</h3>
          </div>
          <blockquote className="border-l-2 border-sky-600 pl-4 py-1 text-slate-800 italic font-medium">
            "{siteConfig.brand.productPhilosophy}"
          </blockquote>
          <p className="text-xs text-slate-600 leading-relaxed">
            We believe that small businesses should not struggle with overly complex ERP systems designed for massive conglomerates. Business software should be intuitive, responsive, and respectful of business owners' time and privacy.
          </p>
        </Card>
      </div>
    </div>
  );
};
