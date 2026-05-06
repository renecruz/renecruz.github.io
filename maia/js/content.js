/* ================================================================
   content.js — Documentos MAIA embebidos
   ================================================================ */

const DOCS = {

/* ── 01 ── */
doc01: { title: '01 — Visión & Alcance', content: `# 01 — Iniciativa MAIA: Visión y Alcance

## 1. Propósito

**MAIA** (Modular AI for Innovation & Acceleration) es la iniciativa corporativa para escalar el uso de Inteligencia Artificial en la compañía de forma controlada. Parte de los POCs y pilotajes ya validados, y los convierte en un proceso con métricas y evidencia auditable.

MAIA convierte el uso disperso de IA en una capacidad que toda la organización puede usar de la misma forma.

---

## 2. Objetivos Estratégicos

### Objetivos primarios

| # | Objetivo | Descripción | Horizonte |
|---:|---|---|---|
| O1 | **Estandarizar** el uso de IA en el SDLC | Un proceso unificado de uso de agentes de IA por fase del ciclo de vida, con plantillas, aprobaciones humanas y trazabilidad. | Corto plazo (MVP 1) |
| O2 | **Acelerar** la entrega de software | Reducir tiempos de diseño, desarrollo, pruebas y documentación con agentes especializados coordinados. | Corto-Medio plazo (MVP 2) |
| O3 | **Preservar y reutilizar el conocimiento** organizacional | Memoria persistente entre sesiones, equipos y proyectos para que cada entrega deje aprendizajes reusables. | Medio plazo (MVP 3) |
| O4 | **Apoyar** la gestión de proyectos | Estimaciones (CFP, WBS), análisis de HU y asignación de recursos asistidos por IA. | Medio-Largo plazo (Extensiones) |
| O5 | **Convertir el conocimiento en diferenciador comercial** | Usar la evidencia acumulada de MAIA como respaldo en RFPs enterprise y propuestas técnicas. | Largo plazo (2027+) |

### Objetivos secundarios (habilitadores)

- Reducir el retrabajo por ambigüedad en requerimientos.
- Elevar la calidad técnica (cobertura de pruebas, hallazgos en revisiones).
- Bajar el costo de onboarding de nuevos integrantes.
- Generar línea base medible de productividad y calidad antes de cada MVP.
- Establecer un marco de IA Responsable y cumplimiento (privacidad, seguridad, derechos de uso).

---

## 3. Áreas de Enfoque (basadas en POCs ya validados)

| Área | POCs/Pilotos previos | Madurez | Prioridad MAIA |
|---|---|---:|---:|
| **Desarrollo (SDLC)** | Ingeniería inversa, análisis de vulnerabilidades, generación de pruebas, documentación técnica. | Alta | **P1** |
| **Estimación de esfuerzos** | CFP (COSMIC ISO 19761), WBS para Delivery Management y PL. | Media-Alta | **P2** |
| **Análisis y generación de requerimientos** | Análisis de HU, completitud y claridad, generación de HU desde código (modernización). | Media-Alta | **P2** |
| **Gestión del conocimiento** | RAG corporativo. | Media | **P3** |
| **Operaciones / Delivery** | (Sin POC formal aún) | Baja | P4 |
| **Comercial / Ventas** | (Sin POC formal aún) | Baja | P5 |

> La iniciativa **comienza por Desarrollo** porque es donde existen mayor evidencia, casos de uso maduros y dolor inmediato. Las demás áreas se incorporan modularmente en fases posteriores.

---

## 4. Alcance Modular de MAIA

MAIA es modular por diseño: cada módulo encapsula un dominio de valor, comparte la base común (catálogo de agentes, memoria, gobernanza, IDP) y puede activarse de forma independiente.

\`\`\`mermaid
flowchart TB
    subgraph CORE["Plataforma Núcleo MAIA"]
        IDP["Internal Developer Portal"]
        AGENTS["Catálogo de Agentes"]
        MEM["Memoria Persistente"]
        GOV["Gobernanza & IA Responsable"]
        TEL["Telemetría & Métricas"]
    end

    subgraph DEV["MAIA for Developer (P1 — Inicio)"]
        DEV1["Proceso Estándar SDLC"]
        DEV2["Célula Integrada de Agentes"]
        DEV3["Inteligencia / Memoria"]
    end

    subgraph PM["MAIA for Project Mgmt (P2)"]
        PM1["Estimación CFP/WBS"]
        PM2["Análisis y Generación de HU"]
    end

    subgraph KNOW["MAIA for Knowledge (P3)"]
        K1["RAG Corporativo"]
        K2["Self-Service Documental"]
    end

    subgraph OPS["MAIA for Operations (P4)"]
        OPS1["Asignación de Recursos"]
        OPS2["Análisis Predictivo de Proyectos"]
    end

    subgraph BIZ["MAIA for Business (P5)"]
        BIZ1["Generación de Propuestas"]
        BIZ2["Estimaciones Comerciales"]
    end

    CORE --> DEV
    CORE --> PM
    CORE --> KNOW
    CORE --> OPS
    CORE --> BIZ

    DEV -.evolución.-> PM
    PM -.evolución.-> KNOW
    KNOW -.evolución.-> OPS
    OPS -.evolución.-> BIZ
\`\`\`

### 4.1 Descripción de los módulos

| Módulo | Audiencia | Capacidades clave |
|---|---|---|
| **MAIA for Developer** | Equipos de ingeniería (Dev, QA, LT, Arq.) | Proceso SDLC estándar, agentes integrados, memoria, AI Code Review, generación de pruebas, documentación técnica. |
| **MAIA for Project Mgmt** | Project Leaders, Delivery Managers, BAs | Estimación CFP/WBS asistida, análisis de HU, generación de HU desde código. |
| **MAIA for Knowledge** | Toda la compañía | RAG corporativo, búsqueda contextual, asistente de documentación interna. |
| **MAIA for Operations** | Resource Mgrs, PMO, Operaciones | Asignación de recursos, predicción de riesgo de proyecto, dashboards. |
| **MAIA for Business** | Comercial, Preventa, Cuentas | Propuestas técnicas asistidas, estimaciones comerciales, demos. |

> El **punto de partida** de la iniciativa son los **3 MVPs dentro de MAIA for Developer** (Proceso Estándar → Célula Integrada → Inteligencia).

---

## 5. Principios Rectores

1. **Modularidad evolutiva.** Cada módulo es independientemente desplegable, pero comparte la plataforma núcleo.
2. **Humano en el lazo.** El agente apoya al desarrollador; no toma decisiones sin que alguien las revise. Toda fase tiene aprobación humana documentada.
3. **Evidencia antes que declaraciones.** Cada métrica debe ser auditable (Git, Jira, bitácoras, tablero ejecutivo).
4. **Línea base obligatoria.** Antes de medir mejoras hay que medir el estado actual.
5. **Pilotos antes que escala.** Primero validar con 2-3 equipos; después escalar.
6. **IA Responsable.** Privacidad, seguridad, derechos de uso, y mitigación de alucinaciones desde el diseño.
7. **Costo bajo control.** Monitorear consumo de tokens y elegir modelos por relación costo/calidad.
8. **Compromisos vs aspiraciones.** Separar métricas comprometidas (criterio de éxito) de aspiracionales (mejora potencial).

---

## 6. Posicionamiento Comercial Esperado (post-MVPs)

- **Diferenciador interno:** capacidad de delivery con IA que sigue un proceso, deja trazas y tiene métricas reales.
- **Diferenciador externo (cliente):** evidencia de pilotos exitosos para respaldar el discovery comercial enterprise.
- **Base de conocimiento:** memoria que crece con cada proyecto y reduce el tiempo de arranque en nuevos clientes.

---

## 7. Decisiones de Dirección Pendientes

| # | Decisión | Plazo |
|---:|---|---|
| D1 | Aprobar arranque del MVP 1 con condiciones de control. | Semana 0 |
| D2 | Designar Owner Ejecutivo, Owner AI Practice y Owners por equipo piloto. | Semana 0 |
| D3 | Aprobar presupuesto de tokens, licencias y horas-persona para MVP 1. | Semana 0 |
| D4 | Aceptar criterios Go/No-Go por MVP. | Semana 0 |
| D5 | Aprobar tablero ejecutivo semanal de 30 min. | Semana 0 |
` },

/* ── 02 ── */
doc02: { title: '02 — Estructura de la Iniciativa', content: `# 02 — Estructura de la Iniciativa MAIA

## 1. Estructura modular global

\`\`\`mermaid
flowchart TD
    subgraph GOB["Gobernanza MAIA"]
        SC["Steering Committee (C-Levels)"]
        OE["Owner Ejecutivo"]
        AIP["AI Practice Lead"]
        ARC["Arquitecto MAIA"]
    end

    subgraph CORE["Plataforma Núcleo"]
        IDP["Internal Developer Portal (IDP)"]
        ORQ["Orquestador de Agentes"]
        REG["Registro de Agentes & Skills"]
        MEM["Memoria Persistente"]
        TEL["Telemetría & KPIs"]
        SEC["Seguridad & IA Responsable"]
    end

    subgraph MOD["Módulos Funcionales"]
        DEV["MAIA for Developer — INICIO"]
        PM["MAIA for Project Mgmt"]
        KNOW["MAIA for Knowledge"]
        OPS["MAIA for Operations"]
        BIZ["MAIA for Business"]
    end

    subgraph PILOT["Pilotos & Adopción"]
        EQ1["Equipo Piloto 1"]
        EQ2["Equipo Piloto 2"]
        EQ3["Equipo Piloto 3 (MVP3)"]
    end

    GOB --> CORE
    CORE --> MOD
    DEV --> PILOT
\`\`\`

**Punto de partida:** el módulo **MAIA for Developer** es el primero en activarse, mediante 3 MVPs encadenados.

---

## 2. Constitución organizacional

\`\`\`mermaid
%%{init: {'flowchart': {'useMaxWidth': false, 'rankSpacing': 40, 'nodeSpacing': 30}}}%%
flowchart TB
    SC["Steering Committee MAIA — C-Levels y Dirección"]
    SC --> OE["Owner Ejecutivo MAIA"]
    OE --> AIP["AI Practice Lead"]
    OE --> ARQ["Arquitecto MAIA"]
    OE --> PMO["PMO MAIA"]

    AIP --> SQUAD["Squad Núcleo MAIA"]
    SQUAD --> AIE["AI Engineer (LLM, agentes)"]
    SQUAD --> PE["Prompt Engineer"]
    SQUAD --> FS["Fullstack Developer (Portal/IDP)"]
    SQUAD --> DOQA["DevOps + QA Automation"]
    SQUAD --> SECU["Security Engineer (part-time)"]

    ARQ --> ESTAND["Estándares y plantillas"]
    ARQ --> CONTR["Contratos de Integración"]

    PMO --> METR["Tablero ejecutivo"]
    PMO --> COM["Plan de comunicación"]

    AIP --> PIL["Líderes de Pilotos"]
    PIL --> EQ1["Equipo Piloto 1 (LP, LT, BA, Dev, QA)"]
    PIL --> EQ2["Equipo Piloto 2 (LP, LT, BA, Dev, QA)"]
    PIL --> EQ3["Equipo Piloto 3 (MVP 3)"]
\`\`\`

---

## 3. Punto de partida: MAIA for Developer

\`\`\`mermaid
flowchart TD
    START(["Línea Base — Semana 0"]) --> M1

    subgraph M1["MVP 1 — Proceso Estándar"]
        M1A["8 fases SDLC documentadas"]
        M1B["Plantillas mínimas"]
        M1C["Setup unificado Claude Code + Copilot"]
        M1D["Aprobaciones humanas"]
    end

    M1 -->|Go/No-Go| M2

    subgraph M2["MVP 2 — Célula Integrada"]
        M2A["Inventario de agentes existentes"]
        M2B["Contratos de integración"]
        M2C["Handoffs entre roles"]
        M2D["Fallback controlado"]
    end

    M2 -->|Go/No-Go| M3

    subgraph M3["MVP 3 — Inteligencia"]
        M3A["Memoria persistente Nivel 1"]
        M3B["ADR ligero"]
        M3C["Recuperación de contexto >= 90%"]
        M3D["Continuidad entre integrantes"]
    end

    M3 --> SCALE(["Escalado y módulos siguientes"])
\`\`\`

---

## 4. Plataforma Núcleo (capa común)

\`\`\`mermaid
flowchart TB
    subgraph UI["Capa de Experiencia"]
        PORTAL["Internal Developer Portal (React / Angular / Vue)"]
        IDE["Extensiones IDE (VS Code)"]
        CLI["CLI / Scripts (Win/Mac/Linux)"]
    end

    subgraph ORQ["Capa de Orquestación"]
        ROUT["Router de fase SDLC"]
        AGENT_ORQ["Orquestador de agentes (LangGraph)"]
        WORK["Workflows / Skills"]
    end

    subgraph CAT["Capa de Catálogo"]
        REGD["Registro de agentes"]
        CONTRACT["Contratos (input/output/calidad)"]
        STACK["Detector de stack"]
    end

    subgraph MEML["Capa de Memoria"]
        MD["Markdown estructurado (Nivel 1)"]
        ADR["Bitácora ADR ligero"]
        IDX["Índice / búsqueda"]
        ENG["engram (opcional, Nivel 2)"]
    end

    subgraph DATAL["Capa de Datos & Telemetría"]
        LOGS["Logs de sesiones"]
        METRICS["Métricas KPI"]
        AUDIT["Trazas de auditoría"]
    end

    subgraph SECL["Capa de Seguridad"]
        IAM["Identidad / SSO"]
        DLPL["DLP / Privacidad"]
        POL["Policy Engine"]
    end

    subgraph LLML["Capa de Modelos"]
        CC["Claude (Sonnet/Opus)"]
        CP["GitHub Copilot"]
        OTHER["Otros LLMs (según costo/caso)"]
    end

    UI --> ORQ
    ORQ --> CAT
    ORQ --> MEML
    ORQ --> LLML
    ORQ --> SECL
    ORQ --> DATAL
\`\`\`

---

## 5. Modelo de Roles y Responsabilidades (RACI resumido)

| Actividad | SC | OE | AIP | ARQ | Squad | Líder Piloto | Equipo Piloto |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Aprobar visión y presupuesto | **A** | R | C | C | I | I | I |
| Definir línea base | I | A | R | C | C | R | C |
| Diseñar plataforma núcleo | I | A | C | **R** | R | I | I |
| Construir módulos | I | A | R | C | **R** | C | I |
| Pilotar y validar | I | A | R | C | C | **R** | R |
| Medir y reportar KPIs | C | **A** | R | I | C | C | I |
| Comunicar avances | C | **A** | R | I | I | C | I |
| Gestionar riesgos | C | A | **R** | C | C | C | I |

> Ver [Glosario — RACI](#/glosario) para definición de roles. **R**esponsable, **A**probador, **C**onsultado, **I**nformado.

---

## 6. Cómo encaja con módulos posteriores

\`\`\`mermaid
timeline
    title Evolución modular de MAIA
    section 2026 - Fase 1 (MVPs)
        Q2 2026 : Línea base
                : MVP 1 - Proceso Estándar
        Q3 2026 : MVP 2 - Célula Integrada
                : MVP 3 - Inteligencia
    section 2026 - Fase 2 (Escalado dev)
        Q4 2026 : Adopción extendida MAIA for Developer
                : Hardening y costos
    section 2027 - Fase 3 (Expansión modular)
        Q1 2027 : MAIA for Project Mgmt (Estimación + HU)
        Q2 2027 : MAIA for Knowledge (RAG corporativo)
        Q3 2027 : MAIA for Operations
        Q4 2027 : MAIA for Business
\`\`\`

---

## 7. Resumen ejecutivo de la estructura

- **Gobierno:** el Steering Committee y el Owner Ejecutivo aprueban visión, presupuesto y decisiones Go/No-Go.
- **Operación:** el AI Practice Lead, el Arquitecto y el PMO MAIA coordinan la iniciativa día a día.
- **Construcción:** el Squad Núcleo MAIA construye la plataforma y sus módulos.
- **Validación:** los líderes de pilotos trabajan con equipos reales; cada MVP requiere evidencia concreta para avanzar.
- **Punto de partida:** MAIA for Developer, MVP 1 (Proceso Estándar), semana 1.
- **Evolución:** los módulos adicionales se activan una vez consolidado MAIA for Developer.
` },

/* ── 03 ── */
doc03: { title: '03 — Roadmap Visual', content: `# 03 — Roadmap Visual de MAIA

Línea de tiempo de los 3 MVPs (1 mes cada uno) más fases de preparación, escalado y evolución.

---

## 1. Vista resumida (Macro-fases)

<div class="roadmap-flow">
  <div class="rf-phase rf-base">
    <span class="rf-tag">Fase 0</span>
    <strong class="rf-name">Línea Base</strong>
    <span class="rf-period">Semana 0</span>
    <span class="rf-gate">Inicio &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 1</span>
    <strong class="rf-name">Proceso Estándar</strong>
    <span class="rf-period">Sem 1&ndash;4</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 2</span>
    <strong class="rf-name">Célula Integrada</strong>
    <span class="rf-period">Sem 5&ndash;8</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 3</span>
    <strong class="rf-name">Inteligencia</strong>
    <span class="rf-period">Sem 9&ndash;12</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-scale">
    <span class="rf-tag">Fase 4</span>
    <strong class="rf-name">Hardening &amp; Escalado</strong>
    <span class="rf-period">Sem 13&ndash;16</span>
    <span class="rf-gate">Continúa &rsaquo;</span>
  </div>
  <div class="rf-phase rf-expand">
    <span class="rf-tag">Fase 5</span>
    <strong class="rf-name">Expansión Modular</strong>
    <span class="rf-period">2027+</span>
  </div>
</div>

---

## 2. Gantt detallado (Fase 0 a Fase 4)

\`\`\`mermaid
gantt
    title MAIA - Roadmap MVP 1, MVP 2, MVP 3 y Escalado
    dateFormat  YYYY-MM-DD
    axisFormat %d-%b
    excludes    weekends

    section Fase 0 - Línea Base
    Selección de pilotos              :         f0a, 2026-05-18, 3d
    Levantamiento de línea base       :         f0b, 2026-05-18, 5d
    Aprobación Go MVP 1               :milestone, m0, after f0b, 0d

    section MVP 1 - Proceso Estándar
    Definir 8 fases SDLC              :         m1a, 2026-05-25, 5d
    Plantillas mínimas por fase       :         m1b, after m1a, 5d
    Setup unificado (CC + Copilot)    :         m1c, 2026-06-01, 5d
    Script instalación Win/Mac/Linux  :         m1d, after m1c, 3d
    Pilotaje 2 equipos                :         m1e, 2026-06-08, 10d
    Cierre MVP 1 - Go/No-Go MVP 2     :crit, milestone, m1m, 2026-06-19, 0d

    section MVP 2 - Célula Integrada
    Inventario agentes existentes     :         m2a, 2026-06-22, 4d
    Contratos LP/LT/BA/Dev/QA         :         m2b, after m2a, 5d
    Detección de stack (2 stacks)     :         m2c, 2026-06-29, 5d
    Handoffs y fallback               :         m2d, after m2c, 5d
    Pilotaje 2 equipos                :         m2e, 2026-07-06, 10d
    Cierre MVP 2 - Go/No-Go MVP 3     :crit, milestone, m2m, 2026-07-17, 0d

    section MVP 3 - Inteligencia
    Estructura Markdown de memoria    :         m3a, 2026-07-20, 4d
    Bitácora ADR ligero               :         m3b, after m3a, 4d
    Índice y búsqueda                 :         m3c, 2026-07-27, 4d
    Pruebas de recuperación           :         m3d, after m3c, 4d
    Pilotaje 3 equipos                :         m3e, 2026-08-03, 10d
    Cierre MVP 3 - Reporte Ejecutivo  :crit, milestone, m3m, 2026-08-14, 0d

    section Fase 4 - Hardening y Escalado
    Optimización de costos            :         f4a, 2026-08-17, 7d
    Hardening seguridad y compliance  :         f4b, 2026-08-17, 10d
    Plan de adopción extendida        :         f4c, 2026-08-24, 7d
    Capacitación a 5+ equipos         :         f4d, 2026-08-31, 14d
    Cierre Fase 4                     :crit, milestone, f4m, 2026-09-11, 0d
\`\`\`

> **Notas de calendario:** el plan asume inicio en la **segunda quincena de mayo de 2026** (línea base: semana del 18-may; MVP 1: inicia 25-may). Si la línea base toma más tiempo, los bloques se recorren completos. Cada MVP dura aprox. 4 semanas y cierra con una decisión Go/No-Go.

---

## 3. Dependencias entre MVPs

\`\`\`mermaid
graph TB
    LB["Línea Base — Sem 0"]

    subgraph S1["MVP 1: Proceso Estándar"]
        M1A["Fases SDLC"]
        M1B["Plantillas"]
        M1C["Setup unificado"]
        M1D["Aprobaciones humanas"]
    end

    subgraph S2["MVP 2: Célula Integrada"]
        M2A["Inventario agentes"]
        M2B["Contratos integración"]
        M2C["Handoffs"]
        M2D["Fallback"]
    end

    subgraph S3["MVP 3: Inteligencia"]
        M3A["Memoria Nivel 1"]
        M3B["ADR ligero"]
        M3C["Recuperación contexto"]
        M3D["Continuidad equipos"]
    end

    LB --> S1
    M1A --> M2B
    M1B --> M2B
    M1D --> M2C
    S1 --> S2
    M2B --> M3B
    M2C --> M3C
    S2 --> S3

    classDef base fill:#ECEFF1,stroke:#455A64,color:#000;
    classDef mvp1 fill:#E3F2FD,stroke:#1976D2,color:#000;
    classDef mvp2 fill:#E8F5E9,stroke:#2E7D32,color:#000;
    classDef mvp3 fill:#FFF3E0,stroke:#E65100,color:#000;

    class LB base;
    class M1A,M1B,M1C,M1D mvp1;
    class M2A,M2B,M2C,M2D mvp2;
    class M3A,M3B,M3C,M3D mvp3;
\`\`\`

**Dependencias críticas:**

| Predecesor | Dependiente | Tipo |
|---|---|---|
| Línea base | MVP 1 | Bloqueante (sin línea base no hay medición) |
| MVP 1 (fases SDLC + plantillas) | MVP 2 (contratos) | Insumo |
| MVP 1 (aprobaciones) | MVP 2 (handoffs) | Habilitador |
| MVP 2 (contratos) | MVP 3 (ADR ligero) | Insumo |
| MVP 2 (handoffs) | MVP 3 (continuidad) | Habilitador |

---

## 4. Hitos clave (Milestones)

\`\`\`mermaid
timeline
    title Hitos críticos MAIA 2026
    section Mayo 2026
        Sem 0 - Línea base aprobada    : Pilotos seleccionados (18 may)
                                       : Owners designados
                                       : KPIs y baseline registrados
    section Junio 2026
        Sem 4 - Cierre MVP 1           : 2 equipos con ciclo SDLC completo (19 jun)
                                       : Completitud >= 90%
                                       : Retrabajo -20%
    section Julio 2026
        Sem 8 - Cierre MVP 2           : 3 perfiles integrados (17 jul)
                                       : 2 stacks validados
                                       : Handoffs >= 85%
    section Agosto 2026
        Sem 12 - Cierre MVP 3          : Recuperación contexto >= 90% (14 ago)
                                       : 3 equipos con memoria activa
                                       : Reporte ejecutivo entregado
    section Septiembre 2026
        Sem 16 - Cierre Fase 4         : Adopción ampliada (11 sep)
                                       : Costos optimizados
                                       : Hardening completo
\`\`\`

---

## 5. Esfuerzo estimado por fase (resumen)

| Fase | Duración | Squad Núcleo (HH) | Pilotos (HH) |
|---|---:|---:|---:|
| Fase 0 — Línea Base | 1 sem | 60 | 16 |
| MVP 1 — Proceso Estándar | 4 sem | 480 | 64 |
| MVP 2 — Célula Integrada | 4 sem | 520 | 96 |
| MVP 3 — Inteligencia | 4 sem | 520 | 120 |
| Fase 4 — Hardening & Escalado | 4 sem | 320 | 200 |
| **Total Fases 0-4** | **17 sem** | **~1,900 HH** | **~496 HH** |

> **Notas:** Squad Núcleo asume 5 personas a 80% de capacidad. Equipos piloto a ~8h/semana de involucramiento. La estimación de esfuerzo formal se realizará una vez aprobado el plan.
` },

/* ── 04 ── */
doc04: { title: '04 — MVP 1: Proceso Estándar', content: `# 04 — MVP 1: Proceso Estándar

> **Duración:** 4 semanas (1 mes) · **Módulo:** MAIA for Developer · **Posición:** Punto de partida de la iniciativa

---

## 1. Objetivo

Instalar y validar el **estándar MAIA Flow Studio** en 2 equipos piloto. Cada equipo debe completar al menos 1 ciclo SDLC con artefactos versionados, aprobaciones humanas registradas y retrabajo medido contra la línea base.

---

## 2. Pre-requisitos

| # | Pre-requisito | Responsable | Plazo |
|---:|---|---|---|
| P1 | Selección formal de **2 equipos piloto** | Owner Ejecutivo + AIP | Semana 0 |
| P2 | Designación de **owners**: Ejecutivo, AIP, por equipo piloto | Steering Committee | Semana 0 |
| P3 | **Línea base** levantada y validada | AIP + Líderes de piloto | Semana 0 |
| P4 | **Licencias activas**: Claude Code y GitHub Copilot para todo el equipo piloto | TI / Compras | Semana 0 |
| P5 | **Acceso a repositorios** Git con permisos de PR/commit | TI | Semana 0 |
| P6 | **Acceso a Jira/Azure DevOps** del proyecto piloto | TI | Semana 0 |
| P7 | **Política de uso de IA** aprobada (privacidad, datos sensibles, propiedad intelectual) | Legal + Seguridad | Semana 0 |
| P8 | **Presupuesto de tokens** y plan de control de costos | Owner Ejecutivo | Semana 0 |
| P9 | **Tablero ejecutivo semanal** habilitado (30 min) | PMO MAIA | Semana 0 |
| P10 | Squad Núcleo MAIA conformado (mín. 5 personas) | AIP | Semana 0 |

---

## 3. Alcance

### Incluido

- 2 equipos piloto.
- 1 proyecto activo de baja o media complejidad por equipo (o 1 proyecto compartido con 2 células diferenciadas).
- 8 fases SDLC documentadas con plantillas mínimas.
- Integración inicial con **Claude Code** y **GitHub Copilot VS Code**.
- Evidencia versionada en Git: artefactos, aprobaciones, cambios y bitácora de decisiones.
- Script de instalación para Windows, macOS y Linux.

### Excluido

- Adopción enterprise.
- Automatización completa de auditoría.
- Integración profunda con todos los agentes organizacionales (eso es MVP 2).
- Memoria persistente entre sesiones (eso es MVP 3).
- Garantía de mejora de productividad generalizada.

---

## 4. Las 8 fases SDLC estandarizadas

<div class="sdlc-phases">
  <div class="sdlc-phase">
    <div class="sp-num">1</div>
    <div class="sp-name">Requerimientos</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">2</div>
    <div class="sp-name">Análisis &amp; HU</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">3</div>
    <div class="sp-name">Diseño Arquitectura</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">4</div>
    <div class="sp-name">Plan de Desarrollo</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">5</div>
    <div class="sp-name">Codificación</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">6</div>
    <div class="sp-name">Pruebas unitarias &amp; QA</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">7</div>
    <div class="sp-name">Revisión &amp; Aprobación</div>
  </div>
  <div class="sdlc-phase">
    <div class="sp-num">8</div>
    <div class="sp-name">Empaquetado &amp; Release</div>
  </div>
</div>

**Cada fase incluye:**

- Plantilla mínima de entrada y salida.
- Agente IA sugerido (CC o Copilot).
- Aprobador humano identificado.
- Evidencia auditable en Git.

---

## 5. Entregables

| # | Entregable | Formato | Owner |
|---:|---|---|---|
| E1 | Estándar MAIA Flow Studio para 2 herramientas (Claude Code + Copilot) | Documentación + repositorio plantilla | AIP |
| E2 | Flujo de 8 fases del requerimiento al release | Markdown + diagramas Mermaid | Arquitecto MAIA |
| E3 | Plantillas mínimas por fase (requerimientos, diseño, plan, pruebas) | Repositorio Git | Squad Núcleo |
| E4 | Aprobaciones humanas registradas por fase | PRs / commits / bitácora | Líderes Piloto |
| E5 | Script de instalación Windows/macOS/Linux | Bash/Powershell + README | DevOps |
| E6 | Línea base levantada y reporte | Markdown + tablero | AIP |
| E7 | Reporte de cierre MVP 1 con evidencia | PDF + Markdown | PMO MAIA |

---

## 6. Recursos requeridos

### 6.1 Recursos humanos

| Rol | Cantidad | Dedicación | Función en MVP 1 |
|---|---:|---|---|
| AI Practice Lead | 1 | 50% | Liderar el MVP, definir política de uso. |
| Arquitecto MAIA | 1 | 80% | Definir 8 fases, plantillas, contratos iniciales. |
| AI Engineer | 1 | 100% | Configurar agentes, prompts base, orquestación inicial. |
| Prompt Engineer | 1 | 60% | Diseñar y versionar prompts por fase. |
| Fullstack Developer (IDP) | 1 | 100% | Bootstrap del Internal Developer Portal mínimo. |
| DevOps + QA Automation | 1 | 60% | Scripts de instalación, evidencia automatizada. |
| Security Engineer | 1 | 20% | Política de uso de IA, DLP, revisión de configuraciones. |
| PMO MAIA | 1 | 40% | Tablero ejecutivo, comunicación, evidencia. |
| Líder Piloto | 2 | 30% c/u | Coordinar al equipo, recolectar evidencia. |
| Equipo Piloto (LP, LT, BA, Dev, QA) | 5-8 por equipo | 8h/sem | Ejecutar el ciclo SDLC con MAIA. |

---

## 7. Cronograma (4 semanas)

\`\`\`mermaid
gantt
    title MVP 1 - Proceso Estándar (4 semanas)
    dateFormat YYYY-MM-DD
    axisFormat %d-%b

    section Semana 1 - Diseño
    Definir 8 fases SDLC          :a1, 2026-05-25, 5d
    Plantillas mínimas por fase   :a2, 2026-05-25, 5d

    section Semana 2 - Plataforma
    Setup unificado (CC+Copilot)  :b1, 2026-06-01, 5d
    Script instalación multi-OS   :b2, 2026-06-01, 4d
    Política de uso de IA         :b3, 2026-06-01, 3d

    section Semana 3 - Pilotaje inicial
    Onboarding equipos piloto     :c1, 2026-06-08, 2d
    Ciclo SDLC equipo 1           :c2, 2026-06-09, 5d
    Ciclo SDLC equipo 2           :c3, 2026-06-09, 5d

    section Semana 4 - Cierre
    Recolección de evidencia      :d1, 2026-06-15, 3d
    Encuesta y satisfacción       :d2, 2026-06-17, 2d
    Reporte ejecutivo             :d3, 2026-06-17, 3d
    Go/No-Go MVP 2                :crit, milestone, m1, 2026-06-19, 0d
\`\`\`

---

## 8. Métricas de éxito

| Métrica | Fórmula | Meta semana 4 | Fuente |
|---|---|---:|---|
| Completitud de artefactos | Aprobados / requeridos | >= 90% | Checklist en repo |
| Ciclos SDLC completos | Ciclos con 8 fases cerradas | >= 2 | Git + acta cierre |
| Reducción de retrabajo por ambigüedad | Reaperturas/cambios vs línea base | >= 20% comprometido; 30% aspiracional | Jira/ADO/Git issues |
| Tiempo de onboarding al flujo | Min hasta primer artefacto válido | <= 60 min | Registro cronometrado |
| Aprobaciones humanas registradas | Fases con aprobador / fases totales | 100% | PRs/commits/bitácora |
| Satisfacción equipo piloto | Promedio encuesta 1-5 | >= 4.0 | Encuesta cierre |

---

## 9. Riesgos del MVP 1

| ID | Riesgo | Prob | Impacto | Mitigación |
|---|---|---|---|---|
| R1.1 | Línea base débil o ausente | Media | Alto | Levantar baseline antes de semana 1; bloquea inicio si no está. |
| R1.2 | Equipos piloto sobrecargados con su delivery | Alta | Medio | Pacto explícito de 8h/semana con sus líderes. |
| R1.3 | Plantillas demasiado pesadas | Media | Medio | Diseño minimalista; iterar tras semana 2. |
| R1.4 | Datos sensibles expuestos a LLM | Baja | Alto | Política DLP y sanitización; entrenamiento del piloto. |
| R1.5 | Costos de tokens fuera de control | Media | Medio | Cuotas por usuario, monitoreo diario. |
| R1.6 | Resistencia al cambio | Media | Medio | Comunicación temprana, beneficios concretos por rol. |

---

## 10. Criterio Go/No-Go (Semana 4)

**Avanzar a MVP 2 si:**

- Al menos **2 equipos** completan el ciclo SDLC con evidencia.
- **Completitud de artefactos >= 90%**.
- **Retrabajo baja al menos 20%** frente a línea base.
- Líderes piloto califican el proceso con **>= 4.0/5**.
- **100%** de fases con aprobación humana registrada.

**No-Go (acciones):**

- Si no se cumplen 2 o más criterios: extender MVP 1 una semana adicional con plan correctivo.
- Si después de la extensión persiste el incumplimiento: revisar alcance y replantear con dirección.
` },

/* ── 05 ── */
doc05: { title: '05 — MVP 2: Célula Integrada', content: `# 05 — MVP 2: Célula Integrada

> **Duración:** 4 semanas (1 mes) · **Módulo:** MAIA for Developer · **Depende de:** MVP 1

---

## 1. Objetivo

Conectar la **célula de especialistas** al flujo MAIA Flow Studio con contratos de entrada y salida por rol. El MVP valida un ciclo SDLC completo con al menos **3 perfiles** y **2 stacks**, y documenta el **fallback** cuando no hay agente disponible.

---

## 2. Pre-requisitos

| # | Pre-requisito | Responsable | Plazo |
|---:|---|---|---|
| P1 | **MVP 1 cerrado con Go** | Owner Ejecutivo | Semana 4 |
| P2 | Estándar de fases y plantillas estable y aprobado | Arquitecto MAIA | Semana 4 |
| P3 | **Inventario de agentes existentes** en la compañía | AIP | Semana 5 |
| P4 | Definición de **stacks priorizados** (mínimo 2) | Arquitecto MAIA | Semana 5 |
| P5 | Acuerdos con **dueños de agentes existentes** para integración | AIP + Owner Ejecutivo | Semana 5 |
| P6 | Equipos piloto disponibles (continuidad o nuevos) | Líderes Piloto | Semana 5 |
| P7 | Arquitectura de orquestación validada | Arquitecto MAIA | Semana 5 |
| P8 | Política de fallback aprobada | AIP + Seguridad | Semana 5 |

---

## 3. Alcance

### Incluido

- **Inventario de agentes** existentes por organización, rol y stack.
- **Contrato de integración** por perfil: LP, LT, BA, Dev, QA.
- **Detección de stack** para 2 tecnologías priorizadas (ejemplo: Java/Spring + Angular).
- **Flujo de handoff** entre roles con evidencia de artefactos.
- **Fallback documentado** hacia especialistas propios cuando no exista agente ORG.
- Orquestador inicial (LangGraph o equivalente) para coordinación entre fases.

### Excluido

- Reescritura de agentes existentes.
- Cobertura de todos los stacks de la organización.
- Automatización total de asignación de especialistas para todos los clientes.
- Compromiso de "célula perfecta" sin intervención humana.
- Memoria persistente avanzada (eso es MVP 3).

---

## 4. Concepto: Célula Integrada

\`\`\`mermaid
flowchart TB
    subgraph CICLO["Ciclo SDLC orquestado"]
        F1["Requerimientos"]
        F2["Análisis & HU"]
        F3["Diseño / Arquitectura"]
        F4["Plan"]
        F5["Codificación"]
        F6["Pruebas"]
        F7["Revisión"]
        F8["Release"]
    end

    subgraph CELULA["Célula de Especialistas"]
        LP2["Líder Proyecto Agente"]
        LT2["Líder Técnico Agente"]
        BA2["Business Analyst Agente"]
        DEV2["Developer Agente"]
        QA2["QA Agente"]
    end

    subgraph FALLBACK["Especialistas Propios"]
        FP1["Agente fallback Dev"]
        FP2["Agente fallback QA"]
        FP3["Agente fallback Genérico"]
    end

    subgraph CONTRATO["Contratos de Integración"]
        C1["Input esperado"]
        C2["Output esperado"]
        C3["Fase asignada"]
        C4["Criterios de calidad"]
    end

    F1 --> BA2
    F2 --> BA2
    F3 --> LT2
    F4 --> LP2
    F5 --> DEV2
    F6 --> QA2
    F7 --> LT2
    F8 --> LP2

    CELULA -.contratos.-> CONTRATO
    CELULA -.no disponible.-> FALLBACK
\`\`\`

---

## 5. Entregables

| # | Entregable | Formato | Owner |
|---:|---|---|---|
| E1 | Inventario formal de agentes existentes | Matriz Excel/MD | AIP |
| E2 | Contrato de integración por perfil (LP/LT/BA/Dev/QA) | Markdown + JSON Schema | Arquitecto |
| E3 | Detector de stack (2 stacks priorizados) | Servicio + tests | Squad Núcleo |
| E4 | Orquestador inicial (LangGraph) | Código + diagramas | Squad Núcleo |
| E5 | Catálogo de fallbacks | Markdown + bitácora | AIP |
| E6 | Bitácora de handoffs | Repositorio Git | Líderes Piloto |
| E7 | Reporte ejecutivo cierre MVP 2 | PDF + Markdown | PMO MAIA |

---

## 6. Cronograma (4 semanas)

\`\`\`mermaid
gantt
    title MVP 2 - Célula Integrada (4 semanas)
    dateFormat YYYY-MM-DD
    axisFormat %d-%b

    section Semana 5 - Inventario y Diseño
    Inventario de agentes        :a1, 2026-06-22, 4d
    Diseño de contratos          :a2, 2026-06-22, 5d

    section Semana 6 - Construcción
    Implementar contratos        :b1, 2026-06-29, 5d
    Detector de stack            :b2, 2026-06-29, 5d

    section Semana 7 - Integración
    Orquestador handoffs         :c1, 2026-07-06, 5d
    Catálogo de fallback         :c2, 2026-07-06, 3d
    Pilotaje 2 equipos           :c3, 2026-07-07, 7d

    section Semana 8 - Cierre
    Validación de KPIs           :d1, 2026-07-13, 3d
    Reporte y Go/No-Go MVP 3     :crit, milestone, m2, 2026-07-17, 0d
\`\`\`

---

## 7. Métricas de éxito

| Métrica | Fórmula | Meta semana 8 | Fuente |
|---|---|---:|---|
| Perfiles integrados | Perfiles probados / objetivo | >= 3 de 5 | Matriz integración |
| Stacks cubiertos | Stacks con detección + Dev/QA | >= 2 | Pruebas de flujo |
| Handoffs exitosos | Aceptados / totales | >= 85% | Bitácora ejecución |
| Uso de agente ORG | Fases con agente ORG / disponibles | >= 70% | Logs |
| Uso de fallback controlado | Fallbacks documentados / totales | 100% | Bitácora fallback |
| Reducción de coordinación | Tiempo en reuniones vs línea base | >= 25% comprometido; 40% aspiracional | Calendario + tiempos |

---

## 8. Riesgos del MVP 2

| ID | Riesgo | Prob | Impacto | Mitigación |
|---|---|---|---|---|
| R2.1 | Agentes existentes sin contrato estable | Alta | Alto | Crear adaptadores; bracket de versiones; fallback listo. |
| R2.2 | Resistencia de dueños de agentes a integración | Media | Alto | Acuerdo formal patrocinado por dirección. |
| R2.3 | Detección de stack imprecisa | Media | Medio | Limitar a 2 stacks bien conocidos. |
| R2.4 | Sobrecarga del orquestador (latencia/cost) | Media | Medio | Diseño asíncrono; cache; límites de concurrencia. |
| R2.5 | Fallos en handoffs por roles ausentes | Alta | Medio | Fallback obligatorio y documentado. |

---

## 9. Criterio Go/No-Go (Semana 8)

**Avanzar a MVP 3 si:**

- La célula ejecuta un **ciclo completo** con al menos **3 perfiles integrados**.
- **2 stacks** validados.
- **Handoffs exitosos >= 85%**.
- **Fallback documentado en 100%** de los casos donde aplique.

**No-Go (acciones):**

- Si falla cobertura: extender 1 semana priorizando los 3 perfiles más críticos.
- Si falla handoff: reforzar contratos antes de avanzar a MVP 3.
` },

/* ── 06 ── */
doc06: { title: '06 — MVP 3: Inteligencia', content: `# 06 — MVP 3: Inteligencia (Memoria Persistente)

> **Duración:** 4 semanas (1 mes) · **Módulo:** MAIA for Developer · **Depende de:** MVP 1 + MVP 2

---

## 1. Objetivo

Implementar **memoria persistente Nivel 1** en MAIA Flow Studio. Las decisiones, patrones, contexto y estado del proyecto deben poder recuperarse entre sesiones y entre integrantes del equipo. El MVP valida precisión de recuperación, calidad documental y continuidad de trabajo en al menos **3 equipos**.

---

## 2. Pre-requisitos

| # | Pre-requisito | Responsable | Plazo |
|---:|---|---|---|
| P1 | **MVP 2 cerrado con Go** | Owner Ejecutivo | Semana 8 |
| P2 | Estructura de fases y contratos estable | Arquitecto MAIA | Semana 8 |
| P3 | Definición formal de **ítems críticos** del contexto a recuperar | AIP + Arquitecto | Semana 9 |
| P4 | **3 equipos** disponibles para piloto extendido | Owner Ejecutivo | Semana 9 |
| P5 | Política de privacidad y retención de memoria aprobada | Legal + Seguridad | Semana 9 |
| P6 | Convención de **ADR ligero** acordada | Arquitecto | Semana 9 |
| P7 | Repositorio común para memoria (puede ser Git) | DevOps | Semana 9 |

---

## 3. Alcance

### Incluido (Nivel 1)

- **Estructura Markdown** de memoria por proyecto.
- Registro de **decisiones tipo ADR ligero** (decisión, motivo, fecha, impacto, dueño).
- Registro de **patrones técnicos** y **restricciones**.
- **Bitácora de sesiones** y contexto activo.
- **Búsqueda básica** integrada (puede ser grep, RAG ligero o índice).
- **Prueba de recuperación** entre sesiones y entre integrantes.

### Excluido

- Motor SQLite obligatorio.
- Interfaz visual enterprise.
- Knowledge base corporativa global (esa es MAIA for Knowledge).
- Memoria con embeddings vectoriales sofisticada (puede explorarse después).

---

## 4. Concepto: Memoria Nivel 1

\`\`\`mermaid
flowchart TB
    subgraph PROJECT["Proyecto"]
        SESS["Sesiones de trabajo"]
        ART["Artefactos de fase"]
        DEC["Decisiones"]
        PAT["Patrones técnicos"]
        REST["Restricciones"]
        STATE["Estado activo"]
    end

    subgraph MEML["Memoria Nivel 1"]
        MDL["Carpeta Markdown versionada en Git"]
        IDX["Índice/Búsqueda"]
        ADRL["ADR ligero"]
        BIT["Bitácora sesiones"]
    end

    subgraph CONSUM["Consumo"]
        AGENTS["Agentes IA"]
        DEVS["Integrantes nuevos"]
        AUDIT["Auditoría"]
    end

    SESS --> BIT
    DEC --> ADRL
    PAT --> MDL
    REST --> MDL
    STATE --> MDL
    ART --> MDL
    BIT --> MDL
    ADRL --> MDL
    MDL --> IDX

    IDX --> AGENTS
    IDX --> DEVS
    MDL --> AUDIT
\`\`\`

---

## 5. Plantilla ADR ligero

Cada decisión guardada debe incluir:

\`\`\`markdown
# ADR-XXX: <Título corto>
- Fecha: YYYY-MM-DD
- Estado: propuesta | aceptada | reemplazada
- Contexto: <párrafo breve>
- Opciones consideradas:
  - Opción A
  - Opción B
- Decisión: <opción elegida>
- Motivo: <por qué>
- Impacto: <consecuencias>
- Dueño: <persona / rol>
\`\`\`

---

## 6. Entregables

| # | Entregable | Formato | Owner |
|---:|---|---|---|
| E1 | Estructura formal de memoria por proyecto | Carpeta plantilla en Git | Arquitecto |
| E2 | Convención ADR ligero | Markdown + ejemplos | Arquitecto |
| E3 | Plantilla de bitácora de sesiones | Markdown | AIP |
| E4 | Búsqueda básica integrada | Servicio o script | Squad Núcleo |
| E5 | Prueba de transferencia entre integrantes | Reporte cronometrado | Líderes Piloto |
| E6 | 30 ADRs útiles documentados (mín.) | Carpeta de memoria | Pilotos |
| E7 | Reporte ejecutivo cierre MVP 3 | PDF + Markdown | PMO MAIA |

---

## 7. Cronograma (4 semanas)

\`\`\`mermaid
gantt
    title MVP 3 - Inteligencia (4 semanas)
    dateFormat YYYY-MM-DD
    axisFormat %d-%b

    section Semana 9 - Diseño
    Estructura Markdown de memoria  :a1, 2026-07-20, 4d
    Convención ADR ligero           :a2, 2026-07-20, 4d

    section Semana 10 - Construcción
    Bitácora de sesiones            :b1, 2026-07-27, 4d
    Búsqueda básica integrada       :b2, 2026-07-27, 5d

    section Semana 11 - Pilotaje
    Onboarding 3 equipos            :c1, 2026-08-03, 2d
    Pilotaje memoria viva           :c2, 2026-08-04, 8d

    section Semana 12 - Cierre
    Pruebas de transferencia        :d1, 2026-08-10, 3d
    Reporte ejecutivo final         :d2, 2026-08-12, 3d
    Cierre y decisión escalado      :crit, milestone, m3, 2026-08-14, 0d
\`\`\`

---

## 8. Métricas de éxito

| Métrica | Fórmula | Meta semana 12 | Fuente |
|---|---|---:|---|
| Precisión recuperación contexto | Ítems recuperados / esperados | >= 90% | Checklist por proyecto |
| Decisiones útiles documentadas | ADRs aprobados | >= 30 obligatorias; 50 aspiracional | Carpeta memoria |
| Sesiones con memoria actualizada | Sesiones con bitácora / totales | >= 90% | Log de sesiones |
| Continuidad entre miembros | Tareas retomadas sin sesión adicional | >= 2 casos exitosos | Registro transferencia |
| Tiempo para recuperar contexto | Min para responder checklist | <= 15 min | Prueba cronometrada |
| Equipos con memoria activa | Equipos que actualizan 2 sem consecutivas | >= 3 | Commits/bitácora |

---

## 9. Riesgos del MVP 3

| ID | Riesgo | Prob | Impacto | Mitigación |
|---|---|---|---|---|
| R3.1 | Métrica "100% recuperación" inflada | Media | Alto | Cambiar a >= 90% sobre checklist objetivo. |
| R3.2 | ADRs por volumen, sin calidad | Alta | Medio | Plantilla obligatoria + revisión por aprobador. |
| R3.3 | Equipos no actualizan memoria | Alta | Alto | Hábito en daily; commits obligatorios. |
| R3.4 | Privacidad / datos sensibles en memoria | Media | Alto | Política DLP + revisión semanal. |
| R3.5 | Búsqueda lenta o irrelevante | Media | Medio | Empezar simple (grep) y evolucionar. |

---

## 10. Criterio Go/No-Go (Semana 12)

**MVP 3 exitoso si:**

- **3 equipos** usan memoria activa durante **2 semanas consecutivas**.
- Se recupera al menos **90% del contexto crítico** en pruebas controladas.
- Al menos **2 transferencias** de trabajo entre integrantes sin sesión adicional.
- ADRs útiles documentados **>= 30**.

**No-Go (acciones):**

- Reducir alcance a 2 equipos y reportar parcial.
- Iterar 2 semanas adicionales si se identifica fricción mecánica resoluble.

---

## 11. Salida del MVP 3 → Fase 4

Una vez declarado el MVP 3 exitoso, la iniciativa entra a:

- **Fase 4:** optimización de costos, hardening, expansión a 5+ equipos en MAIA for Developer.
- **Preparación 2027:** activar **MAIA for Project Mgmt** (estimaciones CFP/WBS, análisis HU) como siguiente módulo.
` },

/* ── 07 ── */
doc07: { title: '07 — Estrategia de Implementación', content: `# 07 — Estrategia de Implementación

---

## 1. Fases de implementación

<div class="roadmap-flow roadmap-flow-7">
  <div class="rf-phase rf-base">
    <span class="rf-tag">Fase 0</span>
    <strong class="rf-name">Preparación</strong>
    <span class="rf-period">1 semana</span>
    <span class="rf-gate">Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 1</span>
    <strong class="rf-name">Proceso Estándar</strong>
    <span class="rf-period">4 semanas</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 2</span>
    <strong class="rf-name">Célula Integrada</strong>
    <span class="rf-period">4 semanas</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-mvp">
    <span class="rf-tag">MVP 3</span>
    <strong class="rf-name">Inteligencia</strong>
    <span class="rf-period">4 semanas</span>
    <span class="rf-gate">Go / No-Go &rsaquo;</span>
  </div>
  <div class="rf-phase rf-scale">
    <span class="rf-tag">Fase 4</span>
    <strong class="rf-name">Hardening</strong>
    <span class="rf-period">4 semanas</span>
    <span class="rf-gate">Continúa &rsaquo;</span>
  </div>
  <div class="rf-phase rf-scale">
    <span class="rf-tag">Fase 5</span>
    <strong class="rf-name">Escalado Empresarial</strong>
    <span class="rf-period">4&ndash;8 semanas</span>
    <span class="rf-gate">Continúa &rsaquo;</span>
  </div>
  <div class="rf-phase rf-expand">
    <span class="rf-tag">Fase 6</span>
    <strong class="rf-name">Expansión Modular</strong>
    <span class="rf-period">2027+</span>
  </div>
</div>

### 1.1 Fase 0 — Preparación (1 semana)

- Definir línea base.
- Seleccionar pilotos.
- Designar owners.
- Habilitar licencias y permisos.
- Aprobar política de uso de IA.

**Salida:** Línea base + plan formal de MVP 1.

### 1.2 Fase 1 — MVP 1: Proceso Estándar (4 semanas)

**Criterio:** estandarizar primero, automatizar después.

### 1.3 Fase 2 — MVP 2: Célula Integrada (4 semanas)

**Criterio:** integrar los agentes existentes, no reemplazarlos.

### 1.4 Fase 3 — MVP 3: Inteligencia (4 semanas)

**Criterio:** cada proyecto deja aprendizajes que los siguientes equipos pueden reutilizar.

### 1.5 Fase 4 — Hardening y Escalado (4 semanas)

- Optimización de costos de tokens.
- Hardening de seguridad y cumplimiento.
- Expansión a **5+ equipos** dentro de MAIA for Developer.
- Estandarización de plantillas para adopción masiva.
- Capacitación masiva.

**Salida:** plataforma estable, segura, costo controlado, lista para escalar.

### 1.6 Fase 5 — Escalado Empresarial (4-8 semanas)

- Adopción organizacional ampliada.
- Métricas operativas continuas.
- Catálogo de casos de éxito documentados.
- Discovery comercial enterprise (uso en RFPs).

### 1.7 Fase 6 — Expansión Modular (2027+)

Activación progresiva de:

1. **MAIA for Project Management** (estimaciones CFP/WBS, análisis HU).
2. **MAIA for Knowledge** (RAG corporativo).
3. **MAIA for Operations**.
4. **MAIA for Business**.

---

## 2. Modelo de adopción

\`\`\`mermaid
flowchart TB
    A["Early Adopters — 2 equipos piloto"]
    B["Validación temprana +evidencia"]
    C["Champions internos"]
    D["Adopción extendida 5+ equipos"]
    E["Adopción organizacional 20+ equipos"]
    F["Expansión modular otras áreas"]

    A --> B --> C --> D --> E --> F

    classDef early fill:#FFD700,stroke:#B8860B,color:#000;
    classDef growth fill:#90EE90,stroke:#2E7D32,color:#000;
    classDef scale fill:#87CEFA,stroke:#0277BD,color:#000;

    class A,B early;
    class C,D growth;
    class E,F scale;
\`\`\`

**Roles del modelo:**

- **Early adopters:** absorben fricción inicial y aportan feedback rápido.
- **Champions:** evangelistas internos formados durante MVPs.
- **Mainstream:** equipos que adoptan tras evidencia consolidada.
- **Late adopters:** se incorporan con onboarding industrializado.

---

## 3. Capacitación

| Audiencia | Contenido | Modalidad | Duración | Cuándo |
|---|---|---|---|---|
| Owner Ejecutivo + SC | Visión, KPIs, gobernanza | Sesión 1:1 | 60 min | Pre-MVP 1 |
| AI Practice + Squad | Stack técnico, prompts, contratos | Hands-on | 8 h | Pre-MVP 1 |
| Líderes piloto | Flujo MAIA, plantillas, evidencia | Workshop | 4 h | Pre-MVP 1 |
| Equipo piloto | Onboarding 60 min al flujo + prácticas | Hands-on | 60 min + auto-estudio | Inicio MVP 1 |
| Champions | Profundización por rol | Sesiones cortas semanales | 30 min/sem | Durante MVPs |
| Toda la compañía | Comunicación de visión y casos | Town hall | 60 min | Cierre cada MVP |
| Adopción extendida | Curso estándar MAIA + lab | E-learning + lab | 4 h | Fase 4 en adelante |

---

## 4. Estrategia de escalado

\`\`\`mermaid
flowchart LR
    P1["Pilotos 2 equipos"] --> P2["Validación 3 equipos"]
    P2 --> P3["Champions +5 equipos"]
    P3 --> P4["Adopción amplia +15 equipos"]
    P4 --> P5["Adopción organizacional + áreas no-dev"]
\`\`\`

**Reglas de escalado:**

1. No escalar sin evidencia (tablero ejecutivo verde).
2. No escalar sin capacidad de soporte (Squad Núcleo + Champions).
3. No escalar sin presupuesto de tokens proyectado.
4. Escalar primero por similitud de stack y madurez del equipo.

---

## 5. Modelo operativo (RUN) post-MVPs

| Capacidad | Operación |
|---|---|
| Soporte de uso | AI Practice + Office Hours semanales. |
| Mantenimiento de plantillas | Squad Núcleo + community PRs. |
| Catálogo de agentes | Curado por Arquitecto MAIA. |
| Costos de tokens | Monitoreo diario por DevOps; reporte mensual. |
| Auditoría | Revisión trimestral por Security. |
| Evolución | Roadmap por trimestre con dirección. |

---

## 6. Cadencia de gobierno

| Reunión | Frecuencia | Duración | Asistentes | Salida |
|---|---|---|---|---|
| Steering Committee MAIA | Quincenal | 60 min | C-Levels + OE + AIP | Decisiones estratégicas |
| Tablero ejecutivo | Semanal | 30 min | OE + AIP + PMO MAIA | KPIs y desbloqueos |
| Standup MAIA Squad | Diario | 15 min | Squad Núcleo | Progreso técnico |
| Sync con líderes piloto | Semanal | 30 min | AIP + Líderes piloto | Evidencia y bloqueos |
| Office Hours | Semanal | 60 min | AIP + comunidad | Soporte y buenas prácticas |
| Demo de cierre MVP | Cierre cada MVP | 60 min | Toda la compañía | Visión + próximos pasos |

---

## 7. Decisiones de diseño transversales

| Decisión | Postura |
|---|---|
| ¿Mock vs real en pilotos? | Real (proyecto activo) — evita falsos positivos. |
| ¿Markdown vs DB para memoria? | Markdown en Nivel 1 (auditable, simple, en Git). |
| ¿LLM local vs nube? | Nube, controlando datos sensibles vía DLP y políticas. |
| ¿Reemplazar agentes existentes? | No — integrar vía contratos. |
| ¿Adopción mandatoria? | No — opt-in con incentivos por evidencia. |
| ¿Compromiso vs aspiración? | Cada KPI tiene ambos niveles. |
` },

/* ── 08 ── */
doc08: { title: '08 — Métricas de Éxito', content: `# 08 — Métricas de Éxito

---

## 1. Principios de medición

1. **Línea base antes de iniciar.** Ningún porcentaje de mejora se acepta sin baseline.
2. **Evidencia auditable.** Cada KPI tiene fuente verificable (Git, Jira/ADO, bitácora).
3. **Comprometido vs aspiracional.** Dos niveles para evitar sobrepromesa.
4. **Tablero semanal.** Máximo 8 indicadores frente a dirección.
5. **Revisión por MVP.** Cada MVP cierra con su propio cuadro de KPIs.

---

## 2. Línea base (Fase 0)

Antes de iniciar el MVP 1, levantar:

| Variable base | Dato requerido | Fuente |
|---|---|---|
| Retrabajo por ambigüedad | Tickets reabiertos, cambios de alcance, defectos por requerimiento | Jira/ADO/Git issues |
| Tiempo de coordinación | Horas/semana en planning, refinement, handoffs y aclaraciones | Calendario + encuesta |
| Tiempo de onboarding | Min para que un nuevo integrante ejecute el flujo base sin ayuda | Prueba cronometrada |
| Completitud documental | Artefactos existentes vs esperados por fase SDLC | Revisión repositorio |
| Tiempo de recuperación de contexto | Min para explicar estado, decisiones y próximos pasos | Entrevista controlada |

> **Regla:** sin línea base aprobada, **no inicia el MVP 1**.

---

## 3. KPIs por MVP

### 3.1 MVP 1 — Proceso Estándar

| Métrica | Fórmula | Compromiso | Aspiracional | Fuente |
|---|---|---:|---:|---|
| Completitud de artefactos | Aprobados / requeridos | >= 90% | 95% | Checklist en repo |
| Ciclos SDLC completos | Ciclos cerrados con 8 fases | >= 2 | 3 | Git + acta |
| Reducción de retrabajo | (Base − Actual) / Base | >= 20% | 30% | Jira/ADO |
| Tiempo de onboarding al flujo | Min hasta primer artefacto válido | <= 60 min | 45 min | Cronometrado |
| Aprobaciones humanas registradas | Fases con aprobador / fases | 100% | 100% | PRs/commits |
| Satisfacción equipo piloto | Promedio 1-5 | >= 4.0 | 4.5 | Encuesta |

### 3.2 MVP 2 — Célula Integrada

| Métrica | Fórmula | Compromiso | Aspiracional | Fuente |
|---|---|---:|---:|---|
| Perfiles integrados | Perfiles probados / 5 | >= 3 | 5 | Matriz |
| Stacks cubiertos | Stacks con detección + Dev/QA | >= 2 | 3 | Pruebas |
| Handoffs exitosos | Aceptados / totales | >= 85% | 95% | Bitácora |
| Uso de agente ORG | Fases ORG / disponibles | >= 70% | 85% | Logs |
| Uso de fallback documentado | Documentados / totales | 100% | 100% | Bitácora |
| Reducción de coordinación | (Base − Actual) / Base | >= 25% | 40% | Calendario + encuesta |

### 3.3 MVP 3 — Inteligencia

| Métrica | Fórmula | Compromiso | Aspiracional | Fuente |
|---|---|---:|---:|---|
| Precisión recuperación de contexto | Recuperados / esperados | >= 90% | 95% | Checklist |
| ADRs útiles documentados | ADRs aprobados | >= 30 | 50 | Carpeta memoria |
| Sesiones con memoria actualizada | Con bitácora / totales | >= 90% | 95% | Logs |
| Continuidad entre miembros | Casos exitosos | >= 2 | 4 | Registro |
| Tiempo recuperar contexto | Min para checklist | <= 15 min | 10 min | Cronometrado |
| Equipos con memoria activa | Equipos 2 sem consecutivas | >= 3 | 4 | Commits |

---

## 4. Tablero ejecutivo (semana 12 acumulado)

Indicadores frente a C-Levels, máximo 8:

| Indicador | Meta acumulada |
|---|---:|
| Equipos piloto activos | >= 3 |
| Ciclos SDLC completos documentados | >= 3 |
| Completitud de artefactos aprobados | >= 90% |
| Reducción de retrabajo | >= 20% comprometido; 30% aspiracional |
| Perfiles de agentes integrados | >= 3 |
| Stacks validados | >= 2 comprometido; 3 aspiracional |
| Precisión de recuperación de contexto | >= 90% |
| Satisfacción equipos piloto | >= 4.0/5 |

---

## 5. Métricas operativas y de costo (transversales)

| Métrica | Frecuencia | Meta | Fuente |
|---|---|---|---|
| Costo de tokens por usuario activo | Diaria | < umbral por rol | API LLM |
| Costo total mensual de IA | Mensual | <= presupuesto aprobado | API LLM + facturación |
| Latencia P95 del orquestador | Semanal | <= 5 s en flujos típicos | Logs |
| Disponibilidad del IDP | Mensual | >= 99% | Monitoreo |
| Hallazgos de seguridad abiertos | Semanal | 0 críticos | Tooling SAST/DAST |
| Tickets de soporte / semana | Semanal | Tendencia decreciente | Mesa soporte MAIA |

---

## 6. Visualización del tablero

\`\`\`mermaid
flowchart TB
    subgraph TOP["Tablero Ejecutivo MAIA"]
        K1["Equipos piloto activos"]
        K2["Ciclos SDLC completos"]
        K3["Completitud artefactos"]
        K4["Reducción retrabajo"]
        K5["Perfiles integrados"]
        K6["Stacks validados"]
        K7["Recuperación contexto"]
        K8["Satisfacción piloto"]
    end

    subgraph OPSL["Operativo"]
        O1["Costo tokens"]
        O2["Latencia P95"]
        O3["Disponibilidad"]
        O4["Hallazgos seguridad"]
    end

    subgraph ADOL["Adopción"]
        A1["Activos / habilitados"]
        A2["Champions activos"]
        A3["Office Hours utilization"]
    end

    TOP --> DECL{{"Decisión Go / No-Go / Ajuste"}}
    OPSL --> DECL
    ADOL --> DECL
\`\`\`

---

## 7. Cómo se usa el tablero

- **Verde** todos los KPIs comprometidos cumplidos → recomendar Go.
- **Ámbar** 1 KPI debajo de meta → revisar causa, decidir Go con plan correctivo.
- **Rojo** 2+ KPIs debajo de meta → No-Go, extender o replantear.
` },

/* ── 09 ── */
doc09: { title: '09 — Plan de Comunicación', content: `# 09 — Plan de Comunicación

---

## 1. Mapa de stakeholders

\`\`\`mermaid
flowchart LR
    subgraph C["C-Levels y Steering"]
        SCN["Steering Committee"]
        DIR["Dirección General"]
        CTO["CTO/CIO"]
    end

    subgraph M["Mandos Medios"]
        DMN["Delivery Managers"]
        PLN["Project Leaders"]
        TL["Team Leads"]
    end

    subgraph E["Equipos"]
        DEVN["Developers"]
        QAN["QAs"]
        BAN["BAs / POs"]
        ARQN["Arquitectos"]
    end

    subgraph S["Soporte"]
        TIN["TI / DevOps"]
        SEGN["Seguridad"]
        LEG["Legal"]
        RH["RH / L&D"]
    end

    subgraph EX["Externos"]
        CLI["Clientes estratégicos"]
        VEN["Proveedores"]
    end

    MAIN[("Iniciativa MAIA")]
    MAIN --> C
    MAIN --> M
    MAIN --> E
    MAIN --> S
    MAIN -.fase 5+.-> EX
\`\`\`

---

## 2. Matriz de stakeholders (interés/influencia)

| Stakeholder | Interés | Influencia | Estrategia |
|---|:-:|:-:|---|
| Steering Committee | Alto | Alta | **Gestionar de cerca** — reportes ejecutivos quincenales |
| Delivery Managers | Alto | Media | **Mantener informados con detalle** — sync bisemanal |
| Project Leaders | Alto | Media | **Mantener satisfechos** — boletín + office hours |
| Team Leads / Champions | Alto | Media | **Convertir en aliados** — workshops + co-creación |
| Developers / QA | Medio | Baja | **Mantener informados** — comunicaciones masivas + casos |
| TI / DevOps | Medio | Media | **Coordinar** — sync técnico mensual |
| Seguridad / Legal | Bajo-Medio | Alta | **Gestionar de cerca** — checkpoints obligatorios |
| RH / L&D | Medio | Baja | **Coordinar capacitación** — co-diseño |
| Clientes estratégicos | Variable | Variable | **Discovery** post-MVP 3 con evidencia |

---

## 3. Canales y cadencia

| Canal | Audiencia | Cadencia | Responsable | Contenido |
|---|---|---|---|---|
| Reunión Steering Committee | C-Levels | Quincenal (60 min) | OE + AIP | KPIs, decisiones, riesgos, presupuesto |
| Tablero ejecutivo en vivo | OE + AIP + PMO | Semanal (30 min) | PMO MAIA | KPIs y desbloqueos |
| Demo de cierre de MVP | Toda la compañía | Cada 4 semanas (60 min) | AIP + Squad | Avances, casos, próximos pasos |
| Boletín MAIA | Toda la compañía | Mensual | PMO MAIA | Logros, casos, métricas, capacitación |
| Canal Teams/Slack #maia | Toda la compañía | Continuo | AIP | Anuncios, dudas, comunidad |
| Office Hours | Comunidad técnica | Semanal (60 min) | AIP + Squad | Soporte, buenas prácticas |
| Página interna MAIA (portal) | Toda la compañía | Continuo | PMO + DevOps | Docs, plantillas, KPIs, FAQs |
| Reporte ejecutivo escrito | Steering + Sponsors | Cierre cada MVP | PMO MAIA | Evidencia, KPIs, recomendación |
| Town Hall MAIA | Toda la compañía | Cierre cada fase grande | OE + AIP | Visión y resultados |

---

## 4. Narrativa de comunicación por audiencia

| Audiencia | Mensaje clave | Tono | Formato |
|---|---|---|---|
| C-Levels | "MAIA convierte el uso disperso de IA en un proceso medible con evidencia real" | Ejecutivo, basado en KPIs | Slides + 1-pager |
| Delivery / PL | "MAIA acelera tu delivery sin perder control ni trazabilidad" | Pragmático, orientado a entregas | Workshops + casos |
| Equipos técnicos | "MAIA es tu copiloto estandarizado: menos retrabajo, más enfoque en lo importante" | Técnico, hands-on | Demos + tutoriales |
| Seguridad / Legal | "MAIA opera bajo política aprobada, con auditoría y DLP" | Riguroso, basado en controles | Documentos + revisiones |
| Comercial / Cuentas | "MAIA da evidencia real para el discovery enterprise" | Comercial, post-evidencia | Casos + métricas validadas |

### Mensajes prohibidos (riesgos comerciales)

| Evitar | Reemplazar por |
|---|---|
| "Zero fricción" | "Continuidad operativa con fallback controlado" |
| "Trazabilidad total" | "Trazabilidad auditable de requerimiento a pruebas en pilotos" |
| "Sin pérdida de contexto" | "Recuperación verificable del contexto crítico" |
| "Listo para escala enterprise desde semana 10" | "Preparado para discovery enterprise post-MVP 3, sujeto a evidencia" |
| "100% recuperación de contexto" | ">= 90% sobre checklist de contexto crítico" |

---

## 5. Cronograma de comunicación principal

\`\`\`mermaid
gantt
    title Comunicación MAIA - Hitos
    dateFormat YYYY-MM-DD
    axisFormat %d-%b

    section Steering Committee
    SC quincenal 1 :a1, 2026-05-18, 1d
    SC quincenal 2 :a2, 2026-06-01, 1d
    SC quincenal 3 :a3, 2026-06-15, 1d
    SC quincenal 4 :a4, 2026-06-29, 1d
    SC quincenal 5 :a5, 2026-07-13, 1d
    SC quincenal 6 :a6, 2026-07-27, 1d
    SC quincenal 7 :a7, 2026-08-10, 1d

    section Demos de cierre
    Demo cierre MVP 1 :crit, b1, 2026-06-19, 1d
    Demo cierre MVP 2 :crit, b2, 2026-07-17, 1d
    Demo cierre MVP 3 :crit, b3, 2026-08-14, 1d

    section Boletín mensual
    Boletín mayo  :c1, 2026-05-29, 1d
    Boletín junio :c2, 2026-06-26, 1d
    Boletín julio :c3, 2026-07-31, 1d
    Boletín agosto :c4, 2026-08-28, 1d

    section Town Hall
    Town Hall fin Fase MVPs :crit, d1, 2026-08-17, 1d
\`\`\`

---

## 6. Feedback loop

- **Encuesta cierre MVP** (NPS interno + comentarios abiertos).
- **Ideas para MAIA**: formulario abierto en el portal para nuevas habilidades.
- **Bug bash semanal** durante pilotos.
- **Retros formales** al cierre de cada MVP (formato Start / Stop / Continue).

---

## 7. Plan de gestión del cambio (marco ADKAR)

<div class="adkar-flow">
  <div class="rf-phase adkar-awareness">
    <span class="rf-tag">Paso 1</span>
    <strong class="rf-name">Conciencia</strong>
    <span class="rf-period">Por qué MAIA</span>
  </div>
  <div class="rf-phase adkar-desire">
    <span class="rf-tag">Paso 2</span>
    <strong class="rf-name">Deseo</strong>
    <span class="rf-period">Beneficios por rol</span>
  </div>
  <div class="rf-phase adkar-knowledge">
    <span class="rf-tag">Paso 3</span>
    <strong class="rf-name">Conocimiento</strong>
    <span class="rf-period">Capacitación</span>
  </div>
  <div class="rf-phase adkar-ability">
    <span class="rf-tag">Paso 4</span>
    <strong class="rf-name">Habilidad</strong>
    <span class="rf-period">Pilotos + práctica</span>
  </div>
  <div class="rf-phase adkar-reinforcement">
    <span class="rf-tag">Paso 5</span>
    <strong class="rf-name">Refuerzo</strong>
    <span class="rf-period">Casos + recompensas</span>
  </div>
</div>

Marco **ADKAR** aplicado a la adopción de MAIA, con materiales y eventos por etapa.
` },

/* ── 10 ── */
doc10: { title: '10 — Gestión de Riesgos', content: `# 10 — Gestión de Riesgos

---

## 1. Categorías de riesgo

\`\`\`mermaid
flowchart TB
    subgraph CAT["Categorías de Riesgo MAIA"]
        TEC["Técnicos"]
        ADO["Adopción / Cambio"]
        SEG["Seguridad / Privacidad"]
        REGL["Regulatorio / Legal"]
        COS["Costos / Financieros"]
        COM["Comercial / Reputacional"]
        OPE["Operativos"]
        DEP["Dependencias / Proveedores"]
    end
\`\`\`

---

## 2. Matriz de riesgos (probabilidad x impacto)

<div class="risk-matrix">
  <div class="risk-zone">
    <div class="rz-header rz-critical">Zona Crítica — Mitigar Prioritariamente</div>
    <div class="rz-cards">
      <div class="risk-card rc-critical">
        <span class="rc-id">R1</span>
        <span class="rc-name">Línea base débil</span>
      </div>
      <div class="risk-card rc-critical">
        <span class="rc-id">R4</span>
        <span class="rc-name">Adopción superficial</span>
      </div>
      <div class="risk-card rc-critical">
        <span class="rc-id">R6</span>
        <span class="rc-name">Agentes sin contrato estable</span>
      </div>
      <div class="risk-card rc-critical">
        <span class="rc-id">R8</span>
        <span class="rc-name">Métricas infladas</span>
      </div>
      <div class="risk-card rc-critical">
        <span class="rc-id">R10</span>
        <span class="rc-name">Alucinaciones en artefactos</span>
      </div>
    </div>
  </div>

  <div class="risk-zone">
    <div class="rz-header rz-high">Alto Impacto — Plan de Contingencia</div>
    <div class="rz-cards">
      <div class="risk-card rc-high">
        <span class="rc-id">R3</span>
        <span class="rc-name">Datos sensibles a LLM</span>
      </div>
      <div class="risk-card rc-high">
        <span class="rc-id">R7</span>
        <span class="rc-name">Sobrepromesa comercial</span>
      </div>
      <div class="risk-card rc-high">
        <span class="rc-id">R9</span>
        <span class="rc-name">Dependencia de proveedor</span>
      </div>
      <div class="risk-card rc-high">
        <span class="rc-id">R11</span>
        <span class="rc-name">Memoria confidencial</span>
      </div>
    </div>
  </div>

  <div class="risk-zone">
    <div class="rz-header rz-medium">Riesgos Operativos — Monitorear</div>
    <div class="rz-cards">
      <div class="risk-card rc-medium">
        <span class="rc-id">R2</span>
        <span class="rc-name">Tokens fuera de control</span>
      </div>
      <div class="risk-card rc-medium">
        <span class="rc-id">R5</span>
        <span class="rc-name">Resistencia mandos medios</span>
      </div>
    </div>
  </div>

  <div class="risk-zone">
    <div class="rz-header rz-low">Bajo Riesgo — Aceptar/Monitorear</div>
    <div class="rz-cards">
      <div class="risk-card rc-low">
        <span class="rc-id">R12</span>
        <span class="rc-name">Latencia/UX pobre</span>
      </div>
    </div>
  </div>
</div>

---

## 3. Registro de riesgos (top 12)

| ID | Riesgo | Cat | Prob | Imp | Severidad | Dueño | Mitigación | Contingencia |
|---|---|---|:-:|:-:|:-:|---|---|---|
| R1 | Línea base débil o ausente | Operativo | M | A | **Alta** | AIP | Levantar baseline obligatorio en Fase 0 con criterios objetivos | Bloquear inicio de MVP 1 hasta completar |
| R2 | Costo de tokens fuera de control | Costos | M | M | **Media** | DevOps | Cuotas por usuario; monitoreo diario; modelos escalables | Pausar uso no esencial; renegociar contratos |
| R3 | Datos sensibles enviados a LLM | Seguridad | B | A | **Alta** | Security | Política DLP + sanitización + entrenamiento del piloto | Auditoría inmediata + reseteo de incidente |
| R4 | Adopción superficial | Adopción | A | M | **Alta** | AIP | Pilotos opt-in con incentivos por evidencia; office hours | Replantear alcance y comunicar |
| R5 | Resistencia de mandos medios | Adopción | M | M | **Media** | OE | Patrocinio ejecutivo visible; quick wins comunicados | Sesiones 1:1 + ajuste de incentivos |
| R6 | Agentes existentes sin contrato estable | Técnico | A | A | **Alta** | Arquitecto | Adaptadores + bracket de versiones + fallback obligatorio | Reemplazar temporalmente con fallback propio |
| R7 | Sobrepromesa comercial | Comercial | M | A | **Alta** | OE + AIP | Compromisos vs aspiraciones; lenguaje calibrado | Aclaración formal + recalibración de mensajes |
| R8 | Métricas infladas / no auditables | Operativo | M | A | **Alta** | PMO MAIA + AIP | Evidencia obligatoria por KPI; revisión externa al squad | No reportar KPIs sin evidencia |
| R9 | Dependencia de un único proveedor LLM | Dependencias | M | A | **Alta** | Arquitecto | Abstracción del LLM; al menos 2 proveedores aprobados | Migrar a alternativa con plan listo |
| R10 | Alucinaciones del agente en artefactos críticos | Técnico | A | M | **Alta** | Prompt Eng + QA | Aprobación humana 100%; tests automatizados | Marcar artefacto como inválido + reentrenar prompt |
| R11 | Memoria persistente expone confidencialidad | Seguridad | M | A | **Alta** | Security + Legal | Política de retención + DLP + revisión semanal | Purgar contenido afectado + reporte de incidente |
| R12 | UX pobre o latencia alta del IDP | Operativo | M | M | **Media** | Squad | Diseño asíncrono; cache; SLOs; presupuesto de error | Rollback a flujo manual mientras se corrige |

> **Severidad** = combinación cualitativa de probabilidad e impacto. **A**=Alta, **M**=Media, **B**=Baja.

---

## 4. Controles obligatorios

| Control | Frecuencia | Responsable | Evidencia |
|---|---|---|---|
| Revisión de costos de tokens | Diaria | DevOps | Dashboard |
| Revisión de seguridad / DLP | Semanal | Security | Reporte |
| Auditoría de evidencia de KPIs | Cierre cada MVP | PMO MAIA + AIP | Reporte ejecutivo |
| Revisión legal de política de uso | Trimestral | Legal | Política firmada |
| Revisión de proveedores LLM | Trimestral | Arquitecto | Plan de contingencia actualizado |

---

## 5. Plan de contingencia (si MVP No-Go)

\`\`\`mermaid
flowchart TB
    NG["No-Go en cierre de MVP"]
    A1["Análisis de causa raíz 3-5 días"]
    A2["Plan correctivo formal"]
    A3{{"Causa resoluble?"}}
    R1["Extender 1-2 semanas con plan correctivo"]
    R2["Replantear alcance con dirección"]
    R3["Suspender iniciativa (último recurso)"]

    NG --> A1 --> A2 --> A3
    A3 -- Sí, fricción menor --> R1
    A3 -- Sí, alcance amplio --> R2
    A3 -- No --> R3
\`\`\`

**Trigger de suspensión:**

- Pérdida de patrocinio ejecutivo.
- Incidente grave de seguridad o legal.
- Costos sostenidamente fuera de presupuesto sin alternativa viable.

---

## 6. Marco de IA Responsable (resumen)

| Principio | Aplicación en MAIA |
|---|---|
| Transparencia | Bitácora auditable de decisiones e intervenciones del agente. |
| Privacidad | DLP, sanitización, política de retención. |
| Equidad | Evitar prompts/datos con sesgo en revisiones; auditoría de outputs. |
| Robustez | Tests automatizados; aprobación humana obligatoria. |
| Rendición de cuentas | Owner por proceso; aprobaciones registradas. |
| Sostenibilidad | Modelos elegidos por costo/calidad; uso responsable. |
` },

/* ── 11 ── */
doc11: { title: '11 — Recursos', content: `# 11 — Recursos Humanos y Tecnológicos

---

## 1. Estructura del equipo

<div class="org-structure">
  <div class="org-level">
    <div class="org-level-title">Liderazgo Ejecutivo</div>
    <div class="org-cards">
      <div class="org-card oc-exec">
        <div class="oc-role">Owner Ejecutivo</div>
        <div class="oc-desc">Autoridad sobre presupuesto y decisiones</div>
        <div class="oc-count">1 persona • 20%</div>
      </div>
    </div>
  </div>

  <div class="org-level">
    <div class="org-level-title">Dirección Ejecutiva (reporta a Owner)</div>
    <div class="org-cards">
      <div class="org-card oc-director">
        <div class="oc-role">AI Practice Lead</div>
        <div class="oc-desc">Líder técnico y coordinador de programa</div>
        <div class="oc-count">1 persona • 60–100%</div>
      </div>
      <div class="org-card oc-director">
        <div class="oc-role">Arquitecto MAIA</div>
        <div class="oc-desc">Diseño de solución, integración y seguridad</div>
        <div class="oc-count">1 persona • 80–100%</div>
      </div>
      <div class="org-card oc-director">
        <div class="oc-role">PMO MAIA</div>
        <div class="oc-desc">Gestión, métricas y comunicación</div>
        <div class="oc-count">1 persona • 40–50%</div>
      </div>
    </div>
  </div>

  <div class="org-level">
    <div class="org-level-title">Squad Núcleo (reporta a AI Practice Lead)</div>
    <div class="org-cards">
      <div class="org-card oc-squad">
        <div class="oc-role">AI Engineer</div>
        <div class="oc-desc">LLMs, agentes, LangGraph/Chain</div>
        <div class="oc-count">2 personas • 100%</div>
      </div>
      <div class="org-card oc-squad">
        <div class="oc-role">Prompt Engineer</div>
        <div class="oc-desc">Diseño, versionado y evaluación de prompts</div>
        <div class="oc-count">1 persona • 60–80%</div>
      </div>
      <div class="org-card oc-squad">
        <div class="oc-role">Fullstack Dev (IDP)</div>
        <div class="oc-desc">React/Angular/Vue + Node/Java</div>
        <div class="oc-count">1 persona • 100%</div>
      </div>
      <div class="org-card oc-squad">
        <div class="oc-role">DevOps + QA Automation</div>
        <div class="oc-desc">CI/CD, scripts multi-OS, automatización</div>
        <div class="oc-count">1 persona • 60–80%</div>
      </div>
      <div class="org-card oc-squad">
        <div class="oc-role">Security Engineer</div>
        <div class="oc-desc">DLP, IAM, auditoría, IA Responsable</div>
        <div class="oc-count">1 persona • 20–30%</div>
      </div>
    </div>
  </div>

  <div class="org-level">
    <div class="org-level-title">Pilotos (reportan a AI Practice Lead)</div>
    <div class="org-cards">
      <div class="org-card oc-pilot">
        <div class="oc-role">Líderes de Piloto</div>
        <div class="oc-desc">Coordinación de equipos piloto</div>
        <div class="oc-count">2–3 personas • 30%</div>
      </div>
      <div class="org-card oc-pilot">
        <div class="oc-role">Equipo Piloto 1</div>
        <div class="oc-desc">LP, LT, BA, Dev, QA</div>
        <div class="oc-count">5–8 personas • 8–16h/sem</div>
      </div>
      <div class="org-card oc-pilot">
        <div class="oc-role">Equipo Piloto 2</div>
        <div class="oc-desc">LP, LT, BA, Dev, QA</div>
        <div class="oc-count">5–8 personas • 8–16h/sem</div>
      </div>
      <div class="org-card oc-pilot">
        <div class="oc-role">Equipo Piloto 3</div>
        <div class="oc-desc">desde MVP 3 — LP, LT, BA, Dev, QA</div>
        <div class="oc-count">5–8 personas • 8–16h/sem</div>
      </div>
    </div>
  </div>
</div>

---

## 2. Perfiles y responsabilidades

### 2.1 Roles dedicados (Squad Núcleo)

| Rol | Cantidad | Dedicación promedio | Perfil esperado |
|---|---:|---|---|
| Owner Ejecutivo | 1 | 20% | Director / VP con autoridad sobre presupuesto |
| AI Practice Lead | 1 | 60-100% | Líder técnico con experiencia en IA aplicada |
| Arquitecto MAIA | 1 | 80-100% | Arquitecto de software, integración, seguridad |
| AI Engineer | 2 | 100% | Python, LangGraph/LangChain, LLMs, agentes |
| Prompt Engineer | 1 | 60-80% | Diseño y versionado de prompts, evaluación |
| Fullstack Developer (IDP) | 1 | 100% | React / Angular / Vue (por definir), Node/Java, integración de servicios |
| DevOps + QA Automation | 1 | 60-80% | CI/CD, scripts multi-OS, automatización pruebas |
| Security Engineer | 1 | 20-30% | DLP, IAM, auditoría, IA Responsable |
| PMO MAIA | 1 | 40-50% | Project management, métricas, comunicación |

### 2.2 Roles compartidos / pilotos

| Rol | Cantidad | Dedicación |
|---|---:|---|
| Líder de Piloto | 2-3 | 30% |
| Equipo Piloto (LP, LT, BA, Dev, QA) | 5-8 por equipo | 8-16h/sem según MVP |

---

## 3. Estimación de esfuerzo en horas-persona por fase

| Fase | Duración | Squad Núcleo (HH) | Pilotos (HH) |
|---|---:|---:|---:|
| Fase 0 — Línea Base | 1 sem | 60 | 16 |
| MVP 1 | 4 sem | 480 | 64 |
| MVP 2 | 4 sem | 520 | 96 |
| MVP 3 | 4 sem | 520 | 120 |
| Fase 4 — Hardening | 4 sem | 320 | 200 |
| **Subtotal Fases 0-4** | **17 sem** | **~1,900** | **~496** |

---

## 4. Stack tecnológico

\`\`\`mermaid
flowchart TB
    subgraph capUI["Capa UI"]
        FE["React / Angular / Vue (por definir)"]
        VSC["VS Code con extensiones"]
    end

    subgraph capBack["Capa Backend"]
        NODEJS["Node.js y Python"]
        LANGG["LangGraph y LangChain"]
        APIG["APIs REST y GraphQL"]
    end

    subgraph capDatos["Capa de Datos"]
        GIT[("Git Repo")]
        DB[("PostgreSQL")]
        VEC[("Vector store - opcional")]
        OBJ[("Object storage")]
    end

    subgraph capModelos["Modelos LLM"]
        CLAUDE["Claude Sonnet y Opus"]
        COPILOT["GitHub Copilot"]
        ALTM["Modelos alternos - plan B"]
    end

    subgraph capObs["Observabilidad"]
        OTEL["OpenTelemetry"]
        DASH["Grafana y Power BI"]
        AUDITL["Logs de auditoria"]
    end

    subgraph capSeg["Seguridad"]
        SSON["SSO corporativo"]
        DLPN["DLP"]
        POLN["Policy Engine"]
    end

    capUI --> capBack --> capDatos
    capBack --> capModelos
    capBack --> capObs
    capBack --> capSeg
\`\`\`

### 4.1 Componentes principales

| Categoría | Recurso | Versión / Notas |
|---|---|---|
| LLM principal | Anthropic Claude | Sonnet por defecto; Opus para casos críticos |
| LLM secundario | GitHub Copilot | VS Code |
| Orquestación | LangGraph | Python (preferido) |
| IDE | Visual Studio Code | Estándar corporativo |
| Agente CLI | Claude Code | Multi-OS |
| Versionamiento | Git | Repositorio corporativo |
| Tracker | Jira o Azure DevOps | Para línea base de retrabajo |
| CI/CD | GitHub Actions / Azure Pipelines | Según corporativo |
| Documentación | Markdown + Mermaid + PlantUML | Estándar interno |
| Telemetría | OpenTelemetry + Grafana / Power BI | KPIs ejecutivos |
| Datos memoria Nivel 1 | Markdown en Git | Auditable |
| Identidad | SSO corporativo | OIDC/SAML |
| DLP | Solución corporativa o Microsoft Purview | Privacidad |
| Comunicación | Microsoft Teams / Slack | Canal #maia |

---

## 5. Costos referenciales (orden de magnitud)

> Cifras orientativas mensuales en USD. Calibrar con cotización formal antes de presupuestar.

| Concepto | Costo mensual estimado |
|---|---:|
| Licencias Claude (uso intensivo del squad) | $1,500 - $3,000 |
| Licencias GitHub Copilot (squad + pilotos, ~25 personas) | $400 - $500 |
| Tokens adicionales para flujos automatizados | $1,500 - $4,000 |
| Infra (Cloud + telemetría) | $500 - $1,500 |
| Herramientas de seguridad (DLP, SAST/DAST) | Compartidas con corporativo |
| **Total mensual estimado MVPs** | **$3,900 - $9,000** |

---

## 6. Pre-requisitos tecnológicos por fase

| Fase | Pre-requisito tecnológico |
|---|---|
| Fase 0 | Acceso a Git, Jira/ADO, licencias activas Claude + Copilot, política de uso aprobada |
| MVP 1 | Repositorio plantilla, script de instalación multi-OS, telemetría básica |
| MVP 2 | Orquestador (LangGraph), schema de contratos, detector de stack, catálogo de fallback |
| MVP 3 | Repositorio de memoria, búsqueda básica, plantilla ADR, política de retención |
| Fase 4 | Hardening de seguridad, gestión de costos automatizada, SLOs definidos |
` },

/* ── Glosario ── */
glosario: { title: 'Glosario de Términos', content: `# Glosario de Términos y Acrónimos — MAIA

---

## ADKAR

**Awareness · Desire · Knowledge · Ability · Reinforcement**

Marco de gestión del cambio creado por Prosci. Define cinco etapas para que una persona adopte un cambio de forma sostenida: (1) Conciencia del porqué, (2) Deseo de participar, (3) Conocimiento de cómo hacerlo, (4) Habilidad para ejecutarlo y (5) Refuerzo para mantenerlo. En MAIA se usa para estructurar el plan de adopción de herramientas y procesos de IA.

---

## ADO

**Azure DevOps**

Plataforma de Microsoft para gestión de proyectos, repositorios Git, pipelines CI/CD y seguimiento de trabajo. Utilizado en MAIA como fuente de datos para la línea base de retrabajo y trazabilidad de artefactos.

---

## ADR

**Architecture Decision Record**

Documento que registra una decisión de arquitectura o diseño. Formato mínimo en MAIA: título, fecha, estado, contexto, opciones consideradas, decisión, motivo, impacto y dueño. Permite recuperar el razonamiento en sesiones futuras sin depender de la memoria del equipo.

---

## AI

**Artificial Intelligence**

Inteligencia Artificial. Disciplina de la informática que desarrolla sistemas capaces de realizar tareas que normalmente requieren inteligencia humana. Véase también [IA](#ia).

---

## AIP

**AI Practice Lead**

Rol responsable de liderar la práctica de IA dentro de MAIA: define estándares, diseña los flujos de agentes, coordina la capacitación y es el principal punto de contacto técnico entre el Squad Núcleo y los equipos piloto. Reporta al [OE](#oe).

---

## API

**Application Programming Interface**

Interfaz de Programación de Aplicaciones. Conjunto de definiciones y protocolos que permiten que dos sistemas de software se comuniquen entre sí.

---

## ARQ

**Arquitecto MAIA**

Rol dentro del Squad Núcleo responsable del diseño de la plataforma, los contratos de integración de agentes y los estándares de arquitectura de MAIA.

---

## BA

**Business Analyst**

Analista de Negocios. Perfil encargado de elicitar, documentar y refinar requerimientos de negocio, así como de analizar la completitud y claridad de las HU.

---

## CFP

**Cosmic Function Points**

Unidad de medición funcional definida por la norma ISO 19761 (COSMIC). Cuantifica el tamaño de un sistema a partir de los movimientos de datos de sus procesos funcionales (Entry, Exit, Read, Write). En MAIA se usa para estimaciones de esfuerzo en MAIA for Project Management.

---

## CI/CD

**Continuous Integration / Continuous Delivery**

Integración Continua / Entrega Continua. Práctica de ingeniería de software que automatiza la compilación, prueba y despliegue de código de forma continua.

---

## DLP

**Data Loss Prevention**

Prevención de Pérdida de Datos. Conjunto de herramientas y políticas que detectan y bloquean que información sensible llegue a sistemas no autorizados, por ejemplo a un proveedor externo de LLM.

---

## DM

**Delivery Manager**

Gerente de Entrega. Rol responsable de coordinar la entrega de proyectos de software, gestionar equipos y asegurar el cumplimiento de compromisos con el cliente.

---

## HH

**Horas-Hombre / Horas-Persona**

Unidad de medición de esfuerzo que representa el trabajo que una persona puede realizar en una hora. Usada en MAIA para estimar el esfuerzo requerido por fase y por rol.

---

## HU

**Historia de Usuario**

Descripción de una funcionalidad desde la perspectiva del usuario. Formato estándar: *Como [rol], quiero [acción] para [beneficio]*, con criterios de aceptación en formato *Given/When/Then* o lista de condiciones verificables.

---

## IA

**Inteligencia Artificial**

Término en español equivalente a [AI](#ai). Disciplina que desarrolla sistemas que imitan capacidades cognitivas humanas como el razonamiento, el aprendizaje y la generación de lenguaje.

---

## IDE

**Integrated Development Environment**

Entorno de Desarrollo Integrado. Herramienta de software que combina editor de código, depurador y compilador en una sola aplicación. En MAIA el IDE estándar es Visual Studio Code.

---

## IDP

**Internal Developer Portal**

Portal Interno para Desarrolladores. Interfaz desde la que los equipos de ingeniería acceden a las capacidades de MAIA: flujos SDLC, catálogo de agentes, memoria persistente y métricas.

> No confundir con *Identity Provider* (también IDP), que es el proveedor de identidad en protocolos SSO/OIDC.

---

## KPI

**Key Performance Indicator**

Indicador Clave de Desempeño. Métrica cuantificable utilizada para evaluar el éxito de una iniciativa o proceso frente a un objetivo definido.

---

## LLM

**Large Language Model**

Modelo de Lenguaje de Gran Tamaño. Modelo de IA entrenado con grandes volúmenes de texto que genera, resume, traduce y razona sobre lenguaje natural. Ejemplos: Claude (Anthropic), GPT-4 (OpenAI).

---

## LP

**Líder de Proyecto**

Rol responsable de la planificación, coordinación y seguimiento general de un proyecto de software. Gestiona alcance, tiempos, recursos y comunicación con el cliente.

---

## LT

**Líder Técnico**

Rol responsable de las decisiones técnicas en un equipo de desarrollo: arquitectura, revisión de código, estándares y mentoría a los desarrolladores.

---

## MVP

**Minimum Viable Product**

Producto Mínimo Viable. Versión inicial de un producto que incluye solo las funcionalidades esenciales para validar hipótesis de negocio o técnicas con usuarios reales, antes de invertir en un desarrollo completo. En MAIA cada MVP dura aproximadamente 4 semanas y termina con una decisión Go/No-Go.

---

## NPS

**Net Promoter Score**

Métrica de lealtad y satisfacción que pregunta a los usuarios qué tan probable es que recomienden el producto/servicio en una escala de 0 a 10. Se usa en MAIA como componente de las encuestas de cierre de MVP.

---

## OE

**Owner Ejecutivo**

Patrocinador ejecutivo de MAIA. Aprueba presupuesto, toma decisiones estratégicas y desbloquea impedimentos. Es el principal responsable (*Accountable*) frente al [SC](#sc).

---

## OIDC

**OpenID Connect**

Protocolo de autenticación construido sobre OAuth 2.0. Utilizado por el IDP de MAIA para integración con el SSO corporativo.

---

## PL

**Project Leader**

Equivalente a [LP](#lp) en algunas nomenclaturas de la organización. Líder responsable del proyecto ante el cliente y la dirección interna.

---

## PMO

**Project Management Office**

Oficina de Gestión de Proyectos. En MAIA, **PMO MAIA** es el rol encargado de la coordinación operativa: tablero ejecutivo, seguimiento de KPIs, comunicación y generación de evidencia.

---

## PoC

**Proof of Concept**

Prueba de Concepto. Experimento acotado que valida la viabilidad técnica o de negocio de una idea antes de comprometer recursos para un desarrollo completo.

---

## QA

**Quality Assurance**

Aseguramiento de la Calidad. Disciplina y rol responsable de diseñar y ejecutar pruebas que verifiquen que el software cumple los criterios de aceptación y estándares de calidad.

---

## RACI

**Responsible · Accountable · Consulted · Informed**

Matriz de asignación de responsabilidades. Define para cada actividad quién la **Ejecuta** (R), quién **Aprueba** (A), quién debe ser **Consultado** (C) y quién debe ser **Informado** (I).

---

## RAG

**Retrieval-Augmented Generation**

Generación Aumentada por Recuperación. Técnica que combina un LLM con un sistema de búsqueda sobre documentos propios. El modelo genera respuestas basadas en esos documentos, no solo en su entrenamiento. En MAIA se usa para construir el asistente de conocimiento corporativo.

---

## RFP

**Request for Proposal**

Solicitud de Propuesta. Documento formal que una organización emite para invitar a proveedores a presentar propuestas para un proyecto o servicio.

---

## SC

**Steering Committee**

Comité Directivo. El órgano de gobierno de mayor nivel en MAIA, formado por C-Levels y la Dirección General. Aprueba la visión, el presupuesto y los criterios Go/No-Go.

---

## SDLC

**Software Development Life Cycle**

Ciclo de Vida del Desarrollo de Software. Conjunto de fases que cubren el desarrollo completo de un sistema: requerimientos, análisis, diseño, implementación, pruebas, despliegue y mantenimiento. MAIA estandariza 8 fases de este ciclo.

---

## SLO

**Service Level Objective**

Objetivo de Nivel de Servicio. Meta interna de desempeño para un servicio (por ejemplo, disponibilidad del IDP >= 99%).

---

## Squad Nucleo

**Squad Núcleo MAIA**

Equipo dedicado que construye, mantiene y evoluciona la plataforma MAIA. Lo conforman: [AIP](#aip), [ARQ](#arq), AI Engineers, Prompt Engineer, Fullstack Developer, DevOps/QA Automation y Security Engineer.

---

## SSO

**Single Sign-On**

Inicio de Sesión Único. Mecanismo de autenticación que permite a un usuario acceder a múltiples sistemas con una sola credencial. MAIA se integra con el SSO corporativo para gestión de identidad.

---

## TI

**Tecnologías de la Información**

Departamento o área corporativa responsable de la infraestructura tecnológica, redes, licencias de software, accesos y seguridad de sistemas.

---

## WBS

**Work Breakdown Structure**

Estructura de Desglose del Trabajo. Técnica de planificación que descompone el alcance de un proyecto en entregables y paquetes de trabajo estimables de forma independiente.

---

## Go/No-Go

Decisión binaria que se toma al cierre de cada MVP. Si se cumplen las métricas comprometidas, se aprueba (**Go**) el inicio del siguiente MVP. Si no se cumplen, se activa el plan de contingencia (**No-Go**).

---

## Línea Base

Medición del estado actual antes de iniciar cualquier MVP. Sin línea base no hay forma de demostrar mejora, por eso es requisito obligatorio. Incluye: retrabajo por ambigüedad, tiempo de coordinación, completitud documental y tiempo de recuperación de contexto.
` }

}; // end DOCS
