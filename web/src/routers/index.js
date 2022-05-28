import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

import React from "react";

// import page
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
