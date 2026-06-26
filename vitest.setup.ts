import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// 各テスト後に React Testing Library のDOMを掃除
afterEach(() => {
  cleanup()
})
