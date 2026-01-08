import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react'

interface Question {
  id: number
  question: string
  answer: string
}

interface Quiz {
  id: number
  name: string
  questions: Question[]
}

interface QuizCardProps {
  quiz: Quiz
}

// Mock data
const mockQuizzes: Quiz[] = [
  {
    id: 1,
    name: 'Enterwell Quiz',
    questions: [
      {
        id: 1,
        question:
          "Who was the English mathematician and writer widely considered the world's first computer programmer for her work on Charles Babbage's Analytical Engine?",
        answer: 'Ada Lovelace',
      },
      {
        id: 2,
        question: 'What is the capital of France?',
        answer: 'Paris',
      },
    ],
  },
  {
    id: 2,
    name: 'Math Quiz',
    questions: [
      {
        id: 1,
        question: 'What is 7 × 8?',
        answer: '56',
      },
    ],
  },
]

// Sleep helper
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Mock fetch function
const mockBaseQuery: BaseQueryFn<string> = async () => {
  await sleep(1500) // 1.5 seconds delay
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
