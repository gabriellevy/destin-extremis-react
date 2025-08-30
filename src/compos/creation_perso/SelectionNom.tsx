import {Controller, useFormContext} from "react-hook-form";
import {Perso, Sexe} from "../../types/perso/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select, TextField} from "@mui/material";

export default function SelectionNom() {
    const { control } = useFormContext<Perso>();

    return (
        <>
            <Grid2 size={3}>
                <Controller
                    name="prenom"
                    control={control}
                    rules={{ required: "Vous devez avoir un prénom" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Prénom"
                            margin="normal"
                            fullWidth
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Controller
                    name="nom"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nom"
                            margin="normal"
                            fullWidth
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Controller
                    name="cognomen"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Surnom"
                            margin="normal"
                            fullWidth
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Controller
                    name="sexe"
                    control={control}
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
        </>
    );
}