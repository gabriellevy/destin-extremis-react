import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVice, TypeVice} from "../../../types/ViceVertu";

export const evts_amour: GroupeEvts = {
    evts: [
        {
            id: "evts_amour1",
            description: (perso: Perso): string => {
                let texte:string = "Vous avez un coup de cœur pour X. <br/>";

                return texte;
            },
            conditions: (perso: Perso): boolean => getValeurVice(perso, TypeVice.luxurieux) >= 0 && perso.age >= 13,
        },
    ],
    probaParDefaut: 109999999999999999,
};