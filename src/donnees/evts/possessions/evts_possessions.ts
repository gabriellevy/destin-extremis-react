import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getAge} from "../../../types/Date";
import {PossessionEnum} from "../../possessions/Possession";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {acquerir, possede} from "../../../fonctions/possessions/possessions";

export const evts_possessions: GroupeEvts = {
    evts: [
        {
            id: "evts_possessions pistolet",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez de vous acheter un pistolet. `
                texte += acquerir(perso, PossessionEnum.pistolet);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !possede(perso, PossessionEnum.pistolet)
                && getValeurVice(perso, Vice.mefiant) > 0
                && getAge(perso) >= 18,
            repetable: true,
        },
        {
            id: "evts_possessions armes lourdes",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vu le nombre de personnes qui veulent votre peau vous décidez de vous équiper en grenades, lance missile et mitrailleuses. On ne sait jamais. `
                texte += acquerir(perso, PossessionEnum.armes_lourdes);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !possede(perso, PossessionEnum.armes_lourdes)
                && getValeurVice(perso, Vice.mefiant) > 1
                && getAge(perso) >= 18,
            repetable: true,
        },
    ],
    probaParDefaut: 3,
}
