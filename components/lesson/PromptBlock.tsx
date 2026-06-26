'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PromptBlockProps {
  label: string
  content: string
  copiable?: boolean
}

// コピー可能なプロンプトブロック
export function PromptBlock({ label, content, copiable = true }: PromptBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error('[PromptBlock] コピー失敗', error)
    }
  }

  return (
    <div className="rounded-md border bg-muted/50">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {copiable && (
          <Button variant="ghost" size="sm" onClick={handleCopy} aria-label="プロンプトをコピー">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code>{content}</code>
      </pre>
    </div>
  )
}
