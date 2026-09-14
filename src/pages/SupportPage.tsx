import React from 'react';
import type { PageProps } from './HomePage';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { Mail, Phone, Clock } from 'lucide-react';

export const SupportPage: React.FC<PageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <Badge variant="brand" size="md">Direct Assistance</Badge>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
          Support & Contact
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Need help installing, configuring cloud sync, or activating your 35-day trial? Reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Support */}
        <Card variant="hoverable" padding="lg" className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Email Support</h3>
            <p className="text-xs text-slate-400 mt-1">
              Send us queries regarding license keys, feature assistance, or feedback.
            </p>
          </div>
          <div className="pt-2">
            <a
              href={`mailto:${siteConfig.contact.supportEmail}`}
              className="text-sm font-mono text-sky-400 hover:text-sky-300 font-semibold"
            >
              {siteConfig.contact.supportEmail}
            </a>
          </div>
        </Card>

        {/* Phone & WhatsApp Support */}
        <Card variant="hoverable" padding="lg" className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Phone & WhatsApp</h3>
            <p className="text-xs text-slate-400 mt-1">
              Direct line for customer assistance and onboarding guidance.
            </p>
          </div>
          <div className="pt-2">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
              className="text-sm font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </Card>
      </div>

      {/* Support Hours Card */}
      <Card variant="subtle" padding="lg" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h4 className="text-white text-sm font-semibold">Operating Hours</h4>
            <p className="text-xs text-slate-400">{siteConfig.contact.hours}</p>
          </div>
        </div>
        <Badge variant="success" size="sm">Active Team</Badge>
      </Card>
    </div>
  );
};
