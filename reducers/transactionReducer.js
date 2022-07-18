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

const contactTransactionReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CONTACT_TRANSACTION,
});

const transactionReducer = combineReducers({
  loading: transactionLoaderReducer,
  transactionDetail: transactionDetailReducer,
  contactTransaction: contactTransactionReducer,
});

export default transactionReducer;
