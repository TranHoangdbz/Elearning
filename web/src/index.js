import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./assets/styles";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { createRoot } from "react-dom/client";

import App from "./App";
import GlobalStyles from "./assets/styles";
import ForgotNumberPage from "./features/forgotPassword/pages/sendCode";

const store = configureStore({
    reducer: rootReducer,
});
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotNumberPage />}
                    />
                </Routes>
            </BrowserRouter>
            <App />
        </GlobalStyles>
    </Provider>
);
