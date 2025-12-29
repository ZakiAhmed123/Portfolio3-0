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

  const cardIds = ['cs1', 'cs2', 'cs3', 'cs4', 'nethealth'];

  cardIds.forEach(cardId => {
    const cardElement = document.getElementById(cardId);
    if (!cardElement) {
      console.warn(`Card element ${cardId} not found`);
      return;
    }

    const container = cardElement.querySelector('.mesh-gradient-container');
    if (!container) {
      console.warn(`Mesh gradient container not found for ${cardId}`);
      return;
    }

    const containerRef = { current: container };
    const root = createRoot(container);

    root.render(<MeshGradientCard cardId={cardId} containerRef={containerRef} />);

    setTimeout(() => {
      container.classList.add('loaded');
    }, 100);
  });
};

if (typeof window !== 'undefined') {
  window.initMeshGradients = initMeshGradients;
}

export { initMeshGradients };
