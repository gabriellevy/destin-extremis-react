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
        case TypeCompetence.charme: return listeMauvais.Luxurieux < 0;
        case TypeCompetence.mouvement: return listeMauvais.Lâche < 0;
        case TypeCompetence.intelligence: return listeMauvais.Naturaliste > 0;
        case TypeCompetence.volonte: return listeMauvais.Aventureux > 0;
        case TypeCompetence.armeCaC: return listeMauvais.Lâche > 0;
        case TypeCompetence.bagarre: return listeMauvais.Orgueilleux < 0 || listeMauvais.Colérique < 0;
        case TypeCompetence.discretion: return listeMauvais.Colérique > 0;
        case TypeCompetence.marchandage: return listeMauvais.Cupide < 0;
        case TypeCompetence.evaluation: return listeMauvais.Cupide < 0 || listeMauvais.Envieux < 0;
        case TypeCompetence.animaux: return listeMauvais.Naturaliste < 0 || listeMauvais.Sociopathique > 0;
        case TypeCompetence.intimidation: return listeMauvais.Colérique < 0 || listeMauvais.Cruel < 0;
        case TypeCompetence.orientation: return listeMauvais.Aventureux < 0;
        case TypeCompetence.intuition: return listeMauvais.Sociopathique > 0;
        case TypeCompetence.survie: return listeMauvais.Naturaliste < 0;
        case TypeCompetence.ragot: return listeMauvais.Solitaire > 0;
        case TypeCompetence.vigilance: return listeMauvais.Rebelle > 0;
        case TypeCompetence.reflexes: return listeMauvais.Colérique < 0;
        case TypeCompetence.force: return listeMauvais.Paresseux > 0;
        case TypeCompetence.adresse: return listeMauvais.Paresseux > 0;
        case TypeCompetence.eloquence: return listeMauvais.Solitaire > 0;
        case TypeCompetence.endurance: return listeMauvais.Gourmand > 0;
        case TypeCompetence.tir: return listeMauvais.Solitaire < 0;
        case TypeCompetence.perception: return listeMauvais.Colérique > 0 || listeMauvais.Paresseux < 0;
        case TypeCompetence.commandement: return listeMauvais.Trompeur > 0;
        case TypeCompetence.tromperie: return listeMauvais.Trompeur < 0 || listeMauvais.Rebelle < 0;
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