import {getValeurVice, getVertuOppose, Vice} from "../types/ViceVertu";
import {Perso} from "../types/perso/Perso";

export function descriptionViceVertu(vice: Vice, valeurVice: number) {
    if (valeurVice=== 0) return 'Neutre';
    switch (vice) {
        case Vice.mefiant: {
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
                    return "Paranoïaque";
                case 3:
                    return "Complètement paranoïaque";
                default:
                    return "valeur impossible de " + vice + " : " + valeurVice;
            }
        }
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
                    return "valeur impossible de " + vice + " : " + valeurVice;
            }
        }
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
                    return "valeur impossible de " + vice + " : " + valeurVice;
            }
        }
    }
}

export function descriptionViceVertusPerso(perso: Perso, vice:Vice): string {
    const valeurVice:number = getValeurVice(perso, vice);
    return descriptionViceVertu(vice, valeurVice);
}