import type { QuizQuestion } from '@/types/chapter'

/** クライアントが送信する1問分の回答 */
export interface QuizAnswer {
  questionId: string
  answer: string
}

/** 採点後の1問分の結果 */
export interface QuizQuestionResult {
  questionId: string
  correct: boolean
  explanation: string
}

/** /api/quiz のレスポンス */
export interface QuizGradeResult {
  score: number
  total: number
  passed: boolean
  results: QuizQuestionResult[]
}

export type { QuizQuestion }
