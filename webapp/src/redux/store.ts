import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { bootstrapUser } from "./bootstrap";
import followSlice from "./followSlice";
import postSlice from "./posts";
import profileSlice from "./profile";
import analyticSlice from "./analyticSlice";
import groupSlice from "./guild";
import uploadSlice from "./upload";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    follow: followSlice,
    profile: profileSlice,
    analytics: analyticSlice,
    group: groupSlice,
    upload: uploadSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
