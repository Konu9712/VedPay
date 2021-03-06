import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
