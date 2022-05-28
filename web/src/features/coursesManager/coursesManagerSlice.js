import { PanoramaSharp } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services";
import URL_API from "../../services/API/config";

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
    console.log(params);
    const response = await API.get(URL_API.URL_GET_LESSONS_BY_COURSE + params);
    return response.data;
  }
);

export const deleteLessonById = createAsyncThunk(
  "courses/deleteLessonById",
  async (id, thunkAPI) => {
    const response = await API.delete(URL_API.URL_UPDATE_LESSON + "/" + id);
    return {
      ...response.data,
      _id: id,
    };
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
  reducers: {},
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
    [deleteLessonById.pending]: (state) => {
      state.success = false;
      state.message = "";
    },
    [deleteLessonById.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
    },
    [deleteLessonById.fulfilled]: (state, action) => {
      if (action.payload.success == true) {
        state.success = true;
        state.message = action.payload.message;
        const newLessons = state.lessons.filter((lesson) => {
          return lesson._id !== action.payload._id;
        });
        state.lessons = newLessons;
      } else {
        state.success = false;
        state.message = action.payload.message;
      }
    },
  },
});

// export const {} = coursesManagerSlice.actions;
export default coursesManagerSlice.reducer;
