document.addEventListener('DOMContentLoaded', function() {
  const logoLink = document.getElementById('logo-scroll-top');

  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
