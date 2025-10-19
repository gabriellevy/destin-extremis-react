import {Perso} from "../../types/perso/Perso";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {isCompDeBase, TypeCompetence} from "../../types/perso/comps/Comps";
import React, {JSX, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {getValeurCompetence} from "../../fonctions/perso/competences";
import {EmojiEvents, Star} from "@mui/icons-material";

interface CaracProps {
    perso: Perso,
    competenceType: TypeCompetence,
}

const Comp = ({perso, competenceType}:CaracProps) => {
    const valeur = getValeurCompetence(perso, competenceType);

    // Détermine le style et l'icône en fonction de la valeur
    let styleTexte = {};
    let icone = null;

    if (valeur < 35) {
        styleTexte = { color: 'grey', fontStyle: 'italic', fontSize: '13px' };
    } else if (valeur >= 35 && valeur < 45) {
        styleTexte = { color: 'black', fontSize: '13px' };
    } else if (valeur >= 45 && valeur < 55) {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 255, 153, 0.3)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
    } else if (valeur >= 55 && valeur < 65) {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
        icone = <Star fontSize="small" color="warning" sx={{ marginRight: '4px' }} />;
    } else {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 105, 97, 0.2)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
        icone = <EmojiEvents fontSize="small" color="error" sx={{ marginRight: '4px' }} />;
    }

    return (
        <ListItem sx={{ padding: '0px', width: "auto" }}>
            {icone}
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        style={styleTexte}
                    >
                        {
                            valeur < 35 ? "Incompétent en " + competenceType.toString() :
                                valeur < 45 ? "Capable en " + competenceType.toString() :
                                    valeur < 55 ? "Expérimenté en " + competenceType.toString() :
                                        valeur < 65 ? "Exceptionnel en " + competenceType.toString() :
                                        "Légendaire en " + competenceType.toString()
                        }
                        {
                            " (" + valeur + ") "
                        }
                    </Typography>
                }
                sx={{margin: '0px'}}
            />
        </ListItem>
    );
};

const Comps: React.FC = (): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

        return (
            <List sx={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "0 10px",
                height: 300,
                overflow: "auto"
            }}>
                {
                    Object.values(TypeCompetence)
                        .filter((typeComp:TypeCompetence) => isCompDeBase(typeComp))
                        .map((typeComp:TypeCompetence) => {
                        return (
                            <Comp
                                key={typeComp.toString()}
                                perso={perso}
                                competenceType={typeComp}
                            />
                        );
                    })
                }
            </List>
        );
}

export default Comps;
