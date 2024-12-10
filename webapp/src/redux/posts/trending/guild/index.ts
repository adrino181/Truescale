import {
  createSlice,
  miniSerializeError,
  type SerializedError,
  current,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import api, {
  getTrendingPosts,
} from "@/components/services/Api";
import {
  createTypedAsyncThunk,
  generateThunkActionTypes,
  AsyncStoreSlice,
} from "@/redux/types";
import { settlePromise } from "@/utils/settlePromise";
import { PostDataType } from "@/components/types";
import { loadMore } from "./actions"
const sliceName = "guild" as const;
type statusEnum = "idle" | "pending" | "fulfilled" | "rejected";
type StoreType = {
  trending: PostDataType[];
  status: statusEnum;
};
const initialState = {
  status: "idle",
  trending: [],
};

export const getTrendingType = generateThunkActionTypes(
  `${sliceName}/getTrending`
);

export type RejectValue = {
  reason: "FETCH_TRENDING_REJECTED";
  error?: SerializedError;
};

export const getTrending = createTypedAsyncThunk<
  PostDataType[],
  { filters: any },
  { rejectValue: RejectValue }
>(getTrendingType.prefix, async ({ filters }, { rejectWithValue }) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await settlePromise(getTrendingPosts({ filters: queryParams }));

  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "FETCH_TRENDING_REJECTED",
      error: miniSerializeError(response.reason),
    });
  }

  return response.value;
});

type FilterFailed = {
  reason: "FILTER_FAILED";
  error: SerializedError;
};

export const filter = createTypedAsyncThunk<
  PostDataType[],
  { filters: string },
  { rejectValue: FilterFailed }
>(getTrendingType.prefix, async ({ filters }, { rejectWithValue }) => {
  //add the filter here
  const response = await settlePromise(getTrendingPosts({ filters }));
  if (response.status === "rejected") {
    return rejectWithValue({
      reason: "FILTER_FAILED",
      error: miniSerializeError(response.reason),
    });
  }
  return response.value;
});


export const loadMoreTrending = generateThunkActionTypes(
  `${sliceName}/loadMore`
);

type LoadMoreRejectedType = {
  reason: "LOAD_MORE_FAILED";
};

export const loadMoreAction = createTypedAsyncThunk<
  PostDataType[],
  { filters: any },
  { rejectValue: LoadMoreRejectedType }
>(loadMoreTrending.prefix, async ({ filters }, { getState, dispatch, rejectWithValue }) => {
  // const isTrendingLoaded = getState().post.trending.general.trending.status === "fulfilled";
  // if (!isTrendingLoaded) {
  //   return rejectWithValue({
  //     reason: "LOAD_MORE_FAILED",
  //   });
  // }
  const response = await dispatch(loadMore({ filters }));
  if (loadMore.rejected.match(response)) {
    return rejectWithValue({ reason: "LOAD_MORE_FAILED" });
  }
  return response.payload;
});

type TrendingSliceType = AsyncStoreSlice<
  StoreType,
  RejectValue | { error: SerializedError }
>;

export const guildSlice = createSlice({
  name: sliceName,
  initialState: initialState as TrendingSliceType,
  reducers: {
    resetData: (state, action) => { },
    updateLikeTrending: (state, action) => {
      if (state.status === "fulfilled") {
        const index = state.trending.findIndex(
          (post) => post._id === action.payload.id
        );
        state.trending[index].isLiked = !state.trending[index].isLiked;
        if (state.trending[index].isLiked) {
          state.trending[index].likesCount =
            state.trending[index].likesCount + 1;
        } else {
          state.trending[index].likesCount =
            state.trending[index].likesCount - 1;
        }
      }
    },
    deletePostGeneral: (state, action) => {
      if (state.status === "fulfilled") {
        //need to check for state of trending here 
        state.trending = state.trending.filter(
          (post) => post._id !== action.payload
        );
      }
    },
    followAuthorGeneral: (state, action) => {
      if (state.status === "fulfilled") {
        const index = state.trending.findIndex(
          (post) => post._id === action.payload.id
        );
        state.trending[index].author.isListening = !state.trending[index].author.isListening;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state, action) => ({
      status: "pending",
    }));
    builder.addCase(getTrending.fulfilled, (state, action) => ({
      trending: action.payload,
      status: "fulfilled",
    }));
    builder.addCase(getTrending.rejected, (_, action) => {
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

    builder.addCase(loadMoreAction.fulfilled, (state, action) => {
      return ({
        ...state,
        //@ts-ignore
        trending: [...state.trending, ...action.payload],
      })
    });
    builder.addCase(loadMoreAction.rejected, (_, action) => {
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

export default guildSlice.reducer;
export const { resetData, updateLikeTrending, deletePostGeneral, followAuthorGeneral } = guildSlice.actions;
