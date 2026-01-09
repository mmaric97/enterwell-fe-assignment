import type { Quiz } from '../models/quiz'


interface QuizCardProps {
  quiz: Quiz
  isOpen: boolean
  onToggle: () => void
}

export default function QuizCard({ quiz, isOpen, onToggle }: QuizCardProps) {
  return (
    <div
      className="mb-4 rounded cursor-pointer"
      onClick={onToggle} // handle click from parent
    >
      <div className={`p-4 font-semibold ${isOpen ? 'bg-blue-900' : 'bg-blue-600'}`}>
        {quiz.name}
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
