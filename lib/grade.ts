import type { QuizQuestion } from '@/types/chapter'
import type { QuizGradeResult } from '@/types/quiz'

// 合格率（設計書 §2: score/total >= 0.7 で合格）
export const DEFAULT_PASS_RATE = 0.7

// クイズ採点の純関数（クライアント・サーバー両方で使う）。
// answers は questionId → 回答 のマップ。
export function gradeQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string | undefined>,
  passRate: number = DEFAULT_PASS_RATE
): QuizGradeResult {
  const results = questions.map((q) => ({
    questionId: q.id,
    correct: answers[q.id] === q.answer,
    explanation: q.explanation,
  }))
  const score = results.filter((r) => r.correct).length
  const total = questions.length
  return {
    score,
    total,
    passed: total > 0 && score / total >= passRate,
    results,
  }
}
