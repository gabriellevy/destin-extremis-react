import {MetalStatut, Statut} from "../../types/statut_social/Statut";
import {Perso, PersoCommon} from "../../types/perso/Perso";


/**
 * return true si statut 1 est supérieur ou égal à statut 2
 */
export function statut1SuperieurOuEgalAStatut2(statut1: Statut, statut2: Statut|undefined): boolean {
    if (statut2 === undefined) return false;

    if (statut1.metalStatut === statut2.metalStatut) return statut1.rang >= statut2.rang;
    if (statut1.metalStatut === MetalStatut.or &&
        (statut2.metalStatut === MetalStatut.bronze || statut2.metalStatut === MetalStatut.argent)) return true;
    return statut1.metalStatut === MetalStatut.argent &&
        statut2.metalStatut === MetalStatut.bronze;
}
export function statutPersoSuperieurAStatut2(perso: Perso, statut2: Statut|undefined): boolean {
    if (statut2 === undefined) return false;
    const statutPerso: Statut = perso.statut;
    if (statutPerso.metalStatut === statut2.metalStatut) return statutPerso.rang > statut2.rang;
    if (statutPerso.metalStatut === MetalStatut.or &&
        (statut2.metalStatut === MetalStatut.bronze || statut2.metalStatut === MetalStatut.argent)) return true;
    return statutPerso.metalStatut === MetalStatut.argent &&
        statut2.metalStatut === MetalStatut.bronze;
}

export function statutToString(statut: Statut):string {
    return statut.metalStatut.toString() + " " + statut.rang.toString();
}

export function modifierStatut(perso: PersoCommon, valeurAjoutee: number): string {
    const vieuxStatut: string = statutToString(perso.statut);
    perso.statut.rang = perso.statut.rang + valeurAjoutee;
    if (perso.statut.rang < 1) {
        // rétrogradation
        switch (perso.statut.metalStatut) {
            case MetalStatut.or:
                perso.statut.metalStatut = MetalStatut.argent;
                perso.statut.rang += 5;
                break;
            case MetalStatut.argent:
                perso.statut.metalStatut = MetalStatut.bronze;
                perso.statut.rang += 5;
                break;
            case MetalStatut.bronze:
                break;
        }
    }
    if (perso.statut.rang > 5) {
        // montée de phase
        switch (perso.statut.metalStatut) {
            case MetalStatut.or:
                break;
            case MetalStatut.argent:
                perso.statut.metalStatut = MetalStatut.or;
                perso.statut.rang -= 5;
                break;
            case MetalStatut.bronze:
                perso.statut.metalStatut = MetalStatut.argent;
                perso.statut.rang -= 5;
                break;
        }
    }
    if (perso.statut.rang < 0) {
        perso.statut.rang = 0;
    }

    const nouveauStatut: string = statutToString(perso.statut);
    if (vieuxStatut === nouveauStatut) {
        return "";
    }
    return "Votre statut passe de " + vieuxStatut + " à " + nouveauStatut + ".<br/>";
}