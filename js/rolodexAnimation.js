(function() {
  const container = document.querySelector('.rolodex-container');
  const track = document.querySelector('.rolodex-track');
  if (!track || !container) return;

  const originalItems = Array.from(track.querySelectorAll('.rolodex-item'));
  if (originalItems.length === 0) return;

  const itemCount = originalItems.length;
  const itemHeight = 100;
  const gap = 24;
  const totalItemHeight = itemHeight + gap;
  const containerHeight = 648;

  track.innerHTML = '';

  const itemTexts = originalItems.map(item => item.textContent);

  function createItem(text) {
    const item = document.createElement('div');
    item.className = 'rolodex-item';
    item.textContent = text;
    return item;
  }

  const visibleCount = 5;
  let currentIndex = 0;

  function getWrappedIndex(index) {
    return ((index % itemCount) + itemCount) % itemCount;
  }

  function render() {
    track.innerHTML = '';

    for (let offset = -2; offset <= 2; offset++) {
      const dataIndex = getWrappedIndex(currentIndex + offset);
      const item = createItem(itemTexts[dataIndex]);

      if (offset === 0) {
        item.classList.add('active');
      }

      track.appendChild(item);
    }

    const centerOffset = (containerHeight / 2) - (itemHeight / 2);
    const trackOffset = centerOffset - (2 * totalItemHeight);
    track.style.transform = `translateY(${trackOffset}px)`;
  }

  function animateToNext() {
    track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    const centerOffset = (containerHeight / 2) - (itemHeight / 2);
    const trackOffset = centerOffset - (3 * totalItemHeight);
    track.style.transform = `translateY(${trackOffset}px)`;

    const items = track.querySelectorAll('.rolodex-item');
    items.forEach((item, i) => {
      item.classList.remove('active');
      if (i === 3) {
        item.classList.add('active');
      }
    });

    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = getWrappedIndex(currentIndex + 1);
      render();
    }, 600);
  }

  render();

  setInterval(animateToNext, 2000);
})();
