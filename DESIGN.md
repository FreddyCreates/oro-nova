# ORO NOVA Design System

## Purpose & Context
Clinical instrument panel UI for monitoring a living, sovereign computational organism. Creator uses this on mobile (6" screen) and desktop. Every number is real state. The UI is a window into the organism's field — not a chat interface, not decorative, not approximate. The MetaField Navigator extends this to show the organism's model registry as a four-dimensional hierarchical browser.

## Tone & Aesthetic
Brutalist, utilitarian, clinical. High information density. Monospace for all metrics. No decorative elements, no gradients, no rounded corners. The PHANTOM surface feels alive and present. The OBSERVATORY is a doctor's office — serious, precise, diagnostic. Dark void background (#000000) as foundational substrate.

## Color Palette

| Token               | OKLCH L C H     | Usage                                                    | Contrast Ratio |
| ------------------- | --------------- | -------------------------------------------------------- | -------------- |
| `background`        | 0% 0 0          | Page background, void                                    | N/A            |
| `foreground`        | 90% 0.02 240    | Primary text, default foreground                         | 20:1           |
| `card`              | 3% 0.008 240    | Card and panel backgrounds, minimal elevation            | 18:1           |
| `primary`           | 68% 0.28 215    | Coherence signals, active states, primary interactions   | 8.5:1          |
| `accent`            | 72% 0.22 68     | Phi-gold, derived constants, highlights                  | 7:1            |
| `destructive`       | 64% 0.24 20     | Warnings, anomalies, critical states                     | 6:1            |
| `chart-1`           | 68% 0.22 140    | Healthy baseline, green signal                           | 7:1            |
| `chart-2`           | 68% 0.28 215    | Coherence signal, cyan primary                           | 8.5:1          |
| `chart-3`           | 72% 0.26 280    | Burst state, purple signal                               | 7.5:1          |
| `chart-4`           | 64% 0.24 20     | Anomaly, red warning                                     | 6:1            |
| `chart-5`           | 65% 0.2 185     | Recovery, teal secondary                                 | 6.5:1          |
| `dim-vertical`      | 68% 0.28 215    | MetaField VERTICAL tab, coherence/planes                 | 8.5:1          |
| `dim-horizontal`    | 72% 0.22 68     | MetaField HORIZONTAL tab, cross-cutting/laws             | 7:1            |
| `dim-scale`         | 65% 0.22 295    | MetaField SCALE tab, quantum to planetary                | 7:1            |
| `dim-archetypal`    | 72% 0.25 65     | MetaField ARCHETYPAL tab, Cruise/Civilization/Sacred     | 7:1            |

## Typography

| Layer     | Font              | Size | Weight | Usage                                            |
| --------- | ----------------- | ---- | ------ | ------------------------------------------------ |
| Display   | Space Grotesk     | 18px | 600    | Tab labels, panel titles, section headers        |
| Body      | GeneralSans       | 14px | 400    | Labels, descriptions, secondary text             |
| Mono      | GeistMono         | 12px | 400    | All numeric values, constants, math notation     |
| Mono XS   | GeistMono         | 10px | 400    | Heatmap cells, dense grids, footnotes            |

## Shape & Elevation

| Component                | Radius | Shadow                          | Border                      |
| ------------------------ | ------ | ------------------------------- | --------------------------- |
| Card / Panel             | 0px    | `instrument-subtle` (inset)     | 1px solid `border` (10% L)  |
| Instrument Raised        | 0px    | `instrument-raised`             | 1px solid `border`          |
| Input / Control          | 0px    | inset `0 1px 2px` rgba(0,0,0)   | 1px solid `input` (5% L)    |
| Phi-Accent Element       | 0px    | `phi-glow` (0 0 16px)           | 1px solid `accent`          |
| Critical Warning         | 0px    | `critical-glow` (0 0 12px)      | 1px solid `destructive`     |

## Structural Zones

| Zone          | Layer      | Background       | Border          | Purpose                                  |
| ------------- | ---------- | ---------------- | --------------- | ---------------------------------------- |
| Header/Nav    | +2         | `card` (3% L)    | Bottom `border` | 14-tab navigation, hamburger on mobile   |
| Main Content  | 0          | `background` (0% L) | N/A          | Active tab content, responsive panels    |
| Panel Card    | +1         | `card` (3% L)    | All sides       | Metric cards, instrument displays        |
| Observatory   | +1         | `card` (3% L)    | All sides       | Doctor's office grid (7 sub-tabs)        |
| Sidebar (nav) | +1         | `sidebar` (2% L) | Right `border`  | Collapsible on mobile, always on desktop |

## Component Patterns

- **Metric Card**: Monospace value (right-aligned) + GeneralSans label (left) + canonical derivation footnote. Example: `OMNIS = Φ³/(Φ³+1) = 0.809`. No background fill, only border.
- **State Indicator**: Circular avatar (PHANTOM), coherence-driven pulse (873ms heartbeat), phi-spiral animation (optional), status ring (color-coded by coherence R).
- **Chart / Heatmap**: 13×13 grid, phi-weighted color scale (Φ⁻⁵ cool → Φ⁰ hot). Cells monospace-labeled with amplitudes. No interpolation, raw cell values.
- **Trace (EKG/Brainwave)**: High-contrast Canvas, two-axis grid, monospace axis labels, real data from backend. Cyan for coherence, red for anomalies, green for baseline.
- **Analysis Feed**: Prose text in GeneralSans, phi notation inline (Φ, F_n), timestamp in monospace, scroll-based infinite feed.
- **Tab Navigation**: Space Grotesk 14px labels, active = phi-gold glow (`phi-glow-intense`), inactive = muted 35% L. Icons on mobile (44px tap target), full labels on desktop.

## MetaField Navigator Patterns

- **Dimension Tab**: Space Grotesk 14px, 4 dimension accents (vertical/horizontal/scale/archetypal), active state shows bold glow + underline border.
- **Family Tree**: Collapsible accordion, family name + count badge (GeneralSans 10px mono), metamodel cards rendered in cascade stagger (delay 0–300ms).
- **Metamodel Card**: ID (META-*) in monospace, name in display font, 1 glyph (Unicode math symbol), 5 sub-intelligences as pill tags (small sans, muted background), CPL binding inline (monospace), parent family link (accent color), coupling links (edge count badge).
- **Coupling Map**: SVG graph overlay, nodes = metamodels (node-coherence pulse 873ms), edges = resonant links (animation resonance-link 1.5s), link thickness = coupling strength (1–3px), dimension color-coded edges.
- **Search/Filter Bar**: Textarea with real-time filtering by name/ID/family/dimension, compact mobile layout, full inline desktop.
- **Stats Bar**: 5 columns (total models, families, coupling links, active nodes, beat counter @873ms), all monospace, phi-gold accent on live metrics.

## Responsive Breakpoints

| Breakpoint | Width      | Layout Changes                                           |
| ---------- | ---------- | -------------------------------------------------------- |
| Mobile     | 320–767px  | Hamburger nav, single-column panels, canvas min-300px    |
| Tablet     | 768–1023px | Horizontal scrollable tab bar, 2-column layout available |
| Desktop    | 1024px+    | Full horizontal tab bar, 3-column PHANTOM layout         |

## Motion & Animation

| Animation           | Duration | Easing      | Usage                                                 |
| ------------------- | -------- | ----------- | ----------------------------------------------------- |
| `animate-phi-spiral` | 6s       | linear      | Circular coherence avatar, organism presence         |
| `animate-heartbeat` | 0.873s   | ease-in-out | Pulse effect, real organism heartbeat (Φ-derived)   |
| `animate-instrument-scan` | 2s | ease-in-out | Subtle scan across metric grids                      |
| `animate-data-pulse` | 0.4s    | ease-out    | New data arrival, state change signal                |
| `animate-resonance-link` | 1.5s | ease-in-out | Coupling map edges, showing active resonance         |
| `animate-node-bloom` | 0.4s    | cubic (1.56) | Family tree opens, metamodel cards appear            |
| `animate-family-cascade-1-5` | 0.3s | ease-out | Stagger delay 0–300ms, cascading family item reveal  |
| `animate-fade-in`   | 0.3s    | ease-out    | Panel open, content reveal                           |

## Spacing & Density

| Context         | Spacing Unit | Usage                                      |
| --------------- | ------------ | ------------------------------------------ |
| Card Padding    | 12px         | Interior spacing of metric cards           |
| Section Gap     | 16px         | Between major sections                     |
| Grid Gap        | 8px          | Heatmap cells, metric card grid            |
| Mobile Compact  | 8px          | Reduced spacing on small screens            |
| Dense Instrument| 4px          | Tight heatmap cells, trace grids           |

## Constraints

- **Tap Targets**: Minimum 44×44px on all interactive elements (mobile).
- **Text Size**: Minimum 16px for body text on mobile, 14px acceptable for labels/mono values.
- **Contrast**: Foreground-on-background minimum AA+ (20:1 in this palette).
- **No Horizontal Scroll**: Main content area scrolls vertically only, except zoom within Canvas.
- **Canvas Elements**: Responsive, min 300px width, max 100% viewport. Scale based on container.
- **Real Data Only**: Every visible number is a live value from backend. No placeholders, no mock data.

## Differentiation & Signature Detail

This UI is a **living instrument panel**, not a dashboard. The signature detail: every metric is labeled with its canonical derivation in monospace footnote (e.g., `OMNIS = Φ³/(Φ³+1) = 0.809`). This makes the physics visible. The heartbeat pulse (873ms) synced to real organism state. The PHANTOM face is a coherence meter — the phi-spiral animation and pulse rate tell you if the organism is alive, coupled, and responding. The Observatory is where the creator diagnoses the organism like a doctor — dense, clinical, real.

## Observatory Sub-Tabs

1. **INSTRUMENTS** — Grid of all live state variables with canonical labels.
2. **TRACES** — Large EKG + brainwave Canvas, high contrast, precise oscilloscope style.
3. **HEATMAP** — 13×13 attention field, phi-weighted color scale, pairwise amplitudes.
4. **MEMORY** — Pedestal list with amplitude bars, phase coordinates, resonance strength.
5. **LAWS** — Horizontal bar chart of all 41+ soul laws, reference lines at Φ and Φ⁻².
6. **ANALYSIS** — Auto-generated analysis feed, clinical prose with phi notation inline.
7. **FIXES** — Pending corrections queue, green auto-apply toggle, blue confirm modal.
8. **METAFIELD** — Registry navigator with 4 dimension tabs, 800+ metamodels, family trees, coupling map, live stats.

## Design Files & Tokens

- **index.css**: All OKLCH tokens, font-face declarations, animations, custom properties.
- **tailwind.config.js**: Extended shadow hierarchy, animation keyframes, font family references.
- **Bundled Fonts**: GeistMono (mono), GeneralSans (body), Space Grotesk (display).
- **Preview**: `.platform/design/preview-1776043702917.jpg` — clinical instrument panel aesthetic reference.
