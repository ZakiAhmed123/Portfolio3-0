document.addEventListener('DOMContentLoaded', function() {
  const logoLink = document.getElementById('logo-scroll-top');

  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      const href = logoLink.getAttribute('href');
      if (href === '#' || href === '' || href === window.location.pathname || href === window.location.pathname.split('/').pop()) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
});
