(function() {
  const container = document.querySelector('.rolodex-container');
  const track = document.querySelector('.rolodex-track');
  if (!track || !container) return;

  const itemData = [
    {
      title: 'Therapists first',
      description: 'Prioritized therapist needs based on their user journey over admin-focused features.'
    },
    {
      title: 'Reduce and merge',
      description: 'Merge redundant and similarly themed functionality.'
    },
    {
      title: 'Technical feasibility',
      description: 'Assess legacy controls mappability to modern web controls within Kendo UI, Material Design and React.'
    },
    {
      title: 'Fixed bid budgeting',
      description: 'Focused on speed and execution to meet fixed-bid budget constraints.'
    }
  ];

  const itemCount = itemData.length;
  const itemHeight = 140;
  const gap = 24;
  const totalItemHeight = itemHeight + gap;
  const containerHeight = 648;

  track.innerHTML = '';

  function createItem(data) {
    const item = document.createElement('div');
    item.className = 'rolodex-item';

    const title = document.createElement('div');
    title.className = 'rolodex-item-title';
    title.textContent = data.title;

    const desc = document.createElement('div');
    desc.className = 'rolodex-item-desc';
    desc.textContent = data.description;

    item.appendChild(title);
    item.appendChild(desc);

    return item;
  }

  let currentIndex = 0;

  function getWrappedIndex(index) {
    return ((index % itemCount) + itemCount) % itemCount;
  }

  function render() {
    track.innerHTML = '';

    for (let offset = -2; offset <= 2; offset++) {
      const dataIndex = getWrappedIndex(currentIndex + offset);
      const item = createItem(itemData[dataIndex]);

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

  setInterval(animateToNext, 4000);
})();
