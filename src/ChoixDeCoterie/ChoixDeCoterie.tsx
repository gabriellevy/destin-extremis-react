import React from 'react';
import { useForm } from 'react-hook-form';
import {Grid2} from "@mui/material";

type FormData = {
    colerique: number;
    aventureux: number;
    lache: number;
    naturaliste: number;
    trompeur: number;
    paresseux: number;
    luxurieux: number;
    gourmand: number;
    cupide: number;
    cruel: number;
    envieux: number;
    orgueilleux: number;
    solitaire: number;
    sociopathique: number;
    rebelle: number;
};

const ChoixDeCoterie : React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            colerique: 0,
            aventureux: 0,
            lache: 0,
            naturaliste: 0,
            trompeur: 0,
            paresseux: 0,
            luxurieux: 0,
            gourmand: 0,
            cupide: 0,
            cruel: 0,
            envieux: 0,
            orgueilleux: 0,
            solitaire: 0,
            sociopathique: 0,
            rebelle: 0,
        }
    });

    const idsSliders: string[] = [
        'colerique', 'aventureux', 'lache', 'naturaliste',
        'trompeur',
        'paresseux',
        'luxurieux',
        'gourmand',
        'cupide',
        'cruel',
        'envieux',
        'orgueilleux',
        'solitaire',
        'sociopathique',
        'rebelle',
    ];
    const sliders = watch([
        'colerique', 'aventureux', 'lache', 'naturaliste',
        'trompeur',
        'paresseux',
        'luxurieux',
        'gourmand',
        'cupide',
        'cruel',
        'envieux',
        'orgueilleux',
        'solitaire',
        'sociopathique',
        'rebelle',
    ]);

    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Rediriger vers un composant de résultat ou faire autre chose avec les données
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {idsSliders.map((idSlider: string, indexSliderAffiche: number) => (
                <Grid2 container spacing={0} sx={{ mb: 2 }} columns={8}>
                    <Grid2 size={4}>
                        {idSlider} :
                    </Grid2>
                    <Grid2 size={4}>
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
                    {errors[idSlider as keyof FormData] && <p>{errors[idSlider as keyof FormData]?.message}</p>}
                    </Grid2>
                </Grid2>
            ))}
            <p>Total des déplacements: {total}</p>
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};


export default ChoixDeCoterie