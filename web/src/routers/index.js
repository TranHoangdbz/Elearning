import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import routes from "../routes";

import React from "react";

// import page
const ExamPage = React.lazy(() => import("../components/exam"));
const SigninSuccess = React.lazy(() => import("../features/auth/pages/SigninSuccess"));
const VerifyAccount = React.lazy(() => import("../features/auth/pages/VerifyAccount"));
const EditCourses = React.lazy(() =>
    import("../features/edit-del-courses/pages/EditCourses")
);
const HomeCourseListPage = React.lazy(() => import("../features/home-course-list/index"));

// waiting
const loading = (
    <div>
        <h1>Loading...</h1>
    </div>
);

const Routers = () => {
    return (
        <React.Suspense fallback={loading}>
            <Routes>
                <Route
                    path="/"
                    name="HomeCourse"
                    element={<HomeCourseListPage />}
                />
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
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
                <Route path="/signinsuccess" element={<div><Outlet/></div>}>
                    <Route path=":token" element={<SigninSuccess />}/>
                </Route>
                <Route path="/user/verify" element={<div><Outlet/></div>}>
                    <Route path=":id" element={<VerifyAccount />}/>
                </Route>
                {routes.commonRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
                {routes.studentRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
                {routes.teacherRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
                {routes.adminRoute.map((route, idx) => {
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={route.element}
                            />
                        )
                    );
                })}
            </Routes>
        </React.Suspense>
    );
};

export default Routers;
