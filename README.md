# CodeLearn

A small, fast learning site for the web. Two available tracks, 38 lessons, and 648 quiz
questions — with progress saved locally in the browser. HTML has a full 16-lesson beginner
path and CSS has a 22-lesson beginner path; JavaScript is next on the roadmap.

**Available tracks:** HTML · CSS  
**Coming soon:** JavaScript

## Features

- Two available beginner tracks: a 16-lesson HTML path and a 22-lesson CSS path
- A JavaScript beginner card marked as coming soon
- Single-focus HTML lessons for text, lists, links, images, forms, and tables instead of overloaded combined lessons, with deeper beginner breakdowns in Forms, Tables, Lists, Images, Head, and Accessibility
- A CSS path that grows from selectors and the box model through Flexbox, Grid, positioning, animation, custom properties, and accessibility, with five focused building-block chapters per lesson
- Interactive fill-in-the-blank practice inside HTML and CSS chapters, with inline inputs that grow as you type, hints, and instant checking
- **Editable Monaco code examples** in every HTML building block and full example: change the markup in place, watch the sandboxed preview update after a short debounce, and reset to the original code at any time
- Monaco-powered full-snippet **code challenges** in every HTML and CSS lesson, lazy-loaded with HTML and CSS syntax highlighting, a sandboxed live preview, starter comments, hints, and checklist validation that includes tag-balance checks
- On phones and tablets, the code challenge preview slides in from a **Preview** button, with a **Code** button to return to the editor
- Lessons built from numbered **building blocks** so each tag,
  keyword, or concept is taught before it is combined into a full example
- Chapter-list lesson reader: **Start → building blocks → wrap-up → quiz**, with a course-style chapter list, collapsible course/chapter rails that open from their toggle buttons, and one chapter visible at a time
- Reopens at the last chapter viewed; per-lesson chapter progress is saved in `localStorage`, with animated completion checks and a celebratory toast when a lesson is passed
- Editable, syntax-highlighted code samples with comments, a one-click copy button, and a toggleable slide-in sandboxed live preview for HTML lesson examples and building-block snippets
- HTML and CSS use a one-question-at-a-time carousel, drawing 5–6 random questions from a 12–24-question bank each attempt
- Each attempt mixes short-answer practical questions with multiple-choice questions where practical questions exist; **Try again** selects a fresh mix
- Results include a score/progress card and a gift-box “Ka-boom!” celebration
- A 60% score completes the lesson
- Progress rings, per-course progress bars, and a dashboard with an overall completion rate
- "Continue learning" card on the home page
- Progress and best quiz scores persisted in `localStorage`
- Responsive dark UI built with Tailwind CSS, including keyboard-accessible quiz controls
- No account, backend, or API keys required

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript only |
| `npm run lint` | Run oxlint |
| `npm run deploy` | Build and upload to Cloudflare Pages |

## Deploy to Cloudflare Pages

This is a static Vite SPA. `public/_redirects` is copied into `dist/` so
Cloudflare Pages serves `index.html` for deep links such as
`/languages/html/lessons/lists`.

### Option A — connect the repository in Cloudflare (recommended)

1. Push the project to GitHub.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages →
   Connect to Git** and select the repository.
3. Use these build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy. Cloudflare rebuilds on every push to the production branch.

No API tokens or repository secrets are needed with this setup.

### Option B — deploy from your machine

```bash
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
npm run deploy
```

The script creates the `codelearn` Pages project if it does not exist,
then uploads the production build. Override the name or branch with
`CLOUDFLARE_PAGES_PROJECT` and `CLOUDFLARE_PAGES_BRANCH`.

### One-time GitHub bootstrap

If the folder is not a git repository yet:

```bash
./scripts/setup-github.sh codelearn public
```

Use `private` instead of `public` for a private repository. The script
requires the GitHub CLI (`gh auth login`).

## Project structure

```
src/
  components/        Navbar, Footer, Layout, CodeBlock, HtmlPreview, Quiz,
                     PracticeBlock, CodeChallengeBlock, MonacoCodeEditor, ...
  content/
    types.ts         Language, Lesson, Section, and QuizQuestion types
    index.ts         Track aggregation and lookup helpers
    languages/       Course content: html.ts, css.ts, javascript.ts, plus HTML quiz,
                     practice, and challenge data
  context/
    ProgressContext.tsx   localStorage-backed completion + best scores
  lib/
    course.ts        Progress math, lesson keys, next-lesson lookup
    highlight.ts     Highlight.js setup and language aliases
    monaco-environment.ts   Monaco workers and local editor setup
    smoothScroll.ts  Eased scrolling for chapter and lesson selection
    useCollapsibleRail.ts   Collapsed sidebar rail state
    useDocumentTitle.ts
    useMediaQuery.ts
    utils.ts
  pages/
    Home.tsx
    LanguagePage.tsx
    LessonPage.tsx
    ProgressPage.tsx
    NotFound.tsx
  App.tsx            Routes
  index.css          Tailwind entry + base styles
```

## Adding content

Each available track is a plain TypeScript object. To add an HTML lesson, append to the
`lessons` array in `src/content/languages/html.ts`. CSS lessons live in
`src/content/languages/css.ts`, and the coming-soon JavaScript card is defined in
`src/content/languages/javascript.ts`:

```ts
{
  id: 'my-lesson',
  title: 'My lesson',
  summary: 'One sentence that appears in the course list.',
  minutes: 8,
  objectives: ['First thing you will learn', 'Second thing'],
  sections: [
    {
      type: 'concept',
      title: 'One building block',
      content: 'Teach one idea in plain language, with `inline code`.',
      language: 'html',
      code: `<p class="note">A paragraph.</p>`,
    },
    { type: 'text', content: 'Paragraphs support `inline code` and **bold** text.' },
    {
      type: 'code',
      language: 'html',
      code: `<p>Hello</p>`,
      caption: 'example.html',
    },
    { type: 'callout', tone: 'tip', title: 'A useful tip', content: 'Explanation.' },
    { type: 'list', title: 'Optional title', items: ['First point', 'Second point'] },
  ],
  takeaways: ['Key idea one', 'Key idea two'],
  quiz: [
    {
      id: 'q1',
      question: 'Which element marks the main heading of a page?',
      options: ['<h1>', '<p>', '<main>', '<title>'],
      answer: 0, // zero-based index of the correct option
      explanation: 'The <h1> element is the top-level heading.',
    },
    {
      id: 'q2',
      type: 'input',
      question: 'Type the tag used to create a paragraph.',
      acceptedAnswers: ['p', '<p>'],
      placeholder: 'e.g. p',
      explanation: 'The p element groups a paragraph of text.',
    },
  ],
}
```

To add an entirely new track, create `src/content/languages/<id>.ts` exporting a `Language`
object, then import and add it to the `languages` array in `src/content/index.ts`. The home
page, progress dashboard, footer, and counts update automatically. Set `comingSoon: true`
on a course to show a non-clickable “Coming soon” card and keep it out of progress totals.

## Progress storage

Progress lives under the `codelearn:progress:v1` localStorage key:

```json
{
  "completed": ["html/lists"],
  "bestScores": { "html/lists": 100 }
}
```

Scoring 60% or higher completes a lesson. The "Reset progress" button on the dashboard
clears both lists. Because everything is local, clearing site data also removes progress.

## Deployment

The app is a client-side SPA, so the host must rewrite unknown paths to `index.html`:

- **Netlify:** `public/_redirects` is included (`/* /index.html 200`).
- **Vercel:** add a rewrite of `/(.*)` to `/index.html`.
- **GitHub Pages:** copy `dist/index.html` to `dist/404.html`, or use a hash router.

Build with `npm run build`; the output is in `dist/`.

## Scope

Version 1 is intentionally focused on reading and recall. Monaco code challenges validate
tag balance and required markup in the browser, then render the result in a sandboxed live
preview with scripts disabled. The site does not execute user scripts. It also does not include user accounts, server-side
progress sync, or full-text search. The content model is ready for those additions.
