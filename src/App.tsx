import './App.css'
import Main from "./Pages/Main";
import PersoContexteProvider from "./contexte/PersoContexte";
import {CssBaseline} from "@mui/material";

function App() {

    return (
        <PersoContexteProvider>
            <CssBaseline />
            <Main />
        </PersoContexteProvider>
    )
}

export default App
