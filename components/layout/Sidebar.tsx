import Link from 'next/link'
import { NAV_ITEMS } from './navItems'

// チャプターナビゲーション（デスクトップ用サイドバー。モバイルは Header のナビを使用）
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-card p-4 md:block">
      <Link href="/" className="mb-6 block text-lg font-bold">
        PromptLab
      </Link>
      <nav aria-label="メインナビゲーション">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
