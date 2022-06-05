import React from "react";

// page
const AuthPageLayout = React.lazy(() =>
    import("./features/auth/AuthPageLayout")
);
const SignInPage = React.lazy(() => import("./features/auth/SignInPage"));
const SignUpPage = React.lazy(() => import("./features/auth/SignUpPage"));
const DemoCourse = React.lazy(() => import("./features/demo-course"));
const CreateQuizz = React.lazy(() => import("./features/create-quizz"));
const CourseLearningPage = React.lazy(() =>
    import("./features/courseLearning")
);
const ForgotPasswordPage = React.lazy(() =>
    import("./features/forgotPassword")
);
const ResetPasswordPage = React.lazy(() => import("./features/resetPassword"));
const CoursesManagerPage = React.lazy(() => import("./features/coursesManager"))
const EditCourses = React.lazy(() => import("./features/edit-del-courses/pages/EditCourses"))

//router path

export const COURSE_LEARNING = "/course-learning";
export const FORGOT_PASSWORD = "/forgot-password";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const DEMO = '/demo';
export const RESET_PASSWORD = "/reset-password";
export const VIEW_LESSON = "/coursesmanager/lessondetail/:courseId/:lessonId";
export const ADD_LESSON = "/coursesmanager/addlesson";
export const CREATE_QUIZZ = "/quizz"

const publicRoute = [
    {
        path: COURSE_LEARNING,
        name: "Course Learning",
        element: <CourseLearningPage />,
    },
    {
        path: FORGOT_PASSWORD,
        name: "Forgot password",
        element: <ForgotPasswordPage />,
    },
    {
        path: SIGN_IN,
        name: "SignIn",
        element: <SignInPage />,
    },
    {
        path: SIGN_UP,
        name: "SignUp",
        element: <SignUpPage />,
    },
    {
        path: DEMO + "/:id",
        name: "Demo Course",
        element: <DemoCourse />,
    },
];

const commonRoute = [];

const studentRoute = [
    {
        path: RESET_PASSWORD,
        name: "Reset password",
        element: <ResetPasswordPage />,
    },
];

const teacherRoute = [
    {
        path: RESET_PASSWORD,
        name: "Reset password",
        element: <ResetPasswordPage />,
    },
];

const adminRoute = [
    {
        path: "/coursesmanager/courseslist",
        name: "CoursesList",
        element: <CoursesManagerPage route="courseslist" />
    },
    {
        path: "/coursesmanager/coursedetail/:id",
        name: "CourseDetail",
        element: <CoursesManagerPage route={"coursedetail"} />
    },
    {
        path: VIEW_LESSON,
        name: "LessonDetail",
        element: <CoursesManagerPage route={"lessondetail"} />
    },
    {
        path: CREATE_QUIZZ,
        name: "CreateQuizz",
        element: <CreateQuizz />
    },
    {
        path: ADD_LESSON,
        name: "AddCourse",
        element: <EditCourses />
    },
];

const routes = {
    publicRoute,
    commonRoute,
    studentRoute,
    teacherRoute,
    adminRoute,
};

export default routes;

