import {
  createAsyncThunk,
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import { match } from "ts-pattern";
import api, {
  checkLoginStatus as checkLoginStatusApi,
  login,
  register,
  checkSignInToken,
} from "@/components/services/Api";
import { createTypedAsyncThunk, generateThunkActionTypes } from "./types";
import { settlePromise } from "@/utils/settlePromise";
import { IProfileType } from "@/components/types";

interface UserDataType {
  status: "idle" | "loading";
}

export const sliceName = "auth" as const;

const initialState = {
  status: "idle",
  user: {} as IProfileType,
  error: {
    errorMessage: "",
    hasError: false,
  },
  resendEmail: false,
  profileStatus: "idle",
};

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData) => {
//     try {
//       const { data } = await api.post("/auth/login", userData);
//       return data;
//     } catch (e) {
//       throw new Error(`Failed with ${e.message}`);
//     }
//   }
// );

export const confirmUser = createAsyncThunk(
  "auth/confirmUser",
  async (token: string) => {
    const { data } = await api.post("/auth/confirmUser", token);
    return data;
  }
);

export type RejectValue = {
  reason: "AUTH_REJECTED";
  error: SerializedError;
};


const initSocket = (url: string) => {
  // Create WebSocket connection.
  const socket = new WebSocket(url);

  // Connection opened
  socket.addEventListener("open", (event) => {
    socket.send("ping");
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
}

/**
 * Check login status action.
 */
export const checkLoginStatusActionTypes = generateThunkActionTypes(
  `${sliceName}/checkLoginStatus`
);
export const checkLoginStatus = createTypedAsyncThunk<
  IProfileType,
  void,
  { rejectValue: RejectValue }
>(checkLoginStatusActionTypes.prefix, async (_, { rejectWithValue }) => {
  const checkLoginStatusResult = await settlePromise(checkLoginStatusApi());
  if (checkLoginStatusResult.status === "rejected") {
    return rejectWithValue({
      reason: "AUTH_REJECTED",
      error: miniSerializeError(checkLoginStatusResult.reason),
    });
  }

  //
  //

  console.log('this is websocket', checkLoginStatusResult.value);
  // if (checkLoginStatusResult.value.ws.url) {
  //   initSocket(checkLoginStatusResult.value.ws.url);
  // }


  // const init_service_worker = await settlePromise();
  return checkLoginStatusResult.value;
});

export const loginUserActionType = generateThunkActionTypes(
  `${sliceName}/loginUser`
);

export const loginUser = createTypedAsyncThunk<
  { token: string },
  { email: string; password: string; credential: any },
  { rejectValue: RejectValue }
>(
  loginUserActionType.prefix,
  async ({ email, password, credential }, { dispatch, rejectWithValue }) => {
    const loginResult = await settlePromise(
      login({ email, password, credential })
    );

    if (loginResult.status === "rejected") {
      return rejectWithValue({
        reason: "AUTH_REJECTED",
        error: miniSerializeError(loginResult.reason),
      });
    }
    localStorage.setItem(
      "login",
      JSON.stringify({
        token: loginResult.value.token,
      })
    );
    const userData = await dispatch(checkLoginStatus());
    return loginResult.value;

    // if (userData === "rejected") return loginResult.value;
  }
);

export const registerUserType = generateThunkActionTypes(
  `${sliceName}/registerUser`
);

export const registerUser = createTypedAsyncThunk<
  void,
  registerUserParams,
  { rejectValue: RejectValue }
>(registerUserType.prefix, async (params, { dispatch, rejectWithValue }) => {
  const signupResult = await settlePromise(register(params));

  if (signupResult.status === "rejected") {
    return rejectWithValue({
      reason: "AUTH_REJECTED",
      error: miniSerializeError(signupResult.reason),
    });
  }
  localStorage.setItem(
    "login",
    JSON.stringify({
      token: signupResult.value.token,
    })
  );
  const userData = await dispatch(checkLoginStatus());
  //return loginResult.value;
});
type registerUserParams = {
  confirmPassword: string;
  email: string;
  password: string;
};
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData) => {
//     // need to hash these things
//     const { background, confirmPassword, email, industry, password, username } =
//       userData || {};

//     const { data } = await api.post("/auth/register", userData);
//     return data;
//   }
// );

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  const { data } = await api.get("/auth/users/");
  return data;
});

export const resendEmail = createAsyncThunk("auth/resendEmail", async () => {
  const { data } = await api.get("/auth/resendConfirmation");
  return data;
});

export const confirmAuthType = generateThunkActionTypes(
  `${sliceName}/confirmAuth`
);

export const confirmAuth = createTypedAsyncThunk<
  void,
  { token: string },
  { rejectValue: RejectValue }
>(registerUserType.prefix, async (params, { dispatch, rejectWithValue }) => {
  const verifyStatus = await settlePromise(checkSignInToken(params));

  if (verifyStatus.status === "rejected") {
    return rejectWithValue({
      reason: "AUTH_REJECTED",
      error: miniSerializeError(verifyStatus.reason),
    });
  }
  const userData = await dispatch(checkLoginStatus());
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      state.status = "idle";
      api.Authorization = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetError: (state, action) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkLoginStatus.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(checkLoginStatus.fulfilled, (state, action) => {
      if (action.payload.status === "incomplete") {

        state.profileStatus = "incomplete";
        state.status = "fulfilled"
        return state;
      }
      if (action.payload.status === "verify") {
        state.profileStatus = "verify";
        return state;
      }
      if (action.payload.status === "token_expired") {
        state.profileStatus = "token_expired";
        state.status = "rejected";
        return state;
      }
      return {
        ...state,
        status: "fulfilled",
        user: {
          ...state.user,
          ...action.payload,
        },
        profileStatus: "fulfilled",
      };
    });
    builder.addCase(checkLoginStatus.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        status: "rejected",
        error: {
          hasError: true,
          errorMessage: action.payload?.error.message || "Login Rejected",
        },
      };
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        status: "rejected",
        error: {
          hasError: true,
          errorMessage: action.payload?.error.message || "Signup Rejected",
        },
      };
    });
  },
});

export default authSlice.reducer;
export const { logout, setUser, resetError } = authSlice.actions;
