import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Quiz } from '../models/quiz'
import { fetchQuizByIdApi, fetchQuizzesApi, updateQuizApi, deleteQuizApi, addQuizApi, fetchQuestionsApi } from './quizessApi'
import type { Question } from '../models/question';

type QuizState = {
    quizzes: Quiz[];

    currentQuiz: Quiz | null;
    isLoading: boolean;

    isSaving: boolean;
    isSavedSuccessfully: boolean;

    isDeleting: boolean;

    loadingError: string | null;
    saveError: string | null;

    allQuestions: Question[];
    questionsLoading: boolean;
    questionsError: string | null;
}

const initialState: QuizState = {
    quizzes: [],

    currentQuiz: null,
    isLoading: false,

    isSaving: false,
    isSavedSuccessfully: false,

    isDeleting: false,

    loadingError: null,
    saveError: null,

    allQuestions: [],
    questionsLoading: false,
    questionsError: null
}

const handleAsyncError = (err: unknown, defaultMessage = 'Unknown error'): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    return defaultMessage;
};

export const fetchQuizzes = createAsyncThunk<Quiz[], void, { rejectValue: string }>(
    'quizzes/fetch',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchQuizzesApi();
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)

export const fetchQuizById = createAsyncThunk<Quiz, number, { rejectValue: string }>(
    'quizzes/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            return await fetchQuizByIdApi(id);
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
);

export const updateQuiz = createAsyncThunk<Quiz, Quiz, { rejectValue: string }>(
    'quizzes/update',
    async (quiz, { rejectWithValue }) => {
        try {
            return await updateQuizApi(quiz);
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)

export const deleteQuiz = createAsyncThunk<number, number, { rejectValue: string }>(
    'quizzes/delete',
    async (id, { rejectWithValue }) => {
        try {
            const result = await deleteQuizApi(id);
            if (!result) return rejectWithValue(`Quiz with id ${id} not found`);
            return id;
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)

export const addQuiz = createAsyncThunk<Quiz, Quiz, { rejectValue: string }>(
    'quizzes/add',
    async (quiz, { rejectWithValue }) => {
        try {
            return await addQuizApi(quiz);
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)

export const fetchQuestions = createAsyncThunk<Question[], void, { rejectValue: string }>(
    'quizzes/fetchQuestions',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchQuestionsApi();
        } catch (err: unknown) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)


const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        startCreateQuiz(state) {
            state.currentQuiz = {
                name: '',
                questions: [{ question: '', answer: '' }],
            } as Quiz;
            state.isSavedSuccessfully = false;
            state.loadingError = null;
        },

        updateQuizName(state, action: PayloadAction<string>) {
            if (state.currentQuiz) {
                state.currentQuiz.name = action.payload;
            }
        },

        updateQuizQuestion(
            state,
            action: PayloadAction<{
                index: number,
                field: 'question' | 'answer',
                value: string
            }>
        ) {
            const { index, field, value } = action.payload;
            if (state.currentQuiz?.questions[index]) {
                state.currentQuiz.questions[index] = {
                    ...state.currentQuiz.questions[index],
                    [field]: value,
                };
            }
        },

        swapQuestion(
            state,
            action: PayloadAction<{
                index: number,
                newQuestionId: number
            }>
        ) {
            const { index, newQuestionId } = action.payload;
            const question = state.allQuestions.find(q => q.id == Number(newQuestionId))!;
            if (state.currentQuiz?.questions[index]) {
                state.currentQuiz.questions[index] = question;
            }
        },

        addQuestion(state) {
            state.currentQuiz?.questions.push({ question: '', answer: '' });
        },

        removeQuestion(state, action: PayloadAction<{ index: number }>) {
            const { index } = action.payload;
            state.currentQuiz?.questions.splice(index, 1);
        },

        resetEditState(state) {
            return {
                ...state,
                isSaving: false,
                isSavedSuccessfully: false,
                saveError: null,
                currentQuiz: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder

            // fetch all
            .addCase(fetchQuizzes.pending, (state) => {
                state.isLoading = true;
                state.loadingError = null;
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.quizzes = action.payload;
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.isLoading = false;
                state.loadingError = action.payload ?? null;
            })

            // fetch single quiz
            .addCase(fetchQuizById.pending, (state) => {
                state.isLoading = true;
                state.isSavedSuccessfully = false;
                state.loadingError = null;
            })
            .addCase(fetchQuizById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentQuiz = action.payload;
            })
            .addCase(fetchQuizById.rejected, (state, action) => {
                state.isLoading = false;
                state.loadingError = action.payload ?? "Something went wrong";
            })

            // update quiz
            .addCase(updateQuiz.pending, (state) => {
                state.isSaving = true;
                state.isSavedSuccessfully = false;
                state.loadingError = null;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isSavedSuccessfully = true;
                state.currentQuiz = action.payload;
                const index = state.quizzes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) state.quizzes[index] = action.payload;
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.isSaving = false;
                state.isSavedSuccessfully = false;
                state.saveError = action.payload ?? "Something went wrong";
            })

            // delete quiz
            .addCase(deleteQuiz.pending, (state) => {
                state.isDeleting = true;
                state.saveError = null;
            })
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                state.isDeleting = false;
                const id = action.payload;
                state.quizzes = state.quizzes.filter(q => q.id !== id);
                if (state.currentQuiz?.id === id) state.currentQuiz = null;
            })
            .addCase(deleteQuiz.rejected, (state, action) => {
                state.isDeleting = false;
                state.saveError = action.payload ?? "Something went wrong";
            })

            // update quiz
            .addCase(addQuiz.pending, (state) => {
                state.isSaving = true;
                state.isSavedSuccessfully = false;
                state.loadingError = null;
            })
            .addCase(addQuiz.fulfilled, (state, action) => {
                state.isSaving = false;
                state.isSavedSuccessfully = true;
                state.currentQuiz = action.payload;
                const index = state.quizzes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) state.quizzes[index] = action.payload;
            })
            .addCase(addQuiz.rejected, (state, action) => {
                state.isSaving = false;
                state.isSavedSuccessfully = false;
                state.saveError = action.payload ?? "Something went wrong";;
            })

            // fetch all questions
            .addCase(fetchQuestions.pending, (state) => {
                state.questionsLoading = true;
                state.loadingError = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questionsLoading = false;
                state.allQuestions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.questionsError = action.payload ?? "Something went wrong";;
            })

    },
})

export const { addQuestion, startCreateQuiz, removeQuestion, updateQuizName, swapQuestion, updateQuizQuestion, resetEditState } = quizzesSlice.actions;


export default quizzesSlice.reducer;

