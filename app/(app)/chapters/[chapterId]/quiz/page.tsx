import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getChapterById } from '@/data'
import { QuizRunner } from '@/components/quiz/QuizRunner'

// チャプタークイズ
export default function QuizPage({
  params,
}: {
  params: { chapterId: string }
}) {
  const chapter = getChapterById(params.chapterId)
  if (!chapter) notFound()

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href={`/chapters/${chapter.id}`}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          ← Ch.{chapter.number} {chapter.title} に戻る
        </Link>
        <h1 className="mt-2 text-2xl font-bold">章末クイズ</h1>
        <p className="text-muted-foreground">
          全{chapter.quiz.length}問。7割正解で合格です。
        </p>
      </div>

      <QuizRunner chapterId={chapter.id} questions={chapter.quiz} />
    </section>
  )
}
