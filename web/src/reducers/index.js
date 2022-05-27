import { combineReducers } from "redux";
import coursesManager from "../features/coursesManager/coursesManagerSlice";
import courseLearning from "../features/courseLearning/courseLearningSlice";

const rootReducer = combineReducers({
    coursesManager: coursesManager,
    courseLearning: courseLearning,
});

export default rootReducer;