import {ListItem, ListItemText} from "@mui/material";
import {PNJ} from "../../types/perso/PNJ";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {descriptionPnj} from "../../fonctions/pnjs/amour";

export default function RelationsPnjs () {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    return (
            perso.pnjs.map((pnj:PNJ) => {
                return (<ListItem key={pnj.prenom + pnj.nom}>
                    <ListItemText primary={pnj.prenom} secondary={descriptionPnj(pnj)}/>
                </ListItem>);
            })
        );
}