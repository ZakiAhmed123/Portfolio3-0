import { gsap } from './GSAP/gsap-core.js';
import { ScrollTrigger } from './GSAP/scrolltrigger.js';

gsap.registerPlugin(ScrollTrigger);

function setupKaraokeSection(sectionId, containerId, itemClass, cardId) {
  const section = document.getElementById(sectionId);
  const container = document.getElementById(containerId);
  const items = document.querySelectorAll(`.${itemClass}`);
  const card = document.getElementById(cardId);

  if (!section || !container || items.length === 0) return;

  const itemSpacing = 80;
  const totalItems = items.length;

  function updateItemStyles(progress) {
    const activeIndex = Math.min(Math.floor(progress * totalItems), totalItems - 1);
    const progressWithinItem = (progress * totalItems) - activeIndex;

    items.forEach((item, index) => {
      const distance = index - activeIndex;
      const adjustedDistance = distance - progressWithinItem;

      let blur = 0;
      let opacity = 1;

      if (Math.abs(adjustedDistance) < 0.5) {
        blur = 0;
        opacity = 1;
      } else {
        const absDistance = Math.abs(adjustedDistance);
        blur = Math.min(absDistance * 4, 12);
        opacity = Math.max(1 - (absDistance * 0.25), 0.3);
      }

      gsap.set(item, {
        filter: `blur(${blur}px)`,
        opacity: opacity
      });
    });

    const centerOffset = container.parentElement.offsetHeight / 2;
    const firstItemOffset = items[0].offsetHeight / 2;
    const scrollAmount = progress * (totalItems - 1) * (items[0].offsetHeight + itemSpacing);
    const translateY = centerOffset - firstItemOffset - scrollAmount;

    gsap.set(container, {
      y: translateY
    });
  }

  updateItemStyles(0);

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      updateItemStyles(self.progress);
    }
  });

  if (card) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: card,
      pinSpacing: false
    });
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    setupKaraokeSection('scrolling-section', 'text-container', 'scroll-text-item', 'fixed-card');
    setupKaraokeSection('scrolling-section-2', 'text-container-2', 'scroll-text-item-2', 'fixed-card-2');
    ScrollTrigger.refresh();
  }, 500);
});
