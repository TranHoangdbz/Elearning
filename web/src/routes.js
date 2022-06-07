import React from 'react';

// page
const SignInPage = React.lazy(() => import("./features/auth/pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./features/auth/pages/SignUpPage"));
const DemoCourse = React.lazy(() => import("./features/demo-course"));
const CourseLearningPage = React.lazy(() =>
    import("./features/courseLearning")
);
const ForgotPasswordPage = React.lazy(() =>
    import("./features/forgotPassword")
);
const ResetPasswordPage = React.lazy(() => import("./features/resetPassword"));
const CoursesManagerPage = React.lazy(() => import("./features/coursesManager"))
const EditCourses = React.lazy(() => import("./features/edit-del-courses/pages/EditCourses"))
const AddCourse = React.lazy(()=> import("./features/coursesManager/components/addCourse/AddCourse") )
//router path

export const COURSE_LEARNING = "/course-learning";
export const FORGOT_PASSWORD = "/forgot-password";
export const SIGN_IN = "/sign-in";
export const SIGN_UP = "/sign-up";
export const DEMO = '/demo';
export const RESET_PASSWORD = "/reset-password";
export const EDIT_COURSES = "/edit-courses";
export const VIEW_LESSON = "/coursesmanager/lessondetail/:courseId/:lessonId";
export const ADD_LESSON = "/coursesmanager/addlesson";

const publicRoute = [
    {
        path: COURSE_LEARNING,
        name: "Course Learning",
        element: <CourseLearningPage />,
    },
    {
        path: COURSE_LEARNING + '/:id',
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
    {
        path: EDIT_COURSES,
        name: "Edit courses",
        element: <EditCourses/>
    }
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
        path: ADD_LESSON,
        name: "AddCourse",
        element: <AddCourse />
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

