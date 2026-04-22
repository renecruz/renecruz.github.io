/* ============================================
   main.js — René Cruz Flores Portfolio
   ============================================
   Módulos:
   1. Nav — hamburger + cierre al hacer clic en enlace
   2. Header scroll — sombra al hacer scroll
   3. Active nav link — resalta sección activa
   4. Animación de entrada — reveal on scroll (IntersectionObserver)
   5. Skill tags — efecto ripple al hacer clic
============================================ */

'use strict';

/* ─────────────────────────────────────────
   1. NAV — HAMBURGER MENU
───────────────────────────────────────── */
(function initNav() {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links    = navLinks.querySelectorAll('.nav__link');

  function openMenu() {
    navLinks.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cierra el menú al hacer clic en cualquier enlace (mobile)
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cierra si el usuario hace clic fuera del nav
  document.addEventListener('click', (e) => {
    const header = document.querySelector('.site-header');
    if (!header.contains(e.target)) closeMenu();
  });
})();


/* ─────────────────────────────────────────
   2. HEADER SCROLL — SOMBRA DINÁMICA
───────────────────────────────────────── */
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px oklch(0% 0 0 / 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─────────────────────────────────────────
   3. ACTIVE NAV LINK — RESALTA SECCIÓN ACTIVA
───────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.id;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle(
          'nav__link--active',
          href === `#${activeId}`
        );
      });
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
})();


/* ─────────────────────────────────────────
   4. REVEAL ON SCROLL — ANIMACIÓN DE ENTRADA
───────────────────────────────────────── */
(function initRevealOnScroll() {
  // Solo elementos fuera del viewport inicial (no el hero)
  const targets = document.querySelectorAll(
    '.skill-card, .project-card, .sobre-mi__bio, .sobre-mi__meta'
  );

  // Estado inicial: invisible y desplazado hacia abajo
  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 500ms ease ${i * 60}ms, transform 500ms ease ${i * 60}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target); // anima solo una vez
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  targets.forEach(el => revealObserver.observe(el));
})();


/* ─────────────────────────────────────────
   5. SKILL TAGS — EFECTO RIPPLE AL CLIC
───────────────────────────────────────── */
(function initSkillTagRipple() {
  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach(tag => {
    tag.addEventListener('click', function (e) {
      // Crea el elemento ripple
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: oklch(52% 0.18 255 / 0.25);
        transform: scale(0);
        animation: ripple-anim 500ms linear;
        pointer-events: none;
        width: 80px;
        height: 80px;
        left: ${e.offsetX - 40}px;
        top:  ${e.offsetY - 40}px;
      `;

      // El padre necesita position: relative para que el ripple se posicione bien
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Inyectamos el keyframe de ripple al documento
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();


/* ─────────────────────────────────────────
   INIT LOG
───────────────────────────────────────── */
console.log('%c⚡ René Cruz Flores — Portfolio cargado correctamente', [
  'color: oklch(52% 0.18 255)',
  'font-family: monospace',
  'font-size: 13px',
  'padding: 4px'
].join(';'));
