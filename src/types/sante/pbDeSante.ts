import {Perso} from "../perso/Perso";

export type PbDeSante = {
    nom: string;
    /* gravité de ce problème de santé
    0 => rhume

    9 => aveugle, cul de jatte
    10 => cancer, peste,
    */
    gravite: number;
    // nombre de jours théoriques à passer à l'hopital (ou juste à reposer chez soi) après cette blessure pour bien récupérer
    nbJoursConvalescence: number,
    // ce qui arrive aux caracs du perso si il lui arrive cette maladie ou blessure
    effetAuxCaracs: (perso:Perso) => void,
    // Renvoie true si il s'agit d'une maladie qui peut être acquise dès la création du personnage (malformation ou maladie génétique de naissance)
    peutEtrePrisALaNaissance?: boolean,
    // texte affiché quand le perspnnage attrape ce problème de santé
    description: string,
}