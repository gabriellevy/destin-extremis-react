import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
    colerique: number;
    slider2: number;
    slider3: number;
    slider4: number;
    slider5: number;
};

const ChoixDeCoterie : React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            colerique: 0,
            slider2: 0,
            slider3: 0,
            slider4: 0,
            slider5: 0,
        }
    });

    const idsSliders: string[] = ['colerique', 'slider2', 'slider3', 'slider4', 'slider5'];
    const sliders = watch(['colerique', 'slider2', 'slider3', 'slider4', 'slider5']);

    const total = sliders.reduce((sum, value) => sum + Math.abs(value), 0);

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Rediriger vers un composant de résultat ou faire autre chose avec les données
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {idsSliders.map((idSlider: string, indexSliderAffiche: number) => (
                <div key={idSlider}>
                    <label>
                        Slider {idSlider}:
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
                    </label>
                    {errors[idSlider as keyof FormData] && <p>{errors[idSlider as keyof FormData]?.message}</p>}
                </div>
            ))}
            <p>Total des déplacements: {total}</p>
            <button type="submit" disabled={total > 5}>Valider</button>
        </form>
    );
};


export default ChoixDeCoterie