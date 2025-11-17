import {Sexe} from "./Perso";
import {Lieu} from "../lieux/Lieu";
import {Coterie} from "../Coterie";
import {Carriere} from "../metiers/Metier";
import {ViceVertu} from "../ViceVertu";
import {NiveauAmour, NiveauRelationAmoureuse} from "./Amour";

export type PNJ = {
    prenom: string;
    nom: string;
    sexe: Sexe;
    dateNaissance: number;
    // devrait en théorie être maj quand le PJ et le PNJ interagissent de manière significative mais comme je ne vois aps comment l'automatiser, c'est un peu du bricolage...
    dateDerniereInteration: number;
    lieu: Lieu,
    coterie: Coterie;
    carriere: Carriere,
    viceVertu: ViceVertu[],
    mort?: boolean,
    // rapport au perso principal :
    // -- amour
    amourDeCePnj?: NiveauAmour, // du pnj pour le pj
    amourPourCePnj?: NiveauAmour, // du pj pour ce pnj
    niveauRelationAmoureuse: NiveauRelationAmoureuse,
}
