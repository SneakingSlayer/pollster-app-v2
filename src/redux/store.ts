import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './services/authServices';
import { pollApi } from './services/pollServices';
import { voteApi } from './services/voteServices';

import authSlice from './slices/authSlice';
import pollSlice from './slices/pollSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [pollApi.reducerPath]: pollApi.reducer,
    [voteApi.reducerPath]: voteApi.reducer,
    polls: pollSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      pollApi.middleware,
      voteApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
