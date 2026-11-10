export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/^<|>$/g, '')
    .replace(/\/$/, '')
    .trim()
}
