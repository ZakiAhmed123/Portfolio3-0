(function() {
  const track = document.querySelector('.rolodex-track');
  if (!track) return;

  const items = track.querySelectorAll('.rolodex-item');
  if (items.length === 0) return;

  const itemCount = items.length;
  const itemHeight = 100;
  const gap = 24;
  const totalItemHeight = itemHeight + gap;

  let currentIndex = 0;

  function updatePosition() {
    items.forEach((item, index) => {
      item.classList.remove('active');
      if (index === currentIndex) {
        item.classList.add('active');
      }
    });

    const centerOffset = (648 / 2) - (itemHeight / 2);
    const translateY = centerOffset - (currentIndex * totalItemHeight);
    track.style.transform = `translateY(${translateY}px)`;
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % itemCount;
    updatePosition();
  }

  updatePosition();

  setInterval(nextItem, 2000);
})();
