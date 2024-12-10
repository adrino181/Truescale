import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  editPostData,
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../../types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";

const sliceName = "editPost" as const;
type StateStatusEnum = "idle" | "fulfilled" | "pending" | "rejected";
type StoreType = {
  postDetails?: PostDataType;
  editPostStatus?: StateStatusEnum;
  editPostRedirectUrl?: string;
};

const initialState = {
  status: "idle",
  postDetails: {},
  editPostStatus: "idle",
  editPostRedirectUrl: "",
};

export const editPostType = generateThunkActionTypes(`${sliceName}/send`);

export type EditRejectType = {
  reason: "EDIT_POST_FAILED";
  error?: SerializedError;
};
export const editPost = createTypedAsyncThunk<
  PostDataType,
  PostDataType,
  { rejectValue: EditRejectType }
>(editPostType.prefix, async (editParams, { rejectWithValue }) => {
  const response = await settlePromise(editPostData(editParams));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "EDIT_POST_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

type EditPostSliceType = AsyncStoreSlice<
  StoreType,
  EditRejectType
  | { error: SerializedError }
>;

export const Slice = createSlice({
  name: sliceName,
  initialState: initialState as EditPostSliceType,
  reducers: {
    resetData: (state, action) => {
      const param = action.payload.param;
      return {
        ...state,
        [param]: initialState[param],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editPost.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(editPost.fulfilled, (_, action) => ({
      status: "fulfilled",
      editPostStatus: "fulfilled",
      postDetails: action.payload,
    }));
    builder.addCase(editPost.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
      const output = match(payload)
        .with(
          { reason: "EDIT_POST_FAILED" },
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

    builder.addCase(getPostDetails.pending, (_, action) => ({
      status: "pending",
      editPostStatus: "pending",
    }));
    builder.addCase(getPostDetails.fulfilled, (_, action) => ({
      status: "fulfilled",
      postDetails: action.payload,
    }));
    builder.addCase(getPostDetails.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
      const output = match(payload)
        .with(
          { reason: "GET_POST_FAILED" },
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

export default Slice.reducer;
export const { resetData } = Slice.actions;
