import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {Carriere} from "../../../types/metiers/Metier";
import {getCarriereActive} from "../../../fonctions/metiers/metiersUtils";
import {
    modifierStatut,
    statutPersoSuperieurAStatut2
} from "../../../fonctions/perso/statut";
import {metiersObjs} from "../../metiers";

export const evts_statut: GroupeEvts = {
    evts: [
        {
            id: "evts_statut1 baisse",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const carriere: Carriere | undefined = getCarriereActive(perso);
                if (carriere) {
                    texte += "Vous vivez au dessus de vos moyens. ";
                    texte += modifierStatut(perso, -1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => statutPersoSuperieurAStatut2(perso, metiersObjs[getCarriereActive(perso)?.metier].statut),
        },
    ],
    probaParDefaut: 5,
}
