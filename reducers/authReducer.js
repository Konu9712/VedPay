import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const currentUserReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CURRENT_USER,
});
// const authLoaderReducer = createReducer({
//   initialState: null,
//   actionType: Actions.SET_AUTH_LOADER
// });
// const authValidationErrorReducer = createReducer({
//   initialState: null,
//   actionType: Actions.SET_AUTH_VALIDATION_ERRORS
// });

// const initialState = {};
// const currentuserProfileReducer = createReducerOrig(initialState, (builder) => {
//   builder
//     .addCase(Actions.SET_CURRENT_USER_PROFILE, (state = initialState, action) => {
//       return { ...(action.payload || {}) };
//     })
//     .addCase(Actions.UPDATE_CURRENT_USER_PROFILE_FIELD_VALUE, (state, action) => {
//       const userProfile = { ...state };
//       userProfile[action.payload.propName] = action.payload.value;
//       return { ...userProfile };
//     });
// });

const authReducer = combineReducers({
  currentUser: currentUserReducer,
  //   currentUserProfile: currentuserProfileReducer,
  //   loading: authLoaderReducer,
  //   validationError: authValidationErrorReducer
});

export default authReducer;
