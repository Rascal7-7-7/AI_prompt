# loop.md — Claude 自立作業ガイド（PromptLab）

このファイルは **Claude Code が自分で読んで、完成まで自走するための手順書**。
1イテレーション = このファイルを読む → 「次にやること」を1つ選ぶ → 実装 → 検証 → 進捗更新 → 繰り返し。

正本ドキュメント:
- ルール: [AGENTS.md](./AGENTS.md)（**最優先・違反禁止**）
- 設計: [設計書.md](./設計書.md)
- skill/コマンド早見: [CLAUDE.md](./CLAUDE.md)

---

## 0. 毎イテレーションの動き方（ループ本体）

```
1. このファイルの「進捗トラッカー」を見る
2. 未完([ ])の最上段タスクを1つ選ぶ
3. 該当 Skill を呼ぶ（下表）→ TDD で実装（テスト先・RED→GREEN→REFACTOR）
4. 検証コマンドを実行（tsc / lint / test / build）。緑になるまで直す
5. /code-review で自己レビュー → CRITICAL/HIGH を直す
6. 進捗トラッカーの [ ] を [x] にする（このファイルを編集）
7. 区切りごとにメモリ更新。次イテレーションへ
```

**止まる条件（勝手に進めず人間に聞く）:**
- DB マイグレーション実行が必要になった時 → 提案だけして**止まる**
- `.env.local` の値が必要な時 → 何を入れるべきか伝えて**止まる**
- コミット / push / デプロイ → 依頼があるまで**やらない**
- 設計書と矛盾する判断が要る時 → 質問する

---

## 1. ハードルール（AGENTS.md 抜粋・自動強制あり）

`.claude/hooks/guard-promptlab.py` が以下を**自動ブロック**する。弾かれたら人間に回す:
- Bash: `prisma migrate` / `git commit` / `git push` / `vercel deploy`
- Write/Edit: `.env.local` / `prisma/migrations/**` / `.gitignore`

その他:
- `any` 禁止（`unknown` + ナローイング）。Props に型必須。API は zod で検証
- Server Component 基本、`useState/useEffect` 要る時だけ `'use client'`
- APIキーはサーバーのみ。`NEXT_PUBLIC_` をキーに付けない
- Prisma Client は `lib/prisma.ts` の singleton を使う
- 最小差分。無関係ファイル・不要ライブラリを足さない
- 1ファイル1コンポーネント、PascalCase

---

## 2. Skill / コマンド早見（タスク別）

| タスク | Skill / コマンド |
|---|---|
| 画面・コンポーネント実装 | `/dev-nextjs-frontend` |
| React/Next パフォーマンス | `/react-best-practices` |
| API Route・サーバーロジック | `/backend-patterns` |
| Prisma スキーマ・クエリ | `/postgres-patterns` |
| マイグレーション設計（実行はしない） | `/database-migrations` |
| セキュリティ（/api/chat・入力検証・キー） | `/security-review` |
| 実装後の共通レビュー | `/dev-core-review` |
| 差分のバグ/簡素化レビュー | `/code-review` |
| UI デザイン品質 | `/frontend-design` |
| アクセシビリティ | `/accessibility` |
| アプリを起動して動作確認 | `/run` / `/verify` |
| Vercel デプロイ（依頼時のみ） | `/vercel:deploy` |

**Skill の呼び方:** プロンプト内で `/skill名` を書く、または Skill ツールで起動。
**サブエージェント:** 独立調査・並列作業は `Agent`（例: `Explore` で構造調査、`code-reviewer` でレビュー）に投げてメインの文脈を汚さない。

**便利コマンド:**
- `/run` — アプリ起動して変更を実機確認
- `/verify` — 修正が実際に動くか検証
- `/code-review [--fix]` — 差分レビュー（--fix で適用）
- `/simplify` — 簡素化のみ
- `/loop <interval> <cmd>` — 定期実行（このファイルを回す用途にも）

---

## 3. 完成までの道のり（進捗トラッカー）

設計書 §9 のフェーズ準拠。**上から順に。各 [ ] が1イテレーション目安。**

### Phase 1：基盤構築
- [x] Next.js プロジェクト雛形（scaffold 済み）
- [x] Tailwind / shadcn/ui セットアップ（button/card 配置済み）
- [x] Prisma schema 定義（`prisma/schema.prisma`）
- [x] `.claude` フック / CLAUDE.md / loop.md 整備
- [x] `npm install` 実行して依存解決（427 packages）
- [x] `npx prisma generate` で Prisma Client 生成 → `npx tsc --noEmit` 緑（progress/route.ts の null 複合キー型エラーを find→update/create で修正）
- [x] `npm run dev` 起動確認（/, /chapters, /sandbox すべて 200）
- [ ] **【人間待ち】** Neon 接続: `.env.local` に DATABASE_URL 設定 → `npx prisma migrate dev --name init`（Claude は実行しない。Phase 2 はDB不要なので並行で進める）

### Phase 2：コンテンツ基盤
- [x] `data/chapters/chapter-01.ts` に実コンテンツ（3レッスン + クイズ4問、tsc緑）
- [x] 残り chapter-02〜07 のコンテンツ投入（各3レッスン+クイズ、tsc+lint緑。index.ts は既存エクスポートで対応済み）
- [x] トップ `/` 静的サマリー（章/レッスン/クイズ数・総時間・難易度バッジ）追加。進捗実値は Phase 5
- [x] `/chapters` 一覧・`/chapters/[id]` 詳細 表示確認（実コンテンツ描画OK・200）
- [x] レッスンページ静的表示確認（LessonContent 各ブロック描画OK・実テキスト確認）

### Phase 3：インタラクティブ機能
- [x] 穴埋め `FillBlankQuiz` 動作（構築済み・レッスンページで描画確認）
- [x] `BeforeAfterCompare` 表示（構築済み・描画確認）
- [x] `PromptBlock` コピー動作（構築済み・clipboard）
- [x] チャプタークイズ画面 `/chapters/[id]/quiz`（`QuizRunner` 新規作成→`QuizQuestion`/`QuizResult` 結線、クライアント採点・7割合格、200確認）

### Phase 4：AI連携 →【方針変更】APIキー不使用＝静的サンプル学習モードに転換
- [x] サンドボックス `/sandbox` を静的「お手本集」に書き換え（`data/samples.ts` の模範プロンプト+出力例。PromptBlock でコピー可。APIキー不要・コスト0・プリレンダ）
- [x] 比較 `/compare` を静的「事例集」に書き換え（同一プロンプトの Claude風/ChatGPT風 出力例 + 違い解説）
- [x] キー依存ファイル削除（`/api/chat` `/api/compare` `lib/claude.ts` `SandboxClient/Input/Output` `CompareClient` + `@anthropic-ai/sdk` 依存）。`/api/chat`→404 確認
- 備考: 将来キーを使う方針に変えるなら git 履歴から復元 or 再実装可能

### Phase 5：進捗管理
- [x] セッション管理（`lib/session.ts`＝localStorage 匿名 UUID）
- [x] `/api/progress` 結線（`LessonCompleteButton` で完了保存・既存状態取得。no-session→400/DB未接続→500 確認、UI graceful）
- [x] `/api/quiz` 結線（`QuizRunner` から採点後に fire-and-forget 保存）
- [x] 進捗ページ `/progress`（章別 ProgressBar + クイズスコア。DB未接続時は案内表示、200確認）
- [x] **DB 反映完了**（2026-06-26）: `mv .env.local .env` → `migrate dev --name init` 成功。ライブ検証OK = 進捗保存→永続化→再取得、クイズ サーバー採点+保存、すべて 200 で動作確認済み

### Phase 6：仕上げ
- [x] 全7チャプターのコンテンツ（Phase 2 で実コンテンツ投入済み）
- [ ] **【人間/Pixa待ち】** 画像サンプル配置（`public/images/samples/ch05-*`）→ 配置後 chapter-05 に image_sample ブロック追加
- [x] レスポンシブ / a11y 基本対応（モバイルナビ追加=小画面の遷移穴を修正、textarea に aria-label、nav に aria-label、html lang=ja）
- [x] `npm run build` 緑（13ルート、本番ビルド成功）
- [ ] **【依頼時】** デプロイ `/vercel:deploy`（要 Vercel 連携・環境変数設定）

---

## 3b. 改善ロードマップ（設計書スコープ達成後の品質向上）

ユーザー選択: 達成ループ強化 / テスト追加 / 復習・バッジ等モチベ / 仕上げ(UI/a11y/SEO)。**ダークモードは無し**。

### Phase 7：達成ループ強化
- [x] 進捗フック `components/progress/useProgress.ts`（完了集合+スコア取得・graceful）
- [x] レッスン一覧に完了✓ + 「次に学ぶ」強調（`LessonList`、chapter 詳細に結線）
- [x] レッスン間ナビ（前へ/次へ、最終レッスン→章末クイズ、レッスン n/N 表示）
- [x] クイズ合格→チャプター完了フラグ保存（lessonId 無し）+ 🎉お祝い表示。tsc/lint/build緑・永続化確認
- [x] トップ `/` に「続きから」導線（`ContinueLearning`）+ 章カードに完了率（`ChapterProgressGrid`：ProgressBar・章完了✓・難易度）
- [x] `/chapters` も `ChapterProgressGrid` に統一（完了率表示）。`lib/difficulty.ts` 共有化。tsc/lint/build緑

### Phase 8：テスト（testing.md = 80%目標）
- [x] テスト基盤導入（Vitest + @testing-library/react + jsdom。`vitest.config.ts`/`vitest.setup.ts`、`test`/`test:run` スクリプト）
- [x] 採点ロジック抽出+テスト（`lib/grade.ts` の `gradeQuiz` を QuizRunner/api/quiz で共用。全問/不合格/境界7割/未回答/空 を網羅）
- [x] progress 集計のテスト（`lib/progress-format.ts` 抽出→ completed 整形・quizScores 最新採用）
- [x] コンポーネント描画テスト（FillBlankQuiz 正誤/未選択）。**12テスト全pass・tsc/lint/build緑**

### Phase 9：復習・モチベ
- [x] 間違えた問題の再出題（QuizRunner 復習モード=間違いサブセット再挑戦。復習結果は保存しない）
- [x] 修了バッジ（進捗ページに章制覇 N/7・全章で🏆。トップは ContinueLearning が全完了で🎉）
- [~] 用語集/チートシート（任意・今回スキップ）

### Phase 10：仕上げ（UI/a11y/SEO）
- [x] `not-found`（404）/ `(app)/loading`（スピナー）/ `(app)/error`（再試行）UI 追加
- [x] a11y: skip link（本文へスキップ）追加、main id、既存 aria-label/lang と合わせ基本対応
- [x] OGP/メタデータ拡充（root に openGraph/twitter/metadataBase/title template、チャプター・レッスンに generateMetadata）
- [x] レート制限（`lib/rate-limit.ts` 固定ウィンドウ）→ `/api/progress`・`/api/quiz` POST に適用（超過429）。tsc/12テスト/lint/build緑

---

## 4. 検証コマンド（実装ごとに回す）

```bash
npx tsc --noEmit     # 型
npm run lint         # lint
npm run dev          # 起動（/run skill 推奨）
npm run build        # 本番ビルド（Phase 6）
npx prisma studio    # DB 中身確認（migrate 後）
```

Definition of Done（1タスク）: 型緑 + lint緑 + 該当画面/APIが動く + `/code-review` で CRITICAL/HIGH なし。

---

## 5. 進捗の記録

- 区切りごとに上の `[ ]→[x]` を更新（このファイルが唯一の進捗ソース）
- 重要な決定はメモリへ: `/claude-mem:do record "<内容>"`
- 詰まったら原因候補を列挙して人間に質問（AGENTS.md「バグ修正時の出力形式」準拠）
