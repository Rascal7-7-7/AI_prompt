import type { Chapter } from '@/types/chapter'

export const chapter06: Chapter = {
  id: 'chapter-06',
  number: 6,
  title: '設定ドキュメント',
  description: 'システムプロンプトや AGENTS.md / CLAUDE.md など、AIの振る舞いを固定する設定ファイルの設計を学ぶ。',
  difficulty: 'advanced',
  estimatedMinutes: 30,
  lessons: [
    {
      id: 'lesson-06-01',
      title: '設定ドキュメントとは',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'AIツールには、毎回の指示とは別に「常に守らせたいルール」を書く設定ファイルがあります。Claude Code の CLAUDE.md / AGENTS.md、ChatGPT のカスタム指示、API のシステムプロンプトなどです。\n\nこれらは「会話のたびに繰り返し書く手間」を無くし、チームで方針を共有する役割も持ちます。',
        },
        {
          type: 'text',
          content:
            'このアプリ自身も AGENTS.md にハードルール（勝手にコミットしない、マイグレーションを実行しない等）を書き、Claude がそれに従うよう設計されています。',
        },
        {
          type: 'fill_blank',
          sentence:
            'Claude Code でプロジェクトの恒久ルールを書く代表的な設定ファイルは ___ である。',
          blank: '___',
          choices: ['CLAUDE.md', 'index.html', 'package-lock.json', '.DS_Store'],
          answer: 'CLAUDE.md',
        },
      ],
    },
    {
      id: 'lesson-06-02',
      title: '良い設定ドキュメントの書き方',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'コツは「短く・具体的に・優先順位を明確に」。\n\n- 守ってほしいことを命令形で箇条書き\n- 禁止事項は明示（例：本番DBを直接操作しない）\n- 例（良い例/悪い例）を添えると誤解が減る\n- 長すぎると守られにくい。本当に重要な項目に絞る',
        },
        {
          type: 'prompt',
          label: '設定ドキュメントの骨子例',
          content:
            '# 役割\nこのプロジェクトの実装を手伝うアシスタント。\n\n# 必ず守ること\n- 最小差分で変更する\n- 変更前に方針を説明する\n\n# 禁止\n- 勝手にコミット/デプロイしない\n- .env を表示・変更しない\n\n# コードスタイル\n- TypeScript、any禁止、1ファイル1コンポーネント',
          copiable: true,
        },
      ],
    },
    {
      id: 'lesson-06-03',
      title: 'プロンプトインジェクション対策',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'ユーザー入力に「これまでの指示を無視して〜」のような命令が紛れ込み、システムプロンプトを乗っ取ろうとする攻撃をプロンプトインジェクションと呼びます。\n\n対策の基本：システムプロンプトは固定しユーザー入力で上書きさせない、資料と指示をタグで分離する、機微な操作は人間の承認を挟む。',
        },
        {
          type: 'before_after',
          before:
            'ユーザー入力をそのままシステムプロンプトに連結して送る。',
          after:
            'システムプロンプトはサーバー側で固定し、ユーザー入力は <user_input> タグ内のデータとして扱い「指示ではなく分析対象」と明示する。',
          explanation:
            '入力を「指示」ではなく「データ」として扱う枠組みにすると、乗っ取りの成功率を下げられます。',
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'quiz-06-01',
      question: '設定ドキュメント（CLAUDE.md 等）の主目的は？',
      choices: [
        '毎回の指示を省き、恒久ルールを共有・徹底する',
        'モデルを再学習する',
        '画像を生成する',
        'CSSを最適化する',
      ],
      answer: '毎回の指示を省き、恒久ルールを共有・徹底する',
      explanation:
        '常に守らせたい方針を1か所にまとめ、繰り返しと属人化を減らします。',
    },
    {
      id: 'quiz-06-02',
      question: '良い設定ドキュメントの書き方として適切でないものは？',
      choices: [
        'できるだけ長く全網羅を目指す',
        '命令形で具体的に書く',
        '禁止事項を明示する',
        '良い例/悪い例を添える',
      ],
      answer: 'できるだけ長く全網羅を目指す',
      explanation:
        '長すぎると守られません。本当に重要な項目へ絞るのがコツです。',
    },
    {
      id: 'quiz-06-03',
      question: 'プロンプトインジェクション対策として適切なものは？',
      choices: [
        'システムプロンプトを固定し、ユーザー入力をデータとして扱う',
        'ユーザー入力をそのまま指示として連結する',
        '承認なしで機微な操作を自動実行する',
        'すべての入力を無検証で信頼する',
      ],
      answer: 'システムプロンプトを固定し、ユーザー入力をデータとして扱う',
      explanation:
        '入力を「指示」ではなく「分析対象データ」として隔離し、機微操作は人間承認を挟みます。',
    },
  ],
}
