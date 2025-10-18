import {PhaseLycee} from "../../types/lycee/StadeUniversite";
import {Perso} from "../../types/perso/Perso";
import {arreterCarriere, getCarriereActive} from "../metiers/metiersUtils";
import {MetiersEnum} from "../../donnees/metiers";

export function etudie(perso: Perso): boolean {
    return perso.bilanLycee.phaseActuelle !== PhaseLycee.finie && perso.bilanLycee.phaseActuelle !== PhaseLycee.pas_commence;
}

export function finDAnneeDEtude(perso:Perso):string {
    let texte: string = "Vous terminez votre année d'étude chez les " + perso.bilanLycee.coterieActuelle+ ".";
    if (getCarriereActive(perso).metier === MetiersEnum.brute_de_lycee) {
        texte += "Vous perdez de vue vos victimes de ce lycée.";
        texte += arreterCarriere(perso, MetiersEnum.brute_de_lycee, false);
    }
    texte += "<br/>";
    return texte;
}