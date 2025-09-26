import {getValeurVertu, getValeurVice, getViceOppose, Vertu, Vice} from "../../types/ViceVertu";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {descriptionViceVertus} from "../../fonctions/VicesVertus_fc";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {Perso} from "../../types/perso/Perso";

interface ViceVertuProps {
    perso: Perso,
    typeVice: Vice,
}

const ViceVertu = ({perso, typeVice}:ViceVertuProps) => {
    return (
        <ListItem sx={{padding: '0px',width: "auto"}}>
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        style={
                            {
                                display: 'inline',
                                fontSize: '13px',
                                color: getValeurVice(perso, typeVice) > 0 ? 'red' :'blue'
                            }}
                    >
                        {descriptionViceVertus(perso, typeVice)}
                    </Typography>
                }
                sx={{margin: '0px', fontSize: '5px'}}
            />
        </ListItem>
    );
};

export default function AffichageViceVertu () {
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
                Object.values(Vertu).map((typeVertu: Vertu) => {
                    if (getValeurVertu(perso, typeVertu) != 0) {
                        const typeVice = getViceOppose(typeVertu);
                        return (<ViceVertu
                            key={typeVice.toString()}
                            perso={perso}
                            typeVice={typeVice}
                        />);
                    }
                })
            }
        </List>
    );
}