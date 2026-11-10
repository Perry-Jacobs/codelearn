import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { CodeChallengeBlock } from './CodeChallengeBlock'
import { PracticeBlock } from './PracticeBlock'
import { InlineText, Prose } from './Prose'
import type { Section } from '../content/types'
import { cn } from '../lib/utils'

export function LessonSection({
  section,
  accent,
  stepNumber,
  active = true,
}: {
  section: Section
  accent: string
  stepNumber?: number
  active?: boolean
}) {
  switch (section.type) {
    case 'text':
      return <Prose text={section.content} />

    case 'code':
      return (
        <CodeBlock
          code={section.code}
          language={section.language}
          caption={section.caption}
          showPreview={section.preview ?? (section.language === 'html')}
          active={active}
        />
      )

    case 'callout':
      return (
        <Callout tone={section.tone} title={section.title} content={section.content} />
      )

    case 'concept':
      return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="flex h-8 shrink-0 items-center justify-center rounded-lg border px-2 font-mono text-[10px] font-semibold tracking-wider"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                backgroundColor: `${accent}12`,
              }}
              aria-hidden="true"
            >
              {String(stepNumber ?? 0).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Building block
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-zinc-100">
                {section.title}
              </h3>
            </div>
          </div>

          <div className="mt-3">
            <Prose text={section.content} />
          </div>

          {section.code && (
            <CodeBlock
              className="mt-4"
              code={section.code}
              language={section.language ?? 'text'}
              caption={section.caption}
              showPreview={section.preview ?? (section.language === 'html')}
              active={active}
            />
          )}
        </div>
      )

    case 'list':
      return (
        <div>
          {section.title && (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {section.title}
            </p>
          )}
          <ul className={cn('space-y-2.5', section.title && 'mt-3')}>
            {section.items.map((item, index) => (
              <li
                key={index}
                className="flex gap-3 text-[15px] leading-7 text-zinc-400"
              >
                <span
                  className="mt-3 h-1 w-1 shrink-0 rounded-full bg-zinc-600"
                  aria-hidden="true"
                />
                <span>
                  <InlineText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'practice':
      return <PracticeBlock section={section} accent={accent} />

    case 'code-challenge':
      return <CodeChallengeBlock section={section} accent={accent} active={active} />

    default:
      return null
  }
}
