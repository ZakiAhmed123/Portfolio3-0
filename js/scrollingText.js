gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');

  textItems.forEach((item, index) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress < 0.5) {
            const opacity = 0.7 + (progress * 2) * 0.3;
            gsap.to(item, {
              opacity: opacity,
              duration: 0.3,
              ease: 'none'
            });
          } else {
            const opacity = 1 - ((progress - 0.5) * 2) * 0.3;
            gsap.to(item, {
              opacity: opacity,
              duration: 0.3,
              ease: 'none'
            });
          }
        }
      }
    });
  });
});
