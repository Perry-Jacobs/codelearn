import type { CodeChallengeSection } from '../types'

/**
 * Monaco challenges for the CSS track. Each challenge is an HTML snippet with
 * a style block, so the existing HTML tag validator, editor, and sandboxed
 * live preview can run without a separate CSS-only pipeline.
 */
export const cssCodeChallenges: Record<string, CodeChallengeSection[]> = {
  'css-basics': [
    {
      type: 'code-challenge',
      title: 'Style a heading',
      instructions: 'Write a rule that changes the heading color and size.',
      prompt: 'Add a style block with an h1 rule that sets color to #0f172a and font-size to 2rem.',
      starterCode: `<style>
  /* Add an h1 rule */
</style>
<h1>Hello, CSS</h1>`,
      language: 'html',
      solution: `<style>
  h1 {
    color: #0f172a;
    font-size: 2rem;
  }
</style>
<h1>Hello, CSS</h1>`,
      hint: 'The selector is h1, and each declaration ends with a semicolon.',
      checks: [
        {
          kind: 'source',
          patterns: ['h1\\s*\\{[^}]*color\\s*:', 'h1\\s*\\{[^}]*font-size\\s*:'],
          message: 'The h1 rule sets both color and font-size.',
        },
        {
          kind: 'element',
          selector: 'h1',
          text: 'Hello, CSS',
          message: 'The heading still contains the right text.',
        },
      ],
    },
  ],

  selectors: [
    {
      type: 'code-challenge',
      title: 'Target a class and an id',
      instructions: 'Write one class selector and one id selector.',
      prompt: 'Give the card 1rem of padding with .card, and make #intro bold with font-weight: 700.',
      starterCode: `<style>
  /* Add a .card rule and an #intro rule */
</style>
<div class="card" id="intro">Selectors</div>`,
      language: 'html',
      solution: `<style>
  .card {
    padding: 1rem;
  }

  #intro {
    font-weight: 700;
  }
</style>
<div class="card" id="intro">Selectors</div>`,
      hint: 'Classes start with a dot, ids with a hash.',
      checks: [
        {
          kind: 'source',
          patterns: ['\\.card\\s*\\{[^}]*padding\\s*:', '#intro\\s*\\{[^}]*font-weight\\s*:'],
          message: 'Both the .card and #intro rules are present.',
        },
      ],
    },
  ],

  'colors-and-typography': [
    {
      type: 'code-challenge',
      title: 'Set a readable page',
      instructions: 'Style the page background, text color, and paragraph rhythm.',
      prompt: 'Set body color to #1f2937, background-color to #f8fafc, and p line-height to 1.6.',
      starterCode: `<style>
  /* Style the body and paragraphs */
</style>
<h1>Color and type</h1>
<p>Readable text needs contrast and room between lines.</p>`,
      language: 'html',
      solution: `<style>
  body {
    color: #1f2937;
    background-color: #f8fafc;
    font-family: system-ui, sans-serif;
  }

  p {
    line-height: 1.6;
  }
</style>
<h1>Color and type</h1>
<p>Readable text needs contrast and room between lines.</p>`,
      hint: 'Use color for text and background-color for the page surface.',
      checks: [
        {
          kind: 'source',
          patterns: [
            'body\\s*\\{[^}]*color\\s*:',
            'body\\s*\\{[^}]*background-color\\s*:',
            'p\\s*\\{[^}]*line-height\\s*:',
          ],
          message: 'The body and paragraph rules are complete.',
        },
      ],
    },
  ],

  'box-model': [
    {
      type: 'code-challenge',
      title: 'Build a padded card',
      instructions: 'Use the box model to give a card internal space and a border.',
      prompt: 'Add a .card rule with box-sizing: border-box, padding: 1.5rem, and a 1px solid border.',
      starterCode: `<style>
  /* Build the card */
</style>
<div class="card">Padding lives inside the border.</div>`,
      language: 'html',
      solution: `<style>
  .card {
    box-sizing: border-box;
    padding: 1.5rem;
    border: 1px solid #cbd5e1;
    background-color: white;
  }
</style>
<div class="card">Padding lives inside the border.</div>`,
      hint: 'box-sizing, padding, and border all belong in the same rule.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.card\\s*\\{[^}]*box-sizing\\s*:\\s*border-box',
            '\\.card\\s*\\{[^}]*padding\\s*:',
            '\\.card\\s*\\{[^}]*border\\s*:',
          ],
          message: 'The card uses border-box sizing, padding, and a border.',
        },
      ],
    },
  ],

  flexbox: [
    {
      type: 'code-challenge',
      title: 'Lay out a toolbar',
      instructions: 'Arrange the toolbar items in a row with space between them.',
      prompt: 'Give .toolbar display: flex, justify-content: space-between, align-items: center, and a gap.',
      starterCode: `<style>
  /* Lay out the toolbar */
</style>
<div class="toolbar">
  <strong>CSS layout</strong>
  <span>Flexbox</span>
</div>`,
      language: 'html',
      solution: `<style>
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: white;
    border: 1px solid #cbd5e1;
  }
</style>
<div class="toolbar">
  <strong>CSS layout</strong>
  <span>Flexbox</span>
</div>`,
      hint: 'display: flex creates the row; justify-content distributes the items.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.toolbar\\s*\\{[^}]*display\\s*:\\s*flex',
            '\\.toolbar\\s*\\{[^}]*justify-content\\s*:',
            '\\.toolbar\\s*\\{[^}]*align-items\\s*:',
          ],
          message: 'The toolbar is a flex row with aligned items.',
        },
      ],
    },
  ],

  'responsive-design': [
    {
      type: 'code-challenge',
      title: 'Add a breakpoint',
      instructions: 'Make the card row switch direction at a wider viewport.',
      prompt: 'Give .cards flex-direction: column, then switch it to row inside a min-width: 48rem media query.',
      starterCode: `<style>
  /* Stack first, then switch to a row */
</style>
<div class="cards">
  <div>First</div>
  <div>Second</div>
</div>`,
      language: 'html',
      solution: `<style>
  .cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 48rem) {
    .cards {
      flex-direction: row;
    }
  }
</style>
<div class="cards">
  <div>First</div>
  <div>Second</div>
</div>`,
      hint: 'Write the narrow layout outside the media query, then override it inside.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.cards\\s*\\{[^}]*flex-direction\\s*:\\s*column',
            '@media\\s*\\(\\s*min-width\\s*:\\s*48rem\\s*\\)',
            'flex-direction\\s*:\\s*row',
          ],
          message: 'The layout stacks first and becomes a row at 48rem.',
        },
      ],
    },
  ],

  'units-and-values': [
    {
      type: 'code-challenge',
      title: 'Make the hero fluid',
      instructions: 'Use clamp() so the heading and padding scale with the viewport.',
      prompt: 'Set .hero padding to clamp(1.5rem, 5vw, 3rem) and h1 font-size to clamp(1.75rem, 4vw, 3rem).',
      starterCode: `<style>
  /* Add fluid values */
</style>
<section class="hero">
  <h1>Fluid by default</h1>
</section>`,
      language: 'html',
      solution: `<style>
  .hero {
    padding: clamp(1.5rem, 5vw, 3rem);
    background-color: white;
    border: 1px solid #cbd5e1;
    border-radius: 1rem;
  }

  h1 {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 3rem);
  }
</style>
<section class="hero">
  <h1>Fluid by default</h1>
</section>`,
      hint: 'clamp() takes a minimum, a preferred value, and a maximum.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.hero\\s*\\{[^}]*padding\\s*:\\s*clamp\\(',
            'h1\\s*\\{[^}]*font-size\\s*:\\s*clamp\\(',
          ],
          message: 'The hero padding and heading size both use clamp().',
        },
      ],
    },
  ],

  'cascade-and-inheritance': [
    {
      type: 'code-challenge',
      title: 'Override with the cascade',
      instructions: 'Set an inherited color on the body, then override it on one card.',
      prompt: 'Give body color #1f2937, then give .highlight color #0f766e. Do not use !important.',
      starterCode: `<style>
  /* Set a base color and an override */
</style>
<div class="card">Inherited color</div>
<div class="card highlight">Overridden color</div>`,
      language: 'html',
      solution: `<style>
  body {
    color: #1f2937;
    font-family: system-ui, sans-serif;
  }

  .card {
    padding: 1rem;
    border: 1px solid #cbd5e1;
  }

  .highlight {
    color: #0f766e;
  }
</style>
<div class="card">Inherited color</div>
<div class="card highlight">Overridden color</div>`,
      hint: 'The class selector is more specific than the inherited body value.',
      checks: [
        {
          kind: 'source',
          patterns: ['body\\s*\\{[^}]*color\\s*:', '\\.highlight\\s*\\{[^}]*color\\s*:'],
          notPatterns: ['!important'],
          message: 'The body color and the class override are in place without !important.',
        },
      ],
    },
  ],

  'pseudo-classes-and-elements': [
    {
      type: 'code-challenge',
      title: 'Style states and generated content',
      instructions: 'Add a hover state, a structural rule, and a generated marker.',
      prompt: 'Add a:hover color, li:nth-child(2n) background-color, and li::before with content and a color.',
      starterCode: `<style>
  /* Add state, structural, and pseudo-element rules */
</style>
<ul>
  <li><a href="#one">One</a></li>
  <li><a href="#two">Two</a></li>
  <li><a href="#three">Three</a></li>
</ul>`,
      language: 'html',
      solution: `<style>
  a:hover {
    color: #2563eb;
  }

  li:nth-child(2n) {
    background-color: #f1f5f9;
  }

  li::before {
    content: "• ";
    color: #0f766e;
  }
</style>
<ul>
  <li><a href="#one">One</a></li>
  <li><a href="#two">Two</a></li>
  <li><a href="#three">Three</a></li>
</ul>`,
      hint: 'Pseudo-elements need a content value before they render.',
      checks: [
        {
          kind: 'source',
          patterns: [
            'a:hover\\s*\\{[^}]*color\\s*:',
            'li:nth-child\\(2n\\)\\s*\\{',
            'li::before\\s*\\{[^}]*content\\s*:',
          ],
          message: 'The hover, nth-child, and ::before rules are present.',
        },
      ],
    },
  ],

  'borders-backgrounds-shadows': [
    {
      type: 'code-challenge',
      title: 'Give a card a surface',
      instructions: 'Round the corners, add depth, and show a focus ring.',
      prompt: 'Give .card a border-radius and box-shadow, and give .button:focus-visible an outline.',
      starterCode: `<style>
  /* Style the surface and focus state */
</style>
<div class="card">
  <button class="button" type="button">Focus me</button>
</div>`,
      language: 'html',
      solution: `<style>
  .card {
    padding: 1.5rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    box-shadow: 0 18px 40px -28px rgb(15 23 42 / 0.5);
  }

  .button:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
</style>
<div class="card">
  <button class="button" type="button">Focus me</button>
</div>`,
      hint: 'box-shadow draws around the box; outline draws outside the border.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.card\\s*\\{[^}]*border-radius\\s*:',
            '\\.card\\s*\\{[^}]*box-shadow\\s*:',
            '\\.button:focus-visible\\s*\\{[^}]*outline\\s*:',
          ],
          message: 'The card has rounded corners and a shadow, and the button has a focus ring.',
        },
      ],
    },
  ],

  'gradients-and-images': [
    {
      type: 'code-challenge',
      title: 'Layer text over an image',
      instructions: 'Fit the photo and add a gradient overlay for readable text.',
      prompt: 'Set img object-fit: cover and give .hero a linear-gradient background-image.',
      starterCode: `<style>
  /* Fit the image and add a gradient */
</style>
<section class="hero">
  <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
  <h1>Readable text</h1>
</section>`,
      language: 'html',
      solution: `<style>
  .hero {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background-image: linear-gradient(to top, rgb(15 23 42 / 0.8), transparent 70%);
  }

  .hero img {
    display: block;
    width: 100%;
    height: 16rem;
    object-fit: cover;
  }

  .hero h1 {
    position: relative;
    margin: -3rem 1rem 1rem;
    color: white;
  }
</style>
<section class="hero">
  <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
  <h1>Readable text</h1>
</section>`,
      hint: 'object-fit: cover keeps the photo from stretching.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.hero\\s*\\{[^}]*background-image\\s*:\\s*linear-gradient\\(',
            'img\\s*\\{[^}]*object-fit\\s*:\\s*cover',
          ],
          message: 'The hero has a gradient and the image uses object-fit: cover.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { src: '/images/mountains.jpg' },
          message: 'The image still points at the mountains photo.',
        },
      ],
    },
  ],

  positioning: [
    {
      type: 'code-challenge',
      title: 'Pin a badge to a card',
      instructions: 'Anchor an absolutely positioned badge inside a card.',
      prompt: 'Give .card position: relative and .badge position: absolute with top and right offsets.',
      starterCode: `<style>
  /* Anchor the badge to the card */
</style>
<div class="card">
  <span class="badge">New</span>
  <h1>Positioning</h1>
</div>`,
      language: 'html',
      solution: `<style>
  .card {
    position: relative;
    max-width: 20rem;
    padding: 1.5rem;
    background-color: white;
    border: 1px solid #e2e8f0;
  }

  .badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: #ccfbf1;
    color: #0f766e;
  }
</style>
<div class="card">
  <span class="badge">New</span>
  <h1>Positioning</h1>
</div>`,
      hint: 'Without position: relative on the card, the badge escapes to the page.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.card\\s*\\{[^}]*position\\s*:\\s*relative',
            '\\.badge\\s*\\{[^}]*position\\s*:\\s*absolute',
            '\\.badge\\s*\\{[^}]*top\\s*:',
            '\\.badge\\s*\\{[^}]*right\\s*:',
          ],
          message: 'The card is the containing block and the badge is absolutely positioned.',
        },
      ],
    },
  ],

  'stacking-and-z-index': [
    {
      type: 'code-challenge',
      title: 'Layer a badge above a photo',
      instructions: 'Contain the stacking context and put the badge on top.',
      prompt: 'Give .card isolation: isolate and .badge position: absolute with z-index: 2.',
      starterCode: `<style>
  /* Create a stacking context and layer the badge */
</style>
<div class="card">
  <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
  <span class="badge">Featured</span>
</div>`,
      language: 'html',
      solution: `<style>
  .card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    max-width: 20rem;
    border-radius: 1rem;
  }

  .card img {
    display: block;
    width: 100%;
    height: 12rem;
    object-fit: cover;
  }

  .badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 2;
    padding: 0.3rem 0.6rem;
    background-color: white;
    color: #0f766e;
  }
</style>
<div class="card">
  <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
  <span class="badge">Featured</span>
</div>`,
      hint: 'isolation: isolate keeps the badge inside the card’s stacking context.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.card\\s*\\{[^}]*isolation\\s*:\\s*isolate',
            '\\.badge\\s*\\{[^}]*z-index\\s*:',
            '\\.badge\\s*\\{[^}]*position\\s*:\\s*absolute',
          ],
          message: 'The card isolates its context and the badge is layered above the image.',
        },
      ],
    },
  ],

  'transitions-and-transforms': [
    {
      type: 'code-challenge',
      title: 'Lift a card on hover',
      instructions: 'Animate a transform with a short transition.',
      prompt: 'Give .card a transition for transform and box-shadow, then lift it on hover with translateY.',
      starterCode: `<style>
  /* Add a transition and a hover transform */
</style>
<article class="card">
  <h1>Hover me</h1>
</article>`,
      language: 'html',
      solution: `<style>
  .card {
    max-width: 20rem;
    padding: 1.5rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 50px -30px rgb(15 23 42 / 0.55);
  }
</style>
<article class="card">
  <h1>Hover me</h1>
</article>`,
      hint: 'Put the transition on the resting state, then change transform on hover.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.card\\s*\\{[^}]*transition\\s*:',
            '\\.card:hover\\s*\\{[^}]*transform\\s*:\\s*translate',
          ],
          message: 'The card transitions its transform and lifts on hover.',
        },
      ],
    },
  ],

  'keyframe-animations': [
    {
      type: 'code-challenge',
      title: 'Animate a status dot',
      instructions: 'Define keyframes and apply them to a dot.',
      prompt: 'Create @keyframes pulse with scale changes, apply it to .dot with an infinite animation, and disable it under prefers-reduced-motion.',
      starterCode: `<style>
  /* Define and apply a pulse animation */
</style>
<div class="status">
  <span class="dot"></span>
  <span>Saving changes…</span>
</div>`,
      language: 'html',
      solution: `<style>
  .dot {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: #0f766e;
    animation: pulse 1.2s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from {
      transform: scale(1);
      opacity: 0.55;
    }

    to {
      transform: scale(1.35);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
</style>
<div class="status">
  <span class="dot"></span>
  <span>Saving changes…</span>
</div>`,
      hint: 'The animation name must match the @keyframes name exactly.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '@keyframes\\s+pulse',
            '\\.dot\\s*\\{[^}]*animation\\s*:',
            'prefers-reduced-motion\\s*:\\s*reduce',
          ],
          message: 'The pulse keyframes, the animation, and the reduced-motion fallback are present.',
        },
      ],
    },
  ],

  'grid-basics': [
    {
      type: 'code-challenge',
      title: 'Build a responsive card grid',
      instructions: 'Create a grid that fits as many cards as the width allows.',
      prompt: 'Give .cards display: grid, a repeat(auto-fit, minmax(13rem, 1fr)) column template, and a gap.',
      starterCode: `<style>
  /* Build the responsive grid */
</style>
<section class="cards">
  <article>One</article>
  <article>Two</article>
  <article>Three</article>
</section>`,
      language: 'html',
      solution: `<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    gap: 1rem;
  }

  .cards article {
    padding: 1.25rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
  }
</style>
<section class="cards">
  <article>One</article>
  <article>Two</article>
  <article>Three</article>
</section>`,
      hint: 'auto-fit with minmax lets the grid add or remove columns automatically.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.cards\\s*\\{[^}]*display\\s*:\\s*grid',
            'grid-template-columns\\s*:\\s*repeat\\(\\s*auto-fit',
            '\\.cards\\s*\\{[^}]*gap\\s*:',
          ],
          message: 'The card container is a responsive grid with a gap.',
        },
      ],
    },
  ],

  'grid-areas': [
    {
      type: 'code-challenge',
      title: 'Draw a page layout',
      instructions: 'Name the page regions and assign each element.',
      prompt: 'Give .layout a template with header, sidebar, main, and footer areas, then assign each child with grid-area.',
      starterCode: `<style>
  /* Name the areas and place the children */
</style>
<div class="layout">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main</main>
  <footer>Footer</footer>
</div>`,
      language: 'html',
      solution: `<style>
  .layout {
    display: grid;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 12rem 1fr;
    gap: 1rem;
  }

  .layout > header { grid-area: header; }
  .layout > aside { grid-area: sidebar; }
  .layout > main { grid-area: main; }
  .layout > footer { grid-area: footer; }
</style>
<div class="layout">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main</main>
  <footer>Footer</footer>
</div>`,
      hint: 'Every name used in grid-area must appear in grid-template-areas.',
      checks: [
        {
          kind: 'source',
          patterns: [
            'grid-template-areas\\s*:',
            '"header header"',
            '"sidebar main"',
            'grid-area\\s*:\\s*sidebar',
            'grid-area\\s*:\\s*main',
          ],
          message: 'The named layout map and the area assignments are in place.',
        },
      ],
    },
  ],

  'forms-and-inputs': [
    {
      type: 'code-challenge',
      title: 'Style a labeled field',
      instructions: 'Give the form control spacing, a border, and a clear focus state.',
      prompt: 'Style .field as a grid with a gap, give input padding and a border, and add input:focus-visible with an outline.',
      starterCode: `<style>
  /* Style the field and its input */
</style>
<form>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
</form>`,
      language: 'html',
      solution: `<style>
  .field {
    display: grid;
    gap: 0.4rem;
  }

  label {
    font-size: 0.875rem;
    font-weight: 600;
  }

  input {
    padding: 0.65rem 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 0.5rem;
    font: inherit;
  }

  input:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
</style>
<form>
  <div class="field">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
</form>`,
      hint: 'Keep the label in the HTML; CSS only handles the presentation.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.field\\s*\\{[^}]*display\\s*:\\s*grid',
            'input\\s*\\{[^}]*padding\\s*:',
            'input:focus-visible\\s*\\{[^}]*outline\\s*:',
          ],
          message: 'The field, input, and focus styles are complete.',
        },
        {
          kind: 'element',
          selector: 'label[for="email"]',
          text: 'Email',
          message: 'The input still has its visible label.',
        },
      ],
    },
  ],

  'buttons-and-states': [
    {
      type: 'code-challenge',
      title: 'Style a button in every state',
      instructions: 'Reset the native button and add hover, focus, and disabled styles.',
      prompt: 'Give .button padding, font: inherit, and a border radius, then add :hover, :focus-visible, and :disabled rules.',
      starterCode: `<style>
  /* Style the button and its states */
</style>
<button class="button" type="button">Save</button>`,
      language: 'html',
      solution: `<style>
  .button {
    padding: 0.65rem 1rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: #2563eb;
    color: white;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .button:hover {
    background-color: #1d4ed8;
  }

  .button:focus-visible {
    outline: 2px solid #1d4ed8;
    outline-offset: 3px;
  }

  .button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
</style>
<button class="button" type="button">Save</button>`,
      hint: 'A real button element keeps keyboard and screen reader behavior intact.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.button\\s*\\{[^}]*font\\s*:\\s*inherit',
            '\\.button:hover\\s*\\{',
            '\\.button:focus-visible\\s*\\{[^}]*outline\\s*:',
            '\\.button:disabled\\s*\\{',
          ],
          message: 'The button has base, hover, focus, and disabled states.',
        },
      ],
    },
  ],

  'navigation-bars': [
    {
      type: 'code-challenge',
      title: 'Build a sticky navigation bar',
      instructions: 'Lay out the links and keep the header visible while scrolling.',
      prompt: 'Give .nav display: flex and a gap, make .site-header sticky at the top, and style the aria-current link.',
      starterCode: `<style>
  /* Build and stick the navigation */
</style>
<header class="site-header">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="#top">CodeLearn</a>
    <ul>
      <li><a href="#courses" aria-current="page">Courses</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>
<main id="top"><h1>Navigation</h1></main>`,
      language: 'html',
      solution: `<style>
  .site-header {
    position: sticky;
    top: 0;
    background-color: white;
    border-bottom: 1px solid #e2e8f0;
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
  }

  .nav ul {
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav a {
    color: #475569;
    text-decoration: none;
  }

  .nav a[aria-current="page"] {
    color: #0f766e;
    font-weight: 700;
  }

  main {
    height: 80vh;
  }
</style>
<header class="site-header">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="#top">CodeLearn</a>
    <ul>
      <li><a href="#courses" aria-current="page">Courses</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>
<main id="top"><h1>Navigation</h1></main>`,
      hint: 'position: sticky needs a top offset to know where to stick.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.nav\\s*\\{[^}]*display\\s*:\\s*flex',
            '\\.site-header\\s*\\{[^}]*position\\s*:\\s*sticky',
            '\\.site-header\\s*\\{[^}]*top\\s*:\\s*0',
            'aria-current="page"',
          ],
          message: 'The nav is a flex row, the header is sticky, and the current link is styled.',
        },
      ],
    },
  ],

  'custom-properties': [
    {
      type: 'code-challenge',
      title: 'Create a token and use it',
      instructions: 'Define a brand color and reuse it in a button rule.',
      prompt: 'Declare --brand: #2563eb on :root and use var(--brand) for .button background-color.',
      starterCode: `<style>
  /* Declare and use a custom property */
</style>
<button class="button" type="button">Brand button</button>`,
      language: 'html',
      solution: `<style>
  :root {
    --brand: #2563eb;
    --radius: 0.5rem;
  }

  .button {
    padding: 0.65rem 1rem;
    border: 0;
    border-radius: var(--radius);
    background-color: var(--brand);
    color: white;
    font: inherit;
  }
</style>
<button class="button" type="button">Brand button</button>`,
      hint: 'The variable name includes the two leading dashes in both places.',
      checks: [
        {
          kind: 'source',
          patterns: [
            ':root\\s*\\{[^}]*--brand\\s*:',
            'background-color\\s*:\\s*var\\(\\s*--brand\\s*\\)',
          ],
          message: 'The brand token is declared and used by the button.',
        },
      ],
    },
  ],

  'accessibility-and-focus': [
    {
      type: 'code-challenge',
      title: 'Make the actions accessible',
      instructions: 'Add a focus ring, a comfortable target size, and a reduced-motion fallback.',
      prompt: 'Give .button min-height: 2.75rem, add .button:focus-visible with an outline, and disable transitions under prefers-reduced-motion: reduce.',
      starterCode: `<style>
  /* Improve focus, target size, and motion */
</style>
<div class="actions">
  <button class="button" type="button">Save</button>
  <button class="button" type="button">Cancel</button>
</div>`,
      language: 'html',
      solution: `<style>
  .button {
    min-height: 2.75rem;
    padding: 0.65rem 1rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: #2563eb;
    color: white;
    font: inherit;
    transition: background-color 200ms ease;
  }

  .button:focus-visible {
    outline: 2px solid #1d4ed8;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }
  }
</style>
<div class="actions">
  <button class="button" type="button">Save</button>
  <button class="button" type="button">Cancel</button>
</div>`,
      hint: 'A visible outline is the point; do not remove it without a replacement.',
      checks: [
        {
          kind: 'source',
          patterns: [
            '\\.button\\s*\\{[^}]*min-height\\s*:',
            '\\.button:focus-visible\\s*\\{[^}]*outline\\s*:',
            'prefers-reduced-motion\\s*:\\s*reduce',
          ],
          message: 'The button has a larger target, a focus ring, and a reduced-motion fallback.',
        },
      ],
    },
  ],
}
