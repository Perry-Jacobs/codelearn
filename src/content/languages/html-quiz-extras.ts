import type { QuizQuestion } from '../types'

/**
 * Extra questions for the HTML course. The original lessons each have three
 * questions; these bring every HTML quiz up to six so the carousel has enough
 * material for a proper question-by-question flow.
 */
export const htmlQuizExtras: Record<string, QuizQuestion[]> = {
  'how-html-works': [
    {
      id: 'q4',
      question: 'Which attribute tells the browser which language a page uses?',
      options: ['lang', 'language', 'locale', 'xml:lang'],
      answer: 0,
      explanation:
        'The lang attribute on the html element, such as `<html lang="en">`, declares the page language.',
    },
    {
      id: 'q5',
      question: 'What is the difference between a tag and an element?',
      options: [
        'A tag is only the markup; an element includes the opening tag, content, and closing tag',
        'They mean exactly the same thing',
        'An element is only a closing tag',
        'A tag contains CSS rules',
      ],
      answer: 0,
      explanation:
        'A tag is the markup in angle brackets. An element is the whole unit: opening tag, content, and closing tag.',
    },
    {
      id: 'q6',
      question: 'What does nesting mean in HTML?',
      options: [
        'Placing an element inside another element',
        'Writing every tag on one line',
        'Adding CSS inside a tag',
        'Closing every element twice',
      ],
      answer: 0,
      explanation:
        'Nesting places child elements inside a parent element, forming the page tree.',
    },
  ],
  'document-structure': [
    {
      id: 'q4',
      question: 'Which element holds metadata and the page title?',
      options: ['body', 'head', 'main', 'footer'],
      answer: 1,
      explanation:
        'The head contains information about the page, such as the title, charset, and linked resources.',
    },
    {
      id: 'q5',
      question: 'Which sequence shows the main document skeleton in the correct order?',
      options: [
        '<!DOCTYPE html>, html, head, body',
        '<!DOCTYPE html>, body, head, html',
        'html, <!DOCTYPE html>, body, head',
        'head, html, <!DOCTYPE html>, body',
      ],
      answer: 0,
      explanation:
        'Start with the doctype, then the html element, then the head, and finally the body.',
    },
    {
      id: 'q6',
      question: 'Which tag in the document skeleton is a void element?',
      options: ['<head>', '<body>', '<meta>', '<html>'],
      answer: 2,
      explanation:
        'meta carries information in its attributes and has no closing tag.',
    },
  ],
  'text-and-headings': [
    {
      id: 'q4',
      question: 'What does the <em> element convey?',
      options: ['Emphasis', 'Importance', 'A line break', 'A quotation'],
      answer: 0,
      explanation:
        'em adds emphasis to text. strong conveys importance, which is a different meaning.',
    },
    {
      id: 'q5',
      question: 'Which element is used for a block quotation from another source?',
      options: ['<blockquote>', '<p>', '<pre>', '<cite>'],
      answer: 0,
      explanation:
        'blockquote marks a longer quotation. cite can name the source of the quotation.',
    },
    {
      id: 'q6',
      question: 'Which element names the title of a creative work or source?',
      options: ['<cite>', '<code>', '<strong>', '<h6>'],
      answer: 0,
      explanation:
        'cite identifies the title of a work, such as a book, article, or film.',
    },
  ],
  lists: [
    {
      id: 'q4',
      question: 'Which element creates a bulleted list?',
      options: ['<ul>', '<ol>', '<dl>', '<li>'],
      answer: 0,
      explanation:
        'ul is an unordered list, so its items are shown with bullets.',
    },
    {
      id: 'q5',
      question: 'Which element represents one item in a list?',
      options: ['<li>', '<item>', '<list>', '<dd>'],
      answer: 0,
      explanation:
        'Each item in a ul or ol belongs in an li element.',
    },
    {
      id: 'q6',
      question: 'Which list type is best for steps that must stay in order?',
      options: ['<ol>', '<ul>', '<dl>', '<nav>'],
      answer: 0,
      explanation:
        'An ordered list, ol, numbers its items and communicates sequence.',
    },
  ],
  'links-and-navigation': [
    {
      id: 'q4',
      question: 'What is an absolute URL?',
      options: [
        'A full address including the protocol and domain',
        'A path relative to the current page',
        'A link to an element id',
        'A link with no href',
      ],
      answer: 0,
      explanation:
        'An absolute URL includes the full address, such as https://example.com/about.',
    },
    {
      id: 'q5',
      question: 'Which URL is relative?',
      options: ['https://example.com/about', '/about', 'mailto:hi@example.com', 'tel:+123'],
      answer: 1,
      explanation:
        'A relative URL resolves from the current site or page. /about points to the site root.',
    },
    {
      id: 'q6',
      question: 'Which attribute opens a link in a new tab?',
      options: ['target="_blank"', 'href="_blank"', 'rel="new"', 'open="tab"'],
      answer: 0,
      explanation:
        'target="_blank" asks the browser to open the destination in a new browsing context.',
    },
  ],
  'images-and-figures': [
    {
      id: 'q4',
      question: 'Which attributes help reserve space for an image and prevent layout shifts?',
      options: [
        'width and height',
        'alt and title',
        'class and id',
        'srcset and sizes',
      ],
      answer: 0,
      explanation:
        'Providing width and height lets the browser reserve the correct aspect ratio before the image loads.',
    },
    {
      id: 'q5',
      question: 'Which attribute points to the image file?',
      options: ['src', 'href', 'alt', 'caption'],
      answer: 0,
      explanation:
        'The src attribute contains the URL of the image file.',
    },
    {
      id: 'q6',
      question: 'What does the picture element let you do?',
      options: [
        'Offer different image sources for different conditions',
        'Add a visible caption',
        'Compress the image automatically',
        'Play a video',
      ],
      answer: 0,
      explanation:
        'picture wraps source elements so the browser can choose an image based on media conditions or format support.',
    },
  ],
  forms: [
    {
      id: 'q4',
      question: 'Which element groups related form controls with a caption?',
      options: ['<fieldset>', '<div>', '<label>', '<form>'],
      answer: 0,
      explanation:
        'fieldset groups related controls, and its legend gives the group a name.',
    },
    {
      id: 'q5',
      question: 'Which element provides a multi-line text input?',
      options: ['<textarea>', '<input type="text">', '<select>', '<output>'],
      answer: 0,
      explanation:
        'textarea is designed for longer, multi-line text such as a message.',
    },
    {
      id: 'q6',
      question: 'Which element creates a drop-down list?',
      options: ['<select>', '<option>', '<datalist>', '<menu>'],
      answer: 0,
      explanation:
        'select creates the drop-down control; option elements define its choices.',
    },
  ],
  tables: [
    {
      id: 'q4',
      question: 'Which element defines a table row?',
      options: ['<tr>', '<td>', '<th>', '<row>'],
      answer: 0,
      explanation:
        'tr groups the cells in one row of a table.',
    },
    {
      id: 'q5',
      question: 'Which element groups the header rows of a table?',
      options: ['<thead>', '<tbody>', '<tfoot>', '<caption>'],
      answer: 0,
      explanation:
        'thead groups header rows, while tbody holds the main data and tfoot holds footer rows.',
    },
    {
      id: 'q6',
      question: 'Which attribute associates a header cell with the correct column or row?',
      options: ['scope', 'colspan', 'headers', 'span'],
      answer: 0,
      explanation:
        'scope tells assistive technology whether a header applies to a column or a row.',
    },
  ],
  'semantic-html': [
    {
      id: 'q4',
      question: 'Which element represents introductory content or navigation for a page or section?',
      options: ['<header>', '<main>', '<footer>', '<aside>'],
      answer: 0,
      explanation:
        'header introduces a page or section and often contains headings and navigation.',
    },
    {
      id: 'q5',
      question: 'Which element contains links to other pages or sections?',
      options: ['<nav>', '<section>', '<article>', '<main>'],
      answer: 0,
      explanation:
        'nav marks a major block of navigation links and creates a landmark.',
    },
    {
      id: 'q6',
      question: 'Which element represents self-contained content that could stand alone?',
      options: ['<article>', '<div>', '<span>', '<main>'],
      answer: 0,
      explanation:
        'article is for a complete composition, such as a blog post or news story.',
    },
  ],
  'divs-spans-grouping': [
    {
      id: 'q4',
      question: 'Which element is a block container by default?',
      options: ['<div>', '<span>', '<a>', '<strong>'],
      answer: 0,
      explanation:
        'div is a block-level container. span, a, and strong are inline by default.',
    },
    {
      id: 'q5',
      question: 'What is an id best used for?',
      options: [
        'A unique element on the page',
        'Reusable styling across many elements',
        'Grouping inline text',
        'Adding a line break',
      ],
      answer: 0,
      explanation:
        'An id must be unique in the document. Use a class when the same styling should apply to many elements.',
    },
    {
      id: 'q6',
      question: 'Why use a span instead of a div around a word inside a paragraph?',
      options: [
        'span is inline and stays in the text flow',
        'span is block and starts a new line',
        'span adds a heading',
        'span is a semantic landmark',
      ],
      answer: 0,
      explanation:
        'span is an inline container, so it can wrap part of a line without breaking the paragraph.',
    },
  ],
  'head-and-metadata': [
    {
      id: 'q4',
      question: 'Which element sets the text shown in the browser tab?',
      options: ['<title>', '<h1>', '<meta>', '<header>'],
      answer: 0,
      explanation:
        'The title element provides the page title shown in the browser tab and used by search engines.',
    },
    {
      id: 'q5',
      question: 'Which meta tag declares the character encoding?',
      options: [
        '<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width">',
        '<meta name="description" content="...">',
        '<link rel="stylesheet" href="styles.css">',
      ],
      answer: 0,
      explanation:
        'The charset meta tag tells the browser how to decode the page text.',
    },
    {
      id: 'q6',
      question: 'Which element links an external stylesheet?',
      options: ['<link>', '<style>', '<script>', '<meta>'],
      answer: 0,
      explanation:
        'A link element with rel="stylesheet" loads an external CSS file.',
    },
  ],
  media: [
    {
      id: 'q4',
      question: 'Which element embeds a video?',
      options: ['<video>', '<audio>', '<img>', '<iframe>'],
      answer: 0,
      explanation:
        'The video element embeds a video player in the page.',
    },
    {
      id: 'q5',
      question: 'Which element adds captions or subtitles to a video?',
      options: ['<track>', '<caption>', '<subtitle>', '<text>'],
      answer: 0,
      explanation:
        'A track element inside video or audio points to a caption or subtitle file.',
    },
    {
      id: 'q6',
      question: 'Which element embeds a separate HTML document inside the current page?',
      options: ['<iframe>', '<video>', '<audio>', '<source>'],
      answer: 0,
      explanation:
        'iframe creates an inline frame that loads another document, such as a map or video embed.',
    },
  ],
  accessibility: [
    {
      id: 'q4',
      question: 'What should the alt attribute contain for a purely decorative image?',
      options: ['An empty value', 'A long description', 'The file name', 'The word image'],
      answer: 0,
      explanation:
        'Use alt="" for decorative images so screen readers skip them instead of announcing noise.',
    },
    {
      id: 'q5',
      question: 'What is a landmark region?',
      options: [
        'A semantic section such as main, nav, or header that assistive technology can navigate',
        'A CSS animation',
        'A type of image file',
        'A form validation rule',
      ],
      answer: 0,
      explanation:
        'Landmarks give screen reader users shortcuts to the main parts of a page.',
    },
    {
      id: 'q6',
      question: 'Why should keyboard focus order follow a logical sequence?',
      options: [
        'Keyboard users move through controls in DOM order',
        'It changes the font size',
        'It makes forms submit faster',
        'It hides content from screen readers',
      ],
      answer: 0,
      explanation:
        'Focus follows the source order, so the DOM should match the order users expect to navigate.',
    },
  ],
  'responsive-html': [
    {
      id: 'q4',
      question: 'Which CSS rule prevents an image from overflowing its container?',
      options: ['max-width: 100%', 'width: 1000px', 'min-width: 100%', 'display: none'],
      answer: 0,
      explanation:
        'max-width: 100% lets an image shrink to fit its container while never growing beyond its natural size.',
    },
    {
      id: 'q5',
      question: 'What does the sizes attribute help the browser decide?',
      options: [
        'Which image from srcset to download',
        'The image alt text',
        'The video aspect ratio',
        'The page language',
      ],
      answer: 0,
      explanation:
        'sizes describes the rendered width of the image at different breakpoints so the browser can choose an appropriate srcset candidate.',
    },
    {
      id: 'q6',
      question: 'Which element wraps source elements for responsive images?',
      options: ['<picture>', '<figure>', '<img>', '<video>'],
      answer: 0,
      explanation:
        'picture contains source elements and an img fallback for responsive image selection.',
    },
  ],
  'validation-and-debugging': [
    {
      id: 'q4',
      question: 'Which tool shows the browser’s repaired DOM tree?',
      options: [
        'The browser developer tools',
        'A CSS linter',
        'The download manager',
        'A favicon generator',
      ],
      answer: 0,
      explanation:
        'Developer tools show the live DOM after the browser has repaired invalid markup.',
    },
    {
      id: 'q5',
      question: 'What is a common cause of invalid HTML?',
      options: [
        'A missing closing tag',
        'Using too many classes',
        'Linking a stylesheet',
        'Adding alt text',
      ],
      answer: 0,
      explanation:
        'Unclosed paired elements are a common validation error, even when the page still looks fine.',
    },
    {
      id: 'q6',
      question: 'Which service is commonly used to validate HTML?',
      options: [
        'The W3C Markup Validation Service',
        'The JavaScript console',
        'A CSS grid generator',
        'The network tab',
      ],
      answer: 0,
      explanation:
        'The W3C validator checks markup for nesting, closing, and attribute errors.',
    },
  ],
  'complete-page': [
    {
      id: 'q4',
      question: 'What should you do before writing the markup for a page?',
      options: [
        'Plan the page blocks and heading structure',
        'Choose a random color palette',
        'Add every possible meta tag',
        'Start with JavaScript',
      ],
      answer: 0,
      explanation:
        'Planning the content blocks and heading outline makes the markup easier to write and validate.',
    },
    {
      id: 'q5',
      question: 'Which element should wrap the site’s repeated header and navigation?',
      options: ['<header> with <nav> inside', '<main>', '<footer>', '<article>'],
      answer: 0,
      explanation:
        'A header introduces the page or site, and nav marks the navigation links inside it.',
    },
    {
      id: 'q6',
      question: 'Why test keyboard navigation before finishing a page?',
      options: [
        'To confirm every control can be reached and used without a mouse',
        'To make the page load faster',
        'To choose image formats',
        'To validate CSS syntax',
      ],
      answer: 0,
      explanation:
        'Keyboard testing catches focus traps, unreachable controls, and illogical tab order.',
    },
  ],
}
