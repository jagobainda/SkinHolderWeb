# Plan de Rediseño Visual y Migración React → Astro — SkinHolderWeb

## Análisis del estado actual

| Categoría | Archivos actuales | Tecnología |
|---|---|---|
| Páginas | `index`, `home`, `items`, `registros`, `config` | `.astro` (solo envuelven componentes React) |
| Layout | `AppLayout.astro` | Astro |
| Auth | `LoginPage.tsx`, `LoginForm.tsx` | React |
| Dashboard | `Dashboard.tsx`, `DashboardContent.tsx`, 4x StatsCard | React |
| Registros | `RegistrosView.tsx`, `ActionsCard.tsx`, `ProgressCard.tsx` | React |
| Shared | `TopNavbar.tsx`, `ProtectedPage.tsx`, `LoadingScreen.tsx`, `Alert.tsx`, `ToastContainer.tsx` | React |
| Estado | `useAuth.ts` (Zustand), `useDashboard.ts` (TanStack Query), `useRegistros.ts`, `useLogin.ts`, `useToast.ts` | React Hooks |
| i18n | `useTranslation()` con `useMemo` en React | React |
| Estilo | Tailwind v4, colores custom (`#b8d600`, fondo `#4A4A4A→#2C2C2C`) | CSS |

---

## FASE 1 — Refactorización de i18n (sin React)

**Objetivo:** Eliminar la dependencia de React en `useTranslation`.

- Reemplazar `src/i18n/index.ts` para que exporte una función `getTranslations()` pura (sin `useMemo`, sin hooks) que detecte el idioma del navegador via `document.documentElement.lang` o un atributo en el `<html>`.
- En `AppLayout.astro`, detectar el idioma del request en el frontmatter (`Astro.request`) y pasar `lang` como atributo al `<html lang={lang}>`.
- Los componentes Astro usarán `getTranslations(lang)` directamente. Los componentes React que queden seguirán usando el hook pero simplificado.

---

## FASE 2 — Migrar componentes estáticos a Astro

**Regla:** Un componente se puede migrar a Astro si **no usa estado de React ni efectos de ciclo de vida**.

### 2.1 `TopNavbar.tsx` → `TopNavbar.astro`

- El navbar tiene interactividad mínima: el menú hamburguesa móvil y el highlight del item activo.
- **Migración:** Convertirlo a `.astro`. El toggle del menú móvil se hace con Alpine.js inline (`x-data`, `x-show`) o con CSS puro usando un `<input type="checkbox">` oculto + labels.
- El logout (`signOut` de Zustand) se convierte en un `<button>` que llama a un script inline que borra `localStorage` y redirige a `/`.
- `isActive(path)` se resuelve en el frontmatter con `Astro.url.pathname`.

### 2.2 `LoadingScreen.tsx` → `LoadingScreen.astro`

- Puramente visual. Migración directa a Astro, sin lógica.

### 2.3 `Alert.tsx` → `Alert.astro`

- Componente presentacional. Migración directa a Astro con props tipados.

### 2.4 `StatsCard.tsx` → `StatsCard.astro`

- Contenedor visual sin estado. Migración a Astro con `<slot />` para `children` y props para `title`, `icon`, `iconColor`.
- **Nota:** Los iconos de `react-icons` no funcionarán en Astro. Sustituir por SVG inline o por [`astro-icon`](https://github.com/natemoo-re/astro-icon).

---

## FASE 3 — Migrar páginas completas a Astro

### 3.1 `ConfigPage.tsx` + `config.astro` → `config.astro` directo

- Si `ConfigPage` no tiene estado significativo aún (el archivo es muy pequeño), convertirla en contenido Astro directamente.

### 3.2 `ItemsPage.tsx` + `items.astro` → `items.astro` directo

- Mismo caso que Config.

---

## FASE 4 — Protección de rutas sin React

**Objetivo:** Eliminar `ProtectedPage.tsx` (Zustand + React) y hacer la protección en Astro middleware.

- Crear `src/middleware.ts` usando la API de middleware de Astro.
- El middleware lee el token de `localStorage`... pero `localStorage` no existe en el servidor. **Solución:** Migrar el token a una **cookie HTTP-only** (`Set-Cookie` en el login) en lugar de `localStorage`.
- El middleware de Astro verifica la cookie del token llamando al API de validación, y si no es válida redirige a `/`.
- Esto elimina completamente `ProtectedPage.tsx`, `useAuth.ts` (Zustand) y la carga visual de "checking auth".

> ⚠️ **Impacto:** Requiere cambiar `src/lib/auth.ts` para que el login guarde el token en una cookie además de (o en lugar de) `localStorage`. También afecta a `useLogin.ts`.

---

## FASE 5 — Dashboard: mantener React solo donde hace falta

El dashboard tiene **fetch de datos en tiempo real** (refresco cada 30s con TanStack Query) y **estado de UI** (selector de plataforma en `VarianceStatsCard`). Aquí React se justifica.

**Lo que se queda en React:**
- `DashboardContent.tsx` — orquesta el fetching con `useDashboard`
- `VarianceStatsCard.tsx` — tiene estado (`selectedPlatform`)
- `ConnectionStatsCard.tsx`, `LastRegistryStatsCard.tsx`, `LatencyStatsCard.tsx` — reciben datos via props, **se pueden convertir a Astro** si se restructura el fetching

**Estrategia recomendada para las 3 stats cards sin estado:**
- Convertirlas a `.astro` con props tipados.
- `DashboardContent.tsx` sigue siendo React y renderiza los componentes Astro... pero eso no es posible directamente.
- **Alternativa real:** Dejar las 3 cards como componentes React funcionales simples (sin hooks propios), pero eliminar toda la lógica de `StatsCard` base migrándola a un componente Astro envuelto. El fetching y el `QueryProvider` se mantienen.

**Simplificación del QueryProvider:**
- `QueryProvider.tsx` wrappea con `QueryClientProvider`. Se puede eliminar usando el patrón de TanStack Query directamente en el componente isla React.

---

## FASE 6 — Registros: mantener React (lógica compleja)

`RegistrosView` + `useRegistros` tiene lógica de negocio pesada: bucle de fetching con delay de 3s, actualización incremental de progreso, estado complejo. **Mantener en React** es correcto.

**Mejoras dentro de React:**
- `ActionsCard.tsx` y `ProgressCard.tsx`: revisar si tienen sub-componentes migrables.
- Extraer `TopNavbar` del JSX de `RegistrosView` (ya migrado a Astro en Fase 2) — el layout Astro lo incluirá.

---

## FASE 7 — Rediseño visual

**Objetivo:** Modernizar la UI manteniendo la identidad (`#b8d600` como color primario, fondo oscuro).

### Sistema de diseño — nuevos tokens CSS

```css
/* src/styles/global.css */
@theme {
    /* Colores base (sin cambio) */
    --color-primary: #b8d600;
    --color-primary-hover: #a0b800;
    --color-primary-active: #8a9f00;

    /* Fondo: capas con soporte glassmorphism */
    --color-surface: #1e1e1e;          /* fondo base, más oscuro */
    --color-surface-card: #2a2a2a;     /* cards */
    --color-surface-elevated: #333333; /* elementos elevados */
    --color-border: rgba(255,255,255,0.08);

    /* Plataformas */
    --color-gamerpay: #019eff;
    --color-steam: #59bf40;
    --color-csfloat: #e8e8e8;
}
```

### Cambios visuales por área

#### Login (`LoginForm.tsx`)
- Fondo: gradiente más profundo con un sutil ruido/textura o blur de partículas.
- Card de login: efecto **glassmorphism** (`backdrop-blur`, `bg-white/5`, borde sutil con `border-white/10`).
- Logo más prominente, tipografía más grande.
- Inputs: diseño de línea base (underline style) en lugar de border completo.
- Animación de entrada suave (`fade + slide up`).

#### TopNavbar (`TopNavbar.astro`)
- Cambiar de barra fija sólida a navbar con `backdrop-blur` y `bg-black/40` (semi-transparente).
- Items de navegación: pills con hover animado (underline deslizante o fondo animado).
- Indicador de página activa más visible (pill con color primary).

#### Layout general (`AppLayout.astro`)
- Fondo: `#1a1a1a` base con un gradiente radial sutil centrado en `#b8d600` al 5% de opacidad para dar profundidad.
- Eliminar el `from-[#4A4A4A] to-[#2C2C2C]` hardcodeado en múltiples sitios. Centralizar todo en el `<body>` del layout.

#### StatsCards (Dashboard)
- Borde de hover: mantener el glow de `bg-primary` pero más sutil.
- Header más diferenciado con icono más grande.
- Valores numéricos: tipografía más grande en color primario.
- **Skeleton loader** mientras cargan datos (en lugar del spinner centrado).

#### ProgressCard (Registros)
- Barra de progreso más prominente con animación fluida (`transition-all duration-300`).
- Colores de plataforma más integrados (Steam verde, GamerPay azul, CSFloat blanco).
- Estado "completado" con checkmark animado.

---

## FASE 8 — Limpieza de dependencias

| Dependencia | ¿Se puede eliminar? | Condición |
|---|---|---|
| `@astrojs/react` | ❌ No | Quedan islas React (Dashboard, Registros, Login) |
| `@tanstack/react-query` | ⚠️ Reducir uso | Solo necesario para Dashboard |
| `zustand` | ✅ Sí | Si el auth migra a middleware + cookies |
| `react-icons` | ✅ Sí | Sustituir por `astro-icon` o SVGs inline |

---

## Orden de ejecución recomendado

```
1. Fase 1  — i18n sin hooks React
2. Fase 2.2 + 2.3 — LoadingScreen y Alert a Astro (sin dependencias, más fáciles)
3. Fase 4  — Middleware de auth + cookies (requiere cambios en auth.ts y useLogin.ts)
4. Fase 2.1 — TopNavbar a Astro (depende de que auth ya no use ProtectedPage)
5. Fase 3  — ConfigPage e ItemsPage a Astro
6. Fase 7  — Rediseño visual (puede hacerse en paralelo con las fases anteriores)
7. Fase 5  — Simplificación Dashboard
8. Fase 8  — Limpieza de dependencias
```

---

## Lo que NO se toca

- `src/lib/*` — Toda la capa de acceso a API se mantiene igual.
- `src/types/*` — Sin cambios.
- `src/hooks/useRegistros.ts` y `src/hooks/useLogin.ts` — Lógica de negocio compleja, se mantiene en React.
- `src/components/registros/*` — Se mantienen en React.
- `astro.config.mjs` — Solo añadir `output: 'server'` si se implementa el middleware de auth.