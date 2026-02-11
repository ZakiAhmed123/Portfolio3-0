// Hypothesis Square Animation System
// Automatically rotates through 3 animation items when square is visible

class HypothesisAnimation {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentItem = 0;
    this.items = [];
    this.isVisible = false;
    this.transitionDuration = 500; // ms
    this.itemDuration = 5000; // 5 seconds per item

    this.init();
  }

  init() {
    if (!this.container) return;

    // Create animation items
    this.createItems();

    // Set up intersection observer
    this.setupObserver();
  }

  createItems() {
    // Clear existing content
    this.container.innerHTML = '';

    // Make container relative for absolute positioning
    this.container.style.position = 'relative';
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';

    // Create permanent circles header
    this.createCirclesHeader();

    // Create content area for animations
    this.contentArea = document.createElement('div');
    this.contentArea.className = 'hypothesis-content-area';
    this.contentArea.style.position = 'relative';
    this.contentArea.style.flex = '1';
    this.contentArea.style.width = '100%';
    this.container.appendChild(this.contentArea);

    // Item 1 - Placeholder
    const item1 = this.createItem1();
    this.items.push(item1);

    // Item 2 - Typography hierarchy animation
    const item2 = this.createItem2();
    this.items.push(item2);

    // Item 3 - Placeholder
    const item3 = this.createItem3();
    this.items.push(item3);

    // Add all items to content area
    this.items.forEach((item, index) => {
      item.style.position = 'absolute';
      item.style.top = '0';
      item.style.left = '0';
      item.style.width = '100%';
      item.style.height = '100%';
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.justifyContent = 'center';
      item.style.opacity = index === 0 ? '1' : '0';
      item.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
      item.style.pointerEvents = 'none';
      this.contentArea.appendChild(item);
    });
  }

  createCirclesHeader() {
    const header = document.createElement('div');
    header.className = 'hypothesis-circles-header';
    header.style.display = 'flex';
    header.style.justifyContent = 'center';
    header.style.gap = '24px';
    header.style.paddingTop = '40px';
    header.style.paddingBottom = '30px';

    this.circles = [];

    [1, 2, 3].forEach(num => {
      const octagon = document.createElement('div');
      octagon.style.width = '74px';
      octagon.style.aspectRatio = '1 / 1';
      octagon.style.background = '#333';
      octagon.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      octagon.style.display = 'flex';
      octagon.style.alignItems = 'center';
      octagon.style.justifyContent = 'center';
      octagon.style.color = 'white';
      octagon.style.fontFamily = 'Inter';
      octagon.style.fontSize = '32px';
      octagon.style.fontWeight = '600';
      octagon.style.transition = 'all 0.3s ease';
      octagon.style.opacity = num === 1 ? '1' : '0.3';
      octagon.textContent = num;
      this.circles.push(octagon);
      header.appendChild(octagon);
    });

    this.container.appendChild(header);
  }

  createItem1() {
    // Stage 1 content - Apple Cycle Animation
    const item = document.createElement('div');
    item.className = 'hypothesis-item hypothesis-item-1';
    item.style.flexDirection = 'column';
    item.style.gap = '24px';

    // Add title
    const title = document.createElement('div');
    title.style.color = '#333333';
    title.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    title.style.fontSize = '32px';
    title.style.fontWeight = '600';
    title.textContent = 'Design for speed';
    item.appendChild(title);

    // Add description text
    const description = document.createElement('div');
    description.style.color = '#333';
    description.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.lineHeight = '1.5';
    description.style.textAlign = 'center';
    description.style.maxWidth = '500px';
    description.textContent = 'Therapists are on the go and under pressure, so the design should focus on speed and reducing time to task.';
    item.appendChild(description);

    const lottiePlayer = document.createElement('dotlottie-player');
    lottiePlayer.setAttribute('src', './assets/lottiefiles/apple_cycling_animation.json');
    lottiePlayer.setAttribute('background', 'transparent');
    lottiePlayer.setAttribute('speed', '1');
    lottiePlayer.style.width = '400px';
    lottiePlayer.style.height = '400px';
    lottiePlayer.setAttribute('loop', '');
    lottiePlayer.setAttribute('autoplay', '');

    item.appendChild(lottiePlayer);
    return item;
  }

  createItem2() {
    // Typography hierarchy animation
    const item = document.createElement('div');
    item.className = 'hypothesis-item hypothesis-item-2';
    item.style.flexDirection = 'column';
    item.style.gap = '24px';
    item.style.alignItems = 'center';

    // Add title
    const title = document.createElement('div');
    title.className = 'typo-title';
    title.style.color = '#333333';
    title.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    title.style.fontSize = '32px';
    title.style.fontWeight = '600';
    title.style.marginBottom = '8px';
    title.textContent = 'Typographical Hierarchy';
    item.appendChild(title);

    // Add description text
    const description = document.createElement('div');
    description.style.color = '#333';
    description.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    description.style.fontSize = '16px';
    description.style.fontWeight = '400';
    description.style.lineHeight = '1.5';
    description.style.textAlign = 'center';
    description.style.maxWidth = '500px';
    description.style.marginBottom = '16px';
    description.textContent = 'Larger fonts, clear hierarchy & color contrast to maximize readability, scan-ability and therapist availability.';
    item.appendChild(description);

    // Typography samples container
    const samplesContainer = document.createElement('div');
    samplesContainer.style.display = 'flex';
    samplesContainer.style.flexDirection = 'column';
    samplesContainer.style.gap = '16px';
    samplesContainer.style.alignItems = 'center';

    const sizes = [
      { label: 'H1', size: '64px', weight: '700' },
      { label: 'H2', size: '48px', weight: '600' },
      { label: 'H3', size: '36px', weight: '600' },
      { label: 'H4', size: '28px', weight: '600' },
      { label: 'Body', size: '20px', weight: '400' }
    ];

    sizes.forEach((config, index) => {
      const line = document.createElement('div');
      line.className = `typo-line typo-${config.label.toLowerCase()}`;
      line.style.color = '#333333';
      line.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      line.style.fontSize = config.size;
      line.style.fontWeight = config.weight;
      line.style.opacity = '0';
      line.style.transform = 'translateY(10px)';
      line.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      line.textContent = 'Aa';
      samplesContainer.appendChild(line);
    });

    item.appendChild(samplesContainer);

    return item;
  }

  createItem3() {
    // Placeholder for future animation
    const item = document.createElement('div');
    item.className = 'hypothesis-item hypothesis-item-3';

    const placeholder = document.createElement('div');
    placeholder.style.color = '#333';
    placeholder.style.fontFamily = 'Inter';
    placeholder.style.fontSize = '32px';
    placeholder.style.fontWeight = '500';
    placeholder.textContent = 'Item 3 Placeholder';

    item.appendChild(placeholder);
    return item;
  }

  setupObserver() {
    const options = {
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          this.start();
          console.log('Hypothesis animation started');
        } else if (!entry.isIntersecting && this.isVisible) {
          this.isVisible = false;
          this.stop();
          console.log('Hypothesis animation stopped');
        }
      });
    }, options);

    observer.observe(this.container);
  }

  start() {
    // Show first item
    this.showItem(0);

    // Start rotation timer
    this.rotationTimer = setTimeout(() => {
      this.nextItem();
    }, this.itemDuration);
  }

  stop() {
    // Clear timers
    if (this.rotationTimer) {
      clearTimeout(this.rotationTimer);
    }
    if (this.item2AnimationInterval) {
      clearInterval(this.item2AnimationInterval);
    }

    // Reset to first item
    this.currentItem = 0;
    this.items.forEach((item, index) => {
      item.style.opacity = index === 0 ? '1' : '0';
    });
  }

  nextItem() {
    const nextIndex = (this.currentItem + 1) % this.items.length;
    this.showItem(nextIndex);

    // Schedule next transition
    if (this.isVisible) {
      this.rotationTimer = setTimeout(() => {
        this.nextItem();
      }, this.itemDuration);
    }
  }

  showItem(index) {
    console.log(`Showing animation item #${index + 1}`);

    // Stop any active item animations
    this.stopItemAnimation(this.currentItem);

    // Fade out current item
    this.items[this.currentItem].style.opacity = '0';

    // Update circle indicators
    this.circles.forEach((circle, i) => {
      circle.style.opacity = i === index ? '1' : '0.3';
    });

    // Update current item
    this.currentItem = index;

    // Fade in new item
    setTimeout(() => {
      this.items[this.currentItem].style.opacity = '1';

      // Start item-specific animation
      this.startItemAnimation(this.currentItem);
    }, this.transitionDuration);
  }

  startItemAnimation(index) {
    if (index === 1) {
      // Item 2 - Typography cascade animation
      this.animateTypography();
    }
  }

  stopItemAnimation(index) {
    if (index === 1) {
      // Stop typography animation
      if (this.item2AnimationInterval) {
        clearInterval(this.item2AnimationInterval);
      }

      // Reset typography lines
      const lines = this.items[1].querySelectorAll('.typo-line');
      lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
      });
    }
  }

  animateTypography() {
    const lines = this.items[1].querySelectorAll('.typo-line');
    const cascadeDelay = 150; // ms between each line
    const loopDuration = 2500; // Total animation duration

    const runCascade = () => {
      // Reset all lines
      lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
      });

      // Animate each line in sequence
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, index * cascadeDelay);
      });
    };

    // Run first cascade immediately
    runCascade();

    // Loop the animation
    this.item2AnimationInterval = setInterval(runCascade, loopDuration);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HypothesisAnimation('.hypothesis-square');
});
