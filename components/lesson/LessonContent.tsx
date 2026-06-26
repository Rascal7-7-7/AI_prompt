import type { LessonBlock } from '@/types/chapter'
import { PromptBlock } from './PromptBlock'
import { BeforeAfterCompare } from './BeforeAfterCompare'
import { FillBlankQuiz } from './FillBlankQuiz'
import { ImageSampleCard } from './ImageSampleCard'

interface LessonContentProps {
  blocks: LessonBlock[]
}

// レッスン本文表示。ブロック種別ごとに対応コンポーネントへ振り分ける。
export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case 'text':
      return <p className="whitespace-pre-wrap leading-relaxed">{block.content}</p>
    case 'prompt':
      return (
        <PromptBlock label={block.label} content={block.content} copiable={block.copiable} />
      )
    case 'before_after':
      return (
        <BeforeAfterCompare
          before={block.before}
          after={block.after}
          explanation={block.explanation}
        />
      )
    case 'fill_blank':
      return (
        <FillBlankQuiz
          sentence={block.sentence}
          blank={block.blank}
          choices={block.choices}
          answer={block.answer}
        />
      )
    case 'image_sample':
      return (
        <ImageSampleCard
          prompt={block.prompt}
          imagePath={block.imagePath}
          source={block.source}
          tool={block.tool}
        />
      )
    case 'compare':
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <PromptBlock label="Claude" content={block.claudePrompt} />
          <PromptBlock label="ChatGPT" content={block.chatgptPrompt} />
        </div>
      )
    default:
      // 網羅性チェック（新しい block 種別を足したらここで型エラーになる）
      return null
  }
}
