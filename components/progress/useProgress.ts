'use client'

import { useEffect, useState } from 'react'
import { getSessionId } from '@/lib/session'
import type { ProgressSummary } from '@/types/progress'

// 進捗を取得する共有フック。完了集合とクイズスコアを返す。
// DB 未接続でも例外を投げず空で返す（学習は継続可能）。
export function useProgress() {
  const [data, setData] = useState<ProgressSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const sessionId = getSessionId()
    if (!sessionId) {
      setLoading(false)
      return
    }
    fetch(`/api/progress?sessionId=${encodeURIComponent(sessionId)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: ProgressSummary) => setData(d))
      .catch(() => {
        /* DB 未接続などは無視 */
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    completed: new Set(data?.completed ?? []),
    quizScores: data?.quizScores ?? {},
    loading,
  }
}
