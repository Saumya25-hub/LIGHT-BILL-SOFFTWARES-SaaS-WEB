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
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 4000);
    camera.position.set(0, 0, 520);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. High-Quality Radial Particle Texture Generator
    const createStarTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(232, 210, 255, 0.95)');
      grad.addColorStop(0.55, 'rgba(168, 85, 247, 0.45)');
      grad.addColorStop(0.85, 'rgba(99, 102, 241, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };

    const starTexture = createStarTexture();

    // 3. Volumetric Deep-Space Starfield (Spanning full vertical scroll range: Y: +800 to -2800)
    const starCount = 6500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color('#c084fc'), // Lavender purple
      new THREE.Color('#a855f7'), // Deep purple
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#38bdf8'), // Electric cyan
      new THREE.Color('#f472b6'), // Rose
      new THREE.Color('#fbbf24'), // Warm gold
      new THREE.Color('#ffffff'), // Pure white
      new THREE.Color('#4ade80'), // Emerald spark
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      const verticalY = (Math.random() * 3800) - 2800; // From +1000 down to -2800
      const radius = Math.pow(Math.random(), 1.2) * 1100 + 60;
      const angle = Math.random() * Math.PI * 2;
      const zPos = (Math.random() - 0.5) * 2200;

      starPositions[i3] = Math.cos(angle) * radius;
      starPositions[i3 + 1] = verticalY;
      starPositions[i3 + 2] = zPos;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 5.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeo, starMaterial);
    scene.add(starPoints);

    // 4. Ethereal Fiber-Optic Cosmic Data Filaments (No flat ribbons / No "patti"!)
    const curvesGroup = new THREE.Group();
    scene.add(curvesGroup);

    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(260, 420, -180),
      new THREE.Vector3(420, 240, -40),
      new THREE.Vector3(560, 60, 40),
      new THREE.Vector3(720, -140, -60),
    ]);

    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-480, 140, -80),
      new THREE.Vector3(-240, -20, 30),
      new THREE.Vector3(-60, -120, 60),
      new THREE.Vector3(120, -60, 10),
    ]);

    const createFilamentLine = (curve: THREE.CatmullRomCurve3, color: string) => {
      const points = curve.getPoints(80);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(geo, mat);
    };

    curvesGroup.add(createFilamentLine(curve1, '#c084fc'));
    curvesGroup.add(createFilamentLine(curve2, '#38bdf8'));

    // 5. Streaming Glowing Particle Pulses along the Filaments
    const pulseCount = 200;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseColors = new Float32Array(pulseCount * 3);
    const pulseData: { curve: THREE.CatmullRomCurve3; t: number; speed: number }[] = [];

    const pulseCurves = [curve1, curve2];
    const pulseColorPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#4ade80'),
    ];

    for (let i = 0; i < pulseCount; i++) {
      const curve = pulseCurves[i % pulseCurves.length];
      const t = Math.random();
      const speed = 0.06 + Math.random() * 0.12;
      pulseData.push({ curve, t, speed });

      const p = curve.getPoint(t);
      pulsePositions[i * 3] = p.x;
      pulsePositions[i * 3 + 1] = p.y;
      pulsePositions[i * 3 + 2] = p.z;

      const c = pulseColorPalette[Math.floor(Math.random() * pulseColorPalette.length)];
      pulseColors[i * 3] = c.r;
      pulseColors[i * 3 + 1] = c.g;
      pulseColors[i * 3 + 2] = c.b;
    }

    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeo.setAttribute('color', new THREE.BufferAttribute(pulseColors, 3));

    const pulseMat = new THREE.PointsMaterial({
      size: 6.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulsePoints);

    // 6. Black Hole Accretion Disk (Positioned at Hero level, Y: 40)
    const diskGroup = new THREE.Group();
    diskGroup.position.set(-230, 40, 30);
    diskGroup.rotation.x = 0.52;
    diskGroup.rotation.y = 0.65;
    diskGroup.rotation.z = -0.35;
    scene.add(diskGroup);

    // Event Horizon Void
    const horizonGeo = new THREE.SphereGeometry(40, 32, 32);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    diskGroup.add(horizonMesh);

    // Glowing Photon Sphere Ring
    const haloGeo = new THREE.RingGeometry(42, 54, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    diskGroup.add(haloMesh);

    // Swirling High-Speed Plasma Sparks
    const plasmaCount = 2200;
    const plasmaGeo = new THREE.BufferGeometry();
    const plasmaPos = new Float32Array(plasmaCount * 3);
    const plasmaColors = new Float32Array(plasmaCount * 3);
    const plasmaVelocities = new Float32Array(plasmaCount);

    const plasmaPalette = [
      new THREE.Color('#ff4500'),
      new THREE.Color('#ffa500'),
      new THREE.Color('#ffd700'),
      new THREE.Color('#ff8c00'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < plasmaCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 125 + 46;
      plasmaPos[i3] = Math.cos(angle) * r;
      plasmaPos[i3 + 1] = (Math.random() - 0.5) * (r * 0.15);
      plasmaPos[i3 + 2] = Math.sin(angle) * r;

      const c = plasmaPalette[Math.floor(Math.random() * plasmaPalette.length)];
      plasmaColors[i3] = c.r;
      plasmaColors[i3 + 1] = c.g;
      plasmaColors[i3 + 2] = c.b;

      plasmaVelocities[i] = (1 / Math.sqrt(r)) * 2.1;
    }

    plasmaGeo.setAttribute('position', new THREE.BufferAttribute(plasmaPos, 3));
    plasmaGeo.setAttribute('color', new THREE.BufferAttribute(plasmaColors, 3));

    const plasmaMaterial = new THREE.PointsMaterial({
      size: 5.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const plasmaPoints = new THREE.Points(plasmaGeo, plasmaMaterial);
    diskGroup.add(plasmaPoints);

    // 7. Floating 3D Geometric Space Nodes along the vertical descent
    const icosaGroup = new THREE.Group();
    scene.add(icosaGroup);

    const createWireframeNode = (x: number, y: number, z: number, size: number, color: string) => {
      const geo = new THREE.IcosahedronGeometry(size, 1);
      const wireframe = new THREE.WireframeGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.LineSegments(wireframe, mat);
      mesh.position.set(x, y, z);
      return mesh;
    };

    const node1 = createWireframeNode(280, -350, -250, 56, '#c084fc');
    const node2 = createWireframeNode(-320, -780, -350, 68, '#38bdf8');
    const node3 = createWireframeNode(290, -1200, -300, 62, '#4ade80');
    const node4 = createWireframeNode(-280, -1700, -400, 75, '#f472b6');
    const node5 = createWireframeNode(250, -2300, -350, 80, '#fbbf24');
    icosaGroup.add(node1, node2, node3, node4, node5);

    // 8. Secondary Nebula Swirl at Footer/Playground Level (Y: -2200)
    const nebulaGroup = new THREE.Group();
    nebulaGroup.position.set(200, -2200, -200);
    scene.add(nebulaGroup);

    const nebulaCount = 1200;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.8) * 350;
      nebulaPos[i3] = Math.cos(angle) * r;
      nebulaPos[i3 + 1] = (Math.random() - 0.5) * 80;
      nebulaPos[i3 + 2] = Math.sin(angle) * r;

      const c = i % 2 === 0 ? new THREE.Color('#818cf8') : new THREE.Color('#c084fc');
      nebulaColors[i3] = c.r;
      nebulaColors[i3 + 1] = c.g;
      nebulaColors[i3 + 2] = c.b;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
      size: 6.0,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebulaPoints = new THREE.Points(nebulaGeo, nebulaMat);
    nebulaGroup.add(nebulaPoints);

    // 9. Dynamic Mouse Parallax & Continuous Full-Page Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let scrollY = 0;
    let targetCameraY = 0;
    let currentCameraY = 0;
    let targetCameraZ = 520;
    let currentCameraZ = 520;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.35;
      targetRotationX = mouseY * 0.25;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      ) - window.innerHeight;

      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      targetCameraY = -progress * 2400;
      targetCameraZ = 520 - progress * 150;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      handleScroll();
    };

    window.addEventListener('resize', handleResize);
    handleScroll();

    // 10. Animation Loop (Continuous 60 FPS WebGL Motion Across Whole Page)
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth inertia interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentCameraY += (targetCameraY - currentCameraY) * 0.08;
      currentCameraZ += (targetCameraZ - currentCameraZ) * 0.08;

      camera.position.y = currentCameraY + currentRotationX * 50;
      camera.position.x = currentRotationY * 70;
      camera.position.z = currentCameraZ;
      camera.lookAt(0, currentCameraY - 30, currentCameraZ - 500);

      // Continuous 3D Starfield Rotation
      starPoints.rotation.y += delta * 0.05;
      starPoints.rotation.x += delta * 0.012;

      // Update Fiber-Optic Data Pulse Light Packets along Curves
      const pulsePos = pulseGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < pulseCount; i++) {
        const p = pulseData[i];
        p.t = (p.t + delta * p.speed) % 1;
        const pt = p.curve.getPoint(p.t);
        const i3 = i * 3;
        pulsePos[i3] = pt.x;
        pulsePos[i3 + 1] = pt.y;
        pulsePos[i3 + 2] = pt.z;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      // Relativistic Black Hole Rotation
      diskGroup.rotation.z += delta * 0.35;
      haloMesh.rotation.z -= delta * 0.2;

      // Lower Nebula Rotation
      nebulaGroup.rotation.y += delta * 0.12;

      // Geometric Nodes Tumble
      node1.rotation.x += delta * 0.35;
      node1.rotation.y += delta * 0.25;
      node2.rotation.y += delta * 0.3;
      node2.rotation.z += delta * 0.2;
      node3.rotation.x -= delta * 0.25;
      node3.rotation.z += delta * 0.35;
      node4.rotation.y += delta * 0.22;
      node5.rotation.x += delta * 0.28;

      // Keplerian Plasma Orbit
      const pPositions = plasmaGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < plasmaCount; i++) {
        const i3 = i * 3;
        const vel = plasmaVelocities[i];
        let curX = pPositions[i3];
        let curZ = pPositions[i3 + 2];
        const r = Math.sqrt(curX * curX + curZ * curZ);
        let curAngle = Math.atan2(curZ, curX);

        curAngle += vel * delta * 2.4;
        pPositions[i3] = Math.cos(curAngle) * r;
        pPositions[i3 + 2] = Math.sin(curAngle) * r;
      }
      plasmaGeo.attributes.position.needsUpdate = true;

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
      starGeo.dispose();
      starMaterial.dispose();
      plasmaGeo.dispose();
      plasmaMaterial.dispose();
      starTexture.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
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
