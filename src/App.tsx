
import { Route, Routes } from 'react-router-dom'
import QuizList from './features/QuizList'
import QuizDetails from './features/QuizEdit'
import { Provider } from 'react-redux'
import { store } from './store'
import QuizAdd from './features/QuizAdd'
import QuizPlay from './features/QuizPlay'

export default function App() {
  return (
    <div className="w-5/6 sm:w-4/5 max-w-400 mx-auto">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/home" element={<QuizList />} />
          <Route path="/quiz/:quizId/edit" element={<QuizDetails />} />
          <Route path="/quiz/create" element={<QuizAdd />} />
          <Route path="/quiz/:quizId/play" element={<QuizPlay />} />
        </Routes>
      </Provider>
    </div>
  )
}
