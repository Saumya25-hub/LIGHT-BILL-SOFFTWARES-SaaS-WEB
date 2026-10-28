import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const EightPmFloatingBalls: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, width / height, 1, 4000);
    camera.position.set(0, 0, 650);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Fixed Cinematic Billiard Room Lights
    const overheadSun = new THREE.DirectionalLight(0xfff5e1, 3.4);
    overheadSun.position.set(40, 500, 250);
    scene.add(overheadSun);

    const warmPointLight = new THREE.PointLight(0xf59e0b, 2.8, 1200);
    warmPointLight.position.set(-200, 200, 300);
    scene.add(warmPointLight);

    const coolRimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    coolRimLight.position.set(-350, -150, -50);
    scene.add(coolRimLight);

    const ambientLight = new THREE.AmbientLight(0x181f2c, 0.95);
    scene.add(ambientLight);

    // 5. Photorealistic Procedural Texture Generator (Front & Back Badges)
    const createBilliardTexture = (
      number: number,
      baseColorHex: string,
      isStripe: boolean
    ): THREE.CanvasTexture => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      if (isStripe) {
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(0, 0, 512, 256);

        ctx.fillStyle = baseColorHex;
        ctx.fillRect(0, 64, 512, 128);

        const stripeGrad = ctx.createLinearGradient(0, 64, 0, 192);
        stripeGrad.addColorStop(0, 'rgba(0,0,0,0.12)');
        stripeGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)');
        stripeGrad.addColorStop(1, 'rgba(0,0,0,0.15)');
        ctx.fillStyle = stripeGrad;
        ctx.fillRect(0, 64, 512, 128);
      } else {
        ctx.fillStyle = baseColorHex;
        ctx.fillRect(0, 0, 512, 256);

        const bodyGrad = ctx.createLinearGradient(0, 0, 0, 256);
        bodyGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
        bodyGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
        bodyGrad.addColorStop(1, 'rgba(0,0,0,0.12)');
        ctx.fillStyle = bodyGrad;
        ctx.fillRect(0, 0, 512, 256);
      }

      if (number > 0) {
        const badgePositions = [128, 384];
        badgePositions.forEach((cx) => {
          const cy = 128;
          const badgeRadius = 38;

          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, badgeRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(0,0,0,0.25)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();

          ctx.fillStyle = '#0F172A';
          ctx.font = `900 ${badgeRadius > 35 ? (number >= 10 ? 34 : 40) : 30}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(number.toString(), cx, cy + 2);

          if (number === 6 || number === 9) {
            ctx.fillRect(cx - 12, cy + 18, 24, 3);
          }
        });
      }

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // 6. Distributed 3D Billiard Balls Configuration
    const sphereGeo = new THREE.SphereGeometry(32, 48, 48);

    interface BallEntity {
      mesh: THREE.Mesh;
      initialY: number;
      initialX: number;
      initialZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      orbitAngle: number;
      orbitSpeed: number;
      orbitRadius: number;
      scrollFactor: number;
    }

    const ballConfig = [
      // Top Hero Region
      { num: 8, color: '#090B0E', stripe: false, size: 44, x: -310, y: 110, z: 90, scrollFactor: 0.8 },
      { num: 9, color: '#EAB308', stripe: true, size: 36, x: 300, y: 150, z: 50, scrollFactor: 0.75 },
      { num: 1, color: '#FACC15', stripe: false, size: 30, x: -390, y: -40, z: -10, scrollFactor: 0.7 },
      { num: 3, color: '#DC2626', stripe: false, size: 32, x: 360, y: -80, z: 20, scrollFactor: 0.85 },
      
      // Features & Mid-Page Region
      { num: 14, color: '#10B981', stripe: true, size: 38, x: -280, y: -260, z: 40, scrollFactor: 0.9 },
      { num: 11, color: '#DC2626', stripe: true, size: 34, x: 320, y: -340, z: 60, scrollFactor: 0.8 },
      { num: 2, color: '#2563EB', stripe: false, size: 32, x: -380, y: -480, z: -20, scrollFactor: 0.85 },
      { num: 5, color: '#EA580C', stripe: false, size: 30, x: 370, y: -580, z: -10, scrollFactor: 0.75 },

      // Pricing & Lower Section
      { num: 4, color: '#7C3AED', stripe: false, size: 36, x: -300, y: -750, z: 50, scrollFactor: 0.85 },
      { num: 10, color: '#3B82F6', stripe: true, size: 34, x: 330, y: -880, z: 30, scrollFactor: 0.9 },
      { num: 7, color: '#991B1B', stripe: false, size: 32, x: -370, y: -1050, z: 10, scrollFactor: 0.8 },
      { num: 13, color: '#F97316', stripe: true, size: 35, x: 310, y: -1200, z: 40, scrollFactor: 0.85 },
      { num: 0, color: '#F8FAFC', stripe: false, size: 30, x: -260, y: -1350, z: 20, scrollFactor: 0.75 },
    ];

    const balls: BallEntity[] = ballConfig.map((cfg) => {
      const tex = createBilliardTexture(cfg.num, cfg.color, cfg.stripe);
      const mat = new THREE.MeshPhysicalMaterial({
        map: tex,
        roughness: 0.09,
        metalness: 0.04,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9,
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      const scale = cfg.size / 32;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      scene.add(mesh);

      return {
        mesh,
        initialX: cfg.x,
        initialY: cfg.y,
        initialZ: cfg.z,
        rotSpeedX: 0.006 + Math.random() * 0.008,
        rotSpeedY: 0.01 + Math.random() * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.004 + Math.random() * 0.004,
        orbitRadius: 12 + Math.random() * 16,
        scrollFactor: cfg.scrollFactor,
      };
    });

    // 7. Volumetric Golden Bokeh Dust Motes
    const moteCount = 200;
    const moteGeo = new THREE.BufferGeometry();
    const motePositions = new Float32Array(moteCount * 3);
    const moteSpeeds = new Float32Array(moteCount);

    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 1100;
      motePositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      motePositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      moteSpeeds[i] = 0.2 + Math.random() * 0.3;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));

    const createMoteTexture = () => {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(251, 191, 36, 1)');
      grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(c);
    };

    const moteMat = new THREE.PointsMaterial({
      size: 6,
      map: createMoteTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // 8. Scroll Tracking & Momentum Engine
    let targetScrollY = window.scrollY;
    let smoothScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      const delta = targetScrollY - lastScrollY;
      scrollVelocity = delta;
      lastScrollY = targetScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse Interactivity
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 9. Render Animation Loop with 360° Revolving Room + Balls Physics
    const animate = () => {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.08;
      scrollVelocity *= 0.92;

      // Parallax Camera movement based on scroll + mouse
      const targetCamY = -smoothScrollY * 0.45 + mouseY * 25;
      const targetCamX = mouseX * 35;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.lookAt(0, camera.position.y, 0);

      // Lights follow camera vertically
      overheadSun.position.y = camera.position.y + 500;
      warmPointLight.position.y = camera.position.y + 200;
      coolRimLight.position.y = camera.position.y - 150;

      // Animate Balls
      balls.forEach((b) => {
        b.orbitAngle += b.orbitSpeed;

        const floatX = Math.cos(b.orbitAngle) * b.orbitRadius;
        const floatY = Math.sin(b.orbitAngle * 1.3) * (b.orbitRadius * 0.8);
        const floatZ = Math.sin(b.orbitAngle * 0.7) * 12;

        b.mesh.position.x = b.initialX + floatX;
        b.mesh.position.y = b.initialY + floatY;
        b.mesh.position.z = b.initialZ + floatZ;

        const scrollSpin = scrollVelocity * 0.003 * b.scrollFactor;
        b.mesh.rotation.x += b.rotSpeedX + scrollSpin;
        b.mesh.rotation.y += b.rotSpeedY + scrollSpin * 0.5;
        b.mesh.rotation.z += b.rotSpeedZ;
      });

      // Animate Dust Motes
      const pos = moteGeo.attributes.position.array as Float32Array;
      const motesBaseY = camera.position.y;
      for (let i = 0; i < moteCount; i++) {
        pos[i * 3 + 1] += moteSpeeds[i] - scrollVelocity * 0.05;
        if (pos[i * 3 + 1] > motesBaseY + 800) {
          pos[i * 3 + 1] = motesBaseY - 800;
        } else if (pos[i * 3 + 1] < motesBaseY - 800) {
          pos[i * 3 + 1] = motesBaseY + 800;
        }
      }
      moteGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      moteGeo.dispose();
      moteMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
