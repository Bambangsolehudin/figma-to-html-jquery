$(function () {
  'use strict';

  /* =============================================
     1. NAVBAR — Scroll shadow + hamburger toggle
  ============================================= */
  const $navbar    = $('#navbar');
  const $hamburger = $('#hamburger');
  const $navMenu   = $('#navMenu');

  // Sticky shadow on scroll
  $(window).on('scroll', function () {
    $navbar.toggleClass('scrolled', $(this).scrollTop() > 10);
  });

  // Hamburger toggle
  $hamburger.on('click', function () {
    const isOpen = $navMenu.hasClass('open');
    $hamburger.toggleClass('open');
    if (isOpen) {
      $navMenu.slideUp(260, function () {
        $navMenu.removeClass('open').removeAttr('style');
      });
    } else {
      $navMenu.addClass('open').hide().slideDown(260);
    }
  });

  // Close menu on link click (mobile)
  $navMenu.find('.navbar__link').on('click', function () {
    if ($navMenu.hasClass('open')) {
      $hamburger.removeClass('open');
      $navMenu.slideUp(260, function () {
        $navMenu.removeClass('open').removeAttr('style');
      });
    }
  });

  /* =============================================
     2. ACTIVE NAV LINK — highlight on scroll
  ============================================= */
  const sections = $('section[id]');

  $(window).on('scroll.spy', function () {
    const scrollPos = $(this).scrollTop() + 80;
    sections.each(function () {
      const top    = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id     = $(this).attr('id');
      if (scrollPos >= top && scrollPos < bottom) {
        $('.navbar__link').removeClass('navbar__link--active');
        $(`.navbar__link[href="#${id}"]`).addClass('navbar__link--active');
      }
    });
  });

  /* =============================================
     3. TESTIMONIAL SLIDER — dot navigation
  ============================================= */
  let currentSlide = 0;
  const $slides    = $('.testimonial-card');
  const $dots      = $('.dot');

  function goToSlide(index) {
    $slides.filter('.active').fadeOut(220, function () {
      $(this).removeClass('active');
      $slides.eq(index).fadeIn(280).addClass('active');
    });
    $dots.removeClass('dot--active');
    $dots.eq(index).addClass('dot--active');
    currentSlide = index;
  }

  $dots.on('click', function () {
    const idx = parseInt($(this).data('index'), 10);
    if (idx !== currentSlide) goToSlide(idx);
  });

  // Auto-advance every 5 s
  let autoSlide = setInterval(function () {
    const next = (currentSlide + 1) % $slides.length;
    goToSlide(next);
  }, 5000);

  // Pause auto on user interaction
  $dots.on('click', function () {
    clearInterval(autoSlide);
  });

  /* =============================================
     4. HELP TABS
  ============================================= */
  const $tabs   = $('.help__tab');
  const $panels = $('.help__panel');

  $tabs.on('click', function () {
    const target = $(this).data('tab');

    $tabs.removeClass('help__tab--active');
    $(this).addClass('help__tab--active');

    $panels.filter('.active').fadeOut(180, function () {
      $(this).removeClass('active');
      $(`#tab-${target}`).fadeIn(260).addClass('active');
    });
  });

  /* =============================================
     5. VIDEO MODAL
  ============================================= */
  const $modal   = $('#videoModal');
  const $overlay = $modal;

  $('#watchVideoBtn').on('click', function () {
    $overlay.fadeIn(260).addClass('active');
    $('body').css('overflow', 'hidden');
  });

  $('#modalClose').on('click', closeModal);

  // Close on overlay click (outside modal box)
  $overlay.on('click', function (e) {
    if ($(e.target).is($overlay)) closeModal();
  });

  // Close on ESC key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $overlay.hasClass('active')) closeModal();
  });

  function closeModal() {
    $overlay.fadeOut(220, function () {
      $(this).removeClass('active');
      $('body').css('overflow', '');
    });
  }

  /* =============================================
     6. SCROLL ANIMATIONS — fade in on enter
  ============================================= */
  const $animItems = $('.service-card, .help-item, .trusted__logo-item');
  $animItems.css({ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' });

  function revealOnScroll() {
    const viewBottom = $(window).scrollTop() + $(window).height() - 60;
    $animItems.each(function () {
      if ($(this).offset().top < viewBottom && $(this).css('opacity') === '0') {
        $(this).css({ opacity: 1, transform: 'translateY(0)' });
      }
    });
  }

  $(window).on('scroll.reveal', revealOnScroll);
  revealOnScroll(); // run once on load
});
