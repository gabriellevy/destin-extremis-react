import '../App.css'
import {CssBaseline} from "@mui/material";
import PersoContexteProvider from "../contexte/PersoContexte";
import Main from "../Pages/Main";
import {Mode} from "../types/Mode";
import {UseFormWatch} from "react-hook-form";
import {ChoixCoterieFormData} from "../ChoixDeCoterie/ChoixDeCoterie";

export interface DestinExtremisProps {
    mode: Mode;
    initPerso?: UseFormWatch<ChoixCoterieFormData>;
}
function DestinExtremis({mode, initPerso}:Readonly<DestinExtremisProps>) {

    return (
        <PersoContexteProvider initPerso={initPerso}>
            <CssBaseline />
            <Main mode={mode} initPerso={initPerso}/>
        </PersoContexteProvider>
    )
}

export default DestinExtremis
