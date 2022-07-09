import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cardReducer from "./cardReducer";
import inReducer from "./inReducer";
import messageReducer from "./messageReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,
  inReducer: inReducer,
  message: messageReducer,
  transaction: transactionReducer,
});

export default rootReducer;
