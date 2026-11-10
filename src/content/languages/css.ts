import type { Language } from '../types'

export const css: Language = {
  id: 'css',
  name: 'CSS',
  monogram: '#',
  category: 'web',
  tagline: 'The language that styles the web.',
  description:
    'CSS controls how HTML looks. You will learn selectors, color and type, the box model, Flexbox, and responsive layouts, then combine them into pages that look intentional on every screen.',
  difficulty: 'Beginner',
  accent: '#2965F1',
  lessons: [
    {
      id: 'css-basics',
      title: 'How CSS works',
      summary: 'Write your first rule and connect a stylesheet to an HTML page.',
      minutes: 10,
      objectives: [
        'Write a CSS rule with a selector and declarations',
        'Attach CSS with a style element or an external stylesheet',
        'Understand how the cascade chooses between rules',
      ],
      sections: [
        {
          type: 'text',
          content:
            'HTML gives a page structure. CSS decides how that structure looks: color, spacing, type, and layout. The browser reads the HTML first, then applies the CSS rules it finds.',
        },
        {
          type: 'concept',
          title: 'A rule has a selector and declarations',
          content:
            'The selector chooses which elements to style. The declarations inside the braces set properties. Each declaration ends with a semicolon.',
          language: 'css',
          caption: 'styles.css',
          code: `h1 {
  color: #0f172a;
  font-size: 2rem;
}`,
        },
        {
          type: 'text',
          content:
            'In this rule, `h1` is the selector. `color` and `font-size` are properties, and the values after the colons are what the browser applies.',
        },
        {
          type: 'concept',
          title: 'Attach a stylesheet',
          content:
            'A style element keeps CSS inside the HTML document. It is handy for small examples and for trying an idea quickly.',
          language: 'html',
          caption: 'index.html',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      h1 {
        color: #0f172a;
        font-size: 2rem;
      }
    </style>
  </head>
  <body>
    <h1>Styled heading</h1>
  </body>
</html>`,
        },
        {
          type: 'text',
          content:
            'For a real project, put the rules in a separate file and link it from the document head. This keeps the markup clean and lets one stylesheet style many pages.',
        },
        {
          type: 'code',
          language: 'html',
          caption: 'index.html',
          preview: false,
          code: `<link rel="stylesheet" href="styles.css" />`,
        },
        {
          type: 'list',
          title: 'Three ways to attach CSS',
          items: [
            '**External stylesheet:** a `link` element points to a `.css` file.',
            '**Internal styles:** a `style` element contains rules inside the page.',
            '**Inline styles:** a `style` attribute sits directly on one element. Use this sparingly.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Keep presentation separate',
          content:
            'Prefer external stylesheets for anything larger than a quick experiment. If you need the same look on another page, you can reuse the file instead of copying rules.',
        },
      ],
      takeaways: [
        'A CSS rule pairs a selector with declarations.',
        'Use a link element or a style element to attach CSS.',
        'The cascade decides which conflicting rule wins.',
        'Keep styles in a separate file as projects grow.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What does the selector in a CSS rule do?',
          options: [
            'Chooses which elements receive the styles',
            'Sets the page title',
            'Loads an image',
            'Creates a new HTML element',
          ],
          answer: 0,
          explanation:
            'The selector matches elements, and the declarations describe how those elements should look.',
        },
        {
          id: 'q2',
          question: 'Which part of `color: red;` is the declaration?',
          options: [
            'The whole line',
            'Only the word color',
            'Only the word red',
            'The braces around the rule',
          ],
          answer: 0,
          explanation:
            'A declaration is a property and value pair, such as `color: red;`.',
        },
        {
          id: 'q3',
          question: 'Which element links an external stylesheet?',
          options: ['<link>', '<style>', '<script>', '<meta>'],
          answer: 0,
          explanation:
            'A link element with rel="stylesheet" loads a separate CSS file.',
        },
        {
          id: 'q4',
          question: 'What does the cascade decide?',
          options: [
            'Which rule wins when several rules set the same property',
            'Which image loads first',
            'How many pages a site has',
            'Which HTML elements are valid',
          ],
          answer: 0,
          explanation:
            'The cascade combines origin, specificity, and source order to resolve conflicts.',
        },
      ],
    },
    {
      id: 'selectors',
      title: 'Selectors and specificity',
      summary: 'Target elements precisely with classes, ids, and state selectors.',
      minutes: 12,
      objectives: [
        'Use element, class, and id selectors',
        'Combine selectors to target nested content',
        'Predict which rule wins when selectors compete',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A selector can be broad or narrow. Start with the simplest selector that expresses your intent, then add detail only when you need it.',
        },
        {
          type: 'concept',
          title: 'Element, class, and id selectors',
          content:
            'An element selector matches every element of that type. A class selector starts with a dot and can be reused. An id selector starts with a hash and should appear only once per page.',
          language: 'css',
          caption: 'styles.css',
          code: `p {
  color: #334155;
}

.note {
  background-color: #fef3c7;
}

#intro {
  font-size: 1.25rem;
}`,
        },
        {
          type: 'concept',
          title: 'Combine selectors',
          content:
            'A descendant selector matches an element inside another. The child combinator is stricter: it matches only direct children.',
          language: 'css',
          caption: 'styles.css',
          code: `.card p {
  margin: 0;
}

.card > p {
  font-weight: 600;
}`,
        },
        {
          type: 'concept',
          title: 'Pseudo-classes respond to state',
          content:
            'Pseudo-classes select an element based on its position or state, such as when the pointer is over it or when it is the first item in a list.',
          language: 'css',
          caption: 'styles.css',
          code: `a:hover {
  color: #2563eb;
}

li:first-child {
  font-weight: 600;
}`,
        },
        {
          type: 'text',
          content:
            'Specificity is the browser’s way of ranking selectors. Inline styles beat ids, ids beat classes, and classes beat element selectors. When two rules have the same rank, the later rule wins.',
        },
        {
          type: 'list',
          title: 'Specificity, from strongest to weakest',
          items: [
            'Inline `style` attribute',
            'Id selector, such as `#intro`',
            'Class, attribute, or pseudo-class selector, such as `.note` or `:hover`',
            'Element selector, such as `p` or `h1`',
          ],
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Selectors working together',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .card {
        padding: 1.25rem;
        background-color: white;
        border: 1px solid #e2e8f0;
      }

      .card p {
        margin: 0.5rem 0 0;
        color: #475569;
      }

      .card > p {
        font-weight: 600;
      }

      #intro {
        border-color: #0f766e;
      }

      a:hover {
        color: #2563eb;
      }
    </style>
  </head>
  <body>
    <article class="card" id="intro">
      <h1>Selectors</h1>
      <p>This direct child is bold.</p>
      <div><p>This nested paragraph is not a direct child.</p></div>
      <p><a href="#details">Hover this link</a></p>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not reach for !important first',
          content:
            '`!important` overrides normal cascade rules and makes styles harder to reason about. Fix the selector or the source order instead whenever you can.',
        },
      ],
      takeaways: [
        'Classes are reusable; ids are unique.',
        'Descendant selectors match nested elements; child selectors match direct children.',
        'Pseudo-classes style an element based on state or position.',
        'Higher specificity wins, and later rules break ties.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which selector targets a class named card?',
          options: ['.card', '#card', 'card', '*card'],
          answer: 0,
          explanation: 'A class selector begins with a dot.',
        },
        {
          id: 'q2',
          question: 'Which selector is more specific?',
          options: ['#intro', '.intro', 'p.intro', 'p'],
          answer: 0,
          explanation: 'An id selector has higher specificity than a class or element selector.',
        },
        {
          id: 'q3',
          question: 'What does `a:hover` target?',
          options: [
            'A link while the pointer is over it',
            'The first link on the page',
            'A link that has been visited',
            'Every link inside a form',
          ],
          answer: 0,
          explanation: 'The hover pseudo-class applies while the pointer is over the element.',
        },
        {
          id: 'q4',
          question: 'What does the `>` combinator select?',
          options: [
            'Direct children only',
            'All descendants',
            'The next sibling',
            'The parent element',
          ],
          answer: 0,
          explanation: 'The child combinator matches only elements directly inside the parent.',
        },
      ],
    },
    {
      id: 'colors-and-typography',
      title: 'Color and typography',
      summary: 'Choose readable colors, font stacks, and type sizes.',
      minutes: 11,
      objectives: [
        'Set text and background colors',
        'Choose a font stack that works across systems',
        'Create a readable type scale with line-height',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Color and type carry most of a page’s personality. Good defaults are calm, readable, and consistent rather than loud.',
        },
        {
          type: 'concept',
          title: 'Set text and background colors',
          content:
            'The `color` property sets text color. `background-color` sets the area behind the content. Use enough contrast so the text stays readable.',
          language: 'css',
          caption: 'styles.css',
          code: `body {
  color: #1f2937;
  background-color: #f8fafc;
}`,
        },
        {
          type: 'concept',
          title: 'Choose a font stack',
          content:
            'A font stack lists the preferred font first, then fallbacks. Ending with a generic family such as `sans-serif` guarantees the browser has something to use.',
          language: 'css',
          caption: 'styles.css',
          code: `body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}`,
        },
        {
          type: 'concept',
          title: 'Set a readable type scale',
          content:
            'Use a larger size for headings and a comfortable line-height for paragraphs. Line-height is especially important for longer text.',
          language: 'css',
          caption: 'styles.css',
          code: `h1 {
  font-size: 2.5rem;
  line-height: 1.1;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Putting color and type together',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      h1 {
        margin: 0 0 0.5rem;
        font-size: 2.5rem;
        line-height: 1.1;
      }

      p {
        max-width: 36rem;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <h1>A clear heading</h1>
    <p>Readable text needs enough contrast, a comfortable size, and room between lines.</p>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Test contrast, not just taste',
          content:
            'Light gray text on white can look elegant in a mockup and become unreadable in daylight. Check contrast for body text and for text inside buttons.',
        },
      ],
      takeaways: [
        '`color` styles text; `background-color` styles the area behind it.',
        'A font stack gives the browser useful fallbacks.',
        'Line-height makes paragraphs easier to read.',
        'Contrast matters more than a fashionable palette.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which property changes text color?',
          options: ['color', 'background-color', 'font-color', 'text-fill'],
          answer: 0,
          explanation: 'The color property sets the foreground text color.',
        },
        {
          id: 'q2',
          question: 'Why does a font stack end with a generic family?',
          options: [
            'It guarantees a usable fallback',
            'It makes the text bold',
            'It loads a web font faster',
            'It removes the need for font-size',
          ],
          answer: 0,
          explanation:
            'A generic family such as sans-serif is always available, so the browser has a fallback.',
        },
        {
          id: 'q3',
          question: 'Which property controls the space between lines of text?',
          options: ['line-height', 'letter-spacing', 'margin', 'font-weight'],
          answer: 0,
          explanation: 'line-height sets the height of each line box.',
        },
        {
          id: 'q4',
          question: 'What makes body text easier to read?',
          options: [
            'Enough contrast and a comfortable line-height',
            'Using as many colors as possible',
            'Setting every paragraph to 8px',
            'Removing all spacing',
          ],
          answer: 0,
          explanation:
            'Contrast and line-height both affect readability, especially for longer passages.',
        },
      ],
    },
    {
      id: 'box-model',
      title: 'The box model',
      summary: 'Understand content, padding, borders, and margins.',
      minutes: 12,
      objectives: [
        'Describe the four parts of the CSS box model',
        'Use padding and margin intentionally',
        'Switch to border-box sizing',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Every element generates a rectangular box. The box model explains how the content, padding, border, and margin fit together and why two elements sometimes feel farther apart than expected.',
        },
        {
          type: 'concept',
          title: 'Every element is a box',
          content:
            'The content area holds the text or child elements. Padding adds space inside the border. The border draws around the padding. Margin adds space outside the border.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  width: 320px;
  padding: 24px;
  border: 1px solid #cbd5e1;
  margin: 16px;
}`,
        },
        {
          type: 'concept',
          title: 'Padding pushes inward; margin pushes outward',
          content:
            'Use padding when the space belongs inside the element, such as the gap between a card’s edge and its text. Use margin when you need space between separate elements.',
          language: 'css',
          caption: 'styles.css',
          code: `.button {
  padding: 0.75rem 1rem;
}

.button + .button {
  margin-left: 0.5rem;
}`,
        },
        {
          type: 'concept',
          title: 'Use border-box sizing',
          content:
            'By default, width and height describe only the content box, so padding and borders make an element wider than expected. `box-sizing: border-box` includes padding and border in the declared size.',
          language: 'css',
          caption: 'styles.css',
          code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Two boxes, one model',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 2rem;
        font-family: system-ui, sans-serif;
        background-color: #f8fafc;
      }

      .card {
        width: 18rem;
        padding: 1.5rem;
        border: 1px solid #cbd5e1;
        margin-bottom: 1rem;
        background-color: white;
      }
    </style>
  </head>
  <body>
    <div class="card">Padding keeps the text away from the edge.</div>
    <div class="card">Margin keeps the two cards apart.</div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vertical margins can collapse',
          content:
            'Adjacent vertical margins sometimes collapse into the larger of the two instead of adding together. If spacing looks smaller than expected, check for margin collapse before adding more values.',
        },
      ],
      takeaways: [
        'The box model has content, padding, border, and margin.',
        'Padding is space inside the border; margin is space outside it.',
        '`box-sizing: border-box` makes width include padding and border.',
        'Adjacent vertical margins can collapse.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which part of the box model adds space inside the border?',
          options: ['padding', 'margin', 'outline', 'gap'],
          answer: 0,
          explanation: 'Padding sits between the content and the border.',
        },
        {
          id: 'q2',
          question: 'Which part adds space outside the border?',
          options: ['margin', 'padding', 'content', 'border-radius'],
          answer: 0,
          explanation: 'Margin creates space between the element and its neighbors.',
        },
        {
          id: 'q3',
          question: 'What does `box-sizing: border-box` do?',
          options: [
            'Includes padding and border in the declared width',
            'Removes the border',
            'Centers the element',
            'Makes the element inline',
          ],
          answer: 0,
          explanation:
            'With border-box, the width covers content, padding, and border together.',
        },
        {
          id: 'q4',
          question: 'When should you use padding instead of margin?',
          options: [
            'When the space belongs inside the element',
            'When you want space between two sibling elements',
            'When you want to hide an element',
            'When you need a new HTML tag',
          ],
          answer: 0,
          explanation:
            'Padding creates internal space; margin creates external space between elements.',
        },
      ],
    },
    {
      id: 'flexbox',
      title: 'Layout with Flexbox',
      summary: 'Arrange items in rows and columns with flexible spacing.',
      minutes: 13,
      objectives: [
        'Turn a container into a flex layout',
        'Align items along the main and cross axes',
        'Control gaps, wrapping, and direction',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Flexbox is designed for arranging items in one direction: a row or a column. It handles alignment and leftover space without floats or manual widths.',
        },
        {
          type: 'concept',
          title: 'Turn on flex layout',
          content:
            'Set `display: flex` on the container. Its direct children become flex items and line up in a row by default.',
          language: 'css',
          caption: 'styles.css',
          code: `.row {
  display: flex;
  gap: 16px;
}`,
        },
        {
          type: 'concept',
          title: 'Align on both axes',
          content:
            '`justify-content` positions items along the main axis. `align-items` positions them along the cross axis. With a row, the main axis is horizontal.',
          language: 'css',
          caption: 'styles.css',
          code: `.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
        },
        {
          type: 'concept',
          title: 'Wrap and change direction',
          content:
            '`flex-wrap` lets items move onto a new line when space runs out. `flex-direction: column` stacks them instead of placing them in a row.',
          language: 'css',
          caption: 'styles.css',
          code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cards > * {
  flex: 1 1 14rem;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A flex toolbar and card row',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        font-family: system-ui, sans-serif;
        background-color: #f8fafc;
      }

      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: white;
        border: 1px solid #cbd5e1;
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
      }

      .card {
        flex: 1 1 12rem;
        padding: 1rem;
        background-color: white;
        border: 1px solid #cbd5e1;
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <strong>CSS layout</strong>
      <span>Flexbox</span>
    </div>
    <div class="cards">
      <div class="card">First card</div>
      <div class="card">Second card</div>
      <div class="card">Third card</div>
    </div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Start with one axis',
          content:
            'Decide whether you are arranging a row or a column before adding alignment properties. Flexbox becomes much easier to predict when you name the main axis first.',
        },
      ],
      takeaways: [
        '`display: flex` arranges direct children in one direction.',
        '`justify-content` aligns along the main axis; `align-items` aligns across it.',
        '`gap` spaces flex items without extra margins.',
        '`flex-wrap` lets items flow onto new lines.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which declaration creates a flex container?',
          options: ['display: flex', 'display: block', 'position: flex', 'flex: row'],
          answer: 0,
          explanation: '`display: flex` turns the element into a flex container.',
        },
        {
          id: 'q2',
          question: 'Which property aligns items along the main axis?',
          options: ['justify-content', 'align-items', 'gap', 'flex-wrap'],
          answer: 0,
          explanation:
            'justify-content distributes items along the main axis, which is horizontal in a row.',
        },
        {
          id: 'q3',
          question: 'What does `gap` do in a flex container?',
          options: [
            'Adds space between flex items',
            'Changes the text color',
            'Sets the container width',
            'Hides overflowing items',
          ],
          answer: 0,
          explanation: 'gap creates consistent spacing between flex items.',
        },
        {
          id: 'q4',
          question: 'Which property lets flex items move onto a new line?',
          options: ['flex-wrap: wrap', 'align-items: stretch', 'justify-content: center', 'display: block'],
          answer: 0,
          explanation: 'flex-wrap: wrap allows items to flow onto additional lines.',
        },
      ],
    },
    {
      id: 'responsive-design',
      title: 'Responsive design',
      summary: 'Make layouts adapt to phones, tablets, and desktops.',
      minutes: 12,
      objectives: [
        'Use relative units for flexible sizing',
        'Constrain content with max-width and min()',
        'Add mobile-first media queries',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A responsive page works at many widths instead of assuming a desktop screen. Start with a layout that works on a narrow screen, then add space and columns when there is room.',
        },
        {
          type: 'concept',
          title: 'Use relative units',
          content:
            '`rem` is based on the root font size, so it scales with the user’s settings. Percentages and viewport units let containers and text adapt to the available space.',
          language: 'css',
          caption: 'styles.css',
          code: `body {
  font-size: 1rem;
  line-height: 1.6;
}

.sidebar {
  width: 100%;
}`,
        },
        {
          type: 'concept',
          title: 'Constrain content',
          content:
            '`max-width` stops text and cards from stretching too wide on large screens. The `min()` function chooses the smaller of two values, which makes a fluid wrapper easy to write.',
          language: 'css',
          caption: 'styles.css',
          code: `.wrapper {
  width: min(100% - 2rem, 70rem);
  margin-inline: auto;
}`,
        },
        {
          type: 'concept',
          title: 'Add a media query',
          content:
            'A media query applies rules only when a condition matches. A mobile-first layout starts stacked and switches to a row at a wider breakpoint.',
          language: 'css',
          caption: 'styles.css',
          code: `.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .cards {
    flex-direction: row;
  }
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A mobile-first card layout',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        font-family: system-ui, sans-serif;
        background-color: #f8fafc;
      }

      .wrapper {
        width: min(100% - 2rem, 70rem);
        margin-inline: auto;
      }

      .cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .card {
        padding: 1rem;
        background-color: white;
        border: 1px solid #cbd5e1;
      }

      @media (min-width: 48rem) {
        .cards {
          flex-direction: row;
        }

        .card {
          flex: 1;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="cards">
        <div class="card">Stacked on small screens</div>
        <div class="card">Side by side when there is room</div>
      </div>
    </div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Start narrow',
          content:
            'Write the small-screen layout first, then use `min-width` media queries to add complexity. This keeps the base styles simple and makes the mobile experience intentional.',
        },
      ],
      takeaways: [
        'Relative units let text and containers adapt to the viewport.',
        '`max-width` and `min()` keep content from stretching too wide.',
        'Media queries apply rules at specific breakpoints.',
        'A mobile-first stylesheet starts with the narrow layout.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is `rem` based on?',
          options: [
            'The root font size',
            'The viewport height',
            'The element’s border width',
            'The number of columns',
          ],
          answer: 0,
          explanation: 'One rem equals the root element’s font size.',
        },
        {
          id: 'q2',
          question: 'What does `max-width` prevent?',
          options: [
            'Content from stretching too wide',
            'Text from wrapping',
            'Images from loading',
            'Colors from changing',
          ],
          answer: 0,
          explanation:
            'max-width caps how wide an element can grow on large screens.',
        },
        {
          id: 'q3',
          question: 'When does a `min-width` media query apply?',
          options: [
            'When the viewport is at least that wide',
            'When the viewport is narrower than that',
            'Only when printing',
            'Only on touch devices',
          ],
          answer: 0,
          explanation:
            'min-width media queries apply at the breakpoint and above, which suits mobile-first CSS.',
        },
        {
          id: 'q4',
          question: 'What is a mobile-first layout?',
          options: [
            'Start with the narrow layout, then add wider-screen rules',
            'Design only for phones',
            'Hide content on desktops',
            'Use fixed widths everywhere',
          ],
          answer: 0,
          explanation:
            'Mobile-first CSS begins with the small-screen styles and enhances them at wider breakpoints.',
        },
      ],
    },
    {
      id: 'units-and-values',
      title: 'Units and values',
      summary: 'Choose between pixels, rems, percentages, and viewport units.',
      minutes: 12,
      objectives: [
        'Pick the right unit for text, spacing, and containers',
        'Use rem and em without surprises',
        'Constrain values with min(), max(), and clamp()',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A value is only as useful as its unit. `16px` and `1rem` can look the same today, but they behave very differently when the user changes their font size or the screen gets wider.',
        },
        {
          type: 'concept',
          title: 'Absolute and relative units',
          content:
            'Pixels are absolute: they do not scale with user settings. `rem` is relative to the root font size, while percentages are relative to the parent. Use `rem` for text and spacing, and percentages for fluid containers.',
          language: 'css',
          caption: 'styles.css',
          code: `h1 {
  font-size: 2rem;
}

.card {
  width: 100%;
  max-width: 32rem;
  padding: 1.5rem;
}`,
        },
        {
          type: 'concept',
          title: 'em is relative to the current font size',
          content:
            '`em` multiplies the font size of the element itself. That makes it useful for spacing that should scale with nearby text, but it can compound when elements are nested. When in doubt, reach for `rem`.',
          language: 'css',
          caption: 'styles.css',
          code: `.parent {
  font-size: 1.25rem;
}

.parent p {
  margin-bottom: 1em;
}`,
        },
        {
          type: 'concept',
          title: 'Constrain values with functions',
          content:
            '`min()` picks the smaller value, `max()` picks the larger, and `clamp()` keeps a value between a minimum and a maximum. These functions replace many media queries for fluid type and spacing.',
          language: 'css',
          caption: 'styles.css',
          code: `h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

.hero {
  padding: clamp(1.5rem, 4vw, 3rem);
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A hero that scales with the viewport',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .hero {
        padding: clamp(1.5rem, 5vw, 3rem);
        background-color: white;
        border: 1px solid #cbd5e1;
        border-radius: 1rem;
      }

      h1 {
        margin: 0 0 0.5rem;
        font-size: clamp(1.75rem, 4vw, 3rem);
        line-height: 1.1;
      }

      p {
        max-width: 60ch;
        margin: 0;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <section class="hero">
      <h1>Fluid by default</h1>
      <p>The heading and padding grow with the viewport, then stop at a comfortable maximum.</p>
    </section>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Prefer rem for text and spacing',
          content:
            '`rem` respects the user’s browser font-size setting. Save pixels for hairlines and borders, where a fixed thin line is exactly what you want.',
        },
      ],
      takeaways: [
        '`rem` scales with the root font size; pixels do not.',
        '`em` is relative to the current element’s font size and can compound.',
        'Percentages size containers relative to their parent.',
        '`clamp()` keeps fluid values between a minimum and maximum.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which unit scales with the user’s root font size?',
          options: ['rem', 'px', 'pt', 'cm'],
          answer: 0,
          explanation: 'One rem equals the root element’s font size.',
        },
        {
          id: 'q2',
          question: 'What is `1em` relative to?',
          options: [
            'The current element’s font size',
            'The viewport width',
            'The root font size only',
            'The border width',
          ],
          answer: 0,
          explanation: 'em is relative to the font size of the element where it is used.',
        },
        {
          id: 'q3',
          question: 'What does `clamp(1rem, 4vw, 2rem)` do?',
          options: [
            'Keeps the value between 1rem and 2rem',
            'Always uses 4vw',
            'Rounds the value to 1rem',
            'Adds the three values together',
          ],
          answer: 0,
          explanation: 'clamp() uses the preferred value but never goes below the minimum or above the maximum.',
        },
        {
          id: 'q4',
          question: 'Which unit suits a container that should fill its parent?',
          options: ['%', 'px', 'pt', 'rem'],
          answer: 0,
          explanation: 'A percentage width is relative to the parent container.',
        },
      ],
    },
    {
      id: 'cascade-and-inheritance',
      title: 'The cascade and inheritance',
      summary: 'Predict which rule wins and which values pass down to children.',
      minutes: 12,
      objectives: [
        'Explain how origin, specificity, and order resolve conflicts',
        'Recognize properties that inherit automatically',
        'Use inherit, initial, and unset deliberately',
      ],
      sections: [
        {
          type: 'text',
          content:
            'The cascade is the algorithm that decides which declaration applies when several rules target the same property. It sounds abstract until two rules disagree and the page looks wrong.',
        },
        {
          type: 'concept',
          title: 'Origin, specificity, then order',
          content:
            'The browser first considers where a rule came from, then how specific its selector is, then which rule appears later. When specificity ties, the last declaration wins.',
          language: 'css',
          caption: 'styles.css',
          code: `p {
  color: #334155;
}

.note {
  color: #b45309;
}

/* A later class rule wins over an earlier one. */
.note {
  color: #0f766e;
}`,
        },
        {
          type: 'concept',
          title: 'Some properties inherit',
          content:
            'Text-related properties such as `color` and `font-family` inherit from the parent by default. Layout properties such as `margin`, `padding`, and `border` do not. That is why setting a font on `body` styles the whole page.',
          language: 'css',
          caption: 'styles.css',
          code: `body {
  color: #1f2937;
  font-family: system-ui, sans-serif;
}

.card {
  border: 1px solid #cbd5e1;
}`,
        },
        {
          type: 'concept',
          title: 'Take explicit control',
          content:
            '`inherit` forces a property to take its parent’s value. `initial` resets it to the browser default, and `unset` behaves like `inherit` for inherited properties and `initial` for the rest.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  color: inherit;
  border: initial;
  padding: unset;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Inheritance at work',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .card {
        padding: 1.5rem;
        background-color: white;
        border: 1px solid #cbd5e1;
      }

      .card h2 {
        margin: 0 0 0.5rem;
        color: #0f766e;
      }

      .muted {
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h2>Inherited text styles</h2>
      <p>The card inherits the body font and color.</p>
      <p class="muted">A class can override just the color.</p>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Treat !important as a last resort',
          content:
            '`!important` jumps ahead of normal cascade rules and makes future changes harder. Prefer a more specific selector or a better source order first.',
        },
      ],
      takeaways: [
        'The cascade compares origin, specificity, and source order.',
        'When specificity ties, the later rule wins.',
        'Text properties usually inherit; layout properties usually do not.',
        '`inherit`, `initial`, and `unset` reset values explicitly.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Two rules have equal specificity. Which one wins?',
          options: ['The one written later', 'The one written first', 'The shorter one', 'Neither applies'],
          answer: 0,
          explanation: 'Source order breaks a specificity tie, so the later declaration wins.',
        },
        {
          id: 'q2',
          question: 'Which property inherits by default?',
          options: ['color', 'margin', 'padding', 'border'],
          answer: 0,
          explanation: 'color is an inherited text property; the layout properties are not.',
        },
        {
          id: 'q3',
          question: 'What does `color: inherit` do?',
          options: [
            'Uses the parent’s color',
            'Resets to black',
            'Removes the color',
            'Uses the browser accent color',
          ],
          answer: 0,
          explanation: 'inherit takes the computed value from the parent element.',
        },
        {
          id: 'q4',
          question: 'What does `!important` change?',
          options: [
            'It raises a declaration above normal cascade rules',
            'It makes the text bold',
            'It doubles the value',
            'It removes the selector',
          ],
          answer: 0,
          explanation: 'Important declarations override normal declarations of the same origin.',
        },
      ],
    },
    {
      id: 'pseudo-classes-and-elements',
      title: 'Pseudo-classes and pseudo-elements',
      summary: 'Style state, position, and generated decorations.',
      minutes: 12,
      objectives: [
        'Style hover, focus, and disabled states',
        'Target elements by position with nth-child',
        'Add decorations with ::before and ::after',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A pseudo-class selects an element because of its state or position. A pseudo-element styles a specific part of an element, or generates a new box around it. The double colon makes the difference visible.',
        },
        {
          type: 'concept',
          title: 'State pseudo-classes',
          content:
            '`:hover` applies while the pointer is over an element. `:focus-visible` applies when the browser decides a focus ring should be shown, which usually means keyboard focus. `:disabled` matches disabled form controls.',
          language: 'css',
          caption: 'styles.css',
          code: `.button:hover {
  background-color: #1d4ed8;
}

.button:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
        },
        {
          type: 'concept',
          title: 'Structural pseudo-classes',
          content:
            '`:first-child`, `:last-child`, and `:nth-child()` match an element by its position among siblings. `:not()` excludes elements that match another selector.',
          language: 'css',
          caption: 'styles.css',
          code: `li:nth-child(2n) {
  background-color: #f1f5f9;
}

li:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}`,
        },
        {
          type: 'concept',
          title: 'Generated content',
          content:
            '`::before` and `::after` create boxes before or after an element’s content. They need a `content` value, even an empty string, before they render.',
          language: 'css',
          caption: 'styles.css',
          code: `.note::before {
  content: "Note: ";
  font-weight: 700;
  color: #b45309;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Custom list markers and states',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      ul {
        max-width: 22rem;
        margin: 0;
        padding: 0;
        list-style: none;
        background-color: white;
        border: 1px solid #cbd5e1;
      }

      li {
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        position: relative;
      }

      li:not(:last-child) {
        border-bottom: 1px solid #e2e8f0;
      }

      li::before {
        content: "";
        position: absolute;
        left: 1rem;
        top: 1.05rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: #0f766e;
      }

      li:nth-child(2) {
        background-color: #f1f5f9;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>Selectors</li>
      <li>The box model</li>
      <li>Flexbox</li>
    </ul>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Prefer :focus-visible for focus rings',
          content:
            'A plain `:focus` rule can flash a ring after a mouse click. `:focus-visible` keeps the ring for keyboard users while staying quiet for pointer users.',
        },
      ],
      takeaways: [
        'Pseudo-classes match state or position; pseudo-elements style parts or generated boxes.',
        '`:focus-visible` shows focus rings for keyboard interaction.',
        '`:nth-child()` and `:not()` target elements structurally.',
        '`::before` and `::after` need a content value.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which one is a pseudo-element?',
          options: ['::before', ':hover', ':focus-visible', ':nth-child'],
          answer: 0,
          explanation: 'Pseudo-elements use a double colon, such as ::before.',
        },
        {
          id: 'q2',
          question: 'What does `li:nth-child(2n)` select?',
          options: [
            'Every second list item',
            'Only the second item',
            'The first two items',
            'Every item except the second',
          ],
          answer: 0,
          explanation: '2n matches the 2nd, 4th, 6th, and so on.',
        },
        {
          id: 'q3',
          question: 'When is `:focus-visible` useful?',
          options: [
            'To show a focus ring for keyboard users',
            'To hide all links',
            'To select the first child',
            'To load a font',
          ],
          answer: 0,
          explanation: 'It lets the browser show focus only when it is helpful, usually for keyboard navigation.',
        },
        {
          id: 'q4',
          question: 'Why does a `::before` rule need `content`?',
          options: [
            'Without content, the generated box does not render',
            'It sets the text color',
            'It creates an attribute',
            'It removes the element',
          ],
          answer: 0,
          explanation: 'A pseudo-element needs a content value before it generates a box.',
        },
      ],
    },
    {
      id: 'borders-backgrounds-shadows',
      title: 'Borders, backgrounds, and shadows',
      summary: 'Add edges, surfaces, and depth without overdoing it.',
      minutes: 12,
      objectives: [
        'Use the border shorthand and border-radius',
        'Layer background color, image, and position',
        'Add depth with box-shadow and outline',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Borders, backgrounds, and shadows define the surfaces of a page. A few consistent values do more for a design than a dozen one-off effects.',
        },
        {
          type: 'concept',
          title: 'Borders and rounded corners',
          content:
            'The `border` shorthand sets width, style, and color in one line. `border-radius` rounds the corners, and a radius of `50%` turns a square into a circle.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}`,
        },
        {
          type: 'concept',
          title: 'Backgrounds can layer',
          content:
            '`background-color` paints the base. `background-image` can add a gradient or a picture, and `background-size`, `background-position`, and `background-repeat` control how it fills the box.',
          language: 'css',
          caption: 'styles.css',
          code: `.banner {
  background-color: #0f172a;
  background-image: url("/images/mountains.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
        },
        {
          type: 'concept',
          title: 'Shadows and outlines',
          content:
            '`box-shadow` draws a shadow around the box and accepts offsets, blur, spread, and color. `outline` draws a line outside the border without taking up space, which makes it a good focus indicator.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  box-shadow: 0 12px 30px -18px rgb(15 23 42 / 0.45);
}

.button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A profile card with depth',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f1f5f9;
        font-family: system-ui, sans-serif;
      }

      .card {
        max-width: 22rem;
        padding: 1.5rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        box-shadow: 0 18px 40px -28px rgb(15 23 42 / 0.5);
      }

      .avatar {
        display: grid;
        place-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #ccfbf1;
        color: #0f766e;
        font-weight: 700;
      }

      h2 {
        margin: 1rem 0 0.25rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        color: #64748b;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <div class="avatar">AL</div>
      <h2>Ada Lovelace</h2>
      <p>Mathematician and the first programmer.</p>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'One shadow, one radius',
          content:
            'Pick a small set of radii and shadows and reuse them. Consistency reads as polish; a different shadow on every card reads as noise.',
        },
      ],
      takeaways: [
        'The `border` shorthand sets width, style, and color.',
        '`border-radius: 50%` turns a square into a circle.',
        'Backgrounds can combine color, image, size, and position.',
        '`outline` does not take up layout space, unlike a border.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which property rounds an element’s corners?',
          options: ['border-radius', 'box-shadow', 'outline', 'background-size'],
          answer: 0,
          explanation: 'border-radius rounds the corners of the border box.',
        },
        {
          id: 'q2',
          question: 'What does `background-size: cover` do?',
          options: [
            'Scales the image to cover the box',
            'Repeats the image',
            'Tiles the image',
            'Removes the background',
          ],
          answer: 0,
          explanation: 'cover scales the image so it fills the box, cropping if needed.',
        },
        {
          id: 'q3',
          question: 'How does `outline` differ from `border`?',
          options: [
            'It does not take up layout space',
            'It cannot have a color',
            'It only works on links',
            'It replaces the background',
          ],
          answer: 0,
          explanation: 'Outlines are painted outside the box without affecting layout.',
        },
        {
          id: 'q4',
          question: 'Which property adds a shadow around a box?',
          options: ['box-shadow', 'text-shadow', 'outline-offset', 'filter'],
          answer: 0,
          explanation: 'box-shadow draws a shadow around the element’s box.',
        },
      ],
    },
    {
      id: 'gradients-and-images',
      title: 'Gradients and images',
      summary: 'Use gradients as surfaces and fit images without distortion.',
      minutes: 12,
      objectives: [
        'Write linear and radial gradients',
        'Layer a gradient over an image',
        'Fit images with object-fit and background-size',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A gradient is an image generated by the browser. That means it can be used anywhere `background-image` works, including layered over a photograph to keep text readable.',
        },
        {
          type: 'concept',
          title: 'Linear gradients',
          content:
            '`linear-gradient()` blends colors along a line. You can name a direction such as `to right`, or use an angle such as `135deg`. Add color stops to control where each color lands.',
          language: 'css',
          caption: 'styles.css',
          code: `.hero {
  background-image: linear-gradient(135deg, #0ea5e9, #4f46e5);
}

.fade {
  background-image: linear-gradient(to bottom, transparent, #0f172a);
}`,
        },
        {
          type: 'concept',
          title: 'Radial gradients and layers',
          content:
            '`radial-gradient()` radiates from a center point. Separate multiple background layers with commas; the first layer paints on top.',
          language: 'css',
          caption: 'styles.css',
          code: `.glow {
  background-image:
    radial-gradient(circle at 20% 20%, rgb(56 189 248 / 0.35), transparent 55%),
    linear-gradient(135deg, #0f172a, #1e293b);
}`,
        },
        {
          type: 'concept',
          title: 'Fit images without distortion',
          content:
            'For an `img`, `object-fit: cover` fills the box and crops the overflow while preserving the aspect ratio. For a background image, `background-size: cover` does the same job.',
          language: 'css',
          caption: 'styles.css',
          code: `.thumb {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

.cover {
  background-image: url("/images/mountains.jpg");
  background-size: cover;
  background-position: center;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Text over a photographic surface',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .hero {
        position: relative;
        min-height: 18rem;
        overflow: hidden;
        border-radius: 1rem;
      }

      .hero img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to top, rgb(15 23 42 / 0.85), transparent 70%);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        display: flex;
        min-height: 18rem;
        align-items: flex-end;
        padding: 1.5rem;
        color: white;
      }

      h1 {
        margin: 0;
        font-size: 1.75rem;
      }
    </style>
  </head>
  <body>
    <section class="hero">
      <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
      <div class="hero-content">
        <h1>Readable text over any photo</h1>
      </div>
    </section>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Gradients do not replace alt text',
          content:
            'A decorative gradient is fine in CSS. A meaningful photograph still needs an `alt` attribute, even when a gradient sits on top of it.',
        },
      ],
      takeaways: [
        'Gradients are images created by CSS.',
        '`linear-gradient()` follows a direction or angle; `radial-gradient()` radiates from a point.',
        'Background layers are comma-separated, with the first on top.',
        '`object-fit: cover` crops an image without stretching it.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which function creates a gradient along a line?',
          options: ['linear-gradient()', 'radial-gradient()', 'url()', 'blur()'],
          answer: 0,
          explanation: 'linear-gradient() blends colors along a straight line.',
        },
        {
          id: 'q2',
          question: 'In a layered background, which layer paints on top?',
          options: ['The first one listed', 'The last one listed', 'The lightest color', 'The largest image'],
          answer: 0,
          explanation: 'Background layers stack with the first layer on top.',
        },
        {
          id: 'q3',
          question: 'What does `object-fit: cover` do to an image?',
          options: [
            'Fills the box and crops overflow',
            'Stretches it to the box',
            'Adds a border',
            'Repeats the image',
          ],
          answer: 0,
          explanation: 'cover preserves the aspect ratio while filling the box, cropping what does not fit.',
        },
        {
          id: 'q4',
          question: 'Which property positions a background image?',
          options: ['background-position', 'object-position', 'inset', 'transform-origin'],
          answer: 0,
          explanation: 'background-position places the background image inside its box.',
        },
      ],
    },
    {
      id: 'positioning',
      title: 'Positioning',
      summary: 'Place elements with relative, absolute, fixed, and sticky positioning.',
      minutes: 13,
      objectives: [
        'Explain the containing block for an absolute element',
        'Offset elements with inset properties',
        'Choose between fixed and sticky for persistent UI',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Normal flow places elements one after another. Positioning lets you take an element out of that flow, or offset it, when the layout needs a badge, an overlay, or a header that stays visible.',
        },
        {
          type: 'concept',
          title: 'Static and relative',
          content:
            '`position: static` is the default and ignores offsets. `position: relative` keeps the element in flow but lets `top`, `right`, `bottom`, and `left` move it from its normal spot. It also becomes a containing block for absolutely positioned children.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  position: relative;
}

.card .badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}`,
        },
        {
          type: 'concept',
          title: 'Absolute positioning',
          content:
            '`position: absolute` removes the element from flow and places it against its nearest positioned ancestor. Without a positioned ancestor, it falls back to the page’s initial containing block.',
          language: 'css',
          caption: 'styles.css',
          code: `.frame {
  position: relative;
}

.frame img {
  display: block;
  width: 100%;
}

.frame .caption {
  position: absolute;
  inset: auto 0 0;
  padding: 0.75rem;
  background-color: rgb(15 23 42 / 0.75);
  color: white;
}`,
        },
        {
          type: 'concept',
          title: 'Fixed and sticky',
          content:
            '`position: fixed` pins an element to the viewport, so it stays put while the page scrolls. `position: sticky` behaves like relative until a scroll threshold is reached, then sticks inside its scrolling container.',
          language: 'css',
          caption: 'styles.css',
          code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.chat-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A sticky header and a positioned badge',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      header {
        position: sticky;
        top: 0;
        padding: 1rem 2rem;
        background-color: white;
        border-bottom: 1px solid #e2e8f0;
      }

      main {
        padding: 2rem;
      }

      .card {
        position: relative;
        max-width: 24rem;
        padding: 1.5rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
      }

      .badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        background-color: #ccfbf1;
        color: #0f766e;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .filler {
        height: 60vh;
      }
    </style>
  </head>
  <body>
    <header><strong>Sticky header</strong></header>
    <main>
      <article class="card">
        <span class="badge">New</span>
        <h1>Positioning</h1>
        <p>Scroll and watch the header stay at the top.</p>
      </article>
      <div class="filler"></div>
    </main>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Absolute children need a positioned parent',
          content:
            'If an absolutely positioned badge flies to the corner of the page, the card is probably missing `position: relative`. Check the containing block before adding offsets.',
        },
      ],
      takeaways: [
        '`relative` keeps an element in flow and anchors absolute children.',
        '`absolute` removes an element from flow and uses the nearest positioned ancestor.',
        '`fixed` is pinned to the viewport; `sticky` sticks within its container.',
        'Offset with `top`, `right`, `bottom`, `left`, or the `inset` shorthand.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which position value keeps an element in flow but allows offsets?',
          options: ['relative', 'absolute', 'fixed', 'static'],
          answer: 0,
          explanation: 'relative keeps the element in flow while offsets move it visually.',
        },
        {
          id: 'q2',
          question: 'What does an absolutely positioned element use as its containing block?',
          options: [
            'The nearest positioned ancestor',
            'Always the viewport',
            'The nearest sibling',
            'The body only',
          ],
          answer: 0,
          explanation: 'Absolute positioning is relative to the nearest ancestor with a position other than static.',
        },
        {
          id: 'q3',
          question: 'Which position value pins an element to the viewport while scrolling?',
          options: ['fixed', 'relative', 'static', 'sticky'],
          answer: 0,
          explanation: 'fixed elements are positioned relative to the viewport and do not scroll with the page.',
        },
        {
          id: 'q4',
          question: 'How does `sticky` behave?',
          options: [
            'It scrolls normally until it reaches a threshold, then sticks',
            'It is always fixed to the viewport',
            'It removes the element from flow',
            'It centers the element',
          ],
          answer: 0,
          explanation: 'Sticky positioning combines relative flow with a scroll-based sticking point.',
        },
      ],
    },
    {
      id: 'stacking-and-z-index',
      title: 'Stacking and z-index',
      summary: 'Control which element paints on top when boxes overlap.',
      minutes: 11,
      objectives: [
        'Understand paint order for overlapping elements',
        'Create and reason about stacking contexts',
        'Layer content without escalating z-index values',
      ],
      sections: [
        {
          type: 'text',
          content:
            'When boxes overlap, the browser paints them in a defined order. `z-index` adjusts that order, but only for positioned or otherwise stacked elements, and only within the same stacking context.',
        },
        {
          type: 'concept',
          title: 'z-index needs a stacking context',
          content:
            '`z-index` applies to positioned elements and to flex or grid items. A higher value paints on top, but only among siblings in the same stacking context. If the value seems ignored, check whether the element is positioned.',
          language: 'css',
          caption: 'styles.css',
          code: `.card {
  position: relative;
  z-index: 1;
}

.card .badge {
  position: absolute;
  z-index: 2;
}`,
        },
        {
          type: 'concept',
          title: 'What creates a stacking context',
          content:
            'Positioning with a `z-index` other than `auto` creates one. So do `opacity` below 1, a `transform`, a `filter`, and `isolation: isolate`. A child cannot escape its parent’s stacking context, no matter how large its z-index is.',
          language: 'css',
          caption: 'styles.css',
          code: `.panel {
  position: relative;
  isolation: isolate;
}

.panel .overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
}`,
        },
        {
          type: 'concept',
          title: 'Layer content, not chaos',
          content:
            'Use a small set of named layers in your head: background, content, overlay, and modal. Keep z-index values close together, and prefer `isolation` when you need to contain a component.',
          language: 'css',
          caption: 'styles.css',
          code: `.hero {
  position: relative;
}

.hero .image {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero .content {
  position: relative;
  z-index: 1;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A badge above an image',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .card {
        position: relative;
        isolation: isolate;
        max-width: 22rem;
        overflow: hidden;
        border-radius: 1rem;
        background-color: white;
        border: 1px solid #e2e8f0;
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
        border-radius: 999px;
        background-color: white;
        color: #0f766e;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .body {
        position: relative;
        z-index: 1;
        padding: 1rem 1.25rem;
      }
    </style>
  </head>
  <body>
    <article class="card">
      <img src="/images/mountains.jpg" alt="Snow-covered mountains at sunrise" />
      <span class="badge">Featured</span>
      <div class="body">
        <h1>Stacking order</h1>
        <p>The badge sits above the photo.</p>
      </div>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A child cannot escape its parent',
          content:
            'If a modal sits inside a card with `transform`, its `z-index: 9999` still competes only inside that card. Move the modal to the end of the document instead of inflating the number.',
        },
      ],
      takeaways: [
        '`z-index` orders elements within the same stacking context.',
        'Positioned elements, flex items, and grid items can use z-index.',
        'Transforms, opacity, filters, and isolation create stacking contexts.',
        'Prefer a small, consistent set of layers over huge numbers.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element paints on top?',
          options: [
            'The one with the higher z-index in the same stacking context',
            'The one with the larger font',
            'The one earlier in the document',
            'The one with a background color',
          ],
          answer: 0,
          explanation: 'Within one stacking context, a higher z-index paints above lower values.',
        },
        {
          id: 'q2',
          question: 'Which property creates a new stacking context?',
          options: ['isolation: isolate', 'color: red', 'margin: 0', 'display: block'],
          answer: 0,
          explanation: 'isolation: isolate explicitly creates a stacking context.',
        },
        {
          id: 'q3',
          question: 'Why might a huge z-index still lose?',
          options: [
            'The element is inside a lower stacking context',
            'z-index only accepts even numbers',
            'The element has no border',
            'The page has no title',
          ],
          answer: 0,
          explanation: 'A child is painted within its parent’s stacking context, so it cannot rise above a higher sibling context.',
        },
        {
          id: 'q4',
          question: 'Which is the healthiest layering strategy?',
          options: [
            'Use a few consistent layer values',
            'Use 9999 everywhere',
            'Avoid positioning entirely',
            'Give every element a different z-index',
          ],
          answer: 0,
          explanation: 'A small, shared set of layer values is easier to maintain and debug.',
        },
      ],
    },
    {
      id: 'transitions-and-transforms',
      title: 'Transitions and transforms',
      summary: 'Move, scale, and rotate elements with smooth state changes.',
      minutes: 12,
      objectives: [
        'Animate a property with the transition shorthand',
        'Combine translate, scale, and rotate',
        'Keep interactions fast and accessible',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A transition animates a property when its value changes, usually on hover or focus. A transform changes an element’s position, size, or rotation without disturbing the layout around it.',
        },
        {
          type: 'concept',
          title: 'The transition shorthand',
          content:
            'A transition needs a property, a duration, and optionally a timing function and delay. Use short durations for interface feedback; long durations feel sluggish.',
          language: 'css',
          caption: 'styles.css',
          code: `.button {
  transition: background-color 150ms ease, transform 150ms ease;
}

.button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}`,
        },
        {
          type: 'concept',
          title: 'Transform functions',
          content:
            '`translate()` moves an element, `scale()` resizes it, and `rotate()` turns it. Multiple functions combine in one declaration, and the order matters.',
          language: 'css',
          caption: 'styles.css',
          code: `.card:hover {
  transform: translateY(-4px) scale(1.01);
}

.arrow {
  transform: rotate(45deg);
}`,
        },
        {
          type: 'concept',
          title: 'Transforms do not reflow the page',
          content:
            'A transformed element is composited, so changing `transform` and `opacity` is usually smoother than animating `width`, `height`, or `top`. Set `transform-origin` when the default center point is not what you want.',
          language: 'css',
          caption: 'styles.css',
          code: `.menu {
  transform-origin: top left;
  transition: transform 180ms ease, opacity 180ms ease;
}

.menu[hidden] {
  opacity: 0;
  transform: scale(0.96);
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A card that lifts on hover',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .card {
        max-width: 20rem;
        padding: 1.5rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
        transition: transform 200ms ease, box-shadow 200ms ease;
      }

      .card:hover,
      .card:focus-within {
        transform: translateY(-6px);
        box-shadow: 0 24px 50px -30px rgb(15 23 42 / 0.55);
      }

      .button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.6rem 1rem;
        border-radius: 0.5rem;
        background-color: #2563eb;
        color: white;
        text-decoration: none;
        transition: background-color 150ms ease, transform 150ms ease;
      }

      .button:hover {
        background-color: #1d4ed8;
        transform: translateY(-1px);
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>Transitions</h1>
      <p>Hover the card or focus the link to see the change.</p>
      <a class="button" href="#details">Read more</a>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Add a reduced-motion escape hatch',
          content:
            'Some people feel dizzy from movement. Wrap non-essential transitions in a `prefers-reduced-motion: no-preference` query, or disable them under `reduce`.',
        },
      ],
      takeaways: [
        'Transitions animate a property when its value changes.',
        'Short durations feel responsive for interface feedback.',
        'Transforms move, scale, and rotate without reflowing the page.',
        '`transform-origin` sets the point a transform works around.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What does a transition need at minimum?',
          options: [
            'A property and a duration',
            'A color and a shadow',
            'A keyframe name',
            'A z-index',
          ],
          answer: 0,
          explanation: 'At minimum, specify which property to animate and how long it should take.',
        },
        {
          id: 'q2',
          question: 'Which function moves an element?',
          options: ['translate()', 'scale()', 'rotate()', 'skew()'],
          answer: 0,
          explanation: 'translate() shifts an element along the x and y axes.',
        },
        {
          id: 'q3',
          question: 'Why animate transform instead of top?',
          options: [
            'Transform avoids layout reflow and is usually smoother',
            'Transform changes the text color',
            'Top cannot be animated',
            'Transform needs no units',
          ],
          answer: 0,
          explanation: 'Transforms are composited, while changing top can trigger layout work.',
        },
        {
          id: 'q4',
          question: 'What does `transform-origin` control?',
          options: [
            'The point a transform is applied around',
            'The element’s text alignment',
            'The transition duration',
            'The stacking order',
          ],
          answer: 0,
          explanation: 'transform-origin sets the anchor point for scaling and rotation.',
        },
      ],
    },
    {
      id: 'keyframe-animations',
      title: 'Keyframe animations',
      summary: 'Run multi-step animations with @keyframes and the animation shorthand.',
      minutes: 12,
      objectives: [
        'Define keyframes with from, to, and percentages',
        'Use the animation shorthand and timing options',
        'Make motion subtle and respectful',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A transition needs a state change. A keyframe animation can run on its own, loop, alternate, and pass through several steps. Use it for small moments such as a loading indicator or a gentle pulse.',
        },
        {
          type: 'concept',
          title: 'Define the keyframes',
          content:
            '`@keyframes` names an animation and describes its steps. `from` and `to` are aliases for 0% and 100%. You can add intermediate percentages for more control.',
          language: 'css',
          caption: 'styles.css',
          code: `@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}`,
        },
        {
          type: 'concept',
          title: 'Apply it with animation',
          content:
            'The `animation` shorthand combines name, duration, timing function, delay, iteration count, direction, and fill mode. `infinite` repeats forever; `alternate` reverses on each cycle.',
          language: 'css',
          caption: 'styles.css',
          code: `.dot {
  animation: pulse 1.4s ease-in-out infinite alternate;
}`,
        },
        {
          type: 'concept',
          title: 'Control the lifecycle',
          content:
            '`animation-fill-mode` keeps the first or last styles after the animation ends. `animation-play-state: paused` pauses it, which is useful for hover-to-pause effects.',
          language: 'css',
          caption: 'styles.css',
          code: `.spinner {
  animation: spin 1s linear infinite;
}

.spinner:hover {
  animation-play-state: paused;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A gentle loading pulse',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 3rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .status {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.75rem 1rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 999px;
      }

      .dot {
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
  </head>
  <body>
    <div class="status">
      <span class="dot"></span>
      <span>Saving changes…</span>
    </div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Motion should explain, not decorate',
          content:
            'A short pulse communicates activity. A spinning logo in the corner distracts. Keep animation purposeful, brief, and easy to disable.',
        },
      ],
      takeaways: [
        '`@keyframes` defines the steps of an animation.',
        'The `animation` shorthand sets name, duration, timing, and repetition.',
        '`alternate` reverses direction each cycle; `infinite` loops forever.',
        '`prefers-reduced-motion` lets you disable non-essential motion.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which rule defines an animation’s steps?',
          options: ['@keyframes', '@media', '@supports', '@font-face'],
          answer: 0,
          explanation: '@keyframes declares the named steps used by an animation.',
        },
        {
          id: 'q2',
          question: 'What does `infinite` do in the animation shorthand?',
          options: [
            'Repeats the animation forever',
            'Runs it once',
            'Pauses it',
            'Reverses it',
          ],
          answer: 0,
          explanation: 'The iteration count of infinite repeats the animation indefinitely.',
        },
        {
          id: 'q3',
          question: 'What does `alternate` do?',
          options: [
            'Reverses direction on each cycle',
            'Changes the color',
            'Adds a delay',
            'Stops after one cycle',
          ],
          answer: 0,
          explanation: 'alternate plays forward, then backward, on alternating cycles.',
        },
        {
          id: 'q4',
          question: 'How can you pause an animation on hover?',
          options: [
            'animation-play-state: paused',
            'display: none',
            'animation: none',
            'transition: none',
          ],
          answer: 0,
          explanation: 'animation-play-state controls whether the animation is running or paused.',
        },
      ],
    },
    {
      id: 'grid-basics',
      title: 'Grid basics',
      summary: 'Build two-dimensional layouts with rows, columns, and gaps.',
      minutes: 13,
      objectives: [
        'Create a grid container and define columns',
        'Use fr, repeat, and minmax for flexible tracks',
        'Place items by line number',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Flexbox arranges items along one axis. Grid arranges them in rows and columns at the same time. If you can sketch the layout as a table, grid is usually the simpler tool.',
        },
        {
          type: 'concept',
          title: 'Define the columns',
          content:
            '`display: grid` turns the element into a grid container. `grid-template-columns` sets the track sizes, and `gap` spaces the cells without extra margins.',
          language: 'css',
          caption: 'styles.css',
          code: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`,
        },
        {
          type: 'concept',
          title: 'Flexible tracks with fr and minmax',
          content:
            'The `fr` unit shares leftover space. `minmax()` sets a minimum and maximum track size, and `auto-fit` with `minmax()` creates a responsive grid without media queries.',
          language: 'css',
          caption: 'styles.css',
          code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}`,
        },
        {
          type: 'concept',
          title: 'Place items on the grid',
          content:
            'Grid lines are numbered from 1. `grid-column` and `grid-row` place an item between lines, and `span` lets it cover several tracks.',
          language: 'css',
          caption: 'styles.css',
          code: `.featured {
  grid-column: 1 / span 2;
}

.wide {
  grid-column: 1 / -1;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A responsive card grid',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
        gap: 1rem;
      }

      .card {
        padding: 1.25rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
      }

      .card h2 {
        margin: 0 0 0.35rem;
        font-size: 1rem;
      }

      .card p {
        margin: 0;
        color: #64748b;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .featured {
        grid-column: 1 / -1;
        background-color: #0f172a;
        color: white;
      }

      .featured p {
        color: #cbd5e1;
      }
    </style>
  </head>
  <body>
    <section class="cards">
      <article class="card featured">
        <h2>Featured</h2>
        <p>This card spans the full row.</p>
      </article>
      <article class="card"><h2>Columns</h2><p>Auto-fit creates as many as fit.</p></article>
      <article class="card"><h2>Gaps</h2><p>One gap value spaces every cell.</p></article>
      <article class="card"><h2>Tracks</h2><p>fr shares the leftover space.</p></article>
    </section>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Grid for two axes, flex for one',
          content:
            'Use grid when rows and columns both matter. Use flex when you are arranging a single row or column and want the content to decide the sizes.',
        },
      ],
      takeaways: [
        '`display: grid` creates a two-dimensional layout.',
        '`grid-template-columns` defines the column tracks.',
        '`fr` shares free space; `minmax()` sets track limits.',
        '`grid-column: 1 / -1` spans the full row.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which declaration creates a grid container?',
          options: ['display: grid', 'display: flex', 'grid: row', 'position: grid'],
          answer: 0,
          explanation: 'display: grid turns the element into a grid container.',
        },
        {
          id: 'q2',
          question: 'What does the `fr` unit do?',
          options: [
            'Shares leftover space between tracks',
            'Sets a fixed pixel width',
            'Adds a frame around items',
            'Repeats a track',
          ],
          answer: 0,
          explanation: 'fr distributes the available free space.',
        },
        {
          id: 'q3',
          question: 'What does `grid-column: 1 / -1` do?',
          options: [
            'Spans the item across the full row',
            'Places it in the first cell only',
            'Removes it from the grid',
            'Creates a new column',
          ],
          answer: 0,
          explanation: 'The -1 line refers to the last column line, so the item spans the row.',
        },
        {
          id: 'q4',
          question: 'Which pattern creates a responsive grid without media queries?',
          options: [
            'repeat(auto-fit, minmax(14rem, 1fr))',
            'repeat(3, 100px)',
            'grid-auto-flow: column',
            'display: block',
          ],
          answer: 0,
          explanation: 'auto-fit with minmax lets the grid add or remove columns as space allows.',
        },
      ],
    },
    {
      id: 'grid-areas',
      title: 'Grid areas',
      summary: 'Sketch a layout with named areas and rearrange it responsively.',
      minutes: 12,
      objectives: [
        'Describe a layout with grid-template-areas',
        'Assign elements with grid-area',
        'Rearrange areas at a wider breakpoint',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Named grid areas let you draw the layout as text. Instead of counting lines, you write a small map, then assign each element to a name. The result is easier to read and easier to change.',
        },
        {
          type: 'concept',
          title: 'Draw the layout',
          content:
            '`grid-template-areas` takes one string per row. Each word names a cell, and repeating a name makes an area span cells. A dot represents an empty cell.',
          language: 'css',
          caption: 'styles.css',
          code: `.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 14rem 1fr;
  gap: 1rem;
}`,
        },
        {
          type: 'concept',
          title: 'Assign each element',
          content:
            'Give each child a `grid-area` that matches a name in the template. The element then fills that area, no matter where it appears in the markup.',
          language: 'css',
          caption: 'styles.css',
          code: `.layout > header {
  grid-area: header;
}

.layout > aside {
  grid-area: sidebar;
}

.layout > main {
  grid-area: main;
}

.layout > footer {
  grid-area: footer;
}`,
        },
        {
          type: 'concept',
          title: 'Rearrange for small screens',
          content:
            'Redefine the template inside a media query to stack the same markup differently. The HTML stays unchanged, which keeps the document order meaningful.',
          language: 'css',
          caption: 'styles.css',
          code: `.layout {
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .layout {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 14rem 1fr;
  }
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A page layout with named areas',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 1rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .layout {
        display: grid;
        grid-template-areas:
          "header"
          "main"
          "sidebar"
          "footer";
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .layout > * {
        padding: 1rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 0.75rem;
      }

      header { grid-area: header; }
      main { grid-area: main; }
      aside { grid-area: sidebar; }
      footer { grid-area: footer; }

      @media (min-width: 48rem) {
        .layout {
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          grid-template-columns: 14rem 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="layout">
      <header><strong>Site header</strong></header>
      <main><h1>Main content</h1><p>Resize the preview to see the areas rearrange.</p></main>
      <aside>Sidebar</aside>
      <footer>Footer</footer>
    </div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Name areas by role',
          content:
            'Use names such as `header`, `sidebar`, and `main` rather than `left` or `top`. Roles survive a redesign; visual positions do not.',
        },
      ],
      takeaways: [
        '`grid-template-areas` draws the layout as rows of names.',
        '`grid-area` assigns an element to a named area.',
        'A media query can rearrange the same markup.',
        'Area names describe roles, not positions.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What does `grid-template-areas` describe?',
          options: [
            'A layout map of named cells',
            'A list of colors',
            'A font stack',
            'A transition duration',
          ],
          answer: 0,
          explanation: 'Each string is a row, and repeated names form larger areas.',
        },
        {
          id: 'q2',
          question: 'How do you place an element in a named area?',
          options: ['grid-area: header', 'grid-row: header', 'area: header', 'place: header'],
          answer: 0,
          explanation: 'The grid-area property accepts the area name.',
        },
        {
          id: 'q3',
          question: 'Why rearrange areas in a media query?',
          options: [
            'To change layout without changing the HTML',
            'To load a new font',
            'To remove the grid',
            'To add JavaScript',
          ],
          answer: 0,
          explanation: 'The same markup can stack on small screens and form columns on wide ones.',
        },
        {
          id: 'q4',
          question: 'What does a dot in a template area represent?',
          options: ['An empty cell', 'A header', 'A gap color', 'A border'],
          answer: 0,
          explanation: 'A dot leaves that grid cell empty.',
        },
      ],
    },
    {
      id: 'forms-and-inputs',
      title: 'Styling forms and inputs',
      summary: 'Make form controls clear, consistent, and easy to use.',
      minutes: 12,
      objectives: [
        'Space labels and controls for readability',
        'Style focus, placeholder, and validation states',
        'Use accent-color and appearance carefully',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Forms are where styling meets usability. A pretty input that hides its focus ring or squeezes its label is worse than a plain one that works. Start with spacing, labels, and visible focus.',
        },
        {
          type: 'concept',
          title: 'Labels and spacing',
          content:
            'Stack the label above the control with a small gap. Use a consistent vertical rhythm so the eye can scan the form, and give inputs enough padding to look and feel clickable.',
          language: 'css',
          caption: 'styles.css',
          code: `.field {
  display: grid;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 600;
}

.field input {
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font: inherit;
}`,
        },
        {
          type: 'concept',
          title: 'Focus and placeholder states',
          content:
            'A visible `:focus-visible` ring is essential for keyboard users. Style placeholders subtly, and never use them as the only label — they disappear once the user types.',
          language: 'css',
          caption: 'styles.css',
          code: `input:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

input::placeholder {
  color: #94a3b8;
}`,
        },
        {
          type: 'concept',
          title: 'Native details and validation',
          content:
            '`accent-color` tints checkboxes and radio buttons. `appearance: none` removes native styling, but then you must rebuild every state yourself. Use `:invalid` carefully so empty required fields do not look broken before interaction.',
          language: 'css',
          caption: 'styles.css',
          code: `input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #0f766e;
}

input:user-invalid {
  border-color: #dc2626;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A small accessible form',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      form {
        max-width: 24rem;
        padding: 1.5rem;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-radius: 1rem;
      }

      h1 {
        margin: 0 0 1rem;
        font-size: 1.25rem;
      }

      .field {
        display: grid;
        gap: 0.4rem;
        margin-bottom: 1rem;
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

      input::placeholder {
        color: #94a3b8;
      }

      button {
        width: 100%;
        padding: 0.7rem 1rem;
        border: 0;
        border-radius: 0.5rem;
        background-color: #2563eb;
        color: white;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form>
      <h1>Join the list</h1>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="Ada Lovelace" />
      </div>
      <button type="submit">Subscribe</button>
    </form>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not remove focus without a replacement',
          content:
            '`outline: none` with no replacement makes keyboard navigation invisible. If you dislike the default ring, replace it with a clearer one instead of deleting it.',
        },
      ],
      takeaways: [
        'Stack labels above controls with consistent spacing.',
        'A visible focus ring is required for keyboard users.',
        'Placeholders are hints, not labels.',
        '`accent-color` styles native checkboxes and radios.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Why should a form input keep a visible focus style?',
          options: [
            'So keyboard users can see where they are',
            'So the text is larger',
            'So the form submits faster',
            'So placeholders disappear',
          ],
          answer: 0,
          explanation: 'Focus indicators are essential for keyboard navigation.',
        },
        {
          id: 'q2',
          question: 'What is the problem with using only a placeholder as a label?',
          options: [
            'It disappears once the user types',
            'It cannot be styled',
            'It makes the input disabled',
            'It blocks form submission',
          ],
          answer: 0,
          explanation: 'A visible label remains available after the placeholder is gone.',
        },
        {
          id: 'q3',
          question: 'Which property tints a native checkbox?',
          options: ['accent-color', 'background-color', 'border-color', 'caret-color'],
          answer: 0,
          explanation: 'accent-color sets the accent used by native controls.',
        },
        {
          id: 'q4',
          question: 'What does `font: inherit` do on an input?',
          options: [
            'Makes the control use the surrounding font',
            'Makes the text bold',
            'Disables the input',
            'Loads a web font',
          ],
          answer: 0,
          explanation: 'Form controls do not inherit fonts by default, so font: inherit aligns them with the page.',
        },
      ],
    },
    {
      id: 'buttons-and-states',
      title: 'Buttons and states',
      summary: 'Style buttons that look clickable and respond to every state.',
      minutes: 11,
      objectives: [
        'Reset a native button without losing accessibility',
        'Style hover, active, and disabled states',
        'Keep focus visible and the cursor honest',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A button has more states than a link: rest, hover, active, focus, and disabled. Style them together so the control feels consistent, and make sure the disabled state still looks disabled without disappearing.',
        },
        {
          type: 'concept',
          title: 'Start with a clean base',
          content:
            'Native buttons carry browser styling. Reset the border and background, set `font: inherit`, and add padding. Keep the element a real `button` so keyboard and screen reader behavior stays intact.',
          language: 'css',
          caption: 'styles.css',
          code: `.button {
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #2563eb;
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}`,
        },
        {
          type: 'concept',
          title: 'Hover, active, and disabled',
          content:
            '` :hover` signals interactivity, `:active` gives immediate press feedback, and `:disabled` should reduce contrast and change the cursor. Keep the changes small so the button does not jump.',
          language: 'css',
          caption: 'styles.css',
          code: `.button:hover {
  background-color: #1d4ed8;
}

.button:active {
  transform: translateY(1px);
}

.button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}`,
        },
        {
          type: 'concept',
          title: 'Focus must stay visible',
          content:
            'Use `:focus-visible` for a clear ring. Avoid `outline: none` unless you replace it. A pointer cursor is a hint, not a substitute for a real button element.',
          language: 'css',
          caption: 'styles.css',
          code: `.button:focus-visible {
  outline: 2px solid #1d4ed8;
  outline-offset: 3px;
}

.link-button {
  cursor: pointer;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A button in every state',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .button {
        padding: 0.65rem 1rem;
        border: 0;
        border-radius: 0.5rem;
        background-color: #2563eb;
        color: white;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 150ms ease, transform 150ms ease;
      }

      .button:hover {
        background-color: #1d4ed8;
      }

      .button:active {
        transform: translateY(1px);
      }

      .button:focus-visible {
        outline: 2px solid #1d4ed8;
        outline-offset: 3px;
      }

      .button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .secondary {
        background-color: #e2e8f0;
        color: #0f172a;
      }

      .secondary:hover {
        background-color: #cbd5e1;
      }
    </style>
  </head>
  <body>
    <div class="row">
      <button class="button" type="button">Primary</button>
      <button class="button secondary" type="button">Secondary</button>
      <button class="button" type="button" disabled>Disabled</button>
    </div>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Disabled is not the same as hidden',
          content:
            'A disabled button stays visible so users understand the action exists. If you need to explain why it is unavailable, pair it with helper text.',
        },
      ],
      takeaways: [
        'Reset native button styles, but keep the real button element.',
        'Style hover, active, focus, and disabled states together.',
        '`:focus-visible` keeps keyboard focus obvious.',
        'A disabled button should still be readable.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Why set `font: inherit` on a button?',
          options: [
            'Buttons do not inherit page fonts by default',
            'It makes the button larger',
            'It disables the button',
            'It removes the border',
          ],
          answer: 0,
          explanation: 'Native form controls use their own font unless you inherit it.',
        },
        {
          id: 'q2',
          question: 'Which pseudo-class gives press feedback?',
          options: [':active', ':hover', ':focus-visible', ':disabled'],
          answer: 0,
          explanation: ':active applies while the control is being pressed.',
        },
        {
          id: 'q3',
          question: 'Which cursor value signals a disabled control?',
          options: ['not-allowed', 'pointer', 'text', 'grab'],
          answer: 0,
          explanation: 'not-allowed communicates that the control cannot be used.',
        },
        {
          id: 'q4',
          question: 'What should replace `outline: none` on a button?',
          options: [
            'A visible custom focus style',
            'Nothing',
            'A larger font',
            'A background image',
          ],
          answer: 0,
          explanation: 'Keyboard users still need a clear focus indicator.',
        },
      ],
    },
    {
      id: 'navigation-bars',
      title: 'Navigation bars',
      summary: 'Build a horizontal nav that stays usable as the screen narrows.',
      minutes: 12,
      objectives: [
        'Lay out links with flexbox',
        'Keep a header visible with sticky positioning',
        'Mark the current page and handle small screens',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A navigation bar is a row of links with a clear hierarchy. It needs consistent spacing, a visible current state, and a plan for narrow screens. CSS can handle the layout; the HTML should keep the links in a meaningful order.',
        },
        {
          type: 'concept',
          title: 'A flex row of links',
          content:
            'Use `display: flex` with `gap` for the link row, and `justify-content: space-between` to push a brand and the links apart. Remove the default list styling if you use a list.',
          language: 'css',
          caption: 'styles.css',
          code: `.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav ul {
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}`,
        },
        {
          type: 'concept',
          title: 'A sticky header',
          content:
            '`position: sticky` with `top: 0` keeps the bar visible while scrolling inside the page. Add a background color so content does not show through, and a bottom border to separate it.',
          language: 'css',
          caption: 'styles.css',
          code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
}`,
        },
        {
          type: 'concept',
          title: 'Current page and small screens',
          content:
            'Style the current link with `aria-current="page"` so the visual state matches the semantic state. On narrow screens, let the nav wrap or scroll horizontally instead of overflowing the page.',
          language: 'css',
          caption: 'styles.css',
          code: `.nav a[aria-current="page"] {
  color: #0f766e;
  font-weight: 700;
}

@media (max-width: 32rem) {
  .nav ul {
    flex-wrap: wrap;
    row-gap: 0.5rem;
  }
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A responsive navigation bar',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .site-header {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: white;
        border-bottom: 1px solid #e2e8f0;
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 60rem;
        margin: 0 auto;
        padding: 0.9rem 1.5rem;
      }

      .brand {
        font-weight: 700;
        color: #0f172a;
        text-decoration: none;
      }

      .nav ul {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .nav a {
        color: #475569;
        text-decoration: none;
      }

      .nav a:hover {
        color: #0f172a;
      }

      .nav a[aria-current="page"] {
        color: #0f766e;
        font-weight: 700;
      }

      main {
        padding: 2rem 1.5rem;
        height: 80vh;
      }
    </style>
  </head>
  <body>
    <header class="site-header">
      <nav class="nav" aria-label="Main">
        <a class="brand" href="#top">CodeLearn</a>
        <ul>
          <li><a href="#courses" aria-current="page">Courses</a></li>
          <li><a href="#progress">Progress</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
    <main id="top">
      <h1>Navigation</h1>
      <p>Scroll to see the sticky header.</p>
    </main>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Let the nav wrap before it overflows',
          content:
            '`flex-wrap: wrap` is a simple fix for narrow screens. It keeps every link reachable without hiding navigation behind a script.',
        },
      ],
      takeaways: [
        'Flexbox makes a clean horizontal link row.',
        '`position: sticky` keeps the header visible while scrolling.',
        '`aria-current="page"` marks the current link for people and assistive tech.',
        'Let navigation wrap or scroll instead of overflowing.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which layout is a natural fit for a nav link row?',
          options: ['Flexbox', 'Floats', 'Tables', 'Absolute positioning'],
          answer: 0,
          explanation: 'Flexbox handles a single horizontal row and its spacing cleanly.',
        },
        {
          id: 'q2',
          question: 'What keeps a header visible while scrolling?',
          options: ['position: sticky', 'position: static', 'display: none', 'float: left'],
          answer: 0,
          explanation: 'A sticky element with top: 0 stays at the top of its scroll container.',
        },
        {
          id: 'q3',
          question: 'Which attribute marks the current page link?',
          options: ['aria-current="page"', 'data-page="now"', 'role="link"', 'tabindex="0"'],
          answer: 0,
          explanation: 'aria-current communicates the current item to assistive technology.',
        },
        {
          id: 'q4',
          question: 'What should a nav do on a narrow screen?',
          options: [
            'Wrap or scroll without overflowing',
            'Disappear completely',
            'Overlap the content',
            'Use a tiny font',
          ],
          answer: 0,
          explanation: 'Keeping links reachable matters more than preserving one row.',
        },
      ],
    },
    {
      id: 'custom-properties',
      title: 'Custom properties',
      summary: 'Store reusable values in variables and theme them centrally.',
      minutes: 12,
      objectives: [
        'Define and read custom properties',
        'Understand scope and fallback values',
        'Theme a page with a small set of tokens',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A custom property is a CSS variable. You define it with a name that starts with two dashes, then read it with `var()`. Change the definition once, and every rule that uses it updates.',
        },
        {
          type: 'concept',
          title: 'Define and use a variable',
          content:
            'Custom properties are usually declared on `:root` so they are available everywhere. They inherit like other properties, so a child can read a value set on an ancestor.',
          language: 'css',
          caption: 'styles.css',
          code: `:root {
  --brand: #2563eb;
  --surface: #ffffff;
  --radius: 0.75rem;
}

.card {
  background-color: var(--surface);
  border-radius: var(--radius);
}

.button {
  background-color: var(--brand);
}`,
        },
        {
          type: 'concept',
          title: 'Scope and fallbacks',
          content:
            'A custom property declared on an element is available to that element and its descendants. The second argument to `var()` is a fallback used when the variable is missing.',
          language: 'css',
          caption: 'styles.css',
          code: `.theme-dark {
  --surface: #0f172a;
  --text: #e2e8f0;
}

.panel {
  background-color: var(--surface, white);
  color: var(--text, #0f172a);
}`,
        },
        {
          type: 'concept',
          title: 'Theme with tokens',
          content:
            'Collect colors, spacing, and radii into a small token set. Then swap the token values on a theme class or inside a `prefers-color-scheme` query. Components stay unchanged.',
          language: 'css',
          caption: 'styles.css',
          code: `:root {
  --bg: #f8fafc;
  --text: #0f172a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #e2e8f0;
  }
}

body {
  background-color: var(--bg);
  color: var(--text);
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'A small design-token system',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      :root {
        --bg: #f8fafc;
        --surface: #ffffff;
        --text: #1f2937;
        --muted: #64748b;
        --brand: #2563eb;
        --radius: 0.75rem;
        --space: 1.5rem;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0f172a;
          --surface: #1e293b;
          --text: #e2e8f0;
          --muted: #94a3b8;
          --brand: #60a5fa;
        }
      }

      body {
        margin: 0;
        padding: var(--space);
        background-color: var(--bg);
        color: var(--text);
        font-family: system-ui, sans-serif;
      }

      .card {
        max-width: 22rem;
        padding: var(--space);
        background-color: var(--surface);
        border-radius: var(--radius);
      }

      h1 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        line-height: 1.6;
      }

      a {
        color: var(--brand);
      }
    </style>
  </head>
  <body>
    <article class="card">
      <h1>Theme tokens</h1>
      <p>Switch your system theme to see the same components change.</p>
      <a href="#details">Read more</a>
    </article>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Variables are inherited values',
          content:
            'A custom property is not a magic constant. It inherits, it can be overridden on a subtree, and it can hold almost any value, including a whole shadow or gradient.',
        },
      ],
      takeaways: [
        'Custom properties start with two dashes and are read with `var()`.',
        'Declare shared tokens on `:root`.',
        'Variables inherit, so a subtree can override them.',
        '`var()` accepts a fallback as its second argument.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'How do you read a custom property?',
          options: ['var(--brand)', '$brand', '@brand', 'brand()'],
          answer: 0,
          explanation: 'The var() function reads a custom property by name.',
        },
        {
          id: 'q2',
          question: 'Where are global tokens usually declared?',
          options: [':root', 'body::before', 'html:hover', '@keyframes'],
          answer: 0,
          explanation: ':root matches the document root and makes tokens available everywhere.',
        },
        {
          id: 'q3',
          question: 'What is the second argument to `var()`?',
          options: ['A fallback value', 'A unit', 'A selector', 'A comment'],
          answer: 0,
          explanation: 'The fallback is used when the custom property is not defined.',
        },
        {
          id: 'q4',
          question: 'Why are custom properties useful for theming?',
          options: [
            'Changing a token updates every rule that uses it',
            'They make CSS load faster',
            'They replace HTML',
            'They add JavaScript',
          ],
          answer: 0,
          explanation: 'Tokens centralize values so a theme change happens in one place.',
        },
      ],
    },
    {
      id: 'accessibility-and-focus',
      title: 'Accessibility and focus',
      summary: 'Style for keyboard users, contrast, motion, and target size.',
      minutes: 13,
      objectives: [
        'Keep focus indicators visible on every interactive element',
        'Check contrast and target sizes',
        'Respect reduced-motion and hide content accessibly',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Accessibility is part of styling, not an afterthought. The choices that help disabled users — clear focus, readable contrast, generous targets, calmer motion — usually make the interface better for everyone.',
        },
        {
          type: 'concept',
          title: 'Visible focus for every control',
          content:
            'Keyboard users move through links, buttons, and inputs with Tab. A focus style must be obvious against the surrounding colors. `:focus-visible` keeps the ring for keyboard use without showing it after a mouse click.',
          language: 'css',
          caption: 'styles.css',
          code: `:where(a, button, input, select, textarea):focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
}`,
        },
        {
          type: 'concept',
          title: 'Contrast and target size',
          content:
            'Body text needs enough contrast against its background. Interactive targets should be large enough to hit comfortably; roughly 44 by 44 pixels is a common minimum. Padding is often the easiest way to grow a target.',
          language: 'css',
          caption: 'styles.css',
          code: `.button {
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0.65rem 1rem;
}

.muted {
  color: #475569;
  background-color: #f8fafc;
}`,
        },
        {
          type: 'concept',
          title: 'Motion and hidden content',
          content:
            'Respect `prefers-reduced-motion` for non-essential animation. To hide content visually but keep it available to screen readers, use a clip-based utility rather than `display: none`.',
          language: 'css',
          caption: 'styles.css',
          code: `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}`,
        },
        {
          type: 'code',
          language: 'html',
          caption: 'Focus, targets, and reduced motion together',
          code: `<!doctype html>
<html lang="en">
  <head>
    <style>
      body {
        margin: 0;
        padding: 2rem;
        color: #1f2937;
        background-color: #f8fafc;
        font-family: system-ui, sans-serif;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .button {
        min-height: 2.75rem;
        padding: 0.65rem 1rem;
        border: 0;
        border-radius: 0.5rem;
        background-color: #2563eb;
        color: white;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 200ms ease, transform 200ms ease;
      }

      .button:hover {
        background-color: #1d4ed8;
        transform: translateY(-2px);
      }

      .button:focus-visible {
        outline: 2px solid #1d4ed8;
        outline-offset: 3px;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }

      @media (prefers-reduced-motion: reduce) {
        .button {
          transition: none;
        }

        .button:hover {
          transform: none;
        }
      }
    </style>
  </head>
  <body>
    <h1>Accessible by default</h1>
    <p>Tab through the buttons and watch the focus ring.</p>
    <div class="actions">
      <button class="button" type="button">Save</button>
      <button class="button" type="button">Cancel</button>
    </div>
    <p class="visually-hidden">These actions apply to the current draft.</p>
  </body>
</html>`,
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Test with the keyboard, not just the mouse',
          content:
            'Press Tab through the page. If you lose track of focus, or a control cannot be reached, fix that before polishing colors.',
        },
      ],
      takeaways: [
        'Every interactive element needs a visible focus state.',
        'Contrast and target size affect real usability.',
        'Respect `prefers-reduced-motion` for non-essential motion.',
        '`display: none` hides content from everyone; use a visually-hidden utility when screen readers still need it.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which selector keeps a focus ring for keyboard users?',
          options: [':focus-visible', ':hover', ':active', ':disabled'],
          answer: 0,
          explanation: ':focus-visible matches when the browser determines focus should be visible.',
        },
        {
          id: 'q2',
          question: 'What is a common minimum target size?',
          options: ['About 44 by 44 pixels', 'About 4 by 4 pixels', 'About 200 by 200 pixels', 'Exactly 10 by 10 pixels'],
          answer: 0,
          explanation: 'A target around 44 by 44 pixels is comfortably clickable for most people.',
        },
        {
          id: 'q3',
          question: 'Which media query respects reduced motion?',
          options: [
            'prefers-reduced-motion: reduce',
            'prefers-color-scheme: dark',
            'min-width: 48rem',
            'orientation: landscape',
          ],
          answer: 0,
          explanation: 'prefers-reduced-motion reports whether the user asked for less motion.',
        },
        {
          id: 'q4',
          question: 'Why avoid `display: none` for screen-reader-only text?',
          options: [
            'It removes the content from assistive technology too',
            'It makes the text too large',
            'It changes the font',
            'It adds a scrollbar',
          ],
          answer: 0,
          explanation: 'display: none hides the content from everyone; a visually-hidden utility keeps it announced.',
        },
      ],
    },
  ],
}
