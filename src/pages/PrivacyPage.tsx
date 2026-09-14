import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Lock, Database, Cloud } from 'lucide-react';

export const PrivacyPage: React.FC<PageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="brand" size="md">Data Transparency</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          How your business data is handled across Desktop, Android, and Cloud Sync.
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
        {/* Core Principles */}
        <Card padding="lg" variant="glow" className="space-y-4 border-sky-500/20">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl font-bold text-white">1. Core Data Privacy Architecture</h2>
          </div>
          <p>
            At <strong className="text-white">{siteConfig.company.masterName}</strong>, we respect your business privacy. Unlike web-based multi-tenant software that centralizes your company invoices and customer ledgers on third-party cloud servers, <strong className="text-white">{siteConfig.brand.productName}</strong> is designed as an <strong>offline-first local desktop system</strong>.
          </p>
        </Card>

        {/* Desktop Data Storage */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">2. Local Desktop Data Storage</h3>
          </div>
          <p>
            All your business records — including customer details, supplier bills, inventory quantities, GST invoices, and financial transactions — reside locally on your Windows computer in a local SQLite database (<code className="text-sky-300 font-mono text-xs">%LOCALAPPDATA%\SignaturesBill\signatures_bill.db</code>).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Your data is never transmitted to any {siteConfig.company.masterName} servers.</li>
            <li>Database files and local backups are stored exclusively on your hardware.</li>
            <li>Authentication is verified locally using PBKDF2 cryptography with 100,000 hashing rounds.</li>
          </ul>
        </Card>

        {/* Cloud Sync & Google Drive */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">3. Google Drive Mobile Synchronization</h3>
          </div>
          <p>
            When you enable mobile data synchronization, the desktop application exports business snapshots directly to <strong>your personal Google Drive account</strong> using official Google OAuth 2.0 PKCE.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Snapshots are placed inside your private Google Drive folder (<code className="text-cyan-300 font-mono text-xs">My Drive / SIGNATURES BILL / [Your Business] / Mobile Data</code>).</li>
            <li>The companion Android app downloads read-only snapshots directly from your own Google Drive.</li>
            <li>No intermediate company servers or third-party brokers have access to your Google Drive files.</li>
          </ul>
        </Card>

        {/* Android App Data */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">4. Android Application Data & Security</h3>
          </div>
          <p>
            The Android application operates in a <strong>100% Read-Only mode</strong>. It does not write, modify, or delete business data. Local app access is secured by a 4-digit PIN stored securely in EncryptedSharedPreferences and device-native biometric fingerprint authentication.
          </p>
        </Card>

        {/* Owner Confirmation Notice */}
        <div className="p-4 rounded-xl bg-navy-900/60 border border-white/10 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">Owner Legal Confirmation Notice:</p>
          <p>
            Additional corporate jurisdiction terms, formal refund windows, and registered legal entity designations will be updated upon formal legal ratification. For inquiries, email <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-sky-400 underline">{siteConfig.contact.supportEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
