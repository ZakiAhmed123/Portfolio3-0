import React, { useEffect, useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

const COLOR_CONFIGS = {
  cs1: {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    wireframe: false
  },
  cs2: {
    colors: ['#A8E6CF', '#FFD3B6', '#FFAAA5', '#FF8B94'],
    wireframe: false
  },
  cs3: {
    colors: ['#667EEA', '#764BA2', '#F093FB', '#4FACFE'],
    wireframe: false
  },
  cs4: {
    colors: ['#FFA07A', '#FA8BFF', '#2BD2FF', '#2BFF88'],
    wireframe: false
  }
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

  const config = COLOR_CONFIGS[cardId] || COLOR_CONFIGS.cs1;

  return (
    <ErrorBoundary fallback={null}>
      {isVisible && isActive && (
        <>
          <PerformanceMonitor onPerformanceIssue={handlePerformanceIssue} />
          <div ref={meshRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <MeshGradient
              colors={config.colors}
              speed={1.58}
              scale={0.81}
              distortion={0.8}
              swirl={0.72}
              wireframe={config.wireframe}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </>
      )}
    </ErrorBoundary>
  );
};

export default MeshGradientCard;
