import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExamPage from "./features/counter";

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
        </ThemeProvider>
    );
}

export default App;
