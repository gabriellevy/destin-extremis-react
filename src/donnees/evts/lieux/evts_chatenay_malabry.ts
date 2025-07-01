import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/Perso";
import {Quartier} from "../../geographie/quartiers";

export const evts_chatenay_malabry: GroupeEvts = {
    evts: [
        {
            id: "evts_chatenay_malabry1",
            description: (perso: Perso): string => {
                let reussite: number = 0;
                let texte:string = "Vous êtes invité à un grand banquet celte. "
                + "Le chef de clan a fait les choses en grand. Du vin de la viande, du miel, tout est excellent. ";
// TODO : à finir cf liste

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 5,
};