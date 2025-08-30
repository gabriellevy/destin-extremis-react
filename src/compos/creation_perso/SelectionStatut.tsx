import {Controller, useFormContext} from "react-hook-form";
import {PersoForm} from "../../types/perso/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {metalStatutOptions} from "../../types/statut_social/Statut";
import {Option} from "../../types/lieux/Lieu";
import {metiersEnum} from "../../donnees/metiers";

export default function SelectionStatut() {
    const { control, formState: { errors } } = useFormContext<PersoForm>();

    return (
        <>
            <Grid2 size={4}>
                <Controller
                    control={control}
                    name="metier"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.metier}
                                     fullWidth>
                            <InputLabel>Métier</InputLabel>
                            <Select {...field}>
                                {Object.values(metiersEnum).map((metier: metiersEnum) => (
                                    <MenuItem value={metier} key={metier}>
                                        {metier}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid2>
            <Grid2 size={4}>
                <Controller
                    control={control}
                    name="statut.metalStatut"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.statut?.metalStatut}
                                     fullWidth>
                            <InputLabel>Statut</InputLabel>
                            <Select {...field}>
                                {Object.values(metalStatutOptions).map((metalOption: Option) => (
                                    <MenuItem value={metalOption.value} key={metalOption.value}>
                                        {metalOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid2>
            <Grid2 size={4}>
                <Controller
                    name="statut.rang"
                    control={control}
                    rules={{ required: "Rang de statut obligatoire", min: 0, max: 10 }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Rang de statut"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={!!errors.statut?.rang}
                            helperText={errors.statut?.message}
                        />
                    )}
                />
            </Grid2>
        </>
    );
}