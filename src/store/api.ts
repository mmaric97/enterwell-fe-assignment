import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { Quiz } from '../models/quiz'
import { mockedQuizzes } from '../mock/quizzes'

const mockBaseQuery: BaseQueryFn<
  { url: string; params?: any },
  unknown,
  unknown
> = async ({ url, params }) => {
  await new Promise(res => setTimeout(res, 1500))

  if (url === 'quizzes') {
    return { data: mockedQuizzes }
  }

  if (url === 'quiz' && params?.id) {
    const quiz = mockedQuizzes.find((q) => q.id === params.id)
    return quiz
      ? { data: quiz }
      : { error: { status: 404, data: 'Quiz not found' } }
  }

  return { error: { status: 404, data: 'Not found' } }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => ({ url: 'quizzes' }),
    }),

    getQuizById: builder.query<Quiz, number>({
      query: (id) => ({
        url: 'quiz',
        params: { id },
      }),
    }),
  }),
})

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
} = api
