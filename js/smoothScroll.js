import { gsap } from "./GSAP/gsap-core.js";
import { CSSPlugin } from "./GSAP/cssplugin.js";
import { ScrollTrigger } from "./GSAP/scrolltrigger.js";
import { ScrollSmoother } from "./GSAP/scrollsmoother.js";

gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollSmoother);

window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.ScrollSmoother = ScrollSmoother;

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true
});

setTimeout(() => {
  smoother.scrollTo(0, false);
  ScrollTrigger.refresh();
}, 200);

ScrollTrigger.matchMedia({
  "(min-width: 992px)": function () {
    const scrollSection = document.querySelectorAll(".scroll-section");

    scrollSection.forEach((section) => {
      const wrapper = section.querySelector(".wrapper");
      const items = wrapper.querySelectorAll(".item");

      items.forEach((item, index) => {
        item.style.zIndex = `${index}`;
        if (index !== 0) {
          gsap.set(item, { yPercent: 140 });
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 1,
          start: "top 20%",
          end: () => `+=${items.length * 100}%`,
          scrub: 2,
          invalidateOnRefresh: true,
        },
        defaults: {
          ease: "power3.in",
          duration: 3.5
        },
      });

      items.forEach((item, index) => {
        timeline.to(item, {
          scale: 1.0,
          borderRadius: "24px",
        });

        if (items[index + 1]) {
          const yOffset = (index + 1) * 5;
          timeline.to(items[index + 1], { yPercent: yOffset }, "<");
        }
      });
    });
  },

  "(max-width: 991px)": function () {
  }
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 800);
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
