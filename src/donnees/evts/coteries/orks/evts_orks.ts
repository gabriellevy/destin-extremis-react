import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {compareStatut} from "../../../../fonctions/perso/statut";
import {MetalStatut} from "../../../../types/statut_social/Statut";

export const evts_orks: GroupeEvts = {
    evts: [
        {
            id: "evts_orks1_esclave",
            description: async (_perso: Perso): Promise<string> => {
                return "TODO";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !compareStatut(perso.statut, {metalStatut: MetalStatut.bronze, rang: 5})
                && !perso.esclaveGtrechin,
        },
    ],
    probaParDefaut: 10, // un peu > à la moyenne car spécifique à une coterie
};