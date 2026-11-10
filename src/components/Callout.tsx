import { cn } from '../lib/utils'
import { InlineText } from './Prose'

type Tone = 'tip' | 'note' | 'warning'

const TONES: Record<
  Tone,
  { name: string; border: string; background: string; label: string; dot: string }
> = {
  tip: {
    name: 'Tip',
    border: 'border-emerald-400/20',
    background: 'bg-emerald-400/[0.05]',
    label: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
  note: {
    name: 'Note',
    border: 'border-sky-400/20',
    background: 'bg-sky-400/[0.05]',
    label: 'text-sky-300',
    dot: 'bg-sky-400',
  },
  warning: {
    name: 'Watch out',
    border: 'border-amber-400/20',
    background: 'bg-amber-400/[0.05]',
    label: 'text-amber-300',
    dot: 'bg-amber-400',
  },
}

export function Callout({
  tone,
  title,
  content,
}: {
  tone: Tone
  title: string
  content: string
}) {
  const styles = TONES[tone]

  return (
    <aside
      className={cn(
        'rounded-xl border p-4 sm:p-5',
        styles.border,
        styles.background,
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} aria-hidden="true" />
        <span
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.14em]',
            styles.label,
          )}
        >
          {styles.name}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium text-zinc-100">{title}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">
        <InlineText text={content} />
      </p>
    </aside>
  )
}
