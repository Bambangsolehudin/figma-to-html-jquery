$(function () {
  'use strict';

  /* =============================================
     1. NAVBAR - Scroll shadow + hamburger toggle
  ============================================= */
  const $navbar = $('#navbar');
  const $hamburger = $('#hamburger');
  const $navMenu = $('#navMenu');

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
     2. ACTIVE NAV LINK - highlight on scroll
  ============================================= */
  const sections = $('section[id]');

  $(window).on('scroll.spy', function () {
    const scrollPos = $(this).scrollTop() + 80;
    sections.each(function () {
      const top = $(this).offset().top;
      const bottom = top + $(this).outerHeight();
      const id = $(this).attr('id');
      if (scrollPos >= top && scrollPos < bottom) {
        $('.navbar__link').removeClass('navbar__link--active');
        $(`.navbar__link[href="#${id}"]`).addClass('navbar__link--active');
      }
    });
  });

  /* =============================================
     3. TESTIMONIALS - dynamic content + profile click
  ============================================= */
  const testimonialsData = [
    {
      name: 'Alyssa Young',
      role: 'CMO of Brandora',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=140&q=80',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vel lobortis tincidunt fames quisque mauris at diam. Nullam morbi ipsum turpis amet id posuere quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name: 'Daniel Mercer',
      role: 'CEO of Orbit Labs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
      testimonial:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Aenean tempus pellentesque nibh, a porttitor enim feugiat sed. Proin viverra magna in lorem vulputate, nec efficitur diam aliquet.'
    },
    {
      name: 'Ricky Aprilia',
      role: 'Founder of Varibo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80',
      testimonial:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vel lobortis tincidunt fames quisque mauris at diam. Nullam morbi ipsum turpis amet id posuere quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.'
    },
    {
      name: 'James Connor',
      role: 'Product Director at Fluxy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80',
      testimonial:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.'
    },
    {
      name: 'Maya Kline',
      role: 'Head of Design at Nuance',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=140&q=80',
      testimonial:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.'
    }
  ];

  const $testimonialText = $('#testimonialText');
  const $testimonialName = $('#testimonialName');
  const $testimonialRole = $('#testimonialRole');
  const $testimonialProfiles = $('#testimonialProfiles');

  if ($testimonialText.length && $testimonialName.length && $testimonialRole.length && $testimonialProfiles.length) {
    let activeTestimonial = 2;

    function renderProfiles() {
      const profilesHtml = testimonialsData
        .map((item, index) => `
          <button
            type="button"
            class="testimonial-profile${index === activeTestimonial ? ' testimonial-profile--active' : ''}"
            data-index="${index}"
            aria-label="Show testimonial from ${item.name}"
            aria-pressed="${index === activeTestimonial ? 'true' : 'false'}"
          >
            <img src="${item.avatar}" alt="${item.name}" />
          </button>
        `)
        .join('');
      $testimonialProfiles.html(profilesHtml);
    }

    function setActiveTestimonial(index) {
      const item = testimonialsData[index];
      if (!item) return;

      activeTestimonial = index;

      $testimonialText.stop(true, true).fadeOut(120, function () {
        $(this).text(item.testimonial).fadeIn(180);
      });
      $testimonialName.stop(true, true).fadeOut(120, function () {
        $(this).text(item.name).fadeIn(180);
      });
      $testimonialRole.stop(true, true).fadeOut(120, function () {
        $(this).text(item.role).fadeIn(180);
      });

      $testimonialProfiles
        .find('.testimonial-profile')
        .removeClass('testimonial-profile--active')
        .attr('aria-pressed', 'false');

      $testimonialProfiles
        .find(`[data-index="${index}"]`)
        .addClass('testimonial-profile--active')
        .attr('aria-pressed', 'true');
    }

    renderProfiles();
    setActiveTestimonial(activeTestimonial);

    $testimonialProfiles.on('click', '.testimonial-profile', function () {
      const index = Number($(this).data('index'));
      if (index !== activeTestimonial) setActiveTestimonial(index);
    });
  }

  /* =============================================
     4. SUBSCRIBE FORM
  ============================================= */
  $('.help__subscribe').on('submit', function (e) {
    e.preventDefault();
  });

  /* =============================================
     5. VIDEO MODAL
  ============================================= */
  const $modal = $('#videoModal');
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
     6. SCROLL ANIMATIONS - fade in on enter
  ============================================= */
  const $animItems = $('.service-card, .help-feature, .trusted__logo-item');
  $animItems.css({
    opacity: 0,
    transform: 'translateY(24px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  });

  function revealOnScroll() {
    const viewBottom = $(window).scrollTop() + $(window).height() - 60;
    $animItems.each(function () {
      if ($(this).offset().top < viewBottom && $(this).css('opacity') === '0') {
        $(this).css({ opacity: 1, transform: 'translateY(0)' });
      }
    });
  }

  $(window).on('scroll.reveal', revealOnScroll);
  revealOnScroll();
});
