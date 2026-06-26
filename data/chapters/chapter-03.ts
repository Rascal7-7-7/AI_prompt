import type { Chapter } from '@/types/chapter'

export const chapter03: Chapter = {
  id: 'chapter-03',
  number: 3,
  title: 'Claude活用',
  description: 'Claude の特性（長文・XMLタグ・丁寧な指示追従）を活かしたプロンプト技法を学ぶ。',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  lessons: [
    {
      id: 'lesson-03-01',
      title: 'XMLタグで構造を伝える',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'Claude は入力を構造化して渡すと指示追従が安定します。特に XML 風のタグで「どこが資料で、どこが指示か」を区切る方法が有効です。\n\n例：<document> に対象テキスト、<instructions> に指示、を分けて入れると、混同が起きにくくなります。',
        },
        {
          type: 'prompt',
          label: 'XMLタグ構造の例',
          content:
            '<document>\n（ここに要約したい記事を貼る）\n</document>\n\n<instructions>\n上の document を、専門学校生向けに3行で要約してください。\n専門用語には括弧で短い注釈を付けてください。\n</instructions>',
          copiable: true,
        },
        {
          type: 'fill_blank',
          sentence:
            'Claude では資料と指示を ___ 風のタグで区切ると指示追従が安定しやすい。',
          blank: '___',
          choices: ['XML', 'CSV', 'YAML', 'SQL'],
          answer: 'XML',
        },
      ],
    },
    {
      id: 'lesson-03-02',
      title: 'システムプロンプトで役割を固定する',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'Claude API では「システムプロンプト」で全体の役割・方針を固定できます。会話のたびに役割を書き直さなくてよくなり、一貫性が保てます。\n\nこのアプリのサンドボックスも、サーバー側でシステムプロンプトを固定し、ユーザー入力で上書きできないようにしています（安全対策）。',
        },
        {
          type: 'prompt',
          label: 'システムプロンプトの例',
          content:
            'あなたはコードレビューに特化したアシスタントです。\n- 指摘は重大度（CRITICAL/HIGH/MEDIUM/LOW）を付ける\n- 修正案は最小差分で示す\n- 根拠を1行添える\n- 雑談には応じない',
          copiable: true,
        },
      ],
    },
    {
      id: 'lesson-03-03',
      title: '長文を扱う・出力をコントロールする',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            'Claude は長いコンテキストを扱えますが、要点を冒頭/末尾に置く・出力形式を明示する、といった基本は変わりません。\n\n「先に結論」「表で」「最大200字」など出力の制約を具体的に与えると、後工程（コピペ・自動処理）が楽になります。',
        },
        {
          type: 'before_after',
          before: 'このログから問題点を教えて。',
          after:
            '次のログを分析し、結論を先に1文で述べた後、原因候補を可能性の高い順に3つ、各40字以内で挙げてください。最後に確認コマンドを1つ示してください。',
          explanation:
            '結論先出し・件数・字数・締めの要素を指定すると、調査結果がそのまま使える形で返ります。',
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'quiz-03-01',
      question: 'Claude に資料と指示を渡すとき有効とされる構造化方法は？',
      choices: [
        'XML風タグで資料と指示を区切る',
        'すべて1行に詰める',
        'ランダムな順で混ぜる',
        '絵文字だけで指示する',
      ],
      answer: 'XML風タグで資料と指示を区切る',
      explanation:
        '<document> と <instructions> のようにタグで役割を分けると混同が減り、指示追従が安定します。',
    },
    {
      id: 'quiz-03-02',
      question: 'システムプロンプトの主な役割は？',
      choices: [
        '会話全体の役割や方針を固定して一貫性を保つ',
        'モデルを再学習させる',
        '画像を生成する',
        'APIキーを暗号化する',
      ],
      answer: '会話全体の役割や方針を固定して一貫性を保つ',
      explanation:
        'システムプロンプトは全体の前提を固定します。安全のためユーザー入力で上書きさせない設計が望ましいです。',
    },
    {
      id: 'quiz-03-03',
      question: '出力を後工程で使いやすくする指定として適切でないものは？',
      choices: [
        '形式や字数を一切指定しない',
        '結論を先に書かせる',
        '表形式で出させる',
        '最大文字数を指定する',
      ],
      answer: '形式や字数を一切指定しない',
      explanation:
        '形式・字数・順序を明示するほど、コピペや自動処理がしやすくなります。',
    },
  ],
}
