import React from 'react';

export const PremiumSpaceBackdrop: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#070605]"
      aria-hidden="true"
    >
      {/* 1. Ultra-Lightweight Pure CSS Gradient Glows (Zero-Blur for i3 / Low-End GPU 120 FPS Performance) */}
      <div 
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 45%, transparent 75%)',
        }}
      />

      <div 
        className="absolute top-[35%] -right-[10%] w-[800px] h-[800px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.10) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 75%)',
        }}
      />

      <div 
        className="absolute top-[70%] -left-[10%] w-[850px] h-[850px] rounded-full pointer-events-none opacity-35"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.09) 0%, rgba(180, 83, 9, 0.02) 55%, transparent 75%)',
        }}
      />

      {/* 2. Micro Starfield Layers (Zero Lag, Native Texture CSS) */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.8) 1.5px, transparent 1.5px)',
          backgroundSize: '110px 110px',
        }}
      />

      {/* 3. Luxury Vignette Edge Darkness */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(7, 6, 5, 0.7) 85%, #070605 100%)',
        }}
      />
    </div>
  );
};
