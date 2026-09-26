import React, { useEffect, useRef, useState } from 'react';
import { AmbientSpatialMotionLayer } from './AmbientSpatialMotionLayer';

interface GlobalScrollVideoBackdropProps {
  videoSrc?: string;
  className?: string;
}

export const GlobalScrollVideoBackdrop: React.FC<GlobalScrollVideoBackdropProps> = ({
  videoSrc = '/assets/full_video_scrub.mp4',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Detect touch / mobile device for targeted 60fps/120fps hardware acceleration
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 0 && window.innerWidth < 1024));

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    // =========================================================================
    // MOBILE STRATEGY: Smooth 60fps continuous ambient loop (Zero touch-seek lag)
    // =========================================================================
    if (isMobile) {
      video.playbackRate = 1.0; // 100% full native 30 FPS, silky smooth!

      const handleMobileReady = () => {
        setIsVideoReady(true);
        video.play().catch(() => {});
      };

      video.addEventListener('loadedmetadata', handleMobileReady);
      video.addEventListener('canplay', handleMobileReady);
      if (video.readyState >= 2) {
        handleMobileReady();
      }

      return () => {
        video.removeEventListener('loadedmetadata', handleMobileReady);
        video.removeEventListener('canplay', handleMobileReady);
      };
    }

    // =========================================================================
    // DESKTOP STRATEGY: Responsive Scrubbing + FULL 1.0x FPS Idle Playback (No 0.4x lag!)
    // =========================================================================
    video.playbackRate = 1.0; // Silky smooth 30 FPS at all times!

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      if (video.duration) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoadedMetadata);
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let isUserScrolling = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    let animId: number;
    let isSeeking = false;
    let pendingTargetTime: number | null = null;
    let lastScrollY = window.scrollY;

    const performSeek = (time: number) => {
      if (!video || !video.duration || isNaN(video.duration)) return;

      const clampedTime = Math.max(0, Math.min(time, video.duration - 0.05));
      if (Math.abs(video.currentTime - clampedTime) < 0.02) return;

      if (isSeeking) {
        pendingTargetTime = clampedTime;
        return;
      }

      isSeeking = true;
      try {
        if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
          (video as any).fastSeek(clampedTime);
        } else {
          video.currentTime = clampedTime;
        }
      } catch {
        video.currentTime = clampedTime;
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTargetTime !== null) {
        const next = pendingTargetTime;
        pendingTargetTime = null;
        performSeek(next);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);

      // Filter out micro 1px jitter
      if (delta < 2) return;
      lastScrollY = currentScrollY;

      isUserScrolling = true;
      video.pause(); // Pause ambient playback while actively wheeling

      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      targetProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      // After user stops scrolling for 250ms, resume smooth 1.0x native playback!
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isUserScrolling = false;
        video.playbackRate = 1.0; // Full 30 FPS! No more 0.4x slideshow stutter!
        video.play().catch(() => {});
      }, 250);
    };

    const updateFrame = () => {
      if (video.duration && !isNaN(video.duration)) {
        if (isUserScrolling) {
          // Responsive 0.25 lerp for snappy, instant tracking
          currentProgress += (targetProgress - currentProgress) * 0.25;
          const targetTime = currentProgress * video.duration;
          performSeek(targetTime);
        }
      }

      animId = requestAnimationFrame(updateFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      clearTimeout(idleTimer);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#070605] ${className}`}
    >
      {/* 1. Full-Screen Hardware-Accelerated Video Layer (scale 1.035 hides AI watermark off bottom-right edge cleanly) */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover object-[65%_center] sm:object-center transition-opacity duration-700 ${
          isVideoReady ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          filter: 'contrast(1.15) brightness(0.84) saturate(1.18)',
          transform: 'scale(1.035) translateZ(0)',
          willChange: 'transform',
        }}
      />

      {/* 2. 3D Spatial Motion Graphics Layer (floating golden embers, holographic code runes, mouse parallax) */}
      <AmbientSpatialMotionLayer />

      {/* 3. Global Atmospheric Contrast Vignette (Guarantees crisp readability of white/gold text over video) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 95% 90% at 50% 50%, rgba(7, 6, 5, 0.12) 0%, rgba(7, 6, 5, 0.35) 60%, rgba(7, 6, 5, 0.7) 100%)',
        }}
      />

      {/* 4. Subtle Warm Ambient Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.05) 0%, transparent 35%, transparent 70%, rgba(245, 158, 11, 0.05) 100%)',
        }}
      />
    </div>
  );
};
