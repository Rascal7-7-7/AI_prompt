import type { Chapter } from '@/types/chapter'
import { chapter01 } from './chapters/chapter-01'
import { chapter02 } from './chapters/chapter-02'
import { chapter03 } from './chapters/chapter-03'
import { chapter04 } from './chapters/chapter-04'
import { chapter05 } from './chapters/chapter-05'
import { chapter06 } from './chapters/chapter-06'
import { chapter07 } from './chapters/chapter-07'

/** 全チャプター（番号順） */
export const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
]

/** ID からチャプターを取得 */
export function getChapterById(chapterId: string): Chapter | undefined {
  return chapters.find((c) => c.id === chapterId)
}

/** チャプター内のレッスンを取得 */
export function getLessonById(chapterId: string, lessonId: string) {
  return getChapterById(chapterId)?.lessons.find((l) => l.id === lessonId)
}
