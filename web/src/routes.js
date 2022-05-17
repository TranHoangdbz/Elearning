import React from "react";
const CourseLearningPage = React.lazy(()=>import("./features/courseLearning"));

const publicRoute = [
    {
        path: "/course-learning",
        name: "Course Learning",
        element: <CourseLearningPage />,
    },
]

const commonRoute = [
    
]

const protectedRoute = [

]

const managerRoute = [

]

const routes = {
    publicRoute,
    protectedRoute,
    commonRoute,
    managerRoute,
};
  
export default routes;