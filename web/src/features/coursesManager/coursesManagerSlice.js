import { PanoramaSharp } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services";
import URL_API from "../../services/API/config"

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (params, thunkAPI) => {
    const response = await API.get(URL_API.URL_GET_ALL_COURSES, params);
    return response.data;
  }
);

export const getLessonsByCourse = createAsyncThunk(
  "courses/getLessonsByCourse",
  async (params, thunkAPI) => {
    console.log(params)
    const response = await API.get(URL_API.URL_GET_LESSONS_BY_COURSE + params);
    return response.data;
  }
);

const coursesManagerSlice = createSlice({
  name: "coursesManager",
  initialState: {
    courses: [],
    lessons: [],
    success: false,
    message: "",
  },
  reducers: {
  },
  extraReducers: {
    [getCourses.pending]: (state) => {
      state.success = false;
      state.message = "";
      state.courses = [];
    },
    [getCourses.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
      state.courses = [];
    },
    [getCourses.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.courses = action.payload.data;
    },
    [getLessonsByCourse.pending]: (state) => {
      state.success = false;
      state.message = "";
      state.lessons = [];
    },
    [getLessonsByCourse.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
      state.lessons = [];
    },
    [getLessonsByCourse.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.lessons = action.payload.data;
    },
  },
});

// export const {} = coursesManagerSlice.actions;
export default coursesManagerSlice.reducer;
