import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Language } from '../content/types'
import type { CourseProgress } from '../lib/course'
import { cn } from '../lib/utils'
import { ProgressRing } from './ProgressRing'

const DIFFICULTY_STYLES: Record<Language['difficulty'], string> = {
  Beginner: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  Intermediate: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  Advanced: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
}

export function LanguageCard({
  language,
  progress,
}: {
  language: Language
  progress: CourseProgress
}) {
  const comingSoon = Boolean(language.comingSoon)
  const cardClassName = cn(
    'group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300',
    comingSoon
      ? 'opacity-80'
      : 'hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_24px_60px_-30px_var(--accent)]',
  )

  const content = (
    <>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-20"
        style={{ backgroundColor: language.accent }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-sm font-bold"
          style={{
            color: language.accent,
            borderColor: `${language.accent}40`,
            backgroundColor: `${language.accent}14`,
          }}
        >
          {language.monogram}
        </div>
        {comingSoon ? (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Soon
          </span>
        ) : (
          <ProgressRing value={progress.percent} accent={language.accent} size={44} />
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-50">
            {language.name}
          </h3>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${DIFFICULTY_STYLES[language.difficulty]}`}
          >
            {language.difficulty}
          </span>
          {comingSoon && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
              <span
                className="h-1 w-1 rounded-full bg-zinc-500"
                aria-hidden="true"
              />
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-6 text-zinc-400">{language.tagline}</p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
        <span className="text-zinc-500">
          {comingSoon
            ? 'Lessons on the way'
            : `${progress.completed} of ${progress.total} lessons`}
        </span>
        {comingSoon ? (
          <span className="font-medium text-zinc-500">Coming soon</span>
        ) : (
          <span className="inline-flex items-center gap-1 font-medium text-zinc-300 transition group-hover:text-white">
            {progress.percent > 0 ? 'Continue' : 'Start'}
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
              →
            </span>
          </span>
        )}
      </div>
    </>
  )

  if (comingSoon) {
    return (
      <div
        className={cardClassName}
        style={{ '--accent': language.accent } as CSSProperties}
        aria-label={`${language.name} — coming soon`}
      >
        {content}
      </div>
    )
  }

  return (
    <Link
      to={`/languages/${language.id}`}
      style={{ '--accent': language.accent } as CSSProperties}
      className={cardClassName}
    >
      {content}
    </Link>
  )
}
