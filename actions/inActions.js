import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

/**
 * @desc Set In Loader
 */
export const setInLoader = createAction(Actions.SET_IN_LOADER);
/**
 * @desc Set In Amount
 */
export const setInAmount = createAction(Actions.SET_IN_AMOUNT);

export const clearInData = () => (dispatch) => {
  //   dispatch(setCurrentUser(null));
};
