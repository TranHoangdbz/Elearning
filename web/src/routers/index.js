import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

import React from "react";

<<<<<<< HEAD
=======
// import page
const ExamPage = React.lazy(() => import("../components/exam"));

>>>>>>> 89ca6c9fa9a17391c407a3b6d30df41478006c34
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
<<<<<<< HEAD
=======
                <Route path="/exam" name="Example" element={<ExamPage />} />
>>>>>>> 89ca6c9fa9a17391c407a3b6d30df41478006c34
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
<<<<<<< HEAD
=======
                {routes.protectedRoute.map((route, idx) => {
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
>>>>>>> 89ca6c9fa9a17391c407a3b6d30df41478006c34
            </Routes>
        </React.Suspense>
    );
};

export default Routers;
