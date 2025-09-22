import {PhaseLycee} from "../../types/lycee/StadeUniversite";
import {Perso} from "../../types/perso/Perso";

export function etudie(perso: Perso): boolean {
    return perso.bilanLycee.phaseActuelle !== PhaseLycee.finie && perso.bilanLycee.phaseActuelle !== PhaseLycee.pas_commence;
}