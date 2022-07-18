import { combineReducers } from "redux";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { createReducer } from "../helper/reduxHelper";
import * as Actions from "./../actions/types";
import { getData } from "../services/localStorageService";

const authLoaderReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_AUTH_LOADER,
});

const userintialState = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
};
const currentUserReducer = createReducerOrig(userintialState, (builder) => {
  builder
    .addCase(Actions.SET_CURRENT_USER, (state, action) => {
      const userProfile = { ...state };
      userProfile[action.payload.propsName] = action.payload.value;
      return { ...userProfile };
    })
    .addCase(Actions.UPDATE_CURRENT_USER, (state, action) => {
      return action?.payload;
    });
});

const tokenReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_TOKEN,
});

const totalBalanceReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_TOTAL_BALANCE,
});

// const contactsReducer = createReducer({
//   initialState: null,
//   actionType: Actions.SET_CONTACTS,
// });

const contactIntialState = [];
const contactsReducer = createReducerOrig(contactIntialState, (builder) => {
  builder.addCase(Actions.SET_CONTACTS, (state, action) => {
    const userProfile = { ...state };
    const contactList = action.payload;
    const payload = { contactNumbers: [] };
    contactList.forEach((contact, index) => {
      if (contact.phoneNumbers && index < 1000) {
        let number = contact?.phoneNumbers[0]?.number;
        number = number.replace("-", "");
        number = number.replace(" ", "");
        number = number.replace(/\s/, "");
        number = number.replace("+91", "");
        number = number.replace("-", "");
        if (number.length === 10) {
          payload.contactNumbers.push({ phoneNumber: String(number) });
        }
      }
    });
    return payload;
  });
});

const vedPayUsersReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_VEDPAY_USERS,
});

const authReducer = combineReducers({
  loading: authLoaderReducer,
  currentUser: currentUserReducer,
  token: tokenReducer,
  totalBalance: totalBalanceReducer,
  allContacts: contactsReducer,
  vedPayUsers: vedPayUsersReducer,
});

export default authReducer;
