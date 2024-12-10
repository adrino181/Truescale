import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  getProfileDetail,
  updateProfileDetailApi,
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

export * from './actions';

const sliceName = "profile" as const;

type StoreType = {
  imageUploadLoading?: boolean,
};


const initialState = {
  status: "idle",
  imageUploadLoading: false,
};

export const updateProfileType = generateThunkActionTypes(
  `${sliceName}/updateProfileMedia`
);

export const updateProfileDetailType = generateThunkActionTypes(
  `${sliceName}/updateProfileDetail`
);

export const getProfileType = generateThunkActionTypes(
  `${sliceName}/getProfile`
);

export type UpdateProfileRejectType = {
  reason: "UPDATE_PROFILE_FAILED";
  error?: SerializedError;
};

export type UpdateProfileDetailRejectType = {
  reason: "UPDATE_PROFILE_DETAIL_FAILED";
  error?: SerializedError;
};

export type GetProfileRejectType = {
  reason: "GET_PROFILE_FAILED";
  error?: SerializedError;
};

export const updateProfile = createTypedAsyncThunk<
  IProfileType,
  { _id: string, formData: any },
  { rejectValue: UpdateProfileRejectType }
>(updateProfileType.prefix, async ({ _id, formData }, { rejectWithValue }) => {
  const response = await settlePromise(updateProfileMedia(_id, formData));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_PROFILE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

export const updateProfileDetails = createTypedAsyncThunk<
  IProfileType,
  { _id: string, formData: any },
  { rejectValue: UpdateProfileDetailRejectType }
>(updateProfileDetailType.prefix, async ({ _id, formData }, { rejectWithValue }) => {
  const response = await settlePromise(updateProfileDetailApi(_id, formData));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "UPDATE_PROFILE_DETAIL_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

export const getProfile = createTypedAsyncThunk<
  IProfileType,
  void,
  { rejectValue: GetProfileRejectType }
>(getProfileType.prefix, async (_, { rejectWithValue }) => {
  const response = await settlePromise(getProfileDetail());
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "GET_PROFILE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});


type ProfileSliceType = AsyncStoreSlice<
  StoreType,
  GetProfileRejectType | UpdateProfileDetailRejectType | UpdateProfileRejectType | { error: SerializedError }
>;

export const profileSlice = createSlice({
  name: sliceName,
  initialState: initialState as ProfileSliceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(getProfile.fulfilled, (_, action) => ({
      status: "fulfilled",
      data: action.payload,
    }));
    builder.addCase(getProfile.rejected, (_, action) => {
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

export default profileSlice.reducer;
