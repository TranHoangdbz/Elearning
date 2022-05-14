import { Route, Routes, Navigate } from "react-router-dom";
// import routes from "../routes.js";
import React from "react";
import { useSelector } from "react-redux";

const CourseLearning = React.lazy(() => import("../components/CourseLearning/CourseLearning"))

const Routers = () => {
    return (
        <React.Suspense>
            <Routes>
                <Route 
                    path="/hoc-khoa-hoc" 
                    name="Học khoá học" 
                    element={<CourseLearning />} 
                />
            </Routes>
        </React.Suspense>
    )
}

export default Routers;

