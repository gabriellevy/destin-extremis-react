import {List, ListItemText} from "@mui/material";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";

export default function Possessions() {
    const { perso } = useContext(PersoContexte) as PersoContexteType;
    return (
        <>
        <List dense>
            <ListItemText primary={perso.statut.metalStatut} secondary={perso.statut.rang.toString()}/>
            {
                perso.possessions.map((possession: string) => (
                    <ListItemText primary={(possession)}/>
                ))
            }
        </List>
            {perso.drogues.length > 0 && (<div>Drogues :</div>)}
        <List dense>
            {
                perso.drogues.map((drogue: string) => (
                    <ListItemText primary={(drogue)}/>
                ))
            }
        </List>
        </>
    );
}