export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type LessonBlock =
  | { type: 'text'; content: string }
  | { type: 'prompt'; label: string; content: string; copiable?: boolean }
  | { type: 'before_after'; before: string; after: string; explanation: string }
  | { type: 'fill_blank'; sentence: string; blank: string; choices: string[]; answer: string }
  | { type: 'image_sample'; prompt: string; imagePath: string; source: string; tool: string }
  | { type: 'compare'; taskDescription: string; claudePrompt: string; chatgptPrompt: string }

export interface Lesson {
  /** "lesson-01-01" 形式 */
  id: string
  title: string
  estimatedMinutes: number
  blocks: LessonBlock[]
}

export interface QuizQuestion {
  id: string
  question: string
  choices: string[]
  answer: string
  explanation: string
}

export interface Chapter {
  /** "chapter-01" 形式 */
  id: string
  number: number
  title: string
  description: string
  difficulty: Difficulty
  estimatedMinutes: number
  lessons: Lesson[]
  quiz: QuizQuestion[]
}
