import {
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
} from "../types";
import { settlePromise } from "@/utils/settlePromise";
import { IProfileType } from "@/components/types";
import { checkLoginStatus } from "@/redux/authSlice"
import api, { createProfile, addOrRemoveFollower } from "@/components/services/Api"
const sliceName = "profile" as const;

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
  { id: string, follow: boolean },
  { rejectValue: UpdateFollowRejectType }
>(updateFollowActionType.prefix, async (params, { rejectWithValue }) => {
  const response = await settlePromise(addOrRemoveFollower(params));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_FOLLOW_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value === "SUCCESS";
});

export const createProfileAndLoginPrefix = generateThunkActionTypes(
  `${sliceName}/createProfile`
);

export type CreateProfileRejectType = {
  reason: "CREATE_PROFILE_LOGIN_FAILED";
  error: SerializedError;
};

export const createProfileAndLogin = createTypedAsyncThunk<
  string,
  IProfileType,
  { rejectValue: CreateProfileRejectType }
>(
  createProfileAndLoginPrefix.prefix,
  async (params, { dispatch, rejectWithValue }) => {
    const createProfileResult = await settlePromise(createProfile(params));
    if (createProfileResult.status === "rejected") {
      return rejectWithValue({
        reason: "CREATE_PROFILE_LOGIN_FAILED",
        error: miniSerializeError(createProfileResult.reason),
      });
    }
    const token = createProfileResult.value;
    localStorage.setItem("login", JSON.stringify({ token }));
    api.Authorization = token;
    if (token) {
      dispatch(checkLoginStatus());
    }
    return 'SUCCESS';
  }
);

