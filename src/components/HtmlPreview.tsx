import { cn } from '../lib/utils'

export function HtmlPreview({
  code,
  title,
  className,
}: {
  code: string
  title: string
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 flex-col overflow-hidden bg-white', className)}>
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-950/90 px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Preview
        </span>
        <span className="text-[10px] text-zinc-600">Live · scripts off</span>
      </div>
      <iframe
        title={title}
        srcDoc={code}
        sandbox=""
        referrerPolicy="no-referrer"
        className="min-h-0 w-full flex-1 border-0 bg-white"
      />
    </div>
  )
}
