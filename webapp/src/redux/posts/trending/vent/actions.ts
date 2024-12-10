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
  {},
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

  return response.value;
});

const updateFollowActionType = generateThunkActionTypes('follow');
export type UpdateFollowRejectType =
  | {
    reason: "UPDATE_FOLLOW_FAILED";
    error: SerializedError;
  }
  | {
    reason: "USER_NOT_LOGGED_IN";
    error: SerializedError;
  };

export const updateFollow = createTypedAsyncThunk<
  Boolean,
  { id: string },
  { rejectValue: UpdateFollowRejectType }
>(updateFollowActionType.prefix, async ({ id }, { rejectWithValue }) => {
  const response = await settlePromise(addOrRemoveFollower(id));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_FOLLOW_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
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

export const loadMoreType = generateThunkActionTypes(
  `paginate`
);

type LoadMoreRejectedType = {
  reason: "LOAD_MORE_FAILED";
  error: SerializedError;
};

export const loadMore = createTypedAsyncThunk<
  PostDataType[],
  { filters: any },
  { rejectValue: LoadMoreRejectedType }
>(loadMoreType.prefix, async ({ filters }, { getState, rejectWithValue }) => {
  const response = await settlePromise(getTrendingPosts({ filters }));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "LOAD_MORE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});



