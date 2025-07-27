import {Perso} from "../../types/perso/Perso";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {getValeurCompetence, isCompDeBase, TypeCompetence} from "../../types/perso/comps/Comps";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";

interface CaracProps {
    primaryText: string,
    perso: Perso,
    competenceType: TypeCompetence,
}

const Comp = ({primaryText, perso, competenceType}:CaracProps) => {
    return (
        <ListItem sx={{padding: '0px',width: "auto"}}>
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        style={{ display: 'inline', fontSize: '13px' }}
                    >
                        {primaryText}
                    </Typography>
                }
                secondary={
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ display: 'inline', marginLeft: '10px', fontSize: '13px' }}
                    >
                        {getValeurCompetence(perso, competenceType)}
                    </Typography>
                }
                sx={{margin: '0px', fontSize: '5px'}}
            />
        </ListItem>
    );
};

export default function Comps () {
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
                    .filter(typeComp => isCompDeBase(typeComp))
                    .map(typeComp => {
                    return (<Comp
                        primaryText={typeComp.toString()}
                        perso={perso}
                        competenceType={typeComp}
                    />);
                })
            }
        </List>);
}