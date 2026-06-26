'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { chapters } from '@/data'
import { useProgress } from '@/components/progress/useProgress'
import { DIFFICULTY_LABEL, DIFFICULTY_CLASS } from '@/lib/difficulty'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/layout/ProgressBar'

// チャプターカード一覧（進捗付き）。完了率バーと章完了✓を表示。
export function ChapterProgressGrid() {
  const { completed } = useProgress()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chapters.map((chapter) => {
        const total = chapter.lessons.length
        const doneCount = chapter.lessons.filter((l) =>
          completed.has(`${chapter.id}/${l.id}`)
        ).length
        const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0
        const chapterDone = completed.has(chapter.id) // クイズ合格による章完了フラグ

        return (
          <Link key={chapter.id} href={`/chapters/${chapter.id}`}>
            <Card className="h-full transition-colors hover:bg-accent">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Ch.{chapter.number}
                  </span>
                  <div className="flex items-center gap-2">
                    {chapterDone && (
                      <Check className="h-4 w-4 text-green-600" aria-label="クイズ合格済み" />
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_CLASS[chapter.difficulty]}`}
                    >
                      {DIFFICULTY_LABEL[chapter.difficulty]}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg">{chapter.title}</CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
                <ProgressBar value={pct} />
                <p className="text-xs text-muted-foreground">
                  レッスン {doneCount}/{total} ・ 約{chapter.estimatedMinutes}分
                </p>
              </CardHeader>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
