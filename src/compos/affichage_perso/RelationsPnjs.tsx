import {Perso} from "../../types/perso/Perso";
import {ListItem, ListItemText} from "@mui/material";
import {PNJ} from "../../types/perso/PNJ";

interface CompsProps {
    perso: Perso,
}

export default function RelationsPnjs ({perso}:CompsProps) {

    return (
            perso.pnjs.map((pnj:PNJ) => {
                return (<ListItem>
                    <ListItemText primary={pnj.prenom} secondary={pnj.amourPourCePnj}/>
                </ListItem>);
            })
        );
}