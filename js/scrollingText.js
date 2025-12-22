gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');

  textItems.forEach((item, index) => {
    // Set initial state - all items visible but dimmed
    gsap.set(item, { opacity: 0.25, y: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 4,
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
          const yOffset = (progress - 0.5) * -15;

          gsap.to(item, {
            opacity: opacity,
            y: yOffset,
            duration: 0.5,
            ease: 'power1.out'
          });
        }
      }
    });
  });
});
