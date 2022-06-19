import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

//Set Error message
export const setErrorMessage = createAction(Actions.SET_ERROR_MESSAGE);

//Clear Error message
export const clearErrorMessage = createAction(Actions.CLEAR_ERROR_MESSAGE);
