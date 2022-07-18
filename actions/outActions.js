import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

/**
 * @desc Set Out Loader
 */
export const setOutLoader = createAction(Actions.SET_OUT_LOADER);
/**
 * @desc Set selected Contact
 */
export const setSelectedContact = createAction(Actions.SET_SELECTED_CONTACT);

/**
 * @desc Set out amount
 */
export const setOutAmount = createAction(Actions.SET_OUT_AMOUNT);

export const clearInData = () => (dispatch) => {
  //   dispatch(setCurrentUser(null));
};
