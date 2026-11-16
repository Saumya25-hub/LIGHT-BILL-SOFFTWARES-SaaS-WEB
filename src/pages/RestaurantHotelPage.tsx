import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  ChefHat,
  Wifi,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Receipt,
  UtensilsCrossed,
  Users,
  Layers,
  Radio,
  Check,
  X,
  Flame,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RestaurantEcosystemSimulator } from '../components/restaurant/RestaurantEcosystemSimulator';

export interface RestaurantHotelPageProps {
  onNavigate: (path: string) => void;
  onLaunchDemo?: () => void;
}

export const RestaurantHotelPage: React.FC<RestaurantHotelPageProps> = ({
  onNavigate,
  onLaunchDemo,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<number>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const workflowSteps = [
    {
      id: 0,
      title: '1. Waiter Punches at Table',
      device: 'Android Waiter Mobile App',
      icon: Smartphone,
      accent: 'sky',
      badge: 'Tableside Ordering',
      description:
        'The server stands beside the diner with any standard Android phone or tablet. They tap Table T-01, select starters, enter customized notes (e.g. "Less spicy, no onion"), and hit Send to Kitchen.',
      specs: [
        'Instant table floor map with real-time seat status',
        'Works with offline local outbox queue',
        'Direct waiter authorization via 6-digit zero-trust pairing',
      ],
    },
    {
      id: 1,
      title: '2. Zero-Latency LAN Dispatch',
      device: 'Local Zero-Trust Wi-Fi Hub',
      icon: Radio,
      accent: 'emerald',
      badge: 'Sub-20ms Transfer',
      description:
        'The kitchen order ticket (KOT) is signed with SHA-256 HMAC cryptographic tokens and transmitted across your restaurant router. No external internet, no cloud round-trips, and zero possibility of lost tickets.',
      specs: [
        'Transmits in under 18 milliseconds',
        'Immune to broadband internet outages',
        'Cryptographic replay protection prevents duplicate orders',
      ],
    },
    {
      id: 2,
      title: '3. Kitchen Display (KDS) Live Chime',
      device: 'Industrial Kitchen Screen / Tablet',
      icon: ChefHat,
      accent: 'amber',
      badge: 'Paperless Kitchen',
      description:
        'A loud audio alert rings in the kitchen as Table T-01 appears on the KDS display. Dishes are sorted by cook station with elapsed-time timers changing from green to amber as urgency rises.',
      specs: [
        'Replaces noisy, expensive thermal paper rolls',
        'One-touch "Dish Ready" bumper notification to waiter',
        'Supports separate bar, tandoor, and dessert kitchen screens',
      ],
    },
    {
      id: 3,
      title: '4. Instant Cashier Settlement',
      device: 'Desktop POS Windows PC',
      icon: Monitor,
      accent: 'indigo',
      badge: 'Counter Management',
      description:
        'The main billing counter screen displays the updated dining room in real time. When the guest is ready to leave, the cashier clicks Table T-01 to instantly print a GST invoice, accept dynamic UPI, or split the check.',
      specs: [
        'One-click bill settlement & GST breakdown',
        'Supports cash, card, UPI QR, and hotel room folio billing',
        'Automatic inventory deduction and daily shift audit',
      ],
    },
  ];

  const comparisonRows = [
    {
      feature: 'Internet Dependency',
      cloud: 'Required 100% of the time. If internet drops, ordering and billing freeze.',
      signatures: '100% Offline Capable. Communicates over local Wi-Fi router. Never stops.',
      advantage: true,
    },
    {
      feature: 'Order Sync Speed',
      cloud: '1,500ms – 4,000ms (Must travel to remote cloud servers and back).',
      signatures: '< 20ms (Direct in-building local network packets).',
      advantage: true,
    },
    {
      feature: 'Subscription Cost',
      cloud: '₹3,000 to ₹10,000 every single month per restaurant forever.',
      signatures: 'Perpetual ownership. Zero monthly rental fees.',
      advantage: true,
    },
    {
      feature: 'Kitchen Display (KDS)',
      cloud: 'Requires expensive proprietary hardware or extra monthly add-on fees.',
      signatures: 'Included out of the box. Runs on any TV, monitor, or cheap Android tablet.',
      advantage: true,
    },
    {
      feature: 'Security & Customer Data',
      cloud: 'Stored on public third-party multi-tenant cloud databases.',
      signatures: 'Stored locally in your restaurant on encrypted high-speed SQLite database.',
      advantage: true,
    },
    {
      feature: 'Multi-Terminal Floor Resilience',
      cloud: 'High latency during dinner rush causes sync conflicts and double-bookings.',
      signatures: 'Zero-trust cryptographic ledger guarantees collision-free order punching.',
      advantage: true,
    },
  ];

  const faqs = [
    {
      q: 'Do I need an active internet connection to run the 3-device system?',
      a: 'No. The desktop POS counter, waiter mobile phones, and kitchen display screen (KDS) communicate entirely over your local Wi-Fi router or LAN switch. Even if your ISP broadband cable is completely cut, your restaurant continues taking orders, sending KOTs, and printing invoices without a single second of downtime.',
    },
    {
      q: 'What hardware do I need to buy?',
      a: 'Zero expensive proprietary terminals. The main POS runs on any Windows 10 or 11 PC or laptop. Waiters can use any affordable Android smartphone (running Android 8.0 or newer). The kitchen display (KDS) can run on any Android tablet, smart TV, or a mini PC monitor.',
    },
    {
      q: 'How do waiter phones connect securely to the main computer?',
      a: 'Signatures Bill uses an enterprise zero-trust cryptographic pairing flow. The cashier opens Settings > Connect Waiter Phone, which displays a 6-digit OTP and QR code. The waiter scans the QR code once, exchanging an HMAC-SHA256 device secret. From that moment forward, every order is cryptographically signed and authenticated without passwords.',
    },
    {
      q: 'What happens if a waiter walks into a blind spot or outdoor garden without Wi-Fi?',
      a: 'The waiter app includes an intelligent offline outbox. The waiter can punch the order as usual; the app acknowledges the order locally and holds it in the encrypted outbox. The moment the waiter steps back into Wi-Fi coverage, the outbox automatically flushes the order to the kitchen and POS in milliseconds.',
    },
    {
      q: 'Does it support hotel room charges and billing?',
      a: 'Yes. For hotels, resorts, and guest houses with dine-in restaurants or room service, waiters can post food bills directly to the guest’s room folio number. The front desk PMS consolidates the restaurant check into the final room checkout invoice seamlessly.',
    },
    {
      q: 'Can I add multiple waiter phones and multiple kitchen stations?',
      a: 'Absolutely. You can connect 1 to 20+ waiter phones simultaneously. You can also configure separate kitchen display stations (e.g., Main Kitchen, Tandoor & Grill, Drinks & Bar, Dessert Counter) so each chef sees only the items assigned to their station.',
    },
  ];

  return (
    <div className="w-full bg-[#07090E] text-slate-100 min-h-screen selection:bg-sky-500 selection:text-white font-sans">
      {/* Ambient Luxury Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-600/15 via-blue-600/10 to-transparent blur-[140px]" />
        <div className="absolute top-[800px] -left-60 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px]" />
        <div className="absolute top-[1800px] -right-60 w-[650px] h-[650px] bg-amber-600/10 blur-[160px]" />
      </div>

      <div className="relative z-10">
        {/* ======================================================== */}
        {/* 1. HERO SECTION                                          */}
        {/* ======================================================== */}
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-300">
              Signatures Bill • Restaurant &amp; Hotel Ecosystem OS
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-bold text-sky-400">Zero Cloud Dependency</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            1 Restaurant Floor. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
              3 Perfectly Synchronized Screens.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-400 leading-relaxed mb-10 font-normal">
            Equip your dining room with an intelligent real-time network. Waiters punch on{' '}
            <span className="text-sky-300 font-semibold">Android mobile phones</span>, chefs cook from a live{' '}
            <span className="text-amber-300 font-semibold">Kitchen Display System (KDS)</span>, and cashiers settle
            bills on the <span className="text-emerald-300 font-semibold">Windows PC Counter</span>—all synchronized
            over local Wi-Fi in under 18 milliseconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Button
              size="lg"
              variant="primary"
              onClick={() => onNavigate('/download')}
              className="flex items-center gap-2.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-xl shadow-sky-500/25 px-8 py-4 text-sm font-bold text-white rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-sky-200" />
              <span>Download 35-Day Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            {onLaunchDemo && (
              <Button
                size="lg"
                variant="outline"
                onClick={onLaunchDemo}
                className="flex items-center gap-2 px-7 py-4 text-sm font-semibold rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Launch Interactive Demo</span>
              </Button>
            )}
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md">
              <div className="flex items-center gap-2 text-sky-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Sync Speed</span>
              </div>
              <div className="text-2xl font-black text-white">&lt; 18 ms</div>
              <div className="text-xs text-slate-500 mt-0.5">Instant local LAN packets</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Wifi className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Internet Req.</span>
              </div>
              <div className="text-2xl font-black text-white">0% Needed</div>
              <div className="text-xs text-slate-500 mt-0.5">Operates 100% offline</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Receipt className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Cloud Rent</span>
              </div>
              <div className="text-2xl font-black text-white">₹0 / month</div>
              <div className="text-xs text-slate-500 mt-0.5">One-time license ownership</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Data Privacy</span>
              </div>
              <div className="text-2xl font-black text-white">Zero Trust</div>
              <div className="text-xs text-slate-500 mt-0.5">Encrypted inside restaurant</div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. FLAGSHIP INTERACTIVE 3-DEVICE SIMULATOR               */}
        {/* ======================================================== */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/60 border border-sky-800/60 px-3 py-1 rounded-full">
              INTERACTIVE 3-SCREEN SYSTEM EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Watch an Order Travel Across the Dining Room
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              From the instant a server enters customer preferences at the table to kitchen preparation and cashier settlement.
              Try stepping through the stages below or let it auto-play.
            </p>
          </div>

          {/* Embedded High-Fidelity Simulator */}
          <RestaurantEcosystemSimulator />
        </section>

        {/* ======================================================== */}
        {/* 3. THREE-DEVICE BREAKDOWN (PC + MOBILE + KDS)            */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              THE 3 PILLARS OF RESTAURANT SPEED
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Engineered Specifically for Food &amp; Beverage
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Every screen has a dedicated purpose designed to remove dining room bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Screen 1: Mobile Waiter App */}
            <div className="relative group rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl hover:border-sky-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Device 1 • Floor Staff
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Android Waiter App</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Equip your floor team with the mobile app on standard budget Android phones. Waiters browse dishes with live
                  photos, customize food specifications, and punch orders directly at customer tables without running back and
                  forth.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Visual floor map with live vacant/occupied tables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Instant KOT punching with course &amp; cooking notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Works offline with automatic outbox delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Haptic vibration alert when dishes are ready</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Runs on Android 8.0+</span>
                <span className="text-sky-400 font-semibold">Zero per-waiter fee</span>
              </div>
            </div>

            {/* Screen 2: KDS Kitchen Display */}
            <div className="relative group rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl hover:border-amber-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <ChefHat className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Device 2 • Head Chef &amp; Line
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Kitchen Display (KDS)</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Eliminate lost, greased, and unreadable paper order slips. Orders flash in real-time on a large kitchen monitor
                  with clear item quantities, guest special instructions, and color-coded timers to prevent delayed food service.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>High-contrast cards readable across hot kitchens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Audible chime for incoming new tickets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>One-touch "Item Ready" notifies waiter phone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Station routing (Kitchen, Bar, Grill, Bakery)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Runs on any TV or Tablet</span>
                <span className="text-amber-400 font-semibold">Paperless kitchen</span>
              </div>
            </div>

            {/* Screen 3: Desktop POS Counter */}
            <div className="relative group rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Monitor className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Device 3 • Cashier &amp; Manager
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Windows POS Counter</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  The central brain of your restaurant. Monitor live floor activity, authorize employee access with zero-trust
                  encryption, print thermal bills, accept split payments, and audit daily sales without external cloud latency.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complete table overview (Available, KOT, Billed)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dynamic UPI QR code on bill or customer display</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Table shifting, bill splitting, and discount rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Perpetual local SQLite data security</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Windows 10 / 11 PC</span>
                <span className="text-emerald-400 font-semibold">High-speed SQLite</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. STEP-BY-STEP LIVE ORDER FLOW WORKFLOW                 */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              ORDER LIFECYCLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              From Dining Table to Kitchen Line to Cashier
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Explore how each terminal interacts during peak dining rush hours.
            </p>
          </div>

          {/* Workflow Interactive Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeWorkflowTab === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveWorkflowTab(step.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-sky-400/80 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      Step {step.id + 1}
                    </span>
                  </div>
                  <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title.split('. ')[1]}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{step.badge}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          {(() => {
            const step = workflowSteps[activeWorkflowTab];
            const Icon = step.icon;
            return (
              <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-700/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{step.device}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{step.title}</h3>

                    <p className="text-slate-300 text-base leading-relaxed">{step.description}</p>

                    <div className="pt-4 space-y-2.5">
                      {step.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
                    <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-md">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Target Latency</div>
                      <div className="text-3xl font-black text-emerald-400 mt-1">&lt; 18ms</div>
                      <div className="text-xs text-slate-500 mt-1">Zero cloud route required</div>
                    </div>
                    <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active LAN Link
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ======================================================== */}
        {/* 5. ARCHITECTURAL COMPARISON: LOCAL LAN VS CLOUD POS       */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              THE HARD TRUTH ABOUT RESTAURANT SOFTWARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Cloud-Only POS Systems Fail at 8:30 PM
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              When Friday night dinner rush hits and tables are full, you cannot afford a 3-second lag on every single dish or a
              complete shutdown when the street fiber optic cable is damaged.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-5 px-6">Operational Metric</th>
                    <th className="py-5 px-6 text-rose-400/90">Typical Cloud-Based POS</th>
                    <th className="py-5 px-6 text-emerald-400">Signatures Bill Restaurant OS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-5 px-6 font-semibold text-slate-200">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-slate-400">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.cloud}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-200 font-medium bg-emerald-500/[0.03]">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-emerald-100">{row.signatures}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. ADVANCED HOSPITALITY FEATURES                         */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              BUILT FOR REAL HOSPITALITY ENVIRONMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Ready for the Chaos of a Busy Dining Floor
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Sophisticated restaurant workflows handled smoothly with zero technical complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Table Shift &amp; Merge</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Guests moved from Table 2 to Table 8? Or two large parties joined together? Transfer or merge active KOTs with
                one tap. Both the kitchen screen and the POS counter update instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Multi-Course Pacing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take the entire meal order upfront. Fire Batch 1 (Starters &amp; Beverages) right away, and release Batch 2 (Main
                Course) with a single click when the starters are cleared.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Split Billing &amp; Room Folio</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Split bills equally among guests or item-by-item. In hotels and guest houses, charge restaurant dining straight
                to the guest room number for single-invoice checkout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Multi-Station Kitchen Routing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Beverages route to the bar screen, tandoor items to the clay oven station, and desserts to the pastry chef. No
                more shouting across sections or missed food items.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">EMS Staff &amp; Shift Management</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track waiter sales performance, shift tip allocations, and attendance seamlessly with integrated Employee
                Management System (EMS) modules.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Zero-Trust LAN Pairing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prevent rogue devices from accessing your restaurant network. Phones must be paired via a time-limited 6-digit
                OTP and authenticated with SHA-256 HMAC tokens.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. FREQUENTLY ASKED QUESTIONS                            */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              HAVE QUESTIONS?
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-1">
              Everything you need to know about setting up the 3-device restaurant network.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-sky-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. HIGH-IMPACT BOTTOM CTA BANNER                         */}
        {/* ======================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-sky-900/50 via-indigo-950/60 to-slate-900 border border-sky-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80">
                GET STARTED IN UNDER 5 MINUTES
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Upgrade Your Restaurant to Instant 3-Device Sync Today
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Download the Windows POS counter and connect your first waiter phone and kitchen display right away. No credit card
                required. Includes full 35-day trial with all restaurant &amp; hotel features enabled.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => onNavigate('/download')}
                  className="flex items-center gap-2 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Download Windows (.exe) Installer</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('/pricing')}
                  className="flex items-center gap-2 px-7 py-4 border border-slate-600 bg-slate-900/80 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>View Pricing &amp; License Plans</span>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>35-Day Full-Featured Trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Monthly Subscription</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Works 100% Offline</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
