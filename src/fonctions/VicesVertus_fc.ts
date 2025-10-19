import {getValeurVice, getVertuOppose, Vice} from "../types/ViceVertu";
import {Perso} from "../types/perso/Perso";

export function descriptionViceVertus(perso: Perso, vice:Vice): string {
    const valeurVice:number = getValeurVice(perso, vice);
    switch (vice) {
        case Vice.cruel: {
            switch (valeurVice) {
                case -3:
                    return "Extrêmement " + getVertuOppose(vice);
                case -2:
                    return "Très " + getVertuOppose(vice);
                case -1:
                    return getVertuOppose(vice);
                case 1:
                    return vice;
                case 2:
                    return "Sadique";
                case 3:
                    return "Psychopathe";
                default:
                    return "valeur impossible : " + valeurVice;
            }
        } break;
        default : {
            switch (valeurVice) {
                case -3:
                    return "Extrêmement " + getVertuOppose(vice);
                case -2:
                    return "Très " + getVertuOppose(vice);
                case -1:
                    return getVertuOppose(vice);
                case 1:
                    return vice;
                case 2:
                    return "Très " + vice;
                case 3:
                    return "Extrêmement " + vice;
                default:
                    return "valeur impossible : " + valeurVice;
            }
        }
    }
}