const publicRoute = [

]

const commonRoute = [
    {
        path: "/hoc-khoa-hoc",
        name: "Học khoá học",
        element: <CourseLearning />,
    },
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