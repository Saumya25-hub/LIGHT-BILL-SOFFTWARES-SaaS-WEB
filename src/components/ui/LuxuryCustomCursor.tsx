import React, { useEffect, useRef, useState } from 'react';

/**
 * LuxuryCustomCursor
 * Awwwards-grade Fluid Magnetic Custom Cursor (Trailer).
 * Exactly matches the iconic Black Dot + Floating Coral/Red Ring design:
 * - Center Dot: 0-latency leading pinpoint tip.
 * - Outer Ring: Smooth spring-lerp momentum trailing follower.
 * - Magnetic expansion on buttons, links, cards, & interactive controls.
 * - Tactile spring snap on mousedown / click.
 * - Clean input/textarea passthrough.
 * - Auto-disabled on mobile / touchscreens.
 */
export const LuxuryCustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Exact mouse coordinates
  const mouse = useRef({ x: -100, y: -100 });
  // Trailing ring coordinates
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-only
    const checkTouch = () => {
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instantly position leading dot with zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inputElement = target.closest('input, textarea, select, [contenteditable="true"]');
      setIsInput(!!inputElement);

      const interactive = target.closest(
        'button, a, [role="button"], .cursor-pointer, [data-cursor="hover"]'
      );
      setIsHovered(!!interactive && !inputElement);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // 120 FPS Lerp animation loop for elastic outer ring
    const animate = () => {
      // 0.18 lerp factor = snappy yet buttery smooth elastic follow
      const factor = 0.18;
      ring.current.x += (mouse.current.x - ring.current.x) * factor;
      ring.current.y += (mouse.current.y - ring.current.y) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Disable on mobile/touch screens
  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Leading Center Black Dot (Direct Zero-Lag Pinpoint) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isInput
              ? 'opacity-0 scale-50'
              : isHovered
              ? 'w-2 h-2 bg-amber-400 border border-black/80 scale-90 shadow-[0_0_8px_rgba(245,158,11,0.9)]'
              : isClicked
              ? 'w-2 h-2 bg-emerald-400 scale-75'
              : 'w-2.5 h-2.5 bg-black border border-white/90 shadow-[0_0_4px_rgba(0,0,0,0.8)]'
          }`}
        />
      </div>

      {/* 2. Trailing Follower Coral/Red Ring (Fluid Physics Spring) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
            isInput
              ? 'w-6 h-6 border border-slate-400/40 opacity-30 scale-75'
              : isClicked
              ? 'w-7 h-7 border-[2px] border-emerald-400 bg-emerald-400/20 scale-90 shadow-[0_0_20px_rgba(52,211,153,0.7)]'
              : isHovered
              ? 'w-14 h-14 border-[2px] border-amber-400 bg-amber-500/15 backdrop-blur-[1px] scale-110 shadow-[0_0_25px_rgba(245,158,11,0.5)]'
              : 'w-10 h-10 border-[1.5px] border-[#ff4742] bg-[#ff4742]/5 shadow-[0_0_15px_rgba(255,71,66,0.4)]'
          }`}
        >
          {/* Micro hover pulse aura */}
          {isHovered && (
            <div className="w-full h-full rounded-full border border-amber-300/50 animate-ping opacity-40" />
          )}
        </div>
      </div>
    </div>
  );
};
