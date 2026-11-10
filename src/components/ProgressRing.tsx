interface ProgressRingProps {
  value: number
  accent?: string
  size?: number
  strokeWidth?: number
}

export function ProgressRing({
  value,
  accent = '#38bdf8',
  size = 44,
  strokeWidth = 7,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped}% complete`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-semibold text-zinc-200"
        style={{ fontSize: Math.max(9, size / 4.2) }}
      >
        {clamped}%
      </span>
    </div>
  )
}
