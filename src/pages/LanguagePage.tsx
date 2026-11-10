import { Link, useParams } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { ProgressRing } from '../components/ProgressRing'
import { getLanguage } from '../content'
import type { Language } from '../content/types'
import { useProgress } from '../context/progress'
import {
  CATEGORY_LABELS,
  courseMinutes,
  courseProgress,
  courseQuizCount,
  lessonKey,
  nextLesson,
} from '../lib/course'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

const DIFFICULTY_STYLES: Record<Language['difficulty'], string> = {
  Beginner: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  Intermediate: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  Advanced: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
}

export function LanguagePage() {
  const { languageId } = useParams()
  const language = getLanguage(languageId)
  useDocumentTitle(language ? `${language.name} course` : undefined)
  const { completed, isComplete, bestScore } = useProgress()

  if (!language) return <NotFound />

  if (language.comingSoon || language.lessons.length === 0) {
    return (
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${language.accent}20, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

        <section className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border font-mono text-lg font-bold"
            style={{
              color: language.accent,
              borderColor: `${language.accent}40`,
              backgroundColor: `${language.accent}14`,
            }}
          >
            {language.monogram}
          </div>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Coming soon
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {language.name} is on the way.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
            {language.description}
          </p>
          <Link
            to="/#courses"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Browse available courses
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    )
  }

  const progress = courseProgress(language, completed)
  const upcoming = nextLesson(language, completed)
  const targetLesson = upcoming ?? language.lessons[0]
  const started = progress.completed > 0
  const finished = progress.completed === progress.total
  const actionLabel = finished ? 'Review course' : started ? 'Continue course' : 'Start course'

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 15% 0%, ${language.accent}1f, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <nav className="flex items-center gap-2 text-xs text-zinc-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-zinc-300">
              Courses
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-300">{language.name}</span>
          </nav>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border font-mono text-lg font-bold"
                  style={{
                    color: language.accent,
                    borderColor: `${language.accent}40`,
                    backgroundColor: `${language.accent}14`,
                  }}
                >
                  {language.monogram}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                      {language.name}
                    </h1>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${DIFFICULTY_STYLES[language.difficulty]}`}
                    >
                      {language.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{language.tagline}</p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-zinc-400">
                {language.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  {language.lessons.length} lessons
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  ≈ {courseMinutes(language)} min total
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  {courseQuizCount(language)} quiz questions
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  {CATEGORY_LABELS[language.category]}
                </span>
              </div>
            </div>

            <Link
              to={`/languages/${language.id}/lessons/${targetLesson.id}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              {actionLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Curriculum
              </p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-zinc-50">
                {language.lessons.length} lessons, in order
              </h2>
            </div>
            <span className="shrink-0 text-xs text-zinc-500">
              {progress.completed}/{progress.total} complete
            </span>
          </div>

          <ol className="mt-6 space-y-3">
            {language.lessons.map((lesson, index) => {
              const key = lessonKey(language.id, lesson.id)
              const done = isComplete(key)
              const best = bestScore(key)

              return (
                <li key={lesson.id}>
                  <Link
                    to={`/languages/${language.id}/lessons/${lesson.id}`}
                    state={{ scrollToLessonContent: true }}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04] sm:p-5"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs"
                      style={
                        done
                          ? {
                              color: language.accent,
                              borderColor: `${language.accent}50`,
                              backgroundColor: `${language.accent}18`,
                            }
                          : {
                              borderColor: 'rgba(255,255,255,0.12)',
                              color: '#71717a',
                            }
                      }
                      aria-hidden="true"
                    >
                      {done ? '✓' : String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-[15px] font-semibold text-zinc-100">
                          {lesson.title}
                        </h3>
                        {done && (
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{lesson.summary}</p>
                      <p className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span>{lesson.minutes} min read</span>
                        <span aria-hidden="true">·</span>
                        <span>{lesson.quiz.length} questions</span>
                        {best > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Best score {best}%</span>
                          </>
                        )}
                      </p>
                    </div>

                    <span
                      className="mt-2 shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>

        <aside className="lg:pt-1">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Your progress
            </p>

            <div className="mt-4 flex items-center gap-4">
              <ProgressRing
                value={progress.percent}
                accent={language.accent}
                size={64}
                strokeWidth={7}
              />
              <div>
                <p className="text-sm font-semibold text-zinc-100">
                  {progress.completed} of {progress.total} lessons
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {finished
                    ? 'Course complete'
                    : started
                      ? 'Keep going — you are moving.'
                      : 'No lessons started yet.'}
                </p>
              </div>
            </div>

            <ProgressBar
              value={progress.percent}
              accent={language.accent}
              className="mt-4"
              label={`${language.name} course progress`}
            />

            <Link
              to={`/languages/${language.id}/lessons/${targetLesson.id}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              {finished ? 'Review from the start' : started ? 'Continue learning' : 'Begin lesson 1'}
            </Link>

            <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-500">
              <p className="flex justify-between">
                <span>Difficulty</span>
                <span className="text-zinc-300">{language.difficulty}</span>
              </p>
              <p className="flex justify-between">
                <span>Reading time</span>
                <span className="text-zinc-300">≈ {courseMinutes(language)} min</span>
              </p>
              <p className="flex justify-between">
                <span>Quiz questions</span>
                <span className="text-zinc-300">{courseQuizCount(language)}</span>
              </p>
            </div>

            <p className="mt-4 text-[11px] leading-5 text-zinc-600">
              Finish a lesson by scoring 60% or higher on its quiz. Progress is saved in this
              browser.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
