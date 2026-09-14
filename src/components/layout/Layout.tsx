import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export interface LayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentPath, onNavigate, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 relative selection:bg-sky-500 selection:text-white">
      {/* Subtle ambient lighting layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-600/15 via-brand-600/5 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] opacity-40 rounded-full" />
        <div className="absolute top-2/3 -right-40 w-[600px] h-[600px] bg-brand-700/10 blur-[140px] opacity-40 rounded-full" />
        <div className="absolute inset-0 bg-subtle-grid bg-grid-sm opacity-20" />
      </div>

      {/* Sticky Navigation */}
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
