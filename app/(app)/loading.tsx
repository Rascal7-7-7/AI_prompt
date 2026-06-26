// メインアプリ共通のローディング表示
export default function Loading() {
  return (
    <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
      読み込み中...
    </div>
  )
}
