import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const authLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER,
});

const userintialState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};
const currentUserReducer = createReducerOrig(userintialState, (builder) => {
  builder
    .addCase(Actions.SET_CURRENT_USER, (state, action) => {
      const userProfile = { ...state };
      userProfile[action.payload.propsName] = action.payload.value;
      return { ...userProfile };
    })
    .addCase(Actions.UPDATE_CURRENT_USER, (state, action) => {
      const userProfile = { ...state };
      userProfile[action.payload.propsName] = action.payload.value;
      return { ...userProfile };
    });
});

const tokenReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_TOKEN,
});

const authReducer = combineReducers({
  loading: authLoaderReducer,
  currentUser: currentUserReducer,
  token: tokenReducer,
});

export default authReducer;
