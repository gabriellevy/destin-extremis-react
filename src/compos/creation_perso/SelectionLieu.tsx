import {Controller, useFormContext} from "react-hook-form";
import {Perso} from "../../types/perso/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {getRegions, Continent, continentsOptions} from "../../donnees/geographie/continents";
import {Option} from "../../types/lieux/Lieu";
import {getQuartiers, Region} from "../../donnees/geographie/regions";
import {Quartier} from "../../donnees/geographie/quartiers";

export default function SelectionLieu() {
    const { control, watch, formState: { errors } } = useFormContext<Perso>();
    const continentSelectionne:Continent|undefined = watch("lieu.continent");
    const region:Region|undefined = watch("lieu.region");

    return (
        <>
            <Grid2 size={4}>
                <Controller
                    control={control}
                    name="lieu.continent"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.continent}
                                     fullWidth>
                            <InputLabel>Continent</InputLabel>
                            <Select {...field}>
                                {Object.values(continentsOptions).map((continentOption: Option) => (
                                    <MenuItem value={continentOption.value} key={continentOption.value}>
                                        {continentOption.label}
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
                    name="lieu.region"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.region}
                                     fullWidth>
                            <InputLabel>Région</InputLabel>
                            <Select {...field}>
                                {Object.values(getRegions(continentSelectionne)).map((region: Region) => (
                                    <MenuItem value={region.valueOf()} key={region.valueOf()}>
                                        {region.valueOf()}
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
                    name="lieu.quartier"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.quartier}
                                     fullWidth>
                            <InputLabel>Quartier</InputLabel>
                            <Select {...field}>
                                {Object.values(getQuartiers(region?.toString())).map((quartier: Quartier) => (
                                    <MenuItem value={quartier.valueOf()} key={quartier.valueOf()}>
                                        {quartier.valueOf()}
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