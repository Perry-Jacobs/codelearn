const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

const RAW_TEXT_ELEMENTS = new Set(['script', 'style', 'textarea', 'title'])

const BLOCK_ELEMENTS = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'dd',
  'details',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'ul',
])

type TagValidation = { ok: true } | { ok: false; message: string }

function isNameStart(char: string): boolean {
  return /[A-Za-z]/.test(char)
}

function isNameCharacter(char: string): boolean {
  return /[A-Za-z0-9:-]/.test(char)
}

function findRawTextClose(source: string, name: string, start: number): number {
  const lower = source.toLowerCase()
  let searchFrom = start

  while (searchFrom < lower.length) {
    const close = lower.indexOf(`</${name}`, searchFrom)
    if (close === -1) return -1

    const next = lower[close + 2 + name.length]
    if (next === undefined || next === '>' || next === '/' || /\s/.test(next)) {
      return close
    }

    searchFrom = close + 2
  }

  return -1
}

function findTagEnd(source: string, start: number): number {
  let quote: string | null = null

  for (let index = start; index < source.length; index += 1) {
    const char = source[index]

    if (quote) {
      if (char === quote) quote = null
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '>') {
      return index
    }
  }

  return -1
}

/**
 * Check the tag tree before DOMParser gets a chance to repair it. Browsers
 * silently close unclosed tags and ignore invalid closing tags, which can make
 * broken markup look correct in the live preview.
 */
export function validateTagStructure(source: string): TagValidation {
  const stack: { name: string }[] = []
  let index = 0

  while (index < source.length) {
    const open = source.indexOf('<', index)
    if (open === -1) break

    if (source.startsWith('<!--', open)) {
      const commentEnd = source.indexOf('-->', open + 4)
      if (commentEnd === -1) {
        return { ok: false, message: 'An HTML comment is missing its closing -->.' }
      }
      index = commentEnd + 3
      continue
    }

    if (source.startsWith('<!', open) || source.startsWith('<?', open)) {
      const declarationEnd = findTagEnd(source, open + 2)
      if (declarationEnd === -1) {
        return { ok: false, message: 'A markup declaration is missing its closing >.' }
      }
      index = declarationEnd + 1
      continue
    }

    let cursor = open + 1
    let closing = false

    if (source[cursor] === '/') {
      closing = true
      cursor += 1
    }

    if (!isNameStart(source[cursor] ?? '')) {
      // Not a tag: for example, the less-than sign in "2 < 3".
      index = open + 1
      continue
    }

    const nameStart = cursor
    cursor += 1
    while (isNameCharacter(source[cursor] ?? '')) cursor += 1

    const name = source.slice(nameStart, cursor).toLowerCase()
    const tagEnd = findTagEnd(source, cursor)

    if (tagEnd === -1) {
      return {
        ok: false,
        message: `The <${closing ? '/' : ''}${name}> tag is missing its closing >.`,
      }
    }

    const beforeEnd = source.slice(cursor, tagEnd)
    const selfClosing = !closing && /\/\s*$/.test(beforeEnd)

    if (closing) {
      if (VOID_ELEMENTS.has(name)) {
        return {
          ok: false,
          message: `</${name}> is not valid because ${name} is a void element and has no closing tag.`,
        }
      }

      const last = stack.pop()
      if (!last) {
        return { ok: false, message: `Unexpected closing tag </${name}>.` }
      }

      if (last.name !== name) {
        return {
          ok: false,
          message: `Closing tag </${name}> does not match <${last.name}>.`,
        }
      }
    } else {
      if (BLOCK_ELEMENTS.has(name) && stack.some((entry) => entry.name === 'p')) {
        return {
          ok: false,
          message: `<${name}> cannot be nested inside <p>. Close the paragraph before opening it.`,
        }
      }

      if (VOID_ELEMENTS.has(name)) {
        // Void elements never go on the stack, whether written as <img> or <img />.
      } else if (selfClosing) {
        return {
          ok: false,
          message: `<${name} /> is not valid HTML. Only void elements can self-close; write <${name}></${name}> instead.`,
        }
      } else {
        stack.push({ name })
      }
    }

    index = tagEnd + 1

    if (!closing && !selfClosing && RAW_TEXT_ELEMENTS.has(name)) {
      const closeIndex = findRawTextClose(source, name, index)
      if (closeIndex === -1) {
        return { ok: false, message: `<${name}> is not closed.` }
      }
      index = closeIndex
    }
  }

  if (stack.length > 0) {
    const unclosed = stack.map((entry) => `<${entry.name}>`).join(', ')
    return { ok: false, message: `These tags are not closed: ${unclosed}.` }
  }

  return { ok: true }
}
