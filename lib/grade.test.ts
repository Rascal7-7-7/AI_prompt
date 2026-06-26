import { describe, it, expect } from 'vitest'
import { gradeQuiz, DEFAULT_PASS_RATE } from '@/lib/grade'
import type { QuizQuestion } from '@/types/chapter'

const q = (id: string, answer: string): QuizQuestion => ({
  id,
  question: `問題${id}`,
  choices: ['a', 'b', 'c', 'd'],
  answer,
  explanation: `解説${id}`,
})

const questions = [q('1', 'a'), q('2', 'b'), q('3', 'c'), q('4', 'd')]

describe('gradeQuiz', () => {
  it('全問正解で score=total・passed=true', () => {
    const r = gradeQuiz(questions, { '1': 'a', '2': 'b', '3': 'c', '4': 'd' })
    expect(r.score).toBe(4)
    expect(r.total).toBe(4)
    expect(r.passed).toBe(true)
  })

  it('合格率(0.7)未満は passed=false', () => {
    const r = gradeQuiz(questions, { '1': 'a', '2': 'x', '3': 'x', '4': 'x' })
    expect(r.score).toBe(1)
    expect(r.passed).toBe(false)
  })

  it('3/4=0.75 は合格', () => {
    const r = gradeQuiz(questions, { '1': 'a', '2': 'b', '3': 'c', '4': 'x' })
    expect(r.score).toBe(3)
    expect(r.passed).toBe(true)
  })

  it('未回答は不正解扱い', () => {
    const r = gradeQuiz(questions, {})
    expect(r.score).toBe(0)
    expect(r.passed).toBe(false)
  })

  it('問題が空なら passed=false', () => {
    const r = gradeQuiz([], {})
    expect(r.total).toBe(0)
    expect(r.passed).toBe(false)
  })

  it('境界: ちょうど合格率で合格（7/10）', () => {
    const ten = Array.from({ length: 10 }, (_, i) => q(String(i), 'a'))
    const answers: Record<string, string> = {}
    for (let i = 0; i < 7; i++) answers[String(i)] = 'a' // 7問正解
    const r = gradeQuiz(ten, answers, DEFAULT_PASS_RATE)
    expect(r.score).toBe(7)
    expect(r.passed).toBe(true)
  })
})
