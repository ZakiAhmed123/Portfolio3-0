document.addEventListener('DOMContentLoaded', function() {
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  const designerWord = document.getElementById('designer-word');

  // Determine base font size based on viewport
  const isLargeScreen = window.innerWidth >= 992;
  const baseFontSize = isLargeScreen ? 160 : 56; // 10rem = 160px, 3.5rem = 56px

  // Function to animate a line in
  function animateLine(line, fontSize, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        line.style.fontSize = fontSize + 'px';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        resolve();
      }, delay);
    });
  }

  // Function to animate "Designer" letter by letter with color change
  function animateDesignerColor() {
    const word = 'Designer.';
    designerWord.innerHTML = '';

    // Split word into individual letters wrapped in spans
    word.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.className = 'designer-letter';
      designerWord.appendChild(span);
    });

    const letters = designerWord.querySelectorAll('.designer-letter');

    // Animate each letter's color from white to #ABFF02
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.color = '#ABFF02';
        letter.style.transition = 'color 0.15s ease';
      }, index * 80); // 80ms delay between each letter
    });
  }

  // Start the animation sequence
  async function startAnimation() {
    await animateLine(line1, baseFontSize, 0);
    await animateLine(line2, baseFontSize + 8, 200);
    await animateLine(line3, baseFontSize + 16, 400);

    // Wait a bit after Designer appears, then start color animation
    setTimeout(() => {
      animateDesignerColor();
    }, 300);
  }

  startAnimation();
});
