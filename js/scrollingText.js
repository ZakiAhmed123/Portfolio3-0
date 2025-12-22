gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const textItems = document.querySelectorAll('.scroll-text-item');
  const counterTrack = document.getElementById('counter-track');
  let currentFocusedIndex = 0;

  // Function to interpolate between two RGB colors
  function interpolateColor(color1, color2, t) {
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);

    const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
    const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
    const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);

    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to update counter display
  function updateCounter(index) {
    if (counterTrack && index !== currentFocusedIndex) {
      currentFocusedIndex = index;
      const offset = -index * 60; // Each number is 60px tall
      counterTrack.style.transform = `translateY(${offset}px)`;
    }
  }

  textItems.forEach((item, index) => {
    // Split text into words, then split each word into letters for ripple effect
    const text = item.textContent;
    item.innerHTML = '';

    // Split into words first
    const words = text.split(' ');
    const letters = [];

    words.forEach((word, wordIndex) => {
      // Create a wrapper for the word to keep it together
      const wordWrapper = document.createElement('span');
      wordWrapper.style.display = 'inline-block';
      wordWrapper.style.whiteSpace = 'nowrap';

      // Split the word into individual letters
      word.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.color = 'white';
        span.style.fontSize = '36px';
        span.style.fontWeight = '600';
        span.style.fontFamily = 'Inter';
        span.style.lineHeight = 'normal';
        wordWrapper.appendChild(span);
        letters.push(span);
      });

      item.appendChild(wordWrapper);

      // Add space between words (except after the last word)
      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(' ');
        item.appendChild(space);
      }
    });

    // Set initial state - all items visible but dimmed
    gsap.set(item, { opacity: 0.25, y: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 8,
        onUpdate: (self) => {
          const progress = self.progress;

          // Smoother opacity transition with parallax feel
          let opacity;
          if (progress < 0.3) {
            // Fading in from below (upcoming lyric)
            opacity = 0.25 + (progress / 0.3) * 0.25;
          } else if (progress < 0.7) {
            // Main focus area (current lyric)
            opacity = 0.5 + ((progress - 0.3) / 0.4) * 0.5;
          } else {
            // Fading out as it passes
            opacity = 1 - ((progress - 0.7) / 0.3) * 0.5;
          }

          // Parallax transform effect - slow vertical movement
          const yOffset = (progress - 0.5) * -8;

          gsap.to(item, {
            opacity: opacity,
            y: yOffset,
            duration: 0.5,
            ease: 'power1.out'
          });

          // Sequential ripple color animation - each letter completes before next starts
          letters.forEach((letter, letterIndex) => {
            // Each letter gets its own time slice of the total progress
            const letterTimeSlice = 1 / letters.length;
            const letterStartProgress = letterIndex * letterTimeSlice;
            const letterEndProgress = (letterIndex + 1) * letterTimeSlice;

            // Calculate progress within this letter's time window (0 to 1)
            let letterProgress = 0;
            if (progress >= letterStartProgress && progress <= letterEndProgress) {
              letterProgress = (progress - letterStartProgress) / letterTimeSlice;
            } else if (progress > letterEndProgress) {
              letterProgress = 1;
            }

            let color;
            if (letterProgress < 0.5) {
              // First half: white to green
              const t = letterProgress * 2;
              color = interpolateColor('rgb(255, 255, 255)', 'rgb(81, 141, 120)', t);
            } else {
              // Second half: green back to white
              const t = (letterProgress - 0.5) * 2;
              color = interpolateColor('rgb(81, 141, 120)', 'rgb(255, 255, 255)', t);
            }

            letter.style.color = color;
          });

          // Update counter when this item is in focus (progress between 0.4 and 0.6 = peak focus)
          if (progress >= 0.4 && progress <= 0.6) {
            updateCounter(index);
          }
        }
      }
    });
  });
});
