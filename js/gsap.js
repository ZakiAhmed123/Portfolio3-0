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
