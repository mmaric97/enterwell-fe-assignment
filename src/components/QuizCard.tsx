import { useNavigate } from 'react-router-dom'
import type { Quiz } from '../models/quiz'
import { IoIosEye } from 'react-icons/io'


interface QuizCardProps {
  quiz: Quiz
  isOpen: boolean
  onToggle: () => void
}

export default function QuizCard({ quiz, isOpen, onToggle }: QuizCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="mb-4 rounded cursor-pointer"
      onClick={onToggle}
    >

      <div className={`flex flex-row justify-between content-center py-4 px-6 font-bold ${isOpen ? 'bg-blue-900' : 'bg-blue-600'}`}>
        <div className="min-h-4 flex items-center">
          {quiz.name}
        </div>

        <div
          className="min-h-4 p-1.5 border rounded cursor-pointer hover:bg-gray-400"
          onClick={() => navigate(`/quiz/${quiz.id}`)}
        >
          <IoIosEye />
        </div>
      </div>

      {isOpen && (
        <ul className="p-4 list-disc border-b-0 rounded-b-lg list-inside bg-gray-50 text-gray-700">
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
}
