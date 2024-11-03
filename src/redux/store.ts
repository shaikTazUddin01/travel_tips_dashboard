import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "@/redux/feature/toggle/toggleSlice";
import { baseApi } from "./feature/baseApi/baseApi";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
