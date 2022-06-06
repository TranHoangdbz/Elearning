import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import routes from "../routes";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { getCurrentUser } from "../features/auth/auth";

// import page
const ExamPage = React.lazy(() => import("../components/exam"));
const SigninSuccess = React.lazy(() =>
  import("../features/auth/pages/SigninSuccess")
);
const VerifyAccount = React.lazy(() =>
  import("../features/auth/pages/VerifyAccount")
);
const EditCourses = React.lazy(() =>
  import("../features/edit-del-courses/pages/EditCourses")
);
const HomeCourseListPage = React.lazy(() =>
  import("../features/home-course-list/index")
);

// waiting
const loading = (
  <div>
    <h1>Loading...</h1>
  </div>
);

const Routers = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (!user) {
        const { data } = await getCurrentUser();
        dispatch(setUser(data.user));
      }
    };
    getData();
  }, []);

  return (
    <React.Suspense fallback={loading}>
      <Routes>
        <Route path="/" name="HomeCourse" element={<HomeCourseListPage />} />
        <Route
          path="/homeCourseList"
          name="HomeCourse"
          element={<HomeCourseListPage />}
        />
        <Route
          index
          name="HomeCourse"
          element={<Navigate to="homeCourseList" />}
        />
        {routes.publicRoute.map((route, idx) => {
          return (
            route.element && (
              <Route key={idx} path={route.path} element={route.element} />
            )
          );
        })}
        <Route
          path="/signinsuccess"
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          <Route path=":token" element={<SigninSuccess />} />
        </Route>
        <Route
          path="/user/verify"
          element={
            <div>
              <Outlet />
            </div>
          }
        >
          {user && !user.verified && (
            <Route path=":id" element={<VerifyAccount />} />
          )}
        </Route>
        {user &&
          (user.role === "user" || user.role === "admin") &&
          routes.commonRoute.map((route, idx) => {
            return (
              route.element && (
                <Route key={idx} path={route.path} element={route.element} />
              )
            );
          })}
        {user &&
          (user.role === "user" || user.role === "admin") &&
          routes.studentRoute.map((route, idx) => {
            return (
              route.element && (
                <Route key={idx} path={route.path} element={route.element} />
              )
            );
          })}
        {user &&
          (user.role === "user" || user.role === "admin") &&
          routes.teacherRoute.map((route, idx) => {
            return (
              route.element && (
                <Route key={idx} path={route.path} element={route.element} />
              )
            );
          })}
        {user &&
          user.role === "admin" &&
          routes.adminRoute.map((route, idx) => {
            return (
              route.element && (
                <Route key={idx} path={route.path} element={route.element} />
              )
            );
          })}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
