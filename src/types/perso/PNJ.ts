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
