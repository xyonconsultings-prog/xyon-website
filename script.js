// Umbră pe header la scroll — prezent pe toate paginile
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Meniu mobil pe ecran complet — prezent pe toate paginile
const toggle = document.getElementById('menuToggle');
const overlay = document.getElementById('mobileOverlay');
if (toggle && overlay) {
  const closeMenu = () => {
    toggle.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    toggle.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  toggle.addEventListener('click', () => {
    if (overlay.classList.contains('open')) closeMenu(); else openMenu();
  });
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Buton "înapoi sus" — prezent pe toate paginile
const toTopBtn = document.getElementById('toTopBtn');
if (toTopBtn) {
  const onScrollTop = () => {
    toTopBtn.classList.toggle('visible', window.scrollY > 500);
  };
  onScrollTop();
  window.addEventListener('scroll', onScrollTop, { passive: true });
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Traseul din "Cum lucrăm" — există doar pe cum-lucram.html
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const routePath = document.getElementById('routePath');
if (routePath && !prefersReducedMotion) {
  const length = routePath.getTotalLength();
  routePath.style.strokeDasharray = length;
  routePath.style.strokeDashoffset = length;
  routePath.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        routePath.style.strokeDashoffset = '0';
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(routePath);
}

// Formularul de contact (mailto) — există doar pe contact.html
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nume = form.nume.value.trim();
    const companie = form.companie.value.trim();
    const email = form.email.value.trim();
    const mesaj = form.mesaj.value.trim();
    const subject = encodeURIComponent('Solicitare consultanță — ' + nume);
    const body = encodeURIComponent(
      'Nume: ' + nume +
      (companie ? '\nCompanie: ' + companie : '') +
      '\nEmail: ' + email +
      '\n\nMesaj:\n' + mesaj
    );
    window.location.href = 'mailto:contact@xyonconsulting.ro?subject=' + subject + '&body=' + body;
  });
}
