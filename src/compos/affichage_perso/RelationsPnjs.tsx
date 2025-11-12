import {ListItem, ListItemText} from "@mui/material";
import {PNJ} from "../../types/perso/PNJ";
import {JSX, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {descriptionPnj} from "../../fonctions/pnjs/amour";

const RelationsPnjs: React.FC = (): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    return (
        <>
            {
                perso.pnjs.map((pnj:PNJ) => {
                return (<ListItem key={pnj.prenom + pnj.nom}>
                    <ListItemText primary={pnj.prenom} secondary={descriptionPnj(pnj)}/>
                </ListItem>);
            })
            }
        </>
    );
}
export default RelationsPnjs;