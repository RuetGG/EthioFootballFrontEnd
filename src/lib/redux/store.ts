import { configureStore } from '@reduxjs/toolkit';
import { fixtureApi } from '../api/fixtureApi';
import { compareApi } from '../api/compareApi';
import { tableApi } from '../api/tableApi';

export const store = configureStore({
  reducer: {
    [fixtureApi.reducerPath]: fixtureApi.reducer,
    [compareApi.reducerPath]: compareApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fixtureApi.middleware,
      compareApi.middleware,
      tableApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
