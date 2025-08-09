import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {TypeCompetence} from "../types/perso/comps/Comps";
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

const SelectionComp: React.FC<SelectionCompProps> = ({
                                                     register,
                                                     errors,
                                                     watch,
                                                     handleSubmit,
                                                     setPhaseDeChoix
                                                 }) => {
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
                {Object.values(TypeCompetence).map((competence) => (
                    <FormControlLabel
                        key={competence}
                        control={
                            <Checkbox
                                {...register(`competences.${competence}`)}
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