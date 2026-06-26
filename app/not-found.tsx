import Link from 'next/link'

// グローバル 404 ページ
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">ページが見つかりませんでした。</p>
      <Link
        href="/"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        ホームへ戻る
      </Link>
    </main>
  )
}
