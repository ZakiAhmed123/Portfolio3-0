gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1,
  effects: true
});
