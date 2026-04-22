/* ============================================================
   NEXUS — main.js
   Interactividad: nav scroll, reveal, formulario, pricing toggle
   ============================================================ */

'use strict';

// ── 1. NAV: sombra al hacer scroll ───────────────────────────
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── 2. HAMBURGER: menú móvil ──────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});


// ── 3. REVEAL: animación de entrada con IntersectionObserver ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // solo animar una vez
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


// ── 4. PRICING TOGGLE: mensual / anual ───────────────────────
const billingToggle  = document.getElementById('billingToggle');
const toggleMonthly  = document.getElementById('toggleMonthly');
const toggleAnnual   = document.getElementById('toggleAnnual');
const priceAmounts   = document.querySelectorAll('.price-amount');

let isAnnual = false;

billingToggle.addEventListener('click', () => {
  isAnnual = !isAnnual;
  billingToggle.classList.toggle('on', isAnnual);
  toggleMonthly.classList.toggle('active', !isAnnual);
  toggleAnnual.classList.toggle('active', isAnnual);

  priceAmounts.forEach(el => {
    const monthly = el.dataset.monthly;
    const annual  = el.dataset.annual;
    const value   = isAnnual ? annual : monthly;

    // Animación de cambio de precio
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      el.textContent = value === '0' ? 'Gratis' : `$${value}`;
      el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 180);
  });
});


// ── 5. FORMULARIO DE CONTACTO: validación y envío ─────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

/**
 * Valida un campo individual.
 * @param {HTMLElement} field  - El input/textarea
 * @param {HTMLElement} errorEl - El span de error
 * @returns {boolean}
 */
function validateField(field, errorEl) {
  const value = field.value.trim();
  let message = '';

  if (field.required && value === '') {
    message = 'Este campo es obligatorio.';
  } else if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      message = 'Ingresa un correo electrónico válido.';
    }
  }

  errorEl.textContent = message;
  field.classList.toggle('error', message !== '');
  return message === '';
}

// Validación en tiempo real (al salir del campo)
[
  { id: 'name',    errorId: 'nameError'    },
  { id: 'email',   errorId: 'emailError'   },
  { id: 'message', errorId: 'messageError' },
].forEach(({ id, errorId }) => {
  const field   = document.getElementById(id);
  const errorEl = document.getElementById(errorId);
  field.addEventListener('blur', () => validateField(field, errorEl));
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      validateField(field, errorEl);
    }
  });
});

// Envío del formulario
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameField    = document.getElementById('name');
  const emailField   = document.getElementById('email');
  const messageField = document.getElementById('message');
  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const isNameValid    = validateField(nameField,    nameError);
  const isEmailValid   = validateField(emailField,   emailError);
  const isMessageValid = validateField(messageField, messageError);

  if (!isNameValid || !isEmailValid || !isMessageValid) return;

  // Simula envío asíncrono
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');

  submitBtn.disabled   = true;
  btnText.textContent  = 'Enviando...';
  btnSpinner.hidden    = false;

  setTimeout(() => {
    submitBtn.disabled   = false;
    btnText.textContent  = 'Enviar mensaje';
    btnSpinner.hidden    = true;

    contactForm.reset();
    formSuccess.hidden = false;
    formSuccess.scrollIntoView = undefined; // evitar scroll automático

    // Ocultar mensaje de éxito después de 6 segundos
    setTimeout(() => { formSuccess.hidden = true; }, 6000);
  }, 1600);
});


// ── 6. SMOOTH SCROLL: anclas con offset para la nav fija ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = nav.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


// ── 7. ACTIVE NAV LINK: resalta el enlace de la sección activa
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));
