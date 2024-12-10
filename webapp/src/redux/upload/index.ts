import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  updateProfileMedia
}
  from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../types";
import { settlePromise } from "@/utils/settlePromise";
import { IProfileType } from "@/components/types";


const sliceName = "media" as const;

const initialState = {
  status: "idle",
};

export const uploadMediaType = generateThunkActionTypes(
  `${sliceName}/updateProfileMedia`
);

export type UpdateMediaRejectType = {
  reason: "UPDATE_PROFILE_FAILED";
  error?: SerializedError;
};


export const uploadData = createTypedAsyncThunk<
  IProfileType,
  { _id: string, formData: FormData },
  { rejectValue: UpdateMediaRejectType }
>(uploadMediaType.prefix, async ({ _id, formData }, { rejectWithValue }) => {
  const response = await settlePromise(updateProfileMedia(_id, formData));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_PROFILE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

type ProfileSliceType = AsyncStoreSlice<
  void,
  UpdateMediaRejectType | { error: SerializedError }
>;

export const uploadSlice = createSlice({
  name: sliceName,
  initialState: initialState as ProfileSliceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadData.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(uploadData.fulfilled, (_, action) => ({
      status: "fulfilled",
      data: action.payload,
    }));
    builder.addCase(uploadData.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
      const output = match(payload)
        .with(
          { reason: "EDIT_PROFILE_FAILED" },
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

export default uploadSlice.reducer;
