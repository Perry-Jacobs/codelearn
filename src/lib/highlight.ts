import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)

const ALIASES: Record<string, string> = {
  html: 'xml',
}

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function highlightCode(code: string, language: string): string {
  const id = ALIASES[language] ?? language

  if (!hljs.getLanguage(id)) return escapeHtml(code)

  try {
    return hljs.highlight(code, { language: id, ignoreIllegals: true }).value
  } catch {
    return escapeHtml(code)
  }
}
