export interface PracticeBlank {
  id: string
  answers: string[]
  hint?: string
  /** Require the full tag, including its angle brackets. */
  strict?: boolean
}

export type PracticeSection = {
  type: 'practice'
  title: string
  instructions: string
  template: string
  blanks: PracticeBlank[]
  explanation?: string
  hint?: string
}

export type CodeChallengeCheck =
  | {
      kind: 'element'
      selector: string
      text?: string
      attributes?: Record<string, string>
      message: string
    }
  | {
      kind: 'doctype'
      name: string
      message: string
    }
  | {
      kind: 'source'
      patterns?: string[]
      notPatterns?: string[]
      message: string
    }

export type CodeChallengeSection = {
  type: 'code-challenge'
  title: string
  instructions: string
  prompt: string
  starterCode: string
  language: 'html'
  solution: string
  hint?: string
  checks: CodeChallengeCheck[]
}

export type Section =
  | { type: 'text'; content: string }
  | {
      type: 'code'
      language: string
      code: string
      caption?: string
      /** Override the default live-preview behaviour (HTML snippets preview by default). */
      preview?: boolean
    }
  | { type: 'list'; items: string[]; title?: string }
  | {
      type: 'callout'
      tone: 'tip' | 'note' | 'warning'
      title: string
      content: string
    }
  | {
      type: 'concept'
      title: string
      content: string
      code?: string
      language?: string
      caption?: string
      preview?: boolean
    }
  | PracticeSection
  | CodeChallengeSection

export interface ChoiceQuizQuestion {
  id: string
  type?: 'choice'
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface InputQuizQuestion {
  id: string
  type: 'input'
  question: string
  acceptedAnswers: string[]
  explanation: string
}

export type QuizQuestion = ChoiceQuizQuestion | InputQuizQuestion

export interface Lesson {
  id: string
  title: string
  summary: string
  minutes: number
  objectives: string[]
  sections: Section[]
  takeaways: string[]
  quiz: QuizQuestion[]
}

export type Category = 'programming' | 'web'

export interface Language {
  id: string
  name: string
  monogram: string
  category: Category
  tagline: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  accent: string
  /** Show a “Coming soon” card and hide the course from progress totals. */
  comingSoon?: boolean
  lessons: Lesson[]
}
