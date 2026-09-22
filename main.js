const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => root.querySelectorAll(s);

// Mark JS as active only after the script has actually loaded.
document.documentElement.classList.add('js-ready');

const words = [
  'Web Developer',
  'Backend Developer',
  'Frontend Developer',
  'Full-Stack Developer'
];

function startTypingAnimation() {
  const el = document.getElementById('typing');
  if (!el) return;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = words[wordIndex];
    el.textContent = word.slice(0, charIndex);

    if (!deleting) {
      if (charIndex < word.length) {
        charIndex += 1;
        setTimeout(tick, 85);
      } else {
        deleting = true;
        setTimeout(tick, 1400);
      }
    } else if (charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, 45);
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 250);
    }
  };
  tick();
}

function initTheme() {
  const theme = $('#themeBtn');
  const mobileTheme = $('#mobileThemeBtn');

  try {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
    }
  } catch (_) {}

  const toggle = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    document.body.classList.toggle('light');
    try {
      localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    } catch (_) {}
  };

  theme?.addEventListener('click', toggle);
  mobileTheme?.addEventListener('click', toggle);
}

function initMobileMenu() {
  const menu = $('#menuBtn');
  const nav = $('#navLinks');
  if (!menu || !nav) return;

  const close = () => {
    nav.classList.remove('open', 'mobile-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  };

  menu.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const open = !nav.classList.contains('mobile-open');
    nav.classList.toggle('mobile-open', open);
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  $$('.nav-links a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('mobile-open')) return;
    if (!nav.contains(event.target) && !menu.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
}

function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px' });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }
  // Ensure the initial viewport is never blank if an observer is delayed.
  requestAnimationFrame(() => {
    items.forEach(item => {
      const r = item.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.15) item.classList.add('visible');
    });
  });
}

function initScroll() {
  const progress = $('#scrollProgress');
  const topBtn = $('#topBtn');
  const scrollCue = $('.scroll-cue');

  const update = () => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = (max ? (window.scrollY / max) * 100 : 0) + '%';
    if (topBtn) topBtn.classList.toggle('show', window.scrollY > 650);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  scrollCue?.addEventListener('click', () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initActiveNav() {
  const sections = $$('section[id]');
  const links = $$('.nav-links a');
  const update = () => {
    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initParallaxAndTilt() {
  $$('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (!window.matchMedia('(pointer:fine)').matches || window.matchMedia('(max-width:1024px)').matches) return;
      const r = card.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-7px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const heroVisual = $('.hero-visual');
  window.addEventListener('pointermove', event => {
    if (!heroVisual || !window.matchMedia('(pointer:fine)').matches || window.matchMedia('(max-width:1024px)').matches) return;
    const x = event.clientX / innerWidth - 0.5;
    const y = event.clientY / innerHeight - 0.5;
    heroVisual.style.transform = `translate3d(${15 + x * 12}px, ${-20 + y * 10}px, 0)`;
  }, { passive: true });
  const reset = () => {
    if (heroVisual && window.matchMedia('(max-width:1024px)').matches) heroVisual.style.transform = 'none';
  };
  window.addEventListener('resize', reset, { passive: true });
  reset();
}

function initParticles() {
  const container = $('.particles');
  if (!container || container.children.length) return;
  for (let i = 0; i < 55; i++) {
    const dot = document.createElement('i');
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDelay = Math.random() * 6 + 's';
    dot.style.animationDuration = 4 + Math.random() * 8 + 's';
    container.appendChild(dot);
  }
}

function initLightbox() {
  const lightbox = $('#projectLightbox');
  const lightboxImage = $('#projectLightboxImage');
  const closeButton = $('#projectLightboxClose');
  if (!lightbox || !lightboxImage) return;
  let zoom = 1;

  const open = (src, alt) => {
    if (!src) return;
    zoom = 1;
    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Image preview';
    lightboxImage.style.transform = 'scale(1)';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    lightboxImage.style.transform = '';
    document.body.style.overflow = '';
  };

  $$('.project-image-preview .project-image').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.currentSrc || img.src, img.alt));
  });

  $$('.certificate-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', event => {
      event.stopPropagation();
      open(img.currentSrc || img.src, img.alt || 'Certificate preview');
    });
  });

  lightboxImage.addEventListener('click', event => {
    event.stopPropagation();
    zoom = zoom > 1.1 ? 1 : 1.6;
    lightboxImage.style.transform = `scale(${zoom})`;
  });

  lightbox.addEventListener('wheel', event => {
    if (!lightbox.classList.contains('active')) return;
    event.preventDefault();
    zoom = Math.max(1, Math.min(2.6, zoom + (event.deltaY < 0 ? 0.15 : -0.15)));
    lightboxImage.style.transform = `scale(${zoom})`;
  }, { passive: false });

  closeButton?.addEventListener('click', close);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) close();
  });
}

function init() {
  startTypingAnimation();
  initTheme();
  initMobileMenu();
  initReveal();
  initScroll();
  initActiveNav();
  initParallaxAndTilt();
  initParticles();
  initLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
