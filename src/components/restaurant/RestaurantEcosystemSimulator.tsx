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
  Printer,
  Receipt,
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
    }, 3200);

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
    <div className="w-full relative rounded-3xl bg-slate-950 border border-slate-800/80 shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden text-slate-100">
      {/* Background Studio Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.18),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Header & Simulation Controller */}
      <div className="relative z-10 px-6 sm:px-10 pt-8 pb-6 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              LIVE 3-DEVICE LOCAL LAN SYNC SIMULATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Watch Orders Flow Across PC, Mobile &amp; Kitchen
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time mutual zero-trust sync with zero cloud latency and zero internet dependency.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isAutoPlaying
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-xs'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isAutoPlaying ? 'fill-sky-400 text-sky-400' : ''}`} />
            <span>{isAutoPlaying ? 'Auto-Cycle Active' : 'Resume Auto-Play'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentStep('IDLE');
              setIsAutoPlaying(false);
            }}
            className="p-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="relative z-10 bg-slate-900/70 border-b border-slate-800/60 px-6 sm:px-10 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
          <div
            onClick={() => {
              setCurrentStep('WAITER_ORDER');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'WAITER_ORDER' || currentStep === 'LAN_DISPATCH'
                ? 'text-sky-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Waiter Punches KOT</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('KITCHEN_PREP');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'KITCHEN_PREP'
                ? 'text-amber-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Kitchen Display Alerts</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('KITCHEN_READY');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'KITCHEN_READY'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Chef Marks Ready</span>
          </div>

          <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:block" />

          <div
            onClick={() => {
              setCurrentStep('POS_SETTLE');
              setIsAutoPlaying(false);
            }}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              currentStep === 'POS_SETTLE'
                ? 'text-purple-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-[10px]">
              4
            </span>
            <span>PC Billing &amp; Settle</span>
          </div>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${getStepProgress()}%` }}
          />
        </div>
      </div>

      {/* STAGE: 3 MOCKUP DEVICES SIDE-BY-SIDE */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* DEVICE 1: MOBILE WAITER TERMINAL (Cols 1-4) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full max-w-[320px] rounded-[38px] bg-slate-900 border-4 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 relative overflow-hidden transition-all hover:border-sky-500/50">
              {/* Phone Speaker & Dynamic Island */}
              <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800 inline-block mr-2" />
                <span className="w-10 h-1 bg-slate-800 rounded-full inline-block" />
              </div>

              {/* Mobile App Screen Frame */}
              <div className="rounded-[28px] bg-slate-950 border border-slate-800 p-3.5 text-xs text-slate-200 min-h-[460px] flex flex-col justify-between">
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
                  <div className="bg-sky-500/10 border border-sky-400/30 rounded-xl p-2.5 mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-sky-400 uppercase font-bold">
                        ACTIVE DINE-IN TABLE
                      </div>
                      <div className="text-sm font-black text-white flex items-center gap-1.5">
                        <span>Table T-04</span>
                        <span className="text-[10px] font-medium text-slate-400">(4 Guests)</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 font-bold text-[10px]">
                      Dine In
                    </span>
                  </div>

                  {/* Menu / Punched Items List */}
                  <div className="space-y-2 mb-3">
                    <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                      Selected Dishes (KOT #108)
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">2x Butter Chicken</div>
                        <div className="text-[10px] text-slate-400">Main Course • Non-Veg</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹760</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">4x Garlic Naan</div>
                        <div className="text-[10px] text-slate-400">Tandoor Breads • Veg</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹240</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">2x Fresh Lime Soda</div>
                        <div className="text-[10px] text-slate-400">Beverages • Sweet &amp; Salt</div>
                      </div>
                      <span className="font-mono font-bold text-slate-300">₹160</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Order Button & Status */}
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
                  ) : currentStep === 'KITCHEN_PREP' || currentStep === 'KITCHEN_READY' ? (
                    <div className="w-full py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>KOT Sent • Cooking in Kitchen</span>
                    </div>
                  ) : currentStep === 'POS_SETTLE' ? (
                    <div className="w-full py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-center font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dishes Ready • At Cashier</span>
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

              {/* Bottom Phone Indicator */}
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
            </div>

            <div className="text-center mt-3">
              <span className="font-bold text-sm text-white block">1. Waiter Mobile Terminal</span>
              <span className="text-xs text-sky-400 font-mono">Android App • Zero Outbox Loss</span>
            </div>
          </div>

          {/* DEVICE 2: KITCHEN DISPLAY SYSTEM (KDS) (Cols 5-8) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Wall Mounted KDS Screen Frame */}
            <div className="w-full rounded-2xl bg-slate-900 border-4 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 relative overflow-hidden transition-all hover:border-amber-500/50">
              {/* Top Industrial Mounting Bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] font-mono">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white uppercase">KITCHEN DISPLAY (KDS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    Station: Hot Kitchen
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* KDS Active Tickets Grid */}
              <div className="space-y-2.5 min-h-[380px]">
                {/* Active Ticket Card */}
                <div
                  className={`rounded-xl border p-3 transition-all ${
                    currentStep === 'KITCHEN_PREP'
                      ? 'bg-amber-950/30 border-amber-400 shadow-md shadow-amber-500/10'
                      : currentStep === 'KITCHEN_READY' || currentStep === 'POS_SETTLE'
                      ? 'bg-emerald-950/20 border-emerald-400/60'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold font-mono text-[11px]">
                        T-04
                      </span>
                      <span className="font-bold text-white text-xs">Ticket #KOT-108</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 font-bold">02:{prepSeconds}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 mb-3 border-y border-slate-800/80 py-2">
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-white">2x Butter Chicken</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Hot Curry
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-white">4x Garlic Naan</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Clay Oven
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-medium">
                      <span className="text-white">2x Fresh Lime Soda</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        Beverage
                      </span>
                    </div>
                  </div>

                  {/* KDS Chef Action Button */}
                  {currentStep === 'KITCHEN_PREP' ? (
                    <button
                      onClick={() => {
                        setCurrentStep('KITCHEN_READY');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:brightness-110"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Ready for Pickup</span>
                    </button>
                  ) : currentStep === 'KITCHEN_READY' || currentStep === 'POS_SETTLE' ? (
                    <div className="w-full py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-center font-bold text-[11px] flex items-center justify-center gap-1 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ready to Serve (Notified Waiter)</span>
                    </div>
                  ) : (
                    <div className="w-full py-1.5 rounded-lg bg-slate-900 text-slate-500 text-center font-medium text-[11px]">
                      Awaiting Waiter Dispatch...
                    </div>
                  )}
                </div>

                {/* Passive Second Ticket in Kitchen Queue */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 opacity-60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-slate-300 font-bold">T-02 • KOT #107</span>
                    <span className="text-[10px] text-emerald-400">Served</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">1x Paneer Tikka, 2x Roti</div>
                </div>
              </div>

              {/* Bottom KDS Bar */}
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Thermal Printer: Online</span>
                <span className="text-amber-400">Auto-Chime: Active</span>
              </div>
            </div>

            <div className="text-center mt-3">
              <span className="font-bold text-sm text-white block">2. Kitchen Display (KDS)</span>
              <span className="text-xs text-amber-400 font-mono">Real-Time Kitchen Screen &amp; Printer</span>
            </div>
          </div>

          {/* DEVICE 3: DESKTOP POS COUNTER PC (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            {/* Desktop Monitor Frame */}
            <div className="w-full rounded-2xl bg-slate-900 border-4 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 relative overflow-hidden transition-all hover:border-purple-500/50">
              {/* Windows Window Chrome Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-300 ml-2 font-mono">
                    Signatures Restaurant POS (Windows)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <Wifi className="w-3 h-3" />
                  <span>Port 18590</span>
                </div>
              </div>

              {/* POS Floor Grid & Bill Calculator */}
              <div className="min-h-[380px] flex flex-col justify-between">
                <div>
                  {/* Mini Floor Plan */}
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Live Table Status Grid
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-01</div>
                      <div className="text-[9px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-02</div>
                      <div className="text-[9px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-03</div>
                      <div className="text-[9px] text-slate-400">Available</div>
                    </div>
                    {/* Active T-04 */}
                    <div
                      className={`p-1.5 rounded-lg border text-center transition-all ${
                        currentStep === 'IDLE'
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 text-white'
                      }`}
                    >
                      <div className="text-[10px] font-black">T-04</div>
                      <div className="text-[9px] font-bold text-amber-300">
                        {currentStep === 'IDLE' ? 'Available' : 'Occupied (₹1,218)'}
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-05</div>
                      <div className="text-[9px] text-slate-400">Available</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                      <div className="text-[10px] font-bold text-emerald-400">T-06</div>
                      <div className="text-[9px] text-slate-400">Available</div>
                    </div>
                  </div>

                  {/* Active Bill Calculation Drawer */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs">
                    <div className="flex justify-between text-slate-400 text-[10.5px] pb-1 border-b border-slate-800">
                      <span>Table T-04 Bill Summary</span>
                      <span className="font-mono text-sky-400 font-bold">Waiter: Rahul</span>
                    </div>

                    <div className="space-y-1 py-1.5 text-[11px]">
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
                    <button
                      onClick={() => {
                        setCurrentStep('IDLE');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/25 animate-pulse"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Settle &amp; Print Bill (F8)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentStep('POS_SETTLE');
                        setIsAutoPlaying(false);
                      }}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cashier Settle Terminal</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <span className="font-bold text-sm text-white block">3. Cashier POS Counter</span>
              <span className="text-xs text-purple-400 font-mono">Windows PC • Master SQLite Engine</span>
            </div>
          </div>

        </div>

        {/* Real-time Network Telemetry Bar */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Trust Security: HMAC-SHA256 Sessions + DPAPI Vault</span>
          </div>

          <div className="flex items-center gap-2 text-sky-300">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>LAN Latency: &lt; 18ms (Zero Cloud Server Lag)</span>
          </div>

          <div className="flex items-center gap-2 text-amber-300">
            <Wifi className="w-4 h-4 text-amber-400" />
            <span>Internet Requirement: 0% (Operates on Local Wi-Fi Router)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
