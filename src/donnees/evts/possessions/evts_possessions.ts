import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {calculeAge} from "../../../types/Date";
import {Possession} from "../../possessions/Possession";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {acquerir} from "../../../fonctions/possessions/possessions";

export const evts_possessions: GroupeEvts = {
    evts: [
        {
            id: "evts_possessions pistolet",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez de vous acheter un pistolet. `
                texte += acquerir(perso, Possession.pistolet);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !perso.possessions.includes(Possession.pistolet)
                && getValeurVice(perso, Vice.paranoiaque) > 0
                && calculeAge(perso) >= 18,
        },
    ],
    probaParDefaut: 3,
}
