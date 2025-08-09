import React, {Dispatch, SetStateAction} from 'react';
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from 'react-hook-form';
import {Grid2, Typography} from "@mui/material";
import {TypeBon, TypeMauvais} from "../types/BonMauvais";
import {ChoixCoterieFormData, PhaseDeChoix} from "./ChoixDeCoterie";

type SelectionTraitsProps = {
    register: UseFormRegister<ChoixCoterieFormData>;
    errors: FieldErrorsImpl<ChoixCoterieFormData>;
    watch: UseFormWatch<ChoixCoterieFormData>;
    handleSubmit: UseFormHandleSubmit<ChoixCoterieFormData>;
    setPhaseDeChoix: Dispatch<SetStateAction<PhaseDeChoix>>;
};

const SelectionTraits: React.FC<SelectionTraitsProps> = ({ register, errors, watch, handleSubmit, setPhaseDeChoix }) => {

    const idsSliders: TypeMauvais[] = Object.values(TypeMauvais);
    const idsBons: string[] = Object.values(TypeBon);

    const sliders: number[] = idsSliders.map(id => watch(`mauvais.${id}`));
    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (_data: ChoixCoterieFormData) => {
        setPhaseDeChoix(PhaseDeChoix.selection_competences);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={0} sx={{ mb: 2 }} columns={16}>
                {idsSliders.map((idSlider: TypeMauvais, indexSliderAffiche: number) => (
                    <React.Fragment key={idSlider}>
                        <Grid2 size={2}>
                            <Typography>
                                {idSlider}
                            </Typography>
                        </Grid2>
                        <Grid2 size={4}>
                            <input
                                type="range"
                                min="-3"
                                max="3"
                                {...register(`mauvais.${idSlider}`, {
                                    validate: (value: number) => {
                                        const newSliders = [...sliders];
                                        newSliders[indexSliderAffiche] = value;
                                        const newTotal = newSliders.reduce((sum, v) => sum + Math.abs(v), 0);
                                        return newTotal <= 5 || 'Total des déplacements ne peut pas dépasser 5 crans';
                                    }
                                })}
                            />
                            {errors.mauvais?.[idSlider] && <p>{errors.mauvais[idSlider]?.message}</p>}
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography>
                                {idsBons[indexSliderAffiche]}
                            </Typography>
                        </Grid2>
                    </React.Fragment>
                ))}
            </Grid2>
            <p>Total des déplacements: {total}</p>
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};

export default SelectionTraits