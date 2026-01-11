import { configureStore } from '@reduxjs/toolkit';
import quizzesReducer from './quizzesSlice';
import quizSolveSlice from './quizSolveSlice';


export const store = configureStore({
  reducer: { 
    quizzes: quizzesReducer, 
    quizSolve: quizSolveSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
