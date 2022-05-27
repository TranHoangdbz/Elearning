import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCourses } from "../../mock-up";

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (params, thunkAPI) => {
    const response = await fetchAllCourses();
    return response;
  }
);

const coursesManagerSlice = createSlice({
  name: "coursesManager",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    // getCourses: ({ state, action }) => {
    //   state.data = action.payload;
    // },
  },
  extraReducers: {
    [getCourses.pending]: (state) => {
      state.loading = true;
    },
    [getCourses.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

// export const {} = coursesManagerSlice.actions;
export default coursesManagerSlice.reducer;
