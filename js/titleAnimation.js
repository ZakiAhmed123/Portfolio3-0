document.addEventListener('DOMContentLoaded', function() {
  const designerWord = document.getElementById('designer-word');

  // Function to animate "Designer" letter by letter with color wave
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

    // Animate each letter: turn green, then previous letter turns white
    letters.forEach((letter, index) => {
      setTimeout(() => {
        // Turn current letter green
        letter.style.color = '#ABFF02';
        letter.style.transition = 'color 0.2s ease';

        // Turn previous letter white
        if (index > 0) {
          letters[index - 1].style.color = 'var(--white)';
        }
      }, index * 150); // 150ms delay between each letter
    });
  }

  // Start animation immediately
  animateDesignerColor();
});
