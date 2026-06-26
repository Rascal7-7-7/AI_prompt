'use client'

import { useState } from 'react'
import type { QuizQuestion as QuizQuestionType } from '@/types/chapter'
import type { QuizGradeResult } from '@/types/quiz'
import { QuizQuestion } from './QuizQuestion'
import { QuizResult } from './QuizResult'
import { Button } from '@/components/ui/button'
import { getSessionId } from '@/lib/session'
import { gradeQuiz, DEFAULT_PASS_RATE } from '@/lib/grade'

interface QuizRunnerProps {
  chapterId: string
  questions: QuizQuestionType[]
  /** 合格率（既定 0.7）。設計書 §2 の passed 判定に合わせる。 */
  passRate?: number
}

// チャプタークイズの進行・採点（クライアント採点）。
// 「間違えた問題だけ復習」に対応するため、出題中の問題集合を activeQuestions で管理する。
export function QuizRunner({ chapterId, questions, passRate = DEFAULT_PASS_RATE }: QuizRunnerProps) {
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestionType[]>(questions)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizGradeResult | null>(null)

  if (questions.length === 0) {
    return <p className="text-muted-foreground">このチャプターにはまだクイズがありません。</p>
  }

  // 全問対象のときだけ採点結果を保存・章完了判定する（復習サブセットは保存しない）。
  const isFullSet = activeQuestions.length === questions.length
  const allAnswered = activeQuestions.every((q) => answers[q.id] != null)

  function select(questionId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  function grade() {
    const graded = gradeQuiz(activeQuestions, answers, passRate)
    setResult(graded)

    if (!isFullSet) return // 復習モードは保存しない

    const sessionId = getSessionId()
    void fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        chapterId,
        answers: activeQuestions.map((q) => ({ questionId: q.id, answer: answers[q.id] })),
      }),
    }).catch(() => {})

    if (graded.passed) {
      void fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, chapterId, completed: true }),
      }).catch(() => {})
    }
  }

  // 全問を最初からやり直す
  function restartAll() {
    setActiveQuestions(questions)
    setAnswers({})
    setResult(null)
  }

  // 間違えた問題だけで再挑戦
  function reviewWrong() {
    if (!result) return
    const wrongIds = new Set(result.results.filter((r) => !r.correct).map((r) => r.questionId))
    const wrong = activeQuestions.filter((q) => wrongIds.has(q.id))
    setActiveQuestions(wrong)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    const wrongCount = result.results.filter((r) => !r.correct).length
    return (
      <div className="space-y-4">
        {result.passed && isFullSet && (
          <div className="rounded-md border border-green-600/40 bg-green-50 p-4 text-center">
            <p className="text-lg font-bold text-green-700">🎉 合格！このチャプターを完了しました</p>
            <p className="text-sm text-green-700/80">進捗ページに反映されます。</p>
          </div>
        )}
        {!isFullSet && (
          <p className="text-sm text-muted-foreground">復習モードの結果です（記録はされません）。</p>
        )}
        <QuizResult result={result} />
        <div className="flex flex-wrap gap-2">
          {wrongCount > 0 && (
            <Button onClick={reviewWrong}>間違えた{wrongCount}問を復習する</Button>
          )}
          <Button variant="outline" onClick={restartAll}>
            最初からやり直す
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {!isFullSet && (
        <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
          復習モード：間違えた{activeQuestions.length}問だけ出題しています。
        </p>
      )}
      {activeQuestions.map((q, i) => (
        <div key={q.id} className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            第{i + 1}問 / {activeQuestions.length}
          </p>
          <QuizQuestion
            question={q}
            selected={answers[q.id] ?? null}
            onSelect={(answer) => select(q.id, answer)}
          />
        </div>
      ))}
      <Button onClick={grade} disabled={!allAnswered}>
        {allAnswered ? '採点する' : 'すべての問題に回答してください'}
      </Button>
    </div>
  )
}
