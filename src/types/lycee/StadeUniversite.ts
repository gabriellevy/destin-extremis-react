import {Coterie} from "../Coterie";

export type BilanLycee = {
    coterieActuelle?: Coterie,
    coterieAnnee1?: Coterie,
    coterieAnnee2?: Coterie,
    coterieAnnee3?: Coterie,
    coterieAnnee4?: Coterie,
    phaseActuelle: PhaseLycee,
}

export enum PhaseLycee {
    pas_commence = "Pas commencé",
    coterie1 = "Première coterie",
    coterie2 = "Deuxième coterie",
    coterie3 = "Troisième coterie",
    coterie4 = "Quatrième coterie",
    finie = "Finie",
}

export const bilanLyceeALaNaissance:BilanLycee = {
    phaseActuelle: PhaseLycee.pas_commence,
};
