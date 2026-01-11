
import { NavLink, Route, Routes } from 'react-router-dom'
import QuizList from './features/QuizList'
import QuizDetails from './features/QuizEdit'
import { Provider } from 'react-redux'
import { store } from './store'
import QuizAdd from './features/QuizAdd'
import QuizPlay from './features/QuizPlay'
import { deleteAllQuizzesFromStorage } from './mock/quizzesMock'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-linear-to-r from-blue-800 to-sky-700 text-white py-2">
        <div className="flex w-5/6 sm:w-4/5 space-x-6 mx-auto max-w-400 items-center justify-between">
          <div className="flex space-x-6 cursor-pointer">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/quiz/create"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              Create Quiz
            </NavLink>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => {
              deleteAllQuizzesFromStorage();
              window.location.reload();
            }}
          >
            Reset mock
          </button>
        </div>
      </nav>
      <div className="grow flex items-center justify-center">
        <div className=" w-5/6 sm:w-4/5 max-w-400 mx-auto">
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<QuizList />} />
              <Route path="/quiz/:quizId/edit" element={<QuizDetails />} />
              <Route path="/quiz/create" element={<QuizAdd />} />
              <Route path="/quiz/:quizId/play" element={<QuizPlay />} />
            </Routes>
          </Provider>
        </div>
      </div>
    </div>
  )
}
