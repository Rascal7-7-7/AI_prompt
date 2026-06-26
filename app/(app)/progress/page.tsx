'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { chapters } from '@/data'
import { getSessionId } from '@/lib/session'
import type { ProgressSummary } from '@/types/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/layout/ProgressBar'

// 進捗確認。/api/progress から取得して表示。DB 未接続時はその旨を表示。
export default function ProgressPage() {
  const [summary, setSummary] = useState<ProgressSummary | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    const sessionId = getSessionId()
    if (!sessionId) return
    fetch(`/api/progress?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: ProgressSummary) => {
        setSummary(data)
        setState('ok')
      })
      .catch(() => setState('error'))
  }, [])

  const completedSet = new Set(summary?.completed ?? [])
  // 章完了（クイズ合格）数＝completed に chapterId 単体で含まれる数
  const clearedChapters = chapters.filter((c) => completedSet.has(c.id)).length
  const allCleared = clearedChapters === chapters.length

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">進捗</h1>
        <p className="text-muted-foreground">完了したレッスンとクイズスコアを確認できます。</p>
      </div>

      {state === 'ok' && (
        <Card className={allCleared ? 'border-green-600/40 bg-green-50' : undefined}>
          <CardContent className="flex items-center gap-4 p-4">
            <span className="text-4xl" aria-hidden>
              {allCleared ? '🏆' : '🎯'}
            </span>
            <div>
              <p className="font-bold">
                {allCleared
                  ? '全チャプター制覇！修了おめでとうございます'
                  : `チャプター制覇 ${clearedChapters} / ${chapters.length}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {allCleared
                  ? 'すべての章末クイズに合格しました。'
                  : '章末クイズに合格するとバッジが進みます。'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {state === 'loading' && <p className="text-muted-foreground">読み込み中...</p>}
      {state === 'error' && (
        <p className="rounded-md border p-3 text-sm text-muted-foreground">
          進捗を取得できませんでした。データベース接続後に表示されます。
        </p>
      )}

      {state === 'ok' &&
        chapters.map((chapter) => {
          const total = chapter.lessons.length
          const doneCount = chapter.lessons.filter((l) =>
            completedSet.has(`${chapter.id}/${l.id}`)
          ).length
          const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0
          const score = summary?.quizScores[chapter.id]

          return (
            <Card key={chapter.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <Link href={`/chapters/${chapter.id}`} className="hover:underline">
                    Ch.{chapter.number} {chapter.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ProgressBar value={pct} />
                <p className="text-xs text-muted-foreground">
                  レッスン {doneCount}/{total} 完了
                  {score
                    ? ` ・ クイズ ${score.score}/${score.total}（${score.passed ? '合格' : '未合格'}）`
                    : ' ・ クイズ未受験'}
                </p>
              </CardContent>
            </Card>
          )
        })}
    </section>
  )
}
