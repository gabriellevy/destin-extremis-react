import {TypeCompetence} from "./perso/comps/Comps";
import {metiersEnum} from "../donnees/metiers";
import {Vertus, Vices} from "./ViceVertu";

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
    typeBon: Vertus,
    bonusMalus: number,
}

export type TestVice = {
    typeMauvais: Vices,
    bonusMalus: number,
}

export type TestMetier = {
    metier: metiersEnum,
    bonusMalus: number,
}
