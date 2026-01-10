import { getQuizFromStorage, getQuizzesFromStorage, updateQuizInStorage } from '../mock/quizzesMock'
import type { Quiz } from '../models/quiz'

export const API_BASE = 'http://quiz-maker.apidocs.enterwell.space'

export const API_PATHS = {
  QUIZZES: `${API_BASE}/quizzes`,
  QUIZ: (id: number) => `${API_BASE}/quizzes/${id}`,
  QUESTIONS: `${API_BASE}/questions`,
}

export const fetchQuizzesApi = async (): Promise<Quiz[]> => {
  //const response = await fetch(API_PATHS.QUIZZES)
  //return response.json()

  if (Math.random() < 0.1) {
    throw new Error('Random API error')
  }

  await new Promise((res) => setTimeout(res, 1000))

  return getQuizzesFromStorage(); 
}

export const fetchQuizByIdApi = async (id: number): Promise<Quiz> => {
  // const response = await fetch(API_PATHS.QUIZ(id))
  // return response.json()

  await new Promise((res) => setTimeout(res, 1000))

  return getQuizFromStorage(id); 
}

export const updateQuizApi = async (quiz: Quiz): Promise<Quiz> => {
  // const response = await fetch(API_PATHS.QUIZ(quiz.id), {
  //   method: 'PUT',
  //   body: JSON.stringify(quiz),
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // return response.json();

  await new Promise((res) => setTimeout(res, 1000))

  updateQuizInStorage(quiz);

  return quiz;
}
