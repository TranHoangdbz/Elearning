import { createSlice } from '@reduxjs/toolkit'

const courseLearningSlice = createSlice({
    name: 'courseLearning',
    initialState: {
        discussion: []
    },
    reducers: {
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

export const {addComment} = courseLearningSlice.actions;
export default courseLearningSlice.reducer