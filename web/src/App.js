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
// import ExamPage from './pages/ExamPage'

// function App() {
//   return (
//     <div>
//       <ExamPage/>
//     </div>
//   );
// }

// export default App;

import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routers from "./routers";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
    );
  }
}

export default App;