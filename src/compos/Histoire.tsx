import {JSX, useContext, useEffect, useState} from 'react';
import {EvtExecute} from "../types/Evt";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";
import {Box} from '@mui/material';
import {rejointCoterie} from '../fonctions/coteries/generales';
import EvtsExecutes from "./histoire/EvtsExecutes";
import Compteur from "./histoire/Compteur";

export let demarre:boolean = false; // le destin a été lancé et est en cours

const Histoire: React.FC = (): JSX.Element => {
    const [evtsExecutes, setEvtsExecutes] = useState<EvtExecute[]>([]); // événements déjà exécutés
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    // démarrer la boucle d'événements
    useEffect(() => {
        if (!demarre) {
            demarre = true;
            // applique au perso les effets de sa coterie actuelle :
            rejointCoterie(perso, perso.coterie);
        }
    }, [perso.date, perso.lieu.quartier, perso.secondesEntreChaqueEvt]);

    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <EvtsExecutes
                setEvtsExecutes={setEvtsExecutes}
                evtsExecutes={evtsExecutes}
            />
            <Compteur
                setEvtsExecutes={setEvtsExecutes}
                evtsExecutes={evtsExecutes}
            />
        </Box>
    );
}

export default Histoire;
