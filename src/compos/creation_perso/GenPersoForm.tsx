import {FormProvider, useForm, UseFormReturn} from 'react-hook-form';
import {Box, Button, Grid2, Paper, Typography} from '@mui/material';
import {Perso, PersoForm, PersoHisto, Sexe} from "../../types/perso/Perso";
import SelectionLieu from "./SelectionLieu";
import SelectionCarriereStatut from "./SelectionCarriereStatut";
import SelectionDates from "./SelectionDates";
import {anneesToJours} from "../../types/Date";
import {d400} from "../../fonctions/des";
import {enfant} from "../../donnees/persos/persos_pregens";
import {useContext, useMemo} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Quartier} from "../../donnees/geographie/quartiers";
import {vaA} from "../../types/lieux/Lieu";
import {getRandomEnumValue, randomStatut} from "../../fonctions/random";
import {Coterie} from "../../types/Coterie";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";
import SelectionCoterie from "./SelectionCoterie";
import SelectionNom from "./SelectionNom";
import {
    clonePersoHistoToPersoForm,
    persoFormToPersoHisto,
} from "../../fonctions/perso/conversionsPerso";
import {metierAleatoire} from "../../fonctions/metiers/metiersUtils";
import {Mode, PhaseDExecution} from "../../types/Mode";

interface CharacterFormProps {
    setAfficherForm: (afficher: boolean) => void;
    mode:Mode;
}

export default function GenPersoForm({ setAfficherForm, mode }: CharacterFormProps) {
    const { setPerso } = useContext(PersoContexte) as PersoContexteType;
    const defaultValues: PersoForm = useMemo(() => enfant(false), []);
    const methods: UseFormReturn<PersoForm> = useForm<PersoForm>({ defaultValues });
    const { reset, handleSubmit } = methods;

    const chargerPerso = (persoCharge: PersoHisto) => {
        setPerso(persoCharge);
        reset(clonePersoHistoToPersoForm(persoCharge));
        setAfficherForm(false);
    };

    const persoAleatoire = () => {
        const persoAl: PersoForm = enfant(false);
        // age aléatoire
        persoAl.age = 10 + Math.floor(Math.random() * 35);
        vaA(persoAl, getRandomEnumValue(Quartier));
        persoAl.coterie = getRandomEnumValue(Coterie);
        persoAl.statut = randomStatut();
        //persoAl.sexe = d2() == 1 ? Sexe.femelle : Sexe.male;
        persoAl.sexe = Sexe.male;
        // nom aléatoire
        persoAl.prenom = getPrenom(persoAl.coterie, persoAl.sexe);
        persoAl.nom = getNom(persoAl.coterie, persoAl.sexe);
        persoAl.cognomen = getCognomen(persoAl.coterie, persoAl.sexe);
        persoAl.metier = metierAleatoire(persoAl);
        persoAl.mode = mode;
        persoAl.phaseDExecution = PhaseDExecution.creation;

        reset({...persoAl});
        setAfficherForm(true);
    };

    const soumettrePerso = (persoForm: PersoForm) => {
        let persoFinal: PersoHisto = persoFormToPersoHisto(persoForm);
        // conversions de données après soumission de perso :
        // date en jours est déduite de date en années
        if (persoForm.anneeDeDepart) {
            const dateEnJours: number = anneesToJours(persoForm.anneeDeDepart) + d400()-1;
            persoFinal = {
                ...persoFinal,
                date: dateEnJours,
            }
        }
        // date de naissance est déduite de l'âge
        if (persoForm.age) {
            const dateNaissance: number = persoFinal.date - anneesToJours(persoForm.age) - d400() + 1;
            persoFinal = {
                ...persoFinal,
                dateNaissance: dateNaissance,
            }
        }
        persoFinal.phaseDExecution = PhaseDExecution.histoire;
        setPerso(persoFinal);
        setAfficherForm(false);
    };

    const handleLoadCharacter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                if (typeof content === 'string') {
                    try {
                        const loadedCharacter = JSON.parse(content) as PersoHisto;
                        reset(clonePersoHistoToPersoForm(loadedCharacter));
                        chargerPerso(loadedCharacter);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4, height: '100%', overflowY: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit(soumettrePerso)} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <FormProvider {...methods}>
                    <Typography variant="h4" gutterBottom>Créer un personnage</Typography>
                    <Grid2 container spacing={1} sx={{ mb: 2 }} columns={12}>
                        <SelectionCoterie />
                        <SelectionNom />
                        <SelectionLieu />
                        <SelectionCarriereStatut />
                        <SelectionDates />
                        <Grid2 size={4}>
                            <Button type="submit" variant="contained" color="primary">
                                Commencer
                            </Button>
                        </Grid2>
                        <Grid2 size={4}>
                            <Button
                                component="label"
                                variant="contained"
                                color="secondary"
                            >
                                Charger un personnage
                                <input
                                    type="file"
                                    hidden
                                    accept=".json"
                                    onChange={handleLoadCharacter}
                                />
                            </Button>
                        </Grid2>
                        <Grid2 size={4}>
                            <Button
                                component="label"
                                variant="contained"
                                color="secondary"
                                onClick={persoAleatoire}
                            >
                                Personnage aléatoire
                            </Button>
                        </Grid2>
                    </Grid2>
                </FormProvider>
            </Box>
        </Paper>
    );
}
