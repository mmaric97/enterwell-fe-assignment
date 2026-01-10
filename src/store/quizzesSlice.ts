import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Quiz } from '../models/quiz'
import { fetchQuizByIdApi, fetchQuizzesApi, updateQuizApi } from './quizessApi'

type QuizState = {
    quizzes: Quiz[];

    currentQuiz: Quiz | null;

    isLoading: boolean;
    isSaving: boolean;
    isSavedSuccessfully: boolean;

    loadingError: string | undefined;
    saveError: string | undefined;
}

const initialState: QuizState = {
    quizzes: [],

    currentQuiz: null,

    isLoading: false,
    isSaving: false,
    isSavedSuccessfully: false,

    loadingError: undefined,
    saveError: undefined,
}

const handleAsyncError = (err: unknown, defaultMessage = 'Unknown error'): string => {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return defaultMessage;
};

export const fetchQuizzes = createAsyncThunk<Quiz[], void, { rejectValue: string }
>(
    'quizzes/fetch',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchQuizzesApi();
        } catch (err: any) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)

export const fetchQuizById = createAsyncThunk<Quiz, number, { rejectValue: string }>(
    'quizzes/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            return await fetchQuizByIdApi(id);
        } catch (err: any) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
);

export const updateQuiz = createAsyncThunk<Quiz, Quiz, { rejectValue: string }>(
    'quizzes/update',
    async (quiz, { rejectWithValue }) => {
        try {
            return await updateQuizApi(quiz);
        } catch (err: any) {
            return rejectWithValue(handleAsyncError(err));
        }
    }
)


const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // fetch all
            .addCase(fetchQuizzes.pending, (state) => {
                state.isLoading = true
                state.loadingError = undefined
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.isLoading = false
                state.quizzes = action.payload
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.isLoading = false
                state.loadingError = action.payload
            })

            // fetch single quiz
            .addCase(fetchQuizById.pending, (state) => {
                state.isLoading = true;
                state.loadingError = undefined;
            })
            .addCase(fetchQuizById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentQuiz = action.payload;
            })
            .addCase(fetchQuizById.rejected, (state, action) => {
                state.isLoading = false;
                state.loadingError = action.payload;
            })

            // update quiz
            .addCase(updateQuiz.pending, (state) => {
                state.isSaving = true;
                state.isSavedSuccessfully = false;
                state.loadingError = undefined;
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
                state.saveError = action.payload;
            });

    },
})


export default quizzesSlice.reducer

