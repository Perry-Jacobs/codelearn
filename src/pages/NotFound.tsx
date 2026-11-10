import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-sky-300">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        We could not find that page.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        The link may be wrong, or the lesson might have moved. Head back to the course library
        and pick up from there.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
      >
        Back to courses
      </Link>
    </div>
  )
}
