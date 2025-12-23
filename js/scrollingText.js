import { gsap } from './GSAP/gsap-core.js';
import { ScrollTrigger } from './GSAP/scrolltrigger.js';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  setTimeout(() => {
    const textItems = document.querySelectorAll('.scroll-text-item');
    const fixedCard = document.getElementById('fixed-card');
    const scrollingSection = document.getElementById('scrolling-section');

    gsap.set(textItems, { opacity: 0.2, filter: 'blur(4px)' });

    if (textItems.length > 0) {
      gsap.set(textItems[0], { opacity: 1, filter: 'blur(0px)' });
    }

    if (fixedCard && scrollingSection) {
      ScrollTrigger.create({
        trigger: scrollingSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: fixedCard,
        pinSpacing: false
      });
    }

    textItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        end: 'top 40%',
        onEnter: () => {
          gsap.to(textItems, { opacity: 0.2, filter: 'blur(4px)', duration: 0.5, ease: 'power2.out' });
          gsap.to(item, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' });
        },
        onEnterBack: () => {
          gsap.to(textItems, { opacity: 0.2, filter: 'blur(4px)', duration: 0.5, ease: 'power2.out' });
          gsap.to(item, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' });
        }
      });
    });

    ScrollTrigger.refresh();
  }, 500);
});
