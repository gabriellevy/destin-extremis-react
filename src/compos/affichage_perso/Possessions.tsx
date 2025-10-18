import {List, ListItemText} from "@mui/material";
import React, {JSX, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Possession} from "../../donnees/possessions/Possession";

const Possessions: React.FC = (): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;
    return (
        <>
        <List dense>
            <ListItemText primary={perso.statut.metalStatut} secondary={perso.statut.rang.toString()}/>
            {
                perso.possessions.map((possession: Possession) => (
                    <ListItemText
                        key={possession.possessionEnum + possession.nom}
                        primary={(possession.possessionEnum)}
                        secondary={possession.nom !== undefined && possession.nom !== '' ? `${possession.nom}` : ""}
                    />
                ))
            }
        </List>
            {perso.drogues.length > 0 && (<div>Drogues :</div>)}
        <List dense>
            {
                perso.drogues.map((drogue: string) => (
                    <ListItemText
                        key={drogue}
                        primary={(drogue)}
                    />
                ))
            }
        </List>
        </>
    );
}
export default Possessions;
