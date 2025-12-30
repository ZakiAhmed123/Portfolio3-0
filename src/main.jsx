import React from 'react';
import { createRoot } from 'react-dom/client';
import MeshGradientCard from './MeshGradientCard';

const isMobileDevice = () => {
  const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const isSmallScreen = window.innerWidth < 768;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return isTouchOnly || isSmallScreen || isMobileUA;
};

const initMeshGradients = () => {
  if (isMobileDevice()) {
    console.log('Mobile device detected, skipping mesh gradients');
    return;
  }

  const containers = document.querySelectorAll('.mesh-gradient-container, .mesh-gradient-icon');

  containers.forEach((container, index) => {
    const parentId = container.closest('[id]')?.id || `gradient-${index}`;
    const containerRef = { current: container };
    const root = createRoot(container);

    root.render(<MeshGradientCard cardId={parentId} containerRef={containerRef} />);

    setTimeout(() => {
      container.classList.add('loaded');
    }, 100);
  });
};

if (typeof window !== 'undefined') {
  window.initMeshGradients = initMeshGradients;
}

export { initMeshGradients };
