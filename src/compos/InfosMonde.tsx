import {List, ListItem, ListItemText} from "@mui/material";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";

export default function InfosMonde() {
    const { perso } = useContext(PersoContexte) as PersoContexteType;
    return (
        <List dense>
            <ListItem>
                <ListItemText
                    primary={perso.lieu.residenceVoyage != null ?
                        "Voyage en " + perso.lieu.residenceVoyage :
                        "Habite à " + perso.lieu.quartier
                }
                />
            </ListItem>
        </List>
    );
}