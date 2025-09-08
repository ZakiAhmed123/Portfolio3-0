    $(document).ready(function () {

        const playArea = document.getElementById('play-audio');
        const audio = document.getElementById('name-audio');
        const glow = document.getElementById('audio-indicator');

        playArea.addEventListener('click', () => {
          if (!audio) {
            console.error('Audio element not found!');
            return;
          }

          audio.currentTime = 0;
          audio.play();
          glow.classList.add('playing');
          console.log("Playing name pronunciation audio...");
        });

        audio.addEventListener('ended', () => {
          glow.classList.remove('playing');
          console.log("Audio ended, glow removed.");
        });
    });