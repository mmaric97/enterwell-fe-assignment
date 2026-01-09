import { useParams } from "react-router-dom"
import { useGetQuizByIdQuery } from "../store/api"

export default function QuizCard() {

    const { quizId } = useParams<{ quizId: string }>()

    const { data: quiz, isLoading, error } = useGetQuizByIdQuery(Number(quizId))

    if (isLoading) return <p className="p-4">Loading quiz...</p>
    if (error || !quiz) return <p className="p-4 text-red-500">Quiz not found</p>

    return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit: {quiz.name}</h1>

      <ul className="space-y-4">
        {quiz.questions.map((q) => (
          <li key={q.id} className="border p-4 rounded">
            <p className="font-medium">{q.question}</p>
            <p className="text-sm text-gray-600 mt-2">
              Answer: {q.answer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
