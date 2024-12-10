
import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import {
  getTrendingPosts,
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "@/redux/types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";

const sliceName = "load" as const;
const initialState = {
  status: "idle",
  skip: 0,
};

export const loadMoreType = generateThunkActionTypes(
  `${sliceName}/loadMore`
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
  //add the filter here
  let misc = {};
  if (filters) {
    Object.assign(misc, filters)
  }
  const queryParams = new URLSearchParams(misc).toString();
  const response = await settlePromise(getTrendingPosts({ filters: queryParams }));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "LOAD_MORE_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});


type LoadMoreSliceType = AsyncStoreSlice<
  {skip: number},
  LoadMoreRejectedType | { error: SerializedError }
>;

export const loadMoreSlice = createSlice({
  name: sliceName,
  initialState: initialState as LoadMoreSliceType,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadMore.pending, (state, action) => ({
      status: "pending",
    }));
    builder.addCase(loadMore.fulfilled, (state, action) => ({
      status: "fulfilled",
    }));
    builder.addCase(loadMore.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
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

export default loadMoreSlice.reducer;
