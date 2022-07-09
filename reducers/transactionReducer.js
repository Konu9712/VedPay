import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const transactionLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_TRANSACTION_LOADER,
});

const transactionDetailReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_TRANSACTION_DETAILS,
});

const transactionReducer = combineReducers({
  loading: transactionLoaderReducer,
  transactionDetail: transactionDetailReducer,
});

export default transactionReducer;
