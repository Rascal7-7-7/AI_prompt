'use client'

import type { QuizQuestion as QuizQuestionType } from '@/types/chapter'
import { Button } from '@/components/ui/button'

interface QuizQuestionProps {
  question: QuizQuestionType
  /** 現在の選択。未回答は null */
  selected: string | null
  onSelect: (answer: string) => void
}

// クイズ問題（1問分）
export function QuizQuestion({ question, selected, onSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-3">
      <p className="font-medium">{question.question}</p>
      <div className="flex flex-col gap-2">
        {question.choices.map((choice) => (
          <Button
            key={choice}
            variant={selected === choice ? 'default' : 'outline'}
            className="justify-start"
            onClick={() => onSelect(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>
    </div>
  )
}
