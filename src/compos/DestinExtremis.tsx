import '../App.css'
import {CssBaseline} from "@mui/material";
import PersoContexteProvider from "../contexte/PersoContexte";
import Main from "../Pages/Main";

function DestinExtremis() {

    return (
        <PersoContexteProvider>
            <CssBaseline />
            <Main />
        </PersoContexteProvider>
    )
}

export default DestinExtremis
