import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

/**
 * @desc Set Card Loader
 */
export const setCardLoader = createAction(Actions.SET_CARD_LOADER);

/**
 * @desc Add Card
 */
export const addCardAction = createAction(Actions.ADD_CARD);
/**
 * @desc Set Card List
 */
export const setCardList = createAction(Actions.SET_CARD_LIST);
/**
 * @desc Set Selected Card
 */
export const setSelectedCard = createAction(Actions.SET_SELECTED_CARD);

export const clearCardData = () => (dispatch) => {
  //   dispatch(setCurrentUser(null));
};
