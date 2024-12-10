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
} from "./types";
import { settlePromise } from "@/utils/settlePromise";
import { UserAnalytics } from "@/components/types";
import analytics from "@/pages/analytics";

export const sliceName = "userAnalytics" as const;

export type RejectValue = {
  reason: "ANALYTICS_REJECTED";
  error: SerializedError;
};

export const getAnalytics = generateThunkActionTypes(
  `${sliceName}/getAnalytics`
);
/**
 * Check login status action.
 */

export const getAnalyticsData = createTypedAsyncThunk<
  UserAnalytics,
  void,
  { rejectValue: RejectValue }
>(getAnalytics.prefix, async (_, { rejectWithValue }) => {
  const result = await settlePromise(getAnalyticsApi());

  if (result.status === "rejected") {
    return rejectWithValue({
      reason: "ANALYTICS_REJECTED",
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

type AnalyticSlice = AsyncStoreSlice<
  UserAnalytics,
  RejectValue | { error: SerializedError; reason: "UNEXPECTED_ERROR" }
>;

export const analyticSlice = createSlice({
  name: sliceName,
  initialState: { status: "idle" } as AnalyticSlice,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getAnalyticsData.pending, (state, action) => ({
    //   status: "pending",
    // }));

    builder.addCase(getAnalyticsData.fulfilled, (state, action) => ({
      postData: action.payload.postData,
      sessions: action.payload.sessions,
      total: action.payload.total,
      userTag: action.payload.userTag,
      status: "fulfilled",
    }));
  },
});

export default analyticSlice.reducer;
