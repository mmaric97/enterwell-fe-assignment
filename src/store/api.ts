import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { Quiz } from '../models/quiz'
import { mockQuizzes } from '../mock/quizzes'

const mockBaseQuery: BaseQueryFn<string> = async () => {
  await new Promise(res => setTimeout(res, 1500))
  return { data: mockQuizzes }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => '',
    }),
  }),
})

export const { useGetQuizzesQuery } = api
