import React from 'react';
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
    <div className="w-full bg-black text-white overflow-hidden">
      {/* 01. Full-screen Cinematic Hero (WEBLOOK.png exact recreation with cosmic David artwork) */}
      <div id="hero">
        <HeroSection 
          onNavigate={onNavigate} 
          onExploreClick={() => {
            const el = document.getElementById('works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
      </div>

      {/* 02. Interactive 5-Step Glowing Creative Process Journey */}
      <CreativeProcessSection />

      {/* 03. Selected Works Editorial Portfolio (Real Commercial Software Suite) */}
      <SelectedWorksSection />

      {/* 04. Interactive Tech Playground (AI / 3D / Motion / Web with Gravitational Simulation) */}
      <ExperimentsPlayground />

      {/* 05. Cinematic Atmospheric Footer (Let's Create CTA & Google Play Privacy Protection) */}
      <CinematicFooter onNavigate={onNavigate} />
    </div>
  );
};
