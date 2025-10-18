import {TypeCompetence} from "./perso/comps/Comps";
import {MetiersEnum} from "../donnees/metiers";
import {Vertu, Vice} from "./ViceVertu";

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
    typeBon: Vertu,
    bonusMalus: number,
}

export type TestVice = {
    typeMauvais: Vice,
    bonusMalus: number,
}

export type TestMetier = {
    metier: MetiersEnum,
    bonusMalus: number,
}
