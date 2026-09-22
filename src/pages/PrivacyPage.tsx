import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Lock, Database, Cloud, Trash2, Share2, Users, FileText, Mail, Phone, MapPin } from 'lucide-react';

export const PrivacyPage: React.FC<PageProps> = () => {
  const lastUpdated = "September 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <Badge variant="brand" size="md">Official Legal & Policy Disclosure</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          How your business records and personal data are protected across {siteConfig.brand.productName} (Desktop & Android Companion Application).
        </p>
        <p className="text-xs text-slate-400 font-medium">
          Effective Date: {lastUpdated} | Publisher: {siteConfig.company.masterName}
        </p>
      </div>

      <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
        {/* 1. Core Data Privacy Architecture */}
        <Card padding="lg" variant="glow" className="space-y-4 border-sky-200 bg-sky-50/30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0" />
            <h2 className="text-xl font-bold text-slate-900">1. Core Data Privacy Architecture & Zero-Tracking Philosophy</h2>
          </div>
          <p>
            At <strong className="text-slate-900">{siteConfig.company.masterName}</strong>, we believe your commercial data belongs solely to you. Unlike multi-tenant cloud platforms that aggregate business invoices and customer ledgers on centralized servers, <strong className="text-slate-900">{siteConfig.brand.productName}</strong> is architected with a strict <strong>offline-first local privacy model</strong>.
          </p>
          <p>
            We do not operate central databases that collect, store, or analyze your commercial transactions. We do not sell, rent, monetize, or track your business activities.
          </p>
        </Card>

        {/* 2. Desktop Data Storage */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">2. Local Desktop Application Storage</h3>
          </div>
          <p>
            All operational business records — including party master profiles, sales invoices, purchase records, inventory quantities, GST calculations, and payment receipts — are stored exclusively on your local computer hardware inside a secured SQLite database (<code className="bg-slate-100 text-sky-800 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200">%LOCALAPPDATA%\SignaturesBill\signatures_bill.db</code>).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
            <li>No business data or customer records are ever uploaded to any company servers.</li>
            <li>Database files and automated backup archives remain strictly within your local Windows environment.</li>
            <li>Authentication and local locking are enforced using industry-standard PBKDF2 cryptography with 100,000 salt iterations.</li>
          </ul>
        </Card>

        {/* 3. Android Application & Permissions */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">3. Android Companion Application & Device Permissions</h3>
          </div>
          <p>
            The <strong className="text-slate-900">SIGNATURES BILL</strong> Android application is a companion viewer designed for business owners to inspect daily sales, party ledgers, and stock balances on the go.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Device Permissions Used:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
              <li><strong className="text-slate-700">Internet & Network State (android.permission.INTERNET, android.permission.ACCESS_NETWORK_STATE):</strong> Required solely to communicate directly with Google Drive API for downloading your synchronized business snapshots.</li>
              <li><strong className="text-slate-700">Zero Sensitive Hardware Permissions:</strong> The application does NOT request or access Camera, Microphone, GPS Location, Contacts, SMS, Call Logs, or External Shared Media Storage.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500">
            Local access on your Android device is secured using a 4-digit PIN stored in Android Keystore-backed <code className="bg-slate-100 text-slate-800 font-mono px-1 py-0.5 rounded border border-slate-200">EncryptedSharedPreferences</code> and optional biometric fingerprint authentication.
          </p>
        </Card>

        {/* 4. Google Drive Cloud Sync & OAuth 2.0 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-cyan-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">4. Private Google Drive Synchronization & Google API User Data Policy</h3>
          </div>
          <p>
            When you choose to enable mobile synchronization, data transfer occurs directly between your personal desktop and <strong>your own personal Google Drive account</strong> using official Google OAuth 2.0 PKCE authentication.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
            <li>Snapshots are placed inside your private Google Drive directory (<code className="bg-slate-100 text-cyan-800 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200">My Drive / SIGNATURES BILL / [Your Business] / Mobile Data</code>).</li>
            <li>The Android app reads snapshots directly from your own Google Drive. No intermediary third-party relay servers exist.</li>
            <li>Our use and transfer of information received from Google APIs adheres to the <strong>Google API Services User Data Policy</strong>, including the Limited Use requirements.</li>
          </ul>
        </Card>

        {/* 5. No Third-Party Sharing / No Sale of Data */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-indigo-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">5. Third-Party Sharing & Data Sale Prohibition</h3>
          </div>
          <p>
            We adhere to a strict policy regarding the sharing and commercialization of user data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
            <li><strong>Zero Sale of Data:</strong> We do not sell, rent, lease, or trade personal or business data to data brokers, advertising networks, or any third parties.</li>
            <li><strong>No Third-Party Ad Networks:</strong> Our desktop software and Android mobile application contain zero third-party advertising SDKs or tracking pixels.</li>
            <li><strong>No Third-Party Analytics SDKs:</strong> We do not embed behavioral tracker libraries that monitor your personal in-app activity.</li>
          </ul>
        </Card>

        {/* 6. Data Retention & Deletion Policy (Google Play Mandatory) */}
        <Card padding="lg" variant="hoverable" className="space-y-4 border-emerald-200 bg-emerald-50/20">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">6. Data Retention & User Data Deletion Rights</h3>
          </div>
          <p>
            Because {siteConfig.company.masterName} does not store your business or customer records on centralized servers, you maintain direct, total ownership over data retention and deletion:
          </p>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-1">A. Deleting Local Mobile Data:</strong>
              You can instantly purge all local caches, authentication tokens, and synced snapshots on Android by going to <em>Android Settings &gt; Apps &gt; SIGNATURES BILL &gt; Storage &gt; Clear Data / Clear Storage</em>, or by uninstalling the application.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-1">B. Deleting Google Drive Cloud Snapshots:</strong>
              You can permanently delete all cloud sync files at any time by navigating to your personal Google Drive and deleting the <code className="text-sky-800 font-mono">SIGNATURES BILL</code> folder. You can also revoke OAuth access at any time through <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline font-medium">Google Account Security &gt; Third-party apps with account access</a>.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-1">C. Deleting Desktop Data:</strong>
              Deleting your local database file at <code className="text-sky-800 font-mono">%LOCALAPPDATA%\SignaturesBill\signatures_bill.db</code> permanently destroys all business ledgers and invoices on the computer.
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-1">D. Data Deletion Support Request:</strong>
              If you have any questions regarding your data or need guidance on executing complete data deletion, you may contact our dedicated support team at <a href={`mailto:${siteConfig.contact.supportEmail}?subject=Data%20Deletion%20Request`} className="text-sky-700 underline font-medium">{siteConfig.contact.supportEmail}</a>. Requests are handled within 48 business hours.
            </div>
          </div>
        </Card>

        {/* 7. Children's Privacy (COPPA Compliance) */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-rose-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">7. Children's Privacy (COPPA & Global Standards)</h3>
          </div>
          <p>
            {siteConfig.brand.productName} is an enterprise and commercial accounting utility intended strictly for commercial business operators, retail merchants, and professional accountants.
          </p>
          <p className="text-xs text-slate-500">
            Our products and services are not directed to individuals under the age of 13 (or under 16 in certain jurisdictions). We do not knowingly collect, solicit, or maintain personal information from children. If we discover that a minor has provided information, it will be deleted immediately.
          </p>
        </Card>

        {/* 8. Policy Updates */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">8. Amendments to This Policy</h3>
          </div>
          <p>
            We may periodically update this Privacy Policy to reflect software feature enhancements, regulatory adjustments, or Google Play policy updates. Any amendments will be reflected on this public URL with an updated "Effective Date". Continued use of the software constitutes acceptance of the current policy.
          </p>
        </Card>

        {/* 9. Contact Details */}
        <Card padding="lg" variant="glow" className="space-y-4 border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">9. Developer & Support Contact Information</h3>
          <p>
            For privacy inquiries, technical assistance, or verification requests regarding {siteConfig.brand.productName}, reach out to us directly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Support Email: <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-sky-700 underline font-medium">{siteConfig.contact.supportEmail}</a></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Contact / WhatsApp: <span className="font-medium text-slate-900">{siteConfig.contact.phone}</span></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Headquarters / Location: <span className="font-medium text-slate-900">Surat, Gujarat, India</span></span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
