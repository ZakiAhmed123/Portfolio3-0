window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);
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
    // Set initial state - completely hidden
    gsap.set(item, { opacity: 0, y: 50 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Simple fade in and stay visible
          let opacity;
          if (progress < 0.3) {
            // Fading in
            opacity = progress / 0.3;
          } else {
            // Stay visible
            opacity = 1.0;
          }

          // Simple slide up
          let y;
          if (progress < 0.3) {
            y = 50 - (progress / 0.3) * 50;
          } else {
            y = 0;
          }

          gsap.to(item, {
            opacity: opacity,
            y: y,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Update counter when this item is in view
          if (progress >= 0.3) {
            updateCounter(index);
          }
        }
      }
    });
  });
});
