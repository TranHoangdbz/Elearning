import React from "react";


const DemoCourse = React.lazy(() => import("./features/demo-course"));

const publicRoute = [
    {
        path: "/demo/:id",
        name: "Demo Course",
        element: <DemoCourse />,
    },
];

const commonRoute = [];

const protectedRoute = [];

const managerRoute = [];

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};

export default routes;
