    $(document).ready(function () {
        document.querySelectorAll('.videoButton').forEach(button => {
        const icon = button.querySelector('.play-icon');
        const originalSrc = './assets/images/icons/play1.png';
        const hoverSrc = './assets/images/icons/play2.png';

        button.addEventListener('mouseenter', () => {
          icon.src = hoverSrc;
        });

        button.addEventListener('mouseleave', () => {
          icon.src = originalSrc;
        });
      });

    });