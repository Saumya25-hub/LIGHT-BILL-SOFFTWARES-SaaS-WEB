import React from 'react';
import { GlobalScrollVideoBackdrop } from '../components/cinema/GlobalScrollVideoBackdrop';
import { ComponineNavbar } from '../components/layout/ComponineNavbar';
import { ComponineHero } from '../components/cinema/ComponineHero';
import { CosmicDemoPortal } from '../components/cinema/CosmicDemoPortal';
import { ComponineProjectShowcase } from '../components/cinema/ComponineProjectShowcase';
import { CreativeProcessSection } from '../components/cinema/CreativeProcessSection';
import { ExperimentsPlayground } from '../components/cinema/ExperimentsPlayground';
import { CinematicFooter } from '../components/cinema/CinematicFooter';
import { CuteRobotCopilot } from '../components/assistant/CuteRobotCopilot';

export interface PageProps {
  onNavigate: (path: string) => void;
  onLaunchDemo?: () => void;
}

export const HomePage: React.FC<PageProps> = ({ onNavigate, onLaunchDemo }) => {
  return (
    <div className="relative w-full min-h-screen bg-[#070605] text-white selection:bg-amber-500 selection:text-black font-grotesk">
      
      {/* 00. Global Video Scroll Engine (Fixed full-screen backdrop, scrubs forward/backward smoothly with page scroll) */}
      <GlobalScrollVideoBackdrop />

      {/* 01. Floating Capsule Navbar (Componine Rolling Text & Halftone Mask CTA) */}
      <ComponineNavbar 
        onNavigate={onNavigate} 
        onLaunchDemo={onLaunchDemo || (() => onNavigate('/demo'))}
        currentPath="/" 
      />

      {/* 02. Componine Award-Winning Hero Section (Clean Left Layout + Sacred Geometry + Marquee Ticker) */}
      <div id="hero" className="relative z-10">
        <ComponineHero 
          onNavigate={onNavigate} 
          onLaunchDemo={onLaunchDemo}
          onExploreClick={() => {
            const el = document.getElementById('works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
      </div>

      {/* 03. Live Interactive Desktop Software Simulator Portal (One-Click Launch into /demo) */}
      <div id="demo-portal" className="relative z-10 border-t border-amber-500/20">
        <CosmicDemoPortal 
          onLaunchDemo={onLaunchDemo || (() => onNavigate('/demo'))}
          onNavigate={onNavigate}
        />
      </div>

      {/* 04. Componine Ornate Corner-Framed Project Showcase (.frame-corner) */}
      <div id="works" className="relative z-10 border-t border-amber-500/20">
        <ComponineProjectShowcase 
          onLaunchDemo={onLaunchDemo || (() => onNavigate('/demo'))}
          onNavigate={onNavigate}
        />
      </div>

      {/* 05. Interactive 5-Step Glowing Creative Process Journey */}
      <div id="process" className="relative z-10 border-t border-amber-500/20">
        <CreativeProcessSection />
      </div>

      {/* 06. Interactive Technology Playground (Gravitational Simulation) */}
      <div id="playground" className="relative z-10 border-t border-amber-500/20">
        <ExperimentsPlayground />
      </div>

      {/* 07. Cinematic Atmospheric Footer */}
      <div id="contact" className="relative z-10 border-t border-amber-500/20">
        <CinematicFooter onNavigate={onNavigate} />
      </div>

      {/* 08. Cute 3D Cyber AI Copilot (Fixed at bottom-right, covers watermark, reacts to scroll & answers questions) */}
      <CuteRobotCopilot 
        onNavigate={onNavigate} 
        onLaunchDemo={onLaunchDemo} 
      />
    </div>
  );
};
