import {
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import { getAsyncToolData } from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "../../types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";

const sliceName = "asyncTool" as const;
type StoreType = {
  asyncToolState?: any;
};

const initialState = {
  status: "idle",
  asyncToolState: {},
};

export const asyncToolDataType = generateThunkActionTypes(
  `${sliceName}/asyncToolDataType`
);

export type AsyncToolRejectType = {
  reason: "ASYNC_TOOL_FAILED";
  error?: SerializedError;
};

export const asyncToolData = createTypedAsyncThunk<
  PostDataType,
  { query: string },
  { rejectValue: AsyncToolRejectType }
>(asyncToolDataType.prefix, async ({ query }, { rejectWithValue }) => {
  const response = await settlePromise(getAsyncToolData(query));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "ASYNC_TOOL_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});

type AsyncToolSliceType = AsyncStoreSlice<
  StoreType,
  AsyncToolRejectType | { error: SerializedError }
>;

export const asyncToolSlice = createSlice({
  name: sliceName,
  initialState: initialState as AsyncToolSliceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncToolData.pending, (_, action) => ({
      status: "pending",
    }));
    builder.addCase(asyncToolData.fulfilled, (_, action) => ({
      status: "fulfilled",
      asyncToolState: action.payload,
    }));
    builder.addCase(asyncToolData.rejected, (_, action) => {
      const { requestStatus } = action.meta;
      const payload = action.payload;
      //@ts-ignore
      const output = match(payload)
        .with(
          { reason: "ASYNC_TOOL_FAILED" },
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

export default asyncToolSlice.reducer;
