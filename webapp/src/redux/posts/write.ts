import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  addPostData,
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";
import { addPostToWall } from "./trending";
const sliceName = "writePost" as const;
type StateStatusEnum = "idle" | "fulfilled" | "pending" | "rejected";
type StoreType = {
  status: StateStatusEnum,
  postDetails?: PostDataType;
  addPostRedirectUrl?: string;
};

const initialState = {
  status: "idle",
  postDetails: {},
  addPostRedirectUrl: "",
};

export const addPostType = generateThunkActionTypes(`${sliceName}/addPost`);

export type AddPostRejectType = {
  reason: "ADD_POST_FAILED";
  error?: SerializedError;
};
export const addPost = createTypedAsyncThunk<
  PostDataType,
  PostDataType,
  { rejectValue: AddPostRejectType }
>(addPostType.prefix, async (postParam, { rejectWithValue, dispatch }) => {
  const response = await settlePromise(addPostData(postParam));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "ADD_POST_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  dispatch(addPostToWall(response.value));
  return response.value;
});

type WritePostSliceType = AsyncStoreSlice<
  StoreType,
  AddPostRejectType
  | { error: SerializedError }
>;

export const writePostSlice = createSlice({
  name: sliceName,
  initialState: initialState as WritePostSliceType,
  reducers: {
    resetDataWrite: (state, action) => initialState as WritePostSliceType,
  },
  extraReducers: (builder) => {
    builder.addCase(addPost.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(addPost.fulfilled, (_, action) => ({
      status: "fulfilled",
      postDetails: action.payload,
    }));
    builder.addCase(addPost.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
      const output = match(payload)
        .with(
          { reason: "ADD_POST_FAILED" },
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

export default writePostSlice.reducer;

export const {
  resetDataWrite
} = writePostSlice.actions;
