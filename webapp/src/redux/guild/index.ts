import {
  createAsyncThunk,
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import api, {
  getAnalytics as getAnalyticsApi,
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "@/redux/types";
import { settlePromise } from "@/utils/settlePromise";
import { GroupStore } from "@/components/types";

// create group
// get groups

export const sliceName = "groupSlice" as const;

export type RejectValue = {
  reason: "GROUPS_REJECTED";
  error: SerializedError;
};

export const getGroups = generateThunkActionTypes(`${sliceName}/getGroups`);

export const getSingleGroup = generateThunkActionTypes(
  `${sliceName}/getSingleGroup`
);

export const createGroup = generateThunkActionTypes(`${sliceName}/createGroup`);

export const deleteGroup = generateThunkActionTypes(`${sliceName}/deleteGroup`);

export const listenToGroup = generateThunkActionTypes(
  `${sliceName}/listenToGroup`
);

export const createAdmin = generateThunkActionTypes(`${sliceName}/createAdmin`);

/**
 * Check login status action.
 */

export const createGroupAction = createTypedAsyncThunk<
  { createGroupLoading: string },
  void,
  { rejectValue: RejectValue }
>(createGroup.prefix, async (_, { rejectWithValue }) => {
  const result = await settlePromise(getAnalyticsApi());

  if (result.status === "rejected") {
    return rejectWithValue({
      reason: "GROUPS_REJECTED",
      error: miniSerializeError(result.reason),
    });
  }
  return result.value;
});

export const getGroupsAction = createTypedAsyncThunk<
  GroupStore,
  void,
  { rejectValue: RejectValue }
>(getGroups.prefix, async (_, { rejectWithValue }) => {
  const result = await settlePromise(getAnalyticsApi());

  if (result.status === "rejected") {
    return rejectWithValue({
      reason: "GROUPS_REJECTED",
      error: miniSerializeError(result.reason),
    });
  }
  return result.value;
});

// const initialState = {
//   status: "idle",
//   data: {} as UserAnalytics,
//   error: {
//     errorMessage: "",
//     hasError: false,
//   },
// };

type GroupSlice = AsyncStoreSlice<
  GroupStore,
  RejectValue | { error: SerializedError; reason: "UNEXPECTED_ERROR" }
>;

export const groupSlice = createSlice({
  name: sliceName,
  initialState: { createGroupLoading: false } as GroupSlice,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getAnalyticsData.pending, (state, action) => ({
    //   status: "pending",
    // }));

    // builder.addCase(getGroupsAction.fulfilled, (state, action) => ({
    //   postData: action.payload.postData,
    //   sessions: action.payload.sessions,
    //   total: action.payload.total,
    //   userTag: action.payload.userTag,
    //   status: "fulfilled",
    // }));

    builder.addCase(createGroupAction.pending, (state, action) => ({
      ...state,
      createGroupLoading: true,
    }));

    builder.addCase(createGroupAction.fulfilled, (state, action) => ({
      ...state,
      createGroupLoading: false,
    }));

    builder.addCase(createGroupAction.rejected, (state, action) => ({
      ...state,
      error: action.payload?.error.message || "Signup Rejected",
    }));
  },
});

export default groupSlice.reducer;
