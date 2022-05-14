import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { createRoot } from "react-dom/client";

import App from "./App";
import GlobalStyles from "./assets/styles";

const store = configureStore({
    reducer: rootReducer,
});
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>
);
