import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { InputQuizQuestion, QuizQuestion } from '../content/types'
import { PASS_PERCENT, useProgress } from '../context/progress'
import { normalizeAnswer } from '../lib/answer'
import { cn } from '../lib/utils'

interface QuizProps {
  lessonKey: string
  questions: QuizQuestion[]
  accent: string
  onPass?: () => void
  carousel?: boolean
}

const GIFT_COLORS = ['#fbbf24', '#fb7185', '#38bdf8', '#34d399', '#c084fc']

const GIFT_CONFETTI = Array.from({ length: 18 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 18 - Math.PI / 2
  const distance = 46 + (index % 4) * 14

  return {
    dx: Math.round(Math.cos(angle) * distance),
    dy: Math.round(Math.sin(angle) * distance),
    rotation: index * 47,
  }
})

type QuizAnswer = number | string | null

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

function isInputQuestion(question: QuizQuestion): question is InputQuizQuestion {
  return question.type === 'input'
}

function isAnswerFilled(question: QuizQuestion, answer: QuizAnswer): boolean {
  if (answer === null) return false
  if (isInputQuestion(question)) {
    return typeof answer === 'string' && answer.trim().length > 0
  }
  return typeof answer === 'number'
}

function isAnswerCorrect(question: QuizQuestion, answer: QuizAnswer): boolean {
  if (!isAnswerFilled(question, answer)) return false
  if (isInputQuestion(question)) {
    if (typeof answer !== 'string') return false
    const normalized = normalizeAnswer(answer)
    return question.acceptedAnswers.some(
      (accepted) => normalizeAnswer(accepted) === normalized,
    )
  }
  return typeof answer === 'number' && answer === question.answer
}

function questionKey(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`*_'"’“”]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[?.!]+$/g, '')
}

function pickQuizQuestions(pool: QuizQuestion[]): QuizQuestion[] {
  const unique: QuizQuestion[] = []
  const seenIds = new Set<string>()
  const seenText = new Set<string>()

  for (const question of pool) {
    const textKey = questionKey(question.question)
    if (seenIds.has(question.id) || seenText.has(textKey)) continue
    seenIds.add(question.id)
    seenText.add(textKey)
    unique.push(question)
  }

  const count = Math.min(unique.length, 5 + Math.floor(Math.random() * 2))
  const practical = unique.filter(isInputQuestion)
  const selection = unique.filter((question) => !isInputQuestion(question))
  const practicalCount = Math.min(practical.length, 2, Math.max(1, count - 1))
  const chosen = [
    ...shuffle(practical).slice(0, practicalCount),
    ...shuffle(selection).slice(0, count - practicalCount),
  ]

  if (chosen.length < count) {
    const chosenIds = new Set(chosen.map((question) => question.id))
    chosen.push(
      ...shuffle(unique.filter((question) => !chosenIds.has(question.id))).slice(
        0,
        count - chosen.length,
      ),
    )
  }

  return shuffle(chosen)
}

function GiftBurst({ accent }: { accent: string }) {
  return (
    <div className="quiz-gift-scene" aria-hidden="true">
      {GIFT_CONFETTI.map((piece, index) => (
        <span
          key={index}
          className="quiz-gift-confetti-piece"
          style={
            {
              '--dx': `${piece.dx}px`,
              '--dy': `${piece.dy}px`,
              '--rot': `${piece.rotation}deg`,
              backgroundColor: GIFT_COLORS[index % GIFT_COLORS.length],
              animationDelay: `${index * 18}ms`,
            } as CSSProperties
          }
        />
      ))}

      <div
        className="quiz-gift-box"
        style={{ '--gift-accent': accent } as CSSProperties}
      >
        <div className="quiz-gift-lid" />
        <div className="quiz-gift-body" />
        <div className="quiz-gift-ribbon" />
        <div className="quiz-gift-bow" />
      </div>

      <span className="quiz-gift-kaboom" style={{ color: accent }}>
        Ka-boom!
      </span>
    </div>
  )
}

function answerText(question: QuizQuestion, answer: QuizAnswer): string {
  if (!isAnswerFilled(question, answer)) return 'Not answered'
  if (isInputQuestion(question)) {
    return typeof answer === 'string' ? answer : 'Not answered'
  }
  return typeof answer === 'number'
    ? (question.options[answer] ?? 'Not answered')
    : 'Not answered'
}

function correctAnswerText(question: QuizQuestion): string {
  if (isInputQuestion(question)) {
    return question.acceptedAnswers[0] ?? 'See explanation'
  }
  return question.options[question.answer] ?? 'See explanation'
}

function QuizReview({
  questions,
  answers,
  score,
}: {
  questions: QuizQuestion[]
  answers: QuizAnswer[]
  score: number
}) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">Review answers</h3>
          <p className="mt-1 text-xs text-zinc-500">
            See your answer and the correct answer for every question.
          </p>
        </div>
        <span className="font-mono text-xs text-zinc-400">
          {score} / {questions.length} correct
        </span>
      </div>

      <ol className="mt-3 space-y-3">
        {questions.map((question, index) => {
          const answer = answers[index]
          const correct = isAnswerCorrect(question, answer)

          return (
            <li
              key={question.id}
              className={cn(
                'rounded-xl border p-4',
                correct
                  ? 'border-emerald-400/20 bg-emerald-400/[0.04]'
                  : 'border-rose-400/20 bg-rose-400/[0.04]',
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                    correct
                      ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                      : 'border-rose-400/40 bg-rose-400/10 text-rose-300',
                  )}
                  aria-hidden="true"
                >
                  {correct ? '✓' : '✕'}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium leading-6 text-zinc-100">
                      <span className="mr-1.5 font-mono text-xs text-zinc-500">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {question.question}
                    </p>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]',
                        correct
                          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                          : 'border-rose-400/30 bg-rose-400/10 text-rose-300',
                      )}
                    >
                      {correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <dl className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                    <div className="rounded-lg border border-white/[0.06] bg-zinc-950/30 px-3 py-2">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                        Your answer
                      </dt>
                      <dd
                        className={cn(
                          'mt-1 font-mono leading-5',
                          correct ? 'text-emerald-200' : 'text-rose-200',
                        )}
                      >
                        {answerText(question, answer)}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-300/70">
                        Correct answer
                      </dt>
                      <dd className="mt-1 font-mono leading-5 text-emerald-200">
                        {correctAnswerText(question)}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-2 text-xs leading-6 text-zinc-400">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function QuizResult({
  passed,
  score,
  total,
  percent,
  accent,
  best,
  onRetry,
}: {
  passed: boolean
  score: number
  total: number
  percent: number
  accent: string
  best: number
  onRetry: () => void
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'quiz-result-pop relative mt-6 overflow-hidden rounded-2xl border p-5 sm:p-6',
        passed ? 'border-emerald-400/30' : 'border-amber-400/30',
      )}
      style={{
        background: passed
          ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.13), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(255, 255, 255, 0.02))',
      }}
    >
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <GiftBurst accent={accent} />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Quiz complete
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-zinc-50">
            {passed ? 'Ka-boom! You passed.' : 'Ka-boom! Quiz finished.'}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            You scored {score} of {total} ({percent}%).
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Quiz score: ${percent}%`}
            >
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700 ease-out',
                  passed && 'lesson-progress-complete',
                )}
                style={{
                  width: `${percent}%`,
                  backgroundColor: passed ? '#34d399' : accent,
                  boxShadow: `0 0 14px ${passed ? '#34d399' : accent}66`,
                }}
              />
            </div>
            <span className="font-mono text-xs text-zinc-300">{percent}%</span>
          </div>

          <p className="mt-3 text-xs leading-5 text-zinc-400">
            {passed
              ? 'This lesson is marked complete.'
              : `You need ${PASS_PERCENT}% to complete this lesson. Review the explanations and try again.`}
          </p>
          {best > 0 && (
            <p className="mt-1 text-xs text-zinc-500">Best score: {best}%</p>
          )}

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            Try again with new questions
          </button>
        </div>
      </div>
    </div>
  )
}

export function Quiz({
  lessonKey,
  questions,
  accent,
  onPass,
  carousel = false,
}: QuizProps) {
  const { recordQuiz, bestScore, isComplete } = useProgress()
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() =>
    carousel ? pickQuizQuestions(questions) : questions,
  )
  const [answers, setAnswers] = useState<QuizAnswer[]>(() =>
    activeQuestions.map(() => null),
  )
  const [submitted, setSubmitted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const displayedQuestions = carousel ? activeQuestions : questions
  const safeIndex =
    displayedQuestions.length === 0
      ? 0
      : Math.min(currentIndex, displayedQuestions.length - 1)
  const currentQuestion = displayedQuestions[safeIndex]
  const allAnswered = displayedQuestions.every((question, index) =>
    isAnswerFilled(question, answers[index]),
  )
  const answeredCount = displayedQuestions.filter((question, index) =>
    isAnswerFilled(question, answers[index]),
  ).length
  const score = displayedQuestions.reduce(
    (total, question, index) =>
      total + (isAnswerCorrect(question, answers[index]) ? 1 : 0),
    0,
  )
  const percent =
    displayedQuestions.length === 0
      ? 0
      : Math.round((score / displayedQuestions.length) * 100)
  const passed = percent >= PASS_PERCENT
  const best = bestScore(lessonKey)
  const alreadyComplete = isComplete(lessonKey)
  const isLast = safeIndex === displayedQuestions.length - 1

  function choose(questionIndex: number, optionIndex: number) {
    if (submitted) return
    setAnswers((current) =>
      current.map((value, index) => (index === questionIndex ? optionIndex : value)),
    )
  }

  function setInputAnswer(questionIndex: number, value: string) {
    if (submitted) return
    setAnswers((current) =>
      current.map((answer, index) => (index === questionIndex ? value : answer)),
    )
  }

  function handleSubmit() {
    if (!allAnswered || submitted) return
    setSubmitted(true)
    if (passed && !alreadyComplete) onPass?.()
    recordQuiz(lessonKey, percent)
  }

  function handleRetry() {
    const nextQuestions = carousel ? pickQuizQuestions(questions) : questions
    setActiveQuestions(nextQuestions)
    setAnswers(nextQuestions.map(() => null))
    setSubmitted(false)
    setCurrentIndex(0)
  }

  function goTo(index: number) {
    setCurrentIndex(Math.max(0, Math.min(displayedQuestions.length - 1, index)))
  }

  function handleNext() {
    if (isLast) {
      handleSubmit()
      return
    }
    goTo(safeIndex + 1)
  }

  function renderQuestion(question: QuizQuestion, questionIndex: number) {
    const answer = answers[questionIndex]
    const correct = submitted && isAnswerCorrect(question, answer)

    return (
      <fieldset
        key={question.id}
        className="rounded-xl border border-white/[0.07] bg-zinc-950/40 p-4 sm:p-5"
      >
        <legend className="px-1 text-sm font-medium leading-6 text-zinc-100">
          <span className="mr-1.5 font-mono text-xs text-zinc-500">
            {String(questionIndex + 1).padStart(2, '0')}
          </span>
          {question.question}
        </legend>

        {isInputQuestion(question) ? (
          <div className="mt-4">
            <label
              htmlFor={`${lessonKey}-${question.id}`}
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500"
            >
              Your answer
            </label>
            <input
              id={`${lessonKey}-${question.id}`}
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              onChange={(event) => setInputAnswer(questionIndex, event.target.value)}
              disabled={submitted}
              placeholder="Type your answer"
              autoComplete="off"
              spellCheck={false}
              className={cn(
                'w-full rounded-lg border bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:ring-2 focus:ring-sky-400/40',
                submitted
                  ? correct
                    ? 'border-emerald-400/40 text-emerald-100'
                    : 'border-rose-400/40 text-rose-100'
                  : 'border-white/10 focus:border-white/25',
              )}
            />
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {question.options.map((option, optionIndex) => {
              const selected = answer === optionIndex
              const optionCorrect = submitted && optionIndex === question.answer
              const optionWrong = submitted && selected && optionIndex !== question.answer

              return (
                <label
                  key={optionIndex}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition focus-within:ring-2 focus-within:ring-sky-400/40',
                    submitted
                      ? 'cursor-default'
                      : 'cursor-pointer hover:border-white/20 hover:bg-white/[0.03]',
                    optionCorrect
                      ? 'border-emerald-400/40 bg-emerald-400/[0.08]'
                      : optionWrong
                        ? 'border-rose-400/40 bg-rose-400/[0.08]'
                        : selected
                          ? 'border-white/25 bg-white/[0.05]'
                          : 'border-white/[0.07]',
                  )}
                >
                  <input
                    type="radio"
                    name={`${lessonKey}-${question.id}`}
                    value={optionIndex}
                    checked={selected}
                    onChange={() => choose(questionIndex, optionIndex)}
                    disabled={submitted}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]',
                      optionCorrect
                        ? 'border-emerald-400/60 bg-emerald-400/20 text-emerald-300'
                        : optionWrong
                          ? 'border-rose-400/60 bg-rose-400/20 text-rose-300'
                          : selected
                            ? 'border-sky-400/60 bg-sky-400/20 text-sky-200'
                            : 'border-white/15 text-zinc-500',
                    )}
                    aria-hidden="true"
                  >
                    {optionCorrect
                      ? '✓'
                      : optionWrong
                        ? '✕'
                        : String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span
                    className={cn(
                      'leading-6',
                      optionCorrect
                        ? 'text-emerald-100'
                        : optionWrong
                          ? 'text-rose-100'
                          : 'text-zinc-300',
                    )}
                  >
                    {option}
                  </span>
                </label>
              )
            })}
          </div>
        )}

        {submitted && (
          <div className="mt-3 border-t border-white/[0.06] pt-3 text-xs leading-6 text-zinc-400">
            {isInputQuestion(question) && !correct && (
              <p className="mb-1 text-zinc-500">
                Accepted answer:{' '}
                <span className="font-mono text-zinc-300">
                  {question.acceptedAnswers[0]}
                </span>
              </p>
            )}
            <p>
              <span className="font-semibold text-zinc-200">
                {correct ? 'Correct. ' : 'Explanation: '}
              </span>
              {question.explanation}
            </p>
          </div>
        )}
      </fieldset>
    )
  }

  const header = (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: accent }} />
        <h2
          id="quiz-heading"
          className="mt-4 text-xl font-semibold tracking-tight text-zinc-50"
        >
          Knowledge check
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {carousel
            ? `${displayedQuestions.length} random questions from a ${questions.length}-question bank`
            : `${displayedQuestions.length} questions`}{' '}
          · score {PASS_PERCENT}% or higher to complete this lesson.
        </p>
        {carousel && (
          <p className="mt-1 text-xs text-zinc-600">
            {questions.some(isInputQuestion)
              ? 'Each attempt mixes short-answer practical questions with multiple-choice questions. A fresh mix is chosen after every retry.'
              : 'A fresh mix is chosen after every retry.'}
          </p>
        )}
      </div>
      {best > 0 && (
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
          Best: {best}%
        </span>
      )}
    </div>
  )

  if (carousel) {
    return (
      <section
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7"
        aria-labelledby="quiz-heading"
      >
        {header}

        {submitted && (
          <QuizResult
            passed={passed}
            score={score}
            total={displayedQuestions.length}
            percent={percent}
            accent={accent}
            best={best}
            onRetry={handleRetry}
          />
        )}

        {submitted ? (
          <QuizReview
            questions={displayedQuestions}
            answers={answers}
            score={score}
          />
        ) : (
          <>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              Question {safeIndex + 1} of {displayedQuestions.length}
            </p>
            <p className="text-[11px] text-zinc-500">
              {answeredCount} of {displayedQuestions.length} answered
            </p>
          </div>

          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={safeIndex + 1}
            aria-valuemin={1}
            aria-valuemax={displayedQuestions.length}
            aria-label={`Quiz question ${safeIndex + 1} of ${displayedQuestions.length}`}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((safeIndex + 1) / displayedQuestions.length) * 100}%`,
                backgroundColor: accent,
              }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Quiz questions">
            {displayedQuestions.map((question, index) => {
              const answer = answers[index]
              const answered = isAnswerFilled(question, answer)
              const current = index === safeIndex
              const correct = submitted && isAnswerCorrect(question, answer)
              const wrong = submitted && answered && !correct

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={current ? 'step' : undefined}
                  aria-label={`Question ${index + 1}${answered ? ', answered' : ', unanswered'}`}
                  className={cn(
                    'flex h-7 min-w-7 items-center justify-center rounded-md border px-2 font-mono text-[10px] transition',
                    current
                      ? 'border-white/30 bg-white/[0.08] text-zinc-100'
                      : 'border-white/[0.08] text-zinc-500 hover:border-white/20 hover:text-zinc-200',
                    correct &&
                      'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
                    wrong && 'border-rose-400/40 bg-rose-400/10 text-rose-300',
                  )}
                >
                  {submitted ? (correct ? '✓' : wrong ? '✕' : index + 1) : answered ? '•' : index + 1}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5">{currentQuestion && renderQuestion(currentQuestion, safeIndex)}</div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <button
            type="button"
            onClick={() => goTo(safeIndex - 1)}
            disabled={safeIndex === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span aria-hidden="true">←</span>
            Previous
          </button>

          <span className="hidden text-[11px] text-zinc-600 sm:block">
            {isLast
              ? allAnswered
                ? 'Ready to check your score?'
                : 'Complete every question to finish'
              : currentQuestion && isInputQuestion(currentQuestion)
                ? 'Type your answer, then continue'
                : 'Pick an answer, then continue'}
          </span>

          {!submitted ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isLast && !allAnswered}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-zinc-500"
            >
              {isLast ? 'Finish quiz' : 'Next question'}
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goTo(safeIndex + 1)}
              disabled={safeIndex === displayedQuestions.length - 1}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          )}
            </div>
          </>
        )}
      </section>
    )
  }

  return (
    <section
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7"
      aria-labelledby="quiz-heading"
    >
      {header}

      <div className="mt-6 space-y-4">
        {displayedQuestions.map((question, questionIndex) =>
          renderQuestion(question, questionIndex),
        )}
      </div>

      {submitted && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'mt-5 rounded-xl border p-4',
            passed
              ? 'border-emerald-400/30 bg-emerald-400/[0.07]'
              : 'border-amber-400/30 bg-amber-400/[0.07]',
          )}
        >
          <p className={cn('text-sm font-semibold', passed ? 'text-emerald-200' : 'text-amber-200')}>
            {passed ? 'Nice work — quiz passed!' : 'Not quite there yet.'}
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            You scored {score} of {displayedQuestions.length} ({percent}%).{' '}
            {passed
              ? alreadyComplete || percent >= PASS_PERCENT
                ? 'This lesson is marked complete.'
                : ''
              : `You need ${PASS_PERCENT}% to complete this lesson. Review the explanations and try again.`}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-zinc-500"
            >
              Check answers
            </button>
            {!allAnswered && (
              <span className="text-xs text-zinc-500">
                Answer every question to check your score.
              </span>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            Try again
          </button>
        )}
      </div>
    </section>
  )
}
