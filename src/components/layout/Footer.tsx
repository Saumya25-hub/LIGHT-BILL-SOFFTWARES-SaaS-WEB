import React from 'react';
import { ShieldCheck, Mail, Phone, Laptop, Smartphone, Cloud } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-sm">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold text-sm">Offline-First Desktop ERP</h4>
                <p className="text-xs text-slate-500">Fast, local SQLite database on your Windows PC.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold text-sm">Companion Android App</h4>
                <p className="text-xs text-slate-500">View sales, purchases, and parties on the go.</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold text-sm">Private Google Drive Sync</h4>
                <p className="text-xs text-slate-500">Direct sync to your own drive without third-party servers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company & Product Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1 shadow-xs">
                <img
                  src="/assets/cube_s_master.png"
                  alt="SIGNATURES"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-bold text-slate-900 text-base">
                  {siteConfig.brand.productName}
                </span>
                <p className="text-xs text-slate-500">By {siteConfig.company.masterName}</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              {siteConfig.brand.productTagline} Built for Indian small businesses, retail shops, traders, and distributors. Powerful inside, simple outside.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Includes 35-Day Full-Featured Free Trial</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-slate-900 text-xs font-semibold uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/product')} className="hover:text-slate-900 transition-colors">
                  Features & Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/demo')} className="hover:text-slate-900 transition-colors">
                  Interactive Demo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/pricing')} className="hover:text-slate-900 transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/download')} className="hover:text-slate-900 transition-colors">
                  Download Desktop & Android
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-slate-900 text-xs font-semibold uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-slate-900 transition-colors">
                  About {siteConfig.company.masterName}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/support')} className="hover:text-slate-900 transition-colors">
                  Support & Contact
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy')} className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-slate-900 text-xs font-semibold uppercase tracking-wider mb-3">Verified Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <a href={`mailto:${siteConfig.contact.supportEmail}`} className="hover:text-slate-900 transition-colors truncate">
                  {siteConfig.contact.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-slate-900 transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteConfig.company.masterName}. All rights reserved. {siteConfig.brand.productName} is a trademark of {siteConfig.company.masterName}.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy')} className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/support')} className="hover:text-slate-800 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
