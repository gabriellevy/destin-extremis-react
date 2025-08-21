import {TypeCompetence} from "./perso/comps/Comps";
import {metiersEnum} from "../donnees/metiers";
import {TypeBon} from "./BonMauvais";

export type ResultatTest = {
    reussi: boolean,
    critical: boolean,
    resume: string,
}

export type TestCompetence = {
    comp: TypeCompetence,
    bonusMalus: number,
}

export type TestVertu = {
    typeBon: TypeBon,
    bonusMalus: number,
}

export type TestMetier = {
    metier: metiersEnum,
    bonusMalus: number,
}
