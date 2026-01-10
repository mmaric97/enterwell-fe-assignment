import type { Quiz } from "../models/quiz";

const STORAGE_KEY = 'quizzes';
export const defaultQuizzes: Quiz[] = [
  {
    id: 1,
    name: 'Enterwell Quiz',
    questions: [
      {
        id: 1,
        question:
          "Who was the English mathematician widely considered the world's first programmer?",
        answer: 'Ada Lovelace',
      },
      {
        id: 2,
        question: 'What is the capital of France?',
        answer: 'Paris',
      },
    ],
  },
  {
    id: 2,
    name: 'Math Quiz',
    questions: [
      {
        id: 1,
        question: 'What is 7 × 8?',
        answer: '56',
      },
    ],
  },
];

export const getQuizzesFromStorage = (): Quiz[] => {
    let stored = localStorage.getItem(STORAGE_KEY);
    if(!stored) {
      updateQuizzesInStorage(defaultQuizzes);
    }

    stored = localStorage.getItem(STORAGE_KEY);

    return JSON.parse(stored!);
};

export const getQuizFromStorage = (id: number): Quiz => {
  const quizzes = getQuizzesFromStorage();
  const quiz = quizzes.find(q => q.id === id);
  if (!quiz) throw new Error(`Quiz with id ${id} not found`);
  return quiz;
};

export const updateQuizzesInStorage = (quizzes: Quiz[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
};

export const updateQuizInStorage = (updatedQuiz: Quiz): Quiz => {
  const quizzes = getQuizzesFromStorage(); 
  const index = quizzes.findIndex(q => q.id === updatedQuiz.id);

  if (index === -1) {
    throw new Error(`Quiz with id ${updatedQuiz.id} not found in storage`);
  }

  quizzes[index] = updatedQuiz;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  return updatedQuiz;
};

export let mockedQuizzes: Quiz[] = getQuizzesFromStorage();


