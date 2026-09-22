import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicCanvas3DProps {
  className?: string;
}

export const CosmicCanvas3D: React.FC<CosmicCanvas3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 0, 450);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background to blend seamlessly
    container.appendChild(renderer.domElement);

    // 2. Cosmic Galaxy Particle Swirl (3,500 Stars)
    const galaxyCount = 3500;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);
    const galaxyScales = new Float32Array(galaxyCount);

    const colorPalette = [
      new THREE.Color('#c084fc'), // Lavender purple
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#38bdf8'), // Sky blue
      new THREE.Color('#f472b6'), // Soft rose
      new THREE.Color('#ffffff'), // Pure star white
    ];

    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      // Spiral galaxy distribution
      const radius = Math.pow(Math.random(), 1.5) * 800 + 30;
      const spinAngle = radius * 0.005;
      const branchAngle = ((i % 4) * ((2 * Math.PI) / 4)) + spinAngle;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 60;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 60;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 60;

      galaxyPositions[i3] = Math.cos(branchAngle) * radius + randomX;
      galaxyPositions[i3 + 1] = randomY * 1.5;
      galaxyPositions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

      const mixedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;

      galaxyScales[i] = Math.random() * 2.5 + 0.5;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

    // Particle sprite using canvas texture
    const createStarTexture = () => {
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(200, 180, 255, 0.8)');
      grad.addColorStop(0.8, 'rgba(120, 80, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(c);
    };

    const starTexture = createStarTexture();

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMaterial);
    galaxyPoints.position.set(-80, 20, -100);
    galaxyPoints.rotation.x = 0.45;
    galaxyPoints.rotation.z = -0.25;
    scene.add(galaxyPoints);

    // 3. Black Hole Accretion Disk (Relativistic Rotating Glowing Plasma Rings)
    const diskGroup = new THREE.Group();
    // Position it at the left coordinates matching the artwork's black hole
    diskGroup.position.set(-220, 40, 20);
    diskGroup.rotation.x = 0.52;
    diskGroup.rotation.y = 0.65;
    diskGroup.rotation.z = -0.35;
    scene.add(diskGroup);

    // Event Horizon (Pure Black Void Sphere)
    const horizonGeo = new THREE.SphereGeometry(38, 32, 32);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    diskGroup.add(horizonMesh);

    // Photon Sphere & Gravitational Lensing Halo
    const haloGeo = new THREE.RingGeometry(39, 48, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffaa44,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    diskGroup.add(haloMesh);

    // Outer Swirling Accretion Particles (1,800 High-Speed Plasma Sparks)
    const plasmaCount = 1800;
    const plasmaGeo = new THREE.BufferGeometry();
    const plasmaPos = new Float32Array(plasmaCount * 3);
    const plasmaColors = new Float32Array(plasmaCount * 3);
    const plasmaVelocities = new Float32Array(plasmaCount);

    const plasmaPalette = [
      new THREE.Color('#ff4500'), // Fiery orange red
      new THREE.Color('#ffa500'), // Glowing amber
      new THREE.Color('#ffd700'), // Hot plasma gold
      new THREE.Color('#ff8c00'), // Dark orange
      new THREE.Color('#ffffff'), // Relativistic blue/white edge
    ];

    for (let i = 0; i < plasmaCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 110 + 44; // From horizon to outer disk
      plasmaPos[i3] = Math.cos(angle) * r;
      plasmaPos[i3 + 1] = (Math.random() - 0.5) * (r * 0.12); // Disc thickness
      plasmaPos[i3 + 2] = Math.sin(angle) * r;

      const c = plasmaPalette[Math.floor(Math.random() * plasmaPalette.length)];
      plasmaColors[i3] = c.r;
      plasmaColors[i3 + 1] = c.g;
      plasmaColors[i3 + 2] = c.b;

      // Keplerian relativistic orbital speed: closer = faster!
      plasmaVelocities[i] = (1 / Math.sqrt(r)) * 1.8;
    }

    plasmaGeo.setAttribute('position', new THREE.BufferAttribute(plasmaPos, 3));
    plasmaGeo.setAttribute('color', new THREE.BufferAttribute(plasmaColors, 3));

    const plasmaMaterial = new THREE.PointsMaterial({
      size: 5.0,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const plasmaPoints = new THREE.Points(plasmaGeo, plasmaMaterial);
    diskGroup.add(plasmaPoints);

    // 4. Floating 3D Code Streams on Left and Right (Matrix Columns in 3D Space)
    const codeGroup = new THREE.Group();
    scene.add(codeGroup);

    const createCodeColumn = (x: number, y: number, z: number, count: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const cols = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = x + (Math.random() - 0.5) * 8;
        pos[i * 3 + 1] = y - i * 14;
        pos[i * 3 + 2] = z + (Math.random() - 0.5) * 8;

        const isLead = i % 18 === 0;
        cols[i * 3] = isLead ? 1 : 0.6;
        cols[i * 3 + 1] = isLead ? 1 : 0.8;
        cols[i * 3 + 2] = isLead ? 1 : 1.0;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

      const mat = new THREE.PointsMaterial({
        size: 3.2,
        map: starTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(geo, mat);
    };

    const columns: THREE.Points[] = [];
    // Right side dense code streams (matching artwork)
    for (let c = 0; c < 14; c++) {
      const col = createCodeColumn(180 + c * 22, 280 + Math.random() * 80, -20 - c * 15, 45);
      codeGroup.add(col);
      columns.push(col);
    }
    // Left side subtle code streams
    for (let c = 0; c < 8; c++) {
      const col = createCodeColumn(-380 + c * 20, 240 + Math.random() * 60, -40 - c * 20, 35);
      codeGroup.add(col);
      columns.push(col);
    }

    // 5. Mouse Parallax & Scroll Physics (Kinetic Inertia like kage)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let scrollY = 0;
    let targetCameraZ = 450;
    let currentCameraZ = 450;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = mouseX * 0.45; // Camera yaw
      targetRotationX = mouseY * 0.35; // Camera pitch
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      // As user scrolls, travel deeper into space
      targetCameraZ = 450 - scrollY * 0.22;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop (60 FPS WebGL Runtime)
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth inertia lerp for 3D camera
      currentRotationX += (targetRotationX - currentRotationX) * 0.045;
      currentRotationY += (targetRotationY - currentRotationY) * 0.045;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.05;

      camera.position.z = currentCameraZ;
      camera.position.x = currentRotationY * 90;
      camera.position.y = currentRotationX * 60;
      camera.lookAt(0, 0, 0);

      // Continuous 3D Galaxy Rotation
      galaxyPoints.rotation.y += delta * 0.08;
      galaxyPoints.rotation.z += delta * 0.02;

      // Relativistic Black Hole Accretion Disk Rotation
      diskGroup.rotation.z += delta * 0.35;
      haloMesh.rotation.z -= delta * 0.2;

      // Plasma particle orbital motion
      const pPositions = plasmaGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < plasmaCount; i++) {
        const i3 = i * 3;
        const vel = plasmaVelocities[i];
        let currentX = pPositions[i3];
        let currentZ = pPositions[i3 + 2];
        const r = Math.sqrt(currentX * currentX + currentZ * currentZ);
        let curAngle = Math.atan2(currentZ, currentX);

        curAngle += vel * delta * 2.2;
        pPositions[i3] = Math.cos(curAngle) * r;
        pPositions[i3 + 2] = Math.sin(curAngle) * r;
      }
      plasmaGeo.attributes.position.needsUpdate = true;

      // Cascading Code Streams downward flow
      columns.forEach((col, idx) => {
        const cPos = col.geometry.attributes.position.array as Float32Array;
        const speed = 1.2 + (idx % 5) * 0.6;
        for (let i = 0; i < cPos.length / 3; i++) {
          cPos[i * 3 + 1] -= speed;
          if (cPos[i * 3 + 1] < -350) {
            cPos[i * 3 + 1] = 300 + Math.random() * 40;
          }
        }
        col.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      galaxyGeo.dispose();
      galaxyMaterial.dispose();
      plasmaGeo.dispose();
      plasmaMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{ overflow: 'hidden' }}
    />
  );
};
