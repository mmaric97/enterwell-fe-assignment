import type { Quiz } from "./quiz";

export interface OngoingQuiz extends Quiz {
  currentQuestionIndex: number;
  startedAt: number;
  correctAnswersCount: number;
}