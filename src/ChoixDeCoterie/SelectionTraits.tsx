import React, {Dispatch, SetStateAction} from 'react';
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from 'react-hook-form';
import {Grid2, Typography} from "@mui/material";
import {Vertu, Vice} from "../types/ViceVertu";
import {ChoixCoterieFormData, PhaseDeChoix} from "./ChoixDeCoterie";

type SelectionTraitsProps = {
    register: UseFormRegister<ChoixCoterieFormData>;
    errors: FieldErrorsImpl<ChoixCoterieFormData>;
    watch: UseFormWatch<ChoixCoterieFormData>;
    handleSubmit: UseFormHandleSubmit<ChoixCoterieFormData>;
    setPhaseDeChoix: Dispatch<SetStateAction<PhaseDeChoix>>;
};

const SelectionTraits: React.FC<SelectionTraitsProps> = ({ register, errors, watch, handleSubmit, setPhaseDeChoix }) => {

    const idsSliders: Vice[] = Object.values(Vice);
    const idsBons: string[] = Object.values(Vertu);

    const sliders: number[] = idsSliders.map(id => watch(`mauvais.${id}`));
    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (_data: ChoixCoterieFormData) => {
        setPhaseDeChoix(PhaseDeChoix.selection_competences);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={1} sx={{ mb: 5 }} columns={16}>
                {idsSliders.map((idSlider: Vice, indexSliderAffiche: number) => (
                    <React.Fragment key={idSlider}>
                        <Grid2 size={2}>
                            <Typography textAlign="right">
                                {idSlider}
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
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
                            <Typography sx={{ paddingLeft: '12px' }}>
                                {idsBons[indexSliderAffiche]}
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
                        </Grid2>
                    </React.Fragment>
                ))}
            </Grid2>
            {total >=5 &&(
                <Typography color="error">Vous n'avez droit qu'à 5 crans de curseur déplacé et vous en êtes à {total} crans.</Typography>
            )}
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};

export default SelectionTraits