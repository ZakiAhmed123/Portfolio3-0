gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 2,
  effects: true,
  smoothTouch: 0.1,
  normalizeScroll: true
});
