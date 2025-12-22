gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1,
  effects: true,
  smoothTouch: 0.1,
  normalizeScroll: true
});
