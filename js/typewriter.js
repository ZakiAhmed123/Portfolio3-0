$(function () {
  const words = ["DESIGNER.", "MENTOR.", "STRATEGIST."];
  let wordIndex = 0;
  let charIndex = 0;
  const speed = 70;

  function typeWriter() {
    if (wordIndex < words.length) {
      const currentWord = words[wordIndex];
      if (charIndex < currentWord.length) {
        $('#typewriter-target').append(currentWord.charAt(charIndex));
        charIndex++;
        setTimeout(typeWriter, speed);
      } else {
        $('#typewriter-target').append('<br>');
        wordIndex++;
        charIndex = 0;
        setTimeout(typeWriter, speed);
      }
    } else {
      // After typewriter finishes
      showHeadline();
    }
  }

  function showHeadline() {
    const $headline = $('#headline-text');
    $headline.removeClass('hidden').addClass('visible');

    const sentences = $headline.text().split('.');
    $headline.empty();

    sentences.forEach((sentence, i) => {
      if (!sentence.trim()) return;
      const span = $('<span>')
        .addClass('headline-underline')
        .text(sentence.trim() + '.')
        .appendTo($headline);
    });

    // Animate each underline one after another
    setTimeout(() => {
      $('.headline-underline').each((i, el) => {
        setTimeout(() => {
          $(el).addClass('active');
        }, i * 1000);
      });
    }, 100); // slight delay after visibility
  }

  typeWriter();
});
