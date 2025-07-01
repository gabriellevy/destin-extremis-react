import {GroupeEvts} from "../../../types/Evt";
import {Perso, Sexe} from "../../../types/Perso";
import {Quartier} from "../../geographie/quartiers";
import {majReputationDansQuartier} from "../../../types/Reputation";
import {getPatronyme} from "../../../fonctions/noms";
import {Coterie} from "../../../types/Coterie";

export const evts_chatenay_malabry: GroupeEvts = {
    evts: [
        {
            id: "evts_chatenay_malabry1",
            description: (perso: Perso): string => {
                let reputation: number = 0;
                let texte:string = "Vous êtes invité à un grand banquet celte. "
                + "Le chef de clan " + getPatronyme(Coterie.celtes, Sexe.male) + " a fait les choses en grand. Du vin de la viande, du miel, tout est excellent. ";

                // TODO : à finir cf liste

                majReputationDansQuartier(perso, Quartier.chatenay_malabry, reputation);
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 9999999999999999999999999999999995,
};