import { combineReducers } from "redux";
import counter from "../features/counter/counterSlice";
import coursesManager from "../features/coursesManager/coursesManagerSlice";

const rootReducer = combineReducers({
  counter: counter,
  coursesManager: coursesManager,
});

export default rootReducer;
