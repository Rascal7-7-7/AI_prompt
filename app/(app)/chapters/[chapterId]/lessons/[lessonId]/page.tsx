import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getChapterById, getLessonById } from '@/data'
import { LessonContent } from '@/components/lesson/LessonContent'
import { LessonCompleteButton } from '@/components/lesson/LessonCompleteButton'

export function generateMetadata({
  params,
}: {
  params: { chapterId: string; lessonId: string }
}): Metadata {
  const lesson = getLessonById(params.chapterId, params.lessonId)
  if (!lesson) notFound()
  return { title: lesson.title }
}

// 個別レッスン
export default function LessonPage({
  params,
}: {
  params: { chapterId: string; lessonId: string }
}) {
  const chapter = getChapterById(params.chapterId)
  const lesson = getLessonById(params.chapterId, params.lessonId)
  if (!chapter || !lesson) notFound()

  // チャプター内の前後レッスン。最後のレッスンの「次へ」は章末クイズへ誘導。
  const index = chapter.lessons.findIndex((l) => l.id === lesson.id)
  const prev = index > 0 ? chapter.lessons[index - 1] : null
  const next = index < chapter.lessons.length - 1 ? chapter.lessons[index + 1] : null
  const isLast = index === chapter.lessons.length - 1

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header>
        <Link
          href={`/chapters/${chapter.id}`}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Ch.{chapter.number} {chapter.title}
        </Link>
        <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
        <p className="text-xs text-muted-foreground">
          レッスン {index + 1} / {chapter.lessons.length}
        </p>
      </header>

      <LessonContent blocks={lesson.blocks} />

      <footer className="space-y-4 border-t pt-6">
        <LessonCompleteButton chapterId={chapter.id} lessonId={lesson.id} />

        <nav className="flex items-center justify-between text-sm" aria-label="レッスン移動">
          {prev ? (
            <Link
              href={`/chapters/${chapter.id}/lessons/${prev.id}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/chapters/${chapter.id}/lessons/${next.id}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {next.title} →
            </Link>
          ) : isLast ? (
            <Link
              href={`/chapters/${chapter.id}/quiz`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              章末クイズへ →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </footer>
    </article>
  )
}
