import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { siteConfig } from '../config/siteConfig';
import { Laptop, Smartphone, Download, ShieldCheck, Clock } from 'lucide-react';

export const DownloadPage: React.FC<PageProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="brand" size="md">Software Downloads</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight">
          Download {siteConfig.brand.productName}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Install the complete billing ERP on Windows Desktop, and pair with the companion Android mobile app. Includes 35 days of unrestricted full access.
        </p>
      </div>

      {/* Download Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Windows Desktop */}
        <Card variant="hoverable" padding="lg" className="flex flex-col justify-between border-2 border-sky-300 shadow-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Laptop className="w-6 h-6" />
              </div>
              <Badge variant="brand" size="sm">Desktop Source of Truth</Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Windows 64-bit Desktop</h3>
              <p className="text-xs text-slate-600 mt-1">
                Full ERP edition with SQLite database, GST billing, catalog studio, and Google Drive cloud sync.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Version:</span>
                <span className="font-mono font-medium text-slate-800">v{siteConfig.download.desktop.version}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Package Size:</span>
                <span className="font-mono font-medium text-slate-800">{siteConfig.download.desktop.fileSizeFormatted}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">System Compatibility:</span>
                <span className="font-medium text-slate-800">{siteConfig.download.desktop.osSupport}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Trial Period:</span>
                <span className="text-emerald-700 font-bold">35 Days Free</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
            <a
              href={siteConfig.download.desktop.directDownloadUrl}
              download={siteConfig.download.desktop.installerFileName}
              className="block w-full no-underline"
            >
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<Download className="w-4 h-4" />}
              >
                Download Windows Installer
              </Button>
            </a>
            <p className="text-[11px] text-center text-slate-500">
              Safe Inno Setup package • No third-party bundleware
            </p>
          </div>
        </Card>

        {/* Android Mobile */}
        <Card variant="hoverable" padding="lg" className="flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <Smartphone className="w-6 h-6" />
              </div>
              <Badge variant="neutral" size="sm" icon={<Clock className="w-3 h-3" />}>
                {siteConfig.download.android.statusLabel}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Android Mobile App</h3>
              <p className="text-xs text-slate-600 mt-1">
                Companion mobile app for real-time visibility of daily sales, bills, and party statements.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">App Mode:</span>
                <span className="text-cyan-700 font-medium">100% Read-Only Sync</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Security:</span>
                <span className="font-medium text-slate-800">4-Digit PIN & Biometrics</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Cloud Sync:</span>
                <span className="font-medium text-slate-800">Private Google Drive</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Distribution:</span>
                <span className="text-amber-700 font-medium">Google Play Store (In Review)</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              disabled
              className="cursor-not-allowed opacity-75 bg-slate-100 text-slate-400"
            >
              Coming to Google Play
            </Button>
            <p className="text-[11px] text-center text-slate-500">
              Native Kotlin app currently undergoing Play Store publishing.
            </p>
          </div>
        </Card>
      </div>

      {/* Safety Assurance Callout */}
      <div className="max-w-3xl mx-auto p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3 shadow-subtle">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>Installation is self-contained. Your business database resides locally on your computer with encrypted backups.</span>
      </div>
    </div>
  );
};
