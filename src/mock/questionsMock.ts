import type { Question } from "../models/question";

const STORAGE_KEY = 'questions';
export const defaultQuizzes: Question[] = [

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
    {
        id: 3,
        question: 'What is the capital of Croatia?',
        answer: 'Zagreb',
    },
    {
        id: 4,
        question: 'Who was the first president of the United States?',
        answer: 'George Washington',
    },
    {
        id: 5,
        question: 'Which continent is the Sahara Desert located in?',
        answer: 'Africa',
    },
    {
        id: 6,
        question: 'What is 7 × 8?',
        answer: '56',
    },
];

export const getQuestionsFromStorage = (): Question[] => {
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    createQuestionsInStorage(defaultQuizzes);
  }

  stored = localStorage.getItem(STORAGE_KEY);

  return JSON.parse(stored!);
};

export const createQuestionsInStorage = (quizzes: Question[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
};
