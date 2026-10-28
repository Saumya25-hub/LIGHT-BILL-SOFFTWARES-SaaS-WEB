import React from 'react';
import type { PageProps } from './HomePage';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/siteConfig';
import { 
  ShieldCheck, 
  GitBranch, 
  Lock, 
  Sparkles, 
  Clock, 
  Coins, 
  Users, 
  Printer, 
  ArrowRight, 
  FileCode2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const DeveloperPolicyPage: React.FC<PageProps> = ({ onNavigate }) => {
  const effectiveDate = "October 2026";
  const policyVersion = "v2.4 - Enterprise Engineering Standard";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
      
      {/* 01. Official Document Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider uppercase shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>STOMS Official Corporate Governance</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Developer Policy &amp; Engineering Standards
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Authoritative internal engineering standards, intellectual property protection, delivery governance, and professional conduct for all developers, engineers, and technical contributors at <strong className="text-slate-900">{siteConfig.company.masterName}</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-500 font-medium">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            Document Version: <strong className="text-slate-800">{policyVersion}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
            Effective Date: <strong className="text-slate-800">{effectiveDate}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            Executive Seal: Active &amp; Enforced
          </span>
        </div>

        {/* Action Bar */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={() => onNavigate('/developer-registration')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <span>Developer Registration Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 02. Executive Authorization Callout */}
      <Card padding="lg" className="border-sky-200 bg-sky-50/50 space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-700 shrink-0">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Organizational Hierarchy &amp; Executive Authority
              </h3>
              <p className="text-xs text-slate-600">
                Authorized by <strong className="text-slate-900">Saumya Chaudhari</strong> (Founder &amp; Chairman — Vision and System Architect)
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-sky-200 text-sky-900 border border-sky-300">
            Mandatory Compliance
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          Every software developer, engineer, technical consultant, independent freelancer, and systems partner working on any product under the <strong className="text-slate-900">{siteConfig.company.masterName}</strong> software ecosystem — including <em>{siteConfig.brand.productName}</em>, <em>8 PM Pool &amp; Snooker Club Suite</em>, <em>STOMS Inventory Pro</em>, and internal developer tools — must adhere strictly to the following six binding engineering rules.
        </p>
      </Card>

      {/* 03. The 6 Core Engineering Policies */}
      <div className="space-y-6">

        {/* RULE 1 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">RULE 01</span>
                <h2 className="text-lg font-bold text-slate-900">Project Hierarchy &amp; Architectural Governance</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.1</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              The Project Manager (PM) assigns all projects and work packages. Team roles and responsibilities are clearly defined, and all developers must strictly follow the approved project structure, coding standards, and dependency hierarchy.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 pt-1">
              <li>
                <strong>Single Source of Assignment:</strong> No task, module modification, or third-party dependency may be introduced without prior written approval from the Project Manager or Lead Architect.
              </li>
              <li>
                <strong>Strict Architectural Hierarchy:</strong> Developers must strictly respect repository boundaries, database schema contracts (relational SQLite migrations and foreign keys), and approved design patterns (such as MVVM and Clean Architecture).
              </li>
              <li>
                <strong>Branching &amp; Review Discipline:</strong> Direct commits to the <code className="bg-slate-100 text-sky-800 px-1 py-0.5 rounded font-mono text-[11px]">main</code> or production branches are blocked. Every change must be delivered via an isolated feature branch and undergo peer review before merging.
              </li>
            </ul>
          </div>
        </Card>

        {/* RULE 2 */}
        <Card padding="lg" variant="hoverable" className="space-y-4 border-rose-200/70">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-700 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">RULE 02</span>
                <h2 className="text-lg font-bold text-slate-900">Code Confidentiality &amp; Intellectual Property (IP) Protection</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.2</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              Private source code repositories, proprietary engine designs, internal workflows, and source files must never be shared with unauthorized persons. Access permissions and legal consequences are governed by binding written agreements.
            </p>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Zero-Leakage &amp; Non-Disclosure Protocol:</span>
              </div>
              <p>
                All proprietary STOMS engines — including the BOS E-Way Automation Engine, the BNVE Visual Graph Node System, Zero-Trust LAN KDS, the Relational SQLite Protection Vault, and DEV-TOOL authority keys — are 100% company intellectual property. Sharing source code, compiled binaries, credentials, or architectural designs with any outside party constitutes a direct breach of contract and triggers immediate legal enforcement.
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500 pt-1">
              <li>Developer credentials, API keys, and repository access tokens are strictly individual and must never be shared or transferred.</li>
              <li>Unauthorized code export, public repository publication, or duplication of proprietary assets will result in immediate contract termination and legal prosecution.</li>
            </ul>
          </div>
        </Card>

        {/* RULE 3 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-700 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">RULE 03</span>
                <h2 className="text-lg font-bold text-slate-900">AI-Assisted Development Standards</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.3</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              AI tools and code assistants are permitted, but developers are personally responsible for understanding, thoroughly testing, verifying security, and maintaining architectural correctness for all generated code. Blind copy-pasting is strictly prohibited.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 pt-1">
              <li>
                <strong>Total Developer Ownership:</strong> Regardless of whether code is generated by AI or written manually, the committing engineer holds complete responsibility for ensuring the code is bug-free, efficient, and robust.
              </li>
              <li>
                <strong>No Unverified Dependencies:</strong> Developers must never install hallucinated or unverified third-party libraries without prior security, vulnerability, and license verification.
              </li>
              <li>
                <strong>Architectural Integrity:</strong> Existing formatting conventions, strict typing contracts, naming standards, and documentation comments must always be respected and preserved.
              </li>
            </ul>
          </div>
        </Card>

        {/* RULE 4 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">RULE 04</span>
                <h2 className="text-lg font-bold text-slate-900">Seven-Day Testing &amp; Bug Fixing Protocol</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.4</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              Following project or milestone completion, a mandatory seven-day QA testing period applies. The testing team provides verified defect reports, and the developer must resolve all issues within the agreed scope. Acceptance criteria and testing periods must be clearly established in the contract before development begins.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 pt-1">
              <li>
                <strong>Structured QA Cycle:</strong> Delivered features undergo continuous seven-day testing in a staging or sandbox environment to evaluate edge cases, performance under load, and regression stability.
              </li>
              <li>
                <strong>Defect Resolution SLA:</strong> All critical, major, and blocking defects reported by QA must be resolved by the assigned developer within the agreed milestone timeline.
              </li>
              <li>
                <strong>Mandatory Sign-off:</strong> No software release or feature module is approved for production deployment until the QA Lead and Project Manager provide formal sign-off.
              </li>
            </ul>
          </div>
        </Card>

        {/* RULE 5 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-700 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">RULE 05</span>
                <h2 className="text-lg font-bold text-slate-900">Performance-Based Project Payment Model</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.5</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              Payment is calculated based on project complexity, clean implementation, code quality, delivery speed, and measurable output. Written agreements must clearly distinguish between baseline deliverables, scope additions, and defect fixes.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 pt-1">
              <li>
                <strong>Transparent Milestone Criteria:</strong> The Definition of Done (DoD) for every milestone is formally documented and agreed upon before work commences.
              </li>
              <li>
                <strong>Scope Change Governance:</strong> Any new features or architectural modifications requested by management will be estimated separately under a formal scope addendum.
              </li>
              <li>
                <strong>Defect Resolution vs. New Work:</strong> Fixing bugs within agreed project requirements is an essential part of completing the milestone, whereas net-new business logic is evaluated as a change request.
              </li>
            </ul>
          </div>
        </Card>

        {/* RULE 6 */}
        <Card padding="lg" variant="hoverable" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-700 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">RULE 06</span>
                <h2 className="text-lg font-bold text-slate-900">Professional Conduct &amp; Team Culture</h2>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">Section 1.6</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p className="font-medium text-slate-900">
              Team members must communicate respectfully and professionally in English (or professional Hindi where appropriate). Personal insults, harassment, deliberate misconduct, or repeated serious policy violations will trigger a documented disciplinary process.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500 pt-1">
              <li>
                <strong>Respectful Communication:</strong> A professional, constructive tone is required across all project communication channels, pull request reviews, and team discussions.
              </li>
              <li>
                <strong>Zero Tolerance for Harassment:</strong> Discrimination, personal insults, hostile behavior, or intentional sabotage will result in immediate suspension and contract termination.
              </li>
              <li>
                <strong>Direct Escalation Path:</strong> Team members facing blockers, procedural issues, or ethical concerns may directly escalate the matter to the Project Manager or Chairman Saumya Chaudhari.
              </li>
            </ul>
          </div>
        </Card>

      </div>

      {/* 04. Corporate Sign-off & Application Link */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ready to Work with STOMS?</span>
          </div>
          <h3 className="text-xl font-bold text-white">Developer Onboarding &amp; Registration</h3>
          <p className="text-xs text-slate-400 max-w-md mt-1">
            Are you a skilled developer or engineer who thrives under clean architecture and high-performance engineering? Register your profile today.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/developer-registration')}
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Open Application Form ➜</span>
        </button>
      </div>

    </div>
  );
};
