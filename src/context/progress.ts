import { createContext, useContext } from 'react'

/** A quiz attempt at or above this percentage marks the lesson complete. */
export const PASS_PERCENT = 60

export interface ProgressState {
  completed: string[]
  bestScores: Record<string, number>
}

export interface ProgressContextValue {
  completed: Set<string>
  completedCount: number
  hasProgress: boolean
  isComplete: (key: string) => boolean
  bestScore: (key: string) => number
  recordQuiz: (key: string, percent: number) => void
  resetProgress: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used inside a ProgressProvider')
  }
  return context
}
