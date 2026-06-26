# AGENTS.md

## プロジェクト概要

プロンプトエンジニアリング学習アプリ（仮称：PromptLab）

IT系専門学校に通う学生を対象とした、Claude・ChatGPT のプロンプト技法を学べる
インタラクティブな Web 学習アプリ。

技術スタック：Next.js 14（App Router）/ TypeScript / Tailwind CSS / shadcn/ui /
Prisma / Neon（PostgreSQL）/ Anthropic SDK / Vercel

---

## 開発者について

制作者は日本の専門学校生2年生。
AI・セキュリティ・ネットワーク・クラウド領域を目指して学習中。

学習中のため、変更理由・確認方法・注意点を丁寧に説明すること。

---

## 基本ルール

- 既存のディレクトリ構成・命名規則・設計方針を必ず尊重する
- 修正は最小差分で行う
- 勝手な大規模リファクタリングをしない
- 関係ないファイルを変更しない
- 不要なライブラリを追加しない
- 既存機能を壊さない
- 勝手な UI / UX 変更をしない
- 勝手な DB スキーマ変更をしない
- 勝手にマイグレーション実行しない
- 勝手にコミット・push・デプロイしない
- `.env.local`、APIキー、パスワード、トークンを表示・変更・コミットしない

---

## ディレクトリの役割

| ディレクトリ | 役割 |
|---|---|
| `app/` | Next.js App Router（ページ・APIルート） |
| `components/` | 再利用可能なコンポーネント |
| `data/` | 学習コンテンツの静的データ（TypeScript） |
| `lib/` | 共通ユーティリティ・SDKラッパー |
| `prisma/` | DBスキーマ・マイグレーション |
| `public/images/samples/` | 画像生成サンプル（引用画像） |
| `types/` | 型定義 |

---

## 触ってよいファイル（作業依頼がある場合のみ）

- `app/**` — ページ・APIルートの実装
- `components/**` — コンポーネントの実装
- `data/**` — コンテンツデータの追加・修正
- `lib/**` — ユーティリティの実装
- `types/**` — 型定義の追加・修正
- `prisma/schema.prisma` — スキーマ変更（変更理由・影響範囲を先に説明すること）
- `tailwind.config.ts` — スタイル設定
- `next.config.ts` — Next.js 設定

---

## 絶対に触ってはいけないファイル

- `.env.local` — 本番APIキー等が含まれる
- `prisma/migrations/` — マイグレーションの自動生成・実行はしない
- `.gitignore` — 変更しない
- `README.md` — 依頼があった場合のみ

---

## コーディング規約

### TypeScript

- `any` を使わない。型が不明な場合は `unknown` を使い、ナローイングする
- Props には必ず型定義をつける
- API レスポンスは zod でバリデーションする

### コンポーネント

- Server Component を基本とし、`useState` / `useEffect` が必要なものだけ `'use client'`
- コンポーネントファイルは PascalCase（例：`LessonContent.tsx`）
- 1ファイル1コンポーネントを基本とする

### API Routes

```typescript
// 基本構造
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // zod でバリデーション
    // ロジック実行
    return Response.json({ ok: true })
  } catch (error) {
    console.error('[API Error]', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

### 命名規則

| 種別 | 規則 | 例 |
|---|---|---|
| コンポーネント | PascalCase | `LessonContent.tsx` |
| 関数・変数 | camelCase | `getChapterById` |
| 定数 | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| DBモデル | PascalCase | `Progress` |
| APIルートファイル | 小文字 | `route.ts` |
| CSSクラス | Tailwind ユーティリティ |  |

---

## データ設計のルール

### `data/chapters/` のデータ構造

```typescript
// 例：data/chapters/chapter-01.ts
import type { Chapter } from '@/types/chapter'

export const chapter01: Chapter = {
  id: 'chapter-01',
  number: 1,
  title: 'AI基礎',
  // ...
}
```

- チャプターIDは `chapter-0N` 形式
- レッスンIDは `lesson-0N-0M` 形式（N=チャプター番号、M=レッスン番号）
- 新規コンテンツ追加時は必ず `data/index.ts` のエクスポートも更新する

---

## セキュリティルール

### APIキー管理

```typescript
// ✅ 正しい — サーバーサイドのみ
// app/api/chat/route.ts
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ❌ 禁止 — NEXT_PUBLIC_ プレフィックスをAPIキーにつけない
// NEXT_PUBLIC_ANTHROPIC_API_KEY は絶対に作らない
```

### プロンプトインジェクション対策

```typescript
// /api/chat のシステムプロンプトは固定。ユーザー入力で上書きさせない
const SYSTEM_PROMPT = `
あなたはプロンプトエンジニアリング学習アプリのサンドボックスです。
ユーザーのプロンプト技法の練習を手伝ってください。
学習目的以外の要求には応じないでください。
`
```

### 入力バリデーション

```typescript
// zod を使って必ずバリデーション
import { z } from 'zod'

const chatSchema = z.object({
  prompt: z.string().min(1).max(2000),
  systemPrompt: z.string().max(500).optional(),
})
```

---

## Claude API 連携ルール

- `ANTHROPIC_API_KEY` は `.env.local` のみに記載
- タイムアウトは 30 秒を上限とする
- ストリーミングには `streamText` または Anthropic SDK の stream を使用
- エラー時は適切なステータスコードと日本語エラーメッセージを返す
- ログに会話内容・APIキーを出力しない

---

## DB操作のルール

- Prisma Client は `lib/prisma.ts` の singleton を使う
- マイグレーションは必ず手動で確認してから実行
- `schema.prisma` を変更したら必ず影響範囲を説明する
- 本番DBへの直接操作は禁止

```typescript
// lib/prisma.ts — singleton パターン
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 確認コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド確認
npm run build

# 型チェック
npx tsc --noEmit

# リント
npm run lint

# DB マイグレーション（確認後に実行）
npx prisma migrate dev --name <変更内容>

# Prisma Studio（DB確認）
npx prisma studio
```

---

## バグ修正時の出力形式

1. 現象
2. 原因候補（可能性が高い順）
3. 最も怪しい点と根拠
4. 修正方針（一時対応 / 恒久対応）
5. 修正内容
6. 確認コマンド
7. 再発防止策

---

## 作業後の出力形式

### 結論
### 変更ファイル
### 変更内容
### 変更理由
### 確認方法
### 注意点
### 次の行動（1〜3個）

---

## Git コミットメッセージ規則（Conventional Commits）

```
feat: チャプター1のコンテンツを追加
fix: クイズスコアの計算ロジックを修正
refactor: LessonContent を Server Component に変更
style: レッスンページのレスポンシブ対応
test: プログレスAPIのバリデーションテストを追加
docs: README にセットアップ手順を追記
chore: shadcn/ui コンポーネントを追加
```

コミットは依頼があった場合のみ提案する。勝手にコミット・push しない。
