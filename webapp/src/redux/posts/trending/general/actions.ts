import {
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";

import api, {
  deletePost as deletePostApi,
  likeOrDislikePost,
  addOrRemoveFollower,
  getTrendingPosts,
} from "@/components/services/Api";

import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "@/redux/types";

import { settlePromise } from "@/utils/settlePromise";

import { PostDataType } from "@/components/types";

export const deletePostType = generateThunkActionTypes(
  `delete`
);

export type DeletePostReject = {
  reason: "DELETE_POST_FAILED";
  error: SerializedError;
};

export const deletePost = createTypedAsyncThunk<
  "SUCESS",
  { id: string },
  { rejectValue: DeletePostReject }
>(deletePostType.prefix, async ({ id }, { rejectWithValue }) => {
  const response = await settlePromise(deletePostApi(id));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "DELETE_POST_FAILED",
      error: miniSerializeError(response.reason),
    });
  }

  return "SUCESS";
});



const updateLikeType = generateThunkActionTypes('like');
export type UpdateLikeRejectType =
  | {
    reason: "UPDATE_LIKE_FAILED";
    error: SerializedError;
  }
  | {
    reason: "USER_NOT_LOGGED_IN";
    error: SerializedError;
  };

export const updateLike = createTypedAsyncThunk<
  Boolean,
  { id: string },
  { rejectValue: UpdateLikeRejectType }
>(updateLikeType.prefix, async ({ id }, { rejectWithValue }) => {
  const response = await settlePromise(likeOrDislikePost(id));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_LIKE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});


