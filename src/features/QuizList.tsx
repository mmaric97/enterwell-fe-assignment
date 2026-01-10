import { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'
import type { Quiz } from '../models/quiz'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchQuizzes } from '../store/quizzesSlice'

export default function QuizList() {
  const dispatch = useAppDispatch()
  const { quizzes: data, isLoading, loadingError } = useAppSelector(
    (state: RootState) => state.quizzes
  )

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [dispatch])

  const [openQuizId, setOpenQuizId] = useState<number | null>(null)

  if (isLoading) return <p className="p-4">Loading quizzes...</p>
  if (loadingError) return <p className="p-4 text-red-600">Error loading quizzes!</p>

  const handleToggle = (quizId: number) => {
    setOpenQuizId(openQuizId === quizId ? null : quizId)
  }

  return (
    <div className="flex flex-col gap-4">
      {data?.map((quiz: Quiz) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          isOpen={openQuizId === quiz.id}  
          onToggle={() => handleToggle(quiz.id)} 
        />
      ))}
    </div>
  )
}
