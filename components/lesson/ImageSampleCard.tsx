import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface ImageSampleCardProps {
  prompt: string
  imagePath: string
  source: string
  tool: string
}

// 画像生成サンプル表示（引用画像）
export function ImageSampleCard({ prompt, imagePath, source, tool }: ImageSampleCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          <Image src={imagePath} alt={prompt} fill className="object-cover" />
        </div>
        <p className="text-sm">{prompt}</p>
        <p className="text-xs text-muted-foreground">
          ツール: {tool} ／ 出典: {source}
        </p>
      </CardContent>
    </Card>
  )
}
