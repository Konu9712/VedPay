import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const inLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_IN_LOADER,
});

const inAmountReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_IN_AMOUNT,
});

const inReducer = combineReducers({
  loading: inLoaderReducer,
  inAmount: inAmountReducer,
});

export default inReducer;
