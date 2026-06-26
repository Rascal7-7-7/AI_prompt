/** チャプター単位のクイズスコア */
export interface QuizScoreSummary {
  score: number
  total: number
  passed: boolean
}

/** /api/progress GET のレスポンス */
export interface ProgressSummary {
  /** 完了済みの識別子。例: "chapter-01" / "chapter-01/lesson-01-01" */
  completed: string[]
  /** チャプターIDごとのクイズスコア */
  quizScores: Record<string, QuizScoreSummary>
}

/** /api/progress POST のリクエスト */
export interface ProgressUpdateInput {
  sessionId: string
  chapterId: string
  lessonId?: string
  completed: boolean
}
