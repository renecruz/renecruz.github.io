/**
 * DEVBLOG — js/main.js
 * Funcionalidades JavaScript compartidas:
 *  1. Modo oscuro / claro con persistencia en localStorage
 *  2. Menú móvil toggle
 *  3. Marcar enlace activo en la navegación
 *  4. Búsqueda de artículos en tiempo real
 *  5. Filtros por categoría
 */

'use strict';

/* ══════════════════════════════════════════════════
   1. MODO OSCURO
   ══════════════════════════════════════════════════ */

/**
 * Aplica el tema al elemento <html> y guarda la
 * preferencia del usuario en localStorage.
 * @param {'light'|'dark'} theme
 */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('devblog-theme', theme);
}

/**
 * Alterna entre modo claro y oscuro.
 */
function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/**
 * Inicializa el tema al cargar la página.
 * Prioridad: localStorage > preferencia del sistema.
 */
function initTheme() {
  const saved    = localStorage.getItem('devblog-theme');
  const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefDark ? 'dark' : 'light'));
}

/* ══════════════════════════════════════════════════
   2. MENÚ MÓVIL
   ══════════════════════════════════════════════════ */

function initMobileMenu() {
  const btnMenu = document.getElementById('btn-menu');
  const siteNav = document.getElementById('site-nav');
  if (!btnMenu || !siteNav) return;

  btnMenu.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    btnMenu.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !btnMenu.contains(e.target)) {
      siteNav.classList.remove('open');
      btnMenu.setAttribute('aria-expanded', false);
    }
  });
}

/* ══════════════════════════════════════════════════
   3. ENLACE ACTIVO EN NAVEGACIÓN
   ══════════════════════════════════════════════════ */

function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks    = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ══════════════════════════════════════════════════
   4. BÚSQUEDA EN TIEMPO REAL
   Se activa solo si existe #search-input en la página
   ══════════════════════════════════════════════════ */

function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const cards       = document.querySelectorAll('.post-card[data-title]');
  const noResults   = document.getElementById('no-results');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    filterCards(query, getActiveFilter());
  });

  /**
   * Filtra y muestra/oculta cards según query y categoría.
   * @param {string} query - texto de búsqueda en minúsculas
   * @param {string} category - categoría activa ('all' o nombre)
   */
  window.filterCards = function(query, category) {
    let visibleCount = 0;

    cards.forEach(card => {
      const title    = (card.dataset.title    || '').toLowerCase();
      const excerpt  = (card.dataset.excerpt  || '').toLowerCase();
      const cat      = (card.dataset.category || '').toLowerCase();

      const matchesSearch   = !query || title.includes(query) || excerpt.includes(query);
      const matchesCategory = category === 'all' || cat === category.toLowerCase();

      if (matchesSearch && matchesCategory) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.classList.toggle('visible', visibleCount === 0);
    }
  };
}

/* ══════════════════════════════════════════════════
   5. FILTROS POR CATEGORÍA
   ══════════════════════════════════════════════════ */

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Activar botón seleccionado
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Aplicar filtro combinado con búsqueda actual
      const category    = btn.dataset.filter;
      const searchQuery = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
      window.filterCards?.(searchQuery, category);
    });
  });
}

/**
 * Devuelve la categoría del filtro activo actualmente.
 * @returns {string}
 */
function getActiveFilter() {
  return document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
}

/* ══════════════════════════════════════════════════
   INICIALIZACIÓN
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initActiveNav();
  initMobileMenu();
  initSearch();
  initFilters();

  // Botón de tema (en todas las páginas)
  document.getElementById('btn-theme')
    ?.addEventListener('click', toggleTheme);
});
