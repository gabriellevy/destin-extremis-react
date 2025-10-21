import React, {Dispatch, SetStateAction} from 'react';
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from 'react-hook-form';
import {Box, Button, Grid2, Typography} from "@mui/material";
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

    const idsSliders: Vice[] = Object.values(Vice) as Vice[];
    const idsBons: Vertu[] = Object.values(Vertu) as Vertu[];

    const sliders: number[] = idsSliders.map(id => watch(`mauvais.${id}`));
    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (_data: ChoixCoterieFormData) => {
        setPhaseDeChoix(PhaseDeChoix.selection_competences);
    };

    return (
        <Box
            sx={{
                backgroundColor: '#FFF9C4', // Fond jaune pâle
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '900px',
                margin: 'auto',
                boxSizing: 'border-box',
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={2} columns={3}>
                    {idsSliders.map((idSlider: Vice, indexSliderAffiche: number) => (
                        <React.Fragment key={idSlider}>
                            <Grid2 alignItems="center" justifyContent="flex-end" size={1}>
                                <Typography textAlign="right">{idSlider}</Typography>
                            </Grid2>
                            <Grid2 alignItems="center" size={1}>
                                <input
                                    type="range"
                                    min={-1}
                                    max={1}
                                    {...register(`mauvais.${idSlider}`, {
                                        validate: (value: number) => {
                                            const newSliders = [...sliders];
                                            newSliders[indexSliderAffiche] = value;
                                            const newTotal = newSliders.reduce((sum, v) => sum + Math.abs(v), 0);
                                            return newTotal <= 10 || 'Vous ne pouvez pas modifier plus de 10 glisseurs. ';
                                        }
                                    })}
                                />
                            </Grid2>
                            <Grid2 size={1}>
                                <Typography sx={{ paddingLeft: '12px' }}>
                                    {idsBons[indexSliderAffiche]}
                                </Typography>
                            </Grid2>
                            <Grid2 alignItems="center" size={3}>
                                <Typography variant="caption" display="block" textAlign="center">
                                    Description courte du slider {idSlider} sur deux lignes max.
                                </Typography>
                            </Grid2>
                        </React.Fragment>
                    ))}
                </Grid2>
                {total > 10 && (
                    <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
                        Vous ne pouvez pas modifier plus de 10 glisseurs et vous en êtes à {total} crans.
                    </Typography>
                )}
                <Grid2 container justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={total > 10}
                        sx={{ mt: 2 }}
                    >
                        Créer le personnage et lancer le jeu
                    </Button>
                </Grid2>
            </form>
        </Box>
    );
};

export default SelectionTraits