// 匿名セッションID（ログイン不要）。ブラウザの localStorage に保持する。
// サーバー側では空文字を返す（呼び出しはクライアントから行う想定）。
const STORAGE_KEY = 'promptlab_session_id'

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = window.localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    window.localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}
