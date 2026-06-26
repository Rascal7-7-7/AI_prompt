import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getChapterById } from '@/data'
import { gradeQuiz } from '@/lib/grade'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const quizSchema = z.object({
  sessionId: z.string().min(1),
  chapterId: z.string().min(1),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        answer: z.string(),
      })
    )
    .min(1),
})

// POST /api/quiz — クイズ採点 + 結果保存
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = quizSchema.safeParse(json)
    if (!parsed.success) {
      return Response.json({ error: 'リクエストが不正です。' }, { status: 400 })
    }

    const { sessionId, chapterId, answers } = parsed.data

    if (!rateLimit(`quiz:${sessionId}`)) {
      return Response.json({ error: 'リクエストが多すぎます。' }, { status: 429 })
    }

    const chapter = getChapterById(chapterId)
    if (!chapter) {
      return Response.json({ error: 'チャプターが見つかりません。' }, { status: 400 })
    }

    // サーバー側で採点（正解はクライアントに依存しない）
    const answerMap: Record<string, string> = {}
    for (const a of answers) answerMap[a.questionId] = a.answer
    const graded = gradeQuiz(chapter.quiz, answerMap)

    // Session が無ければ作成
    await prisma.session.upsert({
      where: { id: sessionId },
      create: { id: sessionId },
      update: {},
    })

    await prisma.quizResult.create({
      data: {
        sessionId,
        chapterId,
        score: graded.score,
        total: graded.total,
        passed: graded.passed,
        answers,
      },
    })

    return Response.json(graded)
  } catch (error) {
    console.error('[API /quiz POST] error')
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
