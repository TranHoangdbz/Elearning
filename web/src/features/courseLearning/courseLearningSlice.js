import { createSlice } from '@reduxjs/toolkit'

const courseLearningSlice = createSlice({
    name: 'courseLearning',
    initialState: {
        currentCourse : {},
        currentLessons : {},
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
        }
    }
})

export const {
    addComment,
    setCurrentCourse
} = courseLearningSlice.actions;

export default courseLearningSlice.reducer