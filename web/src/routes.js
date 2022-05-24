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
        path: "/coursesmanager/courseslist",
        name: "CoursesList",
        element: <CoursesManagerPage route="courseslist" />
    },
    {
        path: "/coursesmanager/coursedetail/:id",
        name: "CourseDetail",
        element: <CoursesManagerPage route={"coursedetail"} />
    },
];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
