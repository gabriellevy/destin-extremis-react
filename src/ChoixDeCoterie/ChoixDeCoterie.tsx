import React, {useState} from 'react';
import {FieldErrorsImpl, useForm} from 'react-hook-form';
import {Vice} from "../types/ViceVertu";
import SelectionTraits from "./SelectionTraits";
import Resultat from "./Resultat";
import SelectionComp from "./SelectionComp";
import {TypeCompetence} from "../types/perso/comps/Comps";
import {Mode} from "../types/Mode";
import DestinExtremis from "../compos/DestinExtremis";

export type ChoixCoterieFormData = {
    competences: {
        [key in TypeCompetence]: boolean;
    };
    mauvais: {
        [key in Vice]: number;
    };
};

const defaultValues: ChoixCoterieFormData = {
    competences: Object.values(TypeCompetence).reduce((acc, competence) => {
        acc[competence] = false;
        return acc;
    }, {} as { [key in TypeCompetence]: boolean }),
        mauvais: Object.values(Vice).reduce((acc, mauvais) => {
        acc[mauvais] = 0;
        return acc;
    }, {} as { [key in Vice]: number }),
};

export enum PhaseDeChoix {
    selection_traits,
    selection_competences,
    resultat
}
export interface ChoixDeCoterieProps {
    mode: Mode;
}

function ChoixDeCoterie({mode}:Readonly<ChoixDeCoterieProps>) {
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
                phaseDeChoix === PhaseDeChoix.resultat && mode === Mode.choixCoterie &&
                (<Resultat
                    watch={watch}
                />)
            }
            {
                phaseDeChoix === PhaseDeChoix.resultat && mode === Mode.jeu &&
                (<DestinExtremis
                    mode={mode}
                    initPerso={watch}
                />)
            }
    </>);
}

export default ChoixDeCoterie