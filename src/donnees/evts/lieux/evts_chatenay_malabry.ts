import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/Perso";
import {Quartier} from "../../geographie/quartiers";

export const evts_chatenay_malabry: GroupeEvts = {
    evts: [
        {
            id: "evts_chatenay_malabry1",
            description: (perso: Perso): string => {
                let texte:string = "Vous êtes invité à un grand banquet celte.";

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 5,
};