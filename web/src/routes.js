import React from "react";

const Counter = React.lazy(() => import("./features/counter"));

const publicRoute = [
    {
        path: "/counter",
        name: "Counter",
        element: <Counter />,
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
