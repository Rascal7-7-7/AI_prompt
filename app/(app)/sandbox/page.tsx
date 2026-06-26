import { sandboxSamples } from '@/data/samples'
import { PromptBlock } from '@/components/lesson/PromptBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// サンドボックス（静的サンプル学習モード）。
// API キー不使用方針のため実APIは叩かず、模範的なプロンプトと出力例を提示する。
export default function SandboxPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">サンドボックス（お手本集）</h1>
        <p className="text-muted-foreground">
          良いプロンプトの「型」と、その出力例を見て学びましょう。プロンプトはコピーして
          手元のAIツールで試せます。
        </p>
      </div>

      <div className="space-y-6">
        {sandboxSamples.map((sample) => (
          <Card key={sample.id}>
            <CardHeader>
              <CardTitle className="text-lg">{sample.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PromptBlock label="プロンプト例" content={sample.prompt} />
              <div className="rounded-md border bg-muted/30 p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">出力例</p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{sample.response}</p>
              </div>
              <p className="text-sm text-muted-foreground">💡 {sample.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        ※ 本アプリは API キーを使用しません。出力例は学習用にあらかじめ用意したものです。
      </p>
    </section>
  )
}
