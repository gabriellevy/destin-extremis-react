import {Box, Button, List, ListItem, ListItemText, Typography} from "@mui/material";
import {calculeAge, joursToAnnees} from "../../types/Date";
import {Carriere} from "../../types/metiers/Metier";
import {Coterie} from "../../types/Coterie";
import {JOURS_PAR_AN} from "../../donnees/dates/calendrier";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {metiersEnum} from "../../donnees/metiers";

export default function DonneesPerso () {
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

    return (<List dense>
        <ListItem>
            <Typography variant="h5" gutterBottom>
                <ListItemText primary={`${perso.prenom} ${perso.nom} ${perso.cognomen}`}
                              secondary={`${calculeAge(perso)} ans`}/>
            </Typography>
        </ListItem>
        {
            Array.from(perso.carrieres).map(([key, value]: [metiersEnum, Carriere]) => {
                return (key && value &&
                    affichageCarriere(value)
                );
            })
        }
        {
            perso.coterie !== Coterie.aucune && (
                <ListItem>
                    <ListItemText primary={perso.coterie}/>
                </ListItem>
            )
        }
        <ListItem>
            <ListItemText primary="Maîtrises" secondary={perso.maitrises.join(', ')}/>
        </ListItem>
        <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" onClick={exporter} size="small">
                Exporter le perso
            </Button>
        </Box>
    </List>);
}