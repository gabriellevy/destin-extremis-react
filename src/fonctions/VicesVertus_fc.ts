import {getValeurVice, getVertuOppose, Vice} from "../types/ViceVertu";
import {Perso} from "../types/perso/Perso";

export function descriptionViceVertus(perso: Perso, vice:Vice): string {
    const valeurVice:number = getValeurVice(perso, vice);
    switch (vice) {
        default : {
            switch (valeurVice) {
                case -3:
                    return "Extrêmement " + getVertuOppose(vice);
                case -2:
                    return "Très " + getVertuOppose(vice);
                case -1:
                    return getVertuOppose(vice);
                case 1:
                    return "Extrêmement " + vice;
                case 2:
                    return "Très " + vice;
                case 3:
                    return vice;
                default:
                    return "valeur impossible : " + valeurVice;
            }
        }
    }
}