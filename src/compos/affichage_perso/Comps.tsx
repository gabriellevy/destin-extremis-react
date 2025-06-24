import {Perso} from "../../types/Perso";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {getCompValue, isCompDeBase, TypeCompetence} from "../../types/comps/Comps";

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
                        {getCompValue(perso, competenceType)}
                    </Typography>
                }
                sx={{margin: '0px', fontSize: '5px'}}
            />
        </ListItem>
    );
};

interface CompsProps {
    perso: Perso,
}

export default function Comps ({perso}:CompsProps) {

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