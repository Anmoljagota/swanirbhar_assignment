import reducer from "./courses/reducer";
import { reducer as user } from "./users/reducer";
import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
const rootreducer = combineReducers({
  reducer,
  user,
});
const store = legacy_createStore(rootreducer, applyMiddleware(thunk));

export default store;
