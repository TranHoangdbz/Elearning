import React from "react";

const Counter = React.lazy(() => import("./features/counter"));
const AuthPageLayout = React.lazy(() =>
  import("./features/auth/AuthPageLayout")
);
const SignInPage = React.lazy(() => import("./features/auth/SignInPage"));
const SignUpPage = React.lazy(() => import("./features/auth/SignUpPage"));

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
