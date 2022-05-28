import { combineReducers } from "redux";
import coursesManager from "../features/coursesManager/coursesManagerSlice";

const rootReducer = combineReducers({
  coursesManager: coursesManager,
});

export default rootReducer;