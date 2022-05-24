import React from "react";

const Counter = React.lazy(() => import("./features/counter"));
const CoursesManagerPage = React.lazy(() => import("./features/coursesManager"))
const EditCourses = React.lazy(() => import("./features/edit-del-courses/pages/EditCourses"))

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
    {
        path: "/coursesmanager/addcourse",
        name: "AddCourse",
        element: <EditCourses />
    },
];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
