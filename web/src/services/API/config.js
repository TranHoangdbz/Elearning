// gateway
const URL_SYSTEM_V1 = "http://localhost:32/api";

export default {
  URL_AUTH: URL_SYSTEM_V1 + "/login",
  URL_RESET_PASSWORD: URL_SYSTEM_V1 + "/users/reset-password",
  URL_GET_COURSES: URL_SYSTEM_V1 + "/courses/",
  URL_GET_LESSONS_BY_COURSE: URL_SYSTEM_V1 + "/lessons/courses/",
  URL_GET_LESSONS: URL_SYSTEM_V1 + "/lessons/",
  URL_CREATE_LESSON: URL_SYSTEM_V1 + "/lessons/",
  URL_GET_QUIZ_BY_LESSON_ID: URL_SYSTEM_V1 + "/quizz/lesson/",
  URL_CREATE_QUIZZ: URL_SYSTEM_V1 + "/quizz"
  // some api
};