gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

let smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 2.5,
  effects: true,
  smoothTouch: 0.1,
  normalizeScroll: true
});

// Refresh ScrollTrigger after smoother is created
ScrollTrigger.refresh();
