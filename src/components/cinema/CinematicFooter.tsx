import React from 'react';
import { ArrowRight, Mail, Phone, Shield, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface CinematicFooterProps {
  onNavigate?: (path: string) => void;
}

export const CinematicFooter: React.FC<CinematicFooterProps> = ({ onNavigate }) => {
  return (
    <footer id="contact" className="relative w-full bg-black text-white pt-24 pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden border-t border-white/10">
      
      {/* Ambient Cosmic Lights in Footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-purple-900/25 via-indigo-950/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-950/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Main Oversized Statement & CTA */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            LET'S SHAPE THE FUTURE
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white">
            Have an idea worth <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-300 glow-lavender">
              bringing to life?
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Whether you are building high-throughput enterprise software, native mobile experiences, or immersive visual applications — let's engineer something extraordinary together.
          </p>

          {/* Prominent Interactive "Let's Create →" CTA Button */}
          <div className="pt-4 flex justify-center">
            <a
              href={`mailto:${siteConfig.contact.supportEmail}?subject=Collaboration%20Inquiry%20-%20S%20TOM'S`}
              className="group relative inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-display text-base sm:text-lg font-bold tracking-wide transition-all duration-300 shadow-[0_0_40px_-5px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_0px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95 border border-purple-400/40"
            >
              <span>Let's Create</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </a>
          </div>
        </div>

        {/* Studio Info & Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-16 border-t border-white/10 text-xs font-mono">
          
          {/* Col 1: Studio Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-xl tracking-widest text-white">S TOM’S</span>
              <span className="text-[10px] tracking-widest px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300">STUDIO</span>
            </div>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Creative technology, commercial software engineering, and immersive digital art.
            </p>
            <div className="text-slate-500 text-[11px]">
              Surat, Gujarat, India
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-widest font-bold">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-purple-300 transition-colors">Home Experience</a></li>
              <li><a href="#process" className="hover:text-purple-300 transition-colors">Creative Process</a></li>
              <li><a href="#works" className="hover:text-purple-300 transition-colors">Selected Works</a></li>
              <li><a href="#experiments" className="hover:text-purple-300 transition-colors">Tech Playground</a></li>
              {onNavigate && (
                <>
                  <li><button onClick={() => onNavigate('/product')} className="hover:text-purple-300 transition-colors">Software Features</button></li>
                  <li><button onClick={() => onNavigate('/pricing')} className="hover:text-purple-300 transition-colors">Commercial Plans</button></li>
                </>
              )}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-widest font-bold">Contact Studio</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <a href={`mailto:${siteConfig.contact.supportEmail}`} className="hover:text-purple-300 transition-colors underline">
                  {siteConfig.contact.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-slate-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <a href={siteConfig.social.githubOrgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
                  github.com/Saumya25-hub
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy (Crucial for Google Play) */}
          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-widest font-bold">Compliance & Legal</h4>
            <p className="text-slate-400 text-xs font-sans">
              Google Play Certified Privacy & Data Governance Standards.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onNavigate ? onNavigate('/privacy') : window.location.href = '/privacy'}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Privacy Policy Page</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} S TOM’S. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Systems Online & Verified
            </span>
            <span>•</span>
            <span>Where Creativity Meets Technology</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
