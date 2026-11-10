import type { PracticeSection } from '../types'

interface PracticeEntry {
  afterConcept: number
  section: PracticeSection
}

export const cssPractice: Record<string, PracticeEntry> = {
  'css-basics': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Write a declaration',
      instructions: 'Fill in the property that changes the text color.',
      template: `h1 {\n  {{property}}: #0f172a;\n}`,
      blanks: [
        {
          id: 'property',
          answers: ['color'],
          hint: 'The property that sets the foreground text color.',
        },
      ],
      explanation: '`color` changes the foreground text color.',
      hint: 'It is not background-color.',
    },
  },
  selectors: {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Finish the class selector',
      instructions: 'Fill in the class name so the rule targets elements with class="card".',
      template: `.{{name}} {\n  padding: 1rem;\n}`,
      blanks: [{ id: 'name', answers: ['card'], hint: 'The class name, without the dot.' }],
      explanation: 'A class selector starts with a dot followed by the class name.',
      hint: 'The HTML uses class="card".',
    },
  },
  'colors-and-typography': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Set a background',
      instructions: 'Fill in the property that changes the area behind the text.',
      template: `body {\n  {{property}}: #f8fafc;\n}`,
      blanks: [
        {
          id: 'property',
          answers: ['background-color', 'background'],
          hint: 'The property that paints the area behind an element.',
        },
      ],
      explanation: '`background-color` paints the area behind the element’s content.',
      hint: 'It is not color.',
    },
  },
  'box-model': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Add space inside the border',
      instructions: 'Fill in the property that creates space between the content and the border.',
      template: `.card {\n  {{property}}: 1.5rem;\n}`,
      blanks: [
        {
          id: 'property',
          answers: ['padding'],
          hint: 'Internal space, not external space.',
        },
      ],
      explanation: 'Padding creates space inside the border.',
      hint: 'Margin creates space outside the border.',
    },
  },
  flexbox: {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Create a flex container',
      instructions: 'Fill in the display value that arranges direct children in a row.',
      template: `.row {\n  display: {{value}};\n  gap: 1rem;\n}`,
      blanks: [{ id: 'value', answers: ['flex'], hint: 'The one-dimensional layout mode.' }],
      explanation: '`display: flex` turns the element into a flex container.',
      hint: 'Grid is two-dimensional; this is the one-dimensional option.',
    },
  },
  'responsive-design': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Write a breakpoint',
      instructions: 'Fill in the media query condition for a 48rem breakpoint.',
      template: `@media (min-width: {{value}}) {\n  .cards { flex-direction: row; }\n}`,
      blanks: [
        {
          id: 'value',
          answers: ['48rem', '768px'],
          hint: 'Use rem or the equivalent pixel value.',
        },
      ],
      explanation: 'A `min-width` media query applies at the breakpoint and above.',
      hint: 'The lesson uses 48rem.',
    },
  },
  'units-and-values': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Fill the viewport unit',
      instructions: 'Make the section at least as tall as the viewport.',
      template: `.hero {\n  min-height: 100{{unit}};\n}`,
      blanks: [{ id: 'unit', answers: ['vh'], hint: 'Viewport height unit.' }],
      explanation: '`100vh` is the full viewport height.',
      hint: 'Use the height unit, not width.',
    },
  },
  'cascade-and-inheritance': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Override a rule',
      instructions: 'Fill in the keyword that forces this declaration to win.',
      template: `.note {\n  color: red {{keyword}};\n}`,
      blanks: [{ id: 'keyword', answers: ['!important'], hint: 'Use it sparingly.' }],
      explanation: '`!important` raises a declaration above normal cascade rules.',
      hint: 'It starts with an exclamation mark.',
    },
  },
  'pseudo-classes-and-elements': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Style a hover state',
      instructions: 'Fill in the pseudo-class for a link while the pointer is over it.',
      template: `a{{state}} {\n  color: #2563eb;\n}`,
      blanks: [{ id: 'state', answers: [':hover'], hint: 'It starts with a colon.' }],
      explanation: '`:hover` applies while the pointer is over the element.',
      hint: 'The state is called hover.',
    },
  },
  'borders-backgrounds-shadows': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Make a circle',
      instructions: 'Fill in the border radius that turns a square into a circle.',
      template: `.avatar {\n  border-radius: {{value}};\n}`,
      blanks: [{ id: 'value', answers: ['50%'], hint: 'A percentage of the box size.' }],
      explanation: 'A 50% border radius makes a square circular.',
      hint: 'Use a percentage.',
    },
  },
  'gradients-and-images': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Set a gradient direction',
      instructions: 'Fill in the direction that runs from left to right.',
      template: `.hero {\n  background: linear-gradient({{direction}}, #0ea5e9, #4f46e5);\n}`,
      blanks: [
        {
          id: 'direction',
          answers: ['to right', '90deg'],
          hint: 'Use the keyword form or 90deg.',
        },
      ],
      explanation: '`to right` runs the gradient from left to right.',
      hint: 'The opposite is to left.',
    },
  },
  positioning: {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Pin a badge',
      instructions: 'Fill in the position value that anchors the badge to the card.',
      template: `.badge {\n  position: {{value}};\n  top: 0.5rem;\n  right: 0.5rem;\n}`,
      blanks: [
        {
          id: 'value',
          answers: ['absolute'],
          hint: 'It is removed from normal flow and positioned against an ancestor.',
        },
      ],
      explanation: '`position: absolute` anchors the element to its containing block.',
      hint: 'Not fixed or sticky.',
    },
  },
  'stacking-and-z-index': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Create a stacking context',
      instructions: 'Fill in the value that isolates an element’s children into their own stacking context.',
      template: `.card {\n  isolation: {{value}};\n}`,
      blanks: [{ id: 'value', answers: ['isolate'], hint: 'The CSS value, not the property.' }],
      explanation: '`isolation: isolate` creates a new stacking context.',
      hint: 'The keyword is isolate.',
    },
  },
  'transitions-and-transforms': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Animate a transform',
      instructions: 'Fill in a short transition duration.',
      template: `.button {\n  transition: transform {{duration}} ease;\n}`,
      blanks: [
        {
          id: 'duration',
          answers: ['200ms', '0.2s', '150ms', '0.15s'],
          hint: 'Use milliseconds or seconds.',
        },
      ],
      explanation: 'A short duration keeps the interaction feeling responsive.',
      hint: 'The lesson uses 200ms.',
    },
  },
  'keyframe-animations': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Name the animation',
      instructions: 'Fill in the keyframes name in both places.',
      template: `@keyframes {{name}} {\n  to { transform: scale(1.1); }\n}\n\n.dot {\n  animation: {{usage}} 1s infinite alternate;\n}`,
      blanks: [
        {
          id: 'name',
          answers: ['pulse'],
          hint: 'The name of the keyframes rule.',
        },
        {
          id: 'usage',
          answers: ['pulse'],
          hint: 'Use the same name in the animation shorthand.',
        },
      ],
      explanation: 'The animation name must match an `@keyframes` rule.',
      hint: 'The lesson calls it pulse.',
    },
  },
  'grid-basics': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Turn on grid',
      instructions: 'Fill in the display value for a two-dimensional layout.',
      template: `.cards {\n  display: {{value}};\n  grid-template-columns: repeat(3, 1fr);\n}`,
      blanks: [{ id: 'value', answers: ['grid'], hint: 'Two-dimensional layout mode.' }],
      explanation: '`display: grid` enables grid layout.',
      hint: 'Flexbox is one-dimensional.',
    },
  },
  'grid-areas': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Name a grid area',
      instructions: 'Fill in the area name that sits beside the main column.',
      template: `.layout {\n  grid-template-areas:\n    "header header"\n    "{{area}} main";\n}`,
      blanks: [{ id: 'area', answers: ['sidebar'], hint: 'The left column in this layout.' }],
      explanation: 'Named areas let you place items by name instead of line numbers.',
      hint: 'The lesson calls it sidebar.',
    },
  },
  'forms-and-inputs': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Show focus clearly',
      instructions: 'Fill in a visible focus outline color.',
      template: `input:focus {\n  outline: 2px solid {{color}};\n  outline-offset: 2px;\n}`,
      blanks: [
        {
          id: 'color',
          answers: ['#2563eb', 'blue', '#0ea5e9'],
          hint: 'Any accessible blue works.',
        },
      ],
      explanation: 'A visible focus ring helps keyboard users see where they are.',
      hint: 'Use a strong blue.',
    },
  },
  'buttons-and-states': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Show a clickable button',
      instructions: 'Fill in the cursor value that shows a pointer.',
      template: `.button {\n  cursor: {{value}};\n}`,
      blanks: [{ id: 'value', answers: ['pointer'], hint: 'The hand cursor.' }],
      explanation: '`cursor: pointer` signals that the element is clickable.',
      hint: 'The hand cursor is pointer.',
    },
  },
  'navigation-bars': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Lay out a navigation row',
      instructions: 'Fill in the display value that places the links in a row.',
      template: `.nav {\n  display: {{value}};\n  gap: 1rem;\n}`,
      blanks: [{ id: 'value', answers: ['flex'], hint: 'A one-dimensional row.' }],
      explanation: 'Flexbox is a natural fit for a horizontal navigation row.',
      hint: 'Use flex.',
    },
  },
  'custom-properties': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Use a custom property',
      instructions: 'Fill in the variable name used by the color declaration.',
      template: `:root {\n  --brand: #2563eb;\n}\n\n.link {\n  color: var({{name}});\n}`,
      blanks: [{ id: 'name', answers: ['--brand'], hint: 'Include the two leading dashes.' }],
      explanation: '`var(--brand)` reads the custom property defined on `:root`.',
      hint: 'The variable is --brand.',
    },
  },
  'accessibility-and-focus': {
    afterConcept: 1,
    section: {
      type: 'practice',
      title: 'Respect reduced motion',
      instructions: 'Fill in the value that matches users who prefer less motion.',
      template: `@media (prefers-reduced-motion: {{value}}) {\n  * { animation: none; }\n}`,
      blanks: [{ id: 'value', answers: ['reduce'], hint: 'The reduced-motion keyword.' }],
      explanation: '`prefers-reduced-motion: reduce` lets you disable non-essential motion.',
      hint: 'The value is reduce.',
    },
  },
}
