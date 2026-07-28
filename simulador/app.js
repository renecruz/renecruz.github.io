/* ==========================================================================
   Simulador DEA-C01 - Lógica de la aplicación
   Parser de bancos de reactivos en Markdown + motor de examen + resultados.
   Todo se ejecuta localmente en el navegador; no hay backend.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * Estado global
   * ------------------------------------------------------------------ */
  const state = {
    files: [],            // { name, questions: [], error: string|null }
    questions: [],        // banco combinado usado en el examen
    answers: [],          // por pregunta: Set de letras seleccionadas
    flags: [],            // por pregunta: boolean
    revealed: [],         // por pregunta: boolean (retroalimentación ya mostrada)
    immediateFeedback: false, // revisión inmediata pregunta por pregunta
    current: 0,
    passingScore: 72,
    timerTotalSec: 0,     // 0 = sin límite
    timerRemainingSec: 0,
    timerId: null,
    finished: false,
    showAllReview: false
  };

  const $ = (id) => document.getElementById(id);

  /* ------------------------------------------------------------------
   * Utilidades de Markdown (render mínimo y seguro)
   * ------------------------------------------------------------------ */

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Convierte un fragmento de Markdown (párrafos, negritas, código, listas
  // simples y enlaces) a HTML seguro.
  function mdToHtml(md) {
    if (!md) return "";
    const lines = md.replace(/\r\n?/g, "\n").split("\n");
    const out = [];
    let para = [];
    let inCode = false;
    let codeLines = [];
    let codeLang = "";
    let listItems = null;

    const flushPara = () => {
      if (para.length) {
        out.push("<p>" + inlineMd(para.join(" ")) + "</p>");
        para = [];
      }
    };
    const flushList = () => {
      if (listItems && listItems.length) {
        out.push("<ul>" + listItems.map((li) => "<li>" + inlineMd(li) + "</li>").join("") + "</ul>");
      }
      listItems = null;
    };

    for (const raw of lines) {
      const line = raw;
      const fence = line.match(/^\s*```(\w*)/);
      if (fence) {
        if (!inCode) {
          flushPara();
          flushList();
          inCode = true;
          codeLang = fence[1] || "";
          codeLines = [];
        } else {
          out.push(
            '<pre><code class="lang-' + escapeHtml(codeLang) + '">' +
            escapeHtml(codeLines.join("\n")) + "</code></pre>"
          );
          inCode = false;
        }
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }

      const heading = line.match(/^\s*#{2,6}\s+(.*)$/);
      if (heading) {
        flushPara();
        flushList();
        out.push("<h4>" + inlineMd(heading[1]) + "</h4>");
        continue;
      }

      const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
      if (listMatch) {
        flushPara();
        if (!listItems) listItems = [];
        listItems.push(listMatch[1]);
        continue;
      }
      if (!line.trim()) {
        flushPara();
        flushList();
        continue;
      }
      flushList();
      para.push(line.trim());
    }
    if (inCode && codeLines.length) {
      out.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
    }
    flushPara();
    flushList();
    return out.join("\n");
  }

  // Elementos en línea: negrita, cursiva, código, enlaces.
  function inlineMd(text) {
    let t = escapeHtml(text);
    // código en línea primero para no tocar su contenido
    t = t.replace(/`([^`]+)`/g, (_, c) => "<code>" + c + "</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    t = t.replace(
      /(https?:\/\/[^\s<)]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    return t;
  }

  /* ------------------------------------------------------------------
   * Parser del banco de reactivos (.md)
   * ------------------------------------------------------------------ */

  function parseMarkdown(text, sourceName) {
    const normalized = text.replace(/\r\n?/g, "\n");
    const blocks = normalized.split(/^##\s+(?:Pregunta|Question)\s+\d+[^\n]*$/m).slice(1);
    const questions = [];

    blocks.forEach((block, idx) => {
      const q = parseQuestionBlock(block, idx + 1, sourceName);
      if (q) questions.push(q);
    });
    return questions;
  }

  function parseQuestionBlock(block, number, sourceName) {
    // Localizar secciones (soporta encabezados en español e inglés)
    const optHeaderRe = /^###\s+(?:Opciones|Options)\s*$/m;
    const optIdx = block.search(optHeaderRe);
    if (optIdx === -1) return null;

    let statement = block.slice(0, optIdx);
    // Quitar el marcador "**Pregunta**" / "**Question**" si existe
    statement = statement.replace(/^\s*\*\*(?:Pregunta|Question)\*\*\s*$/m, "").trim();

    let rest = block.slice(optIdx).replace(optHeaderRe, "");

    // Fin de la zona de opciones: encabezado de respuesta correcta
    const ansHeaderRe = /^###\s+(?:Respuestas?\s+correctas?|Correct\s+Answers?)\s*$/mi;
    const ansIdx = rest.search(ansHeaderRe);
    let optionsZone = ansIdx !== -1 ? rest.slice(0, ansIdx) : rest;
    let afterOptions = ansIdx !== -1 ? rest.slice(ansIdx) : "";

    // Explicación
    let explanation = "";
    let answerSummary = "";
    if (afterOptions) {
      const expHeaderRe = /^###\s+(?:Explicaci[oó]n|Explanation)\s*$/mi;
      const expIdx = afterOptions.search(expHeaderRe);
      const ansBody = expIdx !== -1 ? afterOptions.slice(0, expIdx) : afterOptions;
      answerSummary = ansBody
        .replace(/^###\s+(?:Respuestas?\s+correctas?|Correct\s+Answers?)\s*$/mi, "")
        .replace(/^\s*---\s*$/m, "")
        .trim();
      if (expIdx !== -1) {
        explanation = afterOptions
          .slice(expIdx)
          .replace(expHeaderRe, "")
          .replace(/\n\s*---\s*$/m, "")
          .trim();
      }
    }

    // Parsear opciones: líneas que inician con "- [ ]" o "- [x]" (o "- []").
    // La etiqueta puede ser letra (**A.**) o número (**1.**).
    const optionRe = /^-\s*\[\s*(x|X)?\s*\]\s*\*\*([A-Za-z0-9]{1,2})[.)]?\*\*\s*/;
    const lines = optionsZone.split("\n");
    const options = [];
    let currentOpt = null;

    for (const line of lines) {
      const m = line.match(optionRe);
      if (m) {
        if (currentOpt) options.push(currentOpt);
        currentOpt = {
          letter: m[2],
          correct: !!m[1],
          text: line.replace(optionRe, "")
        };
      } else if (currentOpt) {
        currentOpt.text += "\n" + line;
      }
    }
    if (currentOpt) options.push(currentOpt);

    if (!options.length) return null;

    // Limpiar marcadores de respuesta (✅) del texto visible
    options.forEach((o) => {
      o.text = o.text.replace(/✅/g, "").trim();
    });

    let correct = options.filter((o) => o.correct).map((o) => o.letter);
    if (!correct.length) return null; // sin respuesta marcada: reactivo inválido

    // Consistencia multi-respuesta: si el enunciado declara cuántas opciones
    // seleccionar ("Selecciona dos", "Select THREE") y no coincide con las
    // marcas [x], la sección "Respuestas correctas" (p. ej. "**A y E**")
    // decide cuáles son las correctas reales.
    const declaredCount = parseDeclaredCount(statement);
    if (declaredCount && declaredCount !== correct.length) {
      const summaryLetters = extractSummaryLetters(answerSummary, options);
      if (summaryLetters.length === declaredCount) {
        options.forEach((o) => { o.correct = summaryLetters.includes(o.letter); });
        correct = summaryLetters;
      }
    }

    return {
      number,
      source: sourceName,
      statement: statement.replace(/✅/g, "").trim(),
      options,
      correct,               // array de letras
      multi: correct.length > 1,
      answerSummary,
      explanation
    };
  }

  // Número de respuestas que el enunciado pide seleccionar, o null.
  function parseDeclaredCount(statement) {
    const m = statement.match(
      /(?:Selecciona|Select)\s+(dos|tres|cuatro|two|three|four|2|3|4)\b/i
    );
    if (!m) return null;
    const map = {
      dos: 2, two: 2, "2": 2,
      tres: 3, three: 3, "3": 3,
      cuatro: 4, four: 4, "4": 4
    };
    return map[m[1].toLowerCase()] || null;
  }

  // Letras listadas en la sección de respuestas correctas, p. ej. "**A y E**"
  // o "**B, C and D**". Solo devuelve etiquetas que existan en las opciones.
  function extractSummaryLetters(summary, options) {
    if (!summary) return [];
    const m = summary.match(/\*\*([^*]+)\*\*/);
    if (!m) return [];
    const valid = new Set(options.map((o) => o.letter));
    const tokens = m[1].split(/[^A-Za-z0-9]+/);
    return [...new Set(tokens.filter((t) => valid.has(t)))];
  }

  /* ------------------------------------------------------------------
   * Carga de archivos
   * ------------------------------------------------------------------ */

  const dropzone = $("dropzone");
  const fileInput = $("fileInput");

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); }
  });

  ["dragenter", "dragover"].forEach((ev) =>
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    })
  );
  ["dragleave", "drop"].forEach((ev) =>
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    })
  );
  dropzone.addEventListener("drop", (e) => handleFiles(e.dataTransfer.files));
  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
    fileInput.value = "";
  });

  function handleFiles(fileList) {
    Array.from(fileList).forEach((file) => {
      if (!/\.(md|markdown|txt)$/i.test(file.name)) {
        state.files.push({ name: file.name, questions: [], error: "Formato no soportado (usa .md)" });
        renderFileList();
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const questions = parseMarkdown(String(reader.result), file.name);
        state.files.push({
          name: file.name,
          questions,
          error: questions.length ? null : "No se encontraron reactivos con la estructura esperada"
        });
        renderFileList();
      };
      reader.onerror = () => {
        state.files.push({ name: file.name, questions: [], error: "No se pudo leer el archivo" });
        renderFileList();
      };
      reader.readAsText(file, "utf-8");
    });
  }

  function renderFileList() {
    const ul = $("fileList");
    ul.innerHTML = "";
    state.files.forEach((f, i) => {
      const li = document.createElement("li");
      if (f.error) li.classList.add("file-error");
      const name = document.createElement("span");
      name.className = "file-name";
      name.textContent = f.name;
      const count = document.createElement("span");
      count.className = "file-count";
      count.textContent = f.error ? f.error : f.questions.length + " reactivos";
      const btn = document.createElement("button");
      btn.className = "file-remove";
      btn.title = "Quitar archivo";
      btn.textContent = "×";
      btn.addEventListener("click", () => {
        state.files.splice(i, 1);
        renderFileList();
      });
      li.append(name, count, btn);
      ul.appendChild(li);
    });
    updateStartState();
  }

  function totalQuestionsLoaded() {
    return state.files.reduce((acc, f) => acc + f.questions.length, 0);
  }

  function updateStartState() {
    const total = totalQuestionsLoaded();
    $("btnStart").disabled = total === 0;
    $("startSummary").textContent = total
      ? total + " reactivos listos para iniciar"
      : "";
  }

  /* ------------------------------------------------------------------
   * Inicio del examen
   * ------------------------------------------------------------------ */

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  $("btnStart").addEventListener("click", () => {
    let questions = state.files.flatMap((f) => f.questions);
    if (!questions.length) return;

    const pct = parseInt($("passingScore").value, 10);
    state.passingScore = isNaN(pct) ? 72 : Math.min(100, Math.max(1, pct));

    const mins = parseInt($("timerMinutes").value, 10);
    state.timerTotalSec = isNaN(mins) || mins <= 0 ? 0 : mins * 60;

    if ($("shuffleQuestions").checked) questions = shuffle(questions);

    if ($("shuffleOptions").checked) {
      questions = questions.map((q) => {
        const shuffled = shuffle(q.options);
        // Reasignar las etiquetas originales (letras o números) en el nuevo orden
        const labels = q.options.map((o) => o.letter);
        const remapped = shuffled.map((o, i) => ({ ...o, letter: labels[i] }));
        return {
          ...q,
          options: remapped,
          correct: remapped.filter((o) => o.correct).map((o) => o.letter)
        };
      });
    }

    state.immediateFeedback = $("immediateFeedback").checked;

    state.questions = questions;
    state.answers = questions.map(() => new Set());
    state.flags = questions.map(() => false);
    state.revealed = questions.map(() => false);
    state.current = 0;
    state.finished = false;
    state.showAllReview = false;

    startTimer();
    showScreen("exam");
    renderQuestion();
  });

  /* ------------------------------------------------------------------
   * Temporizador
   * ------------------------------------------------------------------ */

  function startTimer() {
    stopTimer();
    const box = $("timerBox");
    if (!state.timerTotalSec) {
      box.style.display = "none";
      return;
    }
    box.style.display = "";
    box.classList.remove("timer-low");
    state.timerRemainingSec = state.timerTotalSec;
    renderTimer();
    state.timerId = setInterval(() => {
      state.timerRemainingSec--;
      renderTimer();
      if (state.timerRemainingSec <= 0) {
        stopTimer();
        finishExam(true);
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  }

  function renderTimer() {
    const s = Math.max(0, state.timerRemainingSec);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    $("timerText").textContent = h > 0 ? h + ":" + pad(m) + ":" + pad(sec) : pad(m) + ":" + pad(sec);
    $("timerBox").classList.toggle("timer-low", s <= 300);
  }

  /* ------------------------------------------------------------------
   * Render del examen
   * ------------------------------------------------------------------ */

  function showScreen(name) {
    ["start", "exam", "results"].forEach((s) => {
      $("screen-" + s).classList.toggle("active", s === name);
    });
    const status = $("headerStatus");
    if (name === "exam") status.textContent = "Examen en curso";
    else if (name === "results") status.textContent = "Resultados";
    else status.textContent = "";
    window.scrollTo({ top: 0 });
  }

  function renderQuestion() {
    const q = state.questions[state.current];
    const total = state.questions.length;

    $("progressText").textContent = "Pregunta " + (state.current + 1) + " de " + total;
    const answered = state.answers.filter((s) => s.size > 0).length;
    $("answeredText").textContent = answered + " respondidas";
    $("progressFill").style.width = ((state.current + 1) / total) * 100 + "%";

    $("qNumber").textContent = "Pregunta " + (state.current + 1);
    const multiBadge = $("qMulti");
    multiBadge.hidden = !q.multi;
    if (q.multi) {
      multiBadge.textContent = "Selecciona " + numName(q.correct.length) + " respuestas";
    }

    const flagBtn = $("btnFlag");
    flagBtn.classList.toggle("flagged", state.flags[state.current]);

    $("questionBody").innerHTML = mdToHtml(q.statement);

    // Opciones
    const box = $("optionsBox");
    box.innerHTML = "";
    const type = q.multi ? "checkbox" : "radio";
    // Con revisión inmediata, una pregunta ya comprobada queda bloqueada y
    // muestra en las propias opciones cuáles eran correctas.
    const locked = isRevealed(state.current);
    q.options.forEach((opt) => {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = type;
      input.name = "question-" + state.current;
      input.value = opt.letter;
      input.checked = state.answers[state.current].has(opt.letter);
      if (input.checked) label.classList.add("selected");
      if (locked) {
        input.disabled = true;
        label.classList.add("locked");
        if (opt.correct) label.classList.add("is-correct");
        else if (input.checked) label.classList.add("is-wrong-pick");
      }

      input.addEventListener("change", () => {
        const sel = state.answers[state.current];
        if (q.multi) {
          if (input.checked) sel.add(opt.letter);
          else sel.delete(opt.letter);
        } else {
          sel.clear();
          sel.add(opt.letter);
        }
        box.querySelectorAll(".option").forEach((el) => {
          const inp = el.querySelector("input");
          el.classList.toggle("selected", inp.checked);
        });
        renderDots();
        const answeredNow = state.answers.filter((s) => s.size > 0).length;
        $("answeredText").textContent = answeredNow + " respondidas";
        updateNavButtons();
      });

      const letter = document.createElement("span");
      letter.className = "opt-letter";
      letter.textContent = opt.letter + ".";

      const text = document.createElement("div");
      text.className = "opt-text";
      text.innerHTML = mdToHtml(opt.text);

      label.append(input, letter, text);
      box.appendChild(label);
    });

    renderFeedback();

    // Navegación: "Finalizar examen" siempre disponible; "Siguiente" se
    // oculta solo en la última pregunta.
    $("btnPrev").disabled = state.current === 0;
    updateNavButtons();

    renderDots();
  }

  /* ------------------------------------------------------------------
   * Revisión inmediata (retroalimentación pregunta por pregunta)
   * ------------------------------------------------------------------ */

  function isAnswered(i) {
    return state.answers[i] && state.answers[i].size > 0;
  }

  function isRevealed(i) {
    return state.immediateFeedback && !!state.revealed[i];
  }

  // Hay retroalimentación pendiente cuando la pregunta actual está contestada
  // pero aún no se comprueba: en ese caso no se avanza sin verla.
  function feedbackPending() {
    return state.immediateFeedback && isAnswered(state.current) && !state.revealed[state.current];
  }

  // El botón "Siguiente" cumple tres papeles según el estado de la pregunta:
  // comprobar la respuesta, avanzar, o finalizar en la última pregunta. Su
  // texto y su estilo nunca cambian: la diferencia es solo de comportamiento.
  function updateNavButtons() {
    const last = state.current === state.questions.length - 1;
    // En modo examen real se oculta en la última pregunta, como siempre; con
    // revisión inmediata permanece para poder comprobar y cerrar el examen.
    $("btnNext").hidden = last && !state.immediateFeedback;
  }

  function revealCurrent() {
    if (!state.immediateFeedback || !isAnswered(state.current)) return;
    state.revealed[state.current] = true;
    renderQuestion();
    $("feedbackBox").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Panel de retroalimentación bajo las opciones de la pregunta actual.
  function renderFeedback() {
    const boxEl = $("feedbackBox");
    boxEl.innerHTML = "";
    if (!isRevealed(state.current)) {
      boxEl.hidden = true;
      boxEl.className = "feedback-box";
      return;
    }

    const q = state.questions[state.current];
    const sel = state.answers[state.current];
    const ok = isCorrect(q, sel);

    boxEl.hidden = false;
    boxEl.className = "feedback-box " + (ok ? "feedback-ok" : "feedback-bad");

    const head = document.createElement("div");
    head.className = "feedback-head";

    const mark = document.createElement("span");
    mark.className = "feedback-mark";
    mark.textContent = ok ? "✓" : "✗";

    const title = document.createElement("span");
    title.className = "feedback-title";
    title.textContent = ok ? "Respuesta correcta" : "Respuesta incorrecta";

    const detail = document.createElement("span");
    detail.className = "feedback-detail";
    detail.textContent = "Respuesta" + (q.correct.length > 1 ? "s correctas: " : " correcta: ") +
      q.correct.join(", ");

    head.append(mark, title, detail);
    boxEl.appendChild(head);

    // Sin el resumen de letras: el encabezado del panel ya las muestra.
    const exp = buildExplanation(q, false);
    if (exp) boxEl.appendChild(exp);
  }

  // Bloque de explicación reutilizado por la revisión inmediata y la final.
  function buildExplanation(q, includeSummary) {
    const withSummary = includeSummary !== false && !!q.answerSummary;
    if (!q.explanation && !withSummary) return null;
    const exp = document.createElement("div");
    exp.className = "review-explanation";
    let html = "<h4>Explicación</h4>";
    if (withSummary) html += mdToHtml(q.answerSummary);
    if (q.explanation) html += mdToHtml(q.explanation);
    exp.innerHTML = html;
    return exp;
  }

  function numName(n) {
    const names = { 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco" };
    return names[n] || n;
  }

  function renderDots() {
    const wrap = $("navDots");
    wrap.innerHTML = "";
    state.questions.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "nav-dot";
      dot.textContent = i + 1;
      dot.title = "Ir a la pregunta " + (i + 1);
      if (state.answers[i].size > 0) dot.classList.add("answered");
      if (state.flags[i]) dot.classList.add("flagged");
      if (i === state.current) dot.classList.add("current");
      dot.addEventListener("click", () => {
        state.current = i;
        renderQuestion();
      });
      wrap.appendChild(dot);
    });
  }

  $("btnPrev").addEventListener("click", () => {
    if (state.current > 0) { state.current--; renderQuestion(); }
  });

  $("btnNext").addEventListener("click", () => goNext(true));

  // allowFinish: solo el clic en el botón puede disparar el cierre del examen;
  // el atajo de teclado nunca abre el diálogo de finalizar.
  function goNext(allowFinish) {
    // En modo revisión inmediata, comprobar la respuesta antes de avanzar.
    if (feedbackPending()) { revealCurrent(); return; }
    if (state.current < state.questions.length - 1) {
      state.current++;
      renderQuestion();
      return;
    }
    if (allowFinish && state.immediateFeedback) promptFinish();
  }

  $("btnFlag").addEventListener("click", () => {
    state.flags[state.current] = !state.flags[state.current];
    $("btnFlag").classList.toggle("flagged", state.flags[state.current]);
    renderDots();
  });

  // Atajos de teclado durante el examen
  document.addEventListener("keydown", (e) => {
    if (!$("screen-exam").classList.contains("active")) return;
    if (e.target.tagName === "INPUT" && e.target.type === "number") return;
    if (e.key === "ArrowRight" && (feedbackPending() || state.current < state.questions.length - 1)) {
      goNext();
    } else if (e.key === "ArrowLeft" && state.current > 0) {
      state.current--; renderQuestion();
    }
  });

  /* ------------------------------------------------------------------
   * Finalizar y calificar
   * ------------------------------------------------------------------ */

  $("btnFinish").addEventListener("click", promptFinish);

  function promptFinish() {
    const unanswered = state.answers.filter((s) => s.size === 0).length;
    const msg = unanswered > 0
      ? "Tienes " + unanswered + " pregunta(s) sin responder. Las preguntas sin respuesta se calificarán como incorrectas. ¿Deseas finalizar?"
      : "Has respondido todas las preguntas. ¿Deseas finalizar y ver tu calificación?";
    $("modalBody").textContent = msg;
    $("modalBackdrop").hidden = false;
  }

  $("modalCancel").addEventListener("click", () => { $("modalBackdrop").hidden = true; });
  $("modalConfirm").addEventListener("click", () => {
    $("modalBackdrop").hidden = true;
    finishExam(false);
  });

  function isCorrect(q, sel) {
    if (sel.size !== q.correct.length) return false;
    return q.correct.every((l) => sel.has(l));
  }

  function finishExam(byTimeout) {
    stopTimer();
    state.finished = true;

    const total = state.questions.length;
    let correctCount = 0;
    let unanswered = 0;
    state.questions.forEach((q, i) => {
      const sel = state.answers[i];
      if (sel.size === 0) unanswered++;
      if (isCorrect(q, sel)) correctCount++;
    });

    const pct = total ? Math.round((correctCount / total) * 1000) / 10 : 0;
    const passed = pct >= state.passingScore;

    // Banner
    const verdict = $("resultVerdict");
    verdict.textContent = passed ? "APROBADO" : "NO APROBADO";
    verdict.className = "result-verdict " + (passed ? "pass" : "fail");

    const ring = $("scoreRing");
    ring.className = "score-ring " + (passed ? "pass" : "fail");
    $("scoreNum").textContent = pct + "%";
    // círculo r=52 => circunferencia ~326.7
    const circ = 2 * Math.PI * 52;
    requestAnimationFrame(() => {
      $("ringVal").style.strokeDashoffset = String(circ * (1 - Math.min(pct, 100) / 100));
    });

    // Estadísticas
    const scaled = Math.round(100 + (pct / 100) * 900); // referencia informal a la escala 100-1000
    const statsHtml = [
      stat(correctCount + " / " + total, "Respuestas correctas"),
      stat(String(total - correctCount), "Incorrectas o sin responder"),
      stat(state.passingScore + "%", "Mínimo requerido"),
      stat("~" + scaled, "Puntaje escalado aprox. (100-1000)")
    ].join("");
    $("resultStats").innerHTML = statsHtml;

    if (byTimeout) {
      const note = document.createElement("p");
      note.style.color = "var(--danger)";
      note.style.fontWeight = "600";
      note.textContent = "El tiempo se agotó: el examen se calificó automáticamente.";
      $("resultStats").before(note);
    }

    renderReview();
    showScreen("results");
  }

  function stat(value, label) {
    return '<div class="stat"><div class="stat-value">' + escapeHtml(String(value)) +
      '</div><div class="stat-label">' + escapeHtml(label) + "</div></div>";
  }

  /* ------------------------------------------------------------------
   * Revisión / retroalimentación
   * ------------------------------------------------------------------ */

  function renderReview() {
    const list = $("reviewList");
    list.innerHTML = "";

    const items = state.questions
      .map((q, i) => ({ q, i, sel: state.answers[i], ok: isCorrect(state.questions[i], state.answers[i]) }))
      .filter((it) => state.showAllReview || !it.ok);

    $("reviewTitle").textContent = state.showAllReview
      ? "Revisión completa del examen"
      : "Retroalimentación: preguntas incorrectas";

    $("btnToggleReview").textContent = state.showAllReview
      ? "Ver solo incorrectas"
      : "Ver todas las preguntas";

    if (!items.length) {
      const p = document.createElement("p");
      p.textContent = "Excelente: no hubo preguntas incorrectas.";
      p.style.fontWeight = "600";
      p.style.color = "var(--success)";
      list.appendChild(p);
      return;
    }

    items.forEach(({ q, i, sel, ok }) => {
      const item = document.createElement("div");
      const blank = sel.size === 0;
      item.className = "review-item" + (ok ? " correct-item" : blank ? " unanswered-item" : "");

      const head = document.createElement("div");
      head.className = "review-head";

      const badge = document.createElement("span");
      badge.className = "q-badge";
      badge.textContent = "Pregunta " + (i + 1);
      head.appendChild(badge);

      const tag = document.createElement("span");
      tag.className = "review-tag " + (ok ? "tag-right" : blank ? "tag-blank" : "tag-wrong");
      tag.textContent = ok ? "Correcta" : blank ? "Sin responder" : "Incorrecta";
      head.appendChild(tag);

      if (q.source) {
        const src = document.createElement("span");
        src.className = "review-tag tag-blank";
        src.textContent = q.source;
        head.appendChild(src);
      }

      const body = document.createElement("div");
      body.className = "review-question";
      body.innerHTML = mdToHtml(q.statement);

      const opts = document.createElement("div");
      opts.className = "review-options";
      q.options.forEach((opt) => {
        const row = document.createElement("div");
        row.className = "review-opt";
        const picked = sel.has(opt.letter);
        let mark = "";
        if (opt.correct) { row.classList.add("is-correct"); mark = "✓"; }
        if (picked && !opt.correct) { row.classList.add("is-wrong-pick"); mark = "✗"; }
        if (picked && opt.correct) mark = "✓";

        const markEl = document.createElement("span");
        markEl.className = "opt-mark";
        markEl.textContent = mark;

        const textEl = document.createElement("div");
        textEl.className = "opt-text";
        const prefix = "<strong>" + escapeHtml(opt.letter) + ".</strong> ";
        textEl.innerHTML = prefix + mdToHtml(opt.text) +
          (picked ? ' <em style="color:var(--text-soft)">(tu respuesta)</em>' : "");

        row.append(markEl, textEl);
        opts.appendChild(row);
      });

      item.append(head, body, opts);

      const exp = buildExplanation(q);
      if (exp) item.appendChild(exp);

      list.appendChild(item);
    });
  }

  $("btnToggleReview").addEventListener("click", () => {
    state.showAllReview = !state.showAllReview;
    renderReview();
  });

  $("btnRetry").addEventListener("click", () => {
    showScreen("start");
    updateStartState();
  });

  $("btnNewFile").addEventListener("click", () => {
    state.files = [];
    renderFileList();
    showScreen("start");
  });

  // Aviso al salir con un examen en curso
  window.addEventListener("beforeunload", (e) => {
    if ($("screen-exam").classList.contains("active") && !state.finished) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

})();
