import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

/**
 * @desc Set Transaction Loader
 */
export const setTransactionLoader = createAction(
  Actions.SET_TRANSACTION_LOADER
);
/**
 * @desc Set Transaction Details
 */
export const setTransactionDetails = createAction(
  Actions.SET_TRANSACTION_DETAILS
);

/**
 * @desc Set Contact Transaction
 */
export const setContactTransaction = createAction(
  Actions.SET_CONTACT_TRANSACTION
);
/**
 * @desc Set Global Transaction
 */
export const setGlobalTransaction = createAction(
  Actions.SET_GLOBAL_TRANSACTION
);

/**
 * @desc Set Card Transaction
 */
export const setCardTransaction = createAction(Actions.SET_CARD_TRANSACTION);

export const clearInData = () => (dispatch) => {
  //   dispatch(setCurrentUser(null));
};
