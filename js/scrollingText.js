gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');
  const counterTrack = document.getElementById('counter-track');
  let currentFocusedIndex = 0;

  // Function to update counter display
  function updateCounter(index) {
    if (counterTrack && index !== currentFocusedIndex) {
      currentFocusedIndex = index;
      const offset = -index * 60; // Each number is 60px tall
      counterTrack.style.transform = `translateY(${offset}px)`;
    }
  }

  textItems.forEach((item, index) => {
    // Set initial state
    gsap.set(item, { opacity: 0.25, scale: 0.6, y: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 150%',
        end: 'top -50%',
        scrub: 3,
        onUpdate: (self) => {
          const progress = self.progress;

          // Opacity transition
          let opacity;
          if (progress < 0.3) {
            // Fading in from below
            opacity = 0.25 + (progress / 0.3) * 0.25;
          } else if (progress < 0.7) {
            // Main focus area
            opacity = 0.5 + ((progress - 0.3) / 0.4) * 0.5;
          } else {
            // Fading out as it passes
            opacity = 1 - ((progress - 0.7) / 0.3) * 0.5;
          }

          // Scale transition - creates wheel effect
          // Items start small (0.6) and scale up to full size (1.0) as they approach center
          let scale;
          if (progress < 0.5) {
            // Growing from 0.6 to 1.0 as it approaches center
            scale = 0.6 + (progress * 2) * 0.4;
          } else {
            // Shrinking from 1.0 back to 0.6 as it moves past center
            scale = 1.0 - ((progress - 0.5) * 2) * 0.4;
          }

          // Subtle parallax transform effect
          const yOffset = (progress - 0.5) * -8;

          gsap.to(item, {
            opacity: opacity,
            scale: scale,
            y: yOffset,
            duration: 0.5,
            ease: 'power1.out'
          });

          // Update counter when this item is in focus
          if (progress >= 0.4 && progress <= 0.6) {
            updateCounter(index);
          }
        }
      }
    });
  });
});
