import {useState} from 'react';
import {Paper, Grid2} from '@mui/material';
import GenPersoForm from "../compos/creation_perso/GenPersoForm";
import AffichagePerso from "../compos/affichage_perso/AffichagePerso";
import Histoire from "../compos/Histoire";

export default function Main() {
    const [afficherForm, setAfficherForm] = useState(true);

    return (
        <>
            {afficherForm ? (
                <GenPersoForm
                    setAfficherForm={setAfficherForm}
                />
            ) : (
                <Grid2 container spacing={3} sx={{ height: '100vh', width: '100vw' }}>
                    <Grid2 size={4}>
                        <Paper elevation={3} sx={
                            {
                                p: 3,
                                mt: 4,
                                height: '100vh',
                                overflowY: 'auto',
                                position: 'sticky',
                                top: 0,
                                marginTop: 0,
                                padding: '0px',
                            }
                        }>
                            <AffichagePerso />
                        </Paper>
                    </Grid2>
                    <Grid2 size={8}>
                        <Paper elevation={3} sx={
                            { p: 3, mt: 4, height: '100vh', overflowY: 'auto', marginTop: 0 }
                        }>
                            <Histoire />
                        </Paper>
                    </Grid2>
                </Grid2>
            )}
        </>
    );
}
