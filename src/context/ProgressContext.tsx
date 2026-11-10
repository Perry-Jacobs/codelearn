import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  PASS_PERCENT,
  ProgressContext,
  type ProgressContextValue,
  type ProgressState,
} from './progress'

const STORAGE_KEY = 'codelearn:progress:v1'

const emptyState: ProgressState = { completed: [], bestScores: {} }

function loadProgress(): ProgressState {
  if (typeof window === 'undefined') return emptyState

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return emptyState

    const record = parsed as Partial<ProgressState>
    const completed = Array.isArray(record.completed)
      ? record.completed.filter((item): item is string => typeof item === 'string')
      : []

    const bestScores: Record<string, number> = {}
    if (typeof record.bestScores === 'object' && record.bestScores !== null) {
      for (const [key, value] of Object.entries(record.bestScores)) {
        if (typeof value === 'number' && Number.isFinite(value)) {
          bestScores[key] = value
        }
      }
    }

    return { completed, bestScores }
  } catch {
    return emptyState
  }
}

function persistProgress(state: ProgressState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be unavailable (private mode, quota). Progress still works
    // for the current session.
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadProgress)

  useEffect(() => {
    persistProgress(state)
  }, [state])

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return
      setState(loadProgress())
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const completedSet = useMemo(() => new Set(state.completed), [state.completed])

  const isComplete = useCallback(
    (key: string) => completedSet.has(key),
    [completedSet],
  )

  const bestScore = useCallback(
    (key: string) => state.bestScores[key] ?? 0,
    [state.bestScores],
  )

  const recordQuiz = useCallback((key: string, percent: number) => {
    setState((current) => {
      const rounded = Math.max(0, Math.min(100, Math.round(percent)))
      const previousBest = current.bestScores[key] ?? 0
      const bestScores =
        rounded > previousBest
          ? { ...current.bestScores, [key]: rounded }
          : current.bestScores

      const shouldComplete = rounded >= PASS_PERCENT
      const completed =
        shouldComplete && !current.completed.includes(key)
          ? [...current.completed, key]
          : current.completed

      if (completed === current.completed && bestScores === current.bestScores) {
        return current
      }

      const next = { completed, bestScores }
      // Save immediately so a quiz result is not lost if the tab is closed
      // right after submitting.
      persistProgress(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const next = { completed: [], bestScores: {} }
    persistProgress(next)
    setState(next)
  }, [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      completed: completedSet,
      completedCount: completedSet.size,
      hasProgress:
        completedSet.size > 0 || Object.keys(state.bestScores).length > 0,
      isComplete,
      bestScore,
      recordQuiz,
      resetProgress,
    }),
    [
      completedSet,
      state.bestScores,
      isComplete,
      bestScore,
      recordQuiz,
      resetProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
