import { cn } from '@/lib/utils'

interface ProgressBarProps {
  /** 0〜100 の進捗率 */
  value: number
  className?: string
}

// 進捗バー
export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}>
      <div
        className="h-full bg-primary transition-all"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
