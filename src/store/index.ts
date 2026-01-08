import { configureStore } from '@reduxjs/toolkit'
import { api } from './api.ts'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, // RTK Query reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware), // RTK Query middleware
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch