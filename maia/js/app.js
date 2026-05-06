/* ================================================================
   app.js — MAIA SPA
   Router + renderer + sidebar + home page
   ================================================================ */

/* ── Mermaid ──────────────────────────────────────────────────── */
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Open Sans, sans-serif',
  flowchart:  { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
  gantt:      { useMaxWidth: true, fontSize: 12 },
  timeline:   { useMaxWidth: true },
  quadrantChart: { useMaxWidth: true },
});

/* ── Marked renderer ─────────────────────────────────────────── */
const renderer = new marked.Renderer();

// Mermaid blocks → raw div (mermaid reads innerHTML directly)
// Other code blocks → escaped pre/code
renderer.code = function (code, lang) {
  // marked v9 may pass a token object in some builds
  if (typeof code === 'object' && code !== null) {
    lang = code.lang;
    code = code.text || '';
  }
  if (lang === 'mermaid') {
    // Do NOT escape — mermaid parses innerHTML and needs raw syntax chars
    return `<div class="mermaid">${code}</div>`;
  }
  const cls = lang ? ` class="language-${escAttr(lang)}"` : '';
  return `<pre><code${cls}>${escHtml(code)}</code></pre>`;
};

// Rewrite internal doc links to hash routes
const LINK_MAP = {
  '01-iniciativa-maia.md':       '#/doc01',
  '02-estructura-iniciativa.md': '#/doc02',
  '03-roadmap-visual.md':        '#/doc03',
  '04-mvp1-proceso-estandar.md': '#/doc04',
  '05-mvp2-celula-integrada.md': '#/doc05',
  '06-mvp3-inteligencia.md':     '#/doc06',
  '07-estrategia-implementacion.md': '#/doc07',
  '08-metricas-exito.md':        '#/doc08',
  '09-plan-comunicacion.md':     '#/doc09',
  '10-gestion-riesgos.md':       '#/doc10',
  '11-recursos.md':              '#/doc11',
  '00-glosario.md':              '#/glosario',
};

renderer.link = function (href, title, text) {
  let newHref = href || '';
  for (const [file, hash] of Object.entries(LINK_MAP)) {
    if (newHref === file || newHref.startsWith(file + '#')) {
      newHref = hash;
      break;
    }
  }
  const t = title ? ` title="${escAttr(title)}"` : '';
  return `<a href="${escAttr(newHref)}"${t}>${text}</a>`;
};

// Wrap tables for horizontal scroll on mobile
renderer.table = function (header, body) {
  return `<div class="table-wrap"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
};

marked.use({ renderer, breaks: false, gfm: true });

/* ── Helpers ─────────────────────────────────────────────────── */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escAttr(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ── Router ──────────────────────────────────────────────────── */
let currentDoc = null;

function getDocId() {
  const h = location.hash;
  if (!h || h === '#' || h === '#/') return 'home';
  return h.replace(/^#\//, '') || 'home';
}

async function navigate(docId) {
  if (docId === currentDoc) return;
  currentDoc = docId;

  const el = document.getElementById('pageContent');
  el.innerHTML = '<div class="loading">Cargando...</div>';

  if (docId === 'home') {
    el.innerHTML = buildHome();
  } else {
    const doc = DOCS[docId];
    if (!doc) {
      el.innerHTML = `<div class="not-found"><h2>Página no encontrada</h2><p>El documento <code>${escHtml(docId)}</code> no existe.</p></div>`;
      return;
    }
    el.innerHTML = `<div class="doc-content">${marked.parse(doc.content)}</div>`;
  }

  // Render mermaid diagrams
  await renderMermaid();

  updateNav(docId);
  scrollTop();
  closeSidebar();
}

async function renderMermaid() {
  const nodes = Array.from(document.querySelectorAll('.mermaid:not([data-processed])'));
  if (!nodes.length) return;
  try {
    await mermaid.run({ nodes, suppressErrors: true });
    // Detectar diagramas que desbordan y agregar indicador de scroll
    nodes.forEach(node => {
      const old = node.nextElementSibling;
      if (old && old.classList.contains('diagram-scroll-hint')) old.remove();
      if (node.scrollWidth > node.clientWidth + 4) {
        const hint = document.createElement('p');
        hint.className = 'diagram-scroll-hint';
        hint.textContent = 'Desliza para ver el diagrama completo';
        node.insertAdjacentElement('afterend', hint);
      }
    });
  } catch (e) {
    console.warn('Mermaid render error:', e);
  }
}

function updateNav(docId) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.doc === docId);
  });
}

function scrollTop() {
  document.getElementById('mainContent').scrollTo({ top: 0 });
  window.scrollTo({ top: 0 });
}

/* ── Home page ───────────────────────────────────────────────── */
function buildHome() {
  const cards = [
    { id: 'doc01', tag: '01', title: 'Visión & Alcance',         desc: 'Propósito, objetivos estratégicos, módulos y principios rectores.' },
    { id: 'doc02', tag: '02', title: 'Estructura',                desc: 'Organización, roles, gobernanza y cómo se encadenan los MVPs.' },
    { id: 'doc03', tag: '03', title: 'Roadmap Visual',            desc: 'Gantt detallado, dependencias entre MVPs, hitos y esfuerzo.' },
    { id: 'doc04', tag: 'MVP 1', title: 'Proceso Estándar',       desc: '8 fases SDLC, plantillas y setup unificado. Semanas 1-4.' },
    { id: 'doc05', tag: 'MVP 2', title: 'Célula Integrada',       desc: 'Agentes por rol, contratos, handoffs y fallback. Semanas 5-8.' },
    { id: 'doc06', tag: 'MVP 3', title: 'Inteligencia',           desc: 'Memoria persistente Nivel 1, ADR ligero, recuperación de contexto. Semanas 9-12.' },
    { id: 'doc07', tag: '07', title: 'Estrategia',                desc: 'Fases de implementación, modelo de adopción y cadencia de gobierno.' },
    { id: 'doc08', tag: '08', title: 'Métricas de Éxito',         desc: 'KPIs por MVP, tablero ejecutivo y línea base obligatoria.' },
    { id: 'doc09', tag: '09', title: 'Comunicación',              desc: 'Stakeholders, canales, narrativa y cronograma de comunicación.' },
    { id: 'doc10', tag: '10', title: 'Riesgos',                   desc: 'Matriz de riesgos, top 12, controles y plan de contingencia.' },
    { id: 'doc11', tag: '11', title: 'Recursos',                  desc: 'Equipo, perfiles, stack tecnológico y estimación de costos.' },
    { id: 'glosario', tag: 'A–Z', title: 'Glosario',             desc: 'Definición de términos, acrónimos y abreviaciones del proyecto.' },
  ];

  const cardsHtml = cards.map(c => `
    <a href="#/${c.id}" class="doc-card" data-nav="${c.id}">
      <div class="card-tag">${c.tag}</div>
      <div class="card-title">${c.title}</div>
      <div class="card-desc">${c.desc}</div>
    </a>`).join('');

  return `
    <div class="home-hero">
      <div class="hero-badge">IDS &middot; Iniciativa Corporativa 2026</div>
      <h1 class="hero-title"><span class="accent">MAIA</span></h1>
      <p class="hero-sub">Modular AI for Innovation &amp; Acceleration</p>
      <p class="hero-desc">Convierte el uso disperso de IA en un proceso medible, con evidencia auditable y adopción progresiva en toda la organización.</p>
      <div class="hero-stats">
        <div><div class="stat-number">3</div><div class="stat-label">MVPs encadenados</div></div>
        <div><div class="stat-number">17</div><div class="stat-label">semanas · Fases 0-4</div></div>
        <div><div class="stat-number">~2,400</div><div class="stat-label">horas-persona estimadas</div></div>
        <div><div class="stat-number">5+</div><div class="stat-label">equipos en escalado</div></div>
      </div>
    </div>

    <div class="timeline-strip">
      <div class="strip-title">Timeline 2026</div>
      <div class="phases-row">
        <div class="phase-box">
          <div class="phase-tag">Fase 0</div>
          <div class="phase-name">Línea Base</div>
          <div class="phase-date">18–22 may</div>
        </div>
        <div class="phase-box">
          <div class="phase-tag">MVP 1</div>
          <div class="phase-name">Proceso Estándar</div>
          <div class="phase-date">25 may – 19 jun</div>
        </div>
        <div class="phase-box">
          <div class="phase-tag">MVP 2</div>
          <div class="phase-name">Célula Integrada</div>
          <div class="phase-date">22 jun – 17 jul</div>
        </div>
        <div class="phase-box">
          <div class="phase-tag">MVP 3</div>
          <div class="phase-name">Inteligencia</div>
          <div class="phase-date">20 jul – 14 ago</div>
        </div>
        <div class="phase-box">
          <div class="phase-tag">Fase 4</div>
          <div class="phase-name">Hardening</div>
          <div class="phase-date">17 ago – 11 sep</div>
        </div>
      </div>
    </div>

    <div class="home-section-head">
      <h2>Documentos de la iniciativa</h2>
      <div class="head-line"></div>
    </div>
    <div class="doc-grid">${cardsHtml}</div>
  `;
}

/* ── Sidebar toggle (mobile) ─────────────────────────────────── */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

document.getElementById('sidebarToggle').addEventListener('click', openSidebar);
document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

/* ── Navigation clicks ───────────────────────────────────────── */
// Sidebar links
document.getElementById('sidebarNav').addEventListener('click', e => {
  const item = e.target.closest('.nav-item');
  if (!item) return;
  // allow default (hash change) — router handles it
});

// Home cards (delegated)
document.getElementById('pageContent').addEventListener('click', e => {
  const card = e.target.closest('[data-nav]');
  if (card) {
    e.preventDefault();
    const id = card.dataset.nav;
    location.hash = '#/' + id;
  }
});

/* ── Hash router ─────────────────────────────────────────────── */
window.addEventListener('hashchange', () => navigate(getDocId()));

/* ── Boot ────────────────────────────────────────────────────── */
navigate(getDocId());
