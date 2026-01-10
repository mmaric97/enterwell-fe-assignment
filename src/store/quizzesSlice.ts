import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Quiz } from '../models/quiz'
import { fetchQuizByIdApi, fetchQuizzesApi, updateQuizApi } from './quizessApi'

type QuizState = {
    quizzes: Quiz[];
    currentQuiz: Quiz | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: QuizState = {
    quizzes: [],
    currentQuiz: null,
    isLoading: false,
    error: null,
}

export const fetchQuizzes = createAsyncThunk<
    Quiz[],
    void,
    { rejectValue: string }
>(
    'quizzes/fetch',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchQuizzesApi()
        } catch {
            return rejectWithValue('Failed to load quizzes')
        }
    }
)

export const fetchQuizById = createAsyncThunk<Quiz, number>(
  'quizzes/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchQuizByIdApi(id);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateQuiz = createAsyncThunk(
    'quizzes/update',
    async (quiz: Quiz, { rejectWithValue }) => {
        try {
            return await updateQuizApi(quiz)
        } catch {
            return rejectWithValue('Failed to load quizzes')
        }
    }
)


const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizzes.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchQuizzes.fulfilled, (state, action) => {
                state.isLoading = false
                state.quizzes = action.payload
            })
            .addCase(fetchQuizzes.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Error'
            })

            // fetch single quiz
            .addCase(fetchQuizById.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchQuizById.fulfilled, (state, action) => { state.isLoading = false; state.currentQuiz = action.payload; })
            .addCase(fetchQuizById.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; })


            // update quiz
            .addCase(updateQuiz.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentQuiz = action.payload;
                // update the quiz in the list too
                const index = state.quizzes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) state.quizzes[index] = action.payload;
            })
            .addCase(updateQuiz.rejected, (state, action) => { state.isLoading = false; state.error = action.payload as string; });

    },
})


export default quizzesSlice.reducer

