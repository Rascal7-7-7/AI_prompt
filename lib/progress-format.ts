import type { ProgressSummary } from '@/types/progress'

interface ProgressRow {
  chapterId: string
  lessonId: string | null
}

interface QuizRow {
  chapterId: string
  score: number
  total: number
  passed: boolean
}

// 完了行を識別子配列へ整形。lessonId 有り→"chapter/lesson"、無し→"chapter"（章完了）。
export function formatCompleted(rows: ProgressRow[]): string[] {
  return rows.map((p) => (p.lessonId ? `${p.chapterId}/${p.lessonId}` : p.chapterId))
}

// チャプターごとに最新のクイズスコアを採用する。
// rows は createdAt 降順（最新が先頭）で渡す前提。
export function formatQuizScores(rows: QuizRow[]): ProgressSummary['quizScores'] {
  const out: ProgressSummary['quizScores'] = {}
  for (const r of rows) {
    if (!out[r.chapterId]) {
      out[r.chapterId] = { score: r.score, total: r.total, passed: r.passed }
    }
  }
  return out
}
