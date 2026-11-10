import { cn } from '../lib/utils'

interface ProgressBarProps {
  value: number
  accent?: string
  className?: string
  label?: string
}

export function ProgressBar({
  value,
  accent = '#38bdf8',
  className,
  label,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))

  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-white/10', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Course progress'}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${clamped}%`, backgroundColor: accent }}
      />
    </div>
  )
}
