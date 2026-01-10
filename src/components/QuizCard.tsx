import { useNavigate } from 'react-router-dom'
import type { Quiz } from '../models/quiz'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoCloseOutline } from 'react-icons/io5'
import { useAppDispatch } from '../store/hooks'
import { deleteQuiz } from '../store/quizzesSlice'


interface QuizCardProps {
  quiz: Quiz
  isOpen: boolean
  onToggle: () => void
}

export default function QuizCard({ quiz, isOpen, onToggle }: QuizCardProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  return (
    <div
      className="mb-4 rounded cursor-pointer"
      onClick={onToggle}
    >

      <div className={`flex flex-row justify-between content-center py-4 px-4 sm:px-6 font-bold 
        bg-linear-to-r from-blue-800 to-sky-700 ${isOpen ? 'rounded-t-lg rounded-b-none' : 'rounded-lg'}`}>
        <div className="min-h-4 flex items-center">
          {quiz.name}
        </div>

        <div className='flex flex-row gap-2'>
          <div
            className="min-h-4 p-2 border-2 bg-lime rounded cursor-pointer hover:bg-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/quiz/${quiz.id}/edit`)
            }}
          >
            <AiOutlineEdit />
          </div>

          <div
            className="min-h-4 p-2 border-2 bg-lime rounded cursor-pointer hover:bg-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteQuiz(quiz.id))
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
      </div>

      {isOpen && (
        <ul className="min-h-50 max-h-50 overflow-auto p-4 list-disc border-b-0 rounded-b-lg list-inside bg-gray-200 text-gray-900">
          {quiz.questions.map((q) => (
            <li key={q.id} className="mb-2">
              {q.question} <br />
              {/* <strong>A:</strong> {q.answer} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
