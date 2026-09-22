import React, { useEffect, useRef, useState } from 'react';

interface CurvedCodeWavesProps {
  className?: string;
}

export const CurvedCodeWaves: React.FC<CurvedCodeWavesProps> = ({ className = '' }) => {
  const [offsets, setOffsets] = useState([0, 25, 50, 75]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Continuous 60 FPS animation loop for smooth code streaming along the curves
  useEffect(() => {
    let animId: number;
    let currentOffsets = [0, 25, 50, 75];
    const speeds = [0.08, 0.12, 0.06, 0.10]; // Diverse wave velocities

    const animate = () => {
      currentOffsets = currentOffsets.map((off, idx) => (off + speeds[idx]) % 100);
      setOffsets([...currentOffsets]);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const codeSnippets = [
    `// S TOM'S COSMIC KERNEL 01001100 01001001 01000111 01001000 const cosmos = await synthesizeGalaxy({ offlineFirst: true }); SELECT * FROM ledgers WHERE verified = 1; fun syncGoogleDrive(): Result<Snapshot> = withContext(Dispatchers.IO) void main() { vec4 color = texture2D(u_code, v_uv); gl_FragColor = color; } PBKDF2_HMAC_SHA256(secretKey, salt, 100000); android.os.Build.VERSION_CODES.VANILLA_ICE_CREAM // API 36 ACTIVE C# .NET 8.0 DIRECTX 12 `,
    `const universe = new QuantumUniverse(); void main() { vec3 ray = cameraPosition + rayDir * t; gl_FragColor = vec4(mix(lavender, cyan, wave), 0.95); } 0x7FFF8A40 0x89240001 0xFFA00123 // ZERO-LATENCY PROTOCOL SQLite 3.45 WAL-Mode Enabled < 0.8ms Query Latency export const Release = { state: "CERTIFIED" }; `,
    `01000010 01001001 01001100 01001100 // IMMUTABLE BLOCK CHAIN await database.executeAsync("INSERT INTO LedgerJournal VALUES (?, ?, ?)"); Kotlin 2.0 Jetpack Compose 60FPS Reactive Runtime Hardware Shaders Active // S TOM'S 3D STUDIO `,
    `function* gravitationalLensing(singularity: Vector3) { yield* computePhotonOrbits(); } PBKDF2_100K_SALTED_HASH SHA256 // ENCRYPTED SNAPSHOTS Bluetooth Thermal ESC/POS Engine Connected // 58mm / 80mm Print Pipeline Ready `,
  ];

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{
        transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          {/* Wave 1: Upper celestial stream arching high into the deep galaxy */}
          <path
            id="code-wave-path-1"
            d="M 760 360 C 860 250, 980 150, 1120 90 S 1320 45, 1440 15"
            fill="none"
          />

          {/* Wave 2: Sweeping galactic arc flowing gracefully across the open right space */}
          <path
            id="code-wave-path-2"
            d="M 800 520 C 920 400, 1050 280, 1180 180 S 1340 110, 1440 70"
            fill="none"
          />

          {/* Wave 3: Mid-level undulating cyber wave */}
          <path
            id="code-wave-path-3"
            d="M 840 680 C 960 560, 1100 420, 1220 310 S 1360 210, 1440 160"
            fill="none"
          />

          {/* Wave 4: Lower cyber undertow sweeping along the lower galaxy */}
          <path
            id="code-wave-path-4"
            d="M 880 840 C 1000 730, 1140 600, 1260 480 S 1380 370, 1440 280"
            fill="none"
          />
        </defs>

        {/* Ambient Glowing Track Lines beneath the code streams */}
        <path
          d="M 760 360 C 860 250, 980 150, 1120 90 S 1320 45, 1440 15"
          fill="none"
          stroke="rgba(192, 132, 252, 0.2)"
          strokeWidth="1.2"
          strokeDasharray="8 16"
        />
        <path
          d="M 800 520 C 920 400, 1050 280, 1180 180 S 1340 110, 1440 70"
          fill="none"
          stroke="rgba(56, 189, 248, 0.18)"
          strokeWidth="1.2"
          strokeDasharray="6 20"
        />

        {/* WAVE 1: Radiant Lavender-Cyan High Stream */}
        <text
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="13.5"
          fontWeight="bold"
          letterSpacing="0.08em"
          fill="#d8b4fe"
          style={{ filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.95))' }}
        >
          <textPath
            href="#code-wave-path-1"
            xlinkHref="#code-wave-path-1"
            startOffset={`${offsets[0]}%`}
          >
            {codeSnippets[0]}
          </textPath>
          <textPath
            href="#code-wave-path-1"
            xlinkHref="#code-wave-path-1"
            startOffset={`${(offsets[0] + 50) % 100}%`}
          >
            {codeSnippets[0]}
          </textPath>
        </text>

        {/* WAVE 2: Electric Cyan-Emerald Flowing Cyber Wave */}
        <text
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="0.06em"
          fill="#38bdf8"
          style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.95))' }}
        >
          <textPath
            href="#code-wave-path-2"
            xlinkHref="#code-wave-path-2"
            startOffset={`${offsets[1]}%`}
          >
            {codeSnippets[1]}
          </textPath>
          <textPath
            href="#code-wave-path-2"
            xlinkHref="#code-wave-path-2"
            startOffset={`${(offsets[1] + 50) % 100}%`}
          >
            {codeSnippets[1]}
          </textPath>
        </text>

        {/* WAVE 3: Purple-Pink Celestial Code Stream */}
        <text
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="12.5"
          fontWeight="600"
          letterSpacing="0.07em"
          fill="#c084fc"
          style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.85))' }}
        >
          <textPath
            href="#code-wave-path-3"
            xlinkHref="#code-wave-path-3"
            startOffset={`${offsets[2]}%`}
          >
            {codeSnippets[2]}
          </textPath>
          <textPath
            href="#code-wave-path-3"
            xlinkHref="#code-wave-path-3"
            startOffset={`${(offsets[2] + 50) % 100}%`}
          >
            {codeSnippets[2]}
          </textPath>
        </text>

        {/* WAVE 4: Lower Cyber Undertow Wave */}
        <text
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.06em"
          fill="#4ade80"
          style={{ filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.85))' }}
        >
          <textPath
            href="#code-wave-path-4"
            xlinkHref="#code-wave-path-4"
            startOffset={`${offsets[3]}%`}
          >
            {codeSnippets[3]}
          </textPath>
          <textPath
            href="#code-wave-path-4"
            xlinkHref="#code-wave-path-4"
            startOffset={`${(offsets[3] + 50) % 100}%`}
          >
            {codeSnippets[3]}
          </textPath>
        </text>

        {/* Glowing Data Pulse Nodes riding along the waves in deep space */}
        <circle cx="1120" cy="90" r="4" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
        <circle cx="1340" cy="110" r="3.5" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
        <circle cx="1220" cy="310" r="3.5" fill="#c084fc" style={{ filter: 'drop-shadow(0 0 8px #c084fc)' }} />
        <circle cx="1260" cy="480" r="3" fill="#4ade80" style={{ filter: 'drop-shadow(0 0 8px #4ade80)' }} />
      </svg>
    </div>
  );
};
