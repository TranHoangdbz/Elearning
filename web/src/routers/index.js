import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import routes from "../routes";

import React from "react";

// import page
const ExamPage = React.lazy(() => import("../components/exam"));
const SigninSuccess = React.lazy(() => import("../features/auth/SigninSuccess"));
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
                <Route path="/exam" name="Example" element={<ExamPage />} />
                <Route index name="Example" element={<Navigate to="exam" />} />
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
            </Routes>
        </React.Suspense>
    );
};

export default Routers;
