import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import { getPersonalPosts as getPersonalPostsApi } from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";

const sliceName = "personalPost" as const;

type StoreType = {
  posts: [PostDataType] | [];
  drafts:[PostDataType],
  saved: [PostDataType],
  liked: [PostDataType],
  commented: [PostDataType],
};

export const getPostsType = generateThunkActionTypes(`${sliceName}/getPersonalPosts`);

export type RejectValue = {
  reason: "GET_POSTS_FAILED";
  error?: SerializedError;
};

export const getPersonalPosts = createTypedAsyncThunk<
  [PostDataType],
  void,
  { rejectValue: RejectValue }
>(getPostsType.prefix, async (_, { rejectWithValue }) => {
  const response = await settlePromise(getPersonalPostsApi());

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "GET_POSTS_FAILED",
      error: miniSerializeError(response.reason),
    });
  }

  return response.value;
});

type PersonalPstSilceType = AsyncStoreSlice<
  StoreType,
  RejectValue | { error: SerializedError }
>;

export const personalPostSlice = createSlice({
  name: "post",
  initialState: { status: "idle" } as PersonalPstSilceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPersonalPosts.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(getPersonalPosts.fulfilled, (_, action) => ({
      status: "fulfilled",
      posts: action.payload,
    }));

    builder.addCase(getPersonalPosts.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      const output = match(payload)
        .with(
          { reason: "FETCH_TRENDING_REJECTED" },
          ({ reason, error }: { reason: string; error: string }) => ({
            status: requestStatus,
            reason,
            error,
          })
        )
        .with(undefined, () => ({
          status: requestStatus,
          error: action.error,
        }))
        .exhaustive();
      return output;
    });
  },
});

export default personalPostSlice.reducer;
