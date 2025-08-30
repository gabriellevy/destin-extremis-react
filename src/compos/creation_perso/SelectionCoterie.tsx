import {Controller, useFormContext} from "react-hook-form";
import {PersoForm} from "../../types/perso/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {Option} from "../../types/lieux/Lieu";
import {coterieOptions} from "../../types/Coterie";

export default function SelectionCoterie() {
    const { control, formState: { errors } } = useFormContext<PersoForm>();

    return (
        <>
            <Grid2 size={12}>
                <Controller
                    control={control}
                    name="coterie"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.coterie}
                                     fullWidth>
                            <InputLabel>Coterie</InputLabel>
                            <Select {...field}>
                                {Object.values(coterieOptions).map((coterie: Option) => (
                                    <MenuItem value={coterie.value} key={coterie.value}>
                                        {coterie.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid2>
        </>
    );
}