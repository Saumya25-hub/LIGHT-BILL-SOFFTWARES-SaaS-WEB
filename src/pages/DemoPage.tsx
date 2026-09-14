import React, { useState } from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LayoutDashboard, FileText, BarChart3, Palette, ShieldAlert, ArrowRight } from 'lucide-react';

export const DemoPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'billing' | 'catalog' | 'reports'>('dashboard');

  const demoTabs = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'billing', label: 'Sales Billing', icon: <FileText className="w-4 h-4" /> },
    { id: 'catalog', label: 'PDF Catalog Studio', icon: <Palette className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports Hub', icon: <BarChart3 className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="brand" size="md">Controlled Environment</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Interactive Product Preview
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore realistic workflows from the actual SIGNATURES LIGHT BILL ERP software using curated demonstration data.
        </p>
      </div>

      {/* Safety & Integrity Callout */}
      <div className="max-w-4xl mx-auto px-4 py-3 rounded-xl bg-navy-900/60 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0" />
        <span>This browser preview simulates actual desktop features using synthetic demo data. No actual customer data or cloud credentials are exposed.</span>
      </div>

      {/* Demo Viewport Container */}
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-navy-900 border border-white/10">
          {demoTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Screen Visual */}
        <div className="relative rounded-2xl p-2 bg-navy-900/90 border border-white/15 shadow-2xl overflow-hidden">
          {activeTab === 'dashboard' && (
            <div className="space-y-2">
              <img
                src="/assets/desktop-dashboard-light.png"
                alt="Interactive Dashboard Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="p-3 bg-navy-950/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <span>Displaying: Unified Dashboard KPI cards, recent sales, and low stock warnings.</span>
                <span className="text-sky-400 font-mono">Day Mode</span>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-2">
              <img
                src="/assets/desktop-sales-invoice.png"
                alt="Sales Invoice Entry Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="p-3 bg-navy-950/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <span>Displaying: GST Sales Invoice creation with HSN, line item discounts, and tax computation.</span>
                <span className="text-sky-400 font-mono">Invoice Module</span>
              </div>
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-2">
              <img
                src="/assets/desktop-catalog-builder.png"
                alt="PDF Catalog Studio Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="p-3 bg-navy-950/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <span>Displaying: Luxury PDF catalog builder with Coffee Brown luxury theme and live PDF preview.</span>
                <span className="text-rose-400 font-mono">Catalog Studio</span>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-2">
              <img
                src="/assets/desktop-reports-hub.png"
                alt="Reports Hub Preview"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="p-3 bg-navy-950/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <span>Displaying: 6 Business reports (Sales, Purchase, Stock, Outstanding, Product Sales, Payment).</span>
                <span className="text-emerald-400 font-mono">Reports Hub</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Step Conversion Banner */}
      <div className="max-w-2xl mx-auto text-center space-y-4 pt-6">
        <h3 className="text-lg font-bold text-white">Experience it on your own machine</h3>
        <p className="text-xs text-slate-400">Download the full Windows desktop software and companion Android app with 35 days of free unrestricted access.</p>
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
