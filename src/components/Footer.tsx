import { Link } from 'react-router-dom'
import { languages } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.6fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 font-mono text-xs font-bold text-zinc-950">
              &gt;_
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
              CodeLearn
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">
            Short, focused lessons for the web. Start with HTML, then learn CSS, and prove
            it with a quiz.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Courses
          </h2>
          <ul className="mt-4 space-y-2.5">
            {languages.map((language) => (
              <li key={language.id}>
                <Link
                  to={`/languages/${language.id}`}
                  className="text-sm text-zinc-400 transition hover:text-zinc-100"
                >
                  {language.name}
                  {language.comingSoon && (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wider text-zinc-600">
                      Soon
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>CodeLearn — a small site for big ideas.</p>
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
