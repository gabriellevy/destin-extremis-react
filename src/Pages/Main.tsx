import {useContext, useState} from 'react';
import {Box, Grid2} from '@mui/material';
import GenPersoForm from "../compos/creation_perso/GenPersoForm";
import AffichagePerso from "../compos/affichage_perso/AffichagePerso";
import Histoire from "../compos/Histoire";
import {DestinExtremisProps} from "../compos/DestinExtremis";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";
import {PhaseDExecution} from "../types/Mode";
import {imageQuartier} from "../donnees/geographie/quartiers";

export default function Main({mode, initPerso}:Readonly<DestinExtremisProps>) {
    const [afficherForm, setAfficherForm] = useState(initPerso === undefined);
    const { perso } = useContext(PersoContexte) as PersoContexteType;
    let imageQuartierUrl:string = "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/bois%20de%20boulogne.jpg";
    if (perso.lieu.quartier && imageQuartier(perso.lieu.quartier) !== '') {
        imageQuartierUrl = imageQuartier(perso.lieu.quartier);
    }

    return (
        <>
            {afficherForm ? (
                <GenPersoForm
                    setAfficherForm={setAfficherForm}
                    mode={mode}
                />
            ) : perso.phaseDExecution === PhaseDExecution.histoire ? (
                <Box
                    sx={{
                        backgroundImage: `url(${imageQuartierUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                        width: '100vw',
                        position: 'relative',
                    }}
                >
                    <Grid2 container spacing={3} sx={{ height: '100vh', width: '100vw' }}>
                        <Grid2 size={3}>
                            <Box sx={
                                {
                                    backgroundColor: 'rgba(255, 249, 196, 0.9)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    margin: 'auto',
                                    p: 3,
                                    mt: 4,
                                    height: '100vh',
                                    overflowY: 'auto',
                                    position: 'sticky',
                                    top: 0,
                                    marginTop: 0,
                                }
                            }>
                                <AffichagePerso />
                            </Box>
                        </Grid2>
                        <Grid2 size={9}>
                            <Histoire />
                        </Grid2>
                    </Grid2>
                </Box>
            ) : <>
                Vous n'êtes plus dans le formulaire mais pas non plus en mode histoire ?</>}
        </>
    );
}
