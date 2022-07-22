import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";

const cardLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_CARD_LOADER,
});

const addCardintialState = {
  cardNumner: "",
  cvv: "",
  expiry: "",
  name: "",
  type: "",
};

const addCardReducer = createReducerOrig(addCardintialState, (builder) => {
  builder.addCase(Actions.ADD_CARD, (state, action) => {
    let cardDetails = { ...state };
    cardDetails = action.payload;
    return { ...cardDetails };
  });
});

const cardListIntialState = [];
const setCardListReducer = createReducerOrig(cardListIntialState, (builder) => {
  builder.addCase(Actions.SET_CARD_LIST, (state, action) => {
    let cardList = [...state];
    cardList = action.payload;
    return [...cardList];
  });
});

const selectedCardReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SELECTED_CARD,
});

const cardStatsReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CARD_STATS,
});

const cardReducer = combineReducers({
  addCard: addCardReducer,
  loading: cardLoaderReducer,
  cardList: setCardListReducer,
  selectedCard: selectedCardReducer,
  cardStats: cardStatsReducer,
});

export default cardReducer;
