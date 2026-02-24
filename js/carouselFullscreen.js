(function () {
  var overlay = document.getElementById('carousel-fullscreen');
  var closeBtn = document.getElementById('carousel-fs-close');
  var viewport = document.getElementById('carousel-fs-viewport');
  var track = document.getElementById('carousel-fs-track');
  var indicators = document.getElementById('carousel-fs-indicators');
  var prevBtn = document.getElementById('carousel-fs-prev');
  var nextBtn = document.getElementById('carousel-fs-next');
  var counter = document.getElementById('carousel-fs-counter');
  var expandBtn = document.getElementById('carousel-expand-btn');

  if (!overlay || !expandBtn) return;

  var slides = [];
  var currentIndex = 0;
  var totalSlides = 0;
  var isOpen = false;

  var scale = 1;
  var panX = 0;
  var panY = 0;
  var MIN_SCALE = 1;
  var MAX_SCALE = 5;

  var pinchStartDist = 0;
  var pinchStartScale = 1;
  var isPanning = false;
  var panStartX = 0;
  var panStartY = 0;
  var panStartOffsetX = 0;
  var panStartOffsetY = 0;

  var swipeStartX = 0;
  var swipeStartY = 0;
  var swipeStartTime = 0;
  var isSwiping = false;
  var swipeLocked = false;

  function isRotated() {
    return overlay.classList.contains('rotated');
  }

  function mapTouch(touch) {
    if (!isRotated()) return { x: touch.clientX, y: touch.clientY };
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    return {
      x: touch.clientY,
      y: vw - touch.clientX
    };
  }

  function updateOrientation() {
    if (!isOpen) return;
    var isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape) {
      overlay.classList.remove('rotated');
    } else {
      overlay.classList.add('rotated');
    }
  }

  function getCarouselCurrentIndex() {
    var activeSlide = document.querySelector('.gradient-carousel-slide.active');
    if (!activeSlide) return 0;
    var allSlides = document.querySelectorAll('.gradient-carousel-slide');
    for (var i = 0; i < allSlides.length; i++) {
      if (allSlides[i] === activeSlide) return i;
    }
    return 0;
  }

  function buildSlides() {
    var imgs = document.querySelectorAll('.gradient-carousel-image-container img');
    track.innerHTML = '';
    indicators.innerHTML = '';
    slides = [];
    totalSlides = imgs.length;

    for (var i = 0; i < imgs.length; i++) {
      var wrapper = document.createElement('div');
      wrapper.className = 'carousel-fs-slide';

      var imgEl = document.createElement('img');
      imgEl.src = imgs[i].src;
      imgEl.alt = imgs[i].alt;
      imgEl.draggable = false;

      wrapper.appendChild(imgEl);
      track.appendChild(wrapper);
      slides.push({ wrapper: wrapper, img: imgEl });

      var dot = document.createElement('span');
      dot.className = 'carousel-fs-dot';
      dot.setAttribute('data-index', i);
      indicators.appendChild(dot);
    }
  }

  function resetZoom() {
    scale = 1;
    panX = 0;
    panY = 0;
    for (var i = 0; i < slides.length; i++) {
      slides[i].img.style.transform = '';
      slides[i].img.style.transition = '';
    }
  }

  function applyZoom(animated) {
    var img = slides[currentIndex].img;
    img.style.transition = animated ? 'transform 0.2s ease' : 'none';
    img.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + scale + ')';
  }

  function clampPan() {
    var img = slides[currentIndex].img;
    var wrapper = slides[currentIndex].wrapper;
    var cw = wrapper.offsetWidth;
    var ch = wrapper.offsetHeight;
    var displayedW = img.offsetWidth * scale;
    var displayedH = img.offsetHeight * scale;
    var maxX = Math.max(0, (displayedW - cw) / 2);
    var maxY = Math.max(0, (displayedH - ch) / 2);
    panX = Math.min(Math.max(panX, -maxX), maxX);
    panY = Math.min(Math.max(panY, -maxY), maxY);
  }

  function goToSlide(index, animated) {
    if (index < 0 || index >= totalSlides) return;
    resetZoom();
    currentIndex = index;
    var offset = -index * 100;
    track.style.transition = animated !== false ? 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' : 'none';
    track.style.transform = 'translateX(' + offset + '%)';
    counter.textContent = (index + 1) + ' / ' + totalSlides;
    var dots = indicators.querySelectorAll('.carousel-fs-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === index);
    }
  }

  function openFullscreen() {
    buildSlides();
    currentIndex = getCarouselCurrentIndex();
    goToSlide(currentIndex, false);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    updateOrientation();

    if (window._carouselStopAutoplay) {
      window._carouselStopAutoplay();
    }
  }

  function closeFullscreen() {
    overlay.classList.remove('active');
    overlay.classList.remove('rotated');
    document.body.style.overflow = '';
    isOpen = false;
    resetZoom();

    if (window._carouselUpdateSlide) {
      window._carouselUpdateSlide(currentIndex);
    }
    if (window._carouselStartAutoplay) {
      window._carouselStartAutoplay();
    }
  }

  window.addEventListener('resize', updateOrientation);
  if (screen.orientation) {
    screen.orientation.addEventListener('change', function () {
      setTimeout(updateOrientation, 100);
    });
  }
  window.addEventListener('orientationchange', function () {
    setTimeout(updateOrientation, 200);
  });

  expandBtn.addEventListener('click', openFullscreen);
  closeBtn.addEventListener('click', closeFullscreen);

  prevBtn.addEventListener('click', function () {
    if (scale > 1) return;
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  });

  nextBtn.addEventListener('click', function () {
    if (scale > 1) return;
    goToSlide((currentIndex + 1) % totalSlides);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeFullscreen();
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') { closeFullscreen(); return; }
    if (scale <= 1) {
      if (e.key === 'ArrowLeft') goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      if (e.key === 'ArrowRight') goToSlide((currentIndex + 1) % totalSlides);
    }
  });

  viewport.addEventListener('touchstart', function (e) {
    if (!isOpen) return;

    if (e.touches.length === 2) {
      isSwiping = false;
      isPanning = false;
      swipeLocked = true;
      var t0 = mapTouch(e.touches[0]);
      var t1 = mapTouch(e.touches[1]);
      pinchStartDist = Math.hypot(t1.x - t0.x, t1.y - t0.y);
      pinchStartScale = scale;
      return;
    }

    if (e.touches.length === 1) {
      var mapped = mapTouch(e.touches[0]);
      swipeStartX = mapped.x;
      swipeStartY = mapped.y;
      swipeStartTime = Date.now();
      swipeLocked = false;

      if (scale > 1) {
        isPanning = true;
        isSwiping = false;
        panStartX = mapped.x;
        panStartY = mapped.y;
        panStartOffsetX = panX;
        panStartOffsetY = panY;
      } else {
        isSwiping = true;
        isPanning = false;
      }
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (!isOpen) return;

    if (e.touches.length === 2) {
      e.preventDefault();
      var t0 = mapTouch(e.touches[0]);
      var t1 = mapTouch(e.touches[1]);
      var dist = Math.hypot(t1.x - t0.x, t1.y - t0.y);
      scale = Math.min(Math.max(pinchStartScale * (dist / pinchStartDist), MIN_SCALE), MAX_SCALE);
      if (scale <= 1) { panX = 0; panY = 0; }
      applyZoom(false);
      return;
    }

    if (e.touches.length === 1) {
      var mapped = mapTouch(e.touches[0]);

      if (isPanning && scale > 1) {
        e.preventDefault();
        panX = panStartOffsetX + (mapped.x - panStartX);
        panY = panStartOffsetY + (mapped.y - panStartY);
        clampPan();
        applyZoom(false);
        return;
      }

      if (isSwiping && scale <= 1) {
        var dx = mapped.x - swipeStartX;
        var dy = mapped.y - swipeStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          e.preventDefault();
        }
      }
    }
  }, { passive: false });

  viewport.addEventListener('touchend', function (e) {
    if (!isOpen) return;

    if (swipeLocked) {
      swipeLocked = false;
      isPanning = false;
      pinchStartScale = scale;
      if (scale < MIN_SCALE) {
        scale = MIN_SCALE;
        panX = 0;
        panY = 0;
        applyZoom(true);
      }
      return;
    }

    if (isPanning) {
      isPanning = false;
      clampPan();
      applyZoom(true);
      return;
    }

    if (isSwiping && scale <= 1) {
      isSwiping = false;
      var mapped = mapTouch(e.changedTouches[0]);
      var dx = mapped.x - swipeStartX;
      var elapsed = Date.now() - swipeStartTime;
      var velocity = Math.abs(dx) / elapsed;

      if (Math.abs(dx) > 50 || velocity > 0.3) {
        if (dx < 0) {
          goToSlide((currentIndex + 1) % totalSlides);
        } else {
          goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
        }
      }
    }
  }, { passive: true });

  var lastTap = 0;
  viewport.addEventListener('touchend', function (e) {
    if (!isOpen || e.touches.length > 0) return;
    var now = Date.now();
    if (now - lastTap < 300) {
      if (scale > 1) {
        scale = 1;
        panX = 0;
        panY = 0;
        applyZoom(true);
      } else {
        scale = 2.5;
        applyZoom(true);
      }
      lastTap = 0;
    } else {
      lastTap = now;
    }
  }, { passive: true });
})();
