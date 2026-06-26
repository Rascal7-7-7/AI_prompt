import type { Difficulty } from '@/types/chapter'

// 難易度の表示ラベルと色（複数画面で共有）
export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
}

export const DIFFICULTY_CLASS: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
}
