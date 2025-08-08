import {TypeCompetence} from "./perso/comps/Comps";
import {metiersEnum} from "../donnees/metiers";

export type ResultatTest = {
    reussi: boolean,
    critical: boolean,
    resume: string,
}

export type TestCompetence = {
    comp: TypeCompetence,
    bonusMalus: number,
}

export type TestMetier = {
    metier: metiersEnum,
    bonusMalus: number,
}
