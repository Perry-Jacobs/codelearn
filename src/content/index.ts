import type { Language, Section } from './types'
import { html } from './languages/html'
import { htmlQuizExtras } from './languages/html-quiz-extras'
import { htmlQuizBank } from './languages/html-quiz-bank'
import { htmlQuizPractical } from './languages/html-quiz-practical'
import { htmlPractice } from './languages/html-practice'
import { htmlCodeChallenges } from './languages/html-code-challenges'
import { css } from './languages/css'
import { cssExtraConcepts } from './languages/css-extra-concepts'
import { cssPractice } from './languages/css-practice'
import { cssCodeChallenges } from './languages/css-code-challenges'
import { cssQuizBank } from './languages/css-quiz-bank'
import { javascript } from './languages/javascript'

type PracticeMap = Record<string, { afterConcept: number; section: Section }>
type ChallengeMap = Record<string, Section[]>
type ConceptMap = Record<string, Section[]>

function withExtraConcepts(
  sections: Section[],
  lessonId: string,
  conceptMap: ConceptMap,
): Section[] {
  const extras = conceptMap[lessonId]
  if (!extras?.length) return sections

  const lastConceptIndex = sections.reduce<number>(
    (last, section, index) => (section.type === 'concept' ? index : last),
    -1,
  )

  if (lastConceptIndex === -1) return [...sections, ...extras]

  return [
    ...sections.slice(0, lastConceptIndex + 1),
    ...extras,
    ...sections.slice(lastConceptIndex + 1),
  ]
}

function withPracticeSection(
  sections: Section[],
  lessonId: string,
  practiceMap: PracticeMap,
): Section[] {
  const practice = practiceMap[lessonId]
  if (!practice) return sections

  const result: Section[] = []
  let conceptCount = 0

  for (const section of sections) {
    result.push(section)
    if (section.type === 'concept') {
      conceptCount += 1
      if (conceptCount === practice.afterConcept) {
        result.push(practice.section)
      }
    }
  }

  return result
}

function withCodeChallenges(
  sections: Section[],
  lessonId: string,
  challengeMap: ChallengeMap,
): Section[] {
  const challenges = challengeMap[lessonId]
  if (!challenges?.length) return sections

  const lastConceptIndex = sections.reduce<number>(
    (last, section, index) => (section.type === 'concept' ? index : last),
    -1,
  )

  if (lastConceptIndex === -1) return [...sections, ...challenges]

  return [
    ...sections.slice(0, lastConceptIndex + 1),
    ...challenges,
    ...sections.slice(lastConceptIndex + 1),
  ]
}

const htmlWithExtraQuiz: Language = {
  ...html,
  lessons: html.lessons.map((lesson) => ({
    ...lesson,
    sections: withCodeChallenges(
      withPracticeSection(lesson.sections, lesson.id, htmlPractice),
      lesson.id,
      htmlCodeChallenges,
    ),
    quiz: [
      ...lesson.quiz,
      ...(htmlQuizExtras[lesson.id] ?? []),
      ...(htmlQuizBank[lesson.id] ?? []),
      ...(htmlQuizPractical[lesson.id] ?? []),
    ],
  })),
}

const cssWithExtras: Language = {
  ...css,
  lessons: css.lessons.map((lesson) => ({
    ...lesson,
    sections: withCodeChallenges(
      withPracticeSection(
        withExtraConcepts(lesson.sections, lesson.id, cssExtraConcepts),
        lesson.id,
        cssPractice,
      ),
      lesson.id,
      cssCodeChallenges,
    ),
    quiz: [...lesson.quiz, ...(cssQuizBank[lesson.id] ?? [])],
  })),
}

export const languages: Language[] = [htmlWithExtraQuiz, cssWithExtras, javascript]

export function getLanguage(id: string | undefined): Language | undefined {
  return languages.find((language) => language.id === id)
}

export function getLesson(language: Language, lessonId: string | undefined) {
  return language.lessons.find((lesson) => lesson.id === lessonId)
}

export const totalLessons = languages.reduce(
  (sum, language) => sum + language.lessons.length,
  0,
)

export const totalQuizQuestions = languages.reduce(
  (sum, language) =>
    sum + language.lessons.reduce((count, lesson) => count + lesson.quiz.length, 0),
  0,
)
