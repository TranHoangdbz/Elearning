import React from "react";
const Counter = React.lazy(() => import("./features/counter"));
const AuthPageLayout = React.lazy(() =>
  import("./features/auth/AuthPageLayout")
);
const SignInPage = React.lazy(() => import("./features/auth/SignInPage"));
const SignUpPage = React.lazy(() => import("./features/auth/SignUpPage"));
const DemoCourse = React.lazy(() => import("./features/demo-course"));
const publicRoute = [
  {
    path: "/counter",
    name: "Counter",
    element: <Counter />,
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
]

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
