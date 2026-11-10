import { lazy, Suspense, useEffect, useState } from 'react'
import type { CodeChallengeCheck, CodeChallengeSection } from '../content/types'
import { validateTagStructure } from '../lib/html-validation'
import { useMediaQuery } from '../lib/useMediaQuery'
import { cn } from '../lib/utils'

const MonacoCodeEditor = lazy(() =>
  import('./MonacoCodeEditor').then((module) => ({
    default: module.MonacoCodeEditor,
  })),
)

type CheckResult = {
  message: string
  passed: boolean
}

function validateCheck(
  check: CodeChallengeCheck,
  doc: Document,
  source: string,
): boolean {
  if (check.kind === 'doctype') {
    return doc.doctype?.name.toLowerCase() === check.name.toLowerCase()
  }

  if (check.kind === 'source') {
    const matches = (pattern: string) => {
      try {
        return new RegExp(pattern, 'i').test(source)
      } catch {
        return false
      }
    }

    if (check.patterns?.some((pattern) => !matches(pattern))) return false
    if (check.notPatterns?.some((pattern) => matches(pattern))) return false
    return true
  }

  const element = doc.querySelector(check.selector)
  if (!element) return false

  if (check.text !== undefined) {
    const actual = (element.textContent ?? '').replace(/\s+/g, ' ').trim()
    const expected = check.text.replace(/\s+/g, ' ').trim()
    if (actual.toLowerCase() !== expected.toLowerCase()) return false
  }

  if (check.attributes) {
    for (const [name, expected] of Object.entries(check.attributes)) {
      const actual = element.getAttribute(name)
      if (actual === null || actual.trim() !== expected.trim()) return false
    }
  }

  return true
}

function checkCode(section: CodeChallengeSection, code: string): CheckResult[] {
  const cleaned = code.replace(/<!--[\s\S]*?-->/g, '').trim()

  if (!cleaned) {
    return section.checks.map((check) => ({
      message: check.message,
      passed: false,
    }))
  }

  const tagValidation = validateTagStructure(cleaned)
  const tagResult: CheckResult = {
    message: tagValidation.ok
      ? 'All opening tags have matching closing tags.'
      : tagValidation.message,
    passed: tagValidation.ok,
  }

  const doc = new DOMParser().parseFromString(cleaned, 'text/html')
  return [
    tagResult,
    ...section.checks.map((check) => ({
      message: check.message,
      passed: validateCheck(check, doc, cleaned),
    })),
  ]
}

export function CodeChallengeBlock({
  section,
  accent,
  active,
}: {
  section: CodeChallengeSection
  accent: string
  active: boolean
}) {
  const [code, setCode] = useState(section.starterCode)
  const [previewCode, setPreviewCode] = useState(section.starterCode)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<CheckResult[]>([])
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const isCompact = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPreviewCode(code)
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [code])

  const answerCode = code.replace(/<!--[\s\S]*?-->/g, '').trim()
  const hasAnswer = answerCode.length > 0
  const allPassed = checked && results.length > 0 && results.every((result) => result.passed)

  function updateCode(next: string) {
    setCode(next)
    if (checked) {
      setChecked(false)
      setResults([])
      setShowSolution(false)
    }
  }

  function runCheck() {
    setResults(checkCode(section, code))
    setChecked(true)
  }

  function reset() {
    setCode(section.starterCode)
    setChecked(false)
    setResults([])
    setShowHint(false)
    setShowSolution(false)
  }

  function revealSolution() {
    setCode(section.solution)
    setChecked(false)
    setResults([])
    setShowSolution(true)
  }

  const headingId = `code-challenge-${section.title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <section
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        borderColor: `${accent}33`,
        backgroundColor: `${accent}08`,
      }}
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            Code challenge
          </p>
          <h3 id={headingId} className="mt-1 text-base font-semibold text-zinc-100">
            {section.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{section.instructions}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/60 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Your task
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-300">{section.prompt}</p>

        <div className="mt-3 overflow-hidden">
          <div
            className={cn(
              'flex w-[200%] transition-transform duration-300 ease-out',
              isCompact && previewOpen ? '-translate-x-1/2' : 'translate-x-0',
              'lg:block lg:w-full lg:translate-x-0',
            )}
          >
            <div
              className="w-1/2 shrink-0 lg:w-full"
              aria-hidden={isCompact && previewOpen}
              inert={isCompact && previewOpen}
            >
              <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
                {active && (
                  <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-3 py-2 lg:hidden">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Editor
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewOpen(true)}
                      aria-label="Show live preview"
                      className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="h-3 w-3"
                      >
                        <path
                          d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      Preview
                    </button>
                  </div>
                )}

                {active ? (
                  <Suspense
                    fallback={
                      <div className="flex h-[220px] items-center justify-center text-xs text-zinc-500">
                        Loading code editor…
                      </div>
                    }
                  >
                    <MonacoCodeEditor value={code} onChange={updateCode} />
                  </Suspense>
                ) : (
                  <div className="flex h-[220px] items-center justify-center text-xs text-zinc-500">
                    Open this chapter to load the editor.
                  </div>
                )}
              </div>
            </div>

            <div
              className="w-1/2 shrink-0 lg:mt-3 lg:w-full"
              aria-hidden={isCompact && !previewOpen}
              inert={isCompact && !previewOpen}
            >
              {active && (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/80 px-3 py-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Preview
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="hidden text-[10px] text-zinc-600 lg:inline">
                        Live · scripts off
                      </span>
                      {isCompact && (
                        <button
                          type="button"
                          onClick={() => setPreviewOpen(false)}
                          aria-label="Back to the code editor"
                          className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="h-3 w-3"
                          >
                            <path
                              d="m6 3-3 5 3 5M10 3l3 5-3 5"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Code
                        </button>
                      )}
                    </div>
                  </div>
                  <iframe
                    title={`${section.title} preview`}
                    srcDoc={previewCode}
                    sandbox=""
                    referrerPolicy="no-referrer"
                    className="h-[220px] w-full border-0 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] leading-5 text-zinc-500">
          The task is repeated in the starter comment. Write your answer below it.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={runCheck}
          disabled={!hasAnswer}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-zinc-500"
        >
          Check code
        </button>

        {checked && !allPassed && section.hint && (
          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            className="text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-zinc-200 hover:underline"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
        )}

        {checked && !allPassed && (
          <button
            type="button"
            onClick={revealSolution}
            className="text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-zinc-200 hover:underline"
          >
            Show solution
          </button>
        )}

        <button
          type="button"
          onClick={reset}
          className="text-xs font-medium text-zinc-400 underline-offset-4 transition hover:text-zinc-200 hover:underline"
        >
          Reset
        </button>

        {!hasAnswer && (
          <span className="text-xs text-zinc-500">
            Write your code below the comment to check it.
          </span>
        )}
      </div>

      {showSolution && (
        <p className="mt-3 text-xs leading-6 text-zinc-500">
          A working solution is now in the editor. Edit it and check again to see the
          checks update.
        </p>
      )}

      {checked && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'mt-4 rounded-xl border p-4',
            allPassed
              ? 'border-emerald-400/30 bg-emerald-400/[0.07]'
              : 'border-amber-400/30 bg-amber-400/[0.07]',
          )}
        >
          <p
            className={cn(
              'text-sm font-semibold',
              allPassed ? 'text-emerald-200' : 'text-amber-200',
            )}
          >
            {allPassed
              ? 'Nice work — the code passes every check!'
              : 'Not quite yet. Review the checks below.'}
          </p>

          <ul className="mt-3 space-y-2">
            {results.map((result, index) => (
              <li key={index} className="flex gap-2 text-xs leading-5">
                <span
                  className={cn(
                    'font-semibold',
                    result.passed ? 'text-emerald-400' : 'text-rose-400',
                  )}
                  aria-hidden="true"
                >
                  {result.passed ? '✓' : '✕'}
                </span>
                <span className={result.passed ? 'text-zinc-400' : 'text-zinc-300'}>
                  {result.message}
                </span>
              </li>
            ))}
          </ul>

          {showHint && section.hint && !allPassed && (
            <p className="mt-3 text-xs leading-6 text-zinc-400">Hint: {section.hint}</p>
          )}
        </div>
      )}
    </section>
  )
}
