import { gsap } from './GSAP/index.js';
import { ScrollTrigger } from './GSAP/scrolltrigger.js';

gsap.registerPlugin(ScrollTrigger);

const square1 = document.getElementById('square-1');
const square2 = document.getElementById('square-2');
const square3 = document.getElementById('square-3');
const square4 = document.getElementById('square-4');

gsap.to(square2, {
  y: 100,
  ease: 'none',
  scrollTrigger: {
    trigger: square2,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to(square3, {
  y: 200,
  ease: 'none',
  scrollTrigger: {
    trigger: square3,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

gsap.to(square4, {
  y: 300,
  ease: 'none',
  scrollTrigger: {
    trigger: square4,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
