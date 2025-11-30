import {Perso, PersoCommon} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../types/perso/Amour";
import {genererPNJAmourableDePerso} from "../generation";
import {nbMoisEntre2Dates} from "../../types/Date";

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

export function nombreDeCouples(perso:Perso):number {
    return perso.pnjs.filter((pnj: PNJ) =>
        pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.concubine
        || pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.epouse
        || pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.petiteAmie
    ).length;
}

export function nombreDeCoupDeCoeur(perso:Perso):number {
    return perso.pnjs.filter((pnj: PNJ) =>
        pnj.amourPourCePnj === NiveauAmour.coupDeCoeur).length;
}

export function getPetitesAmiesDIlYAPlusDeDeuxMois(perso:Perso):PNJ[] {
    return perso.pnjs.filter((pnj: PNJ) =>
        pnj.niveauRelationAmoureuse === NiveauRelationAmoureuse.petiteAmie
    && nbMoisEntre2Dates(perso.date, pnj.dateDerniereInteration) >= 2);
}

/**
 * y compris simples coups de coeur et trucs non réciproques
 * @param perso
 */
export function nombreDeRelationsAmoureusesEnCours(perso:Perso):number {
    return perso.pnjs.filter(
        (pnj: PNJ) =>
            pnj.niveauRelationAmoureuse !== NiveauRelationAmoureuse.rien
    ).length;
}

export function getPremierAmour(perso: PersoCommon):PNJ|undefined {
    return perso.pnjs.find((pnj:PNJ) =>
        pnj.niveauRelationAmoureuse !== NiveauRelationAmoureuse.rien
    );
}

export function getUnCoupDeCoeur(perso: Perso): PNJ {
    return perso.pnjs.filter(
        (pnj:PNJ) =>
            pnj.amourPourCePnj === NiveauAmour.coupDeCoeur).at(0) ?? genererPNJAmourableDePerso(perso);
}

