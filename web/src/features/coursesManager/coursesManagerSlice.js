import { PanoramaSharp } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services";
import URL_API from "../../services/API/config";

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async (params, thunkAPI) => {
    const response = await API.get(URL_API.URL_GET_COURSES, params);
    return response.data;
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (params, thunkAPI) => {
    const response = await API.get(URL_API.URL_GET_COURSES + params);
    return response.data;
  }
);

export const getLessonsByCourse = createAsyncThunk(
  "lessons/getLessonsByCourse",
  async (params, thunkAPI) => {
    const response = await API.get(URL_API.URL_GET_LESSONS_BY_COURSE + params);
    return response.data;
  }
);

export const getLessonById = createAsyncThunk(
  "lessons/getLessonById",
  async (params, thunkAPI) => {
    const response = await API.get(URL_API.URL_GET_LESSONS + params);
    console.log(response);
    return response.data;
  }
);

export const createLesson = createAsyncThunk(
  "lessons/createLesson",
  async (params, thunkAPI) => {
    const response = await API.post(URL_API.URL_CREATE_LESSON, params, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const setActiveCourse = createAsyncThunk(
  "course/setActiveCourse",
  async (params, thunkAPI) => {
    const response = await API.put(URL_API.URL_SET_ACTIVE_COURSE + params._id, params);
    return response.data;
  }
);

const coursesManagerSlice = createSlice({
  name: "coursesManager",
  initialState: {
    courses: [],
    lessons: [],
    currentCourse: null,
    currentLesson: null,
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
    [getCourseById.pending]: (state) => {
      state.success = false;
      state.message = "";
      state.currentCourse = null;
    },
    [getCourseById.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
      state.currentCourse = null;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.currentCourse = action.payload.data;
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
    [getLessonById.pending]: (state) => {
      state.success = false;
      state.message = "";
      state.currentLesson = null;
    },
    [getLessonById.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
      state.currentLesson = null;
    },
    [getLessonById.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.currentLesson = action.payload.data;
    },
    [createLesson.pending]: (state) => {
      state.success = false;
      state.message = "";
    },
    [createLesson.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
    },
    [createLesson.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    [setActiveCourse.pending]: (state) => {
      state.success = false;
      state.message = "";
    },
    [setActiveCourse.rejected]: (state, action) => {
      state.success = false;
      state.message = action.payload.message;
    },
    [setActiveCourse.fulfilled]: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
});

// export const {} = coursesManagerSlice.actions;
export default coursesManagerSlice.reducer;
