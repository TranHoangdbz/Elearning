import React from "react";

const Counter = React.lazy(() => import("./features/counter"));
const CoursesManagerPage = React.lazy(() => import("./features/coursesManager"))

const publicRoute = [
    {
        path: "/counter",
        name: "Counter",
        element: <Counter />,
    },
];

const commonRoute = [];

const protectedRoute = [];

const managerRoute = [
    {
        path: "/coursesmanager",
        name: "CoursesManager",
        element: <CoursesManagerPage />
    }
];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
