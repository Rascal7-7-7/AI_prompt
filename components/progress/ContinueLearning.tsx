'use client'

import Link from 'next/link'
import { chapters } from '@/data'
import { useProgress } from './useProgress'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 「続きから」= 全チャプターを通して最初の未完了レッスンへ誘導する。
export function ContinueLearning() {
  const { completed, loading } = useProgress()
  if (loading) return null

  let target: { chapterNumber: number; chapterId: string; lessonId: string; title: string } | null =
    null
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find((l) => !completed.has(`${chapter.id}/${l.id}`))
    if (lesson) {
      target = {
        chapterNumber: chapter.number,
        chapterId: chapter.id,
        lessonId: lesson.id,
        title: lesson.title,
      }
      break
    }
  }

  if (!target) {
    return (
      <Card className="border-green-600/40 bg-green-50">
        <CardContent className="p-4 text-center text-green-700">
          🎉 全レッスン完了！おつかれさまでした。
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-primary/5">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div>
          <p className="text-xs text-muted-foreground">続きから</p>
          <p className="font-medium">
            Ch.{target.chapterNumber} {target.title}
          </p>
        </div>
        <Button asChild>
          <Link href={`/chapters/${target.chapterId}/lessons/${target.lessonId}`}>
            学習を続ける →
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
