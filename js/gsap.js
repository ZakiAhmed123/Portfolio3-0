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

// Fade-in animations for about me and logo marquee sections
gsap.registerPlugin(ScrollTrigger);

// About Me section fade-in
gsap.fromTo("#about-section", 
  {
    opacity: 0,
    y: 50
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#about-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  }
);

// Logo Marquee section fade-in
gsap.fromTo("#marquee-section", 
  {
    opacity: 0,
    y: 50
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#marquee-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  }
);
