'use client'

import Link from 'next/link'
import { Check, Circle } from 'lucide-react'
import type { Lesson } from '@/types/chapter'
import { useProgress } from '@/components/progress/useProgress'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface LessonListProps {
  chapterId: string
  lessons: Lesson[]
}

// チャプター詳細のレッスン一覧。完了済みは✓、最初の未完了を「次に学ぶ」として強調。
export function LessonList({ chapterId, lessons }: LessonListProps) {
  const { completed } = useProgress()

  const firstIncomplete = lessons.find((l) => !completed.has(`${chapterId}/${l.id}`))

  return (
    <ul className="space-y-3">
      {lessons.map((lesson) => {
        const done = completed.has(`${chapterId}/${lesson.id}`)
        const isNext = !done && lesson.id === firstIncomplete?.id
        return (
          <li key={lesson.id}>
            <Link href={`/chapters/${chapterId}/lessons/${lesson.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 py-4">
                  {done ? (
                    <Check className="h-5 w-5 shrink-0 text-green-600" aria-label="完了済み" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" aria-hidden />
                  )}
                  <CardTitle className="text-base font-medium">{lesson.title}</CardTitle>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {isNext ? '次に学ぶ →' : `${lesson.estimatedMinutes}分`}
                  </span>
                </CardHeader>
              </Card>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
