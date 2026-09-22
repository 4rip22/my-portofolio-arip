const $ = s => document.querySelector(s),
      $$ = s => document.querySelectorAll(s);

// Mark JavaScript as active. The CSS uses this class to keep reveal animations
// on desktop while still showing the portfolio if the script is blocked.
document.documentElement.classList.add('js-ready');

const words = [
  'Web Developer',
  'Backend Developer',
  'Frontend Developer',
  'Full-Stack Developer'
];

// Hero typing animation. Start after the DOM is ready so the animation
// cannot fail simply because the script is evaluated before #typing exists.
function startTypingAnimation() {
  const el = document.getElementById('typing');
  if (!el) return;

  let wi = 0;
  let ci = 0;
  let deleting = false;

  function type() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);

    if (!deleting && ci < word.length) {
      ci++;
      setTimeout(type, 80);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1400);
    } else if (ci > 0) {
      ci--;
      setTimeout(type, 40);
    } else {
      deleting = false;
      wi = (wi + 1) % words.length;
      setTimeout(type, 250);
    }
  }

  type();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startTypingAnimation, { once: true });
} else {
  startTypingAnimation();
}


// ===============================
// THEME
// ===============================

const theme = $('#themeBtn');
const mobileTheme = $('#mobileThemeBtn');

function applyTheme() {
  const isLight = document.body.classList.contains('light');
  try {
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  } catch (_) {}
}

function toggleTheme(event) {
  if (event) event.preventDefault();
  document.body.classList.toggle('light');
  applyTheme();
}

if (theme) theme.addEventListener('click', toggleTheme);
if (mobileTheme) mobileTheme.addEventListener('click', toggleTheme);

try {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }
} catch (_) {}


// ===============================
// MOBILE MENU
// ===============================

const menu = $('#menuBtn');
const nav = $('#navLinks');

function closeMobileMenu() {
  if (!nav || !menu) return;
  nav.classList.remove('open', 'mobile-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}

function toggleMobileMenu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!menu || !nav) return;

  const isOpen = !nav.classList.contains('mobile-open');
  nav.classList.toggle('mobile-open', isOpen);
  nav.classList.toggle('open', isOpen);
  menu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

if (menu && nav) {
  menu.addEventListener('click', toggleMobileMenu);
  menu.setAttribute('aria-expanded', 'false');

  $$('.nav-links a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', event => {
    if (window.matchMedia('(max-width: 1024px)').matches &&
        nav.classList.contains('mobile-open') &&
        !nav.contains(event.target) &&
        !menu.contains(event.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}


// ===============================
// SCROLL REVEAL
// ===============================

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');

          e.target.style.setProperty(
            '--reveal-delay',
            (Array.from(e.target.parentElement?.children || [])
              .indexOf(e.target) % 5) * 80 + 'ms'
          );
        }
      });
    },
    {
      threshold: 0.10,
      rootMargin: '0px 0px -30px'
    }
  );

  $$('.reveal').forEach(e => obs.observe(e));
} else {
  $$('.reveal').forEach(e => e.classList.add('visible'));
}


// ===============================
// CARD TILT EFFECT
// ===============================

$$('.tilt-card').forEach(card => {

  card.addEventListener('pointermove', e => {

    if (matchMedia('(pointer:fine)').matches) {

      const r = card.getBoundingClientRect();

      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      card.style.transform =
        `perspective(900px)
         rotateX(${y * -5}deg)
         rotateY(${x * 6}deg)
         translateY(-7px)`;
    }

  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });

});


// ===============================
// HERO PROFILE PARALLAX
// ===============================

const heroVisual = document.querySelector('.hero-visual');

window.addEventListener(
  'pointermove',
  e => {

    if (
      heroVisual &&
      matchMedia('(pointer:fine)').matches &&
      !matchMedia('(max-width: 1024px)').matches
    ) {

      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;

      // Profil sedikit ke kanan dan ke atas.
      // Efek parallax tetap berjalan.
      const moveX = 15 + x * 12;
      const moveY = -20 + y * 10;

      heroVisual.style.transform =
        `translate3d(${moveX}px, ${moveY}px, 0)`;
    }

  },
  {
    passive: true
  }
);

const resetMobileHeroMotion = () => {
  if (heroVisual && matchMedia('(max-width: 1024px)').matches) {
    heroVisual.style.transform = 'none';
  }
};
window.addEventListener('resize', resetMobileHeroMotion, { passive: true });
resetMobileHeroMotion();


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = $$('section[id]');
const links = $$('.nav-links a');

window.addEventListener(
  'scroll',
  () => {

    let cur = 'home';

    sections.forEach(s => {

      if (scrollY >= s.offsetTop - 180) {
        cur = s.id;
      }

    });

    links.forEach(a => {

      a.classList.toggle(
        'active',
        a.getAttribute('href') === '#' + cur
      );

    });

  },
  {
    passive: true
  }
);


// ===============================
// PARTICLES
// ===============================

const p = $('.particles');

if (p) {

  for (let i = 0; i < 55; i++) {

    const x = document.createElement('i');

    x.style.left = Math.random() * 100 + '%';
    x.style.top = Math.random() * 100 + '%';

    x.style.animationDelay =
      Math.random() * 6 + 's';

    x.style.animationDuration =
      4 + Math.random() * 8 + 's';

    p.appendChild(x);
  }

}


// ===============================
// SCROLL PROGRESS + BACK TO TOP
// ===============================

const progress = document.getElementById('scrollProgress');
const topBtn = document.getElementById('topBtn');

window.addEventListener(
  'scroll',
  () => {

    const max =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (progress) {
      progress.style.width =
        (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    }

    if (topBtn) {
      topBtn.classList.toggle(
        'show',
        scrollY > 650
      );
    }

  },
  {
    passive: true
  }
);

if (topBtn) {
  topBtn.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
}


// ===============================
// SECTION GLOW
// ===============================

if ('IntersectionObserver' in window) {
  const sectionGlow = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        e.target.classList.toggle('section-active', e.isIntersecting);
      });
    },
    { threshold: 0.35 }
  );

  $$('.section').forEach(s => sectionGlow.observe(s));
}

// ===============================
// PROJECT IMAGE LIGHTBOX
// ===============================

const projectImages = document.querySelectorAll('.project-image');
const projectLightbox = document.getElementById('projectLightbox');
const projectLightboxImage = document.getElementById('projectLightboxImage');
const projectLightboxClose = document.getElementById('projectLightboxClose');


// ===============================
// CERTIFICATE IMAGE LIGHTBOX
// ===============================
// Reuse the existing project lightbox so the certificate can be
// opened, viewed, and returned to the original state without
// changing the existing project functionality.

document.querySelectorAll('.certificate-image').forEach(card => {
  const img = card.querySelector('img');
  if (!img) return;

  card.style.cursor = 'zoom-in';

  card.addEventListener('click', () => {
    if (!projectLightbox || !projectLightboxImage) return;

    projectLightboxImage.src = img.currentSrc || img.src;
    projectLightboxImage.alt = img.alt || 'Certificate preview';
    projectLightbox.classList.add('active');
    projectLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeProjectLightbox() {
  if (!projectLightbox) return;
  projectLightbox.classList.remove('active');
  projectLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (projectLightboxImage) projectLightboxImage.removeAttribute('src');
}

// Only the featured Selected Work screenshot opens the lightbox.
document.querySelectorAll('.project-image-preview .project-image').forEach(img => {
  img.addEventListener('click', () => {
    if (!projectLightbox || !projectLightboxImage) return;
    projectLightboxImage.src = img.currentSrc || img.src;
    projectLightboxImage.alt = img.alt || 'Project preview';
    projectLightbox.classList.add('active');
    projectLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

if (projectLightboxClose) {
  projectLightboxClose.addEventListener('click', closeProjectLightbox);
}

if (projectLightbox) {
  projectLightbox.addEventListener('click', event => {
    if (event.target === projectLightbox) closeProjectLightbox();
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProjectLightbox();
});
