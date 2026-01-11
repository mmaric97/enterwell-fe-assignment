import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OngoingQuiz } from "../models/quizSession";
import type { Quiz } from "../models/quiz";
import type { RootState } from ".";


interface QuizSolveState {
    ongoingQuizzes: OngoingQuiz[];
}

const initialState: QuizSolveState = {
    ongoingQuizzes: []
};

const quizSolveSlice = createSlice({
    name: "quizSolve",
    initialState,
    reducers: {
        startQuiz(state, action: PayloadAction<Quiz>) {
            const exists = state.ongoingQuizzes.find(q => q.id === action.payload.id);
            if (exists) return;

            state.ongoingQuizzes.push({
                ...action.payload,
                currentQuestionIndex: 0,
                startedAt: Date.now(),
                correctAnswersCount: 0,
                isLastAnswerCorrect: undefined
            } as OngoingQuiz);
        },

        nextQuestion(state, action: PayloadAction<{
            quizId: number;
        }>) {
            const quiz = state.ongoingQuizzes.find(q => q.id === action.payload.quizId);
            if (!quiz) return;
            quiz.currentQuestionIndex += 1;
        },

        submitAnswer(
            state,
            action: PayloadAction<{
                quizId: number;
                answer: string;
            }>
        ) {
            const quiz = state.ongoingQuizzes.find(q => q.id === action.payload.quizId);
            if (!quiz) return;

            if (quiz.questions[quiz.currentQuestionIndex].answer == action.payload.answer) {
                quiz.correctAnswersCount += 1;
            }
        },

        finishQuiz(state, action: PayloadAction<{
            quizId: number;
        }>) {
            const quiz = state.ongoingQuizzes.find(q => q.id === action.payload.quizId);
            if (!quiz) return;

            state.ongoingQuizzes = state.ongoingQuizzes.filter(
                q => q.id !== action.payload.quizId
            );
        },
    },
});

export const selectOngoingQuizzes = (state: RootState) =>
    state.quizSolve.ongoingQuizzes;

export const selectCurrentQuestion =
    (quizId: number) =>
        (state: RootState) => {
            const quiz = state.quizSolve.ongoingQuizzes.find(q => q.id === quizId);
            if (!quiz) return null;

            return quiz.questions[quiz.currentQuestionIndex];
        };

export const selectCurrentQuestionIndex =
    (quizId: number) =>
        (state: RootState) =>
            state.quizSolve.ongoingQuizzes.find(q => q.id === quizId)
                ?.currentQuestionIndex ?? 0;


export const selectTotalQuestions =
    (quizId: number) =>
        (state: RootState) =>
            state.quizSolve.ongoingQuizzes.find(q => q.id === quizId)
                ?.questions.length ?? 0;


export const selectCorrectAnswers =
    (quizId: number) =>
        (state: RootState) =>
            state.quizSolve.ongoingQuizzes.find(q => q.id === quizId)
                ?.correctAnswersCount ?? 0;



export const { startQuiz, nextQuestion, submitAnswer, finishQuiz } = quizSolveSlice.actions;

export default quizSolveSlice.reducer;
