import { createSlice } from '@reduxjs/toolkit'

const courseLearningSlice = createSlice({
    name: 'courseLearning',
    initialState: {
        currentCourse : {},
        currentLessonIndex : 0,
        currentUserID: "629ccdc9938877ffa6e5f132",
        currentUserInfo: {},
        userLessonIndex: 0,
    },
    reducers: {
        setCurrentCourse:(state, action) => {
            state.currentCourse = action.payload;
        },
        setCurrentUserInfo:(state, action) => {
            state.currentUserInfo = action.payload;
        },
        changeCurrentLessonIndex: (state, action) => {
            // console.log("action", action);
            state.currentLessonIndex = action.payload;
        },
        setUserLessonIndex: (state, action) => {
            state.userLessonIndex = action.payload;
        }
    }
})

export const {
    addComment,
    setCurrentCourse,
    changeCurrentLessonIndex,
    setCurrentUserInfo,
    setUserLessonIndex,
    setUserProgress
} = courseLearningSlice.actions;

export default courseLearningSlice.reducer