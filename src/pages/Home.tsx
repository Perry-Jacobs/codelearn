import { Link } from 'react-router-dom'
import { LanguageCard } from '../components/LanguageCard'
import { ProgressBar } from '../components/ProgressBar'
import { languages, totalLessons, totalQuizQuestions } from '../content'
import { useProgress } from '../context/progress'
import {
  CATEGORY_LABELS,
  courseProgress,
  firstIncompleteCourse,
  overallProgress,
} from '../lib/course'
import { plural } from '../lib/utils'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Home() {
  const { completed } = useProgress()
  useDocumentTitle()
  const availableLanguages = languages.filter((language) => !language.comingSoon)
  const overall = overallProgress(availableLanguages, completed)

  const resume = firstIncompleteCourse(availableLanguages, completed)

  const categories = Array.from(new Set(languages.map((language) => language.category)))
  const groups = categories.map((category) => ({
    category,
    items: languages.filter((language) => language.category === category),
  }))

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-[110px]" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {availableLanguages.length}{' '}
              {plural(availableLanguages.length, 'track')} · {totalLessons} lessons · no
              account needed
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.4rem]">
              Learn the web,{' '}
              <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
                one step at a time.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Build a strong foundation with HTML and CSS. Read the concept, study the
              code, pass the quiz, and grow from one tag to a full page.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Browse courses
              </a>
              <Link
                to="/progress"
                className="rounded-lg border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                My progress
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
              <div>
                <dd className="font-mono text-2xl font-semibold text-zinc-100">
                  {availableLanguages.length}
                </dd>
                <dt className="mt-1 text-xs text-zinc-500">
                  {plural(availableLanguages.length, 'Track')}
                </dt>
              </div>
              <div>
                <dd className="font-mono text-2xl font-semibold text-zinc-100">
                  {totalLessons}
                </dd>
                <dt className="mt-1 text-xs text-zinc-500">Lessons</dt>
              </div>
              <div>
                <dd className="font-mono text-2xl font-semibold text-zinc-100">
                  {totalQuizQuestions}
                </dd>
                <dt className="mt-1 text-xs text-zinc-500">Quiz questions</dt>
              </div>
            </dl>
          </div>

          {/* Decorative code window */}
          <div className="relative lg:pl-4">
            <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10]/95 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                </span>
                <span className="ml-2 font-mono text-[11px] text-zinc-500">index.html</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
                <code>
                  <span className="text-zinc-500">&lt;!doctype html&gt;</span>
                  {'\n'}
                  <span className="text-sky-300">&lt;html</span>{' '}
                  <span className="text-amber-300">lang</span>
                  <span className="text-zinc-400">=</span>
                  <span className="text-emerald-300">"en"</span>
                  <span className="text-sky-300">&gt;</span>
                  {'\n'}
                  <span className="text-zinc-400">  </span>
                  <span className="text-sky-300">&lt;body&gt;</span>
                  {'\n'}
                  <span className="text-zinc-400">    </span>
                  <span className="text-sky-300">&lt;h1&gt;</span>
                  <span className="text-zinc-100">Hello, world</span>
                  <span className="text-sky-300">&lt;/h1&gt;</span>
                  {'\n'}
                  <span className="text-zinc-400">    </span>
                  <span className="text-sky-300">&lt;p&gt;</span>
                  <span className="text-zinc-100">One tag at a time.</span>
                  <span className="text-sky-300">&lt;/p&gt;</span>
                  {'\n'}
                  <span className="text-zinc-400">  </span>
                  <span className="text-sky-300">&lt;/body&gt;</span>
                  {'\n'}
                  <span className="text-sky-300">&lt;/html&gt;</span>
                </code>
              </pre>
            </div>

            <div className="absolute -bottom-5 right-3 rounded-xl border border-emerald-400/20 bg-zinc-950/95 px-4 py-3 shadow-xl backdrop-blur sm:right-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                Quiz passed
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <span aria-hidden="true">✓</span> Lesson complete
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Continue learning */}
        {resume && (
          <section className="pt-10">
            <Link
              to={`/languages/${resume.language.id}/lessons/${resume.lesson.id}`}
              className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05] sm:flex-row sm:items-center sm:gap-6"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-bold"
                style={{
                  color: resume.language.accent,
                  borderColor: `${resume.language.accent}40`,
                  backgroundColor: `${resume.language.accent}14`,
                }}
              >
                {resume.language.monogram}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Pick up where you left off
                </p>
                <p className="mt-1 truncate text-base font-semibold text-zinc-100">
                  {resume.lesson.title}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <ProgressBar
                    value={resume.progress.percent}
                    accent={resume.language.accent}
                    className="max-w-xs"
                    label={`${resume.language.name} progress`}
                  />
                  <span className="shrink-0 text-xs text-zinc-500">
                    {resume.progress.completed}/{resume.progress.total}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition group-hover:text-white">
                Resume <span aria-hidden="true">→</span>
              </span>
            </Link>
          </section>
        )}

        {overall.percent === 100 && (
          <section className="pt-10">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
              <p className="text-sm font-semibold text-emerald-200">
                Every lesson complete — nice work!
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Revisit any lesson whenever you need a refresher. Your best quiz scores are
                saved.
              </p>
            </div>
          </section>
        )}

        {/* Course grid */}
        <section id="courses" className="scroll-mt-24 py-16 sm:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300/80">
              Course library
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              Start with HTML and CSS.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Two available tracks with 38 beginner lessons, runnable examples, and a
              short quiz after every lesson. JavaScript is next on the roadmap.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {groups.map((group) => (
              <div key={group.category}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {CATEGORY_LABELS[group.category]}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((language) => (
                    <LanguageCard
                      key={language.id}
                      language={language}
                      progress={courseProgress(language, completed)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300/80">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              A learning loop that sticks.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Read the idea',
                body: 'Each lesson explains one concept in plain language, with the details that actually matter.',
              },
              {
                number: '02',
                title: 'Study the code',
                body: 'Every example is complete and copyable. Read it, run it, break it, fix it.',
              },
              {
                number: '03',
                title: 'Pass the quiz',
                body: 'A short quiz turns recognition into recall. Your progress is saved in this browser.',
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="font-mono text-xs text-zinc-600">{step.number}</span>
                <h3 className="mt-4 text-base font-semibold text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Progress is stored locally in your browser. Clearing site data resets it.
          </p>
        </section>
      </div>
    </div>
  )
}
