import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { PracticeBlank, PracticeSection } from '../content/types'
import { normalizeAnswer } from '../lib/answer'
import { cn } from '../lib/utils'

function normalizeStrictTag(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/<\s*\/\s*/g, '</')
    .replace(/<\s*/g, '<')
    .replace(/\s*>/g, '>')
}

function isBlankCorrect(blank: PracticeBlank, value: string): boolean {
  if (!value.trim()) return false

  if (blank.strict) {
    const normalized = normalizeStrictTag(value)
    return blank.answers.some((answer) => normalizeStrictTag(answer) === normalized)
  }

  const normalized = normalizeAnswer(value)
  return blank.answers.some((answer) => normalizeAnswer(answer) === normalized)
}

function PracticeInput({
  blank,
  value,
  checked,
  onChange,
}: {
  blank: PracticeBlank
  value: string
  checked: boolean
  onChange: (value: string) => void
}) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState(60)

  useLayoutEffect(() => {
    const measure = measureRef.current
    if (!measure) return

    measure.textContent = value || 'type'
    setWidth(Math.max(60, Math.ceil(measure.getBoundingClientRect().width) + 32))
  }, [value])

  const correct = checked && isBlankCorrect(blank, value)
  const wrong = checked && !isBlankCorrect(blank, value)

  return (
    <>
      <span
        ref={measureRef}
        className="invisible absolute whitespace-pre font-mono text-sm"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={blank.hint ?? 'Fill in the blank'}
        placeholder="type"
        spellCheck={false}
        autoComplete="off"
        className={cn(
          'mx-1 inline-block rounded-md border bg-white/[0.06] px-2 py-0.5 text-center font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-sky-400/60 focus:bg-sky-400/10 focus:ring-2 focus:ring-sky-400/40',
          correct
            ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-200'
            : wrong
              ? 'border-rose-400/60 bg-rose-400/10 text-rose-200'
              : 'border-white/15',
        )}
        style={{ width: `${width}px` }}
      />
    </>
  )
}

export function PracticeBlock({
  section,
  accent,
}: {
  section: PracticeSection
  accent: string
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const parts = useMemo(
    () => section.template.split(/(\{\{[^}]+\}\})/g),
    [section.template],
  )
  const blankMap = useMemo(
    () => new Map(section.blanks.map((blank) => [blank.id, blank])),
    [section.blanks],
  )

  const allFilled = section.blanks.every(
    (blank) => (values[blank.id] ?? '').trim().length > 0,
  )
  const allCorrect = section.blanks.every((blank) =>
    isBlankCorrect(blank, values[blank.id] ?? ''),
  )

  function updateValue(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }))
    if (checked) setChecked(false)
  }

  function checkAnswers() {
    if (!allFilled) return
    setChecked(true)
  }

  function reset() {
    setValues({})
    setChecked(false)
    setShowHint(false)
  }

  return (
    <section
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        borderColor: `${accent}33`,
        backgroundColor: `${accent}08`,
      }}
      aria-labelledby={`practice-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            Try it yourself
          </p>
          <h3
            id={`practice-${section.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="mt-1 text-base font-semibold text-zinc-100"
          >
            {section.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{section.instructions}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
          {section.blanks.length} blank{section.blanks.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/60 p-4">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-zinc-300">
          {parts.map((part, index) => {
            const match = part.match(/^\{\{([^}]+)\}\}$/)
            if (!match) return <span key={index}>{part}</span>

            const blank = blankMap.get(match[1].trim())
            if (!blank) return <span key={index}>{part}</span>

            return (
              <PracticeInput
                key={index}
                blank={blank}
                value={values[blank.id] ?? ''}
                checked={checked}
                onChange={(value) => updateValue(blank.id, value)}
              />
            )
          })}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={checkAnswers}
          disabled={!allFilled}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-zinc-500"
        >
          Check answer
        </button>

        {checked && !allCorrect && section.hint && (
          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            className="text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-zinc-200 hover:underline"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
        )}

        {checked && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-zinc-200 hover:underline"
          >
            Try again
          </button>
        )}

        {!allFilled && (
          <span className="text-xs text-zinc-500">
            Fill every blank to check your answer.
          </span>
        )}
      </div>

      {checked && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'mt-4 rounded-xl border p-4',
            allCorrect
              ? 'border-emerald-400/30 bg-emerald-400/[0.07]'
              : 'border-amber-400/30 bg-amber-400/[0.07]',
          )}
        >
          <p
            className={cn(
              'text-sm font-semibold',
              allCorrect ? 'text-emerald-200' : 'text-amber-200',
            )}
          >
            {allCorrect
              ? 'Nice work — all blanks are correct!'
              : 'Not quite yet. Fix the highlighted blanks and try again.'}
          </p>
          {section.explanation && (
            <p className="mt-1 text-xs leading-6 text-zinc-400">
              {section.explanation}
            </p>
          )}
          {showHint && section.hint && !allCorrect && (
            <p className="mt-1 text-xs leading-6 text-zinc-400">Hint: {section.hint}</p>
          )}
        </div>
      )}
    </section>
  )
}
