import { describe, it, expect } from 'vitest'
import { formatCompleted, formatQuizScores } from '@/lib/progress-format'

describe('formatCompleted', () => {
  it('lessonId 有りは "chapter/lesson"、無しは "chapter"', () => {
    const out = formatCompleted([
      { chapterId: 'chapter-01', lessonId: 'lesson-01-01' },
      { chapterId: 'chapter-02', lessonId: null },
    ])
    expect(out).toEqual(['chapter-01/lesson-01-01', 'chapter-02'])
  })

  it('空配列は空配列', () => {
    expect(formatCompleted([])).toEqual([])
  })
})

describe('formatQuizScores', () => {
  it('チャプターごとに最新（先頭）スコアを採用', () => {
    const out = formatQuizScores([
      { chapterId: 'chapter-01', score: 4, total: 4, passed: true }, // 最新
      { chapterId: 'chapter-01', score: 1, total: 4, passed: false }, // 古い→無視
      { chapterId: 'chapter-02', score: 2, total: 3, passed: false },
    ])
    expect(out['chapter-01']).toEqual({ score: 4, total: 4, passed: true })
    expect(out['chapter-02']).toEqual({ score: 2, total: 3, passed: false })
  })
})
