import React from "react";

const CourseLearningPage = React.lazy(()=>import("./features/courseLearning"));
const ForgotPasswordPage = React.lazy(() => import("./features/forgotPassword"))
const ResetPasswordPage = React.lazy(() => import("./features/resetPassword"))

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
];

const commonRoute = [];

const protectedRoute = [
    {
        path: "/reset-password",
        name: "Reset password",
        element: <ResetPasswordPage />,
    },
];

const managerRoute = [];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
