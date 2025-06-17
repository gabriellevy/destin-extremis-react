import {Controller, useFormContext} from "react-hook-form";
import {Perso} from "../../types/Perso";
import {FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";
import {getSousProvinces, Province, provinceOptions} from "../../donnees/geographie/provinces";
import {Option} from "../../types/lieux/Lieu";
import {getVilles, SousProvince} from "../../donnees/geographie/sousProvince";
import {Ville} from "../../donnees/geographie/villes";

export default function SelectionLieu() {
    const { control, watch, formState: { errors } } = useFormContext<Perso>();
    const provinceSelectionnee:Province = watch("lieu.province");
    const sousProvinceSelectionnee:SousProvince = watch("lieu.sousProvince");

    return (
        <>
            <Grid2 size={4}>
                <Controller
                    control={control}
                    name="lieu.province"
                    render={({ field }) => (
                        <FormControl margin="normal" error={!!errors.lieu?.province}
                                     fullWidth>
                            <InputLabel>Province</InputLabel>
                            <Select {...field}>
                                {Object.values(provinceOptions).map((provinceOption: Option) => (
                                    <MenuItem value={provinceOption.value} key={provinceOption.value}>
                                        {provinceOption.label}
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
                                {Object.values(getSousProvinces(provinceSelectionnee.toString())).map((sousProvince: SousProvince) => (
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