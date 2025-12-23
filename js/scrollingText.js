import { gsap } from './GSAP/index.js';

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');
  const counterTrack = document.getElementById('counter-track');
  let currentFocusedIndex = -1;

  function updateCounter(index) {
    if (counterTrack && index !== currentFocusedIndex) {
      currentFocusedIndex = index;
      const offset = -index * 60;
      counterTrack.style.transform = `translateY(${offset}px)`;
    }
  }

  function updateLyrics() {
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    textItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestIndex = index;
      }
    });

    textItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
      const maxDistance = window.innerHeight * 0.5;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      const isFocused = index === closestIndex;

      let opacity, blur;

      if (isFocused) {
        opacity = 1;
        blur = 0;
      } else {
        opacity = Math.max(0.3, 1 - normalizedDistance * 0.7);
        blur = Math.min(normalizedDistance * 8, 8);
      }

      gsap.to(item, {
        opacity: opacity,
        filter: `blur(${blur}px)`,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    updateCounter(closestIndex);
  }

  textItems.forEach((item) => {
    gsap.set(item, { opacity: 0.3, filter: 'blur(8px)' });
  });

  updateLyrics();

  window.addEventListener('scroll', updateLyrics, { passive: true });
});
