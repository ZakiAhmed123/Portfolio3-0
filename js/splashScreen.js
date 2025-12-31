window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splash-screen');

  if (!splashScreen) return;

  // Prevent scrolling while splash screen is visible
  document.body.style.overflow = 'hidden';

  // Wait 1 second, then start closing animation
  setTimeout(() => {
    splashScreen.classList.add('closing');

    // After animation completes (500ms), hide the splash screen and restore scrolling
    setTimeout(() => {
      splashScreen.classList.add('closed');
      document.body.style.overflow = '';
    }, 500);
  }, 1000);
});
