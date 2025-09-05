import { configureStore } from '@reduxjs/toolkit';
import { fixtureApi } from '../api/fixtureApi';
import { tableApi } from '../api/tableApi';

export const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fixtureApi.middleware,
      tableApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
