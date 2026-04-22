/* ══════════════════════════════════════════
   CambioMX · script.js
   Calculadora de Conversión de Divisas → MXN
   Academia IDS · Proyecto JavaScript

   Conceptos demostrados:
   ✦ Funciones (declaradas y expresiones)
   ✦ Condicionales (if / else if / else)
   ✦ Ciclos (for...of, forEach)
   ✦ Manipulación del DOM
   ✦ Arrays y Objetos
══════════════════════════════════════════ */

// ══════════════════════════════════════════
// 1. DATOS: Catálogo de monedas y tasas
//    (1 unidad de divisa = X pesos MXN)
// ══════════════════════════════════════════

const MONEDAS = [
  { codigo: "USD", nombre: "Dólar Americano",   pais: "Estados Unidos", bandera: "🇺🇸", tasa: 17.15 },
  { codigo: "EUR", nombre: "Euro",              pais: "Eurozona",       bandera: "🇪🇺", tasa: 18.72 },
  { codigo: "GBP", nombre: "Libra Esterlina",   pais: "Reino Unido",    bandera: "🇬🇧", tasa: 21.40 },
  { codigo: "JPY", nombre: "Yen Japonés",       pais: "Japón",          bandera: "🇯🇵", tasa: 0.1142 },
  { codigo: "CAD", nombre: "Dólar Canadiense",  pais: "Canadá",         bandera: "🇨🇦", tasa: 12.63 },
  { codigo: "CHF", nombre: "Franco Suizo",      pais: "Suiza",          bandera: "🇨🇭", tasa: 19.35 },
  { codigo: "CNY", nombre: "Yuan Chino",        pais: "China",          bandera: "🇨🇳", tasa: 2.36  },
  { codigo: "BRL", nombre: "Real Brasileño",    pais: "Brasil",         bandera: "🇧🇷", tasa: 3.41  },
  { codigo: "ARS", nombre: "Peso Argentino",    pais: "Argentina",      bandera: "🇦🇷", tasa: 0.019 },
  { codigo: "COP", nombre: "Peso Colombiano",   pais: "Colombia",       bandera: "🇨🇴", tasa: 0.0042},
];

// ══════════════════════════════════════════
// 2. HISTORIAL de conversiones (array)
// ══════════════════════════════════════════

let historial = [];

// ══════════════════════════════════════════
// 3. REFERENCIAS al DOM
// ══════════════════════════════════════════

const montoInput      = document.getElementById("monto");
const monedaSelect    = document.getElementById("monedaOrigen");
const flagFrom        = document.getElementById("flagFrom");
const resultadoMXN    = document.getElementById("resultadoMXN");
const tasaInfo        = document.getElementById("tasaInfo");
const errorMsg        = document.getElementById("errorMsg");
const btnConvertir    = document.getElementById("btnConvertir");
const swapBtn         = document.getElementById("swapBtn");
const ratesGrid       = document.getElementById("ratesGrid");
const ratesToggle     = document.getElementById("ratesToggle");
const historialLista  = document.getElementById("historialLista");
const clearHistoryBtn = document.getElementById("clearHistory");

// ══════════════════════════════════════════
// 4. FUNCIONES PRINCIPALES
// ══════════════════════════════════════════

/**
 * Busca la información de una moneda por su código.
 * @param {string} codigo - El código de la moneda (ej. "USD")
 * @returns {Object|null} El objeto de la moneda o null si no existe
 */
function obtenerMoneda(codigo) {
  // Ciclo for...of para recorrer el catálogo
  for (const moneda of MONEDAS) {
    if (moneda.codigo === codigo) {
      return moneda;
    }
  }
  return null; // Condicional implícito: si no se encontró, retorna null
}

/**
 * Convierte un monto de una divisa a pesos MXN.
 * @param {number} monto  - Cantidad en la moneda origen
 * @param {number} tasa   - Tasa de cambio (1 unidad → MXN)
 * @returns {number} El monto equivalente en MXN
 */
function convertirAMXN(monto, tasa) {
  return monto * tasa;
}

/**
 * Formatea un número como moneda con símbolo y decimales.
 * @param {number} valor   - El número a formatear
 * @param {string} moneda  - Código de moneda (ej. "MXN")
 * @returns {string} Cadena formateada (ej. "$1,234.56 MXN")
 */
function formatearMoneda(valor, moneda) {
  // Condicional: elegir decimales según la moneda
  let decimales;
  if (moneda === "JPY") {
    decimales = 0; // El yen no usa decimales
  } else if (moneda === "ARS" || moneda === "COP") {
    decimales = 2;
  } else {
    decimales = 2;
  }

  const formateado = valor.toLocaleString("es-MX", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });

  return `$${formateado}`;
}

/**
 * Genera la hora actual como string legible.
 * @returns {string} Hora en formato HH:MM:SS
 */
function obtenerHora() {
  const ahora = new Date();
  const h = String(ahora.getHours()).padStart(2, "0");
  const m = String(ahora.getMinutes()).padStart(2, "0");
  const s = String(ahora.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// ══════════════════════════════════════════
// 5. FUNCIONES DE RENDERIZADO (DOM)
// ══════════════════════════════════════════

/**
 * Dibuja las tarjetas de tasas de cambio en el panel.
 * Usa un ciclo forEach para iterar sobre el catálogo.
 */
function renderizarTasas() {
  ratesGrid.innerHTML = ""; // Limpiar contenido previo

  // Ciclo forEach sobre el array MONEDAS
  MONEDAS.forEach(function (moneda) {
    const card = document.createElement("div");
    card.className = "rate-card";
    card.setAttribute("data-codigo", moneda.codigo);

    card.innerHTML = `
      <div class="rate-card-flag">${moneda.bandera}</div>
      <div class="rate-card-code">${moneda.codigo}</div>
      <div class="rate-card-name">${moneda.nombre}</div>
      <div class="rate-card-value">${formatearMoneda(moneda.tasa, "MXN")}</div>
      <div class="rate-card-sub">por 1 ${moneda.codigo}</div>
    `;

    // Al hacer clic en una tarjeta → seleccionar esa moneda
    card.addEventListener("click", function () {
      monedaSelect.value = moneda.codigo;
      actualizarBandera();
      // Si hay un monto, convertir automáticamente
      if (montoInput.value) {
        realizarConversion();
      }
    });

    ratesGrid.appendChild(card);
  });
}

/**
 * Agrega una entrada al historial de conversiones y actualiza el DOM.
 * @param {string} desde  - Texto del monto origen (ej. "100.00 USD")
 * @param {string} hacia  - Texto del resultado (ej. "$1,715.00 MXN")
 */
function agregarAlHistorial(desde, hacia) {
  // Agregar al inicio del array (más reciente primero)
  historial.unshift({ desde, hacia, hora: obtenerHora() });

  // Condicional: mantener máximo 8 registros en el historial
  if (historial.length > 8) {
    historial.pop(); // Eliminar el más antiguo
  }

  renderizarHistorial();
}

/**
 * Renderiza el historial en el DOM usando un ciclo for...of.
 */
function renderizarHistorial() {
  historialLista.innerHTML = ""; // Limpiar lista

  // Condicional: mostrar mensaje si no hay entradas
  if (historial.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "history-empty";
    vacio.textContent = "Aún no has realizado conversiones.";
    historialLista.appendChild(vacio);
    return;
  }

  // Ciclo for...of para renderizar cada entrada
  for (const entrada of historial) {
    const item = document.createElement("li");
    item.className = "history-item";

    item.innerHTML = `
      <div class="history-left">
        <span class="history-from">${entrada.desde}</span>
        <span class="history-time">⏱ ${entrada.hora}</span>
      </div>
      <span class="history-arrow">→</span>
      <span class="history-to">${entrada.hacia}</span>
    `;

    historialLista.appendChild(item);
  }
}

/**
 * Actualiza la bandera mostrada junto al input según la moneda seleccionada.
 */
function actualizarBandera() {
  const codigo  = monedaSelect.value;
  const moneda  = obtenerMoneda(codigo);

  // Condicional: si existe la moneda, actualizar bandera
  if (moneda !== null) {
    flagFrom.textContent = moneda.bandera;
  } else {
    flagFrom.textContent = "💱";
  }
}

// ══════════════════════════════════════════
// 6. FUNCIÓN PRINCIPAL DE CONVERSIÓN
// ══════════════════════════════════════════

/**
 * Lee el formulario, valida, convierte y muestra el resultado.
 * Integra funciones, condicionales y manipulación del DOM.
 */
function realizarConversion() {
  const montoRaw = parseFloat(montoInput.value);
  const codigo   = monedaSelect.value;
  const moneda   = obtenerMoneda(codigo);

  // ── Validaciones con condicionales ──
  if (isNaN(montoRaw) || montoRaw <= 0) {
    // Mostrar error, limpiar resultado
    errorMsg.hidden = false;
    resultadoMXN.textContent = "—";
    tasaInfo.textContent = "Ingresa una cantidad válida";
    return; // Salir de la función
  }

  if (moneda === null) {
    errorMsg.hidden = false;
    resultadoMXN.textContent = "—";
    return;
  }

  // Ocultar error si pasó las validaciones
  errorMsg.hidden = true;

  // ── Cálculo usando la función de conversión ──
  const resultadoValor = convertirAMXN(montoRaw, moneda.tasa);
  const resultadoTexto = formatearMoneda(resultadoValor, "MXN");

  // ── Actualizar el DOM con el resultado ──
  resultadoMXN.textContent = resultadoTexto;

  // ── Calcular tasa inversa ──
  const tasaInversa = (1 / moneda.tasa).toFixed(4);
  tasaInfo.textContent =
    `1 ${codigo} = ${formatearMoneda(moneda.tasa, "MXN")} MXN  ·  ` +
    `1 MXN = ${tasaInversa} ${codigo}`;

  // ── Agregar al historial ──
  const montoFormateado = `${formatearMoneda(montoRaw, codigo).replace("$", "")} ${codigo}`;
  agregarAlHistorial(montoFormateado, resultadoTexto + " MXN");

  // ── Animación de énfasis en el resultado ──
  resultadoMXN.classList.remove("resultado-animado");
  void resultadoMXN.offsetWidth; // Forzar reflow para reiniciar animación
  resultadoMXN.classList.add("resultado-animado");
}

// ══════════════════════════════════════════
// 7. MODO INVERSO: MXN → Divisa
// ══════════════════════════════════════════

let modoInverso = false; // Estado del modo de conversión

/**
 * Alterna entre modo normal (Divisa→MXN) y modo inverso (MXN→Divisa).
 */
function alternarModo() {
  modoInverso = !modoInverso;

  // Condicional: ajustar etiquetas según el modo
  if (modoInverso) {
    document.querySelector(".field-label").textContent = "Cantidad en pesos MXN";
    flagFrom.textContent = "🇲🇽";
    montoInput.placeholder = "0.00 MXN";
    swapBtn.title = "Convertir Divisa → MXN";
  } else {
    document.querySelector(".field-label").textContent = "Cantidad a convertir";
    actualizarBandera();
    montoInput.placeholder = "0.00";
    swapBtn.title = "Convertir MXN → Divisa";
  }

  // Limpiar resultado al cambiar modo
  resultadoMXN.textContent = "—";
  tasaInfo.textContent = "Selecciona una moneda e ingresa una cantidad";
  montoInput.value = "";
  errorMsg.hidden = true;
}

// Versión de conversión adaptada al modo activo
function realizarConversionAdaptada() {
  if (!modoInverso) {
    realizarConversion();
    return;
  }

  // Modo inverso: MXN → Divisa seleccionada
  const montoMXN = parseFloat(montoInput.value);
  const codigo   = monedaSelect.value;
  const moneda   = obtenerMoneda(codigo);

  if (isNaN(montoMXN) || montoMXN <= 0) {
    errorMsg.hidden = false;
    resultadoMXN.textContent = "—";
    return;
  }

  errorMsg.hidden = true;

  const resultadoValor  = montoMXN / moneda.tasa;
  const decimales       = codigo === "JPY" ? 0 : 2;
  const resultadoTexto  = resultadoValor.toLocaleString("es-MX", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });

  resultadoMXN.textContent = `$${resultadoTexto}`;
  tasaInfo.textContent = `1 MXN = ${(1 / moneda.tasa).toFixed(4)} ${codigo}`;

  const mxnFormateado = `${formatearMoneda(montoMXN, "MXN")} MXN`;
  agregarAlHistorial(mxnFormateado, `$${resultadoTexto} ${codigo}`);

  resultadoMXN.classList.remove("resultado-animado");
  void resultadoMXN.offsetWidth;
  resultadoMXN.classList.add("resultado-animado");
}

// ══════════════════════════════════════════
// 8. EVENTOS
// ══════════════════════════════════════════

// Botón principal "Convertir ahora"
btnConvertir.addEventListener("click", realizarConversionAdaptada);

// Convertir también al presionar Enter en el input
montoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    realizarConversionAdaptada();
  }
});

// Conversión en tiempo real al escribir
montoInput.addEventListener("input", function () {
  // Condicional: solo convertir si hay valor y moneda
  if (this.value && monedaSelect.value) {
    realizarConversionAdaptada();
  } else {
    resultadoMXN.textContent = "—";
    tasaInfo.textContent = "Selecciona una moneda e ingresa una cantidad";
    errorMsg.hidden = true;
  }
});

// Cambio de moneda en el selector
monedaSelect.addEventListener("change", function () {
  actualizarBandera();
  // Reconvertir si ya hay un monto
  if (montoInput.value) {
    realizarConversionAdaptada();
  }
});

// Botón de intercambio (swap)
swapBtn.addEventListener("click", alternarModo);

// Botones de acceso rápido (ciclo forEach)
const quickBtns = document.querySelectorAll(".quick-btn");
quickBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    montoInput.value = this.getAttribute("data-val");
    realizarConversionAdaptada();
  });
});

// Toggle del panel de tasas
ratesToggle.addEventListener("click", function () {
  const oculto = ratesGrid.classList.toggle("hidden");
  // Condicional: actualizar texto del botón
  this.textContent = oculto ? "Mostrar tabla" : "Ocultar tabla";
});

// Limpiar historial
clearHistoryBtn.addEventListener("click", function () {
  historial = []; // Vaciar el array
  renderizarHistorial();
});

// ══════════════════════════════════════════
// 9. INICIALIZACIÓN
//    Ejecutar al cargar la página
// ══════════════════════════════════════════

(function inicializar() {
  renderizarTasas();   // Dibujar panel de tasas
  actualizarBandera(); // Mostrar bandera inicial
  renderizarHistorial(); // Historial vacío

  // Agregar animación CSS para el resultado (inyectada desde JS)
  const style = document.createElement("style");
  style.textContent = `
    @keyframes resaltarResultado {
      0%   { color: oklch(0.95 0.2 85); transform: scale(1.04); }
      100% { color: oklch(0.78 0.14 85); transform: scale(1); }
    }
    .resultado-animado {
      animation: resaltarResultado 0.4s ease-out forwards;
    }
  `;
  document.head.appendChild(style);

  console.log("CambioMX inicializado correctamente.");
  console.log(`Monedas disponibles: ${MONEDAS.length}`);
  console.log("Monedas:", MONEDAS.map(m => m.codigo));
})();
