
import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  getPost,
  getPostComment,
  addComment
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../types";
import { settlePromise } from "@/utils/settlePromise";
import { IComment, PostDataType, ICommentAdd } from "@/components/types";

const sliceName = "getPost" as const;
type StoreType = {
  postDetails?: PostDataType;
};

const initialState = {
  status: "idle",
  postDetails: {},
};

export const postDetailActionType = generateThunkActionTypes(`${sliceName}/get`);


export type GetPostRejectType = {
  reason: 'GET_POST_FAILED', error: SerializedError,
};


export const getPostDetails = createTypedAsyncThunk<
  PostDataType,
  { id: string },
  { rejectValue: GetPostRejectType }
>(postDetailActionType.prefix, async ({ id }, { rejectWithValue }) => {
  const response = await settlePromise(getPost(id));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "GET_POST_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

export const getCommentsActionType = generateThunkActionTypes(`${sliceName}/getComments`);


export type GetCommentsType = {
  reason: 'GET_COMMENTS_FAILED', error: SerializedError,
};


export const getComments = createTypedAsyncThunk<
  IComment,
  { id: string },
  { rejectValue: GetCommentsType }
>(getCommentsActionType.prefix, async ({ id }, { rejectWithValue }) => {
  const response = await settlePromise(getPostComment(id));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "GET_COMMENTS_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

export type AddCommentRejectType = {
  reason: 'ADD_COMMENT_FAILED', error: SerializedError,
};


export const addCommentActionType = generateThunkActionTypes(`${sliceName}/addComment`);

export const addCommentAction = createTypedAsyncThunk<
  IComment,
  ICommentAdd,
  { rejectValue: AddCommentRejectType }
>(addCommentActionType.prefix, async (params, { rejectWithValue }) => {
  const response = await settlePromise(addComment(params));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "ADD_COMMENT_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});


//
// type GetPostSliceType = AsyncStoreSlice<
//   StoreType,
//   GetPostRejectType
//   | { error: SerializedError }
// >;
//
// export const Slice = createSlice({
//   name: sliceName,
//   initialState: initialState as GetPostSliceType, reducers: {
//     resetData: (state, action) => {
//       const param = action.payload.param;
//       return {
//         ...state,
//         [param]: initialState[param],
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getPostDetails.pending, (_, action) => ({
//       status: "pending",
//     }));
//     builder.addCase(getPostDetails.fulfilled, (_, action) => ({
//       status: "fulfilled",
//       postDetails: action.payload,
//     }));
//     builder.addCase(getPostDetails.rejected, (_, action) => {
//       const { requestStatus } = action.meta; const payload = action.payload;
//       //@ts-ignore
//       const output = match(payload)
//         .with(
//           { reason: "GET_POST_FAILED" },
//           ({ reason, error }: { reason: string; error: string }) => ({
//             status: requestStatus,
//             reason,
//             error,
//           })
//         )
//         .with(undefined, () => ({
//           status: requestStatus,
//           error: action.error,
//         }))
//         .exhaustive();
//       return output;
//     });
//   },
// });
//
// export default Slice.reducer;
// export const { resetData } = Slice.actions;
