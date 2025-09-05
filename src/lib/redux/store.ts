import { configureStore } from '@reduxjs/toolkit';
import { fixtureApi } from '../api/fixtureApi';
import { compareApi } from '../api/compareApi';

export const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    [compareApi.reducerPath]: compareApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fixtureApi.middleware,
      compareApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
