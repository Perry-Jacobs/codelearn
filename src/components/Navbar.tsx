import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'

const linkBase =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="CodeLearn home">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 font-mono text-xs font-bold text-zinc-950 shadow-[0_0_24px_-6px_rgba(56,189,248,0.8)] transition group-hover:brightness-110">
            &gt;_
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            CodeLearn
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                linkBase,
                isActive
                  ? 'bg-white/[0.07] text-zinc-100'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100',
              )
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              cn(
                linkBase,
                isActive
                  ? 'bg-white/[0.07] text-zinc-100'
                  : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100',
              )
            }
          >
            My progress
          </NavLink>
          <Link
            to="/languages/html"
            className="ml-2 hidden rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 sm:inline-flex"
          >
            Start learning
          </Link>
        </nav>
      </div>
    </header>
  )
}
