import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Play, 
  Pause,
  Volume2, 
  VolumeX,
  Dumbbell, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  Apple, 
  Flame, 
  Calendar, 
  Lock, 
  Database, 
  Maximize2,
  TrendingUp,
  Share2,
  Check,
  Zap,
  PhoneCall,
  Scale
} from 'lucide-react';
import { OnyxGymSplash } from '../components/cinema/OnyxGymSplash';

interface OnyxGymPageProps {
  onNavigate: (path: string) => void;
}

export const OnyxGymPage: React.FC<OnyxGymPageProps> = ({ onNavigate }) => {
  // Splash screen opens on initial page load as requested
  const [showSplash, setShowSplash] = useState(true);
  const [softwareDropdownOpen, setSoftwareDropdownOpen] = useState(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null);

  // Video Player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play video on initial page load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback if browser requires muted state
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Interactive Live Diet Engine Simulator State
  const [calcGender, setCalcGender] = useState<'male' | 'female'>('male');
  const [calcAge, setCalcAge] = useState<number>(25);
  const [calcWeight, setCalcWeight] = useState<number>(75);
  const [calcHeight, setCalcHeight] = useState<number>(175);
  const [calcActivity, setCalcActivity] = useState<number>(1.55);
  const [calcGoal, setCalcGoal] = useState<'fat_loss' | 'maintenance' | 'muscle_gain'>('muscle_gain');
  const [calcDietType, setCalcDietType] = useState<'veg' | 'non_veg'>('veg');

  // Algorithmic Diet Calculations (Matches Kotlin DietBuilderScreen)
  const dietResults = useMemo(() => {
    // Mifflin-St Jeor Formula
    const bmr = calcGender === 'male'
      ? 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge + 5
      : 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge - 161;

    const tdee = Math.round(bmr * calcActivity);

    let targetCalories = tdee;
    if (calcGoal === 'fat_loss') targetCalories = Math.round(tdee - 450);
    if (calcGoal === 'muscle_gain') targetCalories = Math.round(tdee + 350);

    // Macros distribution
    const proteinGrams = Math.round(calcWeight * 2.1); // ~2.1g per kg
    const fatGrams = Math.round((targetCalories * 0.24) / 9); // ~24% cals
    const carbGrams = Math.max(50, Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4));

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      fatGrams,
      carbGrams,
    };
  }, [calcGender, calcAge, calcWeight, calcHeight, calcActivity, calcGoal]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const screenshots = [
    {
      src: '/assets/onyx_gym/page_1.png',
      title: 'Silk Waves Splash & PS5 Identity',
      desc: 'Sine-wave silk canvas, live CPU telemetry, and 4-digit PIN authentication security.',
      tag: 'Security & Splash',
    },
    {
      src: '/assets/onyx_gym/page_2.png',
      title: 'Executive Financial & Member Dashboard',
      desc: 'Week calendar strip, total collections, expiring-soon alerts, and rapid member search.',
      tag: 'Analytics Hub',
    },
    {
      src: '/assets/onyx_gym/page_3.png',
      title: 'Smart Registration & Instant Billing',
      desc: 'Member profile, BMI indicator, membership tier selection, and instant WhatsApp invoice dispatch.',
      tag: 'POS Billing',
    },
    {
      src: '/assets/onyx_gym/page_4.png',
      title: 'Subscription Engine & Renewal Plans',
      desc: '1, 3, 6 & 12 Month recurring packages, discount controls, and automated payment receipts.',
      tag: 'Membership Engine',
    },
    {
      src: '/assets/onyx_gym/page_5.png',
      title: 'Algorithmic Macro & Calorie Diet Builder',
      desc: 'Vegetarian & Non-Veg meal planner with BMR/TDEE calculation and 1-click WhatsApp delivery.',
      tag: 'AI Diet Engine',
    },
    {
      src: '/assets/onyx_gym/page_6.png',
      title: 'Member Directory & Status Segmentation',
      desc: 'Real-time filtering by Active, Expiring, and Expired memberships with instant renewal actions.',
      tag: 'Member CRM',
    },
    {
      src: '/assets/onyx_gym/page_7.png',
      title: 'Body Measurement & Progression Charts',
      desc: 'Chest, Arms, Waist, Thighs, and Weight progression timeline with transformation tracking.',
      tag: 'Physique Analytics',
    },
    {
      src: '/assets/onyx_gym/page_8.png',
      title: 'Gym Profile, Admin PIN & SQLite Vault',
      desc: 'Zero-cloud air-gapped local database backup/restore with custom tax, currency, and pricing.',
      tag: 'Database & Settings',
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 relative selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* Fullscreen Seamless Athletic Splash on Initial Page Load */}
      <OnyxGymSplash
        isOpen={showSplash}
        onComplete={() => setShowSplash(false)}
        onCancel={() => setShowSplash(false)}
      />

      {/* ========================================================= */}
      {/* GLOBAL CINEMATIC ATHLETIC BACKGROUND (PROUDLY VISIBLE)    */}
      {/* ========================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#06080D]">
        {/* User's Uploaded Gym Hero Photo with Clear Visibility */}
        <div className="absolute inset-0 will-change-transform">
          <img
            src="/assets/onyx_gym/hero_bg.jpg"
            alt="ONYX Gym Elite Training Facility"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.12]"
          />
        </div>
        
        {/* Subtle Dark Vignette & Linear Gradients for Crystal Clear Text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080D]/85 via-black/40 to-[#06080D]/95" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* ========================================================= */}
      {/* 1. TOP STICKY NAVIGATION BAR (CLEAN, NO REPLAY BUTTON)    */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080B12]/92 backdrop-blur-2xl border-b border-amber-500/20 py-3 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/25 via-amber-600/20 to-black border border-amber-500/40 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.25)] group-hover:scale-105 group-hover:border-amber-400 transition-all">
              <Dumbbell className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">
                  ONYX <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">GYM</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  v1.0 PRO
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                FITNESS &amp; ATHLETIC CLUB OS
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => scrollToSection('features')} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer">
              Capabilities
            </button>
            <button onClick={() => scrollToSection('video-demo')} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer">
              App Video
            </button>
            <button onClick={() => scrollToSection('diet-calculator')} className="px-3 py-1.5 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 transition-colors cursor-pointer flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Diet Engine</span>
            </button>
            <button onClick={() => scrollToSection('screenshots')} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer">
              Screens
            </button>
            <button onClick={() => scrollToSection('pricing')} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer">
              License Pricing
            </button>
          </nav>

          {/* Right Action: Software Ecosystem Dropdown + Back to ERP */}
          <div className="flex items-center gap-2.5">
            {/* Software Ecosystem Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSoftwareDropdownOpen(!softwareDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121622] hover:bg-[#1A2030] border border-amber-500/30 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                <span>⚡ STOMS Apps</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
              </button>

              {softwareDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[0.5px]" 
                    onClick={() => setSoftwareDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0E121B] border border-amber-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3 z-50 animate-fade-in divide-y divide-slate-800">
                    <div className="px-2 pb-2">
                      <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase">
                        STOMS Software Ecosystem
                      </span>
                    </div>
                    <div className="space-y-1.5 pt-2">
                      <div 
                        onClick={() => { onNavigate('/'); setSoftwareDropdownOpen(false); }} 
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🧾</span>
                          <div>
                            <div className="text-xs font-bold text-white">1. Signatures ERP</div>
                            <div className="text-[10px] text-slate-400">Desktop &amp; Mill Floor Billing</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">Live</span>
                      </div>

                      <div 
                        onClick={() => { onNavigate('/8pm'); setSoftwareDropdownOpen(false); }} 
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🎱</span>
                          <div>
                            <div className="text-xs font-bold text-emerald-300">2. 8 PM Pool Software</div>
                            <div className="text-[10px] text-slate-400">Precision Snooker Clocks</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">v2.3</span>
                      </div>

                      <div 
                        className="flex items-center justify-between p-2 rounded-xl bg-amber-500/15 border border-amber-400/40 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🏋️‍♂️</span>
                          <div>
                            <div className="text-xs font-bold text-amber-300">3. ONYX Gym App</div>
                            <div className="text-[10px] text-slate-300">Diet Engine &amp; Biometric OS</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 font-extrabold">Current</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Back to ERP Button */}
            <button
              onClick={() => onNavigate('/')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              <span>Back to Home</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION (STANDARD LUXURY ATHLETIC AESTHETIC)      */}
      {/* ========================================================= */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Athletic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Dumbbell className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Kotlin Jetpack Compose • Air-Gapped Room SQLite • WhatsApp Invoicing
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08]">
            Built for <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Powerhouse</span> Gyms &amp; Fitness Clubs
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            The high-performance Android operating system for modern gym owners. Algorithmic macro diet generation, recurring memberships, biometric check-in, and instant WhatsApp PDF invoices.
          </p>

          {/* ========================================================= */}
          {/* USER'S EXACT MOTIVATION QUOTE CARD WITH FLOATING DUMBBELLS */}
          {/* ========================================================= */}
          <div className="relative max-w-3xl mx-auto my-8 p-8 rounded-3xl bg-[#0A0E18]/85 border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)] overflow-hidden">
            
            {/* Left Floating Dumbbell */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-35 hidden md:block animate-bounce duration-[3500ms]">
              <Dumbbell className="w-14 h-14 text-amber-400 rotate-45" />
            </div>

            {/* Right Floating Dumbbell */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-35 hidden md:block animate-bounce duration-[4000ms]">
              <Dumbbell className="w-14 h-14 text-amber-500 -rotate-45" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-widest">
                <Dumbbell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>The Athlete's Creed</span>
              </div>

              {/* Exact user requested quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black italic tracking-tight text-amber-200 drop-shadow-md">
                “Motivation doesn't mean results, it means your answer.”
              </blockquote>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-extrabold text-amber-400/90 tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-amber-400/50" />
                <span>Discipline Today • A Stronger Tomorrow</span>
                <span className="w-8 h-[1px] bg-amber-400/50" />
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => scrollToSection('video-demo')}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Watch 60FPS Video Demo</span>
            </button>

            <button
              onClick={() => scrollToSection('diet-calculator')}
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#121622] hover:bg-[#1A2030] border border-amber-500/40 text-amber-300 font-extrabold text-sm uppercase tracking-wider transition-all cursor-pointer hover:border-amber-400"
            >
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Test Live Diet Simulator</span>
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Get Android APK (₹499/mo)</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Telemetry Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-8">
            <div className="p-3.5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 text-center">
              <div className="font-mono font-black text-lg text-amber-400">0 ms</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Local SQLite Latency</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 text-center">
              <div className="font-mono font-black text-lg text-emerald-400">100%</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Air-Gapped Privacy</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 text-center">
              <div className="font-mono font-black text-lg text-amber-300">BMR+TDEE</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5">Algorithmic Diet Engine</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 text-center">
              <div className="font-mono font-black text-lg text-sky-400">1-Tap</div>
              <div className="text-[11px] font-semibold text-slate-400 mt-0.5">WhatsApp Bill Delivery</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE VIDEO DEMO (CLEAN ROUND NOTCH & AUTOPLAY)  */}
      {/* ========================================================= */}
      <section id="video-demo" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Play className="w-3.5 h-3.5 fill-amber-400" />
            <span>Interactive Mobile Demo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Experience <span className="text-amber-400">ONYX GYM</span> In Action
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Captured directly from Android hardware. High-density 60FPS fluid navigation, dynamic calorie computation, and instantaneous receipt generation.
          </p>
        </div>

        {/* Video Mockup Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Clean Android Flagship Phone Frame (Gol Notch, Video Starts Below Status Bar) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] sm:w-[325px] rounded-[44px] bg-[#0E121A] p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.2)] border-2 border-slate-700/80">
              
              {/* Inner Titanium Trim */}
              <div className="relative w-full rounded-[36px] overflow-hidden bg-black flex flex-col border border-white/10 shadow-inner">
                
                {/* Modern Android Status Bar with Centered Circular (GOL) Punch-Hole Camera */}
                <div className="h-7 w-full bg-black flex items-center justify-between px-5 text-[10px] font-mono text-slate-400 select-none shrink-0 z-20">
                  <span className="font-bold text-slate-300">09:41</span>
                  
                  {/* Round (Gol) Camera Punch Hole */}
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700/80 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#051525]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                    <span>5G</span>
                    <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.2 flex items-center">
                      <div className="h-full w-3/4 bg-amber-400 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Video Container Directly Below the Status Bar (No Overlap with Video Title!) */}
                <div className="relative w-full aspect-[9/18.5] bg-black overflow-hidden flex-1">
                  <video
                    ref={videoRef}
                    src="/assets/onyx_gym/gym_demo.mp4"
                    poster="/assets/onyx_gym/video_frame_15s.jpg"
                    autoPlay
                    playsInline
                    loop
                    muted={isMuted}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Play Overlay if paused */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer group"
                    >
                      <div className="w-14 h-14 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.7)] group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-black translate-x-0.5" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 mt-2.5 drop-shadow">
                        Tap to Play 60FPS Video
                      </span>
                    </div>
                  )}

                  {/* Floating Bottom Video Controls Bar */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white z-20">
                    <button 
                      onClick={togglePlay} 
                      className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <span className="font-mono text-[10px] text-amber-400 font-extrabold tracking-wider">
                      60 FPS ANDROID
                    </span>

                    <button 
                      onClick={toggleMute} 
                      className="p-1 hover:text-amber-400 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right: Key Video Walkthrough Features */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 hover:border-amber-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Instant Member Registration &amp; BMI Auto-Calc</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Onboard new lifters in under 30 seconds. Enter weight and height to automatically evaluate Body Mass Index and match suitable training intensity.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 hover:border-amber-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Algorithmic Calorie &amp; Macro Generator</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Eliminates manual trainer diet charts. Calculates exact BMR, adjusts for training frequency and body composition goal (Fat Loss vs Muscle Hypertrophy), and splits macros into grams.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 hover:border-amber-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Instant WhatsApp Invoice &amp; Diet Dispatch</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Generates clean, branded WhatsApp payment receipts and meal breakdowns with one tap. Zero paper wastage, zero cloud API fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0B0E17]/85 border border-white/10 hover:border-amber-500/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Air-Gapped Sovereign Security</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Protected by an encrypted 4-digit Master PIN. All member records, contact numbers, and billing data remain strictly on your Android tablet or phone.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE LIVE DIET ENGINE SIMULATOR                */}
      {/* ========================================================= */}
      <section id="diet-calculator" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#090D16]/90 border border-amber-500/30 p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Embedded App Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Test The <span className="text-amber-400">ONYX Macro Engine</span> Right Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              This interactive widget runs the exact algorithmic formula programmed into the ONYX GYM Android Kotlin app.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4 bg-black/50 p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Athlete Biometrics</span>
              </h3>

              {/* Gender Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalcGender('male')}
                  className={`py-2.5 rounded-xl font-bold text-xs uppercase transition-all cursor-pointer ${
                    calcGender === 'male'
                      ? 'bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setCalcGender('female')}
                  className={`py-2.5 rounded-xl font-bold text-xs uppercase transition-all cursor-pointer ${
                    calcGender === 'female'
                      ? 'bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  Female
                </button>
              </div>

              {/* Weight & Height Sliders */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Current Weight</span>
                    <span className="font-mono text-amber-400 font-bold">{calcWeight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="140"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Height</span>
                    <span className="font-mono text-amber-400 font-bold">{calcHeight} cm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Age</span>
                    <span className="font-mono text-amber-400 font-bold">{calcAge} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    value={calcAge}
                    onChange={(e) => setCalcAge(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Weekly Activity Multiplier</span>
                    <span className="font-mono text-amber-400 font-bold">{calcActivity}x</span>
                  </div>
                  <select
                    value={calcActivity}
                    onChange={(e) => setCalcActivity(Number(e.target.value))}
                    className="w-full bg-[#121622] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value={1.2}>Sedentary (Desk Job, Zero Workouts) — 1.2x</option>
                    <option value={1.375}>Light Activity (1-3 Gym Days / wk) — 1.375x</option>
                    <option value={1.55}>Moderate Intensity (3-5 Hard Sessions / wk) — 1.55x</option>
                    <option value={1.725}>Heavy Training (6-7 Heavy Lifting Days / wk) — 1.725x</option>
                    <option value={1.9}>Elite Athlete / Professional Competitive — 1.9x</option>
                  </select>
                </div>
              </div>

              {/* Fitness Goal */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-300 block mb-2">Physique Target</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCalcGoal('fat_loss')}
                    className={`py-2 px-1 text-center rounded-lg text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                      calcGoal === 'fat_loss'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Fat Loss (-450 kcal)
                  </button>
                  <button
                    onClick={() => setCalcGoal('maintenance')}
                    className={`py-2 px-1 text-center rounded-lg text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                      calcGoal === 'maintenance'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Maintenance
                  </button>
                  <button
                    onClick={() => setCalcGoal('muscle_gain')}
                    className={`py-2 px-1 text-center rounded-lg text-[11px] font-extrabold uppercase transition-all cursor-pointer ${
                      calcGoal === 'muscle_gain'
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    Hypertrophy (+350 kcal)
                  </button>
                </div>
              </div>

              {/* Diet Preference */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-300 block mb-2">Dietary Lifestyle</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalcDietType('veg')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      calcDietType === 'veg'
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                        : 'bg-white/5 text-slate-400 border border-transparent'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Pure Vegetarian</span>
                  </button>
                  <button
                    onClick={() => setCalcDietType('non_veg')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      calcDietType === 'non_veg'
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-300'
                        : 'bg-white/5 text-slate-400 border border-transparent'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Non-Vegetarian</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Live Generated Output Card */}
            <div className="lg:col-span-6 space-y-5 bg-[#090D16] p-6 sm:p-8 rounded-2xl border border-amber-500/30">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span className="font-extrabold text-sm text-white uppercase tracking-wider">
                    Calculated Nutrition Protocol
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Target: {dietResults.targetCalories} kcal / day
                </span>
              </div>

              {/* BMR & TDEE stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Basal Metabolic Rate (BMR)</span>
                  <span className="text-xl font-black font-mono text-white mt-1 block">{dietResults.bmr} kcal</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Total Daily Energy (TDEE)</span>
                  <span className="text-xl font-black font-mono text-amber-400 mt-1 block">{dietResults.tdee} kcal</span>
                </div>
              </div>

              {/* Macronutrient Split Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Prescribed Macronutrient Targets
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-black/50 border border-amber-500/30 text-center">
                    <span className="text-[11px] text-amber-400 font-bold block">Protein</span>
                    <span className="text-2xl font-black font-mono text-white mt-1 block">{dietResults.proteinGrams}g</span>
                    <span className="text-[10px] text-slate-400">{Math.round((dietResults.proteinGrams * 4 / dietResults.targetCalories) * 100)}% cals</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                    <span className="text-[11px] text-slate-300 font-bold block">Carbohydrates</span>
                    <span className="text-2xl font-black font-mono text-white mt-1 block">{dietResults.carbGrams}g</span>
                    <span className="text-[10px] text-slate-400">{Math.round((dietResults.carbGrams * 4 / dietResults.targetCalories) * 100)}% cals</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                    <span className="text-[11px] text-slate-300 font-bold block">Healthy Fats</span>
                    <span className="text-2xl font-black font-mono text-white mt-1 block">{dietResults.fatGrams}g</span>
                    <span className="text-[10px] text-slate-400">{Math.round((dietResults.fatGrams * 9 / dietResults.targetCalories) * 100)}% cals</span>
                  </div>
                </div>
              </div>

              {/* Sample Algorithmic Meals Output */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sample {calcDietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Day Schedule:</span>
                </span>

                {calcDietType === 'veg' ? (
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-white">Breakfast:</strong> Rolled oats with almond milk, whey isolate, and chia seeds</li>
                    <li><strong className="text-white">Mid-Day:</strong> Sprouted green moong salad with roasted peanuts</li>
                    <li><strong className="text-white">Lunch:</strong> 200g Low-fat Paneer bhurji, brown rice, and curd</li>
                    <li><strong className="text-white">Pre-Workout:</strong> 1 Banana with black coffee or pre-workout amino</li>
                    <li><strong className="text-white">Dinner:</strong> High-protein Soya chunks pulao with cucumber salad</li>
                  </ul>
                ) : (
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><strong className="text-white">Breakfast:</strong> 5 Whole egg whites + 2 whole eggs, brown bread &amp; black coffee</li>
                    <li><strong className="text-white">Mid-Day:</strong> Greek yoghurt with scoop of whey &amp; crushed almonds</li>
                    <li><strong className="text-white">Lunch:</strong> 200g Grilled chicken breast with jasmine rice &amp; steamed broccoli</li>
                    <li><strong className="text-white">Pre-Workout:</strong> Rice cakes with organic peanut butter &amp; banana</li>
                    <li><strong className="text-white">Dinner:</strong> 180g Pan-seared fish or chicken breast with sautéed veggies</li>
                  </ul>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`In ONYX GYM App, this exact diet plan is dispatched directly to the member's WhatsApp (+91) with 1 tap as an encrypted PDF!`)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer transition-all"
                >
                  <Share2 className="w-4 h-4 text-black" />
                  <span>Dispatch WhatsApp Diet PDF (App Feature)</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. APP SCREENSHOTS GALLERY (8 HIGH-RES PAGES)             */}
      {/* ========================================================= */}
      <section id="screenshots" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>High-Density Jetpack Compose UI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Complete <span className="text-amber-400">Application Architecture</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Click on any screenshot to inspect the production Android layout and detailed workflow.
          </p>
        </div>

        {/* 8 Screenshots Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedScreenshotIndex(idx)}
              className="group relative rounded-2xl bg-[#0B0E17]/90 border border-white/10 hover:border-amber-400/60 p-2.5 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="aspect-[9/16] rounded-xl overflow-hidden bg-black relative">
                <img
                  src={s.src}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-bold text-amber-300">
                  {s.tag}
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="text-xs font-extrabold text-white block truncate">
                    {s.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedScreenshotIndex !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-fade-in"
            onClick={() => setSelectedScreenshotIndex(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] bg-[#0E131F] border border-amber-500/40 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedScreenshotIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/80 text-white hover:text-amber-400 border border-white/20 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="max-w-[280px] sm:max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/20">
                <img
                  src={screenshots[selectedScreenshotIndex].src}
                  alt={screenshots[selectedScreenshotIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 max-w-md">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  {screenshots[selectedScreenshotIndex].tag}
                </div>
                <h3 className="text-2xl font-black text-white">
                  {screenshots[selectedScreenshotIndex].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {screenshots[selectedScreenshotIndex].desc}
                </p>

                <div className="pt-4 border-t border-slate-800 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedScreenshotIndex(
                        (selectedScreenshotIndex - 1 + screenshots.length) % screenshots.length
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      setSelectedScreenshotIndex(
                        (selectedScreenshotIndex + 1) % screenshots.length
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-black text-black transition-colors cursor-pointer"
                  >
                    Next Screen →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 6. DETAILED FEATURE MATRIX                                */}
      {/* ========================================================= */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why ONYX GYM Outperforms Traditional Cloud SaaS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Sovereign Offline <span className="text-amber-400">vs</span> Fragile Cloud
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            Compare why elite fitness clubs in India choose ONYX GYM over slow, monthly-fee cloud platforms.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0B0E17]/90 shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/60 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6">Capability Matrix</th>
                <th className="py-4 px-6 text-amber-400 font-extrabold">ONYX GYM (STOMS)</th>
                <th className="py-4 px-6 text-slate-500">Generic Cloud SaaS Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Data Sovereign &amp; Offline Speed</span>
                </td>
                <td className="py-4 px-6 font-semibold text-emerald-400">
                  ✓ 100% Offline Room SQLite (0ms latency, zero internet required)
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Requires constant 4G/WiFi; stalls when connection drops
                </td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Apple className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Algorithmic Diet &amp; Macro Generator</span>
                </td>
                <td className="py-4 px-6 font-semibold text-emerald-400">
                  ✓ Built-in BMR/TDEE math with Veg &amp; Non-Veg schedule
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Absent or sold as expensive ₹2,000/mo third-party add-on
                </td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct WhatsApp Invoicing</span>
                </td>
                <td className="py-4 px-6 font-semibold text-emerald-400">
                  ✓ 1-Tap native WhatsApp dispatch; zero extra per-message fees
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Charges ₹0.50 per SMS / WhatsApp template message
                </td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Admin PIN Protection</span>
                </td>
                <td className="py-4 px-6 font-semibold text-emerald-400">
                  ✓ 4-Digit hardware master lock; trainers cannot see revenue
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Complex web permissions requiring email logins
                </td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Member Body Measurements</span>
                </td>
                <td className="py-4 px-6 font-semibold text-emerald-400">
                  ✓ Built-in timeline tracking for Chest, Arms, Waist, Weight
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Only basic contact phonebook with no physique progress logs
                </td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Pricing Structure</span>
                </td>
                <td className="py-4 px-6 font-semibold text-amber-300">
                  ✓ Flat ₹499/mo OR ₹4,999 One-Time Lifetime License
                </td>
                <td className="py-4 px-6 text-rose-400/80">
                  ✗ Endless monthly bills (₹1,500 – ₹5,000/mo forever)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. PRICING & LICENSE ACTIVATION SECTION                   */}
      {/* ========================================================= */}
      <section id="pricing" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Honest, Predictable Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Choose Your <span className="text-amber-400">Gym License</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            No surprise server fees. Full access to all modules from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Flex Monthly */}
          <div className="rounded-3xl bg-[#0B0E17]/90 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                Monthly Flex Plan
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">₹499</span>
                <span className="text-sm text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-300 mt-3">
                Ideal for newly opened gyms and fitness clubs testing digital operations.
              </p>

              <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                {[
                  'Unlimited Member Profiles & Renewals',
                  'Algorithmic Diet & Macro Planner (Veg/Non-Veg)',
                  'Direct WhatsApp Invoice & Meal Plan Dispatch',
                  '100% Offline Room SQLite Database',
                  'Encrypted 4-Digit Admin Security PIN',
                  'Export JSON Database Backups',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <a
                href="https://wa.me/919409055866?text=Hi%20STOMS,%20I%20want%20to%20activate%20ONYX%20GYM%20Monthly%20Plan%20(Rs%20499/mo)"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Activate Monthly (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Card 2: Sovereign Lifetime (Recommended) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#121622] via-[#0E121B] to-[#080B12] border-2 border-amber-500/60 p-8 flex flex-col justify-between shadow-[0_20px_60px_rgba(245,158,11,0.2)]">
            
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
              Most Popular • One-Time Buy
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block mb-2">
                Sovereign Lifetime License
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-amber-300">₹4,999</span>
                <span className="text-xs text-slate-400 font-semibold uppercase">One-Time Payment</span>
              </div>
              <p className="text-xs text-slate-200 mt-3">
                Pay once, own forever. Never pay a monthly subscription again.
              </p>

              <div className="space-y-3 mt-6 pt-6 border-t border-amber-500/20">
                {[
                  'Everything in Monthly Flex Plan',
                  'Perpetual Lifetime Offline License',
                  'Zero Monthly Fees Forever',
                  'Priority WhatsApp Hotline Support',
                  'Multi-Branch Expansion Discount (30% Off)',
                  'Complimentary Setup & Staff Onboarding',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-amber-500/20">
              <a
                href="https://wa.me/919409055866?text=Hi%20STOMS,%20I%20want%20to%20purchase%20ONYX%20GYM%20Lifetime%20License%20(Rs%204,999)"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
              >
                <Dumbbell className="w-4 h-4 fill-black" />
                <span>Claim Lifetime License Now</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. FOOTER                                                 */}
      {/* ========================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#04060A] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-wide block">
                ONYX GYM OS by S TOM'S Enterprises
              </span>
              <span className="text-[11px] text-slate-400">
                Discipline Today, A Stronger Tomorrow.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
            <button onClick={() => onNavigate('/')} className="hover:text-amber-400 transition-colors cursor-pointer">
              Signatures Light Bill ERP
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/8pm')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              8 PM Pool Software
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/pricing')} className="hover:text-white transition-colors cursor-pointer">
              ERP Pricing
            </button>
            <span>•</span>
            <a href="https://wa.me/919409055866" target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
              Support: +91 94090 55866
            </a>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            © 2026 S TOM’S Enterprises &amp; Signatures IT Groups.
          </div>

        </div>
      </footer>

    </div>
  );
};
