import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // 3D depth: 0.2 (distant) to 1.2 (close)
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  type: 'ember' | 'rune';
  text?: string;
}

export const AmbientSpatialMotionLayer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const runes = ['0', '1', 'λ', '⚡', '0ms', 'Σ', '{ }', 'GPU', 'C#', 'SQL'];
    const particleCount = Math.min(55, Math.floor(width / 32));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isRune = Math.random() < 0.22;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.3 + Math.random() * 0.9,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45,
        size: isRune ? 10 + Math.random() * 4 : 1.5 + Math.random() * 2.5,
        alpha: 0.25 + Math.random() * 0.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        type: isRune ? 'rune' : 'ember',
        text: isRune ? runes[Math.floor(Math.random() * runes.length)] : undefined,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let animId: number;
    let frame = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollSpeed = Math.min(15, Math.abs(delta) * 0.25);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = () => {
      frame++;
      // Decay scroll burst speed smoothly
      scrollSpeed *= 0.92;

      // Mouse inertia
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX / width - 0.5) * 40;
      const parallaxY = (mouseY / height - 0.5) * 40;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics + depth multiplier
        p.x += p.vx * p.z;
        p.y += (p.vy - scrollSpeed * 0.4) * p.z;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Visual position with 3D parallax offset
        const drawX = p.x + parallaxX * p.z;
        const drawY = p.y + parallaxY * p.z;

        // Pulsing glow
        const currentAlpha = Math.max(
          0.1,
          p.alpha * (0.6 + 0.4 * Math.sin(frame * p.pulseSpeed + p.pulseOffset))
        );

        if (p.type === 'ember') {
          // Soft golden star / cosmic ember
          const radius = p.size * p.z;
          const gradient = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            radius * 2.8
          );
          gradient.addColorStop(0, `rgba(251, 191, 36, ${currentAlpha})`);
          gradient.addColorStop(0.4, `rgba(245, 158, 11, ${currentAlpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(217, 119, 6, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.text) {
          // Floating 3D holographic code rune
          ctx.font = `${Math.round(p.size * p.z)}px monospace`;
          ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.75})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
          ctx.shadowBlur = 8 * p.z;
          ctx.fillText(p.text, drawX, drawY);
          ctx.shadowBlur = 0; // reset
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-1 overflow-hidden ${className}`}
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
};
