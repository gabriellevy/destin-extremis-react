import {useContext, useEffect, useState} from 'react';
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
    const [imageQuartierUrl, setImageQuartierUrl] = useState<string>('https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/quartiers/bois%20de%20boulogne.jpg');
    useEffect(() => {
        if (perso.lieu.quartier && imageQuartier(perso.lieu.quartier) !== '') {
            setImageQuartierUrl(imageQuartier(perso.lieu.quartier));
        }
    }, [perso.lieu.quartier]);

    return (
        <>
            {afficherForm ? (
                <GenPersoForm
                    setAfficherForm={setAfficherForm}
                    mode={mode}
                />
            ) : perso.phaseDExecution === PhaseDExecution.histoire ? (
                <>
                    <Box
                        sx={{
                            backgroundImage: `url(${imageQuartierUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '100vh',
                            width: '100vw',
                            position: 'fixed',
                        }}
                    />
                    <Grid2 container spacing={1} sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid2 size={4}>
                            <Box sx={
                                {
                                    backgroundColor: 'rgba(255, 249, 196, 0.9)',
                                    borderRadius: '8px',
                                    margin: 'auto',
                                    mt: 4,
                                    height: '95vh',
                                    overflowY: 'auto',
                                    position: 'sticky',
                                    top: '2.5vh',
                                    marginLeft: '2.5vh',
                                    marginTop: 0,
                                    maxWidth: '310px',
                                }
                            }>
                                <AffichagePerso />
                            </Box>
                        </Grid2>
                        <Grid2 size={8}>
                            <Histoire />
                        </Grid2>
                    </Grid2>
                </>
            ) : <>
                Vous n'êtes plus dans le formulaire mais pas non plus en mode histoire ?</>}
        </>
    );
}
