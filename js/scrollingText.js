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
    // Set initial state - all items visible but dimmed
    gsap.set(item, { opacity: 0.25, y: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 8,
        onUpdate: (self) => {
          const progress = self.progress;

          // Smoother opacity transition with parallax feel
          let opacity;
          if (progress < 0.3) {
            // Fading in from below (upcoming lyric)
            opacity = 0.25 + (progress / 0.3) * 0.25;
          } else if (progress < 0.7) {
            // Main focus area (current lyric)
            opacity = 0.5 + ((progress - 0.3) / 0.4) * 0.5;
          } else {
            // Fading out as it passes
            opacity = 1 - ((progress - 0.7) / 0.3) * 0.5;
          }

          // Parallax transform effect - slow vertical movement
          const yOffset = (progress - 0.5) * -8;

          gsap.to(item, {
            opacity: opacity,
            y: yOffset,
            duration: 0.5,
            ease: 'power1.out'
          });

          // Update counter when this item is in focus (progress between 0.4 and 0.6 = peak focus)
          if (progress >= 0.4 && progress <= 0.6) {
            updateCounter(index);
          }
        }
      }
    });
  });
});
