import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const outLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_OUT_LOADER,
});

const selectedContactReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SELECTED_CONTACT,
});

const outAmountReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_OUT_AMOUNT,
});

const outReducer = combineReducers({
  loading: outLoaderReducer,
  selectedContact: selectedContactReducer,
  outAmount: outAmountReducer,
});

export default outReducer;
