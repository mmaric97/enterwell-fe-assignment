import { useState } from 'react'
import QuizCard from '../components/QuizCard'
import type { Quiz } from '../models/quiz'
import { useGetQuizzesQuery } from '../store/api'

export default function QuizList() {
  const { data: quizzes, isLoading, error } = useGetQuizzesQuery()
  const [openQuizId, setOpenQuizId] = useState<number | null>(null)

  if (isLoading) return <p className="p-4">Loading quizzes...</p>
  if (error) return <p className="p-4 text-red-600">Error loading quizzes!</p>

  const handleToggle = (quizId: number) => {
    setOpenQuizId(openQuizId === quizId ? null : quizId) // toggle open/close
  }

  return (
    <div className="flex flex-col gap-4">
      {quizzes?.map((quiz: Quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          isOpen={openQuizId === quiz.id}   // pass open state
          onToggle={() => handleToggle(quiz.id)} // pass toggle callback
        />
      ))}
    </div>
  )
}
