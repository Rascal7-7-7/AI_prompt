# CLAUDE.md — PromptLab

プロンプトエンジニアリング学習アプリ。**ルールの正本は [AGENTS.md](./AGENTS.md)**、設計は [設計書.md](./設計書.md)。
制作者は専門学校生 → 変更理由・確認方法・注意点を丁寧に説明する。

## スタック
Next.js 14 (App Router) / TypeScript / Tailwind / shadcn/ui / Prisma / Neon (PostgreSQL) / Anthropic SDK / Vercel

## 作業時に呼ぶ Skill（タスク別）

| やること | 使う Skill |
|---|---|
| 画面・コンポーネント実装（App Router/TS/Tailwind/shadcn） | `/dev-nextjs-frontend` |
| React/Next のパフォーマンス・実装レビュー | `/react-best-practices` |
| API Route・サーバー側ロジック | `/dev-fastapi-backend`（設計思想流用）・`/backend-patterns` |
| Prisma スキーマ・クエリ・索引 | `/postgres-patterns` |
| マイグレーション設計（実行は手動） | `/database-migrations` |
| 認証・入力処理・APIキー・/api/chat | `/security-review` |
| 実装後の共通レビュー | `/dev-core-review` |
| UI のデザイン品質 | `/frontend-design` |
| アクセシビリティ監査 | `/accessibility` |
| Vercel デプロイ（依頼時のみ） | `/vercel:deploy` |

## 自動ガード（.claude/settings.json の PreToolUse フック）
`.claude/hooks/guard-promptlab.py` が以下を**自動ブロック**する（AGENTS.md のハードルール強制）:
- Bash: `prisma migrate` / `git commit` / `git push` / `vercel deploy`
- Write/Edit: `.env.local` / `prisma/migrations/**` / `.gitignore`

解除・確認は `/hooks` メニューから。

## 確認コマンド
`npm run dev` / `npm run build` / `npx tsc --noEmit` / `npm run lint` / `npx prisma studio`
