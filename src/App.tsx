
import { Route, Routes } from 'react-router-dom'
import QuizList from './features/QuizList'
import QuizDetails from './features/QuizEdit'
import { Provider } from 'react-redux'
import { store } from './store'

export default function App() {
  return (
    <div className="w-5/6 sm:w-4/5 max-w-400 mx-auto">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/home" element={<QuizList />} />
          <Route path="/quiz/:quizId/edit" element={<QuizDetails />} />
        </Routes>
      </Provider>
    </div>
  )
}
