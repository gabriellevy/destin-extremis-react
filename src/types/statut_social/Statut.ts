import {Option} from "../lieux/Lieu";

// valeur générale reflétant le statut social d'un personnage à l'échelle de la société
// bronze : pauvres
// argent : travailleur
// or : nobles et très haute bourgeoisie
export type Statut = {
    rang: number,
    metalStatut: MetalStatut,
};

export enum MetalStatut {
    bronze = 'Bronze',
    argent = 'Argent',
    or = 'Or',
}

export const metalStatutOptions: Option[]= [
    { value: MetalStatut.bronze, label: MetalStatut.bronze},
    { value: MetalStatut.argent, label: MetalStatut.argent},
    { value: MetalStatut.or, label: MetalStatut.or},
];
