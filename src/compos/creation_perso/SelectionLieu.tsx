import {Controller, useFormContext} from "react-hook-form";
import {Perso} from "../../types/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {getSousProvinces, Continent, continentsOptions} from "../../donnees/geographie/continents";
import {Option} from "../../types/lieux/Lieu";
import {getVilles, SousProvince} from "../../donnees/geographie/sousProvince";
import {Ville} from "../../donnees/geographie/villes";

export default function SelectionLieu() {
    const { control, watch, formState: { errors } } = useFormContext<Perso>();
    const continentSelectionne:Continent = watch("lieu.continent");
    const sousProvinceSelectionnee:SousProvince = watch("lieu.sousProvince");

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
                    name="lieu.sousProvince"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.sousProvince}
                                     fullWidth>
                            <InputLabel>Sous province</InputLabel>
                            <Select {...field}>
                                {Object.values(getSousProvinces(continentSelectionne.toString())).map((sousProvince: SousProvince) => (
                                    <MenuItem value={sousProvince.valueOf()} key={sousProvince.valueOf()}>
                                        {sousProvince.valueOf()}
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
                                {Object.values(getVilles(sousProvinceSelectionnee.toString())).map((ville: Ville) => (
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