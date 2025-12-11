document.addEventListener('DOMContentLoaded', function() {
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');
  const designerWord = document.getElementById('designer-word');

  const pauseDuration = 1200; // 1.2 seconds pause between each line

  // Function to animate a line in
  function animateLine(line) {
    return new Promise((resolve) => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
      line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

      // Resolve after animation completes + pause duration
      setTimeout(resolve, 500 + pauseDuration);
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
        letter.style.transition = 'color 0.2s ease';
      }, index * 150); // 150ms delay between each letter
    });
  }

  // Start the animation sequence
  async function startAnimation() {
    await animateLine(line1);
    await animateLine(line2);
    await animateLine(line3);

    // Start color animation after Designer appears
    setTimeout(() => {
      animateDesignerColor();
    }, 100);
  }

  startAnimation();
});
