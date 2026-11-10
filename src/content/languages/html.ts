import type { Language } from '../types'

export const html: Language = {
  id: 'html',
  name: 'HTML',
  monogram: '</>',
  category: 'web',
  tagline: 'The structure of every page on the web.',
  description:
    'HTML is a markup language: it describes what content is, not how it looks. You will learn one tag at a time, see exactly what it does, and then combine tags into a complete page.',
  difficulty: 'Beginner',
  accent: '#E34F26',
  lessons: [
    {
      id: 'how-html-works',
      title: 'How HTML works',
      summary: 'Learn tags, elements, attributes, nesting, and void elements.',
      minutes: 9,
      objectives: [
        'Tell the difference between a tag and an element',
        'Add information with attributes',
        'Recognise void elements and nested elements',
      ],
      sections: [
        {
          type: 'text',
          content:
            'HTML is a markup language. It does not calculate or make decisions; it describes what each piece of content is: a heading, a paragraph, a link, an image, or a list. The browser reads that description and builds the page.',
        },
        {
          type: 'concept',
          title: 'A tag marks the start or end of content',
          content:
            'Tags are written between angle brackets. An opening tag looks like `<p>`. A closing tag looks like `</p>` and has a slash before the name. The tag name tells the browser what kind of content follows.',
          language: 'html',
          code: `<p>This is a paragraph.</p>
<!-- <p> opens; </p> closes. -->`,
        },
        {
          type: 'concept',
          title: 'An element is the whole package',
          content:
            'An element is the opening tag, the content, and the closing tag together. In `<h1>Welcome</h1>`, the whole thing is one heading element. People often say “tag” when they mean “element”, but the distinction is useful.',
          language: 'html',
          code: `<h1>Welcome</h1>
<!-- opening tag + content + closing tag = one element -->`,
        },
        {
          type: 'concept',
          title: 'Attributes add extra information',
          content:
            'Attributes live inside the opening tag and usually come as `name="value"`. The `href` attribute tells a link where to go. The `lang` attribute tells the browser which language the page uses.',
          language: 'html',
          code: `<a href="https://example.com">Visit example.com</a>
<!-- href is the attribute; the URL is its value. -->

<html lang="en">
<!-- lang says the page is in English. -->`,
        },
        {
          type: 'concept',
          title: 'Nesting builds a tree',
          content:
            'Elements can contain other elements. A list contains list items; the body contains headings, paragraphs, and lists. Always close the inner element before closing its parent. Indentation is not required, but it makes the tree readable.',
          language: 'html',
          code: `<ul>
  <li>HTML</li>   <!-- child of ul -->
  <li>CSS</li>    <!-- child of ul -->
</ul>
<!-- ul is the parent; li elements are its children. -->`,
        },
        {
          type: 'concept',
          title: 'Void elements have no closing tag',
          content:
            'A few elements cannot contain content, so they stand alone. `img`, `br`, `hr`, `input`, and `meta` are common examples. Writing `</img>` is invalid because there is nothing to close.',
          language: 'html',
          code: `<img src="photo.jpg" alt="A mountain at sunrise" />
<br />  <!-- a line break -->
<hr />  <!-- a thematic divider -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>How HTML works</title>
    <!-- The title is metadata, not visible page content. -->
  </head>

  <body>
    <!-- 1. A heading element. -->
    <h1>My page</h1>

    <!-- 2. An attribute gives the link its destination. -->
    <a href="https://example.com">Visit example.com</a>

    <!-- 3. A void element: no closing tag. -->
    <img src="/images/photo.jpg" alt="A mountain at sunrise" />

    <!-- 4. Nested elements form a tree. -->
    <ul>
      <li>First item</li>
      <li>Second item</li>
    </ul>
  </body>
</html>`,
          caption: 'Tags, elements, attributes, and nesting together',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'HTML is structure, not decoration',
          content:
            'HTML says what content means. CSS decides how it looks. A heading is a heading even before any styling is added, which is why choosing the right tag matters for accessibility and search engines.',
        },
        {
          type: 'list',
          title: 'The vocabulary you will keep using',
          items: [
            'Tag: the markup written in angle brackets',
            'Element: an opening tag, its content, and a closing tag',
            'Attribute: extra information inside an opening tag',
            'Void element: a tag that stands alone, such as img',
          ],
        },
      ],
      takeaways: [
        'Tags mark content; an element includes the tags and the content.',
        'Attributes add information such as a link destination.',
        'Nested elements form the page tree; void elements have no closing tag.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What makes up an element?',
          options: [
            'Only an opening tag',
            'An opening tag, content, and a closing tag',
            'A CSS rule',
            'An attribute and a URL',
          ],
          answer: 1,
          explanation:
            'An element is the complete unit: opening tag, content, and closing tag.',
        },
        {
          id: 'q2',
          question: 'In <a href="about.html">About</a>, what is href?',
          options: ['An element', 'A closing tag', 'An attribute', 'A void tag'],
          answer: 2,
          explanation:
            'href is an attribute inside the opening tag. It stores the link destination.',
        },
        {
          id: 'q3',
          question: 'Which element is a void element?',
          options: ['<p>', '<a>', '<div>', '<img>'],
          answer: 3,
          explanation:
            'img cannot contain content, so it has no closing tag. p, a, and div are paired elements.',
        },
      ],
    },
    {
      id: 'document-structure',
      title: 'Document structure',
      summary: 'Meet every tag in a page, one by one, then build the whole document.',
      minutes: 12,
      objectives: [
        'Recognise each tag in a basic HTML document',
        'Explain what the head and body are for',
        'Combine the tags into a valid page',
      ],
      sections: [
        {
          type: 'text',
          content:
            'A web page looks complicated at first, but almost every page starts with the same small set of tags. We will take them one at a time. For each tag, look at the example, read what it does, and only then move on.',
        },
        {
          type: 'concept',
          title: '<!DOCTYPE html> declares the document type',
          content:
            'This line tells the browser to use modern HTML rules. It must be the very first thing in the file. It is not an element, so it has no closing tag.',
          language: 'html',
          code: `<!DOCTYPE html>
<!-- The browser now uses standards mode. -->`,
        },
        {
          type: 'concept',
          title: '<html> is the root of the page',
          content:
            'Everything on the page goes inside the `html` element. The `lang="en"` attribute tells browsers and screen readers that the page is written in English. Attributes are extra information written inside the opening tag.',
          language: 'html',
          code: `<html lang="en">
  <!-- Everything on the page lives in here. -->
</html>`,
        },
        {
          type: 'concept',
          title: '<head> holds information about the page',
          content:
            'The `head` is a setup area. It contains things the browser needs to know, but nothing here is shown in the main page area. The head comes before the body.',
          language: 'html',
          code: `<head>
  <!-- Settings and page information go here. -->
</head>`,
        },
        {
          type: 'concept',
          title: '<title> names the browser tab',
          content:
            'The `title` sits inside the head. Its text appears in the browser tab and in search results. It is not a page heading, so it does not appear in the page itself.',
          language: 'html',
          code: `<head>
  <title>My first page</title>
  <!-- The tab will say: My first page -->
</head>`,
        },
        {
          type: 'concept',
          title: '<meta> tags give the browser settings',
          content:
            '`meta` is a void element: it has no closing tag. The charset setting keeps accents and emoji correct. The viewport setting makes the page fit the width of a phone screen instead of pretending the screen is huge.',
          language: 'html',
          code: `<meta charset="UTF-8" />
<!-- Correct characters: é, ü, 日本語, 🎉 -->

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Fit the page to the device width. -->`,
        },
        {
          type: 'concept',
          title: '<body> holds everything you can see',
          content:
            'The body is the visible page. Headings, paragraphs, links, images, and forms all go inside it. A page has one body, and it comes after the head.',
          language: 'html',
          code: `<body>
  <!-- Visible content goes here. -->
</body>`,
        },
        {
          type: 'concept',
          title: '<h1> and <p> are your first content tags',
          content:
            '`h1` is the main heading of the page. `p` is a paragraph of text. Both have an opening tag, content, and a closing tag. The closing tag has a slash before the name.',
          language: 'html',
          code: `<h1>Hello, world!</h1>   <!-- main heading -->
<p>This is my first page.</p> <!-- paragraph -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!DOCTYPE html>
<!-- 1. Modern HTML mode -->
<html lang="en">
  <!-- 2. The root element, language = English -->

  <head>
    <!-- 3. Information about the page -->

    <meta charset="UTF-8" />
    <!-- 4. Read text characters correctly -->

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 5. Fit phone screens -->

    <title>My first page</title>
    <!-- 6. Text shown in the browser tab -->
  </head>

  <body>
    <!-- 7. Everything visible starts here -->

    <h1>Hello, world!</h1>
    <!-- 8. The main heading -->

    <p>This is my first web page.</p>
    <!-- 9. A paragraph -->
  </body>
</html>`,
          caption: 'The complete page, assembled',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Paired tags vs void tags',
          content:
            'Most tags wrap content and need a closing tag, like `<p>...</p>`. A few are void and stand alone, like `<meta>`, `<img>`, and `<br>`. Indent nested tags so the structure is easy to read.',
        },
        {
          type: 'list',
          title: 'Common beginner mistakes',
          items: [
            'Putting visible content in the head instead of the body',
            'Forgetting a closing tag such as </p>',
            'Missing the doctype, which can trigger an old browser mode',
            'Using several h1 headings for no reason — one main heading is enough',
          ],
        },
      ],
      takeaways: [
        'The doctype, html, head, and body form the skeleton of every page.',
        'The head holds settings; the body holds visible content.',
        'Every tag either wraps content or is a void element.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element contains the visible content of a page?',
          options: ['head', 'body', 'meta', 'title'],
          answer: 1,
          explanation: 'Everything the user sees lives inside the body element.',
        },
        {
          id: 'q2',
          question: 'What is the purpose of <!DOCTYPE html>?',
          options: [
            'It creates a heading',
            'It tells the browser to use standards mode',
            'It links a stylesheet',
            'It defines the page language',
          ],
          answer: 1,
          explanation:
            'The doctype switches the browser out of quirks mode and into modern standards mode.',
        },
        {
          id: 'q3',
          question: 'Which meta tag makes a page work well on mobile?',
          options: ['meta charset', 'meta viewport', 'meta description', 'meta author'],
          answer: 1,
          explanation:
            'The viewport meta tag tells mobile browsers to match the device width.',
        },
      ],
    },
    {
      id: 'text-and-headings',
      title: 'Text and headings',
      summary: 'Learn headings, paragraphs, emphasis, quotes, and code one tag at a time.',
      minutes: 12,
      objectives: [
        'Build a clear heading outline with h1 to h6',
        'Group sentences into paragraphs',
        'Add emphasis and importance with strong and em',
        'Quote sources and show code with blockquote, cite, code, and pre',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Most of a page is text. HTML does not just put words on the screen; it says what each block of text means. We will learn the text tags one at a time, then combine them into a short article.',
        },
        {
          type: 'concept',
          title: '<h1> to <h6> create an outline',
          content:
            'Headings describe the structure of the page. `<h1>` is the main topic, `<h2>` marks a major section, and `<h3>` marks a subsection. Use the levels in order; do not skip from `h1` to `h4` just to make the text smaller. The browser’s default size is only a hint, not the purpose of the tag.',
          language: 'html',
          code: `<h1>Learning HTML</h1>
<h2>Text basics</h2>
<h3>Headings</h3>
<!-- h1 = page topic; h2 = section; h3 = subsection. -->`,
        },
        {
          type: 'concept',
          title: '<p> groups sentences into a paragraph',
          content:
            'A `<p>` element groups sentences that belong to the same idea. Each paragraph starts on a new line, and browsers add space between paragraphs. Do not use empty paragraphs to create spacing; use CSS for that.',
          language: 'html',
          code: `<p>A paragraph groups one idea.</p>
<p>Each new paragraph starts on a new line.</p>`,
        },
        {
          type: 'concept',
          title: '<strong> and <em> add meaning',
          content:
            '`<strong>` marks text as important. `<em>` adds emphasis, like a stressed word in speech. They are not the same as bold and italic styling: screen readers may change their tone for emphasis, so use them only when the meaning calls for it.',
          language: 'html',
          code: `<p><strong>Warning:</strong> save your work.</p>
<p>Read the <em>next</em> step carefully.</p>
<!-- strong = importance; em = emphasis. -->`,
        },
        {
          type: 'concept',
          title: '<br> and <hr> are void elements',
          content:
            '`<br>` inserts a line break inside text, such as a postal address. `<hr>` marks a thematic break between topics. Both are void elements, so they have no closing tag. Do not use a stack of `<br>` tags to push content down the page.',
          language: 'html',
          code: `<p>42 Example Street<br />London<br />SW1A 1AA</p>

<hr />
<!-- hr separates two topics. -->`,
        },
        {
          type: 'concept',
          title: '<blockquote> and <cite> quote a source',
          content:
            '`<blockquote>` marks a longer quotation. The optional `cite` attribute stores the source URL, but it is not shown to the user. Add a visible `<cite>` element or a link so readers know where the quote came from.',
          language: 'html',
          code: `<blockquote cite="https://example.com/source">
  <p>Simplicity is the soul of efficiency.</p>
</blockquote>
<p>— <cite>Example source</cite></p>`,
        },
        {
          type: 'concept',
          title: '<code> and <pre> show code',
          content:
            '`<code>` marks a short piece of code inside a sentence. `<pre>` keeps spaces and line breaks exactly as written, which is useful for a code block. Use `&lt;` and `&gt;` when you need to show angle brackets as text.',
          language: 'html',
          code: `<p>Use the <code>&lt;h1&gt;</code> tag for the main heading.</p>

<pre><code>const name = "Ada";
console.log(name);</code></pre>
<!-- pre preserves the line break and indentation. -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<article>
  <!-- 1. The page topic and a section heading. -->
  <h1>Why structure matters</h1>
  <h2>Readable content</h2>

  <!-- 2. A paragraph with importance and emphasis. -->
  <p>
    <strong>Structure first.</strong> A clear outline helps
    <em>every</em> reader find their way.
  </p>

  <!-- 3. A quote with a visible source. -->
  <blockquote cite="https://example.com/design">
    <p>Good design is as little design as possible.</p>
  </blockquote>
  <p>— <cite>Design notes</cite></p>

  <hr />

  <!-- 4. Inline code and a code block. -->
  <p>Use the <code>&lt;h1&gt;</code> element for the main heading.</p>
  <pre><code>&lt;p&gt;A paragraph.&lt;/p&gt;</code></pre>
</article>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not use headings for size',
          content:
            'If you want smaller text, use CSS. If you want a new section, use the next heading level. A logical heading outline is how screen reader users navigate long pages.',
        },
      ],
      takeaways: [
        'Headings create an outline; use h1 to h6 in order.',
        'Paragraphs group ideas, while strong and em add meaning.',
        'br and hr are void elements; blockquote, cite, code, and pre handle quotes and code.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which heading should be used for the main page topic?',
          options: ['<h1>', '<h2>', '<h6>', '<p>'],
          answer: 0,
          explanation:
            'h1 is the main heading for the page. h2 and h3 are used for sections and subsections.',
        },
        {
          id: 'q2',
          question: 'Which element marks text as important?',
          options: ['<em>', '<strong>', '<code>', '<cite>'],
          answer: 1,
          explanation:
            'strong conveys importance. em adds emphasis, while code marks code text.',
        },
        {
          id: 'q3',
          question: 'Which element preserves spaces and line breaks?',
          options: ['<p>', '<br>', '<pre>', '<blockquote>'],
          answer: 2,
          explanation:
            'pre keeps the text exactly as written, including whitespace and line breaks.',
        },
      ],
    },
    {
      id: 'lists',
      title: 'Lists',
      summary:
        'Learn unordered, ordered, nested, and description lists, plus navigation menus and marker styles.',
      minutes: 14,
      objectives: [
        'Build unordered and ordered lists with li',
        'Nest a list inside a list item',
        'Use description lists for terms and definitions',
        'Turn a list into a navigation menu',
        'Keep list structure valid and readable',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Lists are for items that belong together. HTML has a different list element for each job: unordered lists for items without a sequence, ordered lists for steps, and description lists for terms and their meanings. We will learn each one separately.',
        },
        {
          type: 'concept',
          title: '<ul> and <li> make an unordered list',
          content:
            'A `<ul>` is an unordered list. Use it when the order of the items does not matter, such as a list of ingredients or links. Each item is an `<li>` and must be a direct child of the list.',
          language: 'html',
          code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
<!-- ul = unordered list; li = list item. -->`,
        },
        {
          type: 'concept',
          title: '<ol> and <li> make an ordered list',
          content:
            'An `<ol>` is an ordered list. The browser numbers the items, so use it for steps that must happen in sequence. The optional `start` attribute changes the first number, which is useful when a procedure continues from an earlier page.',
          language: 'html',
          code: `<ol>
  <li>Open the editor.</li>
  <li>Create index.html.</li>
  <li>Save the file.</li>
</ol>
<!-- ol = ordered list; the browser adds the numbers. -->

<ol start="3">
  <li>Continue from step three.</li>
</ol>`,
        },
        {
          type: 'concept',
          title: 'Nested lists go inside an li',
          content:
            'A nested list belongs inside the `<li>` it relates to, not directly inside the outer `<ul>` or `<ol>`. This keeps the parent item and its sub-items connected in the page tree.',
          language: 'html',
          code: `<ul>
  <li>
    Front end
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Back end</li>
</ul>
<!-- The inner ul is inside the li for "Front end". -->`,
        },
        {
          type: 'concept',
          title: '<dl>, <dt>, and <dd> describe terms',
          content:
            'A `<dl>` is a description list. Each `<dt>` is a term, and each `<dd>` is its description. Use this for glossaries and term/definition pairs, not for ordinary bullet lists.',
          language: 'html',
          code: `<dl>
  <dt>HTML</dt>
  <dd>The structure of a page.</dd>
  <dt>CSS</dt>
  <dd>The presentation of a page.</dd>
</dl>
<!-- dt = term; dd = description. -->`,
        },
        {
          type: 'concept',
          title: 'List items can contain other elements',
          content:
            'An `<li>` can hold links, strong text, or even another list. This is how you build navigation menus and rich lists without losing the list structure.',
          language: 'html',
          code: `<ul>
  <li><a href="/html">HTML course</a></li>
  <li><a href="/css">CSS course</a></li>
  <li><strong>New:</strong> JavaScript course</li>
</ul>`,
        },
        {
          type: 'concept',
          title: 'Lists build navigation menus',
          content:
            'A navigation menu is a list of links. Wrapping the list in `<nav>` marks it as a navigation landmark, while the `ul` and `li` elements tell the browser this is a set of related links. The links themselves are still the parts users click.',
          language: 'html',
          code: `<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/lessons">Lessons</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
<!-- nav + ul + li + a is the usual menu pattern. -->`,
        },
        {
          type: 'concept',
          title: 'One term can have several descriptions',
          content:
            'A `<dt>` can be followed by more than one `<dd>` when a term has several meanings or details. The descriptions stay grouped with that term, so the relationship is clear to both sighted users and screen readers.',
          language: 'html',
          code: `<dl>
  <dt>Cache</dt>
  <dd>A copy of data kept for faster access.</dd>
  <dd>A hidden storage area in a browser.</dd>
</dl>
<!-- Both dd elements describe the same dt. -->`,
        },
        {
          type: 'concept',
          title: 'Change the markers without changing the meaning',
          content:
            'The `type` attribute changes an ordered list’s numbering (1, A, a, I, or i), and `reversed` counts down instead of up. For an unordered list, the CSS `list-style-type` property changes the bullet. The list element still tells the browser and screen reader that this is a list, so keep the structure and style it instead of drawing your own bullets.',
          language: 'html',
          code: `<ol type="A">
  <li>Plan</li>
  <li>Build</li>
  <li>Test</li>
</ol>

<ol reversed>
  <li>Third</li>
  <li>Second</li>
  <li>First</li>
</ol>

<ul style="list-style-type: square;">
  <li>Square bullet</li>
</ul>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<article>
  <h1>Make a cup of tea</h1>

  <!-- 1. Ingredients: order does not matter. -->
  <h2>Ingredients</h2>
  <ul>
    <li>Tea bag</li>
    <li>Hot water</li>
    <li>Milk, optional</li>
  </ul>

  <!-- 2. Steps: order matters. -->
  <h2>Steps</h2>
  <ol>
    <li>Boil the water.</li>
    <li>Put the tea bag in a cup.</li>
    <li>Pour the water and wait three minutes.</li>
  </ol>

  <!-- 3. A nested list inside one item. -->
  <h2>Variations</h2>
  <ul>
    <li>
      Iced tea
      <ul>
        <li>Use cold water.</li>
        <li>Add ice.</li>
      </ul>
    </li>
  </ul>

  <!-- 4. Terms and descriptions. -->
  <h2>Tea terms</h2>
  <dl>
    <dt>Steep</dt>
    <dd>Leave the tea in hot water to release flavour.</dd>
    <dt>Infusion</dt>
    <dd>A drink made by steeping leaves or herbs.</dd>
  </dl>
</article>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A list is not a stack of line breaks',
          content:
            'Do not write item after item separated by `<br>` tags. A real list gives screen readers the number of items and lets users jump between them. Also keep `li` as a direct child of `ul` or `ol`; put any nested list inside an `li`.',
        },
      ],
      takeaways: [
        'Use ul for unordered items and ol for steps that must stay in order.',
        'Nest a list inside the li it belongs to.',
        'Use dl, dt, and dd for terms and their descriptions.',
        'Navigation menus are lists of links inside a nav landmark.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element creates a numbered list?',
          options: ['<ul>', '<ol>', '<dl>', '<li>'],
          answer: 1,
          explanation:
            'ol is an ordered list, so the browser numbers the items automatically.',
        },
        {
          id: 'q2',
          question: 'Where should a nested list go?',
          options: [
            'Directly inside the outer ul',
            'Inside the li it belongs to',
            'After the closing ul',
            'Inside a p element',
          ],
          answer: 1,
          explanation:
            'The nested list belongs inside the parent list item so the relationship stays clear.',
        },
        {
          id: 'q3',
          question: 'Which pair describes a term and its definition?',
          options: ['ul and li', 'ol and li', 'dt and dd', 'dl and ul'],
          answer: 2,
          explanation:
            'In a description list, dt is the term and dd is its description.',
        },
      ],
    },
    {
      id: 'links-and-navigation',
      title: 'Links and navigation',
      summary: 'Learn href, relative and absolute URLs, page anchors, and safe external links.',
      minutes: 11,
      objectives: [
        'Create links with the anchor element',
        'Choose between absolute and relative URLs',
        'Link to a section of the same page',
        'Open external links safely',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Links connect the web together. Every link is an `a` element with an `href` attribute. The text between the tags is what the user clicks, so it should describe the destination clearly.',
        },
        {
          type: 'concept',
          title: 'href stores the destination',
          content:
            'The `href` attribute tells the browser where the link goes. Without it, the anchor is not a working link. The text inside the element is called the link text.',
          language: 'html',
          code: `<a href="https://developer.mozilla.org/">Read the MDN documentation</a>
<!-- href = destination; text = what the user clicks -->`,
        },
        {
          type: 'concept',
          title: 'Absolute URLs include the full address',
          content:
            'An absolute URL starts with a protocol such as `https://`. Use it for pages on other websites. It works from any page because it contains the complete location.',
          language: 'html',
          code: `<a href="https://example.com/about">About Example</a>
<!-- full address: protocol + domain + path -->`,
        },
        {
          type: 'concept',
          title: 'Relative URLs point within your site',
          content:
            'A relative URL is shorter because it is resolved from the current page. `about.html` is a file in the same folder. `../index.html` goes up one folder. Start with `/` to resolve from the site root.',
          language: 'html',
          code: `<a href="about.html">About this site</a>
<!-- same folder -->

<a href="../index.html">Home</a>
<!-- one folder up -->

<a href="/contact">Contact</a>
<!-- from the site root -->`,
        },
        {
          type: 'concept',
          title: 'Fragment links jump within a page',
          content:
            'A link that starts with `#` targets an element with a matching `id` on the same page. This is how a table of contents jumps to a section. The id must be unique.',
          language: 'html',
          code: `<a href="#pricing">Jump to pricing</a>

<h2 id="pricing">Pricing</h2>
<!-- The id and the fragment must match. -->`,
        },
        {
          type: 'concept',
          title: 'External new tabs need rel protection',
          content:
            '`target="_blank"` opens a link in a new tab. When linking to another site, add `rel="noopener noreferrer"` so the new page cannot access your page through `window.opener` and does not receive your referrer information.',
          language: 'html',
          code: `<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Open Example in a new tab
</a>`,
        },
        {
          type: 'concept',
          title: 'mailto and tel start other apps',
          content:
            'A `mailto:` link opens the user’s email app. A `tel:` link starts a phone call on a device that supports it. These are still normal anchors with a special href value.',
          language: 'html',
          code: `<a href="mailto:hello@example.com">Email us</a>
<a href="tel:+15551234567">Call us</a>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<header>
  <nav aria-label="Main navigation">
    <!-- Relative links within this site. -->
    <a href="/">Home</a>
    <a href="/lessons">Lessons</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <h1>Links in practice</h1>

  <p>
    Read the
    <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">
      MDN documentation
    </a>
    for more detail.
  </p>

  <h2 id="contact">Contact</h2>
  <p>
    <a href="mailto:hello@example.com">Send an email</a>
    or <a href="tel:+15551234567">call us</a>.
  </p>
</main>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Make link text descriptive',
          content:
            '“Read the pricing guide” is better than “click here”. Screen reader users often list all links out of context, so each link should make sense on its own.',
        },
      ],
      takeaways: [
        'Every link uses an a element with an href destination.',
        'Absolute URLs include the full address; relative URLs resolve from the current page.',
        'Fragment links use #id to jump to a matching element.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which attribute stores a link destination?',
          options: ['src', 'href', 'link', 'target'],
          answer: 1,
          explanation: 'The href attribute holds the URL that the anchor points to.',
        },
        {
          id: 'q2',
          question: 'What does href="#pricing" link to?',
          options: [
            'A website called pricing',
            'An element with id="pricing" on the current page',
            'A CSS class named pricing',
            'A file named #pricing',
          ],
          answer: 1,
          explanation:
            'A fragment beginning with # targets an element whose id matches the fragment.',
        },
        {
          id: 'q3',
          question: 'Why add rel="noopener noreferrer" to an external target="_blank" link?',
          options: [
            'To make the link load faster',
            'To protect the original page and limit referrer information',
            'To open the link in the same tab',
            'To make the link bold',
          ],
          answer: 1,
          explanation:
            'noopener prevents the new page from controlling the original through window.opener; noreferrer also hides referrer details.',
        },
      ],
    },
    {
      id: 'images-and-figures',
      title: 'Images and figures',
      summary:
        'Learn src, alt text, dimensions, captions, lazy loading, and responsive image choices.',
      minutes: 14,
      objectives: [
        'Embed an image with descriptive alternative text',
        'Match alt text to the image’s purpose',
        'Reserve space with width and height',
        'Add a visible caption with figure and figcaption',
        'Provide different image sizes for different screens',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Images make a page richer, but they also need care. A useful image must load from the right place, describe itself for people who cannot see it, and avoid breaking the layout while it loads.',
        },
        {
          type: 'concept',
          title: 'src points to the image file',
          content:
            'The `src` attribute is the image path. It can be relative to the current page or a full URL. The browser downloads the file and draws it in the page.',
          language: 'html',
          code: `<img src="images/mountains.jpg" alt="Snow-covered mountains" />
<!-- src = where the image file lives -->`,
        },
        {
          type: 'concept',
          title: 'alt describes the image',
          content:
            '`alt` is the alternative text. Screen readers announce it, and browsers show it if the image fails. Describe the content and purpose, not the filename. Use `alt=""` only when the image is purely decorative.',
          language: 'html',
          code: `<img
  src="images/chart.png"
  alt="Bar chart showing sales rising from January to June"
/>
<!-- Good alt text explains what the image communicates. -->`,
        },
        {
          type: 'concept',
          title: 'width and height reserve space',
          content:
            'The `width` and `height` attributes give the browser the image’s aspect ratio before it loads. This prevents the page from jumping as images appear. CSS can still resize the image responsively.',
          language: 'html',
          code: `<img
  src="images/photo.jpg"
  alt="A hiker on a mountain trail"
  width="800"
  height="600"
/>
<!-- The browser reserves an 800 by 600 space. -->`,
        },
        {
          type: 'concept',
          title: 'figure groups an image with its caption',
          content:
            'A `figure` groups an image with a visible caption. `figcaption` holds the caption text. The caption is not a replacement for alt text: alt serves assistive technology, while figcaption is visible to everyone.',
          language: 'html',
          code: `<figure>
  <img src="images/bridge.jpg" alt="A steel bridge at sunset" />
  <figcaption>The bridge at sunset, photographed in June.</figcaption>
</figure>`,
        },
        {
          type: 'concept',
          title: 'srcset and picture offer choices',
          content:
            '`srcset` lets the browser choose a smaller or larger file based on screen size and resolution. The `picture` element chooses between entirely different crops or formats. The browser makes the final choice, not you.',
          language: 'html',
          code: `<picture>
  <source media="(min-width: 800px)" srcset="hero-wide.jpg" />
  <img src="hero-small.jpg" alt="A wide mountain landscape" />
</picture>
<!-- Wide screens get the wide crop; phones get the small file. -->`,
        },
        {
          type: 'concept',
          title: 'alt text depends on the image’s job',
          content:
            'The right alt text changes with context. A chart needs a summary of the data, a linked logo needs the link destination, and a purely decorative divider needs `alt=""` so screen readers skip it. Ask what the image communicates in this place, not what file it came from.',
          language: 'html',
          code: `<img
  src="/images/sales-chart.png"
  alt="Sales rose from 10 in January to 25 in June"
/>

<a href="/">
  <img src="/images/logo.svg" alt="CodeLearn home" />
</a>

<img src="/images/divider.svg" alt="" />
<!-- An empty alt marks a decorative image. -->`,
        },
        {
          type: 'concept',
          title: 'loading="lazy" defers off-screen images',
          content:
            'Images below the visible area do not need to download immediately. Add `loading="lazy"` to let the browser wait until they are near the viewport, and `decoding="async"` to avoid blocking the page while the image is decoded. Keep the main hero image eager so the top of the page appears quickly.',
          language: 'html',
          code: `<img
  src="/images/hero.jpg"
  alt="Students working together at a table"
  width="1200"
  height="600"
/>

<img
  src="/images/gallery-1.jpg"
  alt="A close-up of a laptop showing HTML code"
  width="600"
  height="400"
  loading="lazy"
  decoding="async"
/>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<figure>
  <!-- 1. Provide the file and a description. -->
  <img
    src="/images/mountains.jpg"
    alt="Snow-covered mountains at sunrise"
    width="800"
    height="600"
  />

  <!-- 2. Add a visible caption. -->
  <figcaption>Sunrise over the northern range.</figcaption>
</figure>

<!-- 3. Let the browser choose an appropriate file. -->
<picture>
  <source media="(min-width: 900px)" srcset="/images/mountains-wide.jpg" />
  <img
    src="/images/mountains-small.jpg"
    alt="Snow-covered mountains at sunrise"
    width="800"
    height="600"
  />
</picture>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Alt text is not a filename',
          content:
            '“mountains.jpg” tells the user nothing useful. Describe what the image shows and why it matters. If the image is only decoration, use an empty alt so screen readers skip it.',
        },
      ],
      takeaways: [
        'src locates the image; alt describes it.',
        'Match alt text to purpose, and use alt="" for decoration.',
        'width and height prevent layout shifts while the image loads.',
        'figure and figcaption add a visible caption; srcset and picture offer responsive choices.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is the purpose of the alt attribute?',
          options: [
            'To set the image size',
            'To describe the image for screen readers and failed loads',
            'To choose the image file',
            'To add a border',
          ],
          answer: 1,
          explanation:
            'Alternative text communicates the image content when it cannot be seen.',
        },
        {
          id: 'q2',
          question: 'Which element is a void element?',
          options: ['<figure>', '<figcaption>', '<img>', '<picture>'],
          answer: 2,
          explanation: 'img cannot contain content and has no closing tag.',
        },
        {
          id: 'q3',
          question: 'What is figcaption for?',
          options: [
            'Hiding an image',
            'A visible caption for a figure',
            'Replacing alt text',
            'Choosing an image format',
          ],
          answer: 1,
          explanation:
            'figcaption provides a visible caption; alt serves assistive technology and failed loads.',
        },
      ],
    },
    {
      id: 'forms',
      title: 'Forms',
      summary: 'Build labelled forms with inputs, choices, validation, and clear submission buttons.',
      minutes: 22,
      objectives: [
        'Connect labels to form controls',
        'Explain how id and name serve different jobs',
        'Choose input types and autocomplete tokens',
        'Group related controls with fieldset and legend',
        'Use checkboxes for multiple choices',
        'Apply built-in validation attributes',
        'Submit a form with the right button type',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Forms collect information from the user. Every control should be labelled, and every label should be connected to its control. We will build the form one control type at a time.',
        },
        {
          type: 'concept',
          title: 'form wraps the controls',
          content:
            'A `form` groups controls that are submitted together. `action` is the URL that receives the data, and `method` is how it is sent. `post` is the usual choice for changes or private data; `get` puts data in the URL and is suitable for searches.',
          language: 'html',
          code: `<form action="/subscribe" method="post">
  <!-- controls go here -->
</form>`,
        },
        {
          type: 'concept',
          title: 'label names a control',
          content:
            'A `label` describes an input. Match its `for` attribute to the input’s `id`. Clicking the label then focuses the input, and screen readers announce the field correctly.',
          language: 'html',
          code: `<label for="email">Email address</label>
<input id="email" name="email" type="email" />
<!-- for="email" matches id="email" -->`,
        },
        {
          type: 'concept',
          title: 'id connects; name submits',
          content:
            '`id` is the page-wide identifier that a label points to. `name` is the key sent to the server with the field’s value. A control usually needs both: `id` for the label and `name` for the submitted data.',
          language: 'html',
          code: `<label for="email">Email address</label>
<input id="email" name="email" type="email" />
<!-- id="email" links the label; name="email" is the submitted key -->`,
        },
        {
          type: 'concept',
          title: 'Input types choose the right keyboard',
          content:
            '`type` tells the browser what kind of value to expect. `text` is a single line, `email` validates an address, `password` hides characters, and `number` accepts digits. On phones, the keyboard changes to suit the type.',
          language: 'html',
          code: `<input id="name" name="name" type="text" />
<input id="email" name="email" type="email" />
<input id="password" name="password" type="password" />
<input id="age" name="age" type="number" min="13" />`,
        },
        {
          type: 'concept',
          title: 'Match special inputs to the data',
          content:
            'Some data has a dedicated input type. `tel` opens a phone keypad, `url` checks a web address, `date` opens a date picker, and `file` lets the user choose a file. Use them when they match the value you need.',
          language: 'html',
          code: `<label for="phone">Phone</label>
<input id="phone" name="phone" type="tel" autocomplete="tel" />

<label for="site">Website</label>
<input id="site" name="site" type="url" />

<label for="start">Start date</label>
<input id="start" name="start" type="date" />

<label for="cv">CV</label>
<input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" />`,
        },
        {
          type: 'concept',
          title: 'required and placeholder do different jobs',
          content:
            '`required` makes a field mandatory before submission. `placeholder` shows a hint inside an empty field, but it disappears as soon as typing starts and is not a substitute for a label.',
          language: 'html',
          code: `<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  placeholder="you@example.com"
  required
/>
<!-- required = must be filled; placeholder = temporary hint -->`,
        },
        {
          type: 'concept',
          title: 'Built-in attributes validate before submission',
          content:
            'The browser can check simple rules without JavaScript. `minlength` and `maxlength` limit text length, `min` and `max` limit numbers, and `pattern` checks a regular expression. Add a clear `title` so users know what the pattern expects.',
          language: 'html',
          code: `<label for="username">Username</label>
<input id="username" name="username" minlength="3" maxlength="20" required />

<label for="age">Age</label>
<input id="age" name="age" type="number" min="13" max="120" />

<label for="code">Invite code</label>
<input
  id="code"
  name="code"
  pattern="[A-Z]{3}-[0-9]{3}"
  title="Three uppercase letters, a dash, then three digits"
/>`,
        },
        {
          type: 'concept',
          title: 'autocomplete helps browsers fill fields',
          content:
            '`autocomplete` tells the browser what kind of value a field expects, so it can offer saved names, addresses, emails, and phone numbers. Use standard tokens such as `name`, `email`, `tel`, `street-address`, and `postal-code`. If autofill would be unsafe for a field, use `autocomplete="off"` on that field.',
          language: 'html',
          code: `<label for="full-name">Full name</label>
<input id="full-name" name="name" autocomplete="name" />

<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" />

<label for="phone">Phone</label>
<input id="phone" name="phone" type="tel" autocomplete="tel" />`,
        },
        {
          type: 'concept',
          title: 'fieldset groups related controls',
          content:
            'A `fieldset` groups related controls and draws a border around them. Its `legend` gives the group a name. This is especially useful for radio buttons, where the group label explains what the choices mean.',
          language: 'html',
          code: `<fieldset>
  <legend>Contact preference</legend>

  <label>
    <input type="radio" name="contact" value="email" />
    Email
  </label>

  <label>
    <input type="radio" name="contact" value="phone" />
    Phone
  </label>
</fieldset>`,
        },
        {
          type: 'concept',
          title: 'Checkboxes allow more than one choice',
          content:
            'Use `input type="checkbox"` when the user may pick several options. Give every checkbox the same `name` and a different `value`; the submitted data can contain more than one value. Use radio buttons instead when only one choice is allowed.',
          language: 'html',
          code: `<fieldset>
  <legend>Topics you want</legend>

  <label>
    <input type="checkbox" name="topics" value="html" />
    HTML
  </label>

  <label>
    <input type="checkbox" name="topics" value="css" />
    CSS
  </label>

  <label>
    <input type="checkbox" name="topics" value="javascript" />
    JavaScript
  </label>
</fieldset>`,
        },
        {
          type: 'concept',
          title: 'select offers a menu of options',
          content:
            'A `select` lets the user choose one option from a menu. Each `option` needs a `value`; that value is what the form submits, while the text between the tags is what the user sees. A first option with an empty value works as a “choose one” prompt.',
          language: 'html',
          code: `<label for="plan">Plan</label>
<select id="plan" name="plan">
  <option value="">Choose a plan</option>
  <option value="free">Free</option>
  <option value="pro">Pro</option>
</select>`,
        },
        {
          type: 'concept',
          title: 'textarea collects longer answers',
          content:
            'A `textarea` is for multi-line text such as a message or notes. Put the starting text between the opening and closing tags; it does not use a `value` attribute. `rows` suggests the visible height, and `maxlength` limits how much the user can type.',
          language: 'html',
          code: `<label for="message">Message</label>
<textarea id="message" name="message" rows="5" maxlength="500"></textarea>`,
        },
        {
          type: 'concept',
          title: 'Choose the right button type',
          content:
            'A `button` inside a form submits by default, but being explicit is safer. `type="submit"` sends the form, `type="reset"` clears the controls, and `type="button"` does nothing until JavaScript handles it. Use a clear verb as the button label.',
          language: 'html',
          code: `<button type="submit">Send message</button>
<button type="reset">Clear form</button>
<button type="button">Preview</button>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<form action="/subscribe" method="post">
  <!-- 1. Text and email fields. -->
  <label for="name">Name</label>
  <input id="name" name="name" type="text" autocomplete="name" required />

  <label for="email">Email address</label>
  <input
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    placeholder="you@example.com"
    required
  />

  <!-- 2. A menu of choices. -->
  <label for="plan">Plan</label>
  <select id="plan" name="plan">
    <option value="">Choose a plan</option>
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>

  <!-- 3. A multi-line message. -->
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4" maxlength="500"></textarea>

  <!-- 4. A grouped choice. -->
  <fieldset>
    <legend>Contact preference</legend>
    <label><input type="radio" name="contact" value="email" /> Email</label>
    <label><input type="radio" name="contact" value="phone" /> Phone</label>
  </fieldset>

  <!-- 5. An optional multiple-choice question. -->
  <fieldset>
    <legend>Topics you want</legend>
    <label><input type="checkbox" name="topics" value="html" /> HTML</label>
    <label><input type="checkbox" name="topics" value="css" /> CSS</label>
  </fieldset>

  <!-- 6. Submit. -->
  <button type="submit">Subscribe</button>
</form>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A placeholder is not a label',
          content:
            'Placeholders vanish when the user types and are not reliably announced. Keep a real label above every control, and use placeholder only for an optional example.',
        },
      ],
      takeaways: [
        'Match a label’s for attribute to the input’s id.',
        'id connects the label; name is the key sent to the server.',
        'Use input types and autocomplete to fit the data.',
        'Group related choices with fieldset and legend.',
        'Checkboxes allow multiple choices; radio buttons allow one.',
        'Built-in attributes catch simple mistakes before submission.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'How do you connect a label to an input?',
          options: [
            'Give both the same class',
            'Match the label for attribute to the input id',
            'Put the input in a div',
            'Add name to the label',
          ],
          answer: 1,
          explanation:
            'The for attribute references the input id, linking the label to the control.',
        },
        {
          id: 'q2',
          question: 'Which input type hides the characters being typed?',
          options: ['text', 'email', 'password', 'number'],
          answer: 2,
          explanation: 'type="password" masks the value on screen.',
        },
        {
          id: 'q3',
          question: 'What does the required attribute do?',
          options: [
            'Adds a hint inside the field',
            'Prevents the form from submitting until the field is filled',
            'Changes the keyboard type',
            'Makes the label bold',
          ],
          answer: 1,
          explanation:
            'required makes the field mandatory for form submission.',
        },
      ],
    },
    {
      id: 'tables',
      title: 'Tables',
      summary: 'Build accessible tables with headers, captions, row groups, and spanning cells.',
      minutes: 20,
      objectives: [
        'Structure a table with rows, headers, and data cells',
        'Connect headers to data with scope',
        'Add a caption and group rows with thead, tbody, and tfoot',
        'Use row headers for the first column',
        'Span cells across columns or rows',
        'Group columns with colgroup',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Tables are for data that has a relationship between rows and columns, such as a schedule or a price list. They are not a layout tool. A well-built table lets a screen reader announce which header belongs to each cell.',
        },
        {
          type: 'concept',
          title: 'Rows contain cells',
          content:
            'A `table` contains rows (`tr`). Each row contains data cells (`td`) or header cells (`th`). The browser aligns the cells into columns automatically.',
          language: 'html',
          code: `<table>
  <tr>
    <td>Python</td>
    <td>4 lessons</td>
  </tr>
  <tr>
    <td>HTML</td>
    <td>16 lessons</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'th marks a header cell',
          content:
            'Use `th` for a cell that labels a row or column, and `td` for the data itself. The browser usually makes header cells bold and centered. Marking headers as `th` is what lets assistive technology treat them as labels instead of data.',
          language: 'html',
          code: `<table>
  <tr>
    <th>Course</th>
    <th>Lessons</th>
  </tr>
  <tr>
    <td>HTML</td>
    <td>16</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'scope connects a header to its cells',
          content:
            '`scope="col"` says a header labels the column below it. `scope="row"` says it labels the row beside it. Adding scope removes guesswork for screen readers, especially in tables with both column and row headers.',
          language: 'html',
          code: `<table>
  <tr>
    <th scope="col">Course</th>
    <th scope="col">Lessons</th>
  </tr>
  <tr>
    <th scope="row">HTML</th>
    <td>16</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'row headers label each row',
          content:
            'When the first cell of every row names that row, make it a `th` with `scope="row"`. A screen reader can then announce the row name together with each data cell, so “8” becomes “HTML, 8”.',
          language: 'html',
          code: `<table>
  <tr>
    <th scope="row">HTML</th>
    <td>16 lessons</td>
    <td>8 complete</td>
  </tr>
  <tr>
    <th scope="row">CSS</th>
    <td>12 lessons</td>
    <td>4 complete</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'caption names the table',
          content:
            'A `caption` is the visible title of the table. It must be the first child of `table`. Unlike a heading outside the table, the caption is announced as part of the table, so users know what the data represents.',
          language: 'html',
          code: `<table>
  <caption>Course progress</caption>
  <!-- The caption explains the whole table. -->
</table>`,
        },
        {
          type: 'concept',
          title: 'thead, tbody, and tfoot group rows',
          content:
            '`thead` holds header rows, `tbody` holds the main data, and `tfoot` holds summary rows. These groups help browsers and assistive technology understand the table, especially when it is long.',
          language: 'html',
          code: `<table>
  <thead>
    <tr><th scope="col">Course</th><th scope="col">Done</th></tr>
  </thead>
  <tbody>
    <tr><td>HTML</td><td>8</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>8</td></tr>
  </tfoot>
</table>`,
        },
        {
          type: 'concept',
          title: 'colspan spans columns',
          content:
            '`colspan` makes one cell stretch across several columns. Use it for a header that covers a group of columns or a summary row that needs fewer cells. The number is the count of columns the cell occupies.',
          language: 'html',
          code: `<table>
  <tr>
    <th scope="col" colspan="2">Monthly totals</th>
  </tr>
  <tr>
    <td>January</td>
    <td>100</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'rowspan spans rows',
          content:
            '`rowspan` makes one cell stretch down several rows. It is useful when a label applies to a group of rows, such as a month containing several weeks. Count the rows carefully so the remaining cells still line up.',
          language: 'html',
          code: `<table>
  <tr>
    <td rowspan="2">January</td>
    <td>Week 1</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Week 2</td>
    <td>30</td>
  </tr>
</table>`,
        },
        {
          type: 'concept',
          title: 'colgroup groups columns',
          content:
            'A `colgroup` describes columns as a group. Each `col` can represent one column, and `span` lets one `col` cover several. This is mainly useful for styling whole columns with CSS; it does not replace `th` headers or change the table data.',
          language: 'html',
          code: `<table>
  <caption>Monthly sales</caption>
  <colgroup>
    <col />
    <col span="2" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Online</th>
      <th scope="col">In store</th>
    </tr>
  </thead>
</table>`,
        },
        {
          type: 'concept',
          title: 'check the table before you publish',
          content:
            'Ask these questions: Is this data that really needs rows and columns? Does the table have a caption? Is every header a `th` with the right `scope`? Are long tables split with `thead`, `tbody`, and `tfoot`? If a list or a few headings would explain the content better, use those instead.',
        },
        {
          type: 'code',
          language: 'html',
          code: `<table>
  <!-- 1. The table title. -->
  <caption>Course progress</caption>

  <!-- 2. Column groups for styling. -->
  <colgroup>
    <col />
    <col />
    <col span="2" />
  </colgroup>

  <!-- 3. Header rows. -->
  <thead>
    <tr>
      <th scope="col">Track</th>
      <th scope="col">Course</th>
      <th scope="col">Lessons done</th>
      <th scope="col">Status</th>
    </tr>
  </thead>

  <!-- 4. Data rows. -->
  <tbody>
    <tr>
      <td rowspan="2">Web</td>
      <th scope="row">HTML</th>
      <td>8</td>
      <td>In progress</td>
    </tr>
    <tr>
      <th scope="row">CSS</th>
      <td>4</td>
      <td>Complete</td>
    </tr>
    <tr>
      <td>Programming</td>
      <th scope="row">Python</th>
      <td>2</td>
      <td>In progress</td>
    </tr>
  </tbody>

  <!-- 5. A summary row. -->
  <tfoot>
    <tr>
      <td colspan="3">Total lessons done</td>
      <td>14</td>
    </tr>
  </tfoot>
</table>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tables are not layouts',
          content:
            'Do not use a table to position a page header, sidebar, and footer. Use semantic layout elements and CSS. Tables should contain data whose meaning depends on rows and columns.',
        },
      ],
      takeaways: [
        'Use th for headers and td for data cells.',
        'scope connects each header to the cells it describes.',
        'Use row headers when the first column names each row.',
        'caption names the table; thead, tbody, and tfoot group rows.',
        'colspan spans columns and rowspan spans rows; use them sparingly.',
        'colgroup groups columns for styling, not for structure.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element defines a header cell?',
          options: ['td', 'th', 'tr', 'thead'],
          answer: 1,
          explanation: 'th marks a header cell; td marks a data cell.',
        },
        {
          id: 'q2',
          question: 'What does a table caption do?',
          options: [
            'Sorts the rows',
            'Provides a visible title for the table',
            'Merges two columns',
            'Hides the header row',
          ],
          answer: 1,
          explanation:
            'The caption is the table’s title and is announced with the table.',
        },
        {
          id: 'q3',
          question: 'Which attribute makes a cell span two columns?',
          options: ['rowspan', 'colspan', 'scope', 'span'],
          answer: 1,
          explanation:
            'colspan stretches a cell across multiple columns; rowspan spans rows.',
        },
      ],
    },
    {
      id: 'semantic-html',
      title: 'Semantic HTML',
      summary: 'Learn each layout tag and why meaning matters for accessibility.',
      minutes: 11,
      objectives: [
        'Replace generic divs with semantic landmarks',
        'Understand why semantics matter for accessibility',
        'Structure a complete page layout',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Semantic tags describe the role of a section of the page. They look like normal containers, but browsers and assistive technology can understand them. Learn the role of each one before building the layout.',
        },
        {
          type: 'concept',
          title: 'header introduces the page or a section',
          content:
            'A `header` holds introductory content: a logo, the page title, or a navigation bar. A page usually has a top-level header, and an article can have its own header.',
          language: 'html',
          code: `<header>
  <h1>CodeLearn</h1>
  <!-- Logo, title, or intro content -->
</header>`,
        },
        {
          type: 'concept',
          title: 'nav groups navigation links',
          content:
            'A `nav` contains a set of links for moving around the site or page. Screen reader users can jump straight to navigation instead of reading every link in the body.',
          language: 'html',
          code: `<nav>
  <a href="/">Home</a>
  <a href="/progress">Progress</a>
</nav>`,
        },
        {
          type: 'concept',
          title: 'main marks the primary content',
          content:
            'There should be one `main` element per page. It wraps the content that is unique to this page, not the site-wide header or footer.',
          language: 'html',
          code: `<main>
  <!-- The most important content of this page -->
</main>`,
        },
        {
          type: 'concept',
          title: 'article and section group content',
          content:
            'An `article` is self-contained: it would still make sense on its own, such as a blog post or a lesson. A `section` is a themed group inside a larger page. Both usually start with a heading.',
          language: 'html',
          code: `<article>
  <h2>Why semantics matter</h2>
  <p>Structure communicates meaning.</p>
</article>

<section>
  <h2>Exercises</h2>
  <!-- A themed group of related content -->
</section>`,
        },
        {
          type: 'concept',
          title: 'aside and footer finish the layout',
          content:
            'An `aside` holds related but secondary content, such as a sidebar or a note. A `footer` closes the page or a section with extra information like copyright or contact details.',
          language: 'html',
          code: `<aside>
  <p>Tip: press Tab to move through links.</p>
</aside>

<footer>
  <p>Built for curious people.</p>
</footer>`,
        },
        {
          type: 'concept',
          title: 'div is the generic fallback',
          content:
            'A `div` is a plain container with no meaning. Use it only when you need a wrapper for styling and no semantic tag fits. A page made entirely of divs still renders, but gives assistive technology no landmarks.',
          language: 'html',
          code: `<div class="card">
  <!-- No special meaning: just a styled box -->
</div>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<body>
  <header>
    <!-- 1. Site header -->
    <h1>CodeLearn</h1>

    <nav aria-label="Main navigation">
      <!-- 2. Navigation links -->
      <a href="/">Home</a>
      <a href="/progress">Progress</a>
    </nav>
  </header>

  <main>
    <!-- 3. The unique content of this page -->
    <article>
      <!-- 4. A self-contained lesson -->
      <h2>Why semantics matter</h2>
      <p>Structure communicates meaning.</p>
    </article>

    <aside>
      <!-- 5. Secondary, related content -->
      <p>Tip: use landmarks to navigate quickly.</p>
    </aside>
  </main>

  <footer>
    <!-- 6. Closing information -->
    <p>Built for curious people.</p>
  </footer>
</body>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Landmarks in practice',
          content:
            'Screen reader users can jump between landmarks. A page should have one main element and clearly labelled navigation. Skip links let keyboard users bypass repeated menus.',
        },
      ],
      takeaways: [
        'Semantic elements convey meaning and create landmarks.',
        'One main element per page keeps the structure clear.',
        'Use div only when no semantic element fits.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element marks the primary content of a page?',
          options: ['main', 'body', 'section', 'content'],
          answer: 0,
          explanation: 'The main element wraps the dominant content and creates a landmark.',
        },
        {
          id: 'q2',
          question: 'When should you use a div?',
          options: [
            'For every container',
            'When you need styling and no semantic element fits',
            'For navigation',
            'For headings',
          ],
          answer: 1,
          explanation:
            'div is a generic container. Prefer semantic elements when they describe the content.',
        },
        {
          id: 'q3',
          question: 'Why does semantic HTML help accessibility?',
          options: [
            'It makes pages load faster',
            'It gives screen readers landmarks and meaning',
            'It removes the need for CSS',
            'It automatically adds alt text',
          ],
          answer: 1,
          explanation:
            'Assistive technology uses semantic roles to navigate and describe the page.',
        },
      ],
    },
    {
      id: 'divs-spans-grouping',
      title: 'Divs, spans, and grouping',
      summary: 'Learn block and inline boxes, reusable classes, and when not to use a div.',
      minutes: 10,
      objectives: [
        'Tell block elements from inline elements',
        'Group content with div and span',
        'Use class and id as styling hooks',
        'Choose semantic elements before generic containers',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Some elements are containers with no special meaning. They are useful for grouping, but they should not replace meaningful tags. First learn how block and inline boxes behave, then when a generic container is appropriate.',
        },
        {
          type: 'concept',
          title: 'Block elements start on a new line',
          content:
            'A block element takes the full available width and begins on a new line. Headings, paragraphs, lists, and divs are block elements by default. They stack vertically in normal document flow.',
          language: 'html',
          code: `<p>First paragraph</p>
<p>Second paragraph</p>
<!-- Each p starts on its own line. -->`,
        },
        {
          type: 'concept',
          title: 'Inline elements stay in the text flow',
          content:
            'An inline element takes only the space it needs and stays inside the surrounding line. Links, strong, em, and span are inline by default. Use them for a word or phrase inside a block.',
          language: 'html',
          code: `<p>
  Read the <a href="/guide">guide</a> and
  <strong>save your progress</strong>.
</p>
<!-- The link and strong text stay inside the paragraph line. -->`,
        },
        {
          type: 'concept',
          title: 'div is a generic block container',
          content:
            'A `div` groups block content when no semantic element fits. It has no built-in meaning, so it is useful for a styled card or a layout wrapper. It does not tell assistive technology anything about the content.',
          language: 'html',
          code: `<div class="card">
  <h2>Course progress</h2>
  <p>You have finished 8 lessons.</p>
</div>
<!-- A styled box with no special semantic role. -->`,
        },
        {
          type: 'concept',
          title: 'span is a generic inline container',
          content:
            'A `span` groups a small piece of text inside a larger block. It is useful when one word needs a different style. Like div, it has no meaning of its own.',
          language: 'html',
          code: `<p>
  Status: <span class="status-complete">Complete</span>
</p>
<!-- Only the word inside span is targeted by the class. -->`,
        },
        {
          type: 'concept',
          title: 'class is reusable; id is unique',
          content:
            'A `class` can be shared by many elements. An `id` must be unique in the document. Use classes for styling and repeated components, and use ids for fragment links or a single JavaScript hook.',
          language: 'html',
          code: `<div class="card">First card</div>
<div class="card">Second card</div>
<!-- The class can repeat. -->

<h2 id="pricing">Pricing</h2>
<!-- The id must be unique. -->`,
        },
        {
          type: 'concept',
          title: 'Prefer semantic elements when one fits',
          content:
            'Use `nav` for navigation, `main` for the primary content, and `article` for a self-contained piece. A page made only of divs still renders, but it gives screen readers no landmarks. A div is the fallback, not the default.',
          language: 'html',
          code: `<nav>
  <a href="/">Home</a>
</nav>
<!-- Better than <div class="nav"> -->

<main>
  <h1>Lessons</h1>
</main>
<!-- Better than <div class="main"> -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<main>
  <!-- 1. A semantic section, not a div. -->
  <section>
    <h2>Your progress</h2>

    <!-- 2. A generic card wrapper for styling. -->
    <div class="card">
      <p>
        Status:
        <!-- 3. An inline span for one word. -->
        <span class="status-complete">Complete</span>
      </p>
    </div>
  </section>

  <!-- 4. A second card reuses the same class. -->
  <div class="card">
    <p>Next: CSS layouts.</p>
  </div>
</main>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Avoid div soup',
          content:
            'If every container is a div, the page has structure for styling but no meaning for people or assistive technology. Reach for header, nav, main, section, article, aside, and footer first.',
        },
      ],
      takeaways: [
        'Block elements stack; inline elements stay in the text flow.',
        'div groups blocks; span groups inline content.',
        'Classes are reusable; ids are unique.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element is inline by default?',
          options: ['div', 'p', 'span', 'section'],
          answer: 2,
          explanation:
            'span is an inline container. div, p, and section are block elements.',
        },
        {
          id: 'q2',
          question: 'Which attribute can be reused on many elements?',
          options: ['id', 'class', 'for', 'scope'],
          answer: 1,
          explanation:
            'Classes can repeat. An id must be unique within the document.',
        },
        {
          id: 'q3',
          question: 'Which element should wrap the main navigation?',
          options: ['div', 'span', 'nav', 'p'],
          answer: 2,
          explanation:
            'nav communicates that the links are navigation, creating a landmark for assistive technology.',
        },
      ],
    },
    {
      id: 'head-and-metadata',
      title: 'The head and metadata',
      summary:
        'Learn title, charset, viewport, descriptions, social tags, stylesheets, and scripts.',
      minutes: 13,
      objectives: [
        'Explain what metadata is',
        'Add a page title and description',
        'Link a stylesheet and favicon',
        'Add social preview and indexing metadata',
        'Load scripts without blocking the page',
      ],
      sections: [
        {
          type: 'text',
          content:
            'The head is the page’s control room. Nothing in it appears in the main content area, but it tells the browser how to read the page, how to display it on different devices, and which files to load.',
        },
        {
          type: 'concept',
          title: 'title names the document',
          content:
            'The `title` appears in the browser tab, bookmarks, and search results. Every page should have a unique, descriptive title. It is not the same as the visible `h1` heading.',
          language: 'html',
          code: `<head>
  <title>Beginner HTML — Links and navigation</title>
</head>`,
        },
        {
          type: 'concept',
          title: 'charset and viewport set the basics',
          content:
            '`meta charset="UTF-8"` makes the browser read characters correctly. The viewport meta tag tells mobile browsers to use the device width. Both should appear early in the head.',
          language: 'html',
          code: `<meta charset="UTF-8" />
<!-- Correct accents, symbols, and emoji. -->

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Fit the page to the device width. -->`,
        },
        {
          type: 'concept',
          title: 'meta description summarises the page',
          content:
            'A description meta tag gives search engines a short summary. It does not directly change the page, but it can appear under the title in search results. Keep it specific and human-readable.',
          language: 'html',
          code: `<meta
  name="description"
  content="A beginner guide to links, relative URLs, and page anchors in HTML."
/>`,
        },
        {
          type: 'concept',
          title: 'link connects external files',
          content:
            'A `link` element with `rel="stylesheet"` loads a CSS file. A `link` with `rel="icon"` sets the favicon. These are void elements; the relationship is described by the `rel` attribute.',
          language: 'html',
          code: `<link rel="stylesheet" href="/styles.css" />
<!-- Load the stylesheet. -->

<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<!-- Set the browser-tab icon. -->`,
        },
        {
          type: 'concept',
          title: 'script defer waits for the HTML',
          content:
            'A script tag loads JavaScript. `defer` tells the browser to download the script in parallel but run it after the HTML has been parsed. This means the script can find the elements it needs.',
          language: 'html',
          code: `<script src="/app.js" defer></script>
<!-- Download now; run after the document is parsed. -->`,
        },
        {
          type: 'concept',
          title: 'Open Graph tags shape social previews',
          content:
            'When a page is shared on a social network or in a chat app, the app often builds a preview card. `property="og:..."` meta tags provide the title, description, and image for that card. They do not change the page itself, but they make shared links clearer and more trustworthy.',
          language: 'html',
          code: `<meta property="og:title" content="Beginner HTML — Links and navigation" />
<meta
  property="og:description"
  content="Learn how links, URLs, and page anchors work in HTML."
/>
<meta property="og:type" content="article" />
<meta property="og:image" content="https://example.com/social-card.png" />`,
        },
        {
          type: 'concept',
          title: 'robots meta controls search indexing',
          content:
            'The `robots` meta tag tells search engines whether they may index a page and follow its links. Use `noindex` for private, duplicate, or unfinished pages. This is a request, not a security feature: never put secrets on a page and rely on `noindex` to hide them.',
          language: 'html',
          code: `<meta name="robots" content="noindex, nofollow" />
<!-- Keep a private or unfinished page out of search results. -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 1. Character encoding and mobile layout. -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 2. The tab title and search summary. -->
    <title>Beginner HTML — Links and navigation</title>
    <meta
      name="description"
      content="Learn how links, URLs, and page anchors work in HTML."
    />

    <!-- 3. Stylesheet and favicon. -->
    <link rel="stylesheet" href="/styles.css" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

    <!-- 4. Deferred JavaScript. -->
    <script src="/app.js" defer></script>
  </head>

  <body>
    <h1>Links and navigation</h1>
  </body>
</html>`,
          caption: 'A complete head',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Metadata belongs in the head',
          content:
            'If a meta tag or link element accidentally lands in the body, the browser may still load it, but it is invalid and unpredictable. Keep configuration tags inside the head and content inside the body.',
        },
      ],
      takeaways: [
        'The head contains information about the page, not visible content.',
        'charset handles characters; viewport handles mobile sizing.',
        'Use link for stylesheets and icons, and defer for scripts that need the DOM.',
        'Open Graph tags improve shared previews; robots meta can keep pages out of search.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Where do meta, title, and linked stylesheets belong?',
          options: ['In the body', 'In the head', 'In the footer', 'Inside main'],
          answer: 1,
          explanation:
            'The head holds metadata and linked resources; the body holds visible content.',
        },
        {
          id: 'q2',
          question: 'What does the defer attribute on a script do?',
          options: [
            'Downloads the script faster',
            'Runs the script after the HTML is parsed',
            'Prevents the script from running',
            'Moves the script to the head',
          ],
          answer: 1,
          explanation:
            'defer downloads in parallel and executes after parsing, so the DOM is ready.',
        },
        {
          id: 'q3',
          question: 'What is a meta description used for?',
          options: [
            'Styling the page',
            'A short summary that search engines may show',
            'Loading JavaScript',
            'Setting the favicon',
          ],
          answer: 1,
          explanation:
            'Search engines may use the description as a snippet under the page title.',
        },
      ],
    },
    {
      id: 'media',
      title: 'Audio, video, and embeds',
      summary:
        'Add video, audio, captions, posters, playback options, and safely embedded third-party content.',
      minutes: 15,
      objectives: [
        'Embed video and audio with native controls',
        'Offer multiple source formats',
        'Add captions with track',
        'Use posters and playback attributes deliberately',
        'Embed external content responsibly',
      ],
      sections: [
        {
          type: 'text',
          content:
            'HTML can play media without JavaScript. The browser provides the controls, and you provide the files and captions. We will start with video, then audio, then embedded pages.',
        },
        {
          type: 'concept',
          title: 'video plays a movie file',
          content:
            'The `video` element embeds a video. `src` points to the file, and `controls` shows the play, pause, and volume controls. Without `controls`, the user may have no way to start playback.',
          language: 'html',
          code: `<video src="intro.mp4" controls width="640">
  Your browser does not support the video element.
</video>
<!-- controls adds the browser's playback interface. -->`,
        },
        {
          type: 'concept',
          title: 'source offers alternative formats',
          content:
            'Different browsers support different video formats. Use `source` elements inside `video` to offer alternatives. The browser picks the first format it can play. The text inside `video` is a fallback for very old browsers.',
          language: 'html',
          code: `<video controls width="640">
  <source src="intro.webm" type="video/webm" />
  <source src="intro.mp4" type="video/mp4" />
  Your browser cannot play this video.
</video>`,
        },
        {
          type: 'concept',
          title: 'audio works the same way',
          content:
            'The `audio` element plays sound files. It also supports `controls`, `source`, and fallback text. Keep audio short and provide a transcript when the content matters.',
          language: 'html',
          code: `<audio controls>
  <source src="theme.ogg" type="audio/ogg" />
  <source src="theme.mp3" type="audio/mpeg" />
  Your browser cannot play this audio.
</audio>`,
        },
        {
          type: 'concept',
          title: 'track adds captions and subtitles',
          content:
            'A `track` element adds timed text to video or audio. `kind="captions"` includes sound effects and speaker information for deaf and hard-of-hearing viewers. `srclang` names the language, and `label` is the menu label.',
          language: 'html',
          code: `<video controls>
  <source src="lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="lesson-en.vtt"
    srclang="en"
    label="English captions"
    default
  />
</video>`,
        },
        {
          type: 'concept',
          title: 'iframe embeds another page',
          content:
            'An `iframe` places another HTML page inside yours, such as a map or video player. Always add a `title` so screen reader users know what the frame contains. Use `loading="lazy"` to defer off-screen embeds.',
          language: 'html',
          code: `<iframe
  src="https://example.com/map"
  title="Map showing the workshop location"
  width="600"
  height="400"
  loading="lazy"
></iframe>`,
        },
        {
          type: 'concept',
          title: 'poster shows an image before playback',
          content:
            'The `poster` attribute points to an image the browser displays before the video starts or while it loads. Use a relevant still from the video rather than a misleading picture. The poster is only a visual preview; it does not replace captions or the video’s first frame.',
          language: 'html',
          code: `<video
  controls
  width="640"
  poster="/media/lesson-poster.jpg"
>
  <source src="/media/lesson.mp4" type="video/mp4" />
  Your browser cannot play this video.
</video>`,
        },
        {
          type: 'concept',
          title: 'preload, muted, and loop change playback',
          content:
            '`preload="metadata"` asks the browser to fetch only basic information such as the duration, which saves data. `muted` starts with the sound off, and `loop` repeats the media when it ends. Browsers usually block autoplay with sound, so `muted` is often required if you want a video to start automatically.',
          language: 'html',
          code: `<video controls muted loop preload="metadata" width="640">
  <source src="/media/lesson.mp4" type="video/mp4" />
</video>

<audio controls preload="none">
  <source src="/media/theme.mp3" type="audio/mpeg" />
</audio>
<!-- preload="none" waits until the user presses play. -->`,
        },
        {
          type: 'concept',
          title: 'figure gives media a visible caption',
          content:
            'Wrap a player in `<figure>` and add `<figcaption>` for a visible title, credit, or duration. This caption is visible to everyone. It is different from the captions inside the video, which are supplied with `track` for viewers who cannot hear the audio.',
          language: 'html',
          code: `<figure>
  <video controls width="640">
    <source src="/media/lesson.mp4" type="video/mp4" />
  </video>
  <figcaption>Lesson 3: Structuring a page (2 min 14 sec).</figcaption>
</figure>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<h1>Media examples</h1>

<!-- 1. Video with captions. -->
<video controls width="640">
  <source src="/media/lesson.webm" type="video/webm" />
  <source src="/media/lesson.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/media/lesson-en.vtt"
    srclang="en"
    label="English captions"
    default
  />
  Your browser cannot play this video.
</video>

<!-- 2. Audio with two formats. -->
<audio controls>
  <source src="/media/theme.ogg" type="audio/ogg" />
  <source src="/media/theme.mp3" type="audio/mpeg" />
  Your browser cannot play this audio.
</audio>

<!-- 3. A labelled external embed. -->
<iframe
  src="https://example.com/map"
  title="Map showing the workshop location"
  width="600"
  height="400"
  loading="lazy"
></iframe>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Captions are not optional',
          content:
            'If a video contains speech, provide captions. They help deaf and hard-of-hearing users, people in noisy places, and anyone who prefers reading. A transcript also helps search engines and users who cannot play audio.',
        },
      ],
      takeaways: [
        'Use video and audio with controls for built-in playback.',
        'Offer multiple source formats; the browser chooses one it supports.',
        'Add track captions and give every iframe a descriptive title.',
        'Use poster for a preview image and preload to control data usage.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which attribute shows the browser’s playback controls?',
          options: ['play', 'controls', 'autoplay', 'ui'],
          answer: 1,
          explanation: 'controls displays play, pause, volume, and other controls.',
        },
        {
          id: 'q2',
          question: 'Why use multiple source elements?',
          options: [
            'To play several videos at once',
            'To offer formats the browser can choose from',
            'To add captions',
            'To set the video width',
          ],
          answer: 1,
          explanation:
            'The browser selects the first source format it supports.',
        },
        {
          id: 'q3',
          question: 'Why does an iframe need a title attribute?',
          options: [
            'It sets the frame size',
            'It describes the embedded content for assistive technology',
            'It blocks the embed',
            'It adds a border',
          ],
          answer: 1,
          explanation:
            'The title identifies the frame so screen reader users know what it contains.',
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessible HTML',
      summary:
        'Use landmarks, alt text, labels, ARIA carefully, clear errors, and keyboard-friendly structure.',
      minutes: 15,
      objectives: [
        'Describe accessibility in practical terms',
        'Use landmarks and a skip link',
        'Write meaningful alt text and labels',
        'Prefer visible text over unnecessary ARIA',
        'Connect error messages to their inputs',
        'Keep headings and focus order logical',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Accessible HTML works for people who use screen readers, keyboards, magnification, voice control, or no mouse at all. Most of the work is choosing the right element rather than adding special features later.',
        },
        {
          type: 'concept',
          title: 'Landmarks let users jump around',
          content:
            'Elements such as `header`, `nav`, `main`, and `footer` create landmarks. Screen reader users can jump straight to the main content or navigation instead of listening to the whole page. Give repeated navs a label when needed.',
          language: 'html',
          code: `<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<footer>...</footer>
<!-- Each element creates a navigable landmark. -->`,
        },
        {
          type: 'concept',
          title: 'A skip link bypasses repeated navigation',
          content:
            'A skip link is the first focusable element on the page. It jumps keyboard users to the main content. It can be visually hidden until focused, but it must become visible when it receives keyboard focus.',
          language: 'html',
          code: `<a class="skip-link" href="#main-content">Skip to main content</a>

<main id="main-content">
  <h1>Page title</h1>
</main>`,
        },
        {
          type: 'concept',
          title: 'Alt text and labels carry the meaning',
          content:
            'Images need alt text that describes their purpose. Form controls need labels connected with `for` and `id`. Icon-only buttons need an accessible name, for example with `aria-label`.',
          language: 'html',
          code: `<img src="chart.png" alt="Sales rose from 10 to 25 in June" />

<label for="email">Email address</label>
<input id="email" name="email" type="email" />

<button type="button" aria-label="Close dialog">×</button>`,
        },
        {
          type: 'concept',
          title: 'Headings form an outline',
          content:
            'Use one `h1` for the page topic, then `h2` for major sections and `h3` for subsections. Do not skip levels just to make text smaller; use CSS for size. A logical outline helps screen reader users understand the page.',
          language: 'html',
          code: `<h1>Accessible HTML</h1>
<h2>Landmarks</h2>
<h3>Navigation</h3>
<h2>Keyboard support</h2>
<!-- Do not jump from h1 to h4. -->`,
        },
        {
          type: 'concept',
          title: 'Keyboard focus order follows the DOM',
          content:
            'Press Tab to move through links, buttons, and form controls. The order should match the visual order. Avoid positive `tabindex` values; they scramble the order. Use real buttons and links instead of clickable divs.',
          language: 'html',
          code: `<!-- Good: a real button is focusable and activates with Enter/Space. -->
<button type="button">Open menu</button>

<!-- Avoid: a div is not keyboard-operable by default. -->
<div class="button">Open menu</div>`,
        },
        {
          type: 'concept',
          title: 'Prefer visible text before ARIA',
          content:
            'ARIA attributes can name things, but they do not add behaviour. Start with a real element and visible text: a `<button>` with the word “Search” is already accessible. Use `aria-label` only when there is no visible text, and `aria-labelledby` when an existing heading or element already provides the name.',
          language: 'html',
          code: `<!-- Best: visible text names the button. -->
<button type="button">Search</button>

<!-- Icon-only button: aria-label supplies the missing name. -->
<button type="button" aria-label="Search lessons">🔍</button>

<h2 id="billing-heading">Billing address</h2>
<form aria-labelledby="billing-heading">...</form>`,
        },
        {
          type: 'concept',
          title: 'Error messages need text, not just colour',
          content:
            'A red border alone does not tell a screen reader user what went wrong. Add a text message, connect it to the input with `aria-describedby`, and set `aria-invalid="true"` while the value is wrong. The message should say how to fix the problem.',
          language: 'html',
          code: `<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error">Enter an email address in the format name@example.com.</p>`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<body>
  <!-- 1. Skip repeated navigation. -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header>
    <h1>Accessible HTML</h1>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/lessons">Lessons</a>
    </nav>
  </header>

  <!-- 2. The main landmark has a matching id. -->
  <main id="main-content">
    <h2>Join the course</h2>

    <form action="/subscribe" method="post">
      <!-- 3. Every control has a label. -->
      <label for="email">Email address</label>
      <input id="email" name="email" type="email" required />

      <button type="submit">Subscribe</button>
    </form>

    <!-- 4. A meaningful image description. -->
    <img src="/images/chart.png" alt="Course completion rose from 40% to 75%" />
  </main>

  <footer>
    <p>Built for everyone.</p>
  </footer>
</body>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Test with the keyboard',
          content:
            'Put the mouse aside and press Tab through the page. You should always see where focus is, reach every control, and never get trapped. Keyboard testing finds many problems before a screen reader is involved.',
        },
      ],
      takeaways: [
        'Semantic landmarks help users navigate quickly.',
        'Every image needs useful alt text; every control needs a label.',
        'Keep heading levels and keyboard focus order logical.',
        'Use ARIA only when native HTML cannot provide the name or state.',
        'Error messages should be text and connected to the input with aria-describedby.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is the purpose of a skip link?',
          options: [
            'To skip loading images',
            'To let keyboard users jump past repeated navigation',
            'To hide the footer',
            'To open a new tab',
          ],
          answer: 1,
          explanation:
            'A skip link moves focus directly to the main content for keyboard and screen reader users.',
        },
        {
          id: 'q2',
          question: 'How should an icon-only button be named?',
          options: [
            'With a placeholder',
            'With an aria-label or visually hidden text',
            'With an empty alt',
            'With a larger font size',
          ],
          answer: 1,
          explanation:
            'An aria-label or hidden text gives the button an accessible name when there is no visible text.',
        },
        {
          id: 'q3',
          question: 'Why should heading levels follow a logical order?',
          options: [
            'It makes the text bigger',
            'It creates an outline that screen reader users can navigate',
            'It improves image loading',
            'It is required for forms',
          ],
          answer: 1,
          explanation:
            'Assistive technology uses heading levels to build a navigable outline of the page.',
        },
      ],
    },
    {
      id: 'responsive-html',
      title: 'Responsive HTML',
      summary: 'Prepare markup and media for phones, tablets, and large screens.',
      minutes: 11,
      objectives: [
        'Set the viewport for mobile devices',
        'Make images scale without overflowing',
        'Serve different image files with srcset and picture',
        'Keep the content order meaningful on small screens',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Responsive design starts with HTML. The browser needs permission to use the device width, images need to shrink, and the content order must still make sense when everything stacks into one column.',
        },
        {
          type: 'concept',
          title: 'The viewport meta tag sets the stage',
          content:
            'Without the viewport tag, a phone may pretend the page is about 980 pixels wide and shrink everything. `width=device-width` tells the browser to use the real screen width. `initial-scale=1.0` starts at normal zoom.',
          language: 'html',
          code: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Use the device width and start at 100% zoom. -->`,
        },
        {
          type: 'concept',
          title: 'Images need permission to shrink',
          content:
            'An image with a fixed width can overflow a narrow screen. CSS `max-width: 100%` lets it shrink while `height: auto` keeps its proportions. The HTML still supplies width and height to reserve space.',
          language: 'html',
          code: `<img
  src="photo.jpg"
  alt="A mountain trail"
  width="800"
  height="600"
  style="max-width: 100%; height: auto;"
/>
<!-- The image never grows wider than its container. -->`,
        },
        {
          type: 'concept',
          title: 'srcset offers resolution choices',
          content:
            'High-density screens need more pixels. `srcset` lists several files with width descriptors, and `sizes` tells the browser how wide the image will appear. The browser downloads the smallest file that will look sharp.',
          language: 'html',
          code: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(min-width: 800px) 50vw, 100vw"
  alt="A mountain trail"
/>
<!-- Phones may pick 400w; large screens may pick 1600w. -->`,
        },
        {
          type: 'concept',
          title: 'picture chooses a different crop',
          content:
            'Use `picture` when different screens need a different composition, not just a different resolution. Each `source` can have a media condition. The `img` inside is the fallback and still needs alt text.',
          language: 'html',
          code: `<picture>
  <source media="(min-width: 900px)" srcset="hero-wide.jpg" />
  <source media="(max-width: 600px)" srcset="hero-square.jpg" />
  <img src="hero-default.jpg" alt="A mountain landscape" />
</picture>`,
        },
        {
          type: 'concept',
          title: 'Content order should work before CSS',
          content:
            'On a phone, columns often stack. Write the HTML in the order the content should be read: heading, main content, then secondary details. Do not rely on CSS to move important content earlier; keyboard and screen reader order follows the DOM.',
          language: 'html',
          code: `<main>
  <h1>Course</h1>
  <p>Start with the lesson.</p>
  <aside>Optional note for later.</aside>
</main>
<!-- The lesson comes before the optional note in the DOM. -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- 1. Tell phones to use their real width. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive HTML</title>
  </head>

  <body>
    <main>
      <h1>A responsive page</h1>

      <!-- 2. Let the image shrink. -->
      <img
        src="/images/photo-800.jpg"
        srcset="/images/photo-400.jpg 400w, /images/photo-800.jpg 800w, /images/photo-1600.jpg 1600w"
        sizes="(min-width: 800px) 50vw, 100vw"
        alt="A mountain trail at sunrise"
        width="800"
        height="600"
        style="max-width: 100%; height: auto;"
      />

      <!-- 3. Content order still makes sense when stacked. -->
      <p>Read the lesson first.</p>
      <aside>Extra practice appears after the lesson on small screens.</aside>
    </main>
  </body>
</html>`,
          caption: 'Putting the pieces together',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Test narrow first',
          content:
            'Resize the browser to its narrowest width before checking the desktop view. If the page scrolls sideways or the text becomes a tiny unreadable block, fix the small screen first, then enhance it.',
        },
      ],
      takeaways: [
        'The viewport meta tag makes mobile browsers use the device width.',
        'max-width: 100% prevents images from overflowing.',
        'srcset and picture let the browser choose the best image for the screen.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which meta tag tells a phone to use its real screen width?',
          options: ['charset', 'viewport', 'description', 'theme-color'],
          answer: 1,
          explanation:
            'The viewport meta tag sets width=device-width and controls the initial zoom.',
        },
        {
          id: 'q2',
          question: 'What does srcset provide?',
          options: [
            'A caption for the image',
            'A list of image files for different resolutions',
            'A fallback text',
            'A CSS width',
          ],
          answer: 1,
          explanation:
            'srcset lists image candidates with width descriptors so the browser can choose an appropriate file.',
        },
        {
          id: 'q3',
          question: 'Why should the DOM content order make sense on its own?',
          options: [
            'Search engines ignore CSS',
            'Keyboard and screen reader order follows the DOM',
            'It makes images load faster',
            'It removes the need for headings',
          ],
          answer: 1,
          explanation:
            'Assistive technology and keyboard navigation follow source order, so important content should come first.',
        },
      ],
    },
    {
      id: 'validation-and-debugging',
      title: 'Validation and debugging',
      summary: 'Find broken nesting, unclosed tags, duplicate ids, and silent browser fixes.',
      minutes: 10,
      objectives: [
        'Understand why browsers repair invalid HTML',
        'Recognise common nesting and closing mistakes',
        'Check ids and attributes',
        'Use the validator and developer tools',
      ],
      sections: [
        {
          type: 'text',
          content:
            'Browsers are forgiving. They often repair broken HTML and show something anyway, which can hide mistakes. Validation catches problems before they cause confusing layout or accessibility bugs.',
        },
        {
          type: 'concept',
          title: 'The browser repairs mistakes silently',
          content:
            'If you forget a closing tag, the browser guesses where it should go. The page may look fine but have a different tree than you intended. Never rely on the repair; write valid structure.',
          language: 'html',
          code: `<!-- Missing closing tag -->
<ul>
  <li>First
  <li>Second
</ul>

<!-- The browser may repair it, but the source is still wrong. -->`,
        },
        {
          type: 'concept',
          title: 'Respect nesting rules',
          content:
            'A `ul` can contain only `li` elements. A `p` cannot contain a block element such as a `div`. A `button` cannot contain a link. When the browser meets invalid nesting, it may close the parent early and move content elsewhere.',
          language: 'html',
          code: `<!-- Invalid: div is not allowed inside p. -->
<p>Hello <div>world</div></p>

<!-- Valid: use a block wrapper outside the paragraph. -->
<div>
  <p>Hello</p>
  <p>world</p>
</div>`,
        },
        {
          type: 'concept',
          title: 'Close paired tags and self-close void tags',
          content:
            'Elements such as `p`, `div`, and `li` need closing tags. Void elements such as `img`, `br`, and `input` do not. Mixing the two creates strange trees and unpredictable styles.',
          language: 'html',
          code: `<!-- Paired element -->
<p>Text</p>

<!-- Void elements: no closing tag -->
<img src="photo.jpg" alt="A trail" />
<br />
<input id="name" name="name" type="text" />`,
        },
        {
          type: 'concept',
          title: 'Ids must be unique and attributes quoted',
          content:
            'Duplicate ids break fragment links, labels, and JavaScript lookups. Attribute values should be quoted, especially when they contain spaces. Consistency makes the source easier to scan.',
          language: 'html',
          code: `<!-- Invalid: the same id appears twice. -->
<h2 id="pricing">Pricing</h2>
<p id="pricing">Prices</p>

<!-- Valid: one id per element. -->
<h2 id="pricing">Pricing</h2>
<p id="price-list">Prices</p>`,
        },
        {
          type: 'concept',
          title: 'Validate and inspect',
          content:
            'The W3C Nu HTML Checker reports invalid nesting and attributes. Browser developer tools show the tree the browser actually built, which may differ from your source. Use both when something behaves unexpectedly.',
          language: 'html',
          code: `<!-- Checklist -->
<!-- 1. Validate the file with the W3C checker. -->
<!-- 2. Inspect Elements in developer tools. -->
<!-- 3. Search for duplicate ids. -->
<!-- 4. Check labels, alt text, and heading order. -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!-- Before: several problems. -->
<ul>
  <li>HTML
  <li>CSS
</ul>

<p>Intro <div class="note">Note</div></p>

<h2 id="progress">Progress</h2>
<p id="progress">You are here.</p>

<!-- After: valid structure. -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<p>Intro</p>
<div class="note">Note</div>

<h2 id="progress">Progress</h2>
<p id="progress-note">You are here.</p>`,
          caption: 'Finding and fixing common mistakes',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'It renders does not mean it is valid',
          content:
            'A browser will show a page with broken HTML because it is designed to recover. The repaired tree may break your CSS, JavaScript, or screen reader experience. Validate the source instead of trusting the picture.',
        },
      ],
      takeaways: [
        'Browsers repair invalid HTML silently, so appearance is not proof of validity.',
        'Respect nesting rules and close paired elements.',
        'Keep ids unique and check the real tree in developer tools.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Why can invalid HTML still appear on screen?',
          options: [
            'The browser refuses to load it',
            'The browser repairs the tree while parsing',
            'CSS fixes the markup',
            'JavaScript rewrites the file',
          ],
          answer: 1,
          explanation:
            'Browsers have error-recovery rules and often build a usable tree from broken markup.',
        },
        {
          id: 'q2',
          question: 'Which nesting is invalid?',
          options: [
            '<ul><li>Item</li></ul>',
            '<p>Text</p><div>Box</div>',
            '<p>Text<div>Box</div></p>',
            '<nav><a href="/">Home</a></nav>',
          ],
          answer: 2,
          explanation:
            'A div is a block element and cannot be nested inside a paragraph.',
        },
        {
          id: 'q3',
          question: 'What is wrong with two elements sharing id="progress"?',
          options: [
            'Nothing, ids may repeat',
            'Ids must be unique in the document',
            'Ids only work on divs',
            'It makes the page load slower',
          ],
          answer: 1,
          explanation:
            'Duplicate ids break fragment links, label associations, and JavaScript lookups.',
        },
      ],
    },
    {
      id: 'complete-page',
      title: 'Build a complete page',
      summary: 'Combine the whole course into one accessible, validated project page.',
      minutes: 16,
      objectives: [
        'Plan a page before writing markup',
        'Combine semantic layout, content, forms, and media',
        'Check the finished page for accessibility and validity',
      ],
      sections: [
        {
          type: 'text',
          content:
            'You now know the individual pieces. This lesson assembles them into one complete page: a small course landing page with navigation, content, a form, and a footer. Read the plan first, then the final markup.',
        },
        {
          type: 'concept',
          title: 'Plan the content before the tags',
          content:
            'Sketch the page as a list of blocks: header with site name and navigation, main lesson introduction, a course card, a sign-up form, and a footer. Decide the heading hierarchy and the purpose of each section before writing code.',
          language: 'html',
          code: `<!-- Plan -->
<!-- 1. Site header + navigation -->
<!-- 2. Main heading and introduction -->
<!-- 3. Course card / article -->
<!-- 4. Sign-up form -->
<!-- 5. Footer -->`,
        },
        {
          type: 'concept',
          title: 'Start with the document shell',
          content:
            'The doctype, html, head, and body come first. Add the language, charset, viewport, title, and description. This shell is the same on every page, so it becomes quick to write.',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learn HTML — CodeLearn</title>
    <meta name="description" content="A beginner HTML course." />
  </head>
  <body>
    <!-- Page content -->
  </body>
</html>`,
        },
        {
          type: 'concept',
          title: 'Build the header and navigation',
          content:
            'The header introduces the site and holds the main navigation. Use one `h1` for the page topic, a `nav` for links, and `aria-label` to name the navigation landmark when needed.',
          language: 'html',
          code: `<header>
  <h1>CodeLearn</h1>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="#courses">Courses</a>
    <a href="#signup">Sign up</a>
  </nav>
</header>`,
        },
        {
          type: 'concept',
          title: 'Add the main content and a course card',
          content:
            'The `main` element holds the unique content of this page. A `section` groups the course list, and an `article` represents one self-contained course. Each section starts with a heading, and links or images keep their accessible text.',
          language: 'html',
          code: `<main>
  <section id="courses">
    <h2>Courses</h2>

    <article>
      <h3>HTML foundations</h3>
      <p>Learn structure, links, forms, and accessibility.</p>
      <a href="/languages/html">Start the HTML course</a>
    </article>
  </section>
</main>`,
        },
        {
          type: 'concept',
          title: 'Finish with a labelled form and footer',
          content:
            'The sign-up form needs a heading, labelled fields, and a submit button. The footer closes the page with secondary information. Every interactive control should be reachable by keyboard.',
          language: 'html',
          code: `<section id="signup">
  <h2>Get course updates</h2>

  <form action="/subscribe" method="post">
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" required />

    <button type="submit">Subscribe</button>
  </form>
</section>

<footer>
  <p>© 2026 CodeLearn. Built for curious people.</p>
</footer>`,
        },
        {
          type: 'concept',
          title: 'Run the final checks',
          content:
            'Validate the markup, inspect the browser tree, and press Tab through the page. Check that every image has alt text, every form control has a label, headings do not skip levels, and ids are unique.',
          language: 'html',
          code: `<!-- Final checklist -->
<!-- 1. Doctype and lang are present. -->
<!-- 2. One main element; logical headings. -->
<!-- 3. Images have useful alt text. -->
<!-- 4. Labels match input ids. -->
<!-- 5. No duplicate ids or invalid nesting. -->
<!-- 6. Page works at a narrow width. -->`,
        },
        {
          type: 'code',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 1. The document shell. -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learn HTML — CodeLearn</title>
    <meta name="description" content="A beginner HTML course." />
  </head>

  <body>
    <!-- 2. Site header and navigation. -->
    <header>
      <h1>CodeLearn</h1>
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="#courses">Courses</a>
        <a href="#signup">Sign up</a>
      </nav>
    </header>

    <main>
      <!-- 3. The course section. -->
      <section id="courses">
        <h2>Courses</h2>
        <p>Start with structure, then add style and behaviour.</p>

        <article>
          <h3>HTML foundations</h3>
          <p>Learn structure, links, forms, and accessibility.</p>
          <a href="/languages/html">Start the HTML course</a>
        </article>
      </section>

      <!-- 4. A labelled sign-up form. -->
      <section id="signup">
        <h2>Get course updates</h2>

        <form action="/subscribe" method="post">
          <label for="email">Email address</label>
          <input id="email" name="email" type="email" required />

          <button type="submit">Subscribe</button>
        </form>
      </section>
    </main>

    <!-- 5. Closing information. -->
    <footer>
      <p>© 2026 CodeLearn. Built for curious people.</p>
    </footer>
  </body>
</html>`,
          caption: 'The finished page',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Next: add CSS',
          content:
            'This page is complete as structure. It already works without styling. Next, add a stylesheet to set colours, spacing, and layout. Good HTML should remain readable even if the CSS fails to load.',
        },
      ],
      takeaways: [
        'Plan the page blocks and headings before writing tags.',
        'A complete page uses semantic landmarks, labelled controls, and descriptive links.',
        'Validate the markup and test keyboard navigation before calling it finished.',
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which element should contain the page’s unique main content?',
          options: ['header', 'main', 'footer', 'nav'],
          answer: 1,
          explanation:
            'main wraps the primary content and creates a landmark for assistive technology.',
        },
        {
          id: 'q2',
          question: 'What should you check before publishing a form?',
          options: [
            'Every control has a label connected to it',
            'Every input has a placeholder',
            'Every field is required',
            'The form uses only div elements',
          ],
          answer: 0,
          explanation:
            'Labels make controls understandable to screen readers and clickable for everyone.',
        },
        {
          id: 'q3',
          question: 'Why validate HTML after building the page?',
          options: [
            'To make it load faster',
            'To catch invalid nesting, duplicate ids, and closing-tag mistakes',
            'To add CSS automatically',
            'To create a favicon',
          ],
          answer: 1,
          explanation:
            'Validation catches source errors that browsers may silently repair.',
        },
      ],
    },
  ],
}
