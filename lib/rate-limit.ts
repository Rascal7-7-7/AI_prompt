// 簡易レート制限（インメモリ・固定ウィンドウ）。
// 単一インスタンス前提の軽量実装。大規模運用では upstash 等に置換する。
const hits = new Map<string, number[]>()

/**
 * key 単位でレート制限を判定する。
 * @returns true = 許可、false = 上限超過
 */
export function rateLimit(key: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}
