import {Controller, FormProvider, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {Perso, Sexe} from "../../types/perso/Perso";
import SelectionLieu from "./SelectionLieu";
import SelectionStatut from "./SelectionStatut";
import SelectionDates from "./SelectionDates";
import {anneesToJours} from "../../types/Date";
import {d2, d400} from "../../fonctions/des";
import {enfant} from "../../donnees/persos/persos_pregens";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Quartier} from "../../donnees/geographie/quartiers";
import {vaA} from "../../types/lieux/Lieu";
import {getRandomEnumValue, randomStatut} from "../../fonctions/random";
import {Coterie} from "../../types/Coterie";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";

interface CharacterFormProps {
    setAfficherForm: (afficher: boolean) => void;
}

export default function GenPersoForm({ setAfficherForm }: CharacterFormProps) {
    const { setPerso } = useContext(PersoContexte) as PersoContexteType;
    const methods = useForm<Perso>({
        defaultValues: enfant()
    });
    const { reset } = methods;

    const chargerPerso = (persoCharge: Perso) => {
        setPerso({...persoCharge});
        reset({...persoCharge});
        setAfficherForm(false);
    };

    const persoAleatoire = () => {
        const persoAl: Perso = enfant();
        // age aléatoire
        persoAl.age = 10 + Math.floor(Math.random() * 35);
        vaA(persoAl, getRandomEnumValue(Quartier));
        persoAl.coterie = getRandomEnumValue(Coterie);
        persoAl.statut = randomStatut();
        persoAl.sexe = d2() == 1 ? Sexe.femelle : Sexe.male;
        // nom aléatoire
        persoAl.prenom = getPrenom(persoAl.coterie, persoAl.sexe);
        persoAl.nom = getNom(persoAl.coterie, persoAl.sexe);
        persoAl.cognomen = getCognomen(persoAl.coterie, persoAl.sexe);

        reset({...persoAl});
        setAfficherForm(true);
    };

    const soumettrePerso = (data: Perso) => {
        let persoFinal: Perso = {
            ...data,
        }
        // conversions de données après soumission de perso :
        // date en jours est déduite de date en années
        if (data.anneeDeDepart) {
            const dateEnJours: number = anneesToJours(data.anneeDeDepart) + d400()-1;
            persoFinal = {
                ...persoFinal,
                date: dateEnJours,
            }
        }
        // date de naissance est déduite de l'âge
        if (data.age) {
            const dateNaissance: number = persoFinal.date - anneesToJours(data.age) - d400() + 1;
            persoFinal = {
                ...persoFinal,
                dateNaissance: dateNaissance,
            }
        }
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
                        const loadedCharacter = JSON.parse(content) as Perso;
                        methods.reset(loadedCharacter);
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
            <Box component="form" onSubmit={methods.handleSubmit(soumettrePerso)} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
                <FormProvider {...methods}>
                    <Typography variant="h4" gutterBottom>Créer un personnage</Typography>
                    <Grid2 container spacing={1} sx={{ mb: 2 }} columns={12}>
                        <Grid2 size={3}>
                            <Controller
                                name="prenom"
                                control={methods.control}
                                rules={{ required: "Vous devez avoir un prénom" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Praenomen"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="nom"
                                control={methods.control}
                                rules={{ required: "Vous devez avoir un nom" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nomen"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="cognomen"
                                control={methods.control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Cognomen"
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="sexe"
                                control={methods.control}
                                render={({ field }) => (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Sexe</InputLabel>
                                        <Select {...field} label="Sexe">
                                            <MenuItem value={Sexe.male}>{Sexe.male}</MenuItem>
                                            <MenuItem value={Sexe.femelle}>{Sexe.femelle}</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid2>
                        <SelectionLieu />
                        <SelectionStatut />
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
