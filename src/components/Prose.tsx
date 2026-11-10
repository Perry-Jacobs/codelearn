import { Fragment } from 'react'
import { cn } from '../lib/utils'

const INLINE_PATTERN = /(`[^`]+`|\*\*[^*]+\*\*)/g

export function InlineText({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={index}
              className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-sky-200"
            >
              {part.slice(1, -1)}
            </code>
          )
        }

        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <strong key={index} className="font-semibold text-zinc-100">
              {part.slice(2, -2)}
            </strong>
          )
        }

        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}

export function Prose({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <p className={cn('text-[15px] leading-7 text-zinc-400', className)}>
      <InlineText text={text} />
    </p>
  )
}
