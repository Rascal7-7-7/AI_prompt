'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FillBlankQuizProps {
  sentence: string
  /** sentence 内の空欄プレースホルダ（例: "___"） */
  blank: string
  choices: string[]
  answer: string
}

// 穴埋め問題（クライアント完結・APIコール不要）
export function FillBlankQuiz({ sentence, blank, choices, answer }: FillBlankQuizProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const isCorrect = selected === answer
  const filled = selected ? sentence.replace(blank, selected) : sentence

  return (
    <div className="space-y-4 rounded-md border p-4">
      <p className="whitespace-pre-wrap text-sm">{filled}</p>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <Button
            key={choice}
            variant={selected === choice ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelected(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>
      {selected && (
        <p className={cn('text-sm font-medium', isCorrect ? 'text-primary' : 'text-destructive')}>
          {isCorrect ? '正解！' : `不正解。正解は「${answer}」`}
        </p>
      )}
    </div>
  )
}
