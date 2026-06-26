import type { QuizGradeResult } from '@/types/quiz'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuizResultProps {
  result: QuizGradeResult
}

// クイズ結果表示
export function QuizResult({ result }: QuizResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          結果: {result.score} / {result.total}（{result.passed ? '合格' : '不合格'}）
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {result.results.map((r) => (
          <div key={r.questionId} className="rounded-md border p-3 text-sm">
            <p className={r.correct ? 'text-primary' : 'text-destructive'}>
              {r.correct ? '○ 正解' : '× 不正解'}
            </p>
            <p className="mt-1 text-muted-foreground">{r.explanation}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
