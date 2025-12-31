import React, { useEffect, useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

const BASE_COLORS = ['#A67B84', '#76597F', '#D4835F', '#5D907B'];

const BASE_SPEED = 1.58;
const BASE_DISTORTION = 0.8;
const BASE_SWIRL = 0.72;

const GRADIENT_VARIATIONS = {
  cs1: { speedMod: 1.0, distortionMod: 1.0, swirlMod: 1.0 },
  cs2: { speedMod: 1.08, distortionMod: 0.95, swirlMod: 1.06 },
  cs3: { speedMod: 0.94, distortionMod: 1.07, swirlMod: 0.93 },
  cs4: { speedMod: 1.05, distortionMod: 0.92, swirlMod: 1.09 },
  nethealth: { speedMod: 0.97, distortionMod: 1.04, swirlMod: 0.96 },
  'gradient-0': { speedMod: 1.03, distortionMod: 0.98, swirlMod: 1.02 },
  'gradient-1': { speedMod: 0.92, distortionMod: 1.06, swirlMod: 0.94 },
  'gradient-2': { speedMod: 1.07, distortionMod: 0.93, swirlMod: 1.08 },
  'gradient-3': { speedMod: 0.95, distortionMod: 1.02, swirlMod: 0.91 },
  'gradient-4': { speedMod: 1.04, distortionMod: 0.96, swirlMod: 1.05 },
  'gradient-5': { speedMod: 0.98, distortionMod: 1.09, swirlMod: 0.97 },
  'gradient-6': { speedMod: 1.06, distortionMod: 0.91, swirlMod: 1.03 },
};

const getVariation = (cardId) => {
  if (GRADIENT_VARIATIONS[cardId]) {
    return GRADIENT_VARIATIONS[cardId];
  }
  const hash = cardId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    speedMod: 0.9 + (hash % 20) / 100,
    distortionMod: 0.9 + ((hash * 7) % 20) / 100,
    swirlMod: 0.9 + ((hash * 13) % 20) / 100,
  };
};

const PerformanceMonitor = ({ onPerformanceIssue }) => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;
    const startTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        frameCount = 0;
        lastTime = currentTime;

        if (fps < 30 && (currentTime - startTime) < 2000) {
          onPerformanceIssue();
          return;
        }
      }

      if (currentTime - startTime < 2000) {
        animationId = requestAnimationFrame(checkPerformance);
      }
    };

    animationId = requestAnimationFrame(checkPerformance);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [onPerformanceIssue]);

  return null;
};

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      if (error.message?.includes('WebGL') || error.message?.includes('shader')) {
        setHasError(true);
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
};

const MeshGradientCard = ({ cardId, containerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [hasPerformanceIssue, setHasPerformanceIssue] = useState(false);
  const meshRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('meshGradientDisabled');
    if (stored === 'true') {
      setHasPerformanceIssue(true);
    }
  }, []);

  const handlePerformanceIssue = () => {
    console.warn(`Performance issue detected for ${cardId}, disabling mesh gradient`);
    sessionStorage.setItem('meshGradientDisabled', 'true');
    setHasPerformanceIssue(true);
  };

  if (hasPerformanceIssue) {
    return null;
  }

  const variation = getVariation(cardId);
  const speed = BASE_SPEED * variation.speedMod;
  const distortion = BASE_DISTORTION * variation.distortionMod;
  const swirl = BASE_SWIRL * variation.swirlMod;

  return (
    <ErrorBoundary fallback={null}>
      {isVisible && isActive && (
        <>
          <PerformanceMonitor onPerformanceIssue={handlePerformanceIssue} />
          <div ref={meshRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <MeshGradient
              colors={BASE_COLORS}
              speed={speed}
              scale={0.81}
              distortion={distortion}
              swirl={swirl}
              wireframe={false}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
        </>
      )}
    </ErrorBoundary>
  );
};

export default MeshGradientCard;
