import React from 'react';
import {FieldErrorsImpl, useForm} from 'react-hook-form';
import {TypeMauvais} from "../types/BonMauvais";
import SelectionTraits from "./SelectionTraits";

type FormData = {
    [key in TypeMauvais]: number;
};

const defaultValues: FormData = Object.keys(TypeMauvais).reduce((acc, key) => {
    acc[key as TypeMauvais] = 0;
    return acc;
}, {} as FormData);

enum PhaseDeChoix {
    selection_traits,
    selection_competences,
    resultat
}

const ChoixDeCoterie : React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: defaultValues
    });

    return (
        <SelectionTraits
            register={register}
            handleSubmit={handleSubmit}
            errors={errors as FieldErrorsImpl<FormData>}
            watch={watch}
        />
    );
};

export default ChoixDeCoterie