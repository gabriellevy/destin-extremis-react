import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {
    getCarriereActive,
    suitUneCarriereDepuis
} from "../../../fonctions/metiers/metiersUtils";
import {modifierStatut, statut1SuperieurOuEgalAStatut2} from "../../../fonctions/perso/statut";
import {Carriere} from "../../../types/metiers/Metier";

// événements basiques accessibles à à peu près toutes els carrières
export const evts_carriere: GroupeEvts = {
    evts: [
        {
            id: "evts_carriere1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    texte += "Vous êtes un " + carriere.metier.nom + " très efficace. ";
                    texte += modifierStatut(perso, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, undefined, 1)
                && !statut1SuperieurOuEgalAStatut2(perso.statut, getCarriereActive(perso)?.metier.statutMax),
        },
    ],
    probaParDefaut: 3,
};