import type { PracticeSection } from '../types'

/**
 * One short interactive exercise per HTML lesson. The `afterConcept` value is
 * the 1-based concept number the exercise should follow, so it appears inside
 * that building-block chapter instead of at the end of the lesson.
 */
export const htmlPractice: Record<
  string,
  { afterConcept: number; section: PracticeSection }
> = {
  'how-html-works': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Build a paragraph element',
      instructions: 'Type the opening and closing tags around the text.',
      template: '{{open}}Hello, world!{{close}}',
      blanks: [
        {
          id: 'open',
          answers: ['<p>'],
          hint: 'Opening tag for a paragraph. Include the angle brackets.',
          strict: true,
        },
        {
          id: 'close',
          answers: ['</p>'],
          hint: 'Closing tag for a paragraph. Include the angle brackets.',
          strict: true,
        },
      ],
      explanation:
        'A paragraph element includes the opening <p> tag, the text, and the closing </p> tag.',
      hint: 'An opening tag uses <p>. A closing tag uses </p>.',
    },
  },
  'document-structure': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Close the document shell',
      instructions: 'Type the opening and closing tags for the document root.',
      template: `<!DOCTYPE html>
{{open}}
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
{{close}}`,
      blanks: [
        {
          id: 'open',
          answers: ['<html>'],
          hint: 'Opening tag for the document root. Include the angle brackets.',
          strict: true,
        },
        {
          id: 'close',
          answers: ['</html>'],
          hint: 'Closing tag for the document root. Include the angle brackets.',
          strict: true,
        },
      ],
      explanation:
        'The html element wraps the head and body. It opens with <html> and closes with </html>.',
      hint: 'The root element is html.',
    },
  },
  'text-and-headings': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Close the heading and paragraph',
      instructions: 'Type the tag names that complete each closing tag.',
      template: `<h2>Ingredients</{{heading}}>
<p>Mix the flour and water.</{{paragraph}}>`,
      blanks: [
        { id: 'heading', answers: ['h2'], hint: 'Closing tag name for the h2 heading.' },
        { id: 'paragraph', answers: ['p'], hint: 'Closing tag name for the paragraph.' },
      ],
      explanation:
        'A closing tag repeats the element name after a slash: </h2> and </p>.',
      hint: 'Look at the opening tag before each blank.',
    },
  },
  lists: {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Close the list item',
      instructions: 'Type the missing closing tag name.',
      template: `<ul>
  <li>First item</{{close}}>
  <li>Second item</li>
</ul>`,
      blanks: [{ id: 'close', answers: ['li'], hint: 'Closing tag name for a list item.' }],
      explanation: 'Each list item closes with </li>.',
      hint: 'The opening tag is <li>.',
    },
  },
  'links-and-navigation': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Connect the link',
      instructions: 'Type the attribute that stores the link destination.',
      template: '<a {{attr}}="https://example.com">Visit example.com</a>',
      blanks: [{ id: 'attr', answers: ['href'], hint: 'The attribute that stores the link destination.' }],
      explanation: 'The href attribute stores the URL that the link opens.',
      hint: 'The attribute starts with h.',
    },
  },
  'images-and-figures': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Complete the image tag',
      instructions: 'Type the two attributes that make this image useful.',
      template: '<img {{src}}="cat.jpg" {{alt}}="A cat sleeping">',
      blanks: [
        { id: 'src', answers: ['src'], hint: 'The attribute that points to the image file.' },
        { id: 'alt', answers: ['alt'], hint: 'The attribute that describes the image.' },
      ],
      explanation:
        'src points to the file, and alt describes the image for people who cannot see it.',
      hint: 'One attribute starts with s, the other with a.',
    },
  },
  forms: {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Connect the label and input',
      instructions: 'Type the label attribute and the input type attribute.',
      template: `<label {{for}}="email">Email</label>
<input id="email" {{type}}="email">`,
      blanks: [
        { id: 'for', answers: ['for'], hint: 'The label attribute that points to the input id.' },
        { id: 'type', answers: ['type'], hint: 'The attribute that chooses the input type.' },
      ],
      explanation:
        'The label for attribute points to the input id, and type="email" gives the right keyboard and validation.',
      hint: 'The label uses for, and the input uses type.',
    },
  },
  tables: {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Mark the header cell',
      instructions: 'Type the tag that marks a table header cell.',
      template: `<table>
  <caption>Team scores</caption>
  <tr>
    <{{header}}>Name</{{header}}>
    <td>Ada</td>
  </tr>
</table>`,
      blanks: [{ id: 'header', answers: ['th'], hint: 'The tag for a header cell.' }],
      explanation: 'th marks a header cell. td marks a data cell.',
      hint: 'The header tag is short: th.',
    },
  },
  'semantic-html': {
    afterConcept: 3,
    section: {
      type: 'practice',
      title: 'Mark the main content',
      instructions: 'Type the tag that wraps the primary content.',
      template: `<header>Site header</header>
<{{main}}>Main content</{{main}}>
<footer>Site footer</footer>`,
      blanks: [{ id: 'main', answers: ['main'], hint: 'The tag for the primary content landmark.' }],
      explanation: 'The main element wraps the primary content of the page.',
      hint: 'The tag is main.',
    },
  },
  'divs-spans-grouping': {
    afterConcept: 4,
    section: {
      type: 'practice',
      title: 'Choose the inline container',
      instructions: 'Type the generic inline container for the word New.',
      template: `<div class="card">
  <{{inline}}>New</{{inline}}>
  <p>Course description</p>
</div>`,
      blanks: [{ id: 'inline', answers: ['span'], hint: 'The generic inline container.' }],
      explanation: 'span is the generic inline container. div is the generic block container.',
      hint: 'Use span for a word inside a line.',
    },
  },
  'head-and-metadata': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Complete the head',
      instructions: 'Type the meta attribute and the tag that names the page.',
      template: `<head>
  <meta {{charset}}="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <{{title}}>My page</{{title}}>
</head>`,
      blanks: [
        { id: 'charset', answers: ['charset'], hint: 'The meta attribute that sets character encoding.' },
        { id: 'title', answers: ['title'], hint: 'The tag that names the browser tab.' },
      ],
      explanation:
        'charset tells the browser how to decode the text, and title names the page.',
      hint: 'The meta attribute is charset, and the tab title uses title.',
    },
  },
  media: {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Add playback controls',
      instructions: 'Type the attribute that shows the video controls.',
      template: `<video {{controls}}>
  <source src="movie.mp4" type="video/mp4">
</video>`,
      blanks: [{ id: 'controls', answers: ['controls'], hint: 'The attribute that shows playback controls.' }],
      explanation: 'The controls attribute shows play, pause, and volume controls.',
      hint: 'The attribute is controls.',
    },
  },
  accessibility: {
    afterConcept: 3,
    section: {
      type: 'practice',
      title: 'Name the icon button',
      instructions: 'Type the attribute that gives the icon-only button an accessible name.',
      template: `<label for="search">Search</label>
<input id="search" type="text">
<button {{label}}="Search">🔍</button>`,
      blanks: [{ id: 'label', answers: ['aria-label', 'aria label'], hint: 'The attribute that gives the icon button an accessible name.' }],
      explanation:
        'An icon-only button needs an accessible name. aria-label provides one.',
      hint: 'The attribute starts with aria-.',
    },
  },
  'responsive-html': {
    afterConcept: 3,
    section: {
      type: 'practice',
      title: 'Set up responsive images',
      instructions: 'Type the viewport name and the image candidate attribute.',
      template: `<meta name="{{viewport}}" content="width=device-width, initial-scale=1">
<img src="photo.jpg" {{srcset}}="photo-2x.jpg 2x" alt="A mountain">`,
      blanks: [
        { id: 'viewport', answers: ['viewport'], hint: 'The name value for the mobile viewport meta tag.' },
        { id: 'srcset', answers: ['srcset'], hint: 'The attribute that lists image candidates for different resolutions.' },
      ],
      explanation:
        'The viewport meta tag sets the mobile layout width, and srcset offers image choices.',
      hint: 'The meta name is viewport, and the image attribute is srcset.',
    },
  },
  'validation-and-debugging': {
    afterConcept: 3,
    section: {
      type: 'practice',
      title: 'Fix the missing closing tag',
      instructions: 'Type the closing tag that the paragraph needs.',
      template: `<div>
  <p>Hello, world!
  {{close}}
</div>`,
      blanks: [
        {
          id: 'close',
          answers: ['</p>'],
          hint: 'The closing tag for the paragraph. Include the angle brackets.',
          strict: true,
        },
      ],
      explanation: 'The paragraph must close with </p> before the div closes.',
      hint: 'Close the paragraph before the div.',
    },
  },
  'complete-page': {
    afterConcept: 2,
    section: {
      type: 'practice',
      title: 'Finish the page shell',
      instructions: 'Type the opening and closing tags for the document root.',
      template: `<!DOCTYPE html>
{{open}}
<head>
  <title>My first page</title>
</head>
<body>
  <h1>Hello!</h1>
</body>
{{close}}`,
      blanks: [
        {
          id: 'open',
          answers: ['<html>'],
          hint: 'Opening tag for the document root. Include the angle brackets.',
          strict: true,
        },
        {
          id: 'close',
          answers: ['</html>'],
          hint: 'Closing tag for the document root. Include the angle brackets.',
          strict: true,
        },
      ],
      explanation:
        'The html element wraps the head and body. It opens with <html> and closes with </html>.',
      hint: 'The root element is html.',
    },
  },
}
