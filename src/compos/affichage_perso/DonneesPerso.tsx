import {Box, Button, Card, CardMedia, List, ListItem, ListItemText, Typography} from "@mui/material";
import {getAge, joursToAnnees, jourStr} from "../../types/Date";
import {Carriere, PhaseProfessionnelle} from "../../types/metiers/Metier";
import {JOURS_PAR_AN} from "../../donnees/dates/calendrier";
import {JSX, useContext, useMemo} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {MetiersEnum, metiersObjs} from "../../donnees/metiers";
import {Perso} from "../../types/perso/Perso";
import {etudie} from "../../fonctions/coteries/etudes";
import {extrairePortrait} from "../../donnees/portraits";

const DonneesPerso: React.FC = (): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    const exporter = () => {
        const persoStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(perso));
        const baliseTelechargement = document.createElement('a');
        baliseTelechargement.setAttribute("href", persoStr);
        baliseTelechargement.setAttribute("download", perso.prenom + " " + perso.nom + ".json");
        document.body.appendChild(baliseTelechargement);
        baliseTelechargement.click();
        baliseTelechargement.remove();
    };

    const affichageEtudes = (perso: Perso) => {
        if (etudie(perso)) {
            return (
                <ListItem key={"études"}>
                    <ListItemText primary={"Étudiant"} secondary={"chez les " + perso.bilanLycee.coterieActuelle}/>
                </ListItem>)
        }
    }

    const affichageCarriere = (carriere: Carriere) => {
        let intituleMetier: string = metiersObjs[carriere.metier].intitule(perso, carriere);
        if (carriere.guilde) {
            intituleMetier += ' ('+carriere.guilde+')';
        }
        const dureeCarriere: string = carriere.duree >= JOURS_PAR_AN ?
            `(${joursToAnnees(carriere.duree)} années)` : `(${carriere.duree} jours)`;

        // TODO : afficher niveau de compétence dans ce métier
        if (carriere.metier === MetiersEnum.non_travailleur && etudie(perso)) {
            return ;
        }

        return (carriere.metier && carriere.actif &&
            <ListItem key={
                carriere.phaseProfessionnelle === PhaseProfessionnelle.etudie ? "Étudiant " : ""
                + intituleMetier
            }>
                <ListItemText primary={intituleMetier} secondary={dureeCarriere}/>
            </ListItem>
        );
    }

    const urlPortrait:string = useMemo(() =>
        extrairePortrait(perso)
    , [perso]);

    return (<List dense>
        <ListItem key={`${perso.prenom} ${perso.nom} ${perso.cognomen}`}>
            <Typography variant="h5" gutterBottom>
                <ListItemText primary={`${perso.prenom} ${perso.nom} ${perso.cognomen}`}
                              secondary={`${getAge(perso)} ans (${jourStr(perso.dateNaissance)})`}/>
            </Typography>
        </ListItem>
        <Card sx={{ maxWidth: 147,
            marginLeft: "30px", }}>
            <CardMedia
                component="img"
                image={urlPortrait}
                alt="Portrait"
                sx={{
                    height: 164,
                    width: 'auto',
                    objectFit: 'cover', // ou 'cover' selon vos besoins
                }}
            />
        </Card>
        {
            perso.carrieres.map((value: Carriere) => {
                return (value &&
                    affichageCarriere(value)
                );
            })
        }
        {
            affichageEtudes(perso)
        }
        <ListItem>
            <ListItemText primary={perso.coterie}/>
        </ListItem>
        <ListItem>
            <ListItemText primary="Religion" secondary={perso.religion}/>
        </ListItem>
        {
            perso.maitrises.length > 0 && (
                <ListItem>
                    <ListItemText primary="Maîtrises" secondary={perso.maitrises.join(', ')}/>
                </ListItem>
            )
        }
        {
            perso.pbDeSante.length > 0 && (
                <ListItem>
                    <ListItemText primary="Blessures" secondary={
                        perso.pbDeSante.map(pbSante => pbSante.nom).join(', ')
                    }/>
                </ListItem>
            )
        }
        {
            perso.nbJoursDHopital > 0 && (
                <ListItem>
                    <ListItemText primary="Jours de convalescence" secondary={
                        perso.nbJoursDHopital
                    }/>
                </ListItem>
            )
        }
        <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" onClick={exporter} size="small">
                Exporter le perso
            </Button>
        </Box>
    </List>);
}
export default DonneesPerso;
