import React, { useState, useEffect } from 'react';
import { Dumbbell, Shield, Sparkles, X, Activity, Zap } from 'lucide-react';

interface OnyxGymSplashProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel?: () => void;
}

export const OnyxGymSplash: React.FC<OnyxGymSplashProps> = ({
  isOpen,
  onComplete,
  onCancel,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Jetpack Compose Silk Canvas...');

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);

      if (current < 20) {
        setStatusText('Initializing Jetpack Compose Silk Ribbon Canvas...');
      } else if (current < 45) {
        setStatusText('Mounting Air-Gapped Room SQLite Member Database...');
      } else if (current < 70) {
        setStatusText('Calibrating BMR / TDEE Algorithmic Diet Engine...');
      } else if (current < 90) {
        setStatusText('Securing Biometric Attendance & WhatsApp API Vault...');
      } else {
        setStatusText('ONYX GYM OS Ready — Discipline Today, Stronger Tomorrow!');
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 40); // ~2s smooth luxury load

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in p-4 select-none">
      
      {/* Outer Obsidian Luxury Modal */}
      <div className="relative w-full max-w-[560px] rounded-3xl bg-gradient-to-b from-[#121620] via-[#0A0D14] to-[#040608] border border-amber-500/30 p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.98),0_0_50px_rgba(245,158,11,0.15)] flex flex-col items-center overflow-hidden">
        
        {/* Ambient Top Glow Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Skip / Close Button */}
        <button
          onClick={onCancel || onComplete}
          className="absolute top-5 right-5 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mt-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[11px] font-black uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>STOMS Commercial Athletic OS</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h2 className="font-black text-3xl sm:text-4xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              ONYX GYM
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              v1.0 PRO
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider mt-1 uppercase">
            Elite Fitness &amp; Health Club Management
          </span>
        </div>

        {/* Realistic 3D Spinning Dumbbells Graphics Container */}
        <div className="relative w-40 h-40 my-3 flex items-center justify-center">
          {/* Ambient Breathing Aura Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-emerald-500/20 blur-2xl animate-pulse" />

          {/* Rotating Dumbbell Visual Effect */}
          <div className="relative w-32 h-32 flex items-center justify-center animate-[spin_6s_linear_infinite]">
            {/* Spinning Dumbbell SVG Icon with Chrome Gradient Plates */}
            <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              <defs>
                <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="30%" stopColor="#CBD5E1" />
                  <stop offset="60%" stopColor="#64748B" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* Central Knurled Grip Handle */}
              <rect x="34" y="47" width="32" height="6" rx="2" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="1" />
              {/* Grip Knurling Lines */}
              <line x1="42" y1="47" x2="42" y2="53" stroke="#334155" strokeWidth="1" />
              <line x1="46" y1="47" x2="46" y2="53" stroke="#334155" strokeWidth="1" />
              <line x1="50" y1="47" x2="50" y2="53" stroke="#334155" strokeWidth="1" />
              <line x1="54" y1="47" x2="54" y2="53" stroke="#334155" strokeWidth="1" />
              <line x1="58" y1="47" x2="58" y2="53" stroke="#334155" strokeWidth="1" />

              {/* Left Outer Weight Plate */}
              <rect x="20" y="30" width="8" height="40" rx="3" fill="url(#goldGrad)" stroke="#78350F" strokeWidth="1" />
              {/* Left Inner Weight Plate */}
              <rect x="28" y="35" width="6" height="30" rx="2" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="1" />
              {/* Left Lock Collar */}
              <circle cx="18" cy="50" r="3" fill="#F59E0B" />

              {/* Right Inner Weight Plate */}
              <rect x="66" y="35" width="6" height="30" rx="2" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="1" />
              {/* Right Outer Weight Plate */}
              <rect x="72" y="30" width="8" height="40" rx="3" fill="url(#goldGrad)" stroke="#78350F" strokeWidth="1" />
              {/* Right Lock Collar */}
              <circle cx="82" cy="50" r="3" fill="#F59E0B" />
            </svg>
          </div>

          {/* Core Central Glow Badge */}
          <div className="absolute w-10 h-10 rounded-full bg-black/80 border border-amber-400/50 flex items-center justify-center shadow-lg">
            <Dumbbell className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
        </div>

        {/* User's Prominent Core Quote Card */}
        <div className="w-full my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-400" />
          
          <p className="text-sm sm:text-base font-extrabold text-amber-200 tracking-tight leading-snug italic">
            "Motivation doesn't mean results, it means your answer."
          </p>
          <div className="mt-1 flex items-center justify-center gap-2 text-[10.5px] font-bold text-amber-400/80 tracking-widest uppercase">
            <span>— DISCIPLINE TODAY, A STRONGER TOMORROW —</span>
          </div>
        </div>

        {/* Real-time Progress Bar */}
        <div className="w-full mt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span className="truncate max-w-[280px] sm:max-w-[360px]">{statusText}</span>
            </span>
            <span className="font-mono font-bold text-amber-300">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_rgba(245,158,11,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Hardware Telemetry */}
        <div className="w-full mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Air-Gapped Local Room DB</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Algorithmic Macro Builder</span>
          </div>
        </div>

      </div>
    </div>
  );
};
