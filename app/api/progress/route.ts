import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import type { ProgressSummary } from '@/types/progress'
import { formatCompleted, formatQuizScores } from '@/lib/progress-format'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const updateSchema = z.object({
  sessionId: z.string().min(1),
  chapterId: z.string().min(1),
  lessonId: z.string().min(1).optional(),
  completed: z.boolean(),
})

// GET /api/progress?sessionId=xxx — 進捗取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    if (!sessionId) {
      return Response.json({ error: 'sessionId が必要です。' }, { status: 400 })
    }

    const [progresses, quizResults] = await Promise.all([
      prisma.progress.findMany({ where: { sessionId, completed: true } }),
      prisma.quizResult.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const summary: ProgressSummary = {
      completed: formatCompleted(progresses),
      quizScores: formatQuizScores(quizResults),
    }
    return Response.json(summary)
  } catch (error) {
    console.error('[API /progress GET] error')
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/progress — 進捗保存（upsert）
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = updateSchema.safeParse(json)
    if (!parsed.success) {
      return Response.json({ error: 'リクエストが不正です。' }, { status: 400 })
    }

    const { sessionId, chapterId, lessonId, completed } = parsed.data

    if (!rateLimit(`progress:${sessionId}`)) {
      return Response.json({ error: 'リクエストが多すぎます。' }, { status: 429 })
    }

    // Session が無ければ作成（匿名セッション）
    await prisma.session.upsert({
      where: { id: sessionId },
      create: { id: sessionId },
      update: {},
    })

    // 複合ユニーク(sessionId,chapterId,lessonId)は lessonId が null だと
    // Prisma の where セレクタで扱えない（型上 string 必須）ため、
    // find → update / create に分けて手動 upsert する。
    const completedAt = completed ? new Date() : null
    const existing = await prisma.progress.findFirst({
      where: { sessionId, chapterId, lessonId: lessonId ?? null },
      select: { id: true },
    })

    if (existing) {
      await prisma.progress.update({
        where: { id: existing.id },
        data: { completed, completedAt },
      })
    } else {
      await prisma.progress.create({
        data: { sessionId, chapterId, lessonId: lessonId ?? null, completed, completedAt },
      })
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('[API /progress POST] error')
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
