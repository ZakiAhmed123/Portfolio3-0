gsap.registerPlugin(ScrollSmoother);

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 2.5,
  effects: true,
  smoothTouch: 0.1,
  speed: 0.7,
  normalizeScroll: true,
  ease: 'power2.out'
});
