import { getQuizFromStorage, getQuizzesFromStorage, updateQuizInStorage, deleteQuizFromStorage, addQuizToStorage, getAllQuestionsFromStorage } from '../mock/quizzesMock'
import type { Question } from '../models/question';
import type { Quiz } from '../models/quiz'

export const API_BASE = 'http://quiz-maker.apidocs.enterwell.space'

export const API_PATHS = {
  QUIZZES: `${API_BASE}/quizzes`,
  QUIZ: (id: number) => `${API_BASE}/quizzes/${id}`,
  QUESTIONS: `${API_BASE}/questions`,
}

const FETCHING_DATA_DURATION = 1000;
const MISTAKE_PROBABILITY = 0.0;

export const fetchQuizzesApi = async (): Promise<Quiz[]> => {
  //const response = await fetch(API_PATHS.QUIZZES)
  //return response.json()

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  return getQuizzesFromStorage();
}

export const fetchQuizByIdApi = async (id: number): Promise<Quiz> => {
  // const response = await fetch(API_PATHS.QUIZ(id))
  // return response.json()

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  return getQuizFromStorage(id);
}

export const updateQuizApi = async (quiz: Quiz): Promise<Quiz> => {
  // const response = await fetch(API_PATHS.QUIZ(quiz.id), {
  //   method: 'PUT',
  //   body: JSON.stringify(quiz),
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // return response.json();

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  updateQuizInStorage(quiz);

  return { ...quiz };
}

export const deleteQuizApi = async (id: number): Promise<boolean> => {

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  deleteQuizFromStorage(id);

  return true;
}

export const addQuizApi = async (quiz: Quiz): Promise<Quiz> => {

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  addQuizToStorage(quiz);

  return { ...quiz };
}


export const fetchQuestionsApi = async (): Promise<Question[]> => {
  //const response = await fetch(API_PATHS.QUIZZES)
  //return response.json()

  await new Promise((res) => setTimeout(res, FETCHING_DATA_DURATION));

  if (Math.random() < MISTAKE_PROBABILITY) {
    throw new Error('Random API error');
  }

  return getAllQuestionsFromStorage();
}

