import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExamPage from "./features/counter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "cursive"].join(","),
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <ExamPage />
            </div>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;