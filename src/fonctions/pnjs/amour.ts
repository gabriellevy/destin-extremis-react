import {Perso} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../types/perso/Amour";

// cest à dire couchent ensemble ou sont au moins fiancés
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