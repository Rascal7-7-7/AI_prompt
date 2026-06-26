'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { getSessionId } from '@/lib/session'
import { Button } from '@/components/ui/button'

interface LessonCompleteButtonProps {
  chapterId: string
  lessonId: string
}

// レッスン完了を /api/progress に保存する。DB 未接続時は静かに失敗扱い。
export function LessonCompleteButton({ chapterId, lessonId }: LessonCompleteButtonProps) {
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // マウント時に既存の完了状態を取得
  useEffect(() => {
    const sessionId = getSessionId()
    if (!sessionId) return
    fetch(`/api/progress?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { completed?: string[] } | null) => {
        if (data?.completed?.includes(`${chapterId}/${lessonId}`)) setDone(true)
      })
      .catch(() => {
        /* DB 未接続などは無視（学習は継続可能） */
      })
  }, [chapterId, lessonId])

  async function markComplete() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          chapterId,
          lessonId,
          completed: true,
        }),
      })
      if (!res.ok) {
        setError('保存できませんでした（DB未接続の可能性）。')
        return
      }
      setDone(true)
    } catch {
      setError('保存に失敗しました。')
    } finally {
      setSaving(false)
    }
  }

  if (done) {
    return (
      <p className="inline-flex items-center gap-1 text-sm font-medium text-green-700">
        <Check className="h-4 w-4" /> 完了済み
      </p>
    )
  }

  return (
    <div className="space-y-1">
      <Button onClick={markComplete} disabled={saving}>
        {saving ? '保存中...' : 'このレッスンを完了にする'}
      </Button>
      {error && <p className="text-xs text-muted-foreground">{error}</p>}
    </div>
  )
}
