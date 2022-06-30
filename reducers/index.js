import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cardReducer from "./cardReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,
  message: messageReducer,
});

export default rootReducer;
