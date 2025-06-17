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

/**
 * return true si statut 1 est supérieur ou égal à statut 2
 */
export function compareStatut(statut1: Statut, statut2: Statut): boolean {
    if (statut1.metalStatut === statut2.metalStatut) return statut1.rang >= statut2.rang;
    if (statut1.metalStatut === MetalStatut.or &&
        (statut2.metalStatut === MetalStatut.bronze || statut2.metalStatut === MetalStatut.argent)) return true;
    return statut1.metalStatut === MetalStatut.argent &&
        statut2.metalStatut === MetalStatut.bronze;
}
