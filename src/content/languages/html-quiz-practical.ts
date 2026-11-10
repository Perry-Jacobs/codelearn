import type { QuizQuestion } from '../types'

const input = (
  id: string,
  question: string,
  acceptedAnswers: string[],
  explanation: string,
): QuizQuestion => ({
  id,
  type: 'input',
  question,
  acceptedAnswers,
  explanation,
})

/**
 * Practical HTML questions where learners type a short answer instead of
 * selecting an option. Every HTML lesson gets four of these, and each quiz
 * attempt includes two of them alongside multiple-choice questions.
 */
export const htmlQuizPractical: Record<string, QuizQuestion[]> = {
  'how-html-works': [
    input('p1', 'Type the attribute that stores a link destination.', ['href'], 'href holds the URL in an anchor element.'),
    input('p2', 'Type the tag name for a paragraph. Just the name, no brackets.', ['p', '<p>'], 'The p element wraps a paragraph.'),
    input('p3', 'Type the tag name for a line break.', ['br', '<br>'], 'br is a void element that inserts a line break.'),
    input('p4', 'Type the attribute that declares the document language.', ['lang'], 'The lang attribute on the html element declares the page language.'),
  ],
  'document-structure': [
    input('p1', 'Type the tag name for the document root element.', ['html', '<html>'], 'The html element wraps the entire document.'),
    input('p2', 'Type the tag name that sets the browser tab title.', ['title', '<title>'], 'The title element provides the page title.'),
    input('p3', 'Type the tag name that contains visible page content.', ['body', '<body>'], 'The body holds everything the user can see.'),
    input('p4', 'Type the first line of a standards-mode HTML document.', ['!doctype html', 'doctype html', '<!doctype html>', 'doctype'], 'The doctype tells the browser to use standards mode.'),
  ],
  'text-and-headings': [
    input('p1', 'Type the tag name for the top-level page heading.', ['h1', '<h1>'], 'h1 is the main heading of the page.'),
    input('p2', 'Type the tag name for a paragraph.', ['p', '<p>'], 'The p element groups a paragraph of text.'),
    input('p3', 'Type the tag name for a line break.', ['br', '<br>'], 'br inserts a line break without starting a new paragraph.'),
    input('p4', 'Type the tag name for a thematic divider.', ['hr', '<hr>'], 'hr represents a thematic break between sections.'),
  ],
  lists: [
    input('p1', 'Type the tag name for an unordered list.', ['ul', '<ul>'], 'ul is a list where order does not matter.'),
    input('p2', 'Type the tag name for an ordered list.', ['ol', '<ol>'], 'ol is a numbered list where order matters.'),
    input('p3', 'Type the tag name for one list item.', ['li', '<li>'], 'li represents one item inside a list.'),
    input('p4', 'Type the tag name for a description list.', ['dl', '<dl>'], 'dl groups terms and their descriptions.'),
  ],
  'links-and-navigation': [
    input('p1', 'Type the tag name for a hyperlink.', ['a', '<a>', 'anchor'], 'The anchor element, a, creates a link.'),
    input('p2', 'Type the attribute that stores a link destination.', ['href'], 'href holds the URL that the link points to.'),
    input('p3', 'Type the attribute that opens a link in a new tab.', ['target'], 'The target attribute controls where the link opens.'),
    input('p4', 'Type the target value that opens a new tab.', ['_blank', 'blank'], 'target="_blank" opens the destination in a new tab.'),
  ],
  'images-and-figures': [
    input('p1', 'Type the tag name for an image.', ['img', '<img>'], 'Use img for images. The image tag is not valid HTML.'),
    input('p2', 'Type the attribute that contains the image URL.', ['src'], 'src points to the image file.'),
    input('p3', 'Type the attribute that provides alternative text.', ['alt'], 'alt describes the image for people who cannot see it.'),
    input('p4', 'Type the tag name for the visible caption of a figure.', ['figcaption', '<figcaption>'], 'figcaption holds the visible caption for a figure.'),
  ],
  forms: [
    input('p1', 'Type the tag name that wraps a form.', ['form', '<form>'], 'The form element groups controls that are submitted together.'),
    input('p2', 'Type the tag name that names a form control.', ['label', '<label>'], 'A label gives a form control an accessible name.'),
    input('p3', 'Type the input type that masks typed characters.', ['password'], 'type="password" hides the characters being typed.'),
    input('p4', 'Type the attribute that makes a form field mandatory.', ['required'], 'required prevents submission until the field is filled.'),
  ],
  tables: [
    input('p1', 'Type the tag name for a table row.', ['tr', '<tr>'], 'tr groups the cells in one row.'),
    input('p2', 'Type the tag name for a data cell.', ['td', '<td>'], 'td holds a data cell.'),
    input('p3', 'Type the tag name for a header cell.', ['th', '<th>'], 'th marks a header cell.'),
    input('p4', 'Type the attribute that makes a cell span two columns.', ['colspan'], 'colspan stretches a cell across columns.'),
  ],
  'semantic-html': [
    input('p1', 'Type the tag name for the primary content landmark.', ['main', '<main>'], 'main wraps the dominant content of the page.'),
    input('p2', 'Type the tag name for a navigation landmark.', ['nav', '<nav>'], 'nav marks a major block of navigation links.'),
    input('p3', 'Type the tag name for a self-contained article.', ['article', '<article>'], 'article is for a complete composition that could stand alone.'),
    input('p4', 'Type the tag name for complementary content beside the main content.', ['aside', '<aside>'], 'aside is related to the main content but not central to it.'),
  ],
  'divs-spans-grouping': [
    input('p1', 'Type the tag name for a generic inline container.', ['span', '<span>'], 'span groups inline content for styling or scripting.'),
    input('p2', 'Type the tag name for a generic block container.', ['div', '<div>'], 'div groups block-level content when no semantic element fits.'),
    input('p3', 'Type the attribute that can be reused on many elements.', ['class'], 'A class can be shared by many elements.'),
    input('p4', 'Type the attribute that must be unique in a document.', ['id'], 'An id must be unique within the document.'),
  ],
  'head-and-metadata': [
    input('p1', 'Type the tag name that sets the browser tab title.', ['title', '<title>'], 'The title element sets the tab text.'),
    input('p2', 'Type the meta attribute that sets character encoding.', ['charset'], 'charset tells the browser how to decode the text.'),
    input('p3', 'Type the rel value used to load a stylesheet.', ['stylesheet'], 'A link element with rel="stylesheet" loads CSS.'),
    input('p4', 'Type the script attribute that delays execution until HTML is parsed.', ['defer'], 'defer waits until the HTML is parsed before running the script.'),
  ],
  media: [
    input('p1', 'Type the tag name for an audio player.', ['audio', '<audio>'], 'The audio element embeds an audio player.'),
    input('p2', 'Type the tag name for a video player.', ['video', '<video>'], 'The video element embeds a video player.'),
    input('p3', 'Type the attribute that shows playback controls.', ['controls'], 'controls displays play, pause, and volume controls.'),
    input('p4', 'Type the tag name that embeds another HTML page.', ['iframe', '<iframe>'], 'iframe loads a separate document inside the current page.'),
  ],
  accessibility: [
    input('p1', 'Type the tag name for the main content landmark.', ['main', '<main>'], 'main marks the primary content of the page.'),
    input('p2', 'Type the tag name for a navigation landmark.', ['nav', '<nav>'], 'nav creates a navigation landmark.'),
    input('p3', 'Type the attribute used to name an icon-only button.', ['aria-label', 'aria label'], 'An aria-label gives a control an accessible name.'),
    input('p4', 'Type the label attribute that points to an input id.', ['for'], 'The label for attribute references the input id.'),
  ],
  'responsive-html': [
    input('p1', 'Type the name value used for the mobile viewport meta tag.', ['viewport'], 'The viewport meta tag controls the mobile layout width.'),
    input('p2', 'Type the CSS property that keeps images from overflowing.', ['max-width', 'max width'], 'max-width: 100% lets images shrink to fit their container.'),
    input('p3', 'Type the attribute that lists image candidates for different resolutions.', ['srcset'], 'srcset lists image candidates for the browser to choose from.'),
    input('p4', 'Type the tag name that wraps responsive image sources.', ['picture', '<picture>'], 'picture contains source choices and an img fallback.'),
  ],
  'validation-and-debugging': [
    input('p1', 'Type the tag name for an image.', ['img', '<img>'], 'img has no closing tag.'),
    input('p2', 'Type the attribute that must be unique in a document.', ['id'], 'Ids must be unique within the document.'),
    input('p3', 'Type the three-letter organization that provides the HTML validator.', ['w3c'], 'The W3C provides the Markup Validation Service.'),
    input('p4', 'Type the tag name that cannot contain a block-level div.', ['p', '<p>'], 'A paragraph cannot contain block-level elements such as div.'),
  ],
  'complete-page': [
    input('p1', 'Type the tag name for the primary content landmark.', ['main', '<main>'], 'main holds the primary content of the page.'),
    input('p2', 'Type the tag name that wraps a site header.', ['header', '<header>'], 'header introduces the site or a section.'),
    input('p3', 'Type the tag name that wraps a form.', ['form', '<form>'], 'The form element groups the controls that are submitted together.'),
    input('p4', 'Type the tag name that wraps a footer.', ['footer', '<footer>'], 'footer holds closing information for the page or site.'),
  ],
}
