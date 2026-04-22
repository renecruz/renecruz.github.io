/**
 * DEV QUIZ — app.js
 * Fundamentos del Desarrollo Web Profesional
 * ─────────────────────────────────────────────
 * Estructura de datos: arrays de objetos con preguntas
 * por categoría. Lógica de quiz, retroalimentación
 * visual en tiempo real y pantalla de resultados.
 */

'use strict';

// ═══════════════════════════════════════════════
//  BANCO DE PREGUNTAS
//  Cada pregunta es un objeto con:
//  { category, question, options[], answer, explain }
// ═══════════════════════════════════════════════

const questions = [
  // ── Internet & Web ────────────────────────
  {
    category: 'Internet & Web',
    question: '¿Cuál es la función principal del protocolo HTTP?',
    options: [
      'Cifrar la comunicación entre cliente y servidor',
      'Transferir documentos hipermedia entre cliente y servidor',
      'Asignar direcciones IP a los dispositivos de la red',
      'Conectar físicamente computadoras en una red local'
    ],
    answer: 1,
    explain: 'HTTP (HyperText Transfer Protocol) define cómo se solicitan y transfieren páginas web entre el navegador (cliente) y el servidor.'
  },
  {
    category: 'Internet & Web',
    question: '¿Qué devuelve el servidor cuando una solicitud HTTP es exitosa?',
    options: [
      'Código de estado 404',
      'Código de estado 500',
      'Código de estado 200',
      'Código de estado 301'
    ],
    answer: 2,
    explain: 'El código 200 OK indica que la solicitud fue procesada correctamente. El 404 es "no encontrado", 500 es error del servidor, y 301 es redirección permanente.'
  },

  // ── Terminal ──────────────────────────────
  {
    category: 'Terminal',
    question: '¿Qué hace el comando `cd ..` en la terminal?',
    options: [
      'Crea un directorio nuevo',
      'Lista los archivos del directorio actual',
      'Sube un nivel al directorio padre',
      'Elimina el directorio actual'
    ],
    answer: 2,
    explain: '`cd` (change directory) seguido de `..` navega hacia el directorio padre (un nivel arriba) en la jerarquía del sistema de archivos.'
  },
  {
    category: 'Terminal',
    question: '¿Cuál de estos comandos muestra el contenido de un archivo de texto en la terminal?',
    options: [
      'ls archivo.txt',
      'mkdir archivo.txt',
      'rm archivo.txt',
      'cat archivo.txt'
    ],
    answer: 3,
    explain: '`cat` concatena y muestra el contenido de uno o varios archivos directamente en la terminal. `ls` lista directorios, `mkdir` crea carpetas y `rm` elimina archivos.'
  },

  // ── HTML ──────────────────────────────────
  {
    category: 'HTML',
    question: '¿Cuál es el propósito del elemento `<head>` en HTML?',
    options: [
      'Mostrar el encabezado visual de la página',
      'Contener metadatos, título y recursos como CSS o JS',
      'Crear el menú de navegación principal',
      'Definir el primer párrafo del documento'
    ],
    answer: 1,
    explain: 'El `<head>` contiene metainformación sobre el documento: título, charset, enlaces a hojas de estilo, scripts y metaetiquetas. No es contenido visible.'
  },
  {
    category: 'HTML',
    question: '¿Qué atributo hace que una imagen sea accesible para lectores de pantalla?',
    options: [
      'src',
      'href',
      'alt',
      'title'
    ],
    answer: 2,
    explain: 'El atributo `alt` proporciona texto alternativo descriptivo de la imagen. Los lectores de pantalla lo leen para usuarios con discapacidad visual, y también se muestra si la imagen no carga.'
  },

  // ── CSS ───────────────────────────────────
  {
    category: 'CSS',
    question: '¿Cuál propiedad CSS se usa para cambiar el color de fondo de un elemento?',
    options: [
      'color',
      'background-color',
      'border-color',
      'fill'
    ],
    answer: 1,
    explain: '`background-color` establece el color de fondo. La propiedad `color` afecta solo el texto del elemento. `border-color` afecta el borde y `fill` se usa en SVG.'
  },
  {
    category: 'CSS',
    question: '¿Qué modelo de layout de CSS permite alinear elementos en filas Y columnas simultáneamente?',
    options: [
      'Flexbox',
      'Float',
      'CSS Grid',
      'Position Absolute'
    ],
    answer: 2,
    explain: 'CSS Grid es un sistema de layout bidimensional (filas y columnas). Flexbox es unidimensional (una fila o una columna a la vez). Grid y Flexbox se complementan, no se excluyen.'
  },

  // ── JavaScript ────────────────────────────
  {
    category: 'JavaScript',
    question: '¿Cuál es la diferencia entre `let` y `const` en JavaScript?',
    options: [
      'No hay diferencia, son sinónimos',
      '`let` permite reasignar el valor; `const` no permite reasignación',
      '`const` permite reasignar el valor; `let` no',
      '`let` es solo para números; `const` es para textos'
    ],
    answer: 1,
    explain: '`let` declara una variable que puede cambiar su valor. `const` declara una constante: su referencia no se puede reasignar, aunque los objetos y arrays sí pueden mutar internamente.'
  },
  {
    category: 'JavaScript',
    question: '¿Qué método de array se usa para recorrer todos sus elementos y ejecutar una función?',
    options: [
      'array.push()',
      'array.pop()',
      'array.forEach()',
      'array.indexOf()'
    ],
    answer: 2,
    explain: '`forEach()` itera sobre cada elemento del array y ejecuta un callback. `push()` agrega elementos, `pop()` elimina el último, e `indexOf()` busca la posición de un elemento.'
  },

  // ── Git & GitHub ──────────────────────────
  {
    category: 'Git & GitHub',
    question: '¿Qué hace el comando `git add .`?',
    options: [
      'Crea un nuevo repositorio',
      'Envía los cambios al repositorio remoto',
      'Agrega todos los archivos modificados al área de staging',
      'Crea una nueva rama'
    ],
    answer: 2,
    explain: '`git add .` mueve todos los archivos modificados o nuevos al área de staging (preparación). Desde ahí, puedes confirmarlos con `git commit`. Aún no se suben al servidor.'
  },
  {
    category: 'Git & GitHub',
    question: '¿Cuál es la función de `git push` en el flujo de trabajo con GitHub?',
    options: [
      'Descargar los últimos cambios del repositorio remoto',
      'Crear una nueva rama en el repositorio',
      'Eliminar el historial de commits',
      'Subir los commits locales al repositorio remoto'
    ],
    answer: 3,
    explain: '`git push` envía los commits que tienes localmente hacia el repositorio remoto (por ejemplo, GitHub). El complemento es `git pull`, que descarga cambios remotos a tu máquina.'
  }
];

// ═══════════════════════════════════════════════
//  ESTADO DEL QUIZ
// ═══════════════════════════════════════════════

let state = {
  current:    0,        // índice de la pregunta actual
  score:      0,        // puntos acumulados
  answered:   false,    // si ya respondió la pregunta actual
  results:    []        // historial: { category, correct }
};

// ═══════════════════════════════════════════════
//  REFERENCIAS AL DOM
// ═══════════════════════════════════════════════

const screens = {
  start:  document.getElementById('screen-start'),
  quiz:   document.getElementById('screen-quiz'),
  result: document.getElementById('screen-result')
};

const el = {
  qCounter:      document.getElementById('q-counter'),
  scoreDisplay:  document.getElementById('score-display'),
  progressFill:  document.getElementById('progress-fill'),
  qCategory:     document.getElementById('q-category'),
  questionText:  document.getElementById('question-text'),
  optionsGrid:   document.getElementById('options-grid'),
  feedbackBanner:document.getElementById('feedback-banner'),
  feedbackIcon:  document.getElementById('feedback-icon'),
  feedbackMsg:   document.getElementById('feedback-msg'),
  feedbackExpl:  document.getElementById('feedback-explain'),
  btnNext:       document.getElementById('btn-next'),
  btnNextLabel:  document.getElementById('btn-next-label'),
  resultEmoji:   document.getElementById('result-emoji'),
  resultTitle:   document.getElementById('result-title'),
  resultSubtitle:document.getElementById('result-subtitle'),
  finalScore:    document.getElementById('final-score'),
  finalTotal:    document.getElementById('final-total'),
  scoreArc:      document.getElementById('score-arc'),
  breakdown:     document.getElementById('result-breakdown')
};

// ═══════════════════════════════════════════════
//  FUNCIONES PRINCIPALES
// ═══════════════════════════════════════════════

/**
 * Muestra una pantalla y oculta las demás.
 * @param {string} name - 'start' | 'quiz' | 'result'
 */
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
  });
}

/**
 * Inicializa o reinicia el quiz.
 */
function initQuiz() {
  state = { current: 0, score: 0, answered: false, results: [] };
  renderQuestion();
  showScreen('quiz');
}

/**
 * Renderiza la pregunta actual en pantalla.
 */
function renderQuestion() {
  const q      = questions[state.current];
  const total  = questions.length;
  const index  = state.current;

  // Actualizar encabezado y barra de progreso
  el.qCounter.textContent     = `${index + 1} / ${total}`;
  el.scoreDisplay.textContent = state.score;
  el.progressFill.style.width = `${((index) / total) * 100}%`;

  // Categoría y texto de la pregunta
  el.qCategory.textContent    = q.category;
  el.questionText.textContent = q.question;

  // Limpiar estado visual anterior
  el.feedbackBanner.className = 'feedback-banner hidden';
  el.btnNext.classList.add('hidden');
  state.answered = false;

  // Generar botones de opciones
  el.optionsGrid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((optText, i) => {
    const btn = document.createElement('button');
    btn.className  = 'option-btn';
    btn.dataset.index = i;
    btn.innerHTML  = `<span class="option-letter">${letters[i]}</span>${optText}`;
    btn.addEventListener('click', () => handleAnswer(i));
    el.optionsGrid.appendChild(btn);
  });

  // Re-animar la tarjeta
  const card = document.getElementById('question-card');
  card.style.animation = 'none';
  card.offsetHeight;     // fuerza reflow
  card.style.animation = '';
}

/**
 * Maneja la respuesta del usuario.
 * @param {number} selectedIndex - índice de la opción elegida
 */
function handleAnswer(selectedIndex) {
  if (state.answered) return;
  state.answered = true;

  const q        = questions[state.current];
  const isCorrect = selectedIndex === q.answer;

  // Actualizar puntaje
  if (isCorrect) state.score++;

  // Registrar en historial
  state.results.push({ category: q.category, correct: isCorrect });

  // Estilizar botones
  const btns = el.optionsGrid.querySelectorAll('.option-btn');
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer)   btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  // Mostrar retroalimentación
  showFeedback(isCorrect, q.explain);

  // Mostrar botón "Siguiente"
  const isLast = state.current === questions.length - 1;
  el.btnNextLabel.textContent = isLast ? 'Ver resultados' : 'Siguiente pregunta';
  el.btnNext.classList.remove('hidden');

  // Actualizar score display
  el.scoreDisplay.textContent = state.score;
}

/**
 * Muestra el banner de retroalimentación.
 * @param {boolean} correct
 * @param {string}  explanation
 */
function showFeedback(correct, explanation) {
  el.feedbackBanner.className = `feedback-banner ${correct ? 'is-correct' : 'is-wrong'}`;
  el.feedbackIcon.textContent = correct ? '✅' : '❌';
  el.feedbackMsg.textContent  = correct ? '¡Correcto!' : 'No es correcto';
  el.feedbackExpl.textContent = explanation;
}

/**
 * Avanza a la siguiente pregunta o muestra resultados.
 */
function nextQuestion() {
  state.current++;
  if (state.current < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

/**
 * Muestra la pantalla de resultados con animaciones.
 */
function showResults() {
  const total   = questions.length;
  const score   = state.score;
  const pct     = score / total;

  // Barra de progreso al 100%
  el.progressFill.style.width = '100%';

  showScreen('result');

  // Emoji y mensaje según desempeño
  let emoji, title, subtitle;

  if (pct === 1) {
    emoji    = '🏆';
    title    = '¡Perfecto!';
    subtitle = 'Dominas por completo los fundamentos del desarrollo web. ¡Estás listo para el siguiente nivel!';
  } else if (pct >= 0.75) {
    emoji    = '🎯';
    title    = '¡Muy bien!';
    subtitle = 'Tienes una sólida base. Repasa los temas donde fallaste y estarás al 100%.';
  } else if (pct >= 0.5) {
    emoji    = '💡';
    title    = '¡Vas por buen camino!';
    subtitle = 'Conoces los fundamentos, pero aún hay conceptos por reforzar. ¡Sigue practicando!';
  } else {
    emoji    = '📚';
    title    = '¡Sigue estudiando!';
    subtitle = 'Los fundamentos son la base de todo. Revisa los cursos de la ruta y vuelve a intentarlo.';
  }

  el.resultEmoji.textContent    = emoji;
  el.resultTitle.textContent    = title;
  el.resultSubtitle.textContent = subtitle;

  // Puntuación numérica
  el.finalScore.textContent = score;
  el.finalTotal.textContent = `/ ${total}`;

  // Animación del arco SVG
  const circumference = 314; // 2π × r(50) ≈ 314
  const offset = circumference - (pct * circumference);
  requestAnimationFrame(() => {
    el.scoreArc.style.strokeDashoffset = offset;
  });

  // Breakdown por categoría
  buildBreakdown();
}

/**
 * Construye el desglose de resultados por categoría.
 */
function buildBreakdown() {
  // Agrupar resultados por categoría
  const cats = {};
  state.results.forEach(r => {
    if (!cats[r.category]) cats[r.category] = { total: 0, correct: 0 };
    cats[r.category].total++;
    if (r.correct) cats[r.category].correct++;
  });

  el.breakdown.innerHTML = '';

  Object.entries(cats).forEach(([cat, data]) => {
    const pct = (data.correct / data.total) * 100;
    const row = document.createElement('div');
    row.className = 'breakdown-row';
    row.innerHTML = `
      <span class="breakdown-label">${cat}</span>
      <div class="breakdown-bar-track">
        <div class="breakdown-bar-fill" style="width: 0%"></div>
      </div>
      <span class="breakdown-score">${data.correct}/${data.total}</span>
    `;
    el.breakdown.appendChild(row);

    // Animar la barra con un pequeño retraso
    requestAnimationFrame(() => {
      setTimeout(() => {
        row.querySelector('.breakdown-bar-fill').style.width = `${pct}%`;
      }, 100);
    });
  });
}

// ═══════════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════════

document.getElementById('btn-start').addEventListener('click', initQuiz);

el.btnNext.addEventListener('click', nextQuestion);

document.getElementById('btn-restart').addEventListener('click', () => {
  // Reiniciar arco del SVG antes de cambiar pantalla
  el.scoreArc.style.strokeDashoffset = '314';
  initQuiz();
});
