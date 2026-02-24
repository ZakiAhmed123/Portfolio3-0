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
    var imgRect = img.getBoundingClientRect();
    var scaledW = img.naturalWidth * (imgRect.width / img.offsetWidth) || cw * scale;
    var scaledH = img.naturalHeight * (imgRect.height / img.offsetHeight) || ch * scale;
    var maxX = Math.max(0, (scaledW - cw) / 2);
    var maxY = Math.max(0, (scaledH - ch) / 2);
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

    if (window._carouselStopAutoplay) {
      window._carouselStopAutoplay();
    }
  }

  function closeFullscreen() {
    overlay.classList.remove('active');
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
      pinchStartDist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      pinchStartScale = scale;
      return;
    }

    if (e.touches.length === 1) {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
      swipeStartTime = Date.now();
      swipeLocked = false;

      if (scale > 1) {
        isPanning = true;
        isSwiping = false;
        panStartX = e.touches[0].clientX;
        panStartY = e.touches[0].clientY;
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
      var dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      scale = Math.min(Math.max(pinchStartScale * (dist / pinchStartDist), MIN_SCALE), MAX_SCALE);
      if (scale <= 1) { panX = 0; panY = 0; }
      applyZoom(false);
      return;
    }

    if (e.touches.length === 1 && isPanning && scale > 1) {
      e.preventDefault();
      panX = panStartOffsetX + (e.touches[0].clientX - panStartX);
      panY = panStartOffsetY + (e.touches[0].clientY - panStartY);
      clampPan();
      applyZoom(false);
      return;
    }

    if (isSwiping && scale <= 1) {
      var dx = e.touches[0].clientX - swipeStartX;
      var dy = e.touches[0].clientY - swipeStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault();
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
      var touch = e.changedTouches[0];
      var dx = touch.clientX - swipeStartX;
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
