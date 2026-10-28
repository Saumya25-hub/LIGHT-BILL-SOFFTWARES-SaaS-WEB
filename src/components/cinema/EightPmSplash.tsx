import React, { useState, useEffect } from 'react';

interface EightPmSplashProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel?: () => void;
}

export const EightPmSplash: React.FC<EightPmSplashProps> = ({
  isOpen,
  onComplete,
  onCancel,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Connecting to Relational SQLite Engine...');

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);

      if (current < 25) {
        setStatusText('Connecting to Relational SQLite Engine...');
      } else if (current < 55) {
        setStatusText('Loading VIP Floor Layouts & Table Rates...');
      } else if (current < 80) {
        setStatusText('Calibrating Dual-Billing Per-Minute & Hourly Engine...');
      } else if (current < 95) {
        setStatusText('Activating STOMS Quantum Protection Vault...');
      } else {
        setStatusText('8 PM Club Workspace Ready!');
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 45); // ~2.2s total smooth load

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in p-4 select-none">
      {/* Outer Modal Container resembling 8 PM WPF Splash Screen */}
      <div className="relative w-full max-w-[520px] rounded-2xl bg-[#0C0E14] border border-[#1F2536] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col items-center overflow-hidden">
        
        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-2xl pointer-events-none" />

        {/* Skip / Close Button */}
        <button
          onClick={onCancel || onComplete}
          className="absolute top-4 right-4 text-xs font-semibold text-slate-500 hover:text-slate-300 px-2 py-1 rounded bg-slate-900/60 border border-slate-800 transition-colors cursor-pointer"
        >
          Skip ✕
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-3xl tracking-tight bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              8 PM
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              v2.3 PRO
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 tracking-wider mt-1 uppercase">
            Elite Pool &amp; Snooker Club Management
          </span>
        </div>

        {/* Realistic 3D 8-Ball Spinning Animation Container */}
        <div className="relative w-36 h-36 my-4 flex items-center justify-center">
          {/* Ambient Breathing Aura Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

          {/* Ball Shadow */}
          <div className="absolute -bottom-3 w-28 h-6 bg-black/80 blur-md rounded-full transform scale-y-50" />

          {/* 3D 8-Ball Graphic */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-slate-700 via-slate-950 to-black shadow-[inset_-8px_-8px_16px_rgba(0,0,0,0.9),inset_6px_6px_12px_rgba(255,255,255,0.25),0_15px_30px_rgba(0,0,0,0.8)] border border-slate-800 flex items-center justify-center animate-[spin_4s_linear_infinite]">
            {/* White Circle */}
            <div className="w-12 h-12 rounded-full bg-white shadow-inner flex items-center justify-center">
              <span className="text-black font-black text-2xl tracking-tighter">8</span>
            </div>
            {/* Glossy High-Spec Reflection */}
            <div className="absolute top-2 left-4 w-10 h-6 bg-gradient-to-b from-white/40 to-transparent rounded-full transform -rotate-45 blur-[0.5px]" />
          </div>
        </div>

        {/* Progress & Live Status Readout */}
        <div className="w-full mt-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300 truncate pr-2">{statusText}</span>
            <span className="text-emerald-400 font-mono font-bold">{progress}%</span>
          </div>

          {/* Emerald Gradient Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#141824] border border-[#242C3F] overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="w-full flex items-center justify-between text-[9.5px] font-bold text-slate-500 mt-6 pt-3 border-t border-slate-800/80">
          <span className="tracking-wider uppercase">Powered by STOMS Ecosystem</span>
          <span className="text-emerald-500/80 tracking-wider uppercase font-mono">ACID SQLite • Encrypted Vault</span>
        </div>

      </div>
    </div>
  );
};

