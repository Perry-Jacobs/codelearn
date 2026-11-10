import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { ProgressRing } from '../components/ProgressRing'
import { languages } from '../content'
import { useProgress } from '../context/progress'
import { courseProgress, overallProgress } from '../lib/course'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function ProgressPage() {
  const { completed, hasProgress, resetProgress } = useProgress()
  useDocumentTitle('My progress')
  const availableLanguages = languages.filter((language) => !language.comingSoon)
  const overall = overallProgress(availableLanguages, completed)

  const started = availableLanguages.filter(
    (language) => courseProgress(language, completed).completed > 0,
  ).length
  const finished = availableLanguages.filter(
    (language) => courseProgress(language, completed).percent === 100,
  ).length

  function handleReset() {
    const confirmed = window.confirm(
      'Reset all lesson progress and quiz scores? This cannot be undone.',
    )
    if (confirmed) resetProgress()
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
              Your dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              My progress
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              Everything is stored in this browser. Finish a lesson by passing its quiz, and
              the course fills up as you go.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            disabled={!hasProgress}
            className="self-start rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-rose-400/30 hover:bg-rose-400/[0.06] hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
          >
            Reset progress
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ProgressRing value={overall.percent} size={104} strokeWidth={6} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Overall completion
              </p>
              <p className="mt-2 font-mono text-3xl font-semibold text-zinc-50">
                {overall.completed}
                <span className="text-lg text-zinc-500"> / {overall.total}</span>
              </p>
              <p className="mt-1 text-sm text-zinc-400">lessons completed</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Lessons complete', value: `${overall.completed}` },
              { label: 'Course started', value: started > 0 ? 'Yes' : 'No' },
              { label: 'Course finished', value: finished > 0 ? 'Yes' : 'No' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  {stat.label}
                </p>
                <p className="mt-6 font-mono text-2xl font-semibold text-zinc-100">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {completed.size === 0 && (
          <div className="mt-6 rounded-2xl border border-sky-400/20 bg-sky-400/[0.05] p-5">
            <p className="text-sm font-semibold text-sky-200">Nothing here yet.</p>
            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Pick any lesson, read it, and pass the quiz. This page will start
              filling in immediately.{' '}
              <Link
                to="/languages/html"
                className="font-medium text-sky-300 underline-offset-4 hover:underline"
              >
                Start with HTML
              </Link>
              .
            </p>
          </div>
        )}

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
                Course progress
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {overall.percent}% of the course complete.
              </p>
            </div>
            <Link
              to="/#courses"
              className="shrink-0 text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
            >
              Browse courses →
            </Link>
          </div>

          <div className="mt-5 divide-y divide-white/[0.06] rounded-2xl border border-white/10 bg-white/[0.02]">
            {availableLanguages.map((language) => {
              const progress = courseProgress(language, completed)

              return (
                <Link
                  key={language.id}
                  to={`/languages/${language.id}`}
                  className="group flex items-center gap-4 px-4 py-4 transition hover:bg-white/[0.03] sm:px-5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-xs font-bold"
                    style={{
                      color: language.accent,
                      borderColor: `${language.accent}40`,
                      backgroundColor: `${language.accent}14`,
                    }}
                  >
                    {language.monogram}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-zinc-100">
                        {language.name}
                      </p>
                      <span className="shrink-0 font-mono text-xs text-zinc-500">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <ProgressBar
                      value={progress.percent}
                      accent={language.accent}
                      className="mt-2"
                      label={`${language.name} progress`}
                    />
                  </div>

                  <span
                    className="w-10 shrink-0 text-right font-mono text-xs text-zinc-400"
                    aria-hidden="true"
                  >
                    {progress.percent}%
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
