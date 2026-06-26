import type { Chapter } from '@/types/chapter'

// 注: image_sample ブロックは public/images/samples に実画像を置く Phase 6 で追加する。
// 現状は text / prompt / compare で構成し、ページが壊れないようにする。
export const chapter05: Chapter = {
  id: 'chapter-05',
  number: 5,
  title: '画像・動画生成',
  description: '画像・動画生成AIへのプロンプトの書き方（被写体・スタイル・構図・品質語）を学ぶ。',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  lessons: [
    {
      id: 'lesson-05-01',
      title: '画像プロンプトの構成要素',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            '画像生成プロンプトは、要素を並べるほど意図が伝わります。基本の並び：\n\n被写体（何が）＋ 動作/状態 ＋ 環境/背景 ＋ 構図/アングル ＋ ライティング ＋ スタイル ＋ 品質語。\n\n例：「a red fox, sitting on a snowy rock, forest background, low angle, soft morning light, watercolor style, highly detailed」',
        },
        {
          type: 'prompt',
          label: '画像プロンプト テンプレート',
          content:
            '{被写体}, {動作・状態}, {背景・環境}, {構図・アングル}, {ライティング}, {スタイル}, {品質語}',
          copiable: true,
        },
        {
          type: 'fill_blank',
          sentence:
            '画像生成で「水彩風」「写実的」などの絵柄を指定する要素を ___ と呼ぶ。',
          blank: '___',
          choices: ['スタイル', 'トークン', 'マイグレーション', 'エンドポイント'],
          answer: 'スタイル',
        },
      ],
    },
    {
      id: 'lesson-05-02',
      title: 'ネガティブプロンプトと反復',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            '多くの画像生成ツールには「出したくない要素」を指定するネガティブプロンプトがあります（例：blurry, extra fingers, text）。\n\n一発で理想は出ません。1要素ずつ変えて比較する反復が基本です。被写体は固定し、スタイルだけ変える等、変数を1つに絞ると学びが速くなります。',
        },
        {
          type: 'before_after',
          before: 'かっこいい車の画像',
          after:
            'a sports car, parked on a wet city street at night, three-quarter front view, neon reflections, cinematic lighting, photorealistic, high detail / Negative: blurry, low quality, distorted wheels',
          explanation:
            'Before は曖昧で結果がブレます。After は被写体・環境・構図・光・スタイル・品質語を並べ、ネガティブで不要素を除外しています。',
        },
      ],
    },
    {
      id: 'lesson-05-03',
      title: '動画生成プロンプトの考え方',
      estimatedMinutes: 10,
      blocks: [
        {
          type: 'text',
          content:
            '動画生成では静止画の要素に加えて「動き」と「カメラワーク」を指定します。例：被写体の動作（歩く・振り向く）、カメラ（パン・ズームイン・固定）、時間感（slow motion など）。\n\n長尺は破綻しやすいため、短いカットを積み重ねる発想が安全です。',
        },
        {
          type: 'prompt',
          label: '動画プロンプトの例',
          content:
            'a paper plane flying over a desk, slow camera pan from left to right, soft daylight, shallow depth of field, 4s clip, smooth motion',
          copiable: true,
        },
      ],
    },
  ],
  quiz: [
    {
      id: 'quiz-05-01',
      question: '画像生成プロンプトの構成要素として一般的でないものは？',
      choices: ['データベースの正規化', '被写体', '構図・アングル', 'ライティング'],
      answer: 'データベースの正規化',
      explanation:
        '被写体・構図・光・スタイル等が画像プロンプトの要素。DB正規化は無関係です。',
    },
    {
      id: 'quiz-05-02',
      question: 'ネガティブプロンプトの役割は？',
      choices: [
        '出したくない要素を指定して除外する',
        '画像の解像度を無限にする',
        '生成を高速化する専用APIキー',
        '動画の音声を生成する',
      ],
      answer: '出したくない要素を指定して除外する',
      explanation:
        'blurry や extra fingers など、避けたい要素を指定して品質を整えます。',
    },
    {
      id: 'quiz-05-03',
      question: '動画生成で静止画に加えて重要になる指定は？',
      choices: [
        '動きとカメラワーク',
        'SQLのインデックス',
        'HTTPステータスコード',
        '正規表現',
      ],
      answer: '動きとカメラワーク',
      explanation:
        '被写体の動作やカメラ（パン/ズーム）、時間感を指定します。長尺は破綻しやすく短いカット推奨です。',
    },
  ],
}
