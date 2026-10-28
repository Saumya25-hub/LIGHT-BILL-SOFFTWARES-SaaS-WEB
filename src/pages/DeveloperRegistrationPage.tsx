import React, { useState } from 'react';
import type { PageProps } from './HomePage';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Code2, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export const DeveloperRegistrationPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Full-Stack Web (React & TypeScript)',
    experience: '1-3 Years (Mid Developer)',
    githubUrl: '',
    portfolioUrl: '',
    techStack: 'React, TypeScript, Tailwind CSS, Vite, Node.js',
    commitment: 'Project-Based Freelance Contract',
    message: '',
    agreedToPolicy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToPolicy) {
      alert('Please read and agree to the STOMS Developer Policy before submitting.');
      return;
    }

    // Generate unique registration ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRefId = `STOMS-DEV-2026-${randomNum}`;
    setRefId(newRefId);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppMessage = () => {
    const text = `*STOMS Developer Registration Inquiry*\n\n` +
      `*Ref ID:* ${refId}\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Role:* ${formData.role}\n` +
      `*Experience:* ${formData.experience}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*GitHub:* ${formData.githubUrl || 'N/A'}\n` +
      `*Commitment:* ${formData.commitment}\n` +
      `*Skills:* ${formData.techStack}\n\n` +
      `_I have agreed to follow the STOMS Engineering & IP Policy._`;
    return encodeURIComponent(text);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
      
      {/* 01. Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>STOMS Engineering Talent Portal</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Developer Registration &amp; Work Inquiries
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Join the engineering team behind <strong className="text-slate-900">{siteConfig.company.masterName}</strong>. Apply for project-based development contracts, C# desktop engineering, React frontend systems, and software QA architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-medium">Looking for our internal code rules?</span>
          <button
            onClick={() => onNavigate('/developer-policy')}
            className="text-sky-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Read STOMS Developer Policy</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 02. Success Confirmation View */}
      {submitted ? (
        <Card padding="lg" className="border-emerald-300 bg-emerald-50/40 space-y-6 text-center animate-fade-in p-8 sm:p-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Registration Received Successfully!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your technical profile has been logged in the STOMS developer intake registry.
            </p>
          </div>

          {/* Reference ID Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-emerald-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Application Reference ID:</span>
            <span className="font-mono font-black text-sm text-slate-900">{refId}</span>
            <button
              onClick={handleCopyRef}
              className="p-1 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              title="Copy ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Next Steps: WhatsApp Direct Transmission */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm max-w-lg mx-auto text-left space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Priority Direct Contact with Chairman:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For fastest project onboarding and contract discussion, send your registration summary directly to Chairman <strong className="text-slate-900">Saumya Chaudhari</strong> on official WhatsApp:
            </p>

            <a
              href={`https://wa.me/917862930700?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Summary on WhatsApp (+91 78629 30700) ➜</span>
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => { setSubmitted(false); }}
              className="text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
            >
              Submit Another Inquiry
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => onNavigate('/developer-policy')}
              className="text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
            >
              View Engineering Policy
            </button>
          </div>
        </Card>
      ) : (
        /* 03. Registration Form */
        <Card padding="lg" className="border-slate-200 shadow-xl bg-white/90 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-600" />
                <span>Developer Profile &amp; Project Inquiry</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Please provide accurate details so our Project Manager can evaluate project fit.
              </p>
            </div>

            {/* Row 1: Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            {/* Row 2: Phone/WhatsApp & Target Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Domain / Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none bg-white cursor-pointer"
                >
                  <option value="Full-Stack Web (React & TypeScript)">Full-Stack Web (React &amp; TypeScript)</option>
                  <option value="Desktop .NET & C# WPF Engineer">Desktop .NET &amp; C# WPF Engineer</option>
                  <option value="Frontend & Three.js 3D Creative Engineer">Frontend &amp; Three.js 3D Creative Engineer</option>
                  <option value="Database & Systems Architect (SQLite / API)">Database &amp; Systems Architect (SQLite / API)</option>
                  <option value="Quality Assurance (QA) & Security Tester">Quality Assurance (QA) &amp; Security Tester</option>
                  <option value="UI/UX Product & Interaction Designer">UI/UX Product &amp; Interaction Designer</option>
                  <option value="AI Integration & Automation Specialist">AI Integration &amp; Automation Specialist</option>
                </select>
              </div>
            </div>

            {/* Row 3: Experience & Commitment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience Level *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none bg-white cursor-pointer"
                >
                  <option value="Fresh Talent / Student (< 1 Year)">Fresh Talent / Student (&lt; 1 Year)</option>
                  <option value="1-3 Years (Mid Developer)">1-3 Years (Mid Developer)</option>
                  <option value="3-5 Years (Senior Engineer)">3-5 Years (Senior Engineer)</option>
                  <option value="5+ Years (Lead / Principal Architect)">5+ Years (Lead / Principal Architect)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Engagement Model *
                </label>
                <select
                  value={formData.commitment}
                  onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none bg-white cursor-pointer"
                >
                  <option value="Project-Based Freelance Contract">Project-Based Freelance Contract</option>
                  <option value="Milestone-Based Fixed Deliverable">Milestone-Based Fixed Deliverable</option>
                  <option value="Long-term Technical Retainer">Long-term Technical Retainer</option>
                  <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                </select>
              </div>
            </div>

            {/* Row 4: GitHub & Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  GitHub Profile URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/your-username"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Portfolio / Live Project Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            {/* Skills & Tech Stack */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Technologies &amp; Superpowers *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. C#, WPF, SQLite, React, Three.js, TypeScript, Docker"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none"
              />
            </div>

            {/* Statement / Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Why do you want to build with STOMS? (Brief Note)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the most complex problem you have solved or what projects excite you..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-xs sm:text-sm text-slate-900 transition-all outline-none resize-none"
              />
            </div>

            {/* Binding Policy Checkbox */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedToPolicy}
                  onChange={(e) => setFormData({ ...formData, agreedToPolicy: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I confirm that I have reviewed the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/developer-policy')}
                    className="text-sky-600 font-bold hover:underline"
                  >
                    STOMS Developer Policy &amp; Engineering Rules
                  </button>
                  . I agree to adhere to strict code confidentiality, 7-day QA testing SLAs, and non-disclosure standards.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Developer Registration &amp; Inquiry</span>
            </button>

          </form>
        </Card>
      )}

      {/* 04. Policy Summary Teaser Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict IP Protection</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Air-gapped relational SQLite code, BOS engines, and internal repos are proprietary company IP.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Verified AI Standards</span>
          </div>
          <p className="text-[11px] text-slate-500">
            AI-assisted code allowed with full developer testing, security verification, and clean architecture.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-sky-600" />
            <span>7-Day Testing SLA</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Dedicated QA review cycle with transparent defect fixing prior to production deployment.
          </p>
        </div>
      </div>

    </div>
  );
};
