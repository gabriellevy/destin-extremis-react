import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {isCompDeBase, TypeCompetence} from "../types/perso/comps/Comps";
import {Dispatch, SetStateAction} from "react";
import {ChoixCoterieFormData, PhaseDeChoix} from "./ChoixDeCoterie";
import {FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch} from "react-hook-form";

type SelectionCompProps = {
    register: UseFormRegister<ChoixCoterieFormData>;
    errors: FieldErrorsImpl<ChoixCoterieFormData>;
    watch: UseFormWatch<ChoixCoterieFormData>;
    handleSubmit: UseFormHandleSubmit<ChoixCoterieFormData>;
    setPhaseDeChoix: Dispatch<SetStateAction<PhaseDeChoix>>;
};

const cocheComp = (competence: TypeCompetence, listeMauvais: {
    Colérique: number;
    Aventureux: number;
    Lâche: number;
    Naturaliste: number;
    Trompeur: number;
    Paresseux: number;
    Luxurieux: number;
    Gourmand: number;
    Cupide: number;
    Cruel: number;
    Envieux: number;
    Orgueilleux: number;
    Solitaire: number;
    Sociopathique: number;
    Rebelle: number
}): boolean => {
    switch (competence) {
        case TypeCompetence.chance: return false;
        case TypeCompetence.mouvement: return listeMauvais.Lâche < 0;
    }
    return false;
}

const SelectionComp: React.FC<SelectionCompProps> = ({
                                                     register,
                                                     errors,
                                                     watch,
                                                     handleSubmit,
                                                     setPhaseDeChoix
                                                 }) => {
    const mauvaisTraits = watch().mauvais;
    const selectedCompetences: TypeCompetence[] = Object.entries(watch('competences')).flatMap(([key, value]) =>
        value ? [key as TypeCompetence] : []
    );

    const onSubmit = (data: ChoixCoterieFormData) => {
        const selected = Object.entries(data.competences)
            .filter(([, value]) => value)
            .map(([key]) => key as TypeCompetence);

        if (selected.length > 10) {
            // Cette logique est gérée par la validation du schéma, donc ce bloc peut être omis
            console.error("Vous ne pouvez pas sélectionner plus de 10 compétences.");
        } else {
            setPhaseDeChoix(PhaseDeChoix.resultat);
        }
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)} error={!!errors.competences}>
            <FormGroup>
                {Object.values(TypeCompetence).map((competence: TypeCompetence) =>
                    isCompDeBase(competence) && (
                    <FormControlLabel
                        key={competence}
                        control={
                            <Checkbox
                                {...register(`competences.${competence}`)}
                                checked={cocheComp(competence, mauvaisTraits)}
                            />
                        }
                        label={competence}
                    />
                ))}
            </FormGroup>
            {errors.competences && <FormHelperText>Vous ne pouvez pas sélectionner plus de 10 compétences.</FormHelperText>}
            <Button type="submit" variant="contained" color="primary" disabled={selectedCompetences.length > 10}>
                Valider
            </Button>
        </FormControl>
    );
};

export default SelectionComp;