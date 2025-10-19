import {Perso} from "../../types/perso/Perso";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {isCompDeBase, TypeCompetence} from "../../types/perso/comps/Comps";
import React, {JSX, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {getValeurCompetence} from "../../fonctions/perso/competences";

interface CaracProps {
    perso: Perso,
    competenceType: TypeCompetence,
}

const Comp = ({perso, competenceType}:CaracProps) => {
    const valeur = getValeurCompetence(perso, competenceType);
    return (
        <ListItem sx={{padding: '0px',width: "auto"}}>
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        style={{ display: 'inline', fontSize: '13px' }}
                    >
                        {
                            valeur < 45 ? "Initié en " + competenceType.toString() :
                                valeur < 55 ? "Expérimenté en " + competenceType.toString() :
                                    valeur < 65 ? "Exceptionnel en " + competenceType.toString() :
                                    "Légendaire en " + competenceType.toString()
                        }
                        {
                            perso.debogue && " (" + valeur + ") "
                        }
                    </Typography>
                }
                sx={{margin: '0px', fontSize: '5px'}}
            />
        </ListItem>
    );
};

const Comps: React.FC = (): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

        return (<List sx={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "0 10px",
            height: 300,
            overflow: "auto"
        }}>
            {
                Object.values(TypeCompetence)
                    .filter((typeComp:TypeCompetence) => getValeurCompetence(perso, typeComp) > 35)
                    .filter((typeComp:TypeCompetence) => isCompDeBase(typeComp))
                    .map((typeComp:TypeCompetence) => {
                    return (<Comp
                        key={typeComp.toString()}
                        perso={perso}
                        competenceType={typeComp}
                    />);
                })
            }
        </List>);
}

export default Comps;
