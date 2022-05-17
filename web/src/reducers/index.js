import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";

import React from "react";

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
            </Routes>
        </React.Suspense>
    );
};

export default Routers;
