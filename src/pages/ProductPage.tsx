import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { FileText, ShoppingCart, Package, Users, BarChart3, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

export const ProductPage: React.FC<PageProps> = ({ onNavigate }) => {
  const verifiedDesktopModules = [
    {
      title: "GST Sales Billing",
      desc: "Fast GST invoices with automatic CGST, SGST, IGST calculations, HSN codes, line discounts, payment statuses, and printable previews.",
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      tag: "Desktop",
    },
    {
      title: "Purchase Bills",
      desc: "Record supplier purchases, track payables, maintain supplier bill numbers, and compute input tax credit data.",
      icon: <ShoppingCart className="w-5 h-5 text-emerald-600" />,
      tag: "Desktop",
    },
    {
      title: "Products & Stock Tracking",
      desc: "Item catalog with unit prices, sale/purchase rates, MRP, minimum stock thresholds, and real-time low-stock visual alerts.",
      icon: <Package className="w-5 h-5 text-amber-600" />,
      tag: "Desktop",
    },
    {
      title: "Parties & Double-Entry Ledgers",
      desc: "Unified customer & supplier directory with GSTIN, credit limits, payment terms, and running debit/credit ledger balance statements.",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      tag: "Desktop",
    },
    {
      title: "Business Reports & Excel Export",
      desc: "6 core financial reports (Sales, Purchase, Stock, Outstanding, Product Sales, Payment) with formatted Excel export via ClosedXML.",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      tag: "Desktop",
    },
    {
      title: "PDF Catalog Studio",
      desc: "Build luxury product catalogs directly from inventory using 4 grid layouts and 10 branded themes with live preview and PDF export.",
      icon: <BookOpen className="w-5 h-5 text-rose-600" />,
      tag: "Desktop Exclusive",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="brand" size="md">Product Architecture</Badge>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
          {siteConfig.brand.productName}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Comprehensive offline-first business billing and inventory ERP on Windows Desktop, paired with a companion Android visibility app.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedDesktopModules.map((module) => (
          <Card key={module.title} variant="hoverable" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200">
                {module.icon}
              </div>
              <Badge variant="neutral" size="sm">{module.tag}</Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{module.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{module.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-white border border-slate-200 shadow-card rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Ready to streamline your business?</h3>
        <p className="text-xs text-slate-600">Experience all desktop & companion mobile capabilities during your 35-day trial.</p>
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => onNavigate('/pricing')}
          >
            Start Free 35-Day Trial
          </Button>
        </div>
      </div>
    </div>
  );
};
