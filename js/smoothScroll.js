// Smooth Parallax Scrolling Effect
(function() {
  let scrollPosition = 0;
  let targetScrollPosition = 0;
  const smoothness = 0.08; // Lower = smoother/slower (0.05-0.15 range)

  // Create a wrapper for all content except fixed elements
  function initSmoothScroll() {
    const body = document.body;
    const html = document.documentElement;

    // Create smooth scroll wrapper
    const wrapper = document.createElement('div');
    wrapper.id = 'smooth-scroll-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.willChange = 'transform';

    // Move all body children except fixed elements into wrapper
    const fixedElements = ['spline-background', 'follower'];
    while (body.firstChild) {
      const child = body.firstChild;
      const childId = child.id;

      // Keep fixed elements outside wrapper
      if (fixedElements.includes(childId)) {
        const temp = child;
        body.removeChild(child);
        body.appendChild(temp);
        continue;
      }

      wrapper.appendChild(child);
    }

    body.insertBefore(wrapper, body.firstChild);

    // Set body height to enable scrolling
    function updateBodyHeight() {
      const wrapperHeight = wrapper.offsetHeight;
      body.style.height = wrapperHeight + 'px';
    }

    updateBodyHeight();

    // Update height on window resize and content changes
    window.addEventListener('resize', updateBodyHeight);

    // Observe DOM changes to update height
    const observer = new MutationObserver(updateBodyHeight);
    observer.observe(wrapper, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    return wrapper;
  }

  // Smooth scroll animation
  function smoothScrollAnimation(wrapper) {
    targetScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Smooth interpolation
    scrollPosition += (targetScrollPosition - scrollPosition) * smoothness;

    // Apply transform
    wrapper.style.transform = `translate3d(0, -${scrollPosition}px, 0)`;

    requestAnimationFrame(() => smoothScrollAnimation(wrapper));
  }

  // Initialize on page load
  window.addEventListener('load', function() {
    const wrapper = initSmoothScroll();
    smoothScrollAnimation(wrapper);
  });
})();
