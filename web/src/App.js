import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ForgotNumberPage from './features/forgotPassword';

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "cursive"].join(","),
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="forgot-password"
                        element={<ForgotNumberPage />}
                    />
                </Routes>
            </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
