import {Controller, useFormContext} from "react-hook-form";
import {Perso} from "../../types/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {getRegions, Continent, continentsOptions} from "../../donnees/geographie/continents";
import {Option} from "../../types/lieux/Lieu";
import {getQuartiers, Region} from "../../donnees/geographie/region";
import {Ville} from "../../donnees/geographie/villes";

export default function SelectionLieu() {
    const { control, watch, formState: { errors } } = useFormContext<Perso>();
    const continentSelectionne:Continent = watch("lieu.continent");
    const sousProvinceSelectionnee:Region = watch("lieu.region");

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
                    name="lieu.ville"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.ville}
                                     fullWidth>
                            <InputLabel>Ville</InputLabel>
                            <Select {...field}>
                                {Object.values(getQuartiers(sousProvinceSelectionnee.toString())).map((ville: Ville) => (
                                    <MenuItem value={ville.valueOf()} key={ville.valueOf()}>
                                        {ville.valueOf()}
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