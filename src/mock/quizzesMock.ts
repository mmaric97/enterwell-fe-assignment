import type { Question } from "../models/question";
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
    ],
  },
  {
    id: 2,
    name: 'Math Quiz',
    questions: [
      {
        id: 6,
        question: 'What is 7 × 8?',
        answer: '56',
      },
      {
        id: 7,
        question: 'What is 8 × 8?',
        answer: '64',
      },
      {
        id: 8,
        question: 'What is 9 × 9?',
        answer: '81',
      },
      {
        id: 9,
        question: 'What is 9 × 10?',
        answer: '90',
      },
    ],
  },
];

export const getQuizzesFromStorage = (): Quiz[] => {
  let stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    createQuizzesInStorage(defaultQuizzes);
  }

  stored = localStorage.getItem(STORAGE_KEY);

  return JSON.parse(stored!);
};

export const getQuizFromStorage = (id: number): Quiz => {
  const quizzes = getQuizzesFromStorage();
  const quiz = quizzes.find(q => q.id === id);
  if (!quiz) throw new Error(`Quiz with id ${id} not found.`);
  return quiz;
};

export const createQuizzesInStorage = (quizzes: Quiz[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
};

export const updateQuizInStorage = (updatedQuiz: Quiz): Quiz => {
  const quizzes = getQuizzesFromStorage();
  const index = quizzes.findIndex(q => q.id === updatedQuiz.id);

  if (index === -1) {
    throw new Error(`Quiz with id ${updatedQuiz.id} not found.`);
  }

  quizzes[index] = updatedQuiz;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  return updatedQuiz;
};

export const addQuizToStorage = (newQuiz: Quiz): Quiz => {
  const quizzes = getQuizzesFromStorage();

  const maxQuizId = quizzes.length > 0 ? Math.max(...quizzes.map(q => q.id ?? 0)) : 0;
  const quizWithId: Quiz = { ...newQuiz, id: maxQuizId + 1 };

  const allQuestions = quizzes.flatMap(q => q.questions);
  const maxQuestionId = allQuestions.length > 0 ? Math.max(...allQuestions.map(q => q.id!)) : 0;

  quizWithId.questions = quizWithId.questions.map((q, index) => ({
    ...q,
    id: maxQuestionId + index + 1,
  }));

  quizzes.push(quizWithId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));

  return quizWithId;
};


export const getAllQuestionsFromStorage = (): Question[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return []; 

  const quizzes: Quiz[] = JSON.parse(data);

  const allQuestions: Question[] = quizzes.flatMap(q => q.questions);
  return allQuestions;

};

export const deleteQuizFromStorage = (id: number): Quiz | null => {
  const quizzes = getQuizzesFromStorage();
  const index = quizzes.findIndex(q => q.id === id);
  if (index === -1) {
    throw new Error(`Quiz with id ${id} not found.`);
  }
  const [deleted] = quizzes.splice(index, 1);
  createQuizzesInStorage(quizzes);
  return deleted;
};

export const deleteAllQuizzesFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export let mockedQuizzes: Quiz[] = getQuizzesFromStorage();





