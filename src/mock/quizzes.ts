import type { Quiz } from "../models/quiz";

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    name: 'Enterwell Quiz',
    questions: [
      {
        id: 1,
        question:
          "Who was the English mathematician widely considered the world's first programmer?",
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