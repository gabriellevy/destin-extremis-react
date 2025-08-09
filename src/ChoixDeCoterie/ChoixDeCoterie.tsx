import React, {useState} from 'react';
import {FieldErrorsImpl, useForm} from 'react-hook-form';
import {TypeMauvais} from "../types/BonMauvais";
import SelectionTraits from "./SelectionTraits";
import Resultat from "./Resultat";
import SelectionComp from "./SelectionComp";
import {TypeCompetence} from "../types/perso/comps/Comps";

export type ChoixCoterieFormData = {
    competences: {
        [key in TypeCompetence]: boolean;
    };
    mauvais: {
        [key in TypeMauvais]: number;
    };
};

const defaultValues: ChoixCoterieFormData = {
    competences: Object.values(TypeCompetence).reduce((acc, competence) => {
        acc[competence] = false;
        return acc;
    }, {} as { [key in TypeCompetence]: boolean }),
        mauvais: Object.values(TypeMauvais).reduce((acc, mauvais) => {
        acc[mauvais] = 0;
        return acc;
    }, {} as { [key in TypeMauvais]: number }),
};

export enum PhaseDeChoix {
    selection_traits,
    selection_competences,
    resultat
}

const ChoixDeCoterie : React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChoixCoterieFormData>({
        defaultValues: defaultValues
    });
    const [phaseDeChoix, setPhaseDeChoix] = useState<PhaseDeChoix>(PhaseDeChoix.selection_traits);

    return (<>
            {
                phaseDeChoix === PhaseDeChoix.selection_traits &&
                    (<SelectionTraits
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors as FieldErrorsImpl<ChoixCoterieFormData>}
                        watch={watch}
                        setPhaseDeChoix={setPhaseDeChoix}
                    />)
            }
            {
                phaseDeChoix === PhaseDeChoix.selection_competences &&
                (<SelectionComp
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors as FieldErrorsImpl<ChoixCoterieFormData>}
                    watch={watch}
                    setPhaseDeChoix={setPhaseDeChoix}
                />)
            }
            {
                phaseDeChoix === PhaseDeChoix.resultat &&
                (<Resultat
                    watch={watch}
                />)
            }
    </>);
};

export default ChoixDeCoterie