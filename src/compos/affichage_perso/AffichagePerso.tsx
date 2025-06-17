import {Box, Button, List, ListItem, ListItemText, Typography} from '@mui/material';
import {age, joursToAnnees} from "../../types/Date";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Carriere, metiersEnum} from "../../types/metiers/metiers";
import {JOURS_PAR_AN} from "../../donnees/dates/calendrier";
import Comps from "./Comps";

export default function AffichagePerso() {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    const exporter = () => {
        const persoStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(perso));
        const baliseTelechargement = document.createElement('a');
        baliseTelechargement.setAttribute("href", persoStr);
        baliseTelechargement.setAttribute("download", "character.json");
        document.body.appendChild(baliseTelechargement);
        baliseTelechargement.click();
        baliseTelechargement.remove();
    };

    const affichageCarriere = (carriere: Carriere) => {
        let intituleMetier: string = carriere.metier.intitule(perso, carriere);
        if (carriere.guilde) {
            intituleMetier += ' ('+carriere.guilde+')';
        }
        const dureeCarriere: string = carriere.duree >= JOURS_PAR_AN ?
            `(${joursToAnnees(carriere.duree)} années)` : `(${carriere.duree} jours)`;

        // TODO : afficher niveau de compétence dans ce métier

        return (carriere.metier && carriere.actif &&
            <ListItem>
                <ListItemText primary={intituleMetier} secondary={dureeCarriere}/>
            </ListItem>
        );
    }

    return (
        <Box component="nav" sx={{flexGrow: 1}}>
            <List dense>
                <ListItem>
                    <Typography variant="h5" gutterBottom>
                        <ListItemText primary={`${perso.prenom} ${perso.nom} ${perso.cognomen}`}
                                      secondary={`${age(perso)} ans`}/>
                    </Typography>
                </ListItem>
                {
                    Array.from(perso.carrieres).map(([key, value]: [metiersEnum, Carriere]) => {
                        return (key && value &&
                            affichageCarriere(value)
                        );
                    })
                }
                <ListItem>
                    <ListItemText primary="Maîtrises" secondary={perso.maitrises.join(', ')}/>
                </ListItem>
            </List>
            <Comps perso={perso}/>
            {
                perso.corruption > 0 && (
                    <ListItem>
                        <ListItemText primary="Corruption" secondary={perso.corruption}/>
                    </ListItem>
                )
            }
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={exporter} size="small">
                    Exporter le perso
                </Button>
            </Box>
        </Box>
    );
}
