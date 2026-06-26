import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'

// サイドバー込みのメインアプリレイアウト
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        本文へスキップ
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main id="main" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
