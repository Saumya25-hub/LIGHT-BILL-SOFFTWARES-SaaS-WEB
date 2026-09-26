import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  ArrowRight, 
  Volume2, 
  VolumeX,
  Minimize2
} from 'lucide-react';

interface CuteRobotCopilotProps {
  onNavigate?: (path: string) => void;
  onLaunchDemo?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actions?: { label: string; action: () => void }[];
  time: string;
}

export const CuteRobotCopilot: React.FC<CuteRobotCopilotProps> = ({
  onNavigate,
  onLaunchDemo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollReaction, setScrollReaction] = useState<'idle' | 'down' | 'up'>('idle');
  const [currentSection, setCurrentSection] = useState<'hero' | 'demo' | 'works' | 'process' | 'footer'>('hero');
  const [speechBubbleText, setSpeechBubbleText] = useState('👋 Hey boss! Need a quick tour?');
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Chat State
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '🤖 Beep-boop! I am **Siggy**, your AI Copilot for **Signatures Bill ERP**. How can I help you dominate your wholesale or retail business today?',
      actions: [
        { label: '🚀 Test 0ms Simulator', action: () => onLaunchDemo?.() },
        { label: '💰 Check Pricing', action: () => onNavigate?.('/pricing') },
        { label: '🖨️ 80mm Thermal Specs', action: () => handleSendPrompt('Tell me about thermal printer support') },
      ],
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Synthesize cute sci-fi blip sound using Web Audio API
  const playSciFiBlip = (freq = 620, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // Audio not permitted or supported
    }
  };

  // Blinking Eye Interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Scroll Reaction & Section Tracking
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (delta > 4) {
        setScrollReaction('down');
        setHeadTilt({ x: 3, y: 5 });
      } else if (delta < -4) {
        setScrollReaction('up');
        setHeadTilt({ x: -2, y: -5 });
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollReaction('idle');
        setHeadTilt({ x: 0, y: 0 });
      }, 250);

      lastScrollY = currentScrollY;

      // Detect current section and set proactive speech bubble
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      const demoEl = document.getElementById('demo-portal');
      const worksEl = document.getElementById('works');
      const processEl = document.getElementById('process');
      const footerEl = document.getElementById('contact');

      if (footerEl && scrollPos >= footerEl.offsetTop) {
        if (currentSection !== 'footer') {
          setCurrentSection('footer');
          setSpeechBubbleText('🚀 Ready to transform your business? Click me to chat!');
          setShowSpeechBubble(true);
        }
      } else if (processEl && scrollPos >= processEl.offsetTop) {
        if (currentSection !== 'process') {
          setCurrentSection('process');
          setSpeechBubbleText('⚙️ Built with C# .NET 8 & React 19 architecture!');
          setShowSpeechBubble(true);
        }
      } else if (worksEl && scrollPos >= worksEl.offsetTop) {
        if (currentSection !== 'works') {
          setCurrentSection('works');
          setSpeechBubbleText('🔥 80mm thermal billing & live GST calculation!');
          setShowSpeechBubble(true);
        }
      } else if (demoEl && scrollPos >= demoEl.offsetTop) {
        if (currentSection !== 'demo') {
          setCurrentSection('demo');
          setSpeechBubbleText('⚡ Click below to try the live 0ms desktop simulator!');
          setShowSpeechBubble(true);
        }
      } else {
        if (currentSection !== 'hero') {
          setCurrentSection('hero');
          setSpeechBubbleText('👋 Welcome! Scroll down to explore the 2026 ERP suite.');
          setShowSpeechBubble(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection]);

  // Handle Quick Question Prompt
  const handleSendPrompt = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    playSciFiBlip(750);

    setTimeout(() => {
      let botResponse = '';
      let actions: { label: string; action: () => void }[] = [];

      const query = text.toLowerCase();
      if (query.includes('demo') || query.includes('simulator') || query.includes('try')) {
        botResponse = '⚡ You can launch our interactive in-browser simulator with 1 click! Experience 0ms SQLite transactions, party ledger lookups, and instant bill generation directly in your browser without downloading.';
        actions = [{ label: '🚀 Launch Simulator Now', action: () => onLaunchDemo?.() }];
      } else if (query.includes('pricing') || query.includes('price') || query.includes('cost')) {
        botResponse = '💰 Signatures Bill offers lifetime offline licenses with 1 year free cloud backup & updates. Starting at just ₹1,999/yr for Single Terminal, or ₹4,999 for Multi-Counter LAN setups. All plans include 35-Day Free Trial!';
        actions = [{ label: 'View Pricing Matrix', action: () => onNavigate?.('/pricing') }];
      } else if (query.includes('thermal') || query.includes('print')) {
        botResponse = '🖨️ Yes! Supports all standard 80mm (3-inch) and 58mm (2-inch) ESC/POS USB, Bluetooth, and LAN thermal receipt printers with instant 0-second auto-cut blit printing and bilingual Indian regional font support.';
      } else if (query.includes('gst') || query.includes('tax')) {
        botResponse = '📑 100% compliant with GSTN 2026 rules! Handles CGST/SGST/IGST, reverse charge, HSN auto-lookup, and one-click JSON e-way bill export.';
      } else {
        botResponse = `✨ Thanks for asking! Signatures Bill ERP is engineered for Surat & pan-India textile traders, retail marts, and manufacturers. Let me know if you want to explore the live demo or download installer.`;
        actions = [
          { label: '🚀 Test Interactive Demo', action: () => onLaunchDemo?.() },
          { label: '📥 Download Windows Installer', action: () => onNavigate?.('/download') },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse,
          actions,
          time: 'Just now',
        },
      ]);
      playSciFiBlip(920);
    }, 450);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    handleSendPrompt(text);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING CUTE 3D ROBOT MASCOT & AI COPILOT DOCK (Covers Watermark) */}
      {/* ========================================================================= */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
      >
        {/* Contextual Speech Bubble (Reacts to Scroll & Sections) */}
        {showSpeechBubble && !isOpen && (
          <div 
            className="mb-2 mr-1 sm:mr-2 max-w-[210px] sm:max-w-[280px] bg-[#120f0b]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-2.5 sm:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(245,158,11,0.2)] text-[11px] sm:text-xs text-neutral-200 animate-in fade-in slide-in-from-bottom-2 duration-300 relative"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeechBubble(false);
              }}
              className="absolute top-1.5 right-1.5 p-0.5 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-start gap-2 pr-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0 mt-1" />
              <p className="font-grotesk font-medium leading-snug">
                {speechBubbleText}
              </p>
            </div>

            {/* Bubble Tail */}
            <div className="absolute -bottom-1.5 right-8 sm:right-12 w-3 h-3 bg-[#120f0b] border-r border-b border-amber-500/40 rotate-45" />
          </div>
        )}

        {/* The Capsule AI Copilot Dock: Compact on mobile, full width on desktop */}
        <div 
          onClick={() => {
            playSciFiBlip(isOpen ? 440 : 880);
            setIsOpen(!isOpen);
            setShowSpeechBubble(false);
          }}
          className="group relative cursor-pointer flex items-center gap-2 sm:gap-3.5 p-2 sm:pl-3.5 sm:pr-6 sm:py-2.5 rounded-full bg-[#110e0b]/98 hover:bg-[#1a1611] border border-amber-500/50 shadow-[0_15px_45px_rgba(0,0,0,0.95),0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-400 hover:shadow-[0_15px_50px_rgba(0,0,0,0.98),0_0_40px_rgba(245,158,11,0.45)] transition-all duration-300 backdrop-blur-2xl"
          title="Signatures AI Copilot"
        >
          {/* Ambient Dark Levitation Under-Shield that blankets the watermark */}
          <div className="absolute -inset-4 rounded-full bg-black/95 blur-md pointer-events-none -z-10" />

          {/* Cute Robot Mini Avatar */}
          <div className="relative flex flex-col items-center">
            {/* Holographic Spinning Antenna Beacon */}
            <div className="relative flex flex-col items-center -mb-1 z-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_#f59e0b]" />
              </span>
              <div className="w-0.5 h-1.5 bg-gradient-to-b from-amber-400 to-neutral-700" />
            </div>

            {/* Robot Head Body */}
            <div 
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl p-0.5 bg-gradient-to-br from-amber-400/50 via-neutral-800 to-[#120f0b] border border-amber-500/60 shadow-md transition-transform duration-200"
              style={{
                transform: `translate(${headTilt.x}px, ${headTilt.y}px)`,
              }}
            >
              <div className="relative w-full h-full rounded-[14px] bg-gradient-to-b from-[#1c1813] to-[#0c0a08] flex flex-col items-center justify-center p-1 overflow-hidden border border-amber-500/20">
                {/* Ear Pods */}
                <div className="absolute -left-0.5 w-1 h-3 rounded-full bg-amber-500/60 shadow-[0_0_6px_#f59e0b]" />
                <div className="absolute -right-0.5 w-1 h-3 rounded-full bg-amber-500/60 shadow-[0_0_6px_#f59e0b]" />

                {/* Visor Screen */}
                <div className="relative w-full h-5 sm:h-6 rounded-lg bg-black/95 border border-amber-500/30 flex items-center justify-center gap-1.5 px-1 shadow-inner overflow-hidden">
                  {/* Left Eye */}
                  <div 
                    className={`rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_10px_#f59e0b] transition-all duration-150 ${
                      isBlinking 
                        ? 'h-0.5 w-2 sm:w-2.5 my-1 bg-amber-300' 
                        : scrollReaction === 'down' 
                          ? 'w-2 sm:w-2.5 h-2 sm:h-2.5 translate-y-0.5' 
                          : scrollReaction === 'up'
                            ? 'w-2 sm:w-2.5 h-2 sm:h-2.5 -translate-y-0.5'
                            : 'w-2 sm:w-2.5 h-2 sm:h-2.5'
                    }`}
                  />
                  {/* Right Eye */}
                  <div 
                    className={`rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_10px_#f59e0b] transition-all duration-150 ${
                      isBlinking 
                        ? 'h-0.5 w-2 sm:w-2.5 my-1 bg-amber-300' 
                        : scrollReaction === 'down' 
                          ? 'w-2 sm:w-2.5 h-2 sm:h-2.5 translate-y-0.5' 
                          : scrollReaction === 'up'
                            ? 'w-2 sm:w-2.5 h-2 sm:h-2.5 -translate-y-0.5'
                            : 'w-2 sm:w-2.5 h-2 sm:h-2.5'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Info Inside Capsule Dock (Hidden on mobile to preserve screen width, visible on sm+) */}
          <div className="hidden sm:flex flex-col pr-1">
            <div className="flex items-center gap-2">
              <span className="font-grotesk font-bold text-xs text-white tracking-wide group-hover:text-amber-300 transition-colors">
                Siggy Copilot
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                AI
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ask anything // 0ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE COPILOT CHAT MODAL DRAWER */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-28 z-50 w-auto sm:w-[380px] max-w-[380px] h-[480px] sm:h-[520px] max-h-[80vh] rounded-3xl bg-[#0f0d0a]/95 backdrop-blur-xl border border-amber-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none font-grotesk text-white"
        >
          {/* Header */}
          <div className="p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-[#18140f] to-amber-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Bot className="w-4 h-4 fill-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">Siggy Bot</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">V1</span>
                </div>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  0MS ERP KERNEL ACTIVE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  soundEnabled 
                    ? 'border-amber-400/40 text-amber-300 bg-amber-950/40' 
                    : 'border-white/10 text-neutral-400 hover:text-white bg-white/5'
                }`}
                title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize Copilot"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-black font-medium rounded-br-none shadow-[0_4px_15px_rgba(245,158,11,0.3)]'
                      : 'bg-white/5 border border-white/10 text-neutral-200 rounded-bl-none shadow-md backdrop-blur-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>

                {/* Interactive Action Buttons if bot message has any */}
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={act.action}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer shadow-sm"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] font-mono text-neutral-500 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => handleSendPrompt('Launch in-browser simulator')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-200 border border-white/10 text-[10px] font-mono transition-colors cursor-pointer"
            >
              🚀 Free Simulator
            </button>
            <button 
              onClick={() => handleSendPrompt('Tell me about pricing plans')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-200 border border-white/10 text-[10px] font-mono transition-colors cursor-pointer"
            >
              💰 Pricing
            </button>
            <button 
              onClick={() => handleSendPrompt('Explain GST and thermal printer features')}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-200 border border-white/10 text-[10px] font-mono transition-colors cursor-pointer"
            >
              🖨️ Thermal Print
            </button>
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={handleUserSubmit}
            className="p-3 border-t border-amber-500/20 bg-black/40 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about Signatures Bill..."
              className="flex-1 bg-white/5 border border-white/15 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 flex items-center justify-center text-black font-bold transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
