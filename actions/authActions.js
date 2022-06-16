import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

/**
 * @desc Set Current User
 */
export const setCurrentUser = createAction(Actions.SET_CURRENT_USER);
// /**
//  * @desc Set Auth Loader
//  */
// export const setAuthLoader = createAction(Actions.SET_AUTH_LOADER);
// /**
//  * @desc Set Auth Loader
//  */
// export const setAuthValidationError = createAction(Actions.SET_AUTH_VALIDATION_ERRORS);
// /**
//  * @desc Set Current User Profile
//  */
// export const setCurrentUserProfile = createAction(Actions.SET_CURRENT_USER_PROFILE);
// /**
//  * @desc Update Current User Profile
//  */
// export const updateCurrentUserProfileFieldValue = createAction(Actions.UPDATE_CURRENT_USER_PROFILE_FIELD_VALUE);
// /**
//  * @desc Clear Auth Data
//  */
export const clearAuthData = () => (dispatch) => {
  dispatch(setCurrentUser(null));
};
