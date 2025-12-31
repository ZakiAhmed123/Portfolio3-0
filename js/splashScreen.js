window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splash-screen');

  if (!splashScreen) return;

  // Prevent scrolling while splash screen is visible
  document.body.style.overflow = 'hidden';

  // Wait 2 seconds, then start closing animation
  setTimeout(() => {
    splashScreen.classList.add('closing');

    // After animation completes (1000ms), hide the splash screen and restore scrolling
    setTimeout(() => {
      splashScreen.classList.add('closed');
      document.body.style.overflow = '';
    }, 1000);
  }, 2000);
});
