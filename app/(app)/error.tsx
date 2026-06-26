'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

// メインアプリ共通のエラーバウンダリ
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app error]', error)
  }, [error])

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-lg font-bold">エラーが発生しました</h2>
      <p className="text-sm text-muted-foreground">
        一時的な問題の可能性があります。再試行してください。
      </p>
      <Button onClick={reset}>再試行</Button>
    </div>
  )
}
