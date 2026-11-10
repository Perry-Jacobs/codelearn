import type { Category, Language, Lesson } from '../content/types'

export const CATEGORY_LABELS: Record<Category, string> = {
  programming: 'Programming',
  web: 'Web development',
}

export function lessonKey(languageId: string, lessonId: string): string {
  return `${languageId}/${lessonId}`
}

export interface CourseProgress {
  completed: number
  total: number
  percent: number
}

export function courseProgress(
  language: Language,
  completed: Set<string>,
): CourseProgress {
  const total = language.lessons.length
  const done = language.lessons.filter((lesson) =>
    completed.has(lessonKey(language.id, lesson.id)),
  ).length

  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}

export function nextLesson(
  language: Language,
  completed: Set<string>,
): Lesson | null {
  return (
    language.lessons.find(
      (lesson) => !completed.has(lessonKey(language.id, lesson.id)),
    ) ?? null
  )
}

export function courseMinutes(language: Language): number {
  return language.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)
}

export function courseQuizCount(language: Language): number {
  return language.lessons.reduce((sum, lesson) => sum + lesson.quiz.length, 0)
}

export function overallProgress(
  languages: Language[],
  completed: Set<string>,
): CourseProgress {
  const total = languages.reduce((sum, language) => sum + language.lessons.length, 0)
  const done = languages.reduce(
    (sum, language) => sum + courseProgress(language, completed).completed,
    0,
  )

  return {
    completed: done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  }
}

export interface ResumeCourse {
  language: Language
  lesson: Lesson
  progress: CourseProgress
}

/** The next lesson in the first course that has been started but not finished. */
export function firstIncompleteCourse(
  languages: Language[],
  completed: Set<string>,
): ResumeCourse | null {
  for (const language of languages) {
    const progress = courseProgress(language, completed)
    if (progress.completed > 0 && progress.completed < progress.total) {
      const lesson = nextLesson(language, completed)
      if (lesson) return { language, lesson, progress }
    }
  }

  return null
}
