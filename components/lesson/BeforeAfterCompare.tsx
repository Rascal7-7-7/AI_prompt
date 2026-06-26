interface BeforeAfterCompareProps {
  before: string
  after: string
  explanation: string
}

// Before/After 比較UI
export function BeforeAfterCompare({ before, after, explanation }: BeforeAfterCompareProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4">
          <p className="mb-2 text-xs font-semibold text-destructive">Before</p>
          <p className="whitespace-pre-wrap text-sm">{before}</p>
        </div>
        <div className="rounded-md border border-primary/40 bg-primary/5 p-4">
          <p className="mb-2 text-xs font-semibold text-primary">After</p>
          <p className="whitespace-pre-wrap text-sm">{after}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{explanation}</p>
    </div>
  )
}
