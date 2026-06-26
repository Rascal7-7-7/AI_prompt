import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FillBlankQuiz } from '@/components/lesson/FillBlankQuiz'

const props = {
  sentence: '答えは ___ です',
  blank: '___',
  choices: ['正', '誤'],
  answer: '正',
}

describe('FillBlankQuiz', () => {
  it('正答の選択で「正解」が表示される', () => {
    render(<FillBlankQuiz {...props} />)
    fireEvent.click(screen.getByRole('button', { name: '正' }))
    expect(screen.getByText(/正解/)).toBeTruthy()
  })

  it('誤答の選択で「不正解」が表示される', () => {
    render(<FillBlankQuiz {...props} />)
    fireEvent.click(screen.getByRole('button', { name: '誤' }))
    expect(screen.getByText(/不正解/)).toBeTruthy()
  })

  it('選択前は判定が表示されない', () => {
    render(<FillBlankQuiz {...props} />)
    expect(screen.queryByText(/正解/)).toBeNull()
  })
})
