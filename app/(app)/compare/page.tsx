import { compareSamples } from '@/data/samples'
import { PromptBlock } from '@/components/lesson/PromptBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Claude vs ChatGPT 比較（静的サンプル学習モード）。
// API キー不使用方針のため、同一プロンプトに対する模範出力例を並べて提示する。
export default function ComparePage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claude vs ChatGPT 比較（事例集）</h1>
        <p className="text-muted-foreground">
          同じプロンプトに対する両モデルの出力例を並べました。違いから使い分けのヒントを学びましょう。
        </p>
      </div>

      <div className="space-y-8">
        {compareSamples.map((sample) => (
          <div key={sample.id} className="space-y-3">
            <h2 className="text-lg font-semibold">{sample.task}</h2>
            <PromptBlock label="共通プロンプト" content={sample.prompt} />
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Claude</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{sample.claude}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">ChatGPT</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{sample.chatgpt}</p>
                </CardContent>
              </Card>
            </div>
            <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
              📝 {sample.note}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        ※ 本アプリは API キーを使用しません。出力例は学習用にあらかじめ用意したものです。
      </p>
    </section>
  )
}
