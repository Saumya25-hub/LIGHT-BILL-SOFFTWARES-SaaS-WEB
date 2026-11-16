import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ChefHat,
  Wifi,
  Zap,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Tv,
} from 'lucide-react';

export type SimulationStep =
  | 'IDLE'
  | 'WAITER_ORDER'
  | 'LAN_DISPATCH'
  | 'KITCHEN_PREP'
  | 'KITCHEN_READY'
  | 'POS_SETTLE';

export const RestaurantEcosystemSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('IDLE');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [prepSeconds, setPrepSeconds] = useState<number>(14);

  // Auto-play timer cycle
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        switch (prev) {
          case 'IDLE':
            return 'WAITER_ORDER';
          case 'WAITER_ORDER':
            return 'LAN_DISPATCH';
          case 'LAN_DISPATCH':
            return 'KITCHEN_PREP';
          case 'KITCHEN_PREP':
            return 'KITCHEN_READY';
          case 'KITCHEN_READY':
            return 'POS_SETTLE';
          case 'POS_SETTLE':
            return 'IDLE';
          default:
            return 'IDLE';
        }
      });
    }, 3400);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Prep timer increment
  useEffect(() => {
    const timer = setInterval(() => {
      setPrepSeconds((s) => (s >= 59 ? 12 : s + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStepProgress = () => {
    switch (currentStep) {
      case 'IDLE':
        return 0;
      case 'WAITER_ORDER':
        return 20;
      case 'LAN_DISPATCH':
        return 40;
      case 'KITCHEN_PREP':
        return 65;
      case 'KITCHEN_READY':
        return 85;
      case 'POS_SETTLE':
        return 100;
    }
  };

  return (
    <div className="w-full relative rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden text-slate-800 ring-1 ring-slate-900/[0.04]">
      {/* Background Subtle Executive Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Header & Simulation Controller */}
      <div className="relative z-10 px-6 sm:px-10 pt-7 pb-5 border-b border-slate-200/80 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase">
              LIVE 3-DEVICE LOCAL LAN SYNC SIMULATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Watch Orders Flow Across Phone, Kitchen Screen &amp; PC Monitor
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time local Wi-Fi synchronization with &lt; 18ms latency and zero internet dependency.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer select-none ${
              isAutoPlaying
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 hover:bg-sky-700'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-xs'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? 'fill-white text-white' : 'text-slate-600'}`} />
            <span>{isAutoPlaying ? 'Auto-Cycle Active' : 'Resume Auto-Play'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentStep('IDLE');
              setIsAutoPlaying(false);
            }}
            className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 shadow-xs transition-all cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="relative z-10 bg-slate-100/80 border-b border-slate-200/80 px-6 sm:px-10 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <div
            onClick={() => {
              setCurrentStep('WAITER_ORDER');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'WAITER_ORDER' || currentStep === 'LAN_DISPATCH'
                ? 'text-sky-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              currentStep === 'WAITER_ORDER' || currentStep === 'LAN_DISPATCH'
                ? 'bg-sky-600 text-white font-bold'
                : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </span>
            <span>1. Waiter Punches KOT</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-400 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('KITCHEN_PREP');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'KITCHEN_PREP'
                ? 'text-amber-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              currentStep === 'KITCHEN_PREP'
                ? 'bg-amber-500 text-white font-bold'
                : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </span>
            <span>2. Kitchen Screen Alerts</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-400 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('KITCHEN_READY');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'KITCHEN_READY'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              currentStep === 'KITCHEN_READY'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </span>
            <span>3. Chef Marks Ready</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-400 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('POS_SETTLE');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'POS_SETTLE'
                ? 'text-indigo-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              currentStep === 'POS_SETTLE'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-200 text-slate-600'
            }`}>
              4
            </span>
            <span>4. PC Cashier Settle</span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${getStepProgress()}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 HARDWARE DEVICES: PHONE (LEFT) + KDS SCREEN (CENTER) + PC MONITOR (RIGHT) */}
      {/* ========================================================================= */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-10 bg-slate-100/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* ------------------------------------------------------------- */}
          {/* DEVICE 1: ANDROID WAITER PHONE (Portrait Smartphone Bezel)    */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Phone Hardware Body */}
            <div className="w-full max-w-[280px] rounded-[40px] bg-slate-950 border-[6px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-2.5 relative overflow-hidden transition-all hover:scale-[1.01] hover:border-sky-500/70">
              {/* Dynamic Island / Punch Hole Camera */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-950 inline-block mr-1.5 border border-slate-800" />
                <span className="w-8 h-1 bg-slate-950 rounded-full inline-block" />
              </div>

              {/* Phone Touch Screen Display */}
              <div className="rounded-[28px] bg-slate-900 border border-slate-800/80 p-3 text-xs text-slate-200 min-h-[440px] flex flex-col justify-between shadow-inner">
                <div>
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-2.5">
                    <span className="font-semibold text-white">RADHE RESTAURANT</span>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live • Rahul</span>
                    </div>
                  </div>

                  {/* Active Table Badge */}
                  <div className="bg-sky-500/15 border border-sky-400/40 rounded-xl p-2.5 mb-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[9.5px] font-mono text-sky-300 uppercase font-bold">
                        ACTIVE DINE-IN TABLE
                      </div>
                      <div className="text-sm font-black text-white flex items-center gap-1.5">
                        <span>Table T-04</span>
                        <span className="text-[10px] font-medium text-slate-400">(4 Guests)</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-200 font-bold text-[10px]">
                      Dine In
                    </span>
                  </div>

                  {/* Selected Dishes */}
                  <div className="space-y-1.5 mb-2.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Selected Dishes (KOT #108)
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">2x Butter Chicken</div>
                        <div className="text-[9.5px] text-slate-400">Main Course • Non-Veg</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹760</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">4x Garlic Naan</div>
                        <div className="text-[9.5px] text-slate-400">Tandoor Breads • Veg</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹240</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">2x Fresh Lime Soda</div>
                        <div className="text-[9.5px] text-slate-400">Beverages • Sweet &amp; Salt</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹160</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2 px-1">
                    <span>Subtotal (3 Items):</span>
                    <span className="font-mono text-white text-sm">₹1,160</span>
                  </div>

                  {currentStep === 'WAITER_ORDER' || currentStep === 'LAN_DISPATCH' ? (
                    <button
                      onClick={() => {
                        setCurrentStep('LAN_DISPATCH');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 text-xs flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Sending KOT to Kitchen...</span>
                    </button>
                  ) : currentStep === 'KITCHEN_PREP' ? (
                    <div className="w-full py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>KOT Sent • Cooking in Kitchen</span>
                    </div>
                  ) : currentStep === 'KITCHEN_READY' ? (
                    <div className="w-full py-2 rounded-xl bg-emerald-500/25 border border-emerald-400 text-emerald-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5 animate-bounce">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Ding! Food Ready for Table T-04</span>
                    </div>
                  ) : currentStep === 'POS_SETTLE' ? (
                    <div className="w-full py-2 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Table Settled at Cashier</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentStep('WAITER_ORDER');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Punch KOT for Table T-04</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
            </div>

            {/* Device Label */}
            <div className="text-center mt-3">
              <span className="font-bold text-sm text-slate-900 block flex items-center justify-center gap-1.5">
                <Smartphone className="w-4 h-4 text-sky-600" />
                <span>1. Waiter Handheld Phone</span>
              </span>
              <span className="text-xs text-sky-600 font-medium">Android App • Offline Outbox Queue</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* DEVICE 2: INDUSTRIAL KITCHEN DISPLAY SCREEN (Wall Mount KDS)  */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Top Stainless Steel Wall-Mount Bracket */}
            <div className="w-28 h-4 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 rounded-t-lg mx-auto flex items-center justify-around px-2 shadow-sm border-t border-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-800 shadow-inner inline-block" />
              <span className="text-[8px] font-mono font-bold text-slate-200 uppercase tracking-widest">WALL MOUNT</span>
              <span className="w-2 h-2 rounded-full bg-slate-800 shadow-inner inline-block" />
            </div>

            {/* Industrial Heavy-Duty Touch Screen Frame */}
            <div className="w-full rounded-2xl bg-slate-950 border-4 border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-2.5 relative overflow-hidden transition-all hover:scale-[1.01] hover:border-amber-500/70">
              {/* Metallic Corner Allen Bolts */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-600" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-600" />

              {/* KDS Industrial Top Banner */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono px-1">
                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-amber-300 uppercase tracking-wide">
                    KDS TOUCH SCREEN #01
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/30">
                    Hot Kitchen
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* KDS Active Tickets Workspace */}
              <div className="space-y-2 min-h-[380px] flex flex-col justify-between">
                <div>
                  {/* Primary Ticket: T-04 */}
                  <div
                    className={`rounded-xl border p-3 transition-all ${
                      currentStep === 'KITCHEN_PREP'
                        ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/10'
                        : currentStep === 'KITCHEN_READY' || currentStep === 'POS_SETTLE'
                        ? 'bg-emerald-950/30 border-emerald-400/80'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold font-mono text-[11px] border border-sky-500/30">
                          T-04
                        </span>
                        <span className="font-bold text-white text-xs">Ticket #KOT-108</span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-300 font-bold">02:{prepSeconds}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 mb-3 border-y border-slate-800/80 py-2">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white">2x Butter Chicken</span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-900/50">
                          Hot Curry
                        </span>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white">4x Garlic Naan</span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-900/50">
                          Clay Oven
                        </span>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-white">2x Fresh Lime Soda</span>
                        <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-900/50">
                          Beverage
                        </span>
                      </div>
                    </div>

                    {/* KDS Bump Action Button */}
                    {currentStep === 'KITCHEN_PREP' ? (
                      <button
                        onClick={() => {
                          setCurrentStep('KITCHEN_READY');
                          setIsAutoPlaying(false);
                        }}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>BUMP: MARK DISH READY</span>
                      </button>
                    ) : currentStep === 'KITCHEN_READY' || currentStep === 'POS_SETTLE' ? (
                      <div className="w-full py-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5 border border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Dish Ready (Waiter Phone Vibrating)</span>
                      </div>
                    ) : (
                      <div className="w-full py-2 rounded-lg bg-slate-900 text-slate-500 text-center font-medium text-[11px] border border-slate-800">
                        Awaiting Waiter Order Dispatch...
                      </div>
                    )}
                  </div>

                  {/* Secondary Queued Ticket */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2.5 opacity-60">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-slate-300 font-bold">T-02 • KOT #107</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Served</span>
                    </div>
                    <div className="text-[10.5px] text-slate-500 mt-1">1x Paneer Tikka, 2x Butter Roti</div>
                  </div>
                </div>

                {/* Bottom KDS System Bar */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
                  <span>Chime Buzzer: Armed</span>
                  <span className="text-amber-400 font-semibold">Station 1 of 3</span>
                </div>
              </div>
            </div>

            {/* Device Label */}
            <div className="text-center mt-3">
              <span className="font-bold text-sm text-slate-900 block flex items-center justify-center gap-1.5">
                <Tv className="w-4 h-4 text-amber-600" />
                <span>2. Kitchen Display System (KDS)</span>
              </span>
              <span className="text-xs text-amber-600 font-medium">Wall-Mounted Touch Screen • Paperless Cook Line</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* DEVICE 3: DESKTOP PC MONITOR (With Monitor Stand & Neck)      */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Monitor Screen Frame */}
            <div className="w-full rounded-2xl bg-slate-950 border-[5px] border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-2.5 relative overflow-hidden transition-all hover:scale-[1.01] hover:border-indigo-500/70">
              {/* Windows 11 Chrome Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-[9.5px] font-bold text-slate-300 ml-1.5 font-mono">
                    Signatures Restaurant POS (Windows 11)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9.5px] text-emerald-400 font-mono">
                  <Wifi className="w-3 h-3" />
                  <span>Port 18590</span>
                </div>
              </div>

              {/* POS Floor Grid & Bill Calculator */}
              <div className="min-h-[380px] flex flex-col justify-between">
                <div>
                  {/* Floor Plan Grid */}
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-0.5">
                    Live Table Status Grid
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-01</div>
                      <div className="text-[8.5px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-02</div>
                      <div className="text-[8.5px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-03</div>
                      <div className="text-[8.5px] text-slate-400">Available</div>
                    </div>

                    {/* Active T-04 */}
                    <div
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        currentStep === 'IDLE'
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                          : currentStep === 'KITCHEN_READY'
                          ? 'bg-indigo-950/40 border-indigo-400 text-indigo-300'
                          : 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 text-white'
                      }`}
                    >
                      <div className="text-[10px] font-black">T-04</div>
                      <div className="text-[8.5px] font-bold text-amber-300">
                        {currentStep === 'IDLE'
                          ? 'Available'
                          : currentStep === 'KITCHEN_READY'
                          ? 'Food Ready'
                          : 'KOT Active (₹1,218)'}
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-05</div>
                      <div className="text-[8.5px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-06</div>
                      <div className="text-[8.5px] text-slate-400">Available</div>
                    </div>
                  </div>

                  {/* Active Bill Calculation Drawer */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-xs">
                    <div className="flex justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                      <span>Table T-04 Bill Summary</span>
                      <span className="font-mono text-sky-400 font-bold">Waiter: Rahul</span>
                    </div>

                    <div className="space-y-1 py-1.5 text-[10.5px]">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Subtotal:</span>
                        <span className="font-mono text-white">₹1,160.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">GST (5% SGST + CGST):</span>
                        <span className="font-mono text-white">₹58.00</span>
                      </div>
                      <div className="flex justify-between font-bold pt-1 border-t border-slate-800 text-white">
                        <span>Grand Total:</span>
                        <span className="font-mono text-emerald-400">₹1,218.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* POS Cashier Action Button */}
                <div className="pt-2">
                  {currentStep === 'POS_SETTLE' ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 animate-pulse">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Invoice Printed &bull; ₹1,218 Paid</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentStep('POS_SETTLE');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Settle Bill &amp; Print GST Invoice</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Monitor Bottom Chin with Logo & Power LED */}
              <div className="mt-2 pt-1.5 border-t border-slate-800/90 flex items-center justify-between px-2">
                <span className="text-[8px] font-mono font-extrabold text-slate-500 tracking-wider">
                  SIGNATURES POS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
              </div>
            </div>

            {/* REALISTIC MONITOR NECK STAND (Vertical Stand Column) */}
            <div className="w-12 h-6 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-sm mx-auto border-x border-slate-300" />

            {/* REALISTIC MONITOR DESKTOP BASE (Flat Desk Plate) */}
            <div className="w-36 h-2.5 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-full mx-auto shadow-md border-t border-slate-200" />

            {/* Device Label */}
            <div className="text-center mt-2.5">
              <span className="font-bold text-sm text-slate-900 block flex items-center justify-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>3. Cashier POS Counter</span>
              </span>
              <span className="text-xs text-emerald-600 font-medium">Windows 11 PC Monitor • Master SQLite Engine</span>
            </div>
          </div>

        </div>
      </div>

      {/* Network Health & Telemetry Strip */}
      <div className="relative z-10 px-6 sm:px-10 py-3 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span><b>Zero-Trust Security:</b> HMAC-SHA256 Sessions + DPAPI Storage</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-sky-600" />
          <span><b>LAN Latency:</b> &lt; 18ms (Direct Local Router Packets)</span>
        </div>

        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4 text-amber-600" />
          <span><b>Internet Requirement:</b> 0% (Operates 100% Offline)</span>
        </div>
      </div>
    </div>
  );
};
