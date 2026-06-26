import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getChapterById } from '@/data'
import { LessonList } from '@/components/lesson/LessonList'

export function generateMetadata({
  params,
}: {
  params: { chapterId: string }
}): Metadata {
  const chapter = getChapterById(params.chapterId)
  if (!chapter) notFound()
  return { title: `Ch.${chapter.number} ${chapter.title}`, description: chapter.description }
}

// チャプター詳細（レッスン一覧）
export default function ChapterDetailPage({
  params,
}: {
  params: { chapterId: string }
}) {
  const chapter = getChapterById(params.chapterId)
  if (!chapter) notFound()

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Ch.{chapter.number} {chapter.title}
        </h1>
        <p className="text-muted-foreground">{chapter.description}</p>
      </div>

      <LessonList chapterId={chapter.id} lessons={chapter.lessons} />

      <Link
        href={`/chapters/${chapter.id}/quiz`}
        className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        章末クイズへ →
      </Link>
    </section>
  )
}
