import React from "react";
const AuthPageLayout = React.lazy(() =>
    import("./features/auth/AuthPageLayout")
);
const SignInPage = React.lazy(() => import("./features/auth/SignInPage"));
const SignUpPage = React.lazy(() => import("./features/auth/SignUpPage"));
const DemoCourse = React.lazy(() => import("./features/demo-course"));
const CourseLearningPage = React.lazy(() =>
    import("./features/courseLearning")
);
const ForgotPasswordPage = React.lazy(() =>
    import("./features/forgotPassword")
);
const ResetPasswordPage = React.lazy(() => import("./features/resetPassword"));

const publicRoute = [
    {
        path: "/course-learning",
        name: "Course Learning",
        element: <CourseLearningPage />,
    },
    {
        path: "/forgot-password",
        name: "Forgot password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/signin",
        name: "SignIn",
        element: <SignInPage />,
    },
    {
        path: "/signup",
        name: "SignUp",
        element: <SignUpPage />,
    },
    {
        path: "/demo/:id",
        name: "Demo Course",
        element: <DemoCourse />,
    },
];

const commonRoute = [];

const studentRoute = [
    {
        path: "/reset-password",
        name: "Reset password",
        element: <ResetPasswordPage />,
    },
];

const teacherRoute = [
    {
        path: "/reset-password",
        name: "Reset password",
        element: <ResetPasswordPage />,
    },
];

const adminRoute = [];

const routes = {
    publicRoute,
    commonRoute,
    studentRoute,
    teacherRoute,
    adminRoute
};

export default routes;
