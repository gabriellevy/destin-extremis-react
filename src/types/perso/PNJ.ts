import {Sexe} from "./Perso";
import {Lieu} from "../lieux/Lieu";
import {Coterie} from "../Coterie";
import {Carriere} from "../metiers/metiers";
import {ViceVertu} from "../ViceVertu";

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

}
