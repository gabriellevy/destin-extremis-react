import {Perso} from "../../types/Perso";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {getValeurVertu, getValeurVice, getViceOppose, TypeVertu} from "../../types/ViceVertu";

interface CaracViceVertu {
    perso: Perso,
    typeVertu: TypeVertu,
}

const ViceVertu = ({perso, typeVertu}:CaracViceVertu) => {
    if (getValeurVertu(perso, typeVertu) == 0) {
        return null;
    }
    const typeVice = getViceOppose(typeVertu);
    return (
        <ListItem sx={{padding: '0px',width: "auto"}}>
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        style={{ display: 'inline', fontSize: '13px' }}
                    >
                        { "(" + getValeurVice(perso, typeVice) + ")" + typeVice.toString()}
                    </Typography>
                }
                secondary={
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ display: 'inline', marginLeft: '10px', fontSize: '13px' }}
                    >
                        {typeVertu.toString() + "(" + getValeurVertu(perso, typeVertu) + ")"}
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

export default function AffichageViceVertu ({perso}:CompsProps) {

    return (<List sx={{
        display: "flex",
        flexFlow: "column wrap",
        gap: "0 10px",
        height: 300,
        overflow: "auto"
    }}>
        {
            Object.values(TypeVertu)
                .map(typeVertu => {
                    return (<ViceVertu
                        perso={perso}
                        typeVertu={typeVertu}
                    />);
                })
        }
    </List>);
}