import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { LessonTabs } from '../components/LessonTabs'
import { ProgressBar } from '../components/ProgressBar'
import { getLanguage, getLesson } from '../content'
import type { Language } from '../content/types'
import { useProgress } from '../context/progress'
import { courseProgress, lessonKey } from '../lib/course'
import { cn } from '../lib/utils'
import { cancelSmoothScroll, smoothScrollTo } from '../lib/smoothScroll'
import { useCollapsibleRail } from '../lib/useCollapsibleRail'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

function LessonIndex({
  language,
  currentLessonId,
  isComplete,
  onNavigate,
  scrollToContent,
}: {
  language: Language
  currentLessonId: string
  isComplete: (key: string) => boolean
  onNavigate?: () => void
  scrollToContent?: boolean
}) {
  return (
    <ol className="space-y-1">
      {language.lessons.map((lesson, index) => {
        const complete = isComplete(lessonKey(language.id, lesson.id))
        const active = lesson.id === currentLessonId

        return (
          <li key={lesson.id}>
            <Link
              to={`/languages/${language.id}/lessons/${lesson.id}`}
              state={scrollToContent ? { scrollToLessonContent: true } : undefined}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex gap-2.5 rounded-lg px-2.5 py-2 text-xs leading-5 transition',
                active
                  ? 'bg-white/[0.07] text-zinc-100'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200',
              )}
            >
              <span
                className="mt-px w-4 shrink-0 font-mono text-[10px]"
                style={active ? { color: language.accent } : undefined}
                aria-hidden="true"
              >
                {complete ? '✓' : String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">{lesson.title}</span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export function LessonPage() {
  const { languageId, lessonId } = useParams()
  const language = getLanguage(languageId)
  const lesson = language ? getLesson(language, lessonId) : undefined
  useDocumentTitle(
    language && lesson
      ? `${lesson.title} · ${language.name}`
      : language
        ? `${language.name} course`
        : undefined,
  )
  const { completed, isComplete, bestScore } = useProgress()
  const courseRail = useCollapsibleRail()
  const location = useLocation()
  const [lessonsOpen, setLessonsOpen] = useState(false)

  useEffect(() => {
    const shouldScroll = Boolean(
      (location.state as { scrollToLessonContent?: boolean } | null)
        ?.scrollToLessonContent,
    )
    if (!shouldScroll) return
    if (!window.matchMedia('(max-width: 1023px)').matches) return

    const frame = window.requestAnimationFrame(() => {
      const panel = document.querySelector<HTMLElement>(
        '[id^="lesson-panel-"]:not([hidden])',
      )
      smoothScrollTo(panel)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      cancelSmoothScroll()
    }
  }, [location.key, location.state])

  if (!language || !lesson) return <NotFound />

  const index = language.lessons.indexOf(lesson)
  const previous = index > 0 ? language.lessons[index - 1] : null
  const next =
    index < language.lessons.length - 1 ? language.lessons[index + 1] : null
  const key = lessonKey(language.id, lesson.id)
  const done = isComplete(key)
  const best = bestScore(key)
  const progress = courseProgress(language, completed)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 xl:max-w-7xl 2xl:max-w-[88rem]">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-zinc-300">
          Courses
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to={`/languages/${language.id}`}
          className="transition hover:text-zinc-300"
        >
          {language.name}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-zinc-300">{lesson.title}</span>
      </nav>

      <div
        className={cn(
          'mt-6 grid gap-10 transition-[grid-template-columns] duration-200',
          courseRail.collapsed
            ? 'lg:grid-cols-[56px_minmax(0,1fr)]'
            : 'lg:grid-cols-[240px_minmax(0,1fr)]',
        )}
      >
        <aside className="relative hidden lg:block">
          <div
            className={cn(
              'sticky top-24 flex max-h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-200',
              courseRail.collapsed
                ? courseRail.expanded
                  ? 'z-30 w-[240px] bg-zinc-950 p-4 shadow-2xl'
                  : 'w-14 bg-white/[0.02] p-2'
                : 'w-full bg-white/[0.02] p-4',
            )}
          >
            {courseRail.expanded ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={`/languages/${language.id}`}
                    className="inline-flex min-w-0 items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-200"
                  >
                    <span aria-hidden="true" className="shrink-0">
                      ←
                    </span>
                    <span className="truncate">{language.name} course</span>
                  </Link>
                  <button
                    type="button"
                    onClick={
                      courseRail.collapsed ? courseRail.expand : courseRail.collapse
                    }
                    aria-label={
                      courseRail.collapsed
                        ? 'Keep course sidebar open'
                        : 'Collapse course sidebar'
                    }
                    title={
                      courseRail.collapsed
                        ? 'Keep course sidebar open'
                        : 'Collapse course sidebar'
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
                        d={courseRail.collapsed ? 'm6 3 5 5-5 5' : 'M10 3 5 8l5 5'}
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex shrink-0 items-center justify-between text-[11px] text-zinc-500">
                  <span>Course progress</span>
                  <span>{progress.percent}%</span>
                </div>
                <ProgressBar
                  value={progress.percent}
                  accent={language.accent}
                  className="mt-2 shrink-0"
                  label={`${language.name} course progress`}
                />

                <div className="mt-5 flex min-h-0 flex-1 flex-col border-t border-white/[0.06] pt-4">
                  <p className="mb-2 shrink-0 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
                    Lessons
                  </p>
                  <div className="-mr-1 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
                    <LessonIndex
                      language={language}
                      currentLessonId={lesson.id}
                      isComplete={isComplete}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-1">
                <button
                  type="button"
                  onClick={courseRail.expand}
                  aria-label="Keep course sidebar open"
                  title="Keep course sidebar open"
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
                  Course
                </span>
                <span className="font-mono text-[10px] text-zinc-600">
                  {progress.percent}%
                </span>
              </div>
            )}
          </div>
        </aside>

        <article className="min-w-0">
          <details
            open={lessonsOpen}
            onToggle={(event) => setLessonsOpen(event.currentTarget.open)}
            className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:hidden"
          >
            <summary className="cursor-pointer text-sm font-medium text-zinc-200">
              Lessons in this course ({progress.completed}/{progress.total})
            </summary>
            <div className="mt-3">
              <LessonIndex
                language={language}
                currentLessonId={lesson.id}
                isComplete={isComplete}
                onNavigate={() => setLessonsOpen(false)}
                scrollToContent
              />
            </div>
          </details>

          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="font-mono">
                Lesson {String(index + 1).padStart(2, '0')} of{' '}
                {String(language.lessons.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{lesson.minutes} min read</span>
              {done && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                  ✓ Completed
                </span>
              )}
              {best > 0 && !done && (
                <span className="text-zinc-600">Best score {best}%</span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-zinc-400">{lesson.summary}</p>
          </header>

          <LessonTabs
            key={key}
            lesson={lesson}
            language={language}
            lessonKey={key}
            nextLesson={next}
          />

          <nav
            className="mt-10 grid gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2"
            aria-label="Lesson navigation"
          >
            {previous ? (
              <Link
                to={`/languages/${language.id}/lessons/${previous.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  ← Previous
                </span>
                <p className="mt-1 text-sm font-medium text-zinc-200 transition group-hover:text-white">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <Link
                to={`/languages/${language.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  ← Back
                </span>
                <p className="mt-1 text-sm font-medium text-zinc-200 transition group-hover:text-white">
                  Course overview
                </p>
              </Link>
            )}

            {next ? (
              <Link
                to={`/languages/${language.id}/lessons/${next.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-white/20 hover:bg-white/[0.04] sm:col-start-2"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Next →
                </span>
                <p className="mt-1 text-sm font-medium text-zinc-200 transition group-hover:text-white">
                  {next.title}
                </p>
              </Link>
            ) : (
              <Link
                to={`/languages/${language.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-white/20 hover:bg-white/[0.04] sm:col-start-2"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  Finish →
                </span>
                <p className="mt-1 text-sm font-medium text-zinc-200 transition group-hover:text-white">
                  Back to the course
                </p>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  )
}
