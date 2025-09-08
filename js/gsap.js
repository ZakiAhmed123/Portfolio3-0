gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // ✅ Desktop and tablet (769px and up)
  "(min-width: 769px)": function () {
    const scrollSection = document.querySelectorAll(".scroll-section");

    scrollSection.forEach((section) => {
      const wrapper = section.querySelector(".wrapper");
      const items = wrapper.querySelectorAll(".item");

      // Layering: newer items on top
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

  // ❌ Mobile (768px and below)
  "(max-width: 768px)": function () {
    // No scroll animation
  }
});

// ✅ Ensure everything recalculates after full page load
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// Also recalculate on window resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
