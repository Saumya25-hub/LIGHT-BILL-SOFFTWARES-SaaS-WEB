import React, { useState } from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShieldAlert, ArrowRight, ArrowLeft, Sparkles, Monitor, Image as ImageIcon } from 'lucide-react';
import { SignaturesSoftwareSimulator } from '../components/demo/SignaturesSoftwareSimulator';

export const DemoPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'simulator' | 'gallery'>('simulator');
  const [galleryTab, setGalleryTab] = useState<'dashboard' | 'billing' | 'catalog' | 'reports'>('billing');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Back to 3D Studio Button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-purple-600" />
          <span>← Back to S TOM’S 3D Studio</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE SANDBOX ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="hidden sm:inline">0ms SQLite Latency</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="brand" size="md">
          <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Interactive In-Browser Experience
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Try SIGNATURES BILL Live
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          No installation needed. Click items, create a test GST bill, calculate taxes, and print an official invoice right inside your browser!
        </p>

        {/* Mode Switcher: Live Simulator vs High-Res Screenshots */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setViewMode('simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'simulator'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>⚡ Live Interactive Simulator (Try Billing)</span>
          </button>
          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'gallery'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Screenshots Gallery</span>
          </button>
        </div>
      </div>

      {/* Safety & Integrity Callout */}
      <div className="max-w-4xl mx-auto px-4 py-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            <strong>100% Safe Sandbox:</strong> Demonstrates real offline billing speed and tax calculations using synthetic data.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-sky-200/60 text-sky-800 text-[10px] font-bold font-mono">
          OFFLINE SQLITE ENGINE
        </span>
      </div>

      {/* VIEW 1: LIVE INTERACTIVE SIMULATOR */}
      {viewMode === 'simulator' && (
        <div className="max-w-6xl mx-auto">
          <SignaturesSoftwareSimulator />
        </div>
      )}

      {/* VIEW 2: STATIC SCREENSHOTS GALLERY */}
      {viewMode === 'gallery' && (
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            {[
              { id: 'billing', label: 'Sales Billing' },
              { id: 'dashboard', label: 'Dashboard Overview' },
              { id: 'catalog', label: 'PDF Catalog Studio' },
              { id: 'reports', label: 'Reports Hub' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setGalleryTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  galleryTab === tab.id
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl p-3 bg-slate-100 border border-slate-200 shadow-elevated overflow-hidden">
            {galleryTab === 'billing' && (
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <img
                    src="/assets/desktop-sales-invoice.png"
                    alt="Sales Invoice Entry Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>Displaying: GST Sales Invoice creation with HSN, line item discounts, and tax computation.</span>
                  <span className="text-sky-700 font-mono font-medium">Invoice Module</span>
                </div>
              </div>
            )}

            {galleryTab === 'dashboard' && (
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <img
                    src="/assets/desktop-dashboard-light.png"
                    alt="Interactive Dashboard Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>Displaying: Unified Dashboard KPI cards, recent sales, and low stock warnings.</span>
                  <span className="text-sky-700 font-mono font-medium">Day Mode</span>
                </div>
              </div>
            )}

            {galleryTab === 'catalog' && (
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <img
                    src="/assets/desktop-catalog-builder.png"
                    alt="PDF Catalog Studio Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>Displaying: Luxury PDF catalog builder with Coffee Brown luxury theme and live PDF preview.</span>
                  <span className="text-rose-700 font-mono font-medium">Catalog Studio</span>
                </div>
              </div>
            )}

            {galleryTab === 'reports' && (
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <img
                    src="/assets/desktop-reports-hub.png"
                    alt="Reports Hub Preview"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>Displaying: 6 Business reports (Sales, Purchase, Stock, Outstanding, Product Sales, Payment).</span>
                  <span className="text-emerald-700 font-mono font-medium">Reports Hub</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Step Conversion Call-to-Action */}
      <div className="max-w-2xl mx-auto text-center space-y-4 pt-6">
        <h3 className="text-xl font-bold text-slate-900">Experience the Full Power on Windows</h3>
        <p className="text-xs text-slate-600">
          Download the official Windows desktop software and companion Android app with 35 days of free unrestricted access. No credit card required.
        </p>
        <Button
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => onNavigate('/download')}
        >
          Download 35-Day Free Trial
        </Button>
      </div>
    </div>
  );
};
