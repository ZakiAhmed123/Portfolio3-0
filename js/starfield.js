function createStarfield() {
  const starContainer = document.createElement('div');
  starContainer.id = 'starfield';
  document.body.insertBefore(starContainer, document.body.firstChild);

  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 2 + 0.5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    star.style.left = x + '%';
    star.style.top = y + '%';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = delay + 's';

    starContainer.appendChild(star);
  }
}

document.addEventListener('DOMContentLoaded', createStarfield);
