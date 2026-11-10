import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { InlineText } from './Prose'
import { LessonSection } from './LessonSection'
import { Quiz } from './Quiz'
import type { Language, Lesson, Section } from '../content/types'
import { useProgress } from '../context/progress'
import { cn } from '../lib/utils'
import { cancelSmoothScroll, smoothScrollTo } from '../lib/smoothScroll'
import { useCollapsibleRail } from '../lib/useCollapsibleRail'

type LessonTab =
  | { kind: 'overview'; id: 'overview'; label: string; sections: Section[] }
  | {
      kind: 'concept'
      id: string
      label: string
      title: string
      stepNumber: number
      sections: Section[]
    }
  | { kind: 'wrap'; id: 'wrap-up'; label: string; sections: Section[] }
  | { kind: 'quiz'; id: 'quiz'; label: string; sections: Section[] }

function buildTabs(lesson: Lesson): LessonTab[] {
  const sections = lesson.sections
  const conceptIndexes = sections.reduce<number[]>((indexes, section, index) => {
    if (section.type === 'concept') indexes.push(index)
    return indexes
  }, [])
  const firstConcept = conceptIndexes[0] ?? -1
  const lastConcept = conceptIndexes[conceptIndexes.length - 1] ?? -1

  const leading = firstConcept === -1 ? sections : sections.slice(0, firstConcept)
  const trailing = lastConcept === -1 ? [] : sections.slice(lastConcept + 1)

  const tabs: LessonTab[] = [
    { kind: 'overview', id: 'overview', label: 'Start', sections: leading },
  ]

  if (firstConcept !== -1) {
    let stepNumber = 0
    let current: (LessonTab & { kind: 'concept' }) | null = null

    for (let index = firstConcept; index <= lastConcept; index += 1) {
      const section = sections[index]

      if (section.type === 'concept') {
        stepNumber += 1
        current = {
          kind: 'concept',
          id: `step-${stepNumber}`,
          label: String(stepNumber).padStart(2, '0'),
          title: section.title,
          stepNumber,
          sections: [section],
        }
        tabs.push(current)
      } else if (current) {
        current.sections.push(section)
      }
    }
  }

  tabs.push({ kind: 'wrap', id: 'wrap-up', label: 'Wrap-up', sections: trailing })
  tabs.push({ kind: 'quiz', id: 'quiz', label: 'Quiz', sections: [] })

  return tabs
}

function Sections({
  sections,
  accent,
  active,
}: {
  sections: Section[]
  accent: string
  active: boolean
}) {
  if (sections.length === 0) return null

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <LessonSection key={index} section={section} accent={accent} active={active} />
      ))}
    </div>
  )
}

const STEP_STORAGE_PREFIX = 'codelearn:lesson-steps:v1:'
const ACTIVE_STORAGE_PREFIX = 'codelearn:lesson-active:v1:'
const CONFETTI_COLORS = ['#34d399', '#38bdf8', '#fbbf24', '#fb7185', '#c084fc']

const CONFETTI = Array.from({ length: 14 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 14 - Math.PI / 2
  const distance = 38 + (index % 4) * 11

  return {
    dx: Math.round(Math.cos(angle) * distance),
    dy: Math.round(Math.sin(angle) * distance),
    rotation: index * 53,
  }
})

function readVisitedSteps(lessonKey: string, validIds: Set<string>): string[] {
  try {
    const raw = window.localStorage.getItem(`${STEP_STORAGE_PREFIX}${lessonKey}`)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (value): value is string => typeof value === 'string' && validIds.has(value),
    )
  } catch {
    return []
  }
}

function saveVisitedSteps(lessonKey: string, visited: Set<string>) {
  try {
    window.localStorage.setItem(
      `${STEP_STORAGE_PREFIX}${lessonKey}`,
      JSON.stringify([...visited]),
    )
  } catch {
    // Progress is still tracked in memory if storage is unavailable.
  }
}

function readActiveChapter(lessonKey: string, validIds: Set<string>): string | null {
  try {
    const value = window.localStorage.getItem(`${ACTIVE_STORAGE_PREFIX}${lessonKey}`)
    return value && validIds.has(value) ? value : null
  } catch {
    return null
  }
}

function saveActiveChapter(lessonKey: string, chapterId: string) {
  try {
    window.localStorage.setItem(`${ACTIVE_STORAGE_PREFIX}${lessonKey}`, chapterId)
  } catch {
    // The current chapter still works in memory if storage is unavailable.
  }
}

function CompletionToast({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-6 sm:w-80"
      aria-hidden="true"
    >
      <div
        className="lesson-toast relative overflow-hidden rounded-2xl border bg-zinc-900/95 p-4 shadow-2xl backdrop-blur"
        style={{ borderColor: `${accent}55` }}
      >
        <div className="absolute left-8 top-9">
          {CONFETTI.map((piece, index) => (
            <span
              key={index}
              className="confetti-piece absolute h-1.5 w-1.5 rounded-sm"
              style={
                {
                  '--dx': `${piece.dx}px`,
                  '--dy': `${piece.dy}px`,
                  '--rot': `${piece.rotation}deg`,
                  backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
                  animationDelay: `${index * 16}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative flex items-center gap-3">
          <span
            className="lesson-complete-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-semibold"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              backgroundColor: `${accent}16`,
            }}
          >
            ✓
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-100">Lesson complete</p>
            <p className="truncate text-xs text-zinc-500">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LessonTabs({
  lesson,
  language,
  lessonKey,
  nextLesson,
}: {
  lesson: Lesson
  language: Language
  lessonKey: string
  nextLesson: Lesson | null
}) {
  const tabs = useMemo(() => buildTabs(lesson), [lesson])
  const tabIds = useMemo(() => new Set(tabs.map((tab) => tab.id)), [tabs])
  const { isComplete } = useProgress()
  const complete = isComplete(lessonKey)
  const [activeId, setActiveId] = useState(
    () => readActiveChapter(lessonKey, tabIds) ?? tabs[0]?.id ?? 'overview',
  )
  const [visited, setVisited] = useState<Set<string>>(() => {
    if (complete) return new Set(tabIds)

    const stored = readVisitedSteps(lessonKey, tabIds)
    const initial = tabs[0]?.id
    const next = new Set(stored)
    if (initial) next.add(initial)

    const recent = readActiveChapter(lessonKey, tabIds)
    if (recent) next.add(recent)
    return next
  })
  const [celebrate, setCelebrate] = useState(false)

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeId),
  )
  const activeTab = tabs[activeIndex] ?? tabs[0]
  const tabVisited = (id: string) => complete || visited.has(id)
  const visitedCount = tabs.reduce(
    (count, tab) => count + (tabVisited(tab.id) ? 1 : 0),
    0,
  )
  const stepPercent = Math.round((visitedCount / tabs.length) * 100)
  const allStepsVisited = complete || visitedCount === tabs.length
  const chaptersRail = useCollapsibleRail()
  const [chaptersOpen, setChaptersOpen] = useState(false)

  useEffect(() => {
    saveVisitedSteps(lessonKey, visited)
  }, [lessonKey, visited])

  useEffect(() => {
    saveActiveChapter(lessonKey, activeId)
  }, [lessonKey, activeId])

  useEffect(() => cancelSmoothScroll, [])

  useEffect(() => {
    if (!celebrate) return

    const timer = window.setTimeout(() => setCelebrate(false), 4200)
    return () => window.clearTimeout(timer)
  }, [celebrate])

  function focusPanel(id: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(`lesson-panel-${id}`)?.focus()
    })
  }

  function scrollToChapter(id: string) {
    // Wait for the mobile <details> menu to collapse and the panel to render
    // before measuring where the selected chapter card starts.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        smoothScrollTo(document.getElementById(`lesson-panel-${id}`))
      })
    })
  }

  function selectTab(id: string) {
    setActiveId(id)
    setVisited((current) => {
      if (current.has(id)) return current
      return new Set(current).add(id)
    })
  }

  function moveStep(delta: number) {
    const nextTab = tabs[activeIndex + delta]
    if (!nextTab) return
    selectTab(nextTab.id)
    focusPanel(nextTab.id)
  }

  function chapterTitle(tab: LessonTab) {
    if (tab.kind === 'overview') return 'Overview and objectives'
    if (tab.kind === 'concept') return tab.title
    if (tab.kind === 'wrap') return 'Wrap-up and takeaways'
    return 'Knowledge check'
  }

  function chapterMarker(tab: LessonTab) {
    if (tab.kind === 'overview') return '00'
    if (tab.kind === 'concept') return tab.label
    if (tab.kind === 'wrap') return '—'
    return 'Q'
  }

  function renderTab(tab: LessonTab, active: boolean) {
    if (tab.kind === 'overview') {
      return (
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              What you will learn
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {lesson.objectives.map((objective, objectiveIndex) => (
                <li
                  key={objectiveIndex}
                  className="flex gap-2.5 text-sm leading-6 text-zinc-300"
                >
                  <span
                    className="mt-0.5 font-mono text-xs text-emerald-400"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <Sections sections={tab.sections} accent={language.accent} active={active} />
        </div>
      )
    }

    if (tab.kind === 'concept') {
      return (
        <div className="space-y-6">
          {tab.sections.map((section, index) => (
            <LessonSection
              key={index}
              section={section}
              accent={language.accent}
              stepNumber={tab.stepNumber}
              active={active}
            />
          ))}
        </div>
      )
    }

    if (tab.kind === 'wrap') {
      return (
        <div className="space-y-6">
          <Sections sections={tab.sections} accent={language.accent} active={active} />

          <section
            className="rounded-2xl border p-5 sm:p-6"
            style={{
              borderColor: `${language.accent}33`,
              backgroundColor: `${language.accent}0a`,
            }}
          >
            <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: language.accent }}
                aria-hidden="true"
              />
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-2.5">
              {lesson.takeaways.map((takeaway, takeawayIndex) => (
                <li
                  key={takeawayIndex}
                  className="flex gap-3 text-sm leading-6 text-zinc-300"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: language.accent }}
                    aria-hidden="true"
                  />
                  <span>
                    <InlineText text={takeaway} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <Quiz
          key={lessonKey}
          lessonKey={lessonKey}
          questions={lesson.quiz}
          accent={language.accent}
          carousel={language.id === 'html' || language.id === 'css'}
          onPass={() => setCelebrate(true)}
        />

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
              {nextLesson ? 'Up next' : 'Course complete'}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">
              {nextLesson ? nextLesson.title : 'Back to the course overview'}
            </p>
          </div>
          <Link
            to={
              nextLesson
                ? `/languages/${language.id}/lessons/${nextLesson.id}`
                : `/languages/${language.id}`
            }
            className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.07] sm:mt-0"
          >
            {nextLesson ? 'Next lesson' : 'Course overview'}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    )
  }

  function renderChapterList(onSelect?: (id: string) => void) {
    return (
      <ol className="space-y-1">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab.id
          const visitedTab = tabVisited(tab.id)

          return (
            <li key={tab.id}>
              <button
                type="button"
                aria-current={selected ? 'step' : undefined}
                aria-controls={`lesson-panel-${tab.id}`}
                onClick={() => (onSelect ? onSelect(tab.id) : selectTab(tab.id))}
                className={cn(
                  'flex w-full gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs leading-4 transition',
                  selected
                    ? 'bg-white/[0.07] text-zinc-100'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200',
                )}
              >
                <span
                  className="mt-px w-5 shrink-0 font-mono text-[10px]"
                  style={selected || visitedTab ? { color: language.accent } : undefined}
                  aria-hidden="true"
                >
                  {visitedTab && !selected ? (
                    <span className="step-check inline-block">✓</span>
                  ) : (
                    chapterMarker(tab)
                  )}
                </span>
                <span className="min-w-0 flex-1">{chapterTitle(tab)}</span>
              </button>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <div className="mt-8" id="lesson-steps">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
          Lesson progress
        </h2>
        <span className="font-mono text-[10px] text-zinc-600">
          Step {activeIndex + 1} of {tabs.length}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={stepPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Lesson step progress: ${visitedCount} of ${tabs.length} steps explored`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700 ease-out',
              allStepsVisited && 'lesson-progress-complete',
            )}
            style={{
              width: `${stepPercent}%`,
              backgroundColor: language.accent,
              boxShadow: allStepsVisited ? `0 0 14px ${language.accent}99` : undefined,
            }}
          />
        </div>
        <span className="w-20 text-right font-mono text-[10px] text-zinc-600">
          {visitedCount}/{tabs.length} steps
        </span>
      </div>

      <div
        className={cn(
          'mt-4 grid gap-5 transition-[grid-template-columns] duration-200',
          chaptersRail.collapsed
            ? 'lg:grid-cols-[56px_minmax(0,1fr)]'
            : 'lg:grid-cols-[190px_minmax(0,1fr)]',
        )}
      >
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <details
            open={chaptersOpen}
            onToggle={(event) => setChaptersOpen(event.currentTarget.open)}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:hidden"
          >
            <summary className="cursor-pointer text-sm font-medium text-zinc-200">
              Lesson chapters ({visitedCount}/{tabs.length})
            </summary>
            <div className="mt-3">
              {renderChapterList((id) => {
                selectTab(id)
                setChaptersOpen(false)
                scrollToChapter(id)
              })}
            </div>
          </details>

          <nav
            aria-label="Lesson chapters"
            className={cn(
              'hidden max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/10 transition-all duration-200 lg:block',
              chaptersRail.collapsed
                ? chaptersRail.expanded
                  ? 'z-30 w-[190px] bg-zinc-950 p-2.5 shadow-2xl'
                  : 'w-14 bg-white/[0.02] p-2'
                : 'w-full bg-white/[0.02] p-2.5',
            )}
          >
            {chaptersRail.expanded ? (
              <>
                <div className="flex items-center justify-between gap-2 px-2.5 pb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                    Chapters
                  </p>
                  <button
                    type="button"
                    onClick={
                      chaptersRail.collapsed
                        ? chaptersRail.expand
                        : chaptersRail.collapse
                    }
                    aria-label={
                      chaptersRail.collapsed
                        ? 'Keep chapter sidebar open'
                        : 'Collapse chapter sidebar'
                    }
                    title={
                      chaptersRail.collapsed
                        ? 'Keep chapter sidebar open'
                        : 'Collapse chapter sidebar'
                    }
                    className="shrink-0 rounded-md border border-white/10 p-1.5 text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-200"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="h-3 w-3"
                    >
                      <path
                        d={
                          chaptersRail.collapsed ? 'm6 3 5 5-5 5' : 'M10 3 5 8l5 5'
                        }
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {renderChapterList()}
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-1">
                <button
                  type="button"
                  onClick={chaptersRail.expand}
                  aria-label="Keep chapter sidebar open"
                  title="Keep chapter sidebar open"
                  className="rounded-md border border-white/10 p-1.5 text-zinc-500 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-200"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="h-3 w-3"
                  >
                    <path
                      d="m6 3 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="[writing-mode:vertical-rl] text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Chapters
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                  {visitedCount}/{tabs.length}
                </span>
              </div>
            )}
          </nav>
        </div>

        <div className="min-w-0">
          <div>
            {tabs.map((tab) => (
              <section
                key={tab.id}
                id={`lesson-panel-${tab.id}`}
                aria-label={chapterTitle(tab)}
                hidden={tab.id !== activeTab.id}
                tabIndex={0}
                className="scroll-mt-20 focus:outline-none"
              >
                {renderTab(tab, tab.id === activeTab.id)}
              </section>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => moveStep(-1)}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span aria-hidden="true">←</span>
              Previous step
            </button>

            <span className="hidden text-[11px] text-zinc-600 sm:block">
              {activeTab.kind === 'quiz' ? 'Final step' : 'Walk through each block'}
            </span>

            <button
              type="button"
              onClick={() => moveStep(1)}
              disabled={activeIndex === tabs.length - 1}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Next step
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {celebrate && <CompletionToast title={lesson.title} accent={language.accent} />}
    </div>
  )
}
