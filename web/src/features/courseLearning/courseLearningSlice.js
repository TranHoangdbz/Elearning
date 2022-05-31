import { createSlice } from '@reduxjs/toolkit'

const courseLearningSlice = createSlice({
    name: 'courseLearning',
    initialState: {
        currentCourse : {},
        currentLessonIndex : 0,
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
} = courseLearningSlice.actions;

export default courseLearningSlice.reducer