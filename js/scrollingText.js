import { gsap } from './GSAP/index.js';
import { ScrollTrigger } from './GSAP/scrolltrigger.js';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');
  const counterTrack = document.getElementById('counter-track');
  let currentFocusedIndex = -1;

  // Function to update counter display
  function updateCounter(index) {
    if (counterTrack && index !== currentFocusedIndex) {
      currentFocusedIndex = index;
      const offset = -index * 60; // Each number is 60px tall
      counterTrack.style.transform = `translateY(${offset}px)`;
    }
  }

  textItems.forEach((item, index) => {
    // Set initial state - completely hidden
    gsap.set(item, { opacity: 0, y: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'center center',
        end: 'center top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Fade in as approaching center, fade out after passing center
          let opacity;
          if (progress < 0.5) {
            // Fading in (0 to center)
            opacity = progress * 2; // 0 to 1
          } else {
            // Fading out (center to end)
            opacity = (1 - progress) * 2; // 1 to 0
          }

          gsap.to(item, {
            opacity: opacity,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Update counter when item is at center (peak visibility)
          if (progress >= 0.4 && progress <= 0.6) {
            updateCounter(index);
          }
        }
      }
    });
  });
});
