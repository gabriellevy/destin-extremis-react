import {Sexe} from "./Perso";
import {Lieu} from "../lieux/Lieu";
import {Coterie} from "../Coterie";
import {Carriere} from "../metiers/metiers";
import {BonMauvais} from "../BonMauvais";
import {NiveauAmour, NiveauRelationAmoureuse} from "./Amour";

export type PNJ = {
    prenom: string;
    nom: string;
    sexe: Sexe;
    dateNaissance: number;
    lieu: Lieu,
    coterie: Coterie;
    carriere: Carriere,
    viceVertu: BonMauvais[],
    mort?: boolean,
    // rapport au perso principal :
    // -- amour
    amourDeCePnj?: NiveauAmour,
    amourPourCePnj?: NiveauAmour,
    niveauRelationAmoureuse: NiveauRelationAmoureuse,
}
