import React from 'react';

interface SacredGeometryProps {
  className?: string;
}

export const ComponineSacredGeometry: React.FC<SacredGeometryProps> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      {/* Central Golden Radial Sun Flare */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 45%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main Sacred Floral Concentric Rings Vector */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[95vw] opacity-75">
        <svg 
          viewBox="0 0 2542 4498" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain animate-spin-slow [animation-duration:120s]"
        >
          {/* Outer Circles */}
          <circle cx="1270.5" cy="1270.5" r="1270" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />
          <circle cx="1271" cy="3227" r="1270.5" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" />

          {/* Symmetrical Intersection Rings */}
          <circle cx="866" cy="2249" r="405" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          <circle cx="1676" cy="2249" r="405" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          <circle cx="1271" cy="1844" r="405" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          <circle cx="1271" cy="2654" r="405" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          
          {/* Diagonal Rings */}
          <circle cx="984.621" cy="2535.38" r="405" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1.5" />
          <circle cx="1557.38" cy="1962.62" r="405" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1.5" />
          <circle cx="984.624" cy="1962.62" r="405" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1.5" />
          <circle cx="1557.38" cy="2535.38" r="405" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="1.5" />

          {/* Sacred Dashed Axis Lines */}
          <path d="M461 2249H2081" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M1271 3059V1439" stroke="rgba(245, 158, 11, 0.35)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M698.242 2821.76L1843.76 1676.24" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M698.242 1676.24L1843.76 2821.76" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Center Crown & Rotating Golden Cog Vector */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Ornate Circular Halo */}
        <div className="w-40 h-40 rounded-full border border-amber-500/30 border-dashed animate-spin-reverse [animation-duration:40s]" />
        
        {/* Crown / Golden Ring SVG */}
        <div className="absolute w-24 h-24 flex items-center justify-center animate-spin-slow [animation-duration:25s]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400/80 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" fill="none">
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 3" />
            <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" />
            {/* 8 Golden Radial Spikes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="8"
                x2="50"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="rgba(245, 158, 11, 0.25)" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
