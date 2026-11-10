import type { Section } from '../types'

/**
 * Additional building-block chapters for the CSS track. They are merged after
 * each lesson's authored concepts, before the full example and callout, so the
 * chapter list gains deeper explanations without changing the existing
 * practice and code-challenge insertion points.
 */
export const cssExtraConcepts: Record<string, Section[]> = {
  'css-basics': [
    {
      type: 'concept',
      title: 'Comments explain the why',
      content:
        'A CSS comment starts with `/*` and ends with `*/`. Use comments to explain intent or to temporarily disable a rule. The browser ignores them completely.',
      language: 'css',
      caption: 'styles.css',
      code: `/* Base text color for the page */
body {
  color: #1f2937;
}

/* Temporarily disabled while testing
.card {
  border: 1px solid #cbd5e1;
}
*/`,
    },
    {
      type: 'concept',
      title: 'Group selectors that share styles',
      content:
        'A comma groups selectors into one rule. Every selector in the list receives the same declarations, which keeps repeated styles in one place.',
      language: 'css',
      caption: 'styles.css',
      code: `h1,
h2,
h3 {
  margin: 0;
  line-height: 1.2;
}`,
    },
    {
      type: 'concept',
      title: 'Read a stylesheet from top to bottom',
      content:
        'The browser parses rules in order, then applies the cascade. Group related rules together and keep the most general styles near the top so later rules can refine them.',
      language: 'css',
      caption: 'styles.css',
      code: `/* 1. Base */
body {
  font-family: system-ui, sans-serif;
}

/* 2. Layout */
.container {
  max-width: 60rem;
  margin-inline: auto;
}

/* 3. Components */
.card {
  padding: 1rem;
}`,
    },
  ],

  selectors: [
    {
      type: 'concept',
      title: 'Attribute selectors',
      content:
        'Attribute selectors match elements by an attribute or value. They are useful for inputs and links without adding extra classes.',
      language: 'css',
      caption: 'styles.css',
      code: `input[type="email"] {
  border-color: #2563eb;
}

a[target="_blank"] {
  text-decoration: underline;
}`,
    },
    {
      type: 'concept',
      title: 'Sibling combinators',
      content:
        'The adjacent sibling combinator `+` matches the element immediately after another. The general sibling combinator `~` matches any later sibling with the same parent.',
      language: 'css',
      caption: 'styles.css',
      code: `h2 + p {
  margin-top: 0.25rem;
}

h2 ~ p {
  color: #475569;
}`,
    },
  ],

  'colors-and-typography': [
    {
      type: 'concept',
      title: 'Color formats',
      content:
        'Hex, `rgb()`, and `hsl()` all describe colors. Hex is compact, `rgb()` makes transparency easy, and `hsl()` makes lightness and saturation easier to reason about.',
      language: 'css',
      caption: 'styles.css',
      code: `:root {
  --ink: #1f2937;
  --brand: rgb(37 99 235);
  --accent: hsl(174 72% 30%);
}`,
    },
    {
      type: 'concept',
      title: 'Weight, style, and decoration',
      content:
        '`font-weight` sets boldness, `font-style` adds italics, and `text-decoration` adds underlines or line-through. Use decoration to support meaning, not to replace it.',
      language: 'css',
      caption: 'styles.css',
      code: `strong {
  font-weight: 700;
}

em {
  font-style: italic;
}

a {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}`,
    },
  ],

  'box-model': [
    {
      type: 'concept',
      title: 'Shorthand values',
      content:
        '`margin` and `padding` accept one to four values. One value sets all sides; two set vertical then horizontal; four set top, right, bottom, and left.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  padding: 1rem 1.5rem;
  margin: 0 0 1rem;
}`,
    },
    {
      type: 'concept',
      title: 'Block, inline, and inline-block',
      content:
        '`display` changes how a box participates in layout. Block elements start on a new line, inline elements sit in text, and inline-block elements sit in text but accept width and height.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  display: block;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
}`,
    },
  ],

  flexbox: [
    {
      type: 'concept',
      title: 'The flex shorthand',
      content:
        '`flex` combines grow, shrink, and basis. `flex: 1` lets an item grow and shrink from a zero basis, while `flex: 0 0 auto` keeps its natural size.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  flex: 1 1 14rem;
}

.fixed {
  flex: 0 0 auto;
}`,
    },
    {
      type: 'concept',
      title: 'Align one item differently',
      content:
        '`align-self` overrides `align-items` for a single flex item. `order` changes visual order without changing the HTML, but keep the document order meaningful for keyboard users.',
      language: 'css',
      caption: 'styles.css',
      code: `.toolbar {
  display: flex;
  align-items: center;
}

.toolbar .end {
  align-self: flex-end;
}`,
    },
  ],

  'responsive-design': [
    {
      type: 'concept',
      title: 'Fluid media',
      content:
        'Images and videos should not overflow their containers. `max-width: 100%` and `height: auto` keep them fluid, and `aspect-ratio` reserves space before they load.',
      language: 'css',
      caption: 'styles.css',
      code: `img,
video {
  max-width: 100%;
  height: auto;
}

.thumb {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`,
    },
    {
      type: 'concept',
      title: 'Container queries',
      content:
        'A container query styles a component based on its container width, not the viewport. Mark the parent with `container-type: inline-size`, then query it.',
      language: 'css',
      caption: 'styles.css',
      code: `.card-list {
  container-type: inline-size;
}

@container (min-width: 30rem) {
  .card {
    display: grid;
    grid-template-columns: 8rem 1fr;
  }
}`,
    },
  ],

  'units-and-values': [
    {
      type: 'concept',
      title: 'Do calculations with calc()',
      content:
        '`calc()` mixes units and performs arithmetic. It is useful for subtracting a fixed gap from a percentage or combining custom properties.',
      language: 'css',
      caption: 'styles.css',
      code: `.wrapper {
  width: calc(100% - 2rem);
  padding: calc(1rem + 1vw);
}`,
    },
    {
      type: 'concept',
      title: 'Numbers, lengths, and keywords',
      content:
        'Not every value needs a unit. Line-height, opacity, and flex values are unitless; lengths need a unit; keywords such as `auto` and `none` carry meaning.',
      language: 'css',
      caption: 'styles.css',
      code: `p {
  line-height: 1.6;
}

.overlay {
  opacity: 0.75;
}

.panel {
  width: auto;
  border: none;
}`,
    },
  ],

  'cascade-and-inheritance': [
    {
      type: 'concept',
      title: 'Cascade layers',
      content:
        '`@layer` groups rules into named layers. Later layers win over earlier layers regardless of selector specificity, which makes large stylesheets easier to order.',
      language: 'css',
      caption: 'styles.css',
      code: `@layer base, components, utilities;

@layer base {
  a {
    color: #2563eb;
  }
}

@layer utilities {
  .text-muted {
    color: #64748b;
  }
}`,
    },
    {
      type: 'concept',
      title: 'Debug the cascade',
      content:
        'When a style does not apply, inspect the computed value in the browser. Crossed-out declarations show what lost, and the computed panel shows the value that actually won.',
      language: 'css',
      caption: 'styles.css',
      code: `/* Ask: is the property inherited, overridden, or invalid? */
.card {
  color: #1f2937;
}

.card.is-muted {
  color: #64748b;
}`,
    },
  ],

  'pseudo-classes-and-elements': [
    {
      type: 'concept',
      title: 'Form and validation states',
      content:
        '`:checked`, `:required`, `:invalid`, and `:disabled` let you style form state. Pair `:invalid` with `:user-invalid` so untouched fields do not look wrong.',
      language: 'css',
      caption: 'styles.css',
      code: `input:required {
  border-color: #cbd5e1;
}

input:user-invalid {
  border-color: #dc2626;
}

input:disabled {
  opacity: 0.6;
}`,
    },
    {
      type: 'concept',
      title: 'Generated content patterns',
      content:
        'Pseudo-elements can add quotes, icons, or decorative marks. Keep meaningful text in the HTML; use generated content for decoration only.',
      language: 'css',
      caption: 'styles.css',
      code: `blockquote::before {
  content: "“";
  font-size: 2rem;
  color: #94a3b8;
}

.external::after {
  content: " ↗";
}`,
    },
  ],

  'borders-backgrounds-shadows': [
    {
      type: 'concept',
      title: 'Background clipping and origin',
      content:
        '`background-clip` controls how far the background paints, and `background-origin` sets where it starts. Text clipping can fill text with a gradient.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  background-image: linear-gradient(135deg, #0ea5e9, #4f46e5);
  background-clip: padding-box;
}

.gradient-text {
  background-image: linear-gradient(90deg, #0ea5e9, #4f46e5);
  background-clip: text;
  color: transparent;
}`,
    },
    {
      type: 'concept',
      title: 'Layered and inset shadows',
      content:
        'Separate multiple shadows with commas. `inset` draws the shadow inside the box, which is useful for pressed or well-like surfaces.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  box-shadow:
    0 1px 2px rgb(15 23 42 / 0.08),
    0 12px 30px -18px rgb(15 23 42 / 0.45);
}

.well {
  box-shadow: inset 0 2px 6px rgb(15 23 42 / 0.18);
}`,
    },
  ],

  'gradients-and-images': [
    {
      type: 'concept',
      title: 'Color stops and hard stops',
      content:
        'A color stop places a color at a position along the gradient. Repeating the same position creates a hard edge instead of a smooth blend.',
      language: 'css',
      caption: 'styles.css',
      code: `.stripe {
  background-image: linear-gradient(
    90deg,
    #0f172a 0 50%,
    #1e293b 50% 100%
  );
}`,
    },
    {
      type: 'concept',
      title: 'Multiple background layers',
      content:
        'Separate background layers with commas. The first layer paints on top, so a gradient can sit over a photo without an extra element.',
      language: 'css',
      caption: 'styles.css',
      code: `.hero {
  background-image:
    linear-gradient(to top, rgb(15 23 42 / 0.85), transparent 70%),
    url("/images/mountains.jpg");
  background-size: cover;
  background-position: center;
}`,
    },
  ],

  positioning: [
    {
      type: 'concept',
      title: 'Center with inset and margin',
      content:
        'An absolutely positioned box can be centered by setting all insets to zero and using `margin: auto`, as long as it has a width and height.',
      language: 'css',
      caption: 'styles.css',
      code: `.dialog {
  position: absolute;
  inset: 0;
  width: 20rem;
  height: 12rem;
  margin: auto;
}`,
    },
    {
      type: 'concept',
      title: 'Overflow and scroll containers',
      content:
        '`overflow` controls what happens when content is larger than its box. `auto` adds scrolling only when needed, while `hidden` clips the overflow.',
      language: 'css',
      caption: 'styles.css',
      code: `.panel {
  max-height: 20rem;
  overflow: auto;
}

.crop {
  overflow: hidden;
  border-radius: 1rem;
}`,
    },
  ],

  'stacking-and-z-index': [
    {
      type: 'concept',
      title: 'Paint order without z-index',
      content:
        'Positioned elements paint above non-positioned ones, and later siblings paint above earlier ones. Understanding this order often removes the need for z-index.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  position: relative;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgb(15 23 42 / 0.04);
}`,
    },
    {
      type: 'concept',
      title: 'Debug stacking contexts',
      content:
        'If a child refuses to rise above a sibling, inspect the ancestors. A transform, filter, opacity, or isolation on a parent may have created a context that traps it.',
      language: 'css',
      caption: 'styles.css',
      code: `.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}

/* Avoid: a transformed ancestor traps this modal. */
.ancestor {
  transform: translateZ(0);
}`,
    },
  ],

  'transitions-and-transforms': [
    {
      type: 'concept',
      title: 'Delay and multiple properties',
      content:
        'List several properties in one transition, or add a delay to stagger a change. Keep delays short so the interface still feels responsive.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  transition:
    transform 200ms ease,
    box-shadow 200ms ease 40ms;
}`,
    },
    {
      type: 'concept',
      title: '3D transforms and perspective',
      content:
        '`perspective` gives depth to 3D transforms. `rotateY` and `translateZ` can create a card-flip or tilt effect, but keep the motion subtle.',
      language: 'css',
      caption: 'styles.css',
      code: `.scene {
  perspective: 800px;
}

.card:hover {
  transform: rotateY(8deg) translateZ(12px);
}`,
    },
  ],

  'keyframe-animations': [
    {
      type: 'concept',
      title: 'Multiple animations and delays',
      content:
        'Separate multiple animations with commas. Each can have its own duration, delay, and iteration count.',
      language: 'css',
      caption: 'styles.css',
      code: `.dot {
  animation:
    pulse 1.2s ease-in-out infinite alternate,
    fade-in 400ms ease-out both;
}`,
    },
    {
      type: 'concept',
      title: 'Accessible motion patterns',
      content:
        'Keep essential motion short and provide a reduced-motion fallback. Avoid flashing, and never rely on animation alone to communicate state.',
      language: 'css',
      caption: 'styles.css',
      code: `@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
  }
}`,
    },
  ],

  'grid-basics': [
    {
      type: 'concept',
      title: 'Implicit rows and auto-placement',
      content:
        'Grid creates implicit rows when items overflow the explicit tracks. `grid-auto-rows` controls their size, and `grid-auto-flow` controls placement.',
      language: 'css',
      caption: 'styles.css',
      code: `.cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(8rem, auto);
  grid-auto-flow: row dense;
}`,
    },
    {
      type: 'concept',
      title: 'Alignment inside the grid',
      content:
        '`justify-items` and `align-items` align items inside their cells. `justify-content` and `align-content` align the whole grid when it is smaller than its container.',
      language: 'css',
      caption: 'styles.css',
      code: `.layout {
  display: grid;
  place-items: center;
  place-content: center;
}`,
    },
  ],

  'grid-areas': [
    {
      type: 'concept',
      title: 'Overlapping areas and empty cells',
      content:
        'Areas can overlap if you assign two items to the same name. Empty cells use a dot, and `grid-template-areas` must describe a rectangle for each name.',
      language: 'css',
      caption: 'styles.css',
      code: `.layout {
  grid-template-areas:
    "header header"
    ". main"
    "footer footer";
}`,
    },
    {
      type: 'concept',
      title: 'Named lines and minmax',
      content:
        'Name grid lines with square brackets to make placement readable. Combine named lines with `minmax()` for layouts that stay flexible.',
      language: 'css',
      caption: 'styles.css',
      code: `.layout {
  display: grid;
  grid-template-columns:
    [sidebar-start] 14rem
    [sidebar-end main-start] minmax(0, 1fr)
    [main-end];
}`,
    },
  ],

  'forms-and-inputs': [
    {
      type: 'concept',
      title: 'Select, textarea, and checkboxes',
      content:
        'Text inputs are not the only controls. Style selects, textareas, and checkboxes consistently, and keep their native semantics.',
      language: 'css',
      caption: 'styles.css',
      code: `select,
textarea,
input {
  font: inherit;
  padding: 0.6rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
}`,
    },
    {
      type: 'concept',
      title: 'Helper text and validation',
      content:
        'Place helper text next to the label or below the control. Use color and text together so an error is not communicated by red alone.',
      language: 'css',
      caption: 'styles.css',
      code: `.help {
  color: #64748b;
  font-size: 0.8125rem;
}

.error {
  color: #b91c1c;
  font-size: 0.8125rem;
}`,
    },
  ],

  'buttons-and-states': [
    {
      type: 'concept',
      title: 'Variants and sizing',
      content:
        'Build variants from a shared base class, then override only the properties that change. Size buttons with padding and a minimum height so labels stay comfortable.',
      language: 'css',
      caption: 'styles.css',
      code: `.button {
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
}

.button--secondary {
  background-color: #e2e8f0;
  color: #0f172a;
}`,
    },
    {
      type: 'concept',
      title: 'Loading and icon states',
      content:
        'A loading button should keep its width and show progress without losing its label. Disable it while the action runs, and keep the state announced to assistive technology.',
      language: 'css',
      caption: 'styles.css',
      code: `.button[aria-busy="true"] {
  cursor: progress;
  opacity: 0.75;
}

.button[aria-busy="true"]::after {
  content: " …";
}`,
    },
  ],

  'navigation-bars': [
    {
      type: 'concept',
      title: 'Dropdown menus with CSS',
      content:
        'A simple dropdown can be shown on hover or focus-within. Keep the trigger a real button or link and make sure keyboard users can reach the menu.',
      language: 'css',
      caption: 'styles.css',
      code: `.menu {
  position: relative;
}

.menu-panel {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
}

.menu:hover .menu-panel,
.menu:focus-within .menu-panel {
  display: block;
}`,
    },
    {
      type: 'concept',
      title: 'Mobile navigation patterns',
      content:
        'On small screens, choose between wrapping links, a horizontal scroll row, or a disclosure menu. Avoid hiding navigation behind hover-only interactions.',
      language: 'css',
      caption: 'styles.css',
      code: `@media (max-width: 32rem) {
  .nav ul {
    display: flex;
    overflow-x: auto;
    gap: 0.75rem;
  }
}`,
    },
  ],

  'custom-properties': [
    {
      type: 'concept',
      title: 'Fallbacks and invalid values',
      content:
        '`var()` accepts a fallback, and a custom property can be invalid at computed-value time. A fallback keeps the component usable when a token is missing.',
      language: 'css',
      caption: 'styles.css',
      code: `.card {
  color: var(--text, #1f2937);
  background-color: var(--surface, white);
}`,
    },
    {
      type: 'concept',
      title: 'Dynamic tokens with calc() and color-mix()',
      content:
        'Custom properties can feed calculations and color mixing. This lets one token drive spacing, type, and color variants without repeating values.',
      language: 'css',
      caption: 'styles.css',
      code: `:root {
  --space: 1rem;
  --brand: #2563eb;
}

.card {
  padding: calc(var(--space) * 1.5);
  background-color: color-mix(in srgb, var(--brand) 12%, white);
}`,
    },
  ],

  'accessibility-and-focus': [
    {
      type: 'concept',
      title: 'Semantic color and contrast tools',
      content:
        'Use color together with text, icons, or patterns. Check contrast for normal text, large text, and focus rings, and test both light and dark themes.',
      language: 'css',
      caption: 'styles.css',
      code: `:root {
  --text: #1f2937;
  --surface: #ffffff;
  --focus: #2563eb;
}

.button:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}`,
    },
    {
      type: 'concept',
      title: 'Focus order and skip links',
      content:
        'Keep DOM order matching visual order, and provide a skip link for long navigation. A skip link can be visually hidden until it receives focus.',
      language: 'css',
      caption: 'styles.css',
      code: `.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  padding: 0.5rem 0.75rem;
  background-color: white;
}`,
    },
  ],
}
