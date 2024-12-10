import { miniSerializeError, type SerializedError } from "@reduxjs/toolkit";
import { createTypedAsyncThunk, generateThunkActionTypes } from "./types";
import { checkLoginStatus } from "./authSlice";

const sliceName = "bootstrap";

/**
 * Bootstrap user action. Gets the login-state of the user, and if logged in
 * get an access token and register the user for incoming calls.
 */
export type BootstrapUserRejectValue =
  | {
    reason: "CHECK_LOGIN_STATUS_REJECTED";
  }
  | {
    reason: "GET_ACCESS_TOKEN_REJECTED";
  }
  | {
    reason: "REGISTER_REJECTED";
  };

export type BootstrapUserFulfillValue = "NOT_LOGGED_IN" | "LOGGED_IN";

export const bootstrapUserActionTypes = generateThunkActionTypes(
  `${sliceName}/user`
);

export const bootstrapUser = createTypedAsyncThunk<
  BootstrapUserFulfillValue,
  void,
  { rejectValue: BootstrapUserRejectValue }
>(bootstrapUserActionTypes.prefix, async (_, { dispatch, rejectWithValue }) => {
  const checkLoginStatusResult = await dispatch(checkLoginStatus());
  console.log('bootstrap user', checkLoginStatusResult)
  if (checkLoginStatus.rejected.match(checkLoginStatusResult)) {
    return rejectWithValue({ reason: "CHECK_LOGIN_STATUS_REJECTED" });
  }
  return "LOGGED_IN";
});

/**
 * Bootstrap proper screen. Navigate to the proper screen depending on
 * application state.
 *
 * For example, navigate to the call invite screen when there are call invites.
 */
// export const bootstrapNavigationActionTypes = generateThunkActionTypes(
//   'bootstrap/navigation',
// );
// export const bootstrapNavigation = createTypedAsyncThunk(
//   bootstrapNavigationActionTypes.prefix,
//   (_, { getState }) => {
//     const state = getState();

//     const navigate = getNavigate();
//     if (typeof navigate === 'undefined') {
//       return;
//     }

//     if (state.voice.call.activeCall.ids.length) {
//       navigate('Call', {});
//       return 'Call';
//     }
//   },
// );
