import Link from 'next/link'
import { NAV_ITEMS } from './navItems'

// アプリ共通ヘッダー。モバイル（サイドバー非表示時）はここにナビを出す。
export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="flex h-14 items-center justify-between px-6">
        <Link href="/" className="text-sm font-bold md:hidden">
          PromptLab
        </Link>
        <span className="hidden text-sm font-medium text-muted-foreground md:inline">
          プロンプトエンジニアリング学習アプリ
        </span>
      </div>
      {/* モバイル用ナビ（md 以上ではサイドバーを使うため非表示） */}
      <nav aria-label="モバイルナビゲーション" className="md:hidden">
        <ul className="flex gap-1 overflow-x-auto border-t px-4 py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
