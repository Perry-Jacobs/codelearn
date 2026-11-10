import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { highlightCode } from '../lib/highlight'
import { cn, languageLabel } from '../lib/utils'
import { HtmlPreview } from './HtmlPreview'

const MonacoCodeEditor = lazy(() =>
  import('./MonacoCodeEditor').then((module) => ({
    default: module.MonacoCodeEditor,
  })),
)

const PREVIEW_DELAY = 400
const EDITOR_HEIGHT = '360px'

interface CodeBlockProps {
  code: string
  language: string
  caption?: string
  className?: string
  showPreview?: boolean
  active?: boolean
}

function StaticCode({ highlighted }: { highlighted: string }) {
  return (
    <pre className="h-[360px] overflow-auto p-4 text-[13px] leading-6">
      <code
        className="hljs font-mono"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  )
}

export function CodeBlock({
  code,
  language,
  caption,
  className,
  showPreview = false,
  active = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [draft, setDraft] = useState(code)
  const [previewCode, setPreviewCode] = useState(code)
  const [lastCode, setLastCode] = useState(code)
  const [editorInView, setEditorInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const codePanelRef = useRef<HTMLDivElement>(null)
  const canPreview = showPreview && language === 'html'
  const editable = canPreview
  const showEditor = editable && active && editorInView
  const edited = draft !== code
  const highlighted = useMemo(() => highlightCode(draft, language), [draft, language])

  if (code !== lastCode) {
    setLastCode(code)
    setDraft(code)
    setPreviewCode(code)
  }

  useEffect(() => {
    if (!editable || !active || editorInView) return

    const node = codePanelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEditorInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '360px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [active, editable, editorInView])

  useEffect(() => {
    if (draft === previewCode) return
    const timer = window.setTimeout(() => setPreviewCode(draft), PREVIEW_DELAY)
    return () => window.clearTimeout(timer)
  }, [draft, previewCode])

  async function copyCode() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(draft)
      } else {
        throw new Error('Clipboard API unavailable')
      }
    } catch {
      const area = document.createElement('textarea')
      area.value = draft
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  function resetCode() {
    setDraft(code)
    setPreviewCode(code)
  }

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-[#0c0d11] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <span className="truncate font-mono text-[11px] tracking-wider text-zinc-500">
            {caption ?? languageLabel(language)}
          </span>
          {editable && (
            <span className="hidden shrink-0 items-center gap-1 rounded border border-sky-400/20 bg-sky-400/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300/80 sm:flex">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="m2.5 11.5-.5 2 2-.5 7.5-7.5-1.5-1.5-7.5 7.5Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="m9 4 1.5 1.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              Editable
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {editable && edited && (
            <button
              type="button"
              onClick={resetCode}
              className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition hover:border-white/20 hover:text-zinc-200"
              aria-label="Reset the example to its original code"
            >
              Reset
            </button>
          )}
          {canPreview && (
            <button
              type="button"
              onClick={() => setPreviewOpen((open) => !open)}
              aria-pressed={previewOpen}
              aria-label={previewOpen ? 'Hide live preview' : 'Show live preview'}
              title={previewOpen ? 'Hide live preview' : 'Show live preview'}
              className={cn(
                'flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition',
                previewOpen
                  ? 'border-white/20 bg-white/[0.06] text-zinc-200'
                  : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300',
              )}
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3 w-3"
              >
                <path
                  d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
                {!previewOpen && (
                  <path d="m2.5 2.5 11 11" stroke="currentColor" strokeWidth="1.2" />
                )}
              </svg>
              Preview
            </button>
          )}
          <button
            type="button"
            onClick={copyCode}
            className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 transition hover:border-white/20 hover:text-zinc-200"
            aria-label="Copy code to clipboard, including comments"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      {canPreview ? (
        <div className="overflow-hidden">
          <div
            className={cn(
              'flex w-[200%] transition-all duration-300 ease-out',
              previewOpen ? '-translate-x-1/2' : 'translate-x-0',
            )}
          >
            <div
              ref={codePanelRef}
              className="min-w-0 shrink-0 basis-1/2"
              aria-hidden={previewOpen}
              inert={previewOpen}
            >
              {showEditor ? (
                <Suspense fallback={<StaticCode highlighted={highlighted} />}>
                  <MonacoCodeEditor
                    value={draft}
                    onChange={setDraft}
                    height={EDITOR_HEIGHT}
                  />
                </Suspense>
              ) : (
                <StaticCode highlighted={highlighted} />
              )}
            </div>
            <div
              className="min-w-0 shrink-0 basis-1/2"
              aria-hidden={!previewOpen}
              inert={!previewOpen}
            >
              <HtmlPreview
                code={previewCode}
                title={`${caption ?? languageLabel(language)} preview`}
                className="h-[360px]"
              />
            </div>
          </div>
        </div>
      ) : (
        <pre className="overflow-x-auto p-4 text-[13px] leading-6">
          <code
            className="hljs font-mono"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      )}
    </figure>
  )
}
