import {List, ListItem, ListItemText} from "@mui/material";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";

export default function InfosMonde() {
    const { perso } = useContext(PersoContexte) as PersoContexteType;
    return (
        <List dense>
            <ListItem>
                <ListItemText
                    primary="Lieu"
                    secondary={perso.lieu.residenceVoyage ?? "En voyage à " + perso.lieu.ville + " (" + perso.lieu.continent + ")"}
                />
            </ListItem>
            { perso.lieu.residenceVoyage &&
                <ListItem>
                    <ListItemText secondary={perso.lieu.residenceVoyage} />
                </ListItem>
            }
        </List>
    );
}