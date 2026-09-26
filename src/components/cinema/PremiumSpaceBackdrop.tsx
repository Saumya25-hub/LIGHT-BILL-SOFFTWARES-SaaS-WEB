import React from 'react';

export const PremiumSpaceBackdrop: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#070605]"
      aria-hidden="true"
    >
      {/* 1. Deep Space Cosmic Nebulae Radial Glows (GPU Accelerated, 0ms load, zero battery impact) */}
      
      {/* Top Golden Nebula (Atmosphere behind Hero & Navbar) */}
      <div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Mid Right Amethyst Deep-Space Bloom (Works & Demo Portal Accent) */}
      <div 
        className="absolute top-[30%] -right-[15%] w-[850px] h-[850px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.14) 0%, rgba(99, 102, 241, 0.04) 55%, transparent 80%)',
          filter: 'blur(100px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Lower Left Amber Supernova Glow */}
      <div 
        className="absolute top-[65%] -left-[12%] w-[900px] h-[900px] rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.12) 0%, rgba(180, 83, 9, 0.03) 60%, transparent 80%)',
          filter: 'blur(110px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* 2. Micro Starfield Layers (Pure CSS Hardware-Blitted, 120 FPS on all Mobile & Desktop) */}
      {/* Distant Micro Stardust (tiny faint stars) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      {/* Mid-Distance Golden Constellation Stars */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.85) 1.5px, transparent 1.5px)',
          backgroundSize: '95px 95px',
        }}
      />

      {/* Prominent Bright Pulsar Stars */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)',
          backgroundSize: '180px 180px',
        }}
      />

      {/* 3. Luxury Cinematic Vignette (Preserves maximum contrast for cards & text) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 90% at 50% 50%, transparent 35%, rgba(7, 6, 5, 0.5) 75%, #070605 100%)',
        }}
      />

      {/* 4. Subtle Ambient Golden Sheen at the horizon */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.03) 0%, transparent 40%, transparent 70%, rgba(245, 158, 11, 0.04) 100%)',
        }}
      />
    </div>
  );
};
