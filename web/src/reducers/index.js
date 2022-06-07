import { combineReducers } from "redux";
import coursesManager from "../features/coursesManager/coursesManagerSlice";
import courseLearning from "../features/courseLearning/courseLearningSlice";
import resetPassword from "../features/resetPassword/resetPasswordSlice";
import auth from "../features/auth/authSlice";

const rootReducer = combineReducers({
    coursesManager: coursesManager,
    courseLearning: courseLearning,
    resetPassword,
    auth,
});

export default rootReducer;