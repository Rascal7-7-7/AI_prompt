import type { Metadata } from 'next'
import './globals.css'

const SITE_NAME = 'PromptLab'
const SITE_DESC = 'Claude・ChatGPT のプロンプト技法をインタラクティブに学べる学習アプリ'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: `${SITE_NAME} — プロンプトエンジニアリング学習アプリ`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESC,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESC,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
