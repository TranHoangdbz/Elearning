import { combineReducers } from "redux";
import coursesManager from "../features/coursesManager/coursesManagerSlice";
import resetPassword from "../features/resetPassword/resetPasswordSlice";

const rootReducer = combineReducers({
  coursesManager: coursesManager,
  resetPassword,
});

export default rootReducer;