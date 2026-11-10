export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

const LANGUAGE_LABELS: Record<string, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
}

export function languageLabel(id: string): string {
  return LANGUAGE_LABELS[id] ?? id
}

export function plural(count: number, singular: string, pluralForm?: string): string {
  return count === 1 ? singular : (pluralForm ?? `${singular}s`)
}
