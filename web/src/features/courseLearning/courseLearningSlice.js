import { createSlice } from '@reduxjs/toolkit'

const courseLearningSlice = createSlice({
    name: 'courseLearning',
    initialState: {
        currentCourse : {},
        currentLessonIndex : 0,
        currentUserID: "6295e8c34ed17bd09c765d2e",
        currentUserInfo: {}
    },
    reducers: {
        setCurrentCourse:(state, action) => {
            // console.log("action", action.payload);
            state.currentCourse = action.payload;
        },
        // increase:(state) => {
        //   state.value += 1;
        // },
        // decrease:(state) => {
        //   state.value -= 1;
        // },
        setCurrentUserInfo:(state, action) => {
            state.currentUserInfo = action.payload;
        },
        addComment:(state, action) => {
            console.log("action", action);
            // state.discussion.add()
        },
        changeCurrentLessonIndex: (state, action) => {
            console.log("action", action);
            state.currentLessonIndex = action.payload;
        }
    }
})

export const {
    addComment,
    setCurrentCourse,
    changeCurrentLessonIndex,
    setCurrentUserInfo
} = courseLearningSlice.actions;

export default courseLearningSlice.reducer