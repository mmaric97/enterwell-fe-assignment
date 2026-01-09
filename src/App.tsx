
import { Route, Routes } from 'react-router-dom'
import QuizList from './features/QuizList'
import QuizDetails from './features/QuizDetails'

export default function App() {
  return (
    <div className="w-4/5 mx-auto">
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/home" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<QuizDetails />} />
      </Routes>
    </div>
  )
}
