import type { CodeChallengeSection } from '../types'

/**
 * Full-snippet challenges for the Monaco editor. Every HTML lesson has at
 * least one challenge, and the original five lessons have a second challenge
 * that covers another important idea from the lesson.
 */
export const htmlCodeChallenges: Record<string, CodeChallengeSection[]> = {
  'how-html-works': [
    {
      type: 'code-challenge',
      title: 'Build a heading and a paragraph',
      instructions: 'Write two paired elements with content between their tags.',
      prompt: 'Create an h1 that says "My first page" and a p that says "HTML is structure."',
      starterCode: '<!-- Create an h1 and a p -->\n',
      language: 'html',
      solution: '<h1>My first page</h1>\n<p>HTML is structure.</p>',
      hint: 'h1 and p both need an opening tag, content, and a closing tag.',
      checks: [
        {
          kind: 'element',
          selector: 'h1',
          text: 'My first page',
          message: 'You created an h1 with the right text.',
        },
        {
          kind: 'element',
          selector: 'p',
          text: 'HTML is structure.',
          message: 'You created a p with the right text.',
        },
      ],
    },
  ],

  'document-structure': [
    {
      type: 'code-challenge',
      title: 'Build a page with metadata',
      instructions: 'Write the doctype, html, head, and body for a complete page.',
      prompt:
        'Create a page with lang="en", a charset and viewport meta tag, a title "My first page", an h1 "Hello!", and a paragraph "This is my first page."',
      starterCode: '<!-- Build a complete page shell -->\n',
      language: 'html',
      solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello!</h1>
    <p>This is my first page.</p>
  </body>
</html>`,
      hint: 'Start with <!DOCTYPE html>, then html, head, and body. Put meta and title in the head.',
      checks: [
        {
          kind: 'doctype',
          name: 'html',
          message: 'The page starts with <!DOCTYPE html>.',
        },
        {
          kind: 'element',
          selector: 'html',
          attributes: { lang: 'en' },
          message: 'The html element declares lang="en".',
        },
        {
          kind: 'element',
          selector: 'meta[charset="UTF-8"]',
          message: 'The head sets the character encoding to UTF-8.',
        },
        {
          kind: 'element',
          selector: 'meta[name="viewport"]',
          attributes: { content: 'width=device-width, initial-scale=1.0' },
          message: 'The head includes the mobile viewport setting.',
        },
        {
          kind: 'element',
          selector: 'head title',
          text: 'My first page',
          message: 'The title says "My first page".',
        },
        {
          kind: 'element',
          selector: 'body h1',
          text: 'Hello!',
          message: 'The body contains an h1 that says "Hello!".',
        },
        {
          kind: 'element',
          selector: 'body p',
          text: 'This is my first page.',
          message: 'The body contains the intro paragraph.',
        },
      ],
    },
  ],

  'text-and-headings': [
    {
      type: 'code-challenge',
      title: 'Build a short article',
      instructions: 'Combine headings, paragraphs, emphasis, a quote, and a code block.',
      prompt:
        'Create an article with an h1 "Learning HTML", an h2 "Text basics", a paragraph containing strong "Structure first." and em "every", a blockquote with a p "Good design is as little design as possible." and a cite "Design notes", and a pre with code that says const name = "Ada";.',
      starterCode: '<!-- Build a short article with text elements -->\n',
      language: 'html',
      solution: `<article>
  <h1>Learning HTML</h1>
  <h2>Text basics</h2>
  <p><strong>Structure first.</strong> A clear outline helps <em>every</em> reader.</p>
  <blockquote>
    <p>Good design is as little design as possible.</p>
  </blockquote>
  <p><cite>Design notes</cite></p>
  <pre><code>const name = "Ada";</code></pre>
</article>`,
      hint: 'Headings create the outline. strong and em go inside a paragraph. pre keeps the code spacing.',
      checks: [
        {
          kind: 'element',
          selector: 'article h1',
          text: 'Learning HTML',
          message: 'The article has the main heading.',
        },
        {
          kind: 'element',
          selector: 'article h2',
          text: 'Text basics',
          message: 'The article has a section heading.',
        },
        {
          kind: 'element',
          selector: 'p strong',
          text: 'Structure first.',
          message: 'strong marks the important words.',
        },
        {
          kind: 'element',
          selector: 'p em',
          text: 'every',
          message: 'em marks the emphasized word.',
        },
        {
          kind: 'element',
          selector: 'blockquote p',
          text: 'Good design is as little design as possible.',
          message: 'The blockquote contains the quotation.',
        },
        {
          kind: 'element',
          selector: 'cite',
          text: 'Design notes',
          message: 'The cite element names the source.',
        },
        {
          kind: 'element',
          selector: 'pre code',
          text: 'const name = "Ada";',
          message: 'The pre and code elements show the code sample.',
        },
      ],
    },
  ],

  lists: [
    {
      type: 'code-challenge',
      title: 'Build a recipe and a glossary',
      instructions: 'Use unordered, ordered, and description lists.',
      prompt:
        'Create an h1 "Make tea", an h2 "Ingredients" with a ul of "Tea bag", "Hot water", and "Milk", an h2 "Steps" with an ol of "Boil the water.", "Add the tea bag.", and "Pour the water.", and a dl with dt "Steep" and dd "Leave the tea in hot water."',
      starterCode: '<!-- Build a recipe and a glossary -->\n',
      language: 'html',
      solution: `<h1>Make tea</h1>
<h2>Ingredients</h2>
<ul>
  <li>Tea bag</li>
  <li>Hot water</li>
  <li>Milk</li>
</ul>
<h2>Steps</h2>
<ol>
  <li>Boil the water.</li>
  <li>Add the tea bag.</li>
  <li>Pour the water.</li>
</ol>
<h2>Tea terms</h2>
<dl>
  <dt>Steep</dt>
  <dd>Leave the tea in hot water.</dd>
</dl>`,
      hint: 'ul is for ingredients, ol is for steps, and dl uses dt/dd for terms and descriptions.',
      checks: [
        {
          kind: 'element',
          selector: 'h1',
          text: 'Make tea',
          message: 'The page has a main heading.',
        },
        {
          kind: 'element',
          selector: 'ul li:nth-child(1)',
          text: 'Tea bag',
          message: 'The unordered list starts with the tea bag.',
        },
        {
          kind: 'element',
          selector: 'ul li:nth-child(2)',
          text: 'Hot water',
          message: 'The unordered list includes hot water.',
        },
        {
          kind: 'element',
          selector: 'ul li:nth-child(3)',
          text: 'Milk',
          message: 'The unordered list ends with milk.',
        },
        {
          kind: 'element',
          selector: 'ol li:nth-child(1)',
          text: 'Boil the water.',
          message: 'The ordered list starts with boiling the water.',
        },
        {
          kind: 'element',
          selector: 'ol li:nth-child(2)',
          text: 'Add the tea bag.',
          message: 'The ordered list adds the tea bag second.',
        },
        {
          kind: 'element',
          selector: 'ol li:nth-child(3)',
          text: 'Pour the water.',
          message: 'The ordered list ends with pouring the water.',
        },
        {
          kind: 'element',
          selector: 'dl dt',
          text: 'Steep',
          message: 'The description list has the term "Steep".',
        },
        {
          kind: 'element',
          selector: 'dl dd',
          text: 'Leave the tea in hot water.',
          message: 'The description list explains "Steep".',
        },
      ],
    },
  ],

  'links-and-navigation': [
    {
      type: 'code-challenge',
      title: 'Build a link',
      instructions: 'Write a complete anchor element from scratch.',
      prompt: 'Create a link to https://example.com with the text "Visit example.com".',
      starterCode:
        '<!-- Write a link to https://example.com with the text "Visit example.com" -->\n',
      language: 'html',
      solution: '<a href="https://example.com">Visit example.com</a>',
      hint: 'The anchor opens with <a href="..."> and closes with </a>.',
      checks: [
        {
          kind: 'element',
          selector: 'a',
          message: 'You created an anchor element.',
        },
        {
          kind: 'element',
          selector: 'a',
          attributes: { href: 'https://example.com' },
          message: 'The href points to https://example.com.',
        },
        {
          kind: 'element',
          selector: 'a',
          text: 'Visit example.com',
          message: 'The link text says "Visit example.com".',
        },
      ],
    },
    {
      type: 'code-challenge',
      title: 'Build a safe external link',
      instructions: 'Open a link in a new tab without giving the new page access to your page.',
      prompt:
        'Create an anchor to https://example.com that says "Open Example in a new tab", opens in a new tab, and uses rel="noopener noreferrer".',
      starterCode: '<!-- Build a safe external link -->\n',
      language: 'html',
      solution:
        '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Open Example in a new tab</a>',
      hint: 'target="_blank" opens a new tab. Add rel="noopener noreferrer" for safety.',
      checks: [
        {
          kind: 'element',
          selector: 'a',
          attributes: { href: 'https://example.com' },
          message: 'The href points to https://example.com.',
        },
        {
          kind: 'element',
          selector: 'a',
          attributes: { target: '_blank' },
          message: 'The link opens in a new tab.',
        },
        {
          kind: 'element',
          selector: 'a',
          attributes: { rel: 'noopener noreferrer' },
          message: 'The rel attribute protects the original page.',
        },
        {
          kind: 'element',
          selector: 'a',
          text: 'Open Example in a new tab',
          message: 'The link text explains the destination.',
        },
      ],
    },
  ],

  'images-and-figures': [
    {
      type: 'code-challenge',
      title: 'Build an accessible image',
      instructions: 'Write a complete image element from scratch.',
      prompt: 'Add an image with src="/images/cat.jpg" and alt text "A cat sleeping".',
      starterCode:
        '<!-- Add an image with src="/images/cat.jpg" and alt text "A cat sleeping" -->\n',
      language: 'html',
      solution: '<img src="/images/cat.jpg" alt="A cat sleeping">',
      hint: 'img is a void element. It uses src and alt, but no closing tag.',
      checks: [
        {
          kind: 'element',
          selector: 'img',
          message: 'You created an img element.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { src: '/images/cat.jpg' },
          message: 'The src points to /images/cat.jpg.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { alt: 'A cat sleeping' },
          message: 'The alt text describes the image.',
        },
      ],
    },
    {
      type: 'code-challenge',
      title: 'Build a figure with a caption',
      instructions: 'Group an image with a visible caption.',
      prompt:
        'Create a figure containing an img with src="/images/bridge.jpg" and alt "A steel bridge at sunset", plus a figcaption that says "The bridge at sunset."',
      starterCode: '<!-- Build a figure with an image and caption -->\n',
      language: 'html',
      solution: `<figure>
  <img src="/images/bridge.jpg" alt="A steel bridge at sunset">
  <figcaption>The bridge at sunset.</figcaption>
</figure>`,
      hint: 'The img and figcaption both go inside the figure.',
      checks: [
        {
          kind: 'element',
          selector: 'figure img',
          attributes: { src: '/images/bridge.jpg' },
          message: 'The figure contains the bridge image.',
        },
        {
          kind: 'element',
          selector: 'figure img',
          attributes: { alt: 'A steel bridge at sunset' },
          message: 'The image has useful alt text.',
        },
        {
          kind: 'element',
          selector: 'figure figcaption',
          text: 'The bridge at sunset.',
          message: 'The figure has a visible caption.',
        },
      ],
    },
  ],

  forms: [
    {
      type: 'code-challenge',
      title: 'Build a labeled email field',
      instructions: 'Write a label and an email input that are connected.',
      prompt:
        'Create a label that says "Email" and points to an input with id="email" and type="email".',
      starterCode:
        '<!-- Create a label for "Email" and an email input with id="email" -->\n',
      language: 'html',
      solution: '<label for="email">Email</label>\n<input id="email" type="email">',
      hint: 'Use label for="email" and input id="email" type="email".',
      checks: [
        {
          kind: 'element',
          selector: 'label',
          attributes: { for: 'email' },
          text: 'Email',
          message: 'The label says "Email" and points to the email input.',
        },
        {
          kind: 'element',
          selector: 'input#email',
          attributes: { type: 'email' },
          message: 'The input has id="email" and type="email".',
        },
      ],
    },
    {
      type: 'code-challenge',
      title: 'Build a grouped choice',
      instructions: 'Group radio buttons with a fieldset and legend.',
      prompt:
        'Create a fieldset with a legend "Contact preference" and two radio inputs named "contact": one value "email" with the label "Email", and one value "phone" with the label "Phone".',
      starterCode: '<!-- Build a grouped radio choice -->\n',
      language: 'html',
      solution: `<fieldset>
  <legend>Contact preference</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>`,
      hint: 'Use fieldset and legend for the group. Both radios share the same name.',
      checks: [
        {
          kind: 'element',
          selector: 'fieldset legend',
          text: 'Contact preference',
          message: 'The legend names the group.',
        },
        {
          kind: 'element',
          selector: 'input[type="radio"][name="contact"][value="email"]',
          message: 'The first radio is the email choice.',
        },
        {
          kind: 'element',
          selector: 'input[type="radio"][name="contact"][value="phone"]',
          message: 'The second radio is the phone choice.',
        },
        {
          kind: 'element',
          selector: 'fieldset label:nth-of-type(1)',
          text: 'Email',
          message: 'The first radio has the label "Email".',
        },
        {
          kind: 'element',
          selector: 'fieldset label:nth-of-type(2)',
          text: 'Phone',
          message: 'The second radio has the label "Phone".',
        },
      ],
    },
  ],

  tables: [
    {
      type: 'code-challenge',
      title: 'Build a course table',
      instructions: 'Create an accessible table with headers, data, and a summary row.',
      prompt:
        'Create a table with caption "Course progress", a header row with th scope="col" for "Course" and "Lessons done", a body row with th scope="row" "HTML" and td "8", and a tfoot row with td colspan="2" "Total lessons done" and td "8".',
      starterCode: '<!-- Build an accessible course table -->\n',
      language: 'html',
      solution: `<table>
  <caption>Course progress</caption>
  <thead>
    <tr>
      <th scope="col">Course</th>
      <th scope="col">Lessons done</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">HTML</th>
      <td>8</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total lessons done</td>
      <td>8</td>
    </tr>
  </tfoot>
</table>`,
      hint: 'caption goes first. Use th for headers, td for data, and colspan for the summary label.',
      checks: [
        {
          kind: 'element',
          selector: 'table caption',
          text: 'Course progress',
          message: 'The table has a caption.',
        },
        {
          kind: 'element',
          selector: 'thead th:nth-child(1)',
          attributes: { scope: 'col' },
          text: 'Course',
          message: 'The first column header is "Course".',
        },
        {
          kind: 'element',
          selector: 'thead th:nth-child(2)',
          attributes: { scope: 'col' },
          text: 'Lessons done',
          message: 'The second column header is "Lessons done".',
        },
        {
          kind: 'element',
          selector: 'tbody th',
          attributes: { scope: 'row' },
          text: 'HTML',
          message: 'The row header names the course.',
        },
        {
          kind: 'element',
          selector: 'tbody td',
          text: '8',
          message: 'The data cell shows 8 lessons done.',
        },
        {
          kind: 'element',
          selector: 'tfoot td[colspan="2"]',
          text: 'Total lessons done',
          message: 'The summary label spans both columns.',
        },
        {
          kind: 'element',
          selector: 'tfoot td:nth-child(2)',
          text: '8',
          message: 'The summary row shows the total.',
        },
      ],
    },
  ],

  'semantic-html': [
    {
      type: 'code-challenge',
      title: 'Build a page layout with landmarks',
      instructions: 'Use semantic elements instead of generic divs.',
      prompt:
        'Create a page body with a header containing an h1 "CodeLearn" and a nav with a link "Home" (href="/"), a main containing an article with an h2 "Why semantics matter" and a p "Structure communicates meaning.", an aside with a p "Tip: use landmarks.", and a footer with a p "Built for curious people."',
      starterCode: '<!-- Build a semantic page layout -->\n',
      language: 'html',
      solution: `<header>
  <h1>CodeLearn</h1>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h2>Why semantics matter</h2>
    <p>Structure communicates meaning.</p>
  </article>
  <aside>
    <p>Tip: use landmarks.</p>
  </aside>
</main>
<footer>
  <p>Built for curious people.</p>
</footer>`,
      hint: 'Use header, nav, main, article, aside, and footer. Do not wrap everything in divs.',
      checks: [
        {
          kind: 'element',
          selector: 'header h1',
          text: 'CodeLearn',
          message: 'The header contains the site heading.',
        },
        {
          kind: 'element',
          selector: 'header nav a',
          attributes: { href: '/' },
          text: 'Home',
          message: 'The navigation contains a home link.',
        },
        {
          kind: 'element',
          selector: 'main article h2',
          text: 'Why semantics matter',
          message: 'The main content contains the article heading.',
        },
        {
          kind: 'element',
          selector: 'main article p',
          text: 'Structure communicates meaning.',
          message: 'The article contains the explanation.',
        },
        {
          kind: 'element',
          selector: 'main aside p',
          text: 'Tip: use landmarks.',
          message: 'The aside contains the secondary tip.',
        },
        {
          kind: 'element',
          selector: 'footer p',
          text: 'Built for curious people.',
          message: 'The footer closes the page.',
        },
      ],
    },
  ],

  'divs-spans-grouping': [
    {
      type: 'code-challenge',
      title: 'Build a card',
      instructions: 'Write a small card with a heading and a paragraph.',
      prompt:
        'Create a div with class="card". Inside it, add an h2 that says "Weekly plan" and a p that says "Learn HTML one tag at a time."',
      starterCode: '<!-- Build a div.card with an h2 and a p -->\n',
      language: 'html',
      solution:
        '<div class="card">\n  <h2>Weekly plan</h2>\n  <p>Learn HTML one tag at a time.</p>\n</div>',
      hint: 'The div wraps the h2 and p. Give the div class="card".',
      checks: [
        {
          kind: 'element',
          selector: 'div.card',
          message: 'You created a div with class="card".',
        },
        {
          kind: 'element',
          selector: 'div.card h2',
          text: 'Weekly plan',
          message: 'The card heading says "Weekly plan".',
        },
        {
          kind: 'element',
          selector: 'div.card p',
          text: 'Learn HTML one tag at a time.',
          message: 'The card paragraph says "Learn HTML one tag at a time."',
        },
      ],
    },
    {
      type: 'code-challenge',
      title: 'Highlight one word with span',
      instructions: 'Use an inline span inside a paragraph to target one word.',
      prompt:
        'Create a paragraph that says "Status: " followed by a span with class="status-complete" that says "Complete".',
      starterCode: '<!-- Use a span for one word -->\n',
      language: 'html',
      solution: '<p>Status: <span class="status-complete">Complete</span></p>',
      hint: 'span is inline. Put it inside the p around the word Complete.',
      checks: [
        {
          kind: 'element',
          selector: 'p span',
          attributes: { class: 'status-complete' },
          text: 'Complete',
          message: 'The span targets the word Complete with the class.',
        },
        {
          kind: 'element',
          selector: 'p',
          text: 'Status: Complete',
          message: 'The paragraph keeps the text together.',
        },
      ],
    },
  ],

  'head-and-metadata': [
    {
      type: 'code-challenge',
      title: 'Build a complete head',
      instructions:
        'Add the metadata and linked files a page needs. The preview stays blank because head content is not visible.',
      prompt:
        'Create a head with meta charset="UTF-8", a viewport meta tag with content="width=device-width, initial-scale=1.0", a title "My page", a meta description "A beginner HTML page.", a stylesheet link to /styles.css, a favicon link to /favicon.svg with type="image/svg+xml", and a script src="/app.js" with defer.',
      starterCode: '<!-- Build a complete head -->\n',
      language: 'html',
      solution: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My page</title>
  <meta name="description" content="A beginner HTML page.">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="/app.js" defer></script>
</head>`,
      hint: 'meta and link are void elements. The script needs a closing tag and defer.',
      checks: [
        {
          kind: 'element',
          selector: 'meta[charset="UTF-8"]',
          message: 'The head sets the character encoding.',
        },
        {
          kind: 'element',
          selector: 'meta[name="viewport"]',
          attributes: { content: 'width=device-width, initial-scale=1.0' },
          message: 'The viewport meta tag fits the page to the device.',
        },
        {
          kind: 'element',
          selector: 'head title',
          text: 'My page',
          message: 'The title says "My page".',
        },
        {
          kind: 'element',
          selector: 'meta[name="description"]',
          attributes: { content: 'A beginner HTML page.' },
          message: 'The description summarises the page.',
        },
        {
          kind: 'element',
          selector: 'link[rel="stylesheet"]',
          attributes: { href: '/styles.css' },
          message: 'The stylesheet link loads /styles.css.',
        },
        {
          kind: 'element',
          selector: 'link[rel="icon"]',
          attributes: { href: '/favicon.svg', type: 'image/svg+xml' },
          message: 'The favicon link points to the SVG icon.',
        },
        {
          kind: 'element',
          selector: 'script[src="/app.js"]',
          attributes: { defer: '' },
          message: 'The script loads /app.js with defer.',
        },
      ],
    },
  ],

  media: [
    {
      type: 'code-challenge',
      title: 'Build a captioned video',
      instructions: 'Add a video with controls, an MP4 source, and English captions.',
      prompt:
        'Create a video with controls, a source src="/media/lesson.mp4" type="video/mp4", and a track with kind="captions", src="/media/lesson-en.vtt", srclang="en", label="English captions", and default.',
      starterCode: '<!-- Build a captioned video -->\n',
      language: 'html',
      solution: `<video controls>
  <source src="/media/lesson.mp4" type="video/mp4">
  <track kind="captions" src="/media/lesson-en.vtt" srclang="en" label="English captions" default>
</video>`,
      hint: 'source and track go inside video. The video element needs a closing tag.',
      checks: [
        {
          kind: 'element',
          selector: 'video',
          attributes: { controls: '' },
          message: 'The video has playback controls.',
        },
        {
          kind: 'element',
          selector: 'video source',
          attributes: { src: '/media/lesson.mp4', type: 'video/mp4' },
          message: 'The video has an MP4 source.',
        },
        {
          kind: 'element',
          selector: 'video track',
          attributes: { kind: 'captions' },
          message: 'The track is marked as captions.',
        },
        {
          kind: 'element',
          selector: 'video track',
          attributes: { src: '/media/lesson-en.vtt' },
          message: 'The track points to the captions file.',
        },
        {
          kind: 'element',
          selector: 'video track',
          attributes: { srclang: 'en', label: 'English captions' },
          message: 'The track names the language.',
        },
        {
          kind: 'element',
          selector: 'video track',
          attributes: { default: '' },
          message: 'The captions are the default track.',
        },
      ],
    },
  ],

  accessibility: [
    {
      type: 'code-challenge',
      title: 'Build an accessible sign-up section',
      instructions: 'Add a skip link, a main landmark, a labelled form, and meaningful alt text.',
      prompt:
        'Create a skip link to #main-content that says "Skip to main content", a main with id="main-content" containing an h1 "Join the course", a form with a label "Email address" connected to an input id="email" type="email", and an img src="/images/chart.png" with alt "Course completion rose from 40% to 75%".',
      starterCode: '<!-- Build an accessible section -->\n',
      language: 'html',
      solution: `<a class="skip-link" href="#main-content">Skip to main content</a>
<main id="main-content">
  <h1>Join the course</h1>
  <form>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email">
  </form>
  <img src="/images/chart.png" alt="Course completion rose from 40% to 75%">
</main>`,
      hint: 'The skip link href must match main id. label for must match input id.',
      checks: [
        {
          kind: 'element',
          selector: 'a[href="#main-content"]',
          text: 'Skip to main content',
          message: 'The skip link jumps to the main content.',
        },
        {
          kind: 'element',
          selector: 'main#main-content h1',
          text: 'Join the course',
          message: 'The main landmark has the page heading.',
        },
        {
          kind: 'element',
          selector: 'label[for="email"]',
          text: 'Email address',
          message: 'The label names the email field.',
        },
        {
          kind: 'element',
          selector: 'input#email',
          attributes: { type: 'email' },
          message: 'The email input is connected to the label.',
        },
        {
          kind: 'element',
          selector: 'main img',
          attributes: {
            src: '/images/chart.png',
            alt: 'Course completion rose from 40% to 75%',
          },
          message: 'The image has meaningful alt text.',
        },
      ],
    },
  ],

  'responsive-html': [
    {
      type: 'code-challenge',
      title: 'Build a responsive image',
      instructions: 'Prepare an image for phones and high-density screens.',
      prompt:
        'Create a viewport meta tag, then an img with src="/images/photo-800.jpg", srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w, /images/photo-1600.jpg 1600w", sizes="(min-width: 800px) 50vw, 100vw", alt "A mountain trail", width="800", and height="600".',
      starterCode: '<!-- Build a responsive image -->\n',
      language: 'html',
      solution: `<meta name="viewport" content="width=device-width, initial-scale=1.0">
<img
  src="/images/photo-800.jpg"
  srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w, /images/photo-1600.jpg 1600w"
  sizes="(min-width: 800px) 50vw, 100vw"
  alt="A mountain trail"
  width="800"
  height="600"
>`,
      hint: 'srcset lists the files and their widths. sizes tells the browser how wide the image will be.',
      checks: [
        {
          kind: 'element',
          selector: 'meta[name="viewport"]',
          attributes: { content: 'width=device-width, initial-scale=1.0' },
          message: 'The page tells phones to use their real width.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { src: '/images/photo-800.jpg' },
          message: 'The image has a default file.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: {
            srcset:
              '/images/photo-400.jpg 400w, /images/photo-800.jpg 800w, /images/photo-1600.jpg 1600w',
          },
          message: 'The srcset offers three image sizes.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { sizes: '(min-width: 800px) 50vw, 100vw' },
          message: 'The sizes attribute describes the image width.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { alt: 'A mountain trail' },
          message: 'The image has alt text.',
        },
        {
          kind: 'element',
          selector: 'img',
          attributes: { width: '800', height: '600' },
          message: 'The width and height reserve space.',
        },
      ],
    },
  ],

  'validation-and-debugging': [
    {
      type: 'code-challenge',
      title: 'Fix the broken markup',
      instructions: 'Repair the list, the invalid nesting, and the duplicate id.',
      prompt:
        'Fix the snippet: close each list item, move the note div out of the paragraph, and change the second id="progress" to id="progress-note".',
      starterCode: `<!-- Fix this snippet:
     1. Close each list item.
     2. Move the note div out of the paragraph.
     3. Change the second progress id to progress-note.
-->
<ul>
  <li>HTML
  <li>CSS
</ul>

<p>Intro <div class="note">Note</div></p>

<h2 id="progress">Progress</h2>
<p id="progress">You are here.</p>`,
      language: 'html',
      solution: `<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<p>Intro</p>
<div class="note">Note</div>

<h2 id="progress">Progress</h2>
<p id="progress-note">You are here.</p>`,
      hint: 'Close each li. Put the note div after the paragraph. Give the second element a different id.',
      checks: [
        {
          kind: 'source',
          patterns: ['<li>\\s*HTML\\s*</li\\s*>'],
          message: 'The first list item has a closing tag.',
        },
        {
          kind: 'source',
          patterns: ['<li>\\s*CSS\\s*</li\\s*>'],
          message: 'The second list item has a closing tag.',
        },
        {
          kind: 'source',
          notPatterns: ['<p>\\s*Intro\\s*<div'],
          message: 'The note div is no longer inside the paragraph.',
        },
        {
          kind: 'source',
          patterns: [`id=["']progress-note["']`],
          message: 'The duplicate id is now progress-note.',
        },
        {
          kind: 'element',
          selector: 'ul li:nth-child(2)',
          text: 'CSS',
          message: 'The list still contains both items.',
        },
        {
          kind: 'element',
          selector: 'div.note',
          text: 'Note',
          message: 'The note is still present outside the paragraph.',
        },
        {
          kind: 'element',
          selector: 'p#progress-note',
          text: 'You are here.',
          message: 'The paragraph has the new id and text.',
        },
      ],
    },
  ],

  'complete-page': [
    {
      type: 'code-challenge',
      title: 'Build a complete page shell',
      instructions: 'Write a full HTML document from doctype to closing html tag.',
      prompt:
        'Create a page with a head title "My first page" and a body h1 "Hello!". Include the doctype and the html element.',
      starterCode: '<!-- Build a complete page with a title and an h1 -->\n',
      language: 'html',
      solution: `<!DOCTYPE html>
<html>
  <head>
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello!</h1>
  </body>
</html>`,
      hint: 'Start with <!DOCTYPE html>, wrap everything in html, put title in head, and h1 in body.',
      checks: [
        {
          kind: 'doctype',
          name: 'html',
          message: 'The page starts with <!DOCTYPE html>.',
        },
        {
          kind: 'element',
          selector: 'html',
          message: 'The html element wraps the document.',
        },
        {
          kind: 'element',
          selector: 'head title',
          text: 'My first page',
          message: 'The title says "My first page".',
        },
        {
          kind: 'element',
          selector: 'body h1',
          text: 'Hello!',
          message: 'The body contains an h1 that says "Hello!".',
        },
      ],
    },
    {
      type: 'code-challenge',
      title: 'Build a sign-up section',
      instructions: 'Add a labelled form and a footer to the page.',
      prompt:
        'Create a section with id="signup" containing an h2 "Get course updates" and a form with action="/subscribe" method="post", a label "Email address" connected to an input id="email" type="email" with required, and a submit button "Subscribe". Then add a footer with a p "Built for curious people."',
      starterCode: '<!-- Build a sign-up section and footer -->\n',
      language: 'html',
      solution: `<section id="signup">
  <h2>Get course updates</h2>
  <form action="/subscribe" method="post">
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Subscribe</button>
  </form>
</section>
<footer>
  <p>Built for curious people.</p>
</footer>`,
      hint: 'The form action and method go on the form. label for must match input id.',
      checks: [
        {
          kind: 'element',
          selector: 'section#signup h2',
          text: 'Get course updates',
          message: 'The sign-up section has a heading.',
        },
        {
          kind: 'element',
          selector: 'section#signup form',
          attributes: { action: '/subscribe', method: 'post' },
          message: 'The form sends a POST request to /subscribe.',
        },
        {
          kind: 'element',
          selector: 'label[for="email"]',
          text: 'Email address',
          message: 'The label names the email field.',
        },
        {
          kind: 'element',
          selector: 'input#email',
          attributes: { type: 'email', required: '' },
          message: 'The email input is required and connected to the label.',
        },
        {
          kind: 'element',
          selector: 'button[type="submit"]',
          text: 'Subscribe',
          message: 'The submit button says "Subscribe".',
        },
        {
          kind: 'element',
          selector: 'footer p',
          text: 'Built for curious people.',
          message: 'The footer closes the page.',
        },
      ],
    },
  ],
}
