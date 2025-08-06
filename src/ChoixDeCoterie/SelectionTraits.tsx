import React from 'react';
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from 'react-hook-form';
import {Grid2} from "@mui/material";
import {TypeMauvais} from "../types/BonMauvais";

type FormData = {
    [key in TypeMauvais]: number;
};

type SelectionTraitsProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrorsImpl<FormData>;
    watch: UseFormWatch<FormData>;
    handleSubmit: UseFormHandleSubmit<FormData>;
};

const SelectionTraits: React.FC<SelectionTraitsProps> = ({ register, errors, watch, handleSubmit }) => {
    // Exemple d'utilisation de `watch` pour accéder aux valeurs actuelles du formulaire
    // const values = watch();

    const idsSliders: string[] = Object.values(TypeMauvais);
    const sliders = watch(Object.values(TypeMauvais) as Array<TypeMauvais>);

    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Rediriger vers un composant de résultat ou faire autre chose avec les données
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={0} sx={{ mb: 2 }} columns={12}>
                {idsSliders.map((idSlider: string, indexSliderAffiche: number) => (
                    <>
                        <Grid2 size={3}>
                            {idSlider} :
                        </Grid2>
                        <Grid2 size={3}>
                            <input
                                type="range"
                                min="-3"
                                max="3"
                                {...register(idSlider as keyof FormData, {
                                    validate: (value: number) => {
                                        const newTotal = sliders
                                            .map((v, index) => index === indexSliderAffiche ? value : v)
                                            .reduce((sum, v) => sum + Math.abs(v), 0);
                                        return newTotal <= 5 || 'Total des déplacements ne peut pas dépasser 5 crans';
                                    }
                                })}
                            />
                            {errors[idSlider as TypeMauvais] && <p>{errors[idSlider as TypeMauvais]?.message}</p>}
                        </Grid2>
                    </>
                ))}
            </Grid2>
            <p>Total des déplacements: {total}</p>
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};

export default SelectionTraits