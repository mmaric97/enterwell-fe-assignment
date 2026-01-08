import { useState } from 'react'
import { useGetQuizzesQuery } from './store/api'

export default function App() {
  const { data: quizzes, isLoading, error } = useGetQuizzesQuery()
  const [openQuizId, setOpenQuizId] = useState<number | null>(null)

  if (isLoading) return <p className="p-6">Loading quizzes...</p>
  if (error) return <p className="p-6 text-red-600">Error loading quizzes!</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Quizzes</h1>

      {quizzes?.map((quiz) => {
        const isOpen = openQuizId === quiz.id

        return (
          <div
            key={quiz.id}
            className="mb-4 border rounded shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setOpenQuizId(isOpen ? null : quiz.id)}
          >
            {/* Quiz name */}
            <div className="p-4 bg-blue-100 font-semibold">
              {quiz.name}
            </div>

            {/* Questions shown only if open */}
            {isOpen && (
              <ul className="p-4 list-disc list-inside bg-gray-50">
                {quiz.questions.map((q) => (
                  <li key={q.id} className="mb-2">
                    <strong>Q:</strong> {q.question} <br />
                    <strong>A:</strong> {q.answer}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
