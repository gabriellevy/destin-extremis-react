import {Perso} from "../perso/Perso";

export type Bionique = {
    nom: string;
    // nombre de jours théoriques à passer à l'hopital (ou juste à reposer chez soi) après cette blessure pour bien récupérer
    nbJoursConvalescence: number,
    // ce qui arrive aux caracs du perso si il lui arrive cette maladie ou blessure
    effetAuxCaracs: (perso:Perso) => void,
    // texte affiché quand le perspnnage attrape ce problème de santé
    description: string,
    prix?: number, // baisse du statut (si c'est vraiment très cher)
}