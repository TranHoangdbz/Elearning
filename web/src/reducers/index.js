import { combineReducers } from "redux";
import coursesManager from "../features/coursesManager/coursesManagerSlice";
import courseLearning from "../features/courseLearning/courseLearningSlice";
import resetPassword from "../features/resetPassword/resetPasswordSlice";

const rootReducer = combineReducers({
    coursesManager: coursesManager,
    courseLearning: courseLearning,
    resetPassword,
});

export default rootReducer;