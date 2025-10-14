import {useContext, useState} from 'react';
import {Grid2} from '@mui/material';
import GenPersoForm from "../compos/creation_perso/GenPersoForm";
import AffichagePerso from "../compos/affichage_perso/AffichagePerso";
import Histoire from "../compos/Histoire";
import {DestinExtremisProps} from "../compos/DestinExtremis";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";
import {PhaseDExecution} from "../types/Mode";

export default function Main({mode, initPerso}:Readonly<DestinExtremisProps>) {
    const [afficherForm, setAfficherForm] = useState(initPerso === undefined);
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    return (
        <>
            {afficherForm ? (
                <GenPersoForm
                    setAfficherForm={setAfficherForm}
                    mode={mode}
                />
            ) : perso.phaseDExecution === PhaseDExecution.histoire ? (
                <Grid2 container spacing={3} sx={{ height: '100vh', width: '100vw' }}>
                    <Grid2 size={3}>
                        <AffichagePerso />
                    </Grid2>
                    <Grid2 size={9}>
                        <Histoire />
                    </Grid2>
                </Grid2>
            ) : <>
            Vous n'êtes plus dans le formulaire mais pas non plus en mode histoire ?</>}
        </>
    );
}
