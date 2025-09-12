import {Perso} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../types/perso/Amour";
import {genererPNJAmourableDePerso} from "../generation";

// c'est à dire couchent ensemble ou sont au moins fiancés
export function enCouple(perso: Perso, pnj: PNJ): boolean {
    return pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.concubine
        || pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.epouse
        || pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.petiteAmie;
}

export function enCoupleAvecUnAmourFort(perso: Perso): boolean {
    return perso.pnjs.filter(
        (pnj:PNJ) =>
            pnj.amourPourCePnj === NiveauAmour.amourFort
            && enCouple(perso, pnj))
        .length > 0;
}

export function aUnCoupDeCoeurNonReciproque(perso: Perso): boolean {
    return perso.pnjs.filter(
        (pnj:PNJ) =>
            pnj.amourPourCePnj === NiveauAmour.coupDeCoeur
            && pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.rien
            && pnj.amourDeCePnj === NiveauAmour.aucun)
        .length > 0;
}

export function nombreDeCoupDeCoeur(perso:Perso):number {
    return perso.pnjs.filter((pnj: PNJ) =>
        pnj.amourDeCePnj === NiveauAmour.coupDeCoeur).length;
}

export function getUnCoupDeCoeur(perso: Perso): PNJ {
    return perso.pnjs.filter(
        (pnj:PNJ) =>
            pnj.amourPourCePnj === NiveauAmour.coupDeCoeur).at(0) ?? genererPNJAmourableDePerso(perso);
}