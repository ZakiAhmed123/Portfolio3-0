gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // ✅ Desktop and tablet (769px and up)
  "(min-width: 769px)": function () {
    const scrollSection = document.querySelectorAll(".scroll-section");

    scrollSection.forEach((section) => {
      const wrapper = section.querySelector(".wrapper");
      const items = wrapper.querySelectorAll(".item");

      // Set initial states - all items hidden except first
      items.forEach((item, index) => {
        item.style.zIndex = `${index}`;
        if (index === 0) {
          gsap.set(item, { opacity: 1, yPercent: 0 });
        } else {
          gsap.set(item, { opacity: 0, yPercent: 100 });
        }
      });

      // Calculate scroll distance for each item
      const scrollDistance = items.length * 100;

      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top 20%",
        end: `+=${scrollDistance}%`,
        invalidateOnRefresh: true,
      });

      // Create discrete transitions for each item
      items.forEach((item, index) => {
        if (index < items.length - 1) {
          const nextItem = items[index + 1];
          const startProgress = (index / items.length) * 100;
          const endProgress = ((index + 1) / items.length) * 100;

          ScrollTrigger.create({
            trigger: section,
            start: `top+=${startProgress}% 20%`,
            end: `top+=${endProgress}% 20%`,
            onEnter: () => {
              gsap.to(item, { opacity: 0, yPercent: -20, duration: 0.6, ease: "power2.inOut" });
              gsap.to(nextItem, { opacity: 1, yPercent: 0, duration: 0.6, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(item, { opacity: 1, yPercent: 0, duration: 0.6, ease: "power2.out" });
              gsap.to(nextItem, { opacity: 0, yPercent: 100, duration: 0.6, ease: "power2.inOut" });
            },
          });
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

// About Me heading fade-in
gsap.fromTo("body > h2",
  {
    opacity: 0,
    y: 30
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-me-section",
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  }
);

// About Me quote container fade-in
gsap.fromTo(".quote-container",
  {
    opacity: 0,
    x: -50
  },
  {
    opacity: 1,
    x: 0,
    duration: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about-section",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
);

// About Me headshot fade-in
gsap.fromTo(".headshot-container",
  {
    opacity: 0,
    x: 50
  },
  {
    opacity: 1,
    x: 0,
    duration: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about-section",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    delay: 0.2
  }
);

// Logo Marquee subtitle fade-in
gsap.fromTo(".logo-grid-subtitle",
  {
    opacity: 0,
    y: 30
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#marquee-section",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
);

// Staggered fade-in for logo grid items
gsap.utils.toArray(".logo-wrapper").forEach((logo, index) => {
  gsap.fromTo(logo,
    {
      opacity: 0,
      y: 30
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".logo-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.08
    }
  );
});

// Experience section title fade-in
gsap.fromTo("#experience h2",
  {
    opacity: 0,
    y: 50
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#experience",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
);

// Staggered fade-in for each experience item
gsap.utils.toArray(".experience-item").forEach((item, index) => {
  gsap.fromTo(item,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.1
    }
  );
});

// Staggered fade-in for each chip
gsap.utils.toArray(".chip").forEach((chip, index) => {
  gsap.fromTo(chip,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".content .d-flex",
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.1
    }
  );
});

// Case Studies heading fade-in
gsap.fromTo(".content > h2",
  {
    opacity: 0,
    y: 30
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".content > h2",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  }
);

// Footer divider fade-in
gsap.fromTo(".footer-divider",
  {
    opacity: 0,
    scaleX: 0
  },
  {
    opacity: 1,
    scaleX: 1,
    duration: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  }
);

// Staggered fade-in for footer items
gsap.utils.toArray(".footer-item").forEach((item, index) => {
  gsap.fromTo(item,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: 0.2 + (index * 0.1)
    }
  );
});
