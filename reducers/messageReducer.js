import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import * as Actions from "./../actions/types";

const messageIntialState = {};
const setErrorMessageReducer = createReducerOrig(
  messageIntialState,
  (builder) => {
    builder
      .addCase(
        Actions.SET_ERROR_MESSAGE,
        (state = messageIntialState, action) => {
          return action.payload || {};
        }
      )
      .addCase(
        Actions.CLEAR_ERROR_MESSAGE,
        (state = messageIntialState, action) => {
          return messageIntialState;
        }
      );
  }
);
const messageReducer = combineReducers({
  errorMessage: setErrorMessageReducer,
});

export default messageReducer;
