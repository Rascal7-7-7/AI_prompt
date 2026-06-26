import { ChapterProgressGrid } from '@/components/chapter/ChapterProgressGrid'

// チャプター一覧（進捗付き）
export default function ChaptersPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">チャプター一覧</h1>
      <ChapterProgressGrid />
    </section>
  )
}
