import React from 'react';
import { CosmicCanvas3D } from '../components/cinema/CosmicCanvas3D';
import { HeroSection } from '../components/cinema/HeroSection';
import { CreativeProcessSection } from '../components/cinema/CreativeProcessSection';
import { SelectedWorksSection } from '../components/cinema/SelectedWorksSection';
import { ExperimentsPlayground } from '../components/cinema/ExperimentsPlayground';
import { CinematicFooter } from '../components/cinema/CinematicFooter';

export interface PageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-screen bg-[#03020c] text-white selection:bg-purple-500 selection:text-white">
      {/* 00. Global 3D WebGL Rotating Universe (Runs continuously across all sections as user scrolls) */}
      <CosmicCanvas3D className="fixed inset-0 pointer-events-none z-0" />

      {/* 01. Full-screen Cinematic Hero (WEBLOOK.png exact recreation with cosmic David artwork) */}
      <div id="hero" className="relative z-10">
        <HeroSection 
          onNavigate={onNavigate} 
          onExploreClick={() => {
            const el = document.getElementById('process');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
      </div>

      {/* 02. Interactive 5-Step Glowing Creative Process Journey with 3D Holographic Artifacts */}
      <div className="relative z-10">
        <CreativeProcessSection />
      </div>

      {/* 03. Selected Works Editorial Portfolio (Real Commercial Software Suite) */}
      <div className="relative z-10">
        <SelectedWorksSection />
      </div>

      {/* 04. Interactive Tech Playground (AI / 3D / Motion / Web with Gravitational Simulation) */}
      <div className="relative z-10">
        <ExperimentsPlayground />
      </div>

      {/* 05. Cinematic Atmospheric Footer (Let's Create CTA & Google Play Privacy Protection) */}
      <div className="relative z-10">
        <CinematicFooter onNavigate={onNavigate} />
      </div>
    </div>
  );
};
