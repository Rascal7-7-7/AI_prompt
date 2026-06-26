import { chapters } from '@/data'
import { ContinueLearning } from '@/components/progress/ContinueLearning'
import { ChapterProgressGrid } from '@/components/chapter/ChapterProgressGrid'
import { Card, CardHeader } from '@/components/ui/card'

// トップ（続きから誘導 + 静的サマリー + 進捗付きチャプター一覧）
export default function HomePage() {
  const totalLessons = chapters.reduce((sum, c) => sum + c.lessons.length, 0)
  const totalMinutes = chapters.reduce((sum, c) => sum + c.estimatedMinutes, 0)
  const totalQuiz = chapters.reduce((sum, c) => sum + c.quiz.length, 0)

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">PromptLab</h1>
        <p className="text-muted-foreground">プロンプトエンジニアリングを、手を動かして学ぼう。</p>
      </div>

      <ContinueLearning />

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryStat label="チャプター" value={`${chapters.length}`} />
        <SummaryStat label="レッスン" value={`${totalLessons}`} />
        <SummaryStat label="クイズ問題" value={`${totalQuiz}`} />
        <SummaryStat label="想定学習時間" value={`約${totalMinutes}分`} />
      </dl>

      <div>
        <h2 className="mb-4 text-xl font-semibold">チャプター</h2>
        <ChapterProgressGrid />
      </div>
    </section>
  )
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <dd className="text-2xl font-bold">{value}</dd>
        <dt className="text-xs text-muted-foreground">{label}</dt>
      </CardHeader>
    </Card>
  )
}
