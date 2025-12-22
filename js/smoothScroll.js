import { gsap } from "./GSAP/gsap-core.js";
import { ScrollTrigger } from "./GSAP/ScrollTrigger.js";
import { ScrollSmoother } from "./GSAP/ScrollSmoother.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});
