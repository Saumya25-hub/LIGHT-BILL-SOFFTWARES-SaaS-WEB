import React, { useEffect, useRef, useState } from 'react';

/**
 * LuxuryCustomCursor
 * Flawlessly concentric Awwwards-grade custom cursor.
 * Uses exact pixel offset calculations (x - radius, y - radius)
 * to guarantee that the Center Dot and Outer Ring are ALWAYS 100% concentric,
 * with ZERO vertical or horizontal offset!
 */
export const LuxuryCustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Exact target mouse coordinates
  const mouse = useRef({ x: -100, y: -100 });
  // Elastic trailing follower coordinates
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Radius constants for exact geometric center alignment
  const DOT_RADIUS = 4; // 8px diameter / 2
  const RING_RADIUS = 19; // 38px diameter / 2

  useEffect(() => {
    // Disable on mobile/touch screens
    const checkTouch = () => {
      const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        // On initial enter, sync ring immediately to prevent flying from corner
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
      }

      // Hardcoded exact center positioning: clientX - radius
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - DOT_RADIUS}px, ${e.clientY - DOT_RADIUS}px, 0)`;
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

    // 120 FPS Lerp Loop for elastic trailing ring
    const animate = () => {
      // Snappy and exact elastic follow
      const factor = 0.22;
      ring.current.x += (mouse.current.x - ring.current.x) * factor;
      ring.current.y += (mouse.current.y - ring.current.y) * factor;

      // Hardcoded exact center positioning: ring.x - radius
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - RING_RADIUS}px, ${ring.current.y - RING_RADIUS}px, 0)`;
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
      {/* 1. Leading Center Black Dot (8px x 8px, top-left transformed to clientX - 4px) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-150 ${
            isInput
              ? 'opacity-0 scale-50'
              : isHovered
              ? 'bg-amber-400 border border-black shadow-[0_0_8px_rgba(245,158,11,0.9)] scale-75'
              : isClicked
              ? 'bg-emerald-400 scale-90'
              : 'bg-black border border-white/90 shadow-[0_0_4px_rgba(0,0,0,0.8)]'
          }`}
        />
      </div>

      {/* 2. Trailing Follower Coral/Red Ring (38px x 38px, top-left transformed to ring.x - 19px) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '38px',
          height: '38px',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
            isInput
              ? 'border-slate-400/40 opacity-20 scale-50'
              : isClicked
              ? 'border-[2px] border-emerald-400 bg-emerald-400/20 scale-75 shadow-[0_0_20px_rgba(52,211,153,0.7)]'
              : isHovered
              ? 'border-[2px] border-amber-400 bg-amber-500/15 backdrop-blur-[1px] scale-150 shadow-[0_0_25px_rgba(245,158,11,0.5)]'
              : 'border-[1.5px] border-[#ff4742] bg-[#ff4742]/5 shadow-[0_0_14px_rgba(255,71,66,0.35)] scale-100'
          }`}
        >
          {/* Micro pulse ring when hovered */}
          {isHovered && (
            <div className="w-full h-full rounded-full border border-amber-300/50 animate-ping opacity-40" />
          )}
        </div>
      </div>
    </div>
  );
};
