import React, {Dispatch, SetStateAction} from 'react';
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from 'react-hook-form';
import {Grid2} from "@mui/material";
import {TypeMauvais} from "../types/BonMauvais";
import {PhaseDeChoix} from "./ChoixDeCoterie";

type FormData = {
    [key in TypeMauvais]: number;
};

type SelectionTraitsProps = {
    register: UseFormRegister<FormData>;
    errors: FieldErrorsImpl<FormData>;
    watch: UseFormWatch<FormData>;
    handleSubmit: UseFormHandleSubmit<FormData>;
    setPhaseDeChoix: Dispatch<SetStateAction<PhaseDeChoix>>;
};

const SelectionTraits: React.FC<SelectionTraitsProps> = ({ register, errors, watch, handleSubmit, setPhaseDeChoix }) => {

    const idsSliders: string[] = Object.values(TypeMauvais);
    const sliders = watch(Object.values(TypeMauvais) as Array<TypeMauvais>);

    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (_data: FormData) => {
        setPhaseDeChoix(PhaseDeChoix.resultat);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={0} sx={{ mb: 2 }} columns={12}>
                {idsSliders.map((idSlider: string, indexSliderAffiche: number) => (
                    <li key={indexSliderAffiche}>
                        <Grid2 size={3}>
                            {idSlider}
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
                    </li>
                ))}
            </Grid2>
            <p>Total des déplacements: {total}</p>
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};

export default SelectionTraits