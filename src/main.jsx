import React from 'react';
import { createRoot } from 'react-dom/client';
import MeshGradientCard from './MeshGradientCard';
import TestimonialsCarousel from './TestimonialsCarousel';


const initMeshGradients = (selector) => {
  const defaultSelector = '.mesh-gradient-container, .mesh-gradient-icon, .carousel-mesh-background';
  const containers = document.querySelectorAll(selector || defaultSelector);

  containers.forEach((container, index) => {
    if (container.dataset.meshInitialized) return;
    container.dataset.meshInitialized = 'true';

    const parentId = container.closest('[id]')?.id || `gradient-${index}`;
    const containerRef = { current: container };
    const root = createRoot(container);

    root.render(<MeshGradientCard cardId={parentId} containerRef={containerRef} />);

    setTimeout(() => {
      container.classList.add('loaded');
    }, 100);
  });
};

const initTestimonialsCarousel = () => {
  const container = document.getElementById('testimonials-carousel-root');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = 'true';
  const root = createRoot(container);
  root.render(<TestimonialsCarousel />);
};

if (typeof window !== 'undefined') {
  window.initMeshGradients = initMeshGradients;
  window.initTestimonialsCarousel = initTestimonialsCarousel;
}

export { initMeshGradients, initTestimonialsCarousel };
